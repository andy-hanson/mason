import { builders } from 'ast-types'
const { identifier, literal } = builders
import mangleIdentifier, { needsMangle, propertyNameOk } from './mangleIdentifier'

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

const propertyToIdOrLiteral = new Map()
export const propertyIdOrLiteral = propertyName => {
	let _ = propertyToIdOrLiteral.get(propertyName)
	if (_ === undefined) {
		_ = propertyNameOk(propertyName) ? identifier(propertyName) : literal(propertyName)
		propertyToIdOrLiteral.set(propertyName, _)
	}
	return _
}
