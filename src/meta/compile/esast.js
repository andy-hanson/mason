import { LocalDeclare } from './Expression'
import Span from './Span'
import { assert, pAdd } from './U'
import { ifElse, None, some } from './U/Op'
import type from './U/type'
import { tuple } from './U/types'
import mangleIdentifier, { needsMangle, propertyNameOk } from './transpile/mangleIdentifier'

export class ESNode { }
export class Statement extends ESNode { }
class Expression extends ESNode { }
class Declaration extends ESNode { }
class Pattern extends ESNode { }

// TODO:ES6 (name, ...args)
const makeType = function(superType) { return function(name) {
	const namesTypes = Array.prototype.slice.call(arguments, 1)
	const type = tuple(superType, ...namesTypes)
	Object.assign(type.prototype, {
		type: name,
		toString() {
			return JSON.stringify(pAdd(this, 'type', name), null, 2)
		}
	})
	return type
} }
const specialize = (superType, namesTypes, proto) => {
	const type = tuple(superType, ...namesTypes)
	Object.assign(type.prototype, proto)
	return type
}

const e = makeType(ESNode)
const es = makeType(Statement)
const ev = makeType(Expression)


// TODO
const nullable = _ => _

export const
	Program = e('Program', 'body', [Statement]),
	Identifier = e('Identifier', 'name', String),
	BlockStatement = es('BlockStatement', 'body', [Statement]),

	// Expressions
	FunctionExpression = ev('FunctionExpression',
		'id', Identifier, 'params', [Identifier], 'body', BlockStatement, 'generator', Boolean),

	// Value: Number | String | null | Boolean
	Literal = ev('Literal', 'value', Object),
	ThisExpression = ev('ThisExpression'),
	ArrayExpression = ev('ArrayExpression', 'elements', [Expression]),
	Property = e('Property', 'kind', String, 'key', Object, 'value', Expression),
	ObjectExpression = ev('ObjectExpression', 'properties', [Property]),
	NewExpression = ev('NewExpression', 'callee', Expression, 'arguments', [Expression]),
	CallExpression = ev('CallExpression', 'callee', Expression, 'arguments', [Expression]),
	MemberExpression = ev('MemberExpression',
		'object', Expression, 'property', Identifier, 'computed', Boolean),

	UnaryExpression = ev('UnaryExpression', 'operator', String, 'argument', Expression),
	BinaryExpression = ev('BinaryExpression',
		'operator', String, 'left', Expression, 'right', Expression),
	AssignmentExpression = ev('AssignmentExpression',
		'operator', String, 'left', Pattern, 'right', Expression),
	YieldExpression = ev('YieldExpression', 'argument', Expression, 'delegate', Boolean),

	VariableDeclarator = e('VariableDeclarator', 'id', Identifier, 'init', Expression),
	VariableDeclaration = es('VariableDeclaration',
		'kind', String, 'declarations', [VariableDeclarator]),

	// Statements
	ReturnStatement = es('ReturnStatement', 'argument', Expression),
	ThrowStatement = es('ThrowStatement', 'argument', Expression),
	LabeledStatement = es('LabeledStatement', 'label', Identifier, 'body', Statement),
	WhileStatement = es('WhileStatement', 'test', Expression, 'body', Statement),
	DebuggerStatement = es('DebuggerStatement'),
	ExpressionStatement = es('ExpressionStatement', 'expression', Expression),
	IfStatement = es('IfStatement',
		'test', Expression, 'consequent', Statement, 'alternate', nullable(Statement)),

	BreakStatement = es('BreakStatement', 'label', nullable(Identifier)),

	SwitchCase = e('SwitchCase', 'test', Expression, 'consequent', Statement),
	SwitchStatement = es('SwitchStatement',
		'discriminant', Expression, 'cases', [SwitchCase], 'lexical', Boolean)

const s = specialize

