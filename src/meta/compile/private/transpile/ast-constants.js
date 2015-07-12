import { ArrayExpression, BinaryExpression, CallExpression, ExpressionStatement, Identifier,
	IfStatement, Literal, NewExpression, ObjectExpression, ReturnStatement, UnaryExpression,
	VariableDeclaration, VariableDeclarator } from 'esast/dist/ast'
import { member } from 'esast/dist/util'
import { templateElementForString } from './util'

export const
	EmptyTemplateElement = templateElementForString(''),
	IdArguments = Identifier('arguments'),
	IdBuilt = Identifier('built'),
	IdDefine = Identifier('define'),
	IdError = Identifier('Error'),
	IdExports = Identifier('exports'),
	IdExtract = Identifier('_$'),
	IdFunctionApplyCall = member(member(Identifier('Function'), 'apply'), 'call'),
	LitEmptyArray = ArrayExpression([]),
	LitEmptyString = Literal(''),
	LitNull = Literal(null),
	LitStrOhNo = Literal('Oh no!'),
	LitStrExports = Literal('exports'),
	LitTrue = Literal(true),
	LitZero = Literal(0),
	ReturnBuilt = ReturnStatement(IdBuilt),
	ReturnExports = ReturnStatement(IdExports),
	ReturnRes = ReturnStatement(Identifier('res')),
	SymbolIterator = member(Identifier('Symbol'), 'iterator'),
	UseStrict = ExpressionStatement(Literal('use strict')),

	ArraySliceCall = member(member(LitEmptyArray, 'slice'), 'call'),
	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = IfStatement(
		BinaryExpression('!==', UnaryExpression('typeof', IdDefine), Literal('function')),
		VariableDeclaration('var', [
			VariableDeclarator(IdDefine, CallExpression(
				CallExpression(Identifier('require'), [ Literal('amdefine') ]),
				[ Identifier('module') ])) ])),
	DeclareBuiltBag = VariableDeclaration('const', [ VariableDeclarator(IdBuilt, LitEmptyArray) ]),
	DeclareBuiltMap = VariableDeclaration('const', [
		VariableDeclarator(IdBuilt,
			NewExpression(member(Identifier('global'), 'Map'), [ ])) ]),
	DeclareBuiltObj = VariableDeclaration('const', [
		VariableDeclarator(IdBuilt, ObjectExpression([ ])) ]),

	ExportsDefault = member(IdExports, 'default'),
	ExportsGet = member(IdExports, '_get')
