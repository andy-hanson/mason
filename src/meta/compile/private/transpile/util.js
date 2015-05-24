import { ForStatement, Identifier, Literal, NewExpression, Statement,
	ThrowStatement, VariableDeclarator } from 'esast/dist/ast'
import mangleIdentifier from 'esast/dist/mangle-identifier'
import specialize, { variableDeclarationConst } from 'esast/dist/specialize'
import { IdError } from './ast-constants'
import { msUnlazy } from './ms-call'

export const
	accessLocalDeclare = localDeclare =>
		localDeclare.isLazy() ?
			msUnlazy(idForDeclareCached(localDeclare)) :
			Identifier(idForDeclareCached(localDeclare).name),

	declare = (localDeclare, val) =>
		variableDeclarationConst([ VariableDeclarator(idForDeclareCached(localDeclare), val) ]),

	forStatementInfinite = specialize(ForStatement,
		[ 'body', Statement ],
		{ init: null, test: null, update: null }),

	idForDeclareCached = localDeclare => {
		let _ = declareToId.get(localDeclare)
		if (_ === undefined) {
			_ = Identifier(mangleIdentifier(localDeclare.name))
			declareToId.set(localDeclare, _)
		}
		return _
	},

	throwError = msg =>
		ThrowStatement(NewExpression(IdError, [ Literal(msg) ]))

const
	declareToId = new WeakMap()
