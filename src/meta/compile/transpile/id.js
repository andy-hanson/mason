import { Identifier, Literal } from '../esast'
import mangleIdentifier, { needsMangle, propertyNameOk } from './mangleIdentifier'

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
