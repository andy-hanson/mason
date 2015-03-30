import { builders } from 'ast-types'
const { arrayExpression, assignmentExpression, binaryExpression, blockStatement, breakStatement,
	callExpression, debuggerStatement, emptyStatement, functionExpression, identifier,
	labeledStatement, literal,
	objectExpression, property, returnStatement, switchCase, switchStatement, thisExpression,
	unaryExpression, variableDeclaration, variableDeclarator, whileStatement } = builders
import assert from 'assert'
import { parse as esParse } from 'esprima'
import check, { fail } from '../check'
import Expression, * as EExports from '../Expression'
import { KAssign } from '../Lang'
import Opts from '../Opts'
import Span from '../Span'
import { implementMany, isPositive, log } from '../U'
import { ifElse, None, some } from '../U/Op'
import { cat, cons, flatMap, isEmpty, push, range, tail, unshift } from '../U/Bag'
import type from '../U/type'
import Vr from '../Vr'
import { astThrowError, astYield, astYieldTo, declare, idMangle, member,
	propertyIdentifier, toStatement, toStatements, thunk } from './ast-util'
import transpileModule from './transpileModule'
import { t,
	IdDisplayName, IdExports, IdEval, IdArguments, IdArraySliceCall, IdFunctionApplyCall, IdMs,
	IdRequire,
	LitEmptyArray, LitEmptyString, LitNull, LitStrDisplayName, LitTrue,
	Break, ReturnRes,
	accessLocal, callRequire, lazyWrap, makeAssign, makeAssignDestructure, opLocalCheck, quote,
	msGet, msArr, msBool, msLset, msSet, msMap,
	msShow, msCheckContains, msUnlazy, msLazy } from './util'
import Tx from './Tx'

export default function transpile(e, opts, vr) {
	type(e, Expression, opts, Opts, vr, Vr)
	const tx = Tx({ indent: '', opts: opts, vr: vr })
	const ast = t(tx)(e)
	ast.loc = { source: opts.modulePath(), start: ast.loc.start, end: ast.loc.end }
	return ast
}

