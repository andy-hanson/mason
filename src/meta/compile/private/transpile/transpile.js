import { ArrayExpression, AssignmentExpression, BlockStatement, BreakStatement,
	CallExpression, DebuggerStatement, Identifier, LabeledStatement, Literal,
	SwitchCase, ThisExpression, VariableDeclarator, ReturnStatement } from 'esast/dist/ast'
import { idCached, member, throwError, toStatements } from 'esast/dist/util'
import {
	binaryExpressionPlus, callExpressionThunk, functionExpressionPlain, functionExpressionThunk,
	switchStatementOnTrue,
	unaryExpressionNegate, variableDeclarationConst, whileStatementInfinite,
	yieldExpressionDelegate, yieldExpressionNoDelegate } from 'esast/dist/specialize'
import * as EExports from '../../Expression'
import { flatMap, push, range, tail } from '../U/Bag'
import { ifElse, None, opIf } from '../U/Op'
import type from '../U/type'
import { assert, implementMany, isPositive } from '../U/util'
import { declare, declareSpecial, idForDeclareCached } from './esast-util'
import { transpileObjReturn, transpileObjSimple } from './transpileObj'
import transpileModule from './transpileModule'
import {
	IdExports, IdArguments, IdArraySliceCall, IdFunctionApplyCall, IdMs,
	LitEmptyArray, LitEmptyString, LitNull, Break, ReturnRes,
	accessLocal, lazyWrap, makeDeclarator, makeDestructureDeclarators,
	maybeWrapInCheckContains,
	opLocalCheck, msArr, msBool, msMap, msShow } from './util'

let cx, vr, isInGenerator

//TODO:MOVE
//TODO: Don't do higher-order version at all!
const withInGenerator = (_isInGenerator, fun) => {
	const g = isInGenerator
	isInGenerator = _isInGenerator
	const res = fun()
	isInGenerator = g
	return res
}


export default function transpile(_cx, e, _vr) {
	cx = _cx
	vr = _vr
	isInGenerator = false
	const res = t(e)
	// Release for garbage collection
	cx = vr = undefined
	return res
}

export const t = (expr, arg, arg2, arg3) => {
	const ast = expr.transpileSubtree(arg, arg2, arg3)
	if (cx.opts.sourceMap() && !(ast instanceof Array))
		// Array is only allowed for statement groups inside of Blocks, such as Debug.
		ast.loc = expr.loc
	return ast
}

function transpileBlock(lead, opResDeclare, opOut) {
	if (lead === undefined)
		lead = []
	if (opResDeclare === undefined)
		opResDeclare = opOut = None
	const body = flatMap(this.lines, line => toStatements(t(line)))
	const isVal = this instanceof EExports.BlockVal
	const fin = ifElse(opResDeclare,
		rd => {
			assert(isVal)
			const returned = maybeWrapInCheckContains(cx, t(this.returned), rd.opType, 'res')
			return ifElse(opOut,
				o => [ declare(rd, returned) ].concat(o, [ ReturnRes ]),
				() => [ ReturnStatement(returned) ])
		},
		() => opOut.concat(opIf(isVal, () => ReturnStatement(t(this.returned)))))
	return BlockStatement(lead.concat(body, fin))
}

