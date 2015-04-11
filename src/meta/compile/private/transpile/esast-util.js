import { Identifier, VariableDeclarator } from 'esast/ast'
import { idCached } from 'esast/util'
import { variableDeclarationConst } from 'esast/specialize'
import mangleIdentifier from 'esast/mangle-identifier'
import { LocalDeclare } from '../../Expression'
import type from '../U/type'

const declareToId = new WeakMap()
export const idForDeclareCached = localDeclare => {
	let _ = declareToId.get(localDeclare)
	if (_ === undefined) {
		_ = Identifier(mangleIdentifier(localDeclare.name))
		declareToId.set(localDeclare, _)
	}
	return _
}

export const idForDeclareNew = localDeclare => Identifier(idForDeclareCached(localDeclare).name)

export function declare(localDeclare, val) {
	type(localDeclare, LocalDeclare, val, Object)
	return variableDeclarationConst([ VariableDeclarator(idForDeclareCached(localDeclare), val) ])
}
export function declareSpecial(name, val) {
	type(name, String, val, Object)
	return variableDeclarationConst([ VariableDeclarator(idCached(name), val) ])
}
