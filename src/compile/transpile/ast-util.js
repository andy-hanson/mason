import assert from 'assert'
import { builders, namedTypes } from 'ast-types'
const { blockStatement, expressionStatement, functionExpression, identifier, literal,
	memberExpression, returnStatement, variableDeclaration, variableDeclarator } = builders
const { Statement } = namedTypes
import { generate } from 'escodegen'
import Expression, { Do, BlockBody, Fun, LocalDeclare } from '../Expression'
import Span from '../Span'
import { ifElse, None, some } from '../U/Op'
import { interleave } from '../U/Bag'
import type from '../U/type'
import { renderExpr } from './index'
import mangle, { needsMangle } from './mangle'
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

export const idMangle = name => identifier(mangle(name))

export function declare(name, val) {
	type(name, String, val, Object)
	return variableDeclaration('const', [ variableDeclarator(idMangle(name), val) ])
}

export const toStatement = _ => Statement.check(_) ? _ : expressionStatement(_)

export const toStatements = _ => _ instanceof Array ? _.map(toStatement) : toStatement(_)
