import { ArrayExpression, BlockStatement, BreakStatement,
	CallExpression, DebuggerStatement, FunctionExpression, Identifier, IfStatement,
	LabeledStatement, Literal, ObjectExpression, ThisExpression, VariableDeclarator, ReturnStatement
	} from 'esast/dist/ast'
import { idCached, member, propertyIdOrLiteralCached, thunk, toStatement } from 'esast/dist/util'
import { callExpressionThunk, functionExpressionThunk, memberExpression,
	property, variableDeclarationConst, yieldExpressionDelegate, yieldExpressionNoDelegate
	} from 'esast/dist/specialize'
import * as EExports from '../../Expression'
import { Pattern, Splat, SP_Contains, SP_Debugger, SP_False, SP_Sub,
	SP_This, SP_ThisModuleDirectory, SP_True } from '../../Expression'
import { cat, flatMap, range, tail } from '../U/Bag'
import { flatOpMap, ifElse, opMap } from '../U/op'
import { assert, implementMany, isPositive } from '../U/util'
import { binaryExpressionPlus, binaryExpressionNotEqual, declare, declareSpecial,
	idForDeclareCached, throwError, unaryExpressionNegate, whileStatementInfinite
	} from './esast-util'
import transpileModule from './transpileModule'
import {
	IdArguments, IdArraySliceCall, IdDisplayName, IdFunctionApplyCall, IdMs,
	LitEmptyArray, LitEmptyString, LitNull, LitStrDisplayName, ReturnRes,
	accessLocal, accessLocalDeclare, lazyWrap, makeDeclarator, makeDestructureDeclarators,
	maybeWrapInCheckContains, opLocalCheck,
	msArr, msBool, msExtract, msLset, msMap, msSet, msShow } from './util'

const ExtractVar = Identifier('_$')

let cx, vr, isInGenerator

export default function transpile(_cx, e, _vr) {
	cx = _cx
	vr = _vr
	isInGenerator = false
	const res = t0(e)
	// Release for garbage collection
	cx = vr = undefined
	return res
}

export const
	t0 = expr => {
		const ast = expr.transpileSubtree()
		ast.loc = expr.loc
		return ast
	},
	tLines = exprs => {
		const out = [ ]
		exprs.forEach(expr => {
			const ast = expr.transpileSubtree()
			if (ast instanceof Array)
				// Debug may produce multiple statements.
				ast.forEach(_ => out.push(toStatement(_)))
			else {
				const s = toStatement(ast)
				s.loc = expr.loc
				out.push(s)
			}
		})
		return out
	}

const
	t1 = (expr, arg) => {
		const ast = expr.transpileSubtree(arg)
		ast.loc = expr.loc
		return ast
	},
	t3 = (expr, arg, arg2, arg3) => {
		const ast = expr.transpileSubtree(arg, arg2, arg3)
		ast.loc = expr.loc
		return ast
	}