implementMany(EExports, 'transpileSubtree', {
	Assign() {
		return variableDeclarationConst([
			makeDeclarator(cx, this.loc, this.assignee, this.k, t(this.value)) ])
	},
	// TODO:ES6 Just use native destructuring assign
	AssignDestructure() {
		return variableDeclarationConst(
			makeDestructureDeclarators(
				cx,
				this.loc,
				this.assignees,
				this.isLazy,
				t(this.value),
				this.k,
				false))
	},
	BlockDo: transpileBlock,
	BlockVal: transpileBlock,
	BlockWrap() { return blockWrap(this, t(this.block)) },
	Call() {
		const anySplat = this.args.some(arg => arg instanceof EExports.Splat)
		if (anySplat) {
			const args = this.args.map(arg =>
				arg instanceof EExports.Splat ?
					msArr([ t(arg.splatted) ]) :
					t(arg))
			return CallExpression(IdFunctionApplyCall, [
				t(this.called),
				LitNull,
				CallExpression(member(LitEmptyArray, 'concat'), args)])
		}
		else return CallExpression(t(this.called), this.args.map(t))
	},
	CaseDo() {
		return ifElse(this.opCased,
			cased => BlockStatement([ t(cased), caseBody(this.parts, this.opElse) ]),
			() => caseBody(this.parts, this.opElse))
	},
	CaseVal() {
		const body = caseBody(this.parts, this.opElse)
		const block = ifElse(this.opCased, cased => [ t(cased), body ], () => [ body ])
		return blockWrap(this, BlockStatement(block))
	},
	CaseDoPart() { return casePart(this.test, this.result, true) },
	CaseValPart() { return casePart(this.test, this.result, false) },
	// TODO: includeInoutChecks is misnamed
	Debug() {
		return cx.opts.includeInoutChecks() ?
			flatMap(this.lines, line => toStatements(t(line))) :
			[ ]
	},
	ObjReturn() { return transpileObjReturn(this, cx) },
	ObjSimple() { return transpileObjSimple(this, cx) },
	EndLoop() { return BreakStatement(loopId(vr.endLoopToLoop.get(this))) },
	Fun() {
		return withInGenerator(this.k === '~|', () => {
			// TODO: cache literals for small numbers
			const nArgs = Literal(this.args.length)
			const opDeclareRest = this.opRestArg.map(rest =>
				declare(rest, CallExpression(IdArraySliceCall, [IdArguments, nArgs])))
			const argChecks = flatMap(this.args, arg => opLocalCheck(cx, arg, arg.isLazy))
			const _in = flatMap(this.opIn, i => toStatements(t(i)))
			const lead = opDeclareRest.concat(argChecks, _in)

			const _out = flatMap(this.opOut, o => toStatements(t(o)))
			const body = t(this.block, lead, this.opResDeclare, _out)
			const args = this.args.map(t)
			//TODO: isInGenerator
			return functionExpressionPlain(args, body, this.k === '~|')
		})
	},
	Lazy() { return lazyWrap(t(this.value)) },
	ListReturn() {
		return ArrayExpression(range(0, this.length).map(i => idCached(`_${i}`)))
	},
	ListSimple() { return ArrayExpression(this.parts.map(t)) },
	ListEntry() { return declareSpecial(`_${this.index}`, t(this.value)) },
	ELiteral() {
		switch (this.k) {
			case Number: {
				// TODO: Number literals should store Numbers...
				const n = Number.parseFloat(this.value)
				// Negative numbers are not part of ES spec.
				// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
				const lit = Literal(Math.abs(n))
				return isPositive(n) ? lit : unaryExpressionNegate(lit)
			}
			case String:
				return Literal(this.value)
			case 'js':
				switch (this.value) {
					// TODO:USE* Get rid of this!
					case 'msGetModule': return member(IdMs, 'getModule')
					case 'require': return idCached('require')
					default: throw new Error('This js literal not supported.')
				}
			default: throw new Error(this.k)
		}
	},
	GlobalAccess() { return Identifier(this.name) },
	LocalAccess() { return accessLocal(this, vr) },
	LocalDeclare() { return idForDeclareCached(this) },
	// TODO: Don't always label!
	Loop() {
		return LabeledStatement(loopId(this), whileStatementInfinite(t(this.block)))
	},
	MapReturn() {
		return msMap(flatMap(range(0, this.length), i =>
			[ idCached('_k' + i.toString()), idCached('_v' + i.toString()) ]))
	},
	MapEntry() {
		return variableDeclarationConst([
			VariableDeclarator(idCached(`_k${this.index}`), t(this.key)),
			VariableDeclarator(idCached(`_v${this.index}`), t(this.val))
		])
	},
	Member() {
		return member(t(this.object), this.name)
	},
	Module() { return transpileModule(this, cx) },
	// TODO:ES6 Use `export default`
	ModuleDefaultExport() {
		const m = member(IdExports, 'default')
		return AssignmentExpression('=', m, t(this.value))
	},
	Quote() {
		// TODO:ES6 use template strings
		const isStrLit = _ => _ instanceof EExports.ELiteral && _.k === String
		const part0 = this.parts[0]
		const [ first, restParts ] =
			isStrLit(part0) ? [ t(part0), tail(this.parts) ] : [ LitEmptyString, this.parts ]
		return restParts.reduce(
			(ex, _) =>
				binaryExpressionPlus(ex, isStrLit(_) ? t(_) : msShow([ t(_) ])),
			first)
	},
	Special() {
		// Make new objects because we will assign `loc` to them.
		switch (this.k) {
			case 'contains': return member(IdMs, 'contains')
			case 'debugger': return DebuggerStatement()
			case 'sub': return member(IdMs, 'sub')
			case 'this': return 	ThisExpression()
			case 'this-module-directory': return Identifier('__dirname')
			default: throw new Error(this.k)
		}
	},
	Splat() { cx.fail(this.loc, 'Splat must appear as argument to a call.') },
	Yield() { return yieldExpressionNoDelegate(t(this.yielded)) },
	YieldTo() { return yieldExpressionDelegate(t(this.yieldedTo)) }
})

const blockWrap = (_, block) => {
	const g = isInGenerator//vr.eIsInGenerator(_)
	const invoke = callExpressionThunk(functionExpressionThunk(block, g))
	return g ? yieldExpressionDelegate(invoke) : invoke
}

const caseFail = SwitchCase(null, [ throwError('No branch of `case` matches.') ])
function caseBody(parts, opElse) {
	const elze = ifElse(opElse,
		_ => SwitchCase(null, [ t(_) ]),
		() => caseFail)
	const cases = push(parts.map(part => t(part)), elze)
	return switchStatementOnTrue(cases)
}

function casePart(test, result, needBreak) {
	const checkedTest = cx.opts.includeCaseChecks() ? msBool([ t(test) ]) : t(test)
	const lines = needBreak ? [ t(result), Break ] : [ t(result) ]
	return SwitchCase(checkedTest, lines)
}

// TODO: MOVE

const loopId = loop => {
	type(loop.loc.start.line, Number)
	return idCached(`loop${loop.loc.start.line}`)
}
