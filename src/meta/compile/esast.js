import { pAdd } from './U'
import { tuple } from './U/types'

class Node { }
export class Statement extends Node { }
class Expression extends Node { }
class Declaration extends Node { }
class Pattern extends Node { }

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

const e = makeType(Node)
const es = makeType(Statement)
const ev = makeType(Expression)

// TODO
const nullable = _ => _

export const
	Program = e('Program', 'body', [Statement]),
	Identifier = e('Identifier', 'name', String),
	BlockStatement = es('BlockStatement', 'body', [Statement]),

	// Expressions
	// TODO: Special case for no Id, no params
	// TODO: GeneratorFunctionExpression
	FunctionExpression = ev('FunctionExpression',
		'id', Identifier, 'params', [Identifier], 'body', BlockStatement, 'generator', Boolean),
	// Value: Number | String | null | Boolean
	Literal = ev('Literal', 'value', Object),
	ThisExpression = ev('ThisExpression'),
	ArrayExpression = ev('ArrayExpression', 'elements', [Expression]),
	// TODO: PropertyInit and PropertyGet types.
	// TODO: key is Literal or Identifier
	Property = e('Property', 'kind', String, 'key', Object, 'value', Expression),
	ObjectExpression = ev('ObjectExpression', 'properties', [Property]),
	NewExpression = ev('NewExpression', 'callee', Expression, 'arguments', [Expression]),
	// TODO: Special case for 0, 1, 2 params
	CallExpression = ev('CallExpression', 'callee', Expression, 'arguments', [Expression]),
	// TODO: separate ComputedMember and IdMember classes
	MemberExpression = ev('MemberExpression',
		'object', Expression, 'property', Identifier, 'computed', Boolean),

	// TODO: NegateExpression
	UnaryExpression = ev('UnaryExpression', 'operator', String, 'argument', Expression),
	// PlusExpression
	BinaryExpression = ev('BinaryExpression',
		'operator', String, 'left', Expression, 'right', Expression),
	// TODO: EqualsAssignmentExpression
	AssignmentExpression = ev('AssignmentExpression',
		'operator', String, 'left', Pattern, 'right', Expression),

	VariableDeclarator = e('VariableDeclarator', 'id', Identifier, 'init', Expression),
	// TODO: Special case for just one declarator ?
	// TODO: ConstVariableDeclaration
	VariableDeclaration = es('VariableDeclaration',
		'kind', String, 'declarations', [VariableDeclarator]),

	// Statements
	ReturnStatement = es('ReturnStatement', 'argument', Expression),
	ThrowStatement = es('ThrowStatement', 'argument', Expression),
	LabeledStatement = es('LabeledStatement', 'label', Identifier, 'body', Statement),
	// TODO: InfiniteLoopStatement
	WhileStatement = es('WhileStatement', 'test', Expression, 'body', Statement),
	DebuggerStatement = es('DebuggerStatement'),
	ExpressionStatement = es('ExpressionStatement', 'expression', Expression),
	IfStatement = es('IfStatement',
		'test', Expression, 'consequent', Statement, 'alternate', nullable(Statement)),

	BreakStatement = es('BreakStatement', 'label', nullable(Identifier)),

	SwitchCase = e('SwitchCase', 'test', Expression, 'consequent', Statement),
	// TODO: SwitchTrueStatement
	SwitchStatement = es('SwitchStatement',
		'discriminant', Expression, 'cases', [SwitchCase], 'lexical', Boolean)