implementMany(EExports, 'transpileSubtree', {
	Assign() {
		return variableDeclarationConst([
			makeDeclarator(
				cx, this.loc,
				this.assignee,
				t0(this.value),
				false, vr.isExportAssign(this)) ])
	},
	// TODO:ES6 Just use native destructuring assign
	AssignDestructure() {
		return variableDeclarationConst(
			makeDestructureDeclarators(
				cx,
				this.loc,
				this.assignees,
				this.isLazy,
				t0(this.value),
				false,
				vr.isExportAssign(this)))
	},

	BlockDo(lead = null, opResDeclare = null, opOut = null) {
		assert(opResDeclare === null)
		return BlockStatement(cat(lead, tLines(this.lines), opOut))
	},

	BlockWithReturn(lead, opResDeclare, opOut) {
		return transpileBlock(t0(this.returned), this.lines, lead, opResDeclare, opOut)
	},

	BlockObj(lead, opResDeclare, opOut) {
		// TODO: includeTypeChecks() is not the right method for this
		const keys =
			cx.opts.includeTypeChecks() ? this.keys : this.keys.filter(_ => !vr.isDebugLocal(_))
		const ret = ifElse(this.opObjed,
			_ => {
				const objed = t0(_)
				const keysVals = cat(
					flatMap(keys, key => [ Literal(key.name), accessLocalDeclare(key) ]),
					opMap(this.opDisplayName, _ => [ LitStrDisplayName, Literal(_) ]))
				const anyLazy = keys.some(key => key.isLazy)
				return (anyLazy ? msLset : msSet)(objed, ...keysVals)
			},
			() => {
				const props = keys.map(key => {
					const val = accessLocalDeclare(key)
					const id = propertyIdOrLiteralCached(key.name)
					return key.isLazy ? property('get', id, thunk(val)) : property('init', id, val)
				})
				const opPropDisplayName = opMap(this.opDisplayName, _ =>
					property('init', IdDisplayName, Literal(_)))
				return ObjectExpression(cat(props, opPropDisplayName))
			})
		return transpileBlock(ret, this.lines, lead, opResDeclare, opOut)
	},

	BlockBag(lead, opResDeclare, opOut) {
		const length = vr.listMapLength(this)
		return transpileBlock(
			ArrayExpression(range(0, length).map(i => idCached(`_${i}`))),
			this.lines, lead, opResDeclare, opOut)
	},

	BlockMap(lead, opResDeclare, opOut) {
		const length = vr.listMapLength(this)
		return transpileBlock(
			msMap(...flatMap(range(0, length), i =>
				[ idCached(`_k${i}`), idCached(`_v${i}`) ])),
			this.lines, lead, opResDeclare, opOut)
	},

	BlockWrap() { return blockWrap(this, t0(this.block)) },

	Call() {
		const anySplat = this.args.some(arg => arg instanceof Splat)
		if (anySplat) {
			const args = this.args.map(arg =>
				arg instanceof Splat ?
					msArr(t0(arg.splatted)) :
					t0(arg))
			return CallExpression(IdFunctionApplyCall, [
				t0(this.called),
				LitNull,
				CallExpression(member(LitEmptyArray, 'concat'), args)])
		}
		else return CallExpression(t0(this.called), this.args.map(t0))
	},

	CaseDo() {
		const body = caseBody(this.parts, this.opElse)
		return ifElse(this.opCased, _ => BlockStatement([ t0(_), body ]), () => body)
	},

	CaseVal() {
		const body = caseBody(this.parts, this.opElse)
		const block = ifElse(this.opCased, _ => [ t0(_), body ], () => [ body ])
		return blockWrap(this, BlockStatement(block))
	},

	CaseDoPart: casePart,
	CaseValPart: casePart,
	// TODO: includeInoutChecks is misnamed
	Debug() {
		return cx.opts.includeInoutChecks() ? tLines(this.lines) : [ ]
	},

	ObjSimple() {
		return ObjectExpression(this.pairs.map(pair =>
			property('init', propertyIdOrLiteralCached(pair.key), t0(pair.value))))
	},

	EndLoop() { return BreakStatement(loopId(vr.endLoopToLoop.get(this))) },

	Fun() {
		const oldInGenerator = isInGenerator
		isInGenerator = this.isGenerator

		// TODO:ES6 use `...`f
		const nArgs = Literal(this.args.length)
		const opDeclareRest = opMap(this.opRestArg, rest =>
			declare(rest, CallExpression(IdArraySliceCall, [IdArguments, nArgs])))
		const argChecks = flatOpMap(this.args, _ => opLocalCheck(cx, _, _.isLazy))
		const _in = opMap(this.opIn, t0)
		const lead = cat(opDeclareRest, argChecks, _in)

		const _out = opMap(this.opOut, t0)
		const body = t3(this.block, lead, this.opResDeclare, _out)
		const args = this.args.map(t0)
		isInGenerator = oldInGenerator
		const id = opMap(this.name, idCached)
		return FunctionExpression(id, args, body, this.isGenerator)
	},

	Lazy() { return lazyWrap(t0(this.value)) },

	ListSimple() { return ArrayExpression(this.parts.map(t0)) },

	BagEntry() { return declareSpecial(`_${vr.listMapEntryIndex(this)}`, t0(this.value)) },

	NumberLiteral() {
		// Negative numbers are not part of ES spec.
		// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
		const lit = Literal(Math.abs(this.value))
		return isPositive(this.value) ? lit : unaryExpressionNegate(lit)
	},

	GlobalAccess() { return Identifier(this.name) },

	LocalAccess() { return accessLocal(this, vr) },

	LocalDeclare() { return idForDeclareCached(this) },

	// TODO: Don't always label!
	Loop() {
		return LabeledStatement(loopId(this), whileStatementInfinite(t0(this.block)))
	},

	MapEntry() {
		const index = vr.listMapEntryIndex(this)
		const k = `_k${index}`
		const v = `_v${index}`
		return variableDeclarationConst([
			VariableDeclarator(idCached(k), t0(this.key)),
			VariableDeclarator(idCached(v), t0(this.val))
		])
	},

	Member() {
		return member(t0(this.object), this.name)
	},

	Module() { return transpileModule(this, cx) },

	Quote() {
		// TODO:ES6 use template strings
		const part0 = this.parts[0]
		const [ first, restParts ] =
			typeof part0 === 'string' ?
				[ Literal(part0), tail(this.parts) ] :
				[ LitEmptyString, this.parts ]
		return restParts.reduce(
			(ex, _) =>
				binaryExpressionPlus(ex, typeof _ === 'string' ? Literal(_) : msShow(t0(_))),
			first)
	},

	Special() {
		// Make new objects because we will assign `loc` to them.
		switch (this.kind) {
			case SP_Contains: return member(IdMs, 'contains')
			case SP_Debugger: return DebuggerStatement()
			case SP_False: return Literal(false)
			case SP_Sub: return member(IdMs, 'sub')
			case SP_This: return 	ThisExpression()
			case SP_ThisModuleDirectory: return Identifier('__dirname')
			case SP_True: return Literal(true)
			default: throw new Error(this.kind)
		}
	},

	Yield() { return yieldExpressionNoDelegate(t0(this.yielded)) },

	YieldTo() { return yieldExpressionDelegate(t0(this.yieldedTo)) }
})

