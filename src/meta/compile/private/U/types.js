import type from './type'
import { assert, indented } from './util'

export const tuple = (superType, ...namesTypes) => {
	let names = []
	assert(namesTypes.length % 2 === 0)
	for (let i = 0; i < namesTypes.length; i = i + 2)
		names.push(namesTypes[i])
	let args = names.join(', ')

	let body = `return function ctr(${args}) { if (!(this instanceof ctr)) return new ctr(${args});`
	names.forEach(name => {
		body = body + `this.${name} = ${name};`
	})
	body = body + '}'
	const ctr = Function(body)()
	ctr.prototype = Object.create(superType.prototype)
	return ctr
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

