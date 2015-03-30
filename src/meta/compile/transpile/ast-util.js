import assert from 'assert'
import { builders, namedTypes } from 'ast-types'
const { blockStatement, expressionStatement, functionExpression, identifier,
	literal, newExpression, memberExpression, returnStatement, throwStatement,
	variableDeclaration, variableDeclarator } = builders
const { Statement } = namedTypes
import { generate } from 'escodegen'
import Expression, { Do, Fun, LocalDeclare } from '../Expression'
import Span from '../Span'
import { ifElse, None, some } from '../U/Op'
import type from '../U/type'
import { idCached, idSpecialCached } from './id'
import { renderExpr } from './index'
import { needsMangle } from './mangleIdentifier'
import Tx from './Tx'

export const astYield = argument => ({ type: 'YieldExpression', argument })
export const astYieldTo = argument => ({ type: 'YieldExpression', delegate: true, argument })

export const member = (object, propertyName) => {
	type(propertyName, String)
	const id = propertyIdentifier(propertyName)
	return memberExpression(object, id, id.type === 'Literal')
}
const propertyIds = new Map()
export const propertyIdentifier = propertyName => {
	let _ = propertyIds.get(propertyName)
	if (_ === undefined) {
		_ = needsMangle(propertyName) ? literal(propertyName) : identifier(propertyName)
		propertyIds.set(propertyName, _)
	}
	return _
}


// TODO:ES6 arrow functions
export const thunk = value =>
	functionExpression(null, [], blockStatement([returnStatement(value)]))

export function declare(localDeclare, val) {
	type(localDeclare, LocalDeclare, val, Object)
	return variableDeclaration('const', [ variableDeclarator(idCached(localDeclare), val) ])
}
export function declareSpecial(name, val) {
	type(name, String, val, Object)
	return variableDeclaration('const', [ variableDeclarator(idSpecialCached(name), val) ])
}

export const toStatement = _ => Statement.check(_) ? _ : expressionStatement(_)

export const toStatements = _ => _ instanceof Array ? _.map(toStatement) : [ toStatement(_) ]

const GlobalError = member(identifier('global'), 'Error')
export const astThrowError = msg =>
	throwStatement(newExpression(GlobalError, [ literal(msg) ]))
