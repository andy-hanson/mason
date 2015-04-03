import Span from './Span'
import { assert } from './U'
import type from './U/type'
import { tuple } from './U/types'

export default function CompileError(warning) {
	if (!(this instanceof CompileError))
		return new CompileError(warning)
	type(warning, Warning)
	this.warning = warning
	// In case it's not caught and formatted:
	this.message = warning.message
	this.stack = new Error(warning.message).stack
}
CompileError.prototype = Object.create(Error.prototype)

export const Warning = tuple(Object, 'span', Span, 'message', String)

export const code = str => `{{${str}}}`
export const formatCode = (str, formatter) => str.replace(/({{.+}})/g, _ => {
	assert(_.startsWith('{{') && _.endsWith('}}'))
	return formatter(_.slice(2, _.length - 2))
})
