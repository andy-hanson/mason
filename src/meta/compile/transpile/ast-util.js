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
import { renderExpr } from './index'
import mangleIdentifier, { needsMangle } from './mangleIdentifier'
import Tx from './Tx'

export const astYield = argument => ({ type: 'YieldExpression', argument })
export const astYieldTo = argument => ({ type: 'YieldExpression', delegate: true, argument })

export const member = (object, property) => {
	type(property, String)
	return needsMangle(property) ?
		memberExpression(object, literal(property), true) :
		memberExpression(object, identifier(property), false)
}
export const propertyIdentifier = name =>
	needsMangle(name) ? literal(name) : identifier(name)

// TODO:ES6 arrow functions
export const thunk = value =>
	functionExpression(null, [], blockStatement([returnStatement(value)]))

export const idMangle = name => identifier(mangleIdentifier(name))

export function declare(name, val) {
	type(name, String, val, Object)
	return variableDeclaration('const', [ variableDeclarator(idMangle(name), val) ])
}

export const toStatement = _ => Statement.check(_) ? _ : expressionStatement(_)

export const toStatements = _ => _ instanceof Array ? _.map(toStatement) : [ toStatement(_) ]

const GlobalError = member(identifier('global'), 'Error')
export const astThrowError = msg =>
	throwStatement(newExpression(GlobalError, [ literal(msg) ]))
