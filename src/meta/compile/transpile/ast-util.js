import assert from 'assert'
import { BlockStatement, ExpressionStatement, FunctionExpression, Identifier,
	Literal, NewExpression, MemberExpression, ReturnStatement, Statement, ThrowStatement,
	VariableDeclaration, VariableDeclarator } from '../esast'
import { generate } from 'escodegen'
import Expression, { Do, Fun, LocalDeclare } from '../Expression'
import Span from '../Span'
import { ifElse, None, some } from '../U/Op'
import type from '../U/type'
import { idCached, idSpecialCached, propertyIdOrLiteral } from './id'
import { renderExpr } from './index'
import Tx from './Tx'

export const astYield = argument => ({ type: 'YieldExpression', argument })
export const astYieldTo = argument => ({ type: 'YieldExpression', delegate: true, argument })

export const member = (object, propertyName) => {
	type(propertyName, String)
	const id = propertyIdOrLiteral(propertyName)
	return MemberExpression(object, id, id.type === 'Literal')
}

// TODO:ES6 arrow functions
export const thunk = value =>
	FunctionExpression(null, [], BlockStatement([ReturnStatement(value)]))

export function declare(localDeclare, val) {
	type(localDeclare, LocalDeclare, val, Object)
	return VariableDeclaration('const', [ VariableDeclarator(idCached(localDeclare), val) ])
}
export function declareSpecial(name, val) {
	type(name, String, val, Object)
	return VariableDeclaration('const', [ VariableDeclarator(idSpecialCached(name), val) ])
}

export const toStatement = _ => _ instanceof Statement ? _ : ExpressionStatement(_)

export const toStatements = _ => _ instanceof Array ? _.map(toStatement) : [ toStatement(_) ]

export const astThrowError = msg =>
	ThrowStatement(NewExpression(Identifier('Error'), [ Literal(msg) ]))
