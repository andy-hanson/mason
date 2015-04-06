import Span from './private/Span'
import type from './private/U/type'
import { tuple } from './private/U/types'

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

export const formatCode = function*(str, formatter) {
	const rgx = /{{(.*?)}}/g
	let prevIdx = 0
	while (true) {
		const match = rgx.exec(str)
		if (match === null) {
			yield str.slice(prevIdx, str.length)
			break
		} else {
			yield str.slice(prevIdx, match.index)
			yield formatter(match[1])
			prevIdx = rgx.lastIndex
		}
	}
}