const
	FunctionExpressionPlain = s(FunctionExpression,
		[ 'params', [Identifier], 'body', BlockStatement ], { id: null, generator: false }),
	FunctionExpressionPlainGenerator = s(FunctionExpression,
		[ 'params', [Identifier], 'body', BlockStatement ], { id: null, generator: true }),
	FunctionExpressionThunk = s(FunctionExpression, [ 'body', BlockStatement ], {
		id: null,
		params: [],
		generator: false
	}),
	FunctionExpressionThunkGenerator = s(FunctionExpression, [ 'body', BlockStatement ], {
		id: null,
		params: [],
		generator: true
	}),
	PropertyInit = s(Property, [ 'key', Expression, 'value', Expression ], { kind: 'init' }),
	PropertyGet = s(Property, [ 'key', Expression, 'value', Expression ], { kind: 'get' }),
	MemberExpressionComputed = s(MemberExpression,
		[ 'object', Expression, 'property', Expression ], { computed: true }),
	MemberExpressionIdentifier = s(MemberExpression,
		[ 'object', Expression, 'property', Literal ], { computed: false })

const LitTrue = Literal(true)

export const
	assignmentExpressionPlain = s(AssignmentExpression,
		[ 'left', Pattern, 'right', Expression ], { operator: '=' }),
	callExpressionThunk = s(CallExpression,
		[ 'callee', Expression ], { arguments: [] }),
	functionExpressionPlain = (params, body, generator) =>
		(generator ? FunctionExpressionPlainGenerator : FunctionExpressionPlain)(params, body),
	functionExpressionThunk = (body, generator) =>
		(generator ? FunctionExpressionThunkGenerator : FunctionExpressionThunk)(body),
	variableDeclarationConst =
		s(VariableDeclaration, [ 'declarations', [VariableDeclarator] ], { kind: 'const' }),
	unaryExpressionNegate =
		s(UnaryExpression, [ 'argument', Expression ], { operator: '-' }),
	switchStatementOnTrue = s(SwitchStatement, [ 'cases', [SwitchCase] ], {
		discriminant: LitTrue,
		// May contain nested variable declarations
		lexical: true
	}),
	whileStatementInfinite = s(WhileStatement, [ 'body', Statement ], { test: LitTrue }),
	binaryExpressionPlus = s(BinaryExpression,
		[ 'left', Expression, 'right', Expression ], { operator: '+' }),
	property = (kind, key, value) => {
		if (kind === 'init')
			return PropertyInit(key, value)
		else {
			assert(kind === 'get')
			return PropertyGet(key, value)
		}
	},
	memberExpression = (object, property) =>
		property.type === 'Identifier' ?
			MemberExpressionIdentifier(object, property) :
			MemberExpressionComputed(object, property),
	// TODO:ES6 arrow functions
	thunk = value =>
		FunctionExpressionThunk(BlockStatement([ReturnStatement(value)])),
	yieldExpressionNoDelegate = s(YieldExpression, [ 'argument', Expression ], { delegate: false }),
	yieldExpressionDelegate = s(YieldExpression, [ 'argument', Expression ], { delegate: true })

export const member = (object, propertyName) => {
	type(propertyName, String)
	const id = propertyIdOrLiteral(propertyName)
	return memberExpression(object, id)
}

export function declare(localDeclare, val) {
	type(localDeclare, LocalDeclare, val, Object)
	return variableDeclarationConst([ VariableDeclarator(idCached(localDeclare), val) ])
}
export function declareSpecial(name, val) {
	type(name, String, val, Object)
	return variableDeclarationConst([ VariableDeclarator(idSpecialCached(name), val) ])
}

export const toStatement = _ => _ instanceof Statement ? _ : ExpressionStatement(_)

export const toStatements = _ => _ instanceof Array ? _.map(toStatement) : [ toStatement(_) ]

export const throwError = msg =>
	ThrowStatement(NewExpression(Identifier('Error'), [ Literal(msg) ]))

const declareToId = new WeakMap()
export const idCached = localDeclare => {
	let _ = declareToId.get(localDeclare)
	if (_ === undefined) {
		_ = Identifier(mangleIdentifier(localDeclare.name))
		declareToId.set(localDeclare, _)
	}
	return _
}

export const idNew = localDeclare => Identifier(idCached(localDeclare).name)

const specialNameToId = new Map()
export const idSpecialCached = name => {
	let _ = specialNameToId.get(name)
	if (_ === undefined) {
		_ = Identifier(mangleIdentifier(name))
		specialNameToId.set(name, _)
	}
	return _
}

const propertyToIdOrLiteral = new Map()
export const propertyIdOrLiteral = propertyName => {
	let _ = propertyToIdOrLiteral.get(propertyName)
	if (_ === undefined) {
		_ = propertyNameOk(propertyName) ? Identifier(propertyName) : Literal(propertyName)
		propertyToIdOrLiteral.set(propertyName, _)
	}
	return _
}
