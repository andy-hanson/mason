import { builders } from 'ast-types'
const { identifier } = builders
import mangleIdentifier from './mangleIdentifier'

const declareToId = new WeakMap()
export const idCached = localDeclare => {
	let _ = declareToId.get(localDeclare)
	if (_ === undefined) {
		_ = identifier(mangleIdentifier(localDeclare.name))
		declareToId.set(localDeclare, _)
	}
	return _
}

export const idNew = localDeclare => identifier(idCached(localDeclare).name)

const specialNameToId = new Map()
export const idSpecialCached = name => {
	let _ = specialNameToId.get(name)
	if (_ === undefined) {
		_ = identifier(mangleIdentifier(name))
		specialNameToId.set(name, _)
	}
	return _
}
