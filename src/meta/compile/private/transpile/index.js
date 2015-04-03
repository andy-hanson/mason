import { ArrayExpression, AssignmentExpression, BlockStatement, BreakStatement, CallExpression,
	DebuggerStatement, Identifier, LabeledStatement, Literal, SwitchCase, SwitchStatement,
	ThisExpression, VariableDeclarator,
	binaryExpressionPlus, declare, declareSpecial, callExpressionThunk, functionExpressionPlain,
	functionExpressionThunk, member, idCached, idSpecialCached, switchStatementOnTrue, throwError,
	toStatement, toStatements, unaryExpressionNegate, variableDeclarationConst,
	whileStatementInfinite, yieldExpressionDelegate, yieldExpressionNoDelegate } from '../esast'
import Expression, * as EExports from '../../Expression'
import { KAssign } from '../Lang'
import Opts from '../Opts'
import Span from '../Span'
import { assert, implementMany, isPositive, log } from '../U'
import { ifElse, opIf, None, some } from '../U/Op'
import { cat, cons, flatMap, isEmpty, push, range, tail, unshift } from '../U/Bag'
import type from '../U/type'
import Vr from '../Vr'
import transpileBlock from './transpileBlock'
import { transpileObjReturn, transpileObjSimple } from './transpileObj'
import transpileModule from './transpileModule'
import { t,
	IdExports, IdArguments, IdArraySliceCall, IdFunctionApplyCall, IdMs,
	LitEmptyArray, LitEmptyString, LitNull, Break,
	accessLocal, lazyWrap, makeDeclarator, makeDestructureDeclarators,
	opLocalCheck, msArr, msBool, msMap, msShow } from './util'
import Tx from './Tx'

export default function transpile(cx, e, vr) {
	const tx = new Tx(cx, vr)
	const ast = t(tx)(e)
	ast.loc.source = tx.opts().modulePath()
	return ast
}

