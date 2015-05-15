import { BinaryExpression, Expression, Identifier, Literal, NewExpression, Statement,
		ThrowStatement, UnaryExpression, VariableDeclarator, WhileStatement } from 'esast/dist/ast'
import mangleIdentifier from 'esast/dist/mangle-identifier'
import specialize, { variableDeclarationConst } from 'esast/dist/specialize'
import { idCached } from 'esast/dist/util'
import { IdError } from './ast-constants'
import { msUnlazy } from './ms-call'

export const
	accessLocalDeclare = localDeclare =>
		localDeclare.isLazy ?
			msUnlazy(idForDeclareCached(localDeclare)) :
			Identifier(idForDeclareCached(localDeclare).name),

	binaryExpressionNotEqual = specialize(BinaryExpression,
		[ 'left', Expression, 'right', Expression ],
		{ operator: '!==' }),

	binaryExpressionPlus = specialize(BinaryExpression,
		[ 'left', Expression, 'right', Expression ],
		{ operator: '+' }),

	declare = (localDeclare, val) =>
		variableDeclarationConst([ VariableDeclarator(idForDeclareCached(localDeclare), val) ]),

	// Make declare from a string. This is for compiler-generated temporary locals.
	declareSpecial = (name, val) =>
		variableDeclarationConst([ VariableDeclarator(idCached(name), val) ]),

	idForDeclareCached = localDeclare => {
		let _ = declareToId.get(localDeclare)
		if (_ === undefined) {
			_ = Identifier(mangleIdentifier(localDeclare.name))
			declareToId.set(localDeclare, _)
		}
		return _
	},

	throwError = msg =>
		ThrowStatement(NewExpression(IdError, [ Literal(msg) ])),

	unaryExpressionNegate = specialize(UnaryExpression,
		[ 'argument', Expression ],
		{ operator: '-' }),

	unaryExpressionVoid = specialize(UnaryExpression,
		[ 'argument', Expression ],
		{ operator: 'void' }),

	whileStatementInfinite = specialize(WhileStatement,
		[ 'body', Statement ],
		{ test: Literal(true) })

const
	declareToId = new WeakMap()
