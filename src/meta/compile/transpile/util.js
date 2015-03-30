import assert from 'assert'
import { builders } from 'ast-types'
const { arrayExpression, assignmentExpression, breakStatement, callExpression, expressionStatement,
	identifier, literal, returnStatement } = builders
import Expression, { LocalDeclare } from '../Expression'
import { KAssign } from '../Lang'
import Span from '../Span'
import { flatMap, isEmpty, unshift } from '../U/Bag'
import { ifElse, None } from '../U/Op'
import type from '../U/type'
import { declare, idMangle, member, toStatements, thunk } from './ast-util'
import Tx from './Tx'

export const t = (tx, arg) => expr => {
	const ast = expr.transpileSubtree(expr, tx, arg)
	const appendLoc = _ => { _.loc = expr.span }
	if (ast instanceof Array)
		// This is only allowed inside of Blocks, which use `toStatements`.
		ast.forEach(appendLoc)
	else
		appendLoc(ast)
	return ast
}

export const
	LitEmptyArray = arrayExpression([]),
	LitEmptyString = literal(''),
	LitNull = literal(null),
	LitStrDisplayName = literal('displayName'),
	LitTrue = literal(true),
	Break = breakStatement(),
	ReturnRes = returnStatement(identifier('res')),
	IdDefine = identifier('define'),
	IdDisplayName = identifier('displayName'),
	IdExports = identifier('exports'),
	IdEval = identifier('eval'),
	IdArguments = identifier('arguments'),
	IdArraySliceCall = member(member(LitEmptyArray, 'slice'), 'call'),
	IdFunctionApplyCall = member(member(identifier('Function'), 'apply'), 'call'),
	IdModule = identifier('module'),
	IdMs = identifier('_ms'),
	IdRequire = identifier('require')

const ms = name => {
	const m = member(IdMs, name)
	return args => callExpression(m, args)
}
export const
	msGet = ms('get'),
	msGetModule = ms('getModule'),
	msLazyGetModule = ms('lazyGetModule'),
	msArr = ms('arr'),
	msBool = ms('bool'),
	msLset = ms('lset'),
	msSet = ms('set'),
	msMap = ms('map'),
	msShow = ms('show'),
	msCheckContains = ms('checkContains'),
	msUnlazy = ms('unlazy'),
	msLazy = ms('lazy'),
	msLazyGet = ms('lazyProp')

export const makeAssignDestructure = (tx, span, assignees, isLazy, value, k, isModule) => {
	type(tx, Tx, span, Span, assignees, [LocalDeclare],
		isLazy, Boolean, value, Object, k, KAssign, isModule, Boolean)
	const destructuredName = `_$${span.start.line}`
	const assigns = flatMap(assignees, assignee => {
		// TODO: Don't compile it if it's never accessed
		const get = getMember(idMangle(destructuredName), assignee.name, isLazy, isModule)
		return toStatements(makeAssign(tx, assignee.span, assignee, k, get, isLazy))
	})
	// Getting lazy module is done by ms.lazyGetModule.
	const val = (isLazy && !isModule) ? lazyWrap(value) : value
	return unshift(declare(destructuredName, val), assigns)
}

const getMember = (astObject, gotName, isLazy, isModule) => {
	type(astObject, Object, gotName, String, isLazy, Boolean, isModule, Boolean)
	if (isLazy)
		return msLazyGet([ astObject, literal(gotName) ])
	else if (isModule)
		return msGet([ astObject, literal(gotName) ])
	else
		return member(astObject, gotName)
}

export const makeAssign = (tx, span, assignee, k, value, valueIsAlreadyLazy) => {
	type(tx, Tx, span, Span, assignee, Expression, k, KAssign, value, Object)
	const doAssign = (() => { switch (k) {
		case '=': case '. ': case '<~': case '<~~': {
			// TODO: assert(isEmpty(assignee.opType))
			// TODO: Allow type check on lazy value?
			const val = assignee.isLazy && !valueIsAlreadyLazy ? lazyWrap(value) : value
			assert(assignee.isLazy || !valueIsAlreadyLazy)
			return declare(assignee.name, val)
		}
		case 'export': {
			// TODO:ES6
			assert(!assignee.isLazy)
			return declare(assignee.name, assignmentExpression('=',
				member(IdExports, assignee.name),
				value))
		}
		default: throw new Error(k)
	}})()
	return maybeCheck(doAssign, tx, assignee, k === '~=')
}

export const accessLocal = (name, isLazy) => {
	type(name, String, isLazy, Boolean)
	// TODO: Dont' call unlazy, that has to check for laziness and we know it's lazy
	return isLazy ? msUnlazy([ idMangle(name) ]) : idMangle(name)
}

const maybeCheck = (ast, tx, local, isLazy) =>
	ifElse(opLocalCheck(tx, local, isLazy), o => [ ast, o ], () => ast)

export const opLocalCheck = (tx, local, isLazy) => {
	type(tx, Tx, local, LocalDeclare, isLazy, Boolean)
	if (!tx.opts.includeTypeChecks())
		return None
	// TODO: Way to typecheck lazies
	return isLazy ? None : local.opType.map(typ =>
		expressionStatement(msCheckContains([
			t(tx)(typ),
			accessLocal(local.name, false),
			literal(local.name)
		])))
}

export const lazyWrap = value => msLazy([ thunk(value) ])

export const quote = str =>
	`"${str.split('').map(ch => quoteEscape[ch] || ch).join('')}"`
const quoteEscape = {
	'\n': '\\n',
	'\t': '\\t',
	'"': '\\"',
	'\\': '\\\\'
}