const
	arrayExtract = locals =>
		variableDeclarationConst(locals.map((l, index) =>
			VariableDeclarator(
				idForDeclareCached(l),
				memberExpression(ExtractVar, Literal(index))))),

	blockWrap = (_, block) => {
		const invoke = callExpressionThunk(functionExpressionThunk(block, isInGenerator))
		return isInGenerator ? yieldExpressionDelegate(invoke) : invoke
	},

	caseBody = (parts, opElse) => {
		let acc = ifElse(opElse, t0, () => throwError('No branch of `case` matches.'))
		for (let i = parts.length - 1; i >= 0; i = i - 1)
			acc = t1(parts[i], acc)
		return acc
	},

	loopId = loop => idCached(`loop${loop.loc.start.line}`),

	transpileBlock = (returned, lines, lead = null, opResDeclare = null, opOut = null) => {
		const fin = ifElse(opResDeclare,
			rd => {
				const ret = maybeWrapInCheckContains(cx, returned, rd.opType, rd.name)
				return ifElse(opOut,
					_ => cat(declare(rd, ret), _, ReturnRes),
					() => ReturnStatement(ret))
			},
			() => cat(opOut, ReturnStatement(returned)))
		return BlockStatement(cat(lead, tLines(lines), fin))
	}

function casePart(alternate) {
	if (this.test instanceof Pattern) {
		const decl = variableDeclarationConst([
			VariableDeclarator(
				ExtractVar,
				msExtract(t0(this.test.type), t0(this.test.patterned)))
			])
		const test = binaryExpressionNotEqual(ExtractVar, Literal(null))
		const ext = arrayExtract(this.test.locals)
		const res = t1(this.result, [ ext ])
		return BlockStatement([ decl, IfStatement(test, res, alternate) ])
	} else {
		const checkedTest = cx.opts.includeCaseChecks() ? msBool(t0(this.test)) : t0(this.test)
		// alternate written to by `caseBody`.
		return IfStatement(checkedTest, t0(this.result), alternate)
	}
}
