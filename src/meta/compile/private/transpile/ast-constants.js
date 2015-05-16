import { ArrayExpression, CallExpression, ExpressionStatement, Identifier, IfStatement, Literal,
	ReturnStatement, UnaryExpression, VariableDeclaration, VariableDeclarator
	} from 'esast/dist/ast'
import { member } from 'esast/dist/util'
import { binaryExpressionNotEqual } from './util'

export const
	IdArguments = Identifier('arguments'),
	IdDefine = Identifier('define'),
	IdError = Identifier('Error'),
	IdExports = Identifier('exports'),
	IdExtract = Identifier('_$'),
	IdFunctionApplyCall = member(member(Identifier('Function'), 'apply'), 'call'),
	IdName = Identifier('name'),
	LitEmptyArray = ArrayExpression([]),
	LitEmptyString = Literal(''),
	LitNull = Literal(null),
	LitTrue = Literal(true),
	LitZero = Literal(0),
	LitStrExports = Literal('exports'),
	LitStrName = Literal('name'),
	ReturnExports = ReturnStatement(IdExports),
	ReturnRes = ReturnStatement(Identifier('res')),
	UseStrict = ExpressionStatement(Literal('use strict')),

	ArraySliceCall = member(member(LitEmptyArray, 'slice'), 'call'),
	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = IfStatement(
		binaryExpressionNotEqual(UnaryExpression('typeof', IdDefine), Literal('function')),
		VariableDeclaration('var', [
			VariableDeclarator(IdDefine, CallExpression(
				CallExpression(Identifier('require'), [ Literal('amdefine') ]),
				[ Identifier('module') ])) ])),
	ExportsDefault = member(IdExports, 'default'),
	ExportsGet = member(IdExports, '_get')
