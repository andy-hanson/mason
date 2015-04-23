import Loc from 'esast/dist/Loc'
import tupl from 'tupl/dist/tupl'
import type from './private/U/type'

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

export const Warning = tupl('Warning', Object, 'doc', [ 'loc', Loc, 'message', String ])

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
