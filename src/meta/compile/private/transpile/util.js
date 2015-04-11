import { ArrayExpression, AssignmentExpression, BreakStatement, CallExpression, ExpressionStatement,
	Identifier, Literal, ReturnStatement, VariableDeclarator } from 'esast/ast'
import Loc from 'esast/Loc'
import { member, thunk } from 'esast/util'
import Expression, { LocalAccess, LocalDeclare } from '../../Expression'
import { KAssign } from '../Lang'
import { flatMap, isEmpty, unshift } from '../U/Bag'
import { ifElse, None } from '../U/Op'
import type from '../U/type'
import { assert } from '../U/util'
import { idForDeclareCached, idForDeclareNew } from './esast-util'
import Tx from './Tx'

export const t = (tx, arg, arg2, arg3) => expr => {
	const ast = expr.transpileSubtree(expr, tx, arg, arg2, arg3)
	if (tx.opts().sourceMap()) {
		const setLoc = _ => { _.loc = expr.loc }
		if (ast instanceof Array)
			// This is only allowed inside of Blocks, which use `toStatements`.
			ast.forEach(setLoc)
		else
			setLoc(ast)
	}
	return ast
}

export const
	LitEmptyArray = ArrayExpression([]),
	LitEmptyString = Literal(''),
	LitNull = Literal(null),
	LitStrDisplayName = Literal('displayName'),
	Break = BreakStatement(),
	ReturnRes = ReturnStatement(Identifier('res')),
	IdDefine = Identifier('define'),
	IdDisplayName = Identifier('displayName'),
	IdExports = Identifier('exports'),
	IdArguments = Identifier('arguments'),
	IdArraySliceCall = member(member(LitEmptyArray, 'slice'), 'call'),
	IdFunctionApplyCall = member(member(Identifier('Function'), 'apply'), 'call'),
	IdModule = Identifier('module'),
	IdMs = Identifier('_ms')

const ms = name => {
	const m = member(IdMs, name)
	return args => CallExpression(m, args)
}
export const
	msGetDefaultExport = ms('getDefaultExport'),
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

export const makeDestructureDeclarators = (tx, loc, assignees, isLazy, value, k, isModule) => {
	type(tx, Tx, loc, Loc, assignees, [LocalDeclare],
		isLazy, Boolean, value, Object, k, KAssign, isModule, Boolean)
	const destructuredName = `_$${loc.start.line}`
	const idDestructured = Identifier(destructuredName)
	const declarators = assignees.map(assignee => {
		// TODO: Don't compile it if it's never accessed
		const get = getMember(tx, idDestructured, assignee.name, isLazy, isModule)
		return makeDeclarator(tx, assignee.loc, assignee, k, get, isLazy)
	})
	// Getting lazy module is done by ms.lazyGetModule.
	const val = (isLazy && !isModule) ? lazyWrap(value) : value
	return unshift(VariableDeclarator(idDestructured, val), declarators)
}

const getMember = (tx, astObject, gotName, isLazy, isModule) => {
	type(astObject, Object, gotName, String, isLazy, Boolean, isModule, Boolean)
	if (isLazy)
		return msLazyGet([ astObject, Literal(gotName) ])
	else if (isModule && tx.opts().includeUseChecks())
		return msGet([ astObject, Literal(gotName) ])
	else
		return member(astObject, gotName)
}

export const makeDeclarator = (tx, loc, assignee, k, value, valueIsAlreadyLazy) => {
	type(tx, Tx, loc, Loc, assignee, Expression, k, KAssign, value, Object)
	// TODO: assert(isEmpty(assignee.opType))
	// or TODO: Allow type check on lazy value?
	value = assignee.isLazy ? value :
		maybeWrapInCheckContains(value, tx, assignee.opType, assignee.name)
	switch (k) {
		case '=': case '. ': case '<~': case '<~~': {
			const val = assignee.isLazy && !valueIsAlreadyLazy ? lazyWrap(value) : value
			assert(assignee.isLazy || !valueIsAlreadyLazy)
			return VariableDeclarator(idForDeclareCached(assignee), val)
		}
		case 'export': {
			// TODO:ES6
			assert(!assignee.isLazy)
			return VariableDeclarator(
				idForDeclareCached(assignee),
				AssignmentExpression('=', member(IdExports, assignee.name), value))
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
	return localDeclare.isLazy ?
		msUnlazy([ idForDeclareCached(localDeclare) ]) :
		idForDeclareNew(localDeclare)
}

export const maybeWrapInCheckContains = (ast, tx, opType, name) =>
	tx.opts().includeTypeChecks() ?
		ifElse(opType,
			typ => msCheckContains([ t(tx)(typ), ast, Literal(name) ]),
			() => ast) :
		ast

export const opLocalCheck = (tx, local, isLazy) => {
	type(tx, Tx, local, LocalDeclare, isLazy, Boolean)
	// TODO: Way to typecheck lazies
	if (!tx.opts().includeTypeChecks() || isLazy)
		return None
	return local.opType.map(typ =>
		ExpressionStatement(msCheckContains([
			t(tx)(typ),
			accessLocalDeclare(local),
			Literal(local.name)])))
}

export const lazyWrap = value => msLazy([ thunk(value) ])
