import { ArrayExpression, AssignmentExpression, BlockStatement, BreakStatement,
	CallExpression, DebuggerStatement, Identifier, IfStatement, LabeledStatement, Literal,
	ThisExpression, VariableDeclarator, ReturnStatement } from 'esast/dist/ast'
import { idCached, member, toStatement } from 'esast/dist/util'
import { callExpressionThunk, functionExpressionPlain, functionExpressionThunk,
	variableDeclarationConst, yieldExpressionDelegate, yieldExpressionNoDelegate
	} from 'esast/dist/specialize'
import * as EExports from '../../Expression'
import { flatMap, range, tail } from '../U/Bag'
import { ifElse, None, opIf, opOr } from '../U/Op'
import { assert, implementMany, isPositive } from '../U/util'
import { binaryExpressionPlus, declare, declareSpecial, idForDeclareCached,
	throwError, unaryExpressionNegate, whileStatementInfinite } from './esast-util'
import { transpileObjReturn, transpileObjSimple } from './transpileObj'
import transpileModule from './transpileModule'
import {
	IdExports, IdArguments, IdArraySliceCall, IdFunctionApplyCall, IdMs,
	LitEmptyArray, LitEmptyString, LitNull, ReturnRes,
	accessLocal, lazyWrap, makeDeclarator, makeDestructureDeclarators,
	maybeWrapInCheckContains,
	opLocalCheck, msArr, msBool, msMap, msShow } from './util'

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

export const t0 = expr => {
	const ast = expr.transpileSubtree()
	if (cx.opts.sourceMap())
		ast.loc = expr.loc
	return ast
}
export const t3 = (expr, arg, arg2, arg3) => {
	const ast = expr.transpileSubtree(arg, arg2, arg3)
	if (cx.opts.sourceMap())
		ast.loc = expr.loc
	return ast
}
const tm = expr => {
	const ast = expr.transpileSubtree()
	if (cx.opts.sourceMap() && !(ast instanceof Array))
		// Debug may produce multiple statements.
		ast.loc = expr.loc
	return ast
}

const toStatements = _ => _ instanceof Array ? _.map(toStatement) : [ toStatement(_) ]

function transpileBlock(lead, opResDeclare, opOut) {
	if (lead === undefined)
		lead = []
	if (opResDeclare === undefined)
		opResDeclare = opOut = None
	const body = flatMap(this.lines, line => toStatements(tm(line)))
	const isVal = this instanceof EExports.BlockVal
	const fin = ifElse(opResDeclare,
		rd => {
			assert(isVal)
			const returned = maybeWrapInCheckContains(cx, t0(this.returned), rd.opType, 'res')
			return ifElse(opOut,
				o => [ declare(rd, returned) ].concat(o, [ ReturnRes ]),
				() => [ ReturnStatement(returned) ])
		},
		() => opOut.concat(opIf(isVal, () => ReturnStatement(t0(this.returned)))))
	return BlockStatement(lead.concat(body, fin))
}

function casePart() {
	const checkedTest = cx.opts.includeCaseChecks() ? msBool([ t0(this.test) ]) : t0(this.test)
	// alternate written to by `caseBody`.
	return IfStatement(checkedTest, t0(this.result))
}