implementMany(EExports, 'transpileSubtree', {
	Assign: (_, tx) => makeAssign(tx, _.span, _.assignee, _.k, t(tx)(_.value)),
	// TODO:ES6 Just use native destructuring assign
	AssignDestructure: (_, tx) =>
		makeAssignDestructure(tx, _.span, _.assignees, _.isLazy, t(tx)(_.value), _.k, false),
	Block(_, tx, opResCheck) {
		if (opResCheck === undefined)
			opResCheck = []

		// TODO: _in, body, _out have duplicate code
		const _in = flatMap(_.opIn, i => toStatements(t(tx)(i)))
		const body = flatMap(_.lines, line => toStatements(t(tx)(line)))

		const needResLocal =
			!isEmpty(_.opReturn) &&
				!(isEmpty(opResCheck) && (!tx.opts.includeInoutChecks() || isEmpty(_.opOut)))
		if (needResLocal) {
			const makeRes = _.opReturn.map(ret => declare('res', t(tx)(ret)))
			const _out = flatMap(_.opOut, o => toStatements(t(tx)(o)))
			const ret = _.opReturn.map(() => ReturnRes)
			return blockStatement(_in.concat(body, makeRes, opResCheck, _out, ret))
		}
		else {
			// no res check or out
			const ret = _.opReturn.map(ret => returnStatement(t(tx)(ret)))
			return blockStatement(_in.concat(body, ret))
		}
	},
	BlockWrap: (_, tx) => blockWrap(_, tx, t(tx)(_.block)),
	Call(_, tx) {
		const anySplat = _.args.some(arg => arg instanceof EExports.Splat)
		if (anySplat) {
			const args = _.args.map(arg =>
				arg instanceof EExports.Splat ?
					msArr([ t(tx)(arg.splatted) ]) :
					t(tx)(arg))
			return callExpression(IdFunctionApplyCall, [
				t(tx)(_.called),
				LitNull,
				callExpression(member(LitEmptyArray, 'concat'), args)])
		}
		else return callExpression(t(tx)(_.called), _.args.map(t(tx)))
	},
	CaseDo: (_, tx) =>
		ifElse(_.opCased,
			cased => blockStatement([ t(tx)(cased), caseBody(tx, _.parts, _.opElse, true) ]),
			() => caseBody(tx, _.parts, _.opElse, true)),
	CaseVal: (_, tx) => {
		const body = caseBody(tx, _.parts, _.opElse, false)
		const block = ifElse(_.opCased, cased => [ t(tx)(cased), body ], () => [ body ])
		return blockWrap(_, tx, blockStatement(block))
	},
	CasePart(_, tx, needBreak) {
		const test = t(tx)(_.test)
		const checkedTest = tx.opts.includeCaseChecks() ? msBool([ test ]) : test
		const lines = needBreak ? [ t(tx)(_.result), Break ] : [ t(tx)(_.result) ]
		return switchCase(checkedTest, lines)
	},
	// TODO: tx.opts.includeInoutChecks is misnamed
	Debug: (_, tx) => tx.opts.includeInoutChecks() ?
		flatMap(_.lines, line => toStatements(t(tx)(line))) :
		emptyStatement(),
	ObjReturn(_, tx) {
		const nonDebugKeys = _.keys
		// TODO: includeTypeChecks() is not the right method for this
		const keys = tx.opts.includeTypeChecks() ? _.keys.concat(_.debugKeys) : _.keys
		return ifElse(_.opObjed,
			objed => {
				const astObjed = t(tx)(objed)
				if (isEmpty(keys)) {
					assert(isEmpty(nonDebugKeys))
					return astObjed
				} else {
					const keysVals = cat(
						flatMap(keys, key => [ literal(key.name), accessLocal(key.name, false) ]),
						flatMap(_.opDisplayName, dn => [LitStrDisplayName, literal(dn)]))
					const anyLazy = keys.some(key => key.isLazy)
					const args = unshift(astObjed, keysVals)
					return (anyLazy ? msLset : msSet)(args)
				}
			},
			() => {
				assert(!isEmpty(keys))
				const props = keys.map(key => {
					const val = accessLocal(key.name, false)
					const id = propertyIdentifier(key.name)
					return key.isLazy ?
						// TODO: dont' call 'unlazy', that checks whether it's lazy.
						property('get', id, thunk(accessLocal(key.name, true))) :
						property('init', id, val)
				})
				const opPropDisplayName = _.opDisplayName.map(dn =>
					property('init', IdDisplayName, literal(dn)))
				return objectExpression(cat(props, opPropDisplayName))
			})
	},
	ObjSimple: (_, tx) =>
		objectExpression(Object.getOwnPropertyNames(_.keysVals).map(keyName =>
			property('init', propertyIdentifier(keyName), t(tx)(_.keysVals[keyName])))),
	EndLoop: (_, tx) => breakStatement(loopId(tx.vr.endLoopToLoop.get(_))),
	Fun(_, tx) {
		const opResCheck = flatMap(_.opReturnType, _ =>
			opLocalCheck(tx,
			EExports.LocalDeclare({
				span: _.span,
				name: 'res',
				opType: some(_),
				isLazy: false,
				okToNotUse: false
			}),
			false))
		const nArgs = literal(_.args.length)
		const opDeclareRest = _.opRestArg.map(rest =>
			declare(rest.name, callExpression(IdArraySliceCall, [IdArguments, nArgs])))
		const checks = flatMap(_.args, arg => opLocalCheck(tx, arg, arg.isLazy))
		const body = t(tx, opResCheck)(_.block)
		const parts = push(cat(opDeclareRest, checks), body)
		const block = blockStatement(parts)
		return functionExpression(null, _.args.map(t(tx)), block, !(_.k === '|'))
	},
	Lazy: (_, tx) => lazyWrap(t(tx)(_.value)),
	ListReturn: _ => arrayExpression(range(0, _.length).map(i => identifier(`_${i}`))),
	ListSimple: (_, tx) => arrayExpression(_.parts.map(t(tx))),
	ListEntry: (_, tx) => declare(`_${_.index}`, t(tx)(_.value)),
	ELiteral(_) {
		switch (_.k) {
			case Number: {
				// TODO: Number literals should store Numbers...
				const n = Number.parseFloat(_.value)
				// TODO: File bug about negative numbers
				const lit = literal(Math.abs(n))
				return isPositive(n) ? lit : unaryExpression('-', lit)
			}
			case String:
				return literal(_.value)
			case 'js': {
				const program = esParse(_.value)
				assert(program.body.length === 1)
				const statement = program.body[0]
				assert(statement.type === 'ExpressionStatement')
				return statement.expression
			}
			default: throw new Error(_.k)
		}
	},
	GlobalAccess: _ => identifier(_.name),
	LocalAccess: (_, tx) => accessLocal(_.name, tx.vr.isLazy(_)),
	LocalDeclare: _ => accessLocal(_.name, false),
	// TODO: Don't always label!
	Loop: (_, tx) =>
		labeledStatement(loopId(_), whileStatement(LitTrue, t(tx)(_.block))),
	MapReturn: _ => msMap(flatMap(range(0, _.length), i =>
		[ identifier('_k' + i.toString()), identifier('_v' + i.toString()) ])),
	MapEntry: (_, tx) => variableDeclaration('const', [
		variableDeclarator(identifier(`_k${_.index}`), t(tx)(_.key)),
		variableDeclarator(identifier(`_v${_.index}`), t(tx)(_.val))
	]),
	Member: (_, tx) => member(t(tx)(_.object), _.name),
	Module: transpileModule,
	// TODO:ES6 Use `export default`
	ModuleDefaultExport(_, tx) {
		const m = member(IdExports, tx.opts.moduleName())
		return assignmentExpression('=', m, t(tx)(_.value))
	},
	Quote(_, tx) {
		// TODO:ES6 use template strings
		const isStrLit = _ => _ instanceof EExports.ELiteral && _.k === String
		const part0 = _.parts[0]
		const [ first, restParts ] =
			isStrLit(part0) ? [ t(tx)(part0), tail(_.parts) ] : [ LitEmptyString, _.parts ]
		return restParts.reduce(
			(ex, _) =>
				binaryExpression('+', ex,
					isStrLit(_) ? t(tx)(_) : msShow([ t(tx)(_) ])),
			first)
	},
	Special(_) {
		// Make new objects because we will assign `loc` to them.
		switch (_.k) {
			case 'contains': return member(IdMs, 'contains')
			case 'debugger': return debuggerStatement()
			case 'sub': return member(IdMs, 'sub')
			case 'this': return 	thisExpression()
			case 'this-module-directory': return identifier('__dirname')
			default: throw new Error(_.k)
		}
	},
	Splat: _ => fail(_.span, 'Splat must appear as argument to a call.'),
	Yield: (_, tx) => astYield(t(tx)(_.yielded)),
	YieldTo: (_, tx) => astYieldTo(t(tx)(_.yieldedTo))
})

const blockWrap = (_, tx, block) =>
	tx.vr.eIsInGenerator(_) ?
		astYieldTo(callExpression(functionExpression(null, [], block, true), [])) :
		callExpression(functionExpression(null, [], block), [])

const caseFail = switchCase(	null, [ astThrowError('No branch of `case` matches.') ])
function caseBody(tx, parts, opElse, needBreak) {
	const elze = ifElse(opElse,
		_ => switchCase(null, [ t(tx)(_) ]),
		() => caseFail)
	const cases = push(parts.map(part => t(tx, needBreak)(part)), elze)
	// May contain nested variable declarations
	const isLexical = true
	return switchStatement(LitTrue, cases, isLexical)
}

// TODO: MOVE

const loopId = loop => {
	type(loop.span.start.line, Number)
	return identifier(`loop${loop.span.start.line}`)
}
