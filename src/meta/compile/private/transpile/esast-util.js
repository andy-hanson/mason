import { Expression, BinaryExpression, Identifier, Literal, NewExpression, Statement, SwitchCase,
	SwitchStatement, ThrowStatement, UnaryExpression, VariableDeclarator, WhileStatement
	} from 'esast/dist/ast'
import mangleIdentifier from 'esast/dist/mangle-identifier'
import specialize, { variableDeclarationConst } from 'esast/dist/specialize'
import { idCached } from 'esast/dist/util'

const
	declareToId = new WeakMap(),
	LitTrue = Literal(true)

export const
	idForDeclareCached = localDeclare => {
		let _ = declareToId.get(localDeclare)
		if (_ === undefined) {
			_ = Identifier(mangleIdentifier(localDeclare.name))
			declareToId.set(localDeclare, _)
		}
		return _
	},

	idForDeclareNew = localDeclare => Identifier(idForDeclareCached(localDeclare).name),

	declare = (localDeclare, val) =>
		variableDeclarationConst([ VariableDeclarator(idForDeclareCached(localDeclare), val) ]),

	declareSpecial = (name, val) =>
		variableDeclarationConst([ VariableDeclarator(idCached(name), val) ]),

	throwError = msg =>
		ThrowStatement(NewExpression(Identifier('Error'), [ Literal(msg) ])),

	binaryExpressionPlus = specialize(BinaryExpression,
		[ 'left', Expression, 'right', Expression ],
		{ operator: '+' }),

	switchStatementOnTrue = specialize(SwitchStatement,
		[ 'cases', [SwitchCase] ],
		{
			discriminant: LitTrue,
			// May contain nested variable declarations
			lexical: true
		}),

	unaryExpressionNegate = specialize(UnaryExpression,
		[ 'argument', Expression ],
		{ operator: '-' }),

	whileStatementInfinite = specialize(WhileStatement,
		[ 'body', Statement ],
		{ test: LitTrue })
