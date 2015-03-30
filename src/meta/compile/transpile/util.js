import assert from 'assert'
import { builders } from 'ast-types'
const { arrayExpression, assignmentExpression, breakStatement, callExpression, expressionStatement,
	identifier, literal, returnStatement, variableDeclarator } = builders
import Expression, { LocalAccess, LocalDeclare } from '../Expression'
import { KAssign } from '../Lang'
import Span from '../Span'
import { flatMap, isEmpty, unshift } from '../U/Bag'
import { ifElse, None } from '../U/Op'
import type from '../U/type'
import { declare, member, toStatements, thunk } from './ast-util'
import { idCached, idNew } from './id'
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

export const makeDestructureDeclarators = (tx, span, assignees, isLazy, value, k, isModule) => {
	type(tx, Tx, span, Span, assignees, [LocalDeclare],
		isLazy, Boolean, value, Object, k, KAssign, isModule, Boolean)
	const destructuredName = `_$${span.start.line}`
	const idDestructured = identifier(destructuredName)
	const declarators = assignees.map(assignee => {
		// TODO: Don't compile it if it's never accessed
		const get = getMember(idDestructured, assignee.name, isLazy, isModule)
		return makeDeclarator(tx, assignee.span, assignee, k, get, isLazy)
	})
	// Getting lazy module is done by ms.lazyGetModule.
	const val = (isLazy && !isModule) ? lazyWrap(value) : value
	return unshift(variableDeclarator(idDestructured, val), declarators)
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

export const makeDeclarator = (tx, span, assignee, k, value, valueIsAlreadyLazy) => {
	type(tx, Tx, span, Span, assignee, Expression, k, KAssign, value, Object)
	// TODO: assert(isEmpty(assignee.opType))
	// or TODO: Allow type check on lazy value?
	value = assignee.isLazy ? value :
		maybeWrapInCheckContains(value, tx, assignee.opType, assignee.name)
	switch (k) {
		case '=': case '. ': case '<~': case '<~~': {
			const val = assignee.isLazy && !valueIsAlreadyLazy ? lazyWrap(value) : value
			assert(assignee.isLazy || !valueIsAlreadyLazy)
			return variableDeclarator(idCached(assignee), val)
		}
		case 'export': {
			// TODO:ES6
			assert(!assignee.isLazy)
			return variableDeclarator(
				idCached(assignee),
				assignmentExpression('=', member(IdExports, assignee.name), value))
		}
		default: throw new Error(k)
	}
}

export const accessLocal = (tx, localAccess) => {
	type(tx, Tx, localAccess, LocalAccess)
	return accessLocalDeclare(tx.vr.accessToLocal.get(localAccess))
}
export const accessLocalDeclare = localDeclare => {
	type(localDeclare, LocalDeclare)
	// TODO: Dont' call unlazy, that has to check for laziness and we know it's lazy
	return localDeclare.isLazy ? msUnlazy([ idCached(localDeclare) ]) : idNew(localDeclare)
}

export const maybeWrapInCheckContains = (ast, tx, opType, name) =>
	tx.opts.includeTypeChecks() ?
		ifElse(opType,
			typ => msCheckContains([ t(tx)(typ), ast, literal(name) ]),
			() => ast) :
		ast

export const opLocalCheck = (tx, local, isLazy) => {
	type(tx, Tx, local, LocalDeclare, isLazy, Boolean)
	// TODO: Way to typecheck lazies
	if (!tx.opts.includeTypeChecks() || isLazy)
		return None
	return local.opType.map(typ =>
		expressionStatement(msCheckContains([
			t(tx)(typ),
			accessLocalDeclare(local),
			literal(local.name)])))
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