implementMany(EExports, 'transpileSubtree', {
	Assign: (_, tx) => variableDeclarationConst([
		makeDeclarator(tx, _.span, _.assignee, _.k, t(tx)(_.value)) ]),
	// TODO:ES6 Just use native destructuring assign
	AssignDestructure: (_, tx) => variableDeclarationConst(
		makeDestructureDeclarators(tx, _.span, _.assignees, _.isLazy, t(tx)(_.value), _.k, false)),
	BlockDo: transpileBlock,
	BlockVal: transpileBlock,
	BlockWrap: (_, tx) => blockWrap(_, tx, t(tx)(_.block)),
	Call(_, tx) {
		const anySplat = _.args.some(arg => arg instanceof EExports.Splat)
		if (anySplat) {
			const args = _.args.map(arg =>
				arg instanceof EExports.Splat ?
					msArr([ t(tx)(arg.splatted) ]) :
					t(tx)(arg))
			return CallExpression(IdFunctionApplyCall, [
				t(tx)(_.called),
				LitNull,
				CallExpression(member(LitEmptyArray, 'concat'), args)])
		}
		else return CallExpression(t(tx)(_.called), _.args.map(t(tx)))
	},
	CaseDo: (_, tx) =>
		ifElse(_.opCased,
			cased => BlockStatement([ t(tx)(cased), caseBody(tx, _.parts, _.opElse) ]),
			() => caseBody(tx, _.parts, _.opElse)),
	CaseVal: (_, tx) => {
		const body = caseBody(tx, _.parts, _.opElse)
		const block = ifElse(_.opCased, cased => [ t(tx)(cased), body ], () => [ body ])
		return blockWrap(_, tx, BlockStatement(block))
	},
	CaseDoPart: (_, tx) => casePart(tx, _.test, _.result, true),
	CaseValPart: (_, tx) => casePart(tx, _.test, _.result, false),
	// TODO: includeInoutChecks is misnamed
	Debug: (_, tx) => tx.opts().includeInoutChecks() ?
		flatMap(_.lines, line => toStatements(t(tx)(line))) :
		[ ],
	ObjReturn: transpileObjReturn,
	ObjSimple: transpileObjSimple,
	EndLoop: (_, tx) => BreakStatement(loopId(tx.vr.endLoopToLoop.get(_))),
	Fun(_, tx) {
		// TODO: cache literals for small numbers
		const nArgs = Literal(_.args.length)
		const opDeclareRest = _.opRestArg.map(rest =>
			declare(rest, CallExpression(IdArraySliceCall, [IdArguments, nArgs])))
		const argChecks = flatMap(_.args, arg => opLocalCheck(tx, arg, arg.isLazy))
		const _in = flatMap(_.opIn, i => toStatements(t(tx)(i)))
		const lead = opDeclareRest.concat(argChecks, _in)

		const _out = flatMap(_.opOut, o => toStatements(t(tx)(o)))
		const body = t(tx, lead, _.opResDeclare, _out)(_.block)
		const args = _.args.map(t(tx))
		return functionExpressionPlain(args, body, _.k === '~|')
	},
	Lazy: (_, tx) => lazyWrap(t(tx)(_.value)),
	ListReturn: _ => ArrayExpression(range(0, _.length).map(i => idSpecialCached(`_${i}`))),
	ListSimple: (_, tx) => ArrayExpression(_.parts.map(t(tx))),
	ListEntry: (_, tx) => declareSpecial(`_${_.index}`, t(tx)(_.value)),
	ELiteral(_) {
		switch (_.k) {
			case Number: {
				// TODO: Number literals should store Numbers...
				const n = Number.parseFloat(_.value)
				// Negative numbers are not part of ES spec.
				// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
				const lit = Literal(Math.abs(n))
				return isPositive(n) ? lit : unaryExpressionNegate(lit)
			}
			case String:
				return Literal(_.value)
			case 'js':
				switch (_.value) {
					// TODO:USE* Get rid of this!
					case 'msGetModule': return member(IdMs, 'getModule')
					case 'require': return idSpecialCached('require')
					default: throw new Error('This js literal not supported.')
				}
			default: throw new Error(_.k)
		}
	},
	GlobalAccess: _ => Identifier(_.name),
	LocalAccess: (_, tx) => accessLocal(tx, _),
	LocalDeclare: _ => idCached(_),
	// TODO: Don't always label!
	Loop: (_, tx) =>
		LabeledStatement(loopId(_), whileStatementInfinite(t(tx)(_.block))),
	MapReturn: _ => msMap(flatMap(range(0, _.length), i =>
		[ idSpecialCached('_k' + i.toString()), idSpecialCached('_v' + i.toString()) ])),
	MapEntry: (_, tx) => variableDeclarationConst([
		VariableDeclarator(idSpecialCached(`_k${_.index}`), t(tx)(_.key)),
		VariableDeclarator(idSpecialCached(`_v${_.index}`), t(tx)(_.val))
	]),
	Member: (_, tx) => member(t(tx)(_.object), _.name),
	Module: transpileModule,
	// TODO:ES6 Use `export default`
	ModuleDefaultExport(_, tx) {
		const m = member(IdExports, tx.opts().moduleName())
		return AssignmentExpression('=', m, t(tx)(_.value))
	},
	Quote(_, tx) {
		// TODO:ES6 use template strings
		const isStrLit = _ => _ instanceof EExports.ELiteral && _.k === String
		const part0 = _.parts[0]
		const [ first, restParts ] =
			isStrLit(part0) ? [ t(tx)(part0), tail(_.parts) ] : [ LitEmptyString, _.parts ]
		return restParts.reduce(
			(ex, _) =>
				binaryExpressionPlus(ex, isStrLit(_) ? t(tx)(_) : msShow([ t(tx)(_) ])),
			first)
	},
	Special(_) {
		// Make new objects because we will assign `loc` to them.
		switch (_.k) {
			case 'contains': return member(IdMs, 'contains')
			case 'debugger': return DebuggerStatement()
			case 'sub': return member(IdMs, 'sub')
			case 'this': return 	ThisExpression()
			case 'this-module-directory': return Identifier('__dirname')
			default: throw new Error(_.k)
		}
	},
	Splat: (_, tx) => tx.fail(_.span, 'Splat must appear as argument to a call.'),
	Yield: (_, tx) => yieldExpressionNoDelegate(t(tx)(_.yielded)),
	YieldTo: (_, tx) => yieldExpressionDelegate(t(tx)(_.yieldedTo))
})

const blockWrap = (_, tx, block) => {
	const g = tx.vr.eIsInGenerator(_)
	const invoke = callExpressionThunk(functionExpressionThunk(block, g))
	return g ? yieldExpressionDelegate(invoke) : invoke
}

const caseFail = SwitchCase(null, [ throwError('No branch of `case` matches.') ])
function caseBody(tx, parts, opElse) {
	const elze = ifElse(opElse,
		_ => SwitchCase(null, [ t(tx)(_) ]),
		() => caseFail)
	const cases = push(parts.map(part => t(tx)(part)), elze)
	return switchStatementOnTrue(cases)
}

function casePart(tx, test, result, needBreak) {
	const checkedTest = tx.opts().includeCaseChecks() ? msBool([ t(tx)(test) ]) : t(tx)(test)
	const lines = needBreak ? [ t(tx)(result), Break ] : [ t(tx)(result) ]
	return SwitchCase(checkedTest, lines)
}

// TODO: MOVE

const loopId = loop => {
	type(loop.span.start.line, Number)
	return idSpecialCached(`loop${loop.span.start.line}`)
}
