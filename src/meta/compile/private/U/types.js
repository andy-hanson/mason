import mangle from 'esast/dist/mangle-identifier'
import { type } from './util'

export function ObjType(name, superType, members) {
	type(name, String, superType, Object, members, Object)
	const prototype = Object.create(superType.prototype)
	Object.keys(members).forEach(key => type(members[key], Object))

	let s = `return function ${mangle(name)}(props) { const _ = Object.create(prototype);`
	Object.keys(members).forEach(member => {
		s = s + `_["${member}"] = props["${member}"];`
	})
	s = s + 'return _}'
	const theType = Function('prototype', s)(prototype)

	theType.toString = () => name
	theType.prototype = prototype
	Object.assign(theType.prototype, {
		constructor: theType,
		toString: inspect
	})

	return theType
}

function inspect() {
	let s = `${this.constructor.name} {`
	Object.keys(this).forEach(key => {
		const val = this[key]
		const str = val instanceof Array ? val.join(',\n') : toStr(val)
		s = s + `\n\t${key}: ${indented(str)}`
	})
	return s + '\n}'
}

const
	indented = str => str.replace(/\n/g, '\n\t'),
	toStr = _ =>
		_ === null ? 'null' : _ === undefined ? 'undefined' : _.toString()

