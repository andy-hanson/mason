import type from './type'
import { indented } from './index'

export function abstractType(name, superType) {
	type(name, String, superType, Object)
	return Object.assign(function() { throw new Error('Don\'t call me!') }, {
		prototype: Object.create(superType.prototype),
		getName() { return name },
		toString() { return name }
	})
}

export function ObjType(name, superType, members) {
	type(name, String, superType, Object, members, Object)
	const prototype = Object.create(superType.prototype)
	Object.keys(members).forEach(key => type(members[key], Object))

	let s = 'return function(props) { const _ = Object.create(prototype);'
	Object.keys(members).forEach(member => {
		s = s + `_["${member}"] = props["${member}"];`
	})
	s = s + 'return _}'
	const theType = Function('prototype', s)(prototype)

	theType.displayName = name
	theType.toString = () => name
	theType.prototype = prototype
	Object.assign(theType.prototype, {
		constructor: theType,
		toString() { return inspect(this) }
	})

	return theType
}

function inspect(_) {
	const indented = str => str.replace(/\n/g, '\n\t')

	let s = (_.constructor.displayName || _.constructor.name) + ' {'
	Object.keys(_).forEach(key => {
		const val = _[key]
		const str = val instanceof Array ? val.join(',\n') : toStr(val)
		s = s + `\n\t${key}: ${indented(str)}`
	})
	return s + '\n}'
}

const toStr = _ =>
	_ === null ? 'null' : _ === undefined ? 'undefined' : _.toString()

