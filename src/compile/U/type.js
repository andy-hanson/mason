import assert from 'assert'
import Op from './Op'
import { toArray } from './Bag'

export default function type() {
	if (!global.DEBUG)
		return
	for (let i = 0; i < arguments.length; i = i + 2)
		typePair(arguments[i], arguments[i + 1])
}

function typePair(instance, itsType) {
	if (itsType instanceof Array) {
		assert(itsType.length === 1)
		const emType = itsType[0]
		type(instance, Array)
		instance.forEach(em => type(em, emType))
	}
	if (!isa(instance, itsType)) {
		if (instance === null) throw new Error('Value null')
		if (instance === undefined) throw new Error('Value undefined')
		const strType =
			itsType instanceof Array ?
			`[${itsType[0].name}]` :
			itsType instanceof Set ?
			`{${toArray(itsType.values())}` :
			(itsType.displayName || itsType.name)
		throw new Error(`${instance} is not a ${strType}`)
	}
}

function isa(instance, itsType) {
	switch (true) {
		case itsType.prototype !== undefined:
			return instance != null && itsType.prototype.isPrototypeOf(Object(instance))
		case itsType instanceof Array: {
			assert(itsType.length === 1)
			const emType = itsType[0]
			return instance instanceof Array &&
				instance.every(em => isa(em, emType))
		}
		case Op.prototype.isPrototypeOf(itsType):
			return instance instanceof Array &&
				instance.length < 2 &&
				(instance.length === 0 || isa(instance[0], itsType.type))
		case itsType instanceof Set:
			return itsType.has(instance)
		default:
			throw new Error(`Not a type: ${itsType}`)
	}
}
