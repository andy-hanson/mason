import { blue, green, magenta, bold } from 'chalk'
import CompileError, { Warning, formatCode } from '../CompileError'
import Opts from '../private/Opts'
import { toArray } from '../private/U/Bag'
import type from '../private/U/type'
import { assert } from '../private/U/util'

export default (error, modulePath) => format(error.warning, modulePath, 'error')

export const formatWarningForConsole = (warning, modulePath) => {
	type(warning, Warning, modulePath, String)
	// Extra space to match up with 'error'
	return format(warning, modulePath, 'warn ')
}

const format = (warning, modulePath, kind) => {
	// Turn code green
	const message = toArray(formatCode(warning.message, green)).join('')
	return `${blue(modulePath)}\n${magenta(kind)} ${bold.red(warning.loc)} ${message}`
}