implementMany(EExports, 'transpileSubtree', {
	Assign() {
		return variableDeclarationConst([
			makeDeclarator(cx, this.loc, this.assignee, this.k, t0(this.value)) ])
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
				this.k,
				false))
	},
	BlockDo: transpileBlock,
	BlockVal: transpileBlock,
	BlockWrap() { return blockWrap(this, t0(this.block)) },
	Call() {
		const anySplat = this.args.some(arg => arg instanceof EExports.Splat)
		if (anySplat) {
			const args = this.args.map(arg =>
				arg instanceof EExports.Splat ?
					msArr([ t0(arg.splatted) ]) :
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
		return ifElse(this.opCased,
			cased => BlockStatement([ t0(cased), body ]),
			() => body)
	},
	CaseVal() {
		const body = caseBody(this.parts, this.opElse)
		const block = ifElse(this.opCased, cased => [ t0(cased), body ], () => [ body ])
		return blockWrap(this, BlockStatement(block))
	},
	CaseDoPart: casePart,
	CaseValPart: casePart,
	// TODO: includeInoutChecks is misnamed
	Debug() {
		return cx.opts.includeInoutChecks() ?
			flatMap(this.lines, line => toStatements(t0(line))) :
			[ ]
	},
	ObjReturn() { return transpileObjReturn(this, cx) },
	ObjSimple() { return transpileObjSimple(this, cx) },
	EndLoop() { return BreakStatement(loopId(vr.endLoopToLoop.get(this))) },
	Fun() {
		const oldInGenerator = isInGenerator
		isInGenerator = this.k === '~|'

		// TODO:ES6 use `...`
		const nArgs = Literal(this.args.length)
		const opDeclareRest = this.opRestArg.map(rest =>
			declare(rest, CallExpression(IdArraySliceCall, [IdArguments, nArgs])))
		const argChecks = flatMap(this.args, arg => opLocalCheck(cx, arg, arg.isLazy))
		const _in = flatMap(this.opIn, i => toStatements(t0(i)))
		const lead = opDeclareRest.concat(argChecks, _in)

		const _out = flatMap(this.opOut, o => toStatements(t0(o)))
		const body = t3(this.block, lead, this.opResDeclare, _out)
		const args = this.args.map(t0)
		const res = functionExpressionPlain(args, body, this.k === '~|')

		isInGenerator = oldInGenerator
		return res
	},
	Lazy() { return lazyWrap(t0(this.value)) },
	ListReturn() {
		return ArrayExpression(range(0, this.length).map(i => idCached(`_${i}`)))
	},
	ListSimple() { return ArrayExpression(this.parts.map(t0)) },
	ListEntry() { return declareSpecial(`_${this.index}`, t0(this.value)) },
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
		const k = `_k${this.index}`
		const v = `_v${this.index}`
		return variableDeclarationConst([
			VariableDeclarator(idCached(k), t0(this.key)),
			VariableDeclarator(idCached(v), t0(this.val))
		])
	},
	MapReturn() {
		return msMap(flatMap(range(0, this.length), i =>
			[ idCached(`_k${i}`), idCached(`_v${i}`) ]))
	},
	Member() {
		return member(t0(this.object), this.name)
	},
	Module() { return transpileModule(this, cx) },
	// TODO:ES6 Use `export default`
	ModuleDefaultExport() {
		const m = member(IdExports, 'default')
		return AssignmentExpression('=', m, t0(this.value))
	},
	Quote() {
		// TODO:ES6 use template strings
		const part0 = this.parts[0]
		const [ first, restParts ] =
			typeof part0 === 'string' ?
				[ Literal(part0), tail(this.parts) ] :
				[ LitEmptyString, this.parts ]
		return restParts.reduce(
			(ex, _) =>
				binaryExpressionPlus(ex, typeof _ === 'string' ? Literal(_) : msShow([ t0(_) ])),
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
	Yield() { return yieldExpressionNoDelegate(t0(this.yielded)) },
	YieldTo() { return yieldExpressionDelegate(t0(this.yieldedTo)) }
})

const
	blockWrap = (_, block) => {
		const invoke = callExpressionThunk(functionExpressionThunk(block, isInGenerator))
		return isInGenerator ? yieldExpressionDelegate(invoke) : invoke
	},

	caseBody = (parts, opElse) => {
		const ifs = parts.map(t0)
		const lastIdx = ifs.length - 1
		for (let i = 0; i < lastIdx; i = i + 1)
			ifs[i].alternate = ifs[i + 1]
		ifs[lastIdx].alternate = ifElse(opElse, t0, () => throwError('No branch of `case` matches.'))
		return ifs[0]
	},

	loopId = loop => idCached(`loop${loop.loc.start.line}`)
