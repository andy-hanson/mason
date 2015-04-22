import { Identifier, VariableDeclarator } from 'esast/dist/ast'
import { idCached } from 'esast/dist/util'
import { variableDeclarationConst } from 'esast/dist/specialize'
import mangleIdentifier from 'esast/dist/mangle-identifier'

const declareToId = new WeakMap()
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
		variableDeclarationConst([ VariableDeclarator(idCached(name), val) ])
