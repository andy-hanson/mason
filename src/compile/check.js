import chalk from "chalk"
import Span, { Pos } from "./Span"
import type, { isa } from "./U/type"

export default function check(cond, spanOrPos, message) {
	if (!cond)
		fail(spanOrPos, message)
}

export function warnIf(opts, cond, spanOrPos, message) {
	if (cond)
		// Two spaces to match up with "error "
		console.log(chalk.magenta("warn  ") + failMessage(spanOrPos, message, opts))
}

export function fail(spanOrPos, message) {
	throw CompileError(failMessage(spanOrPos, message))
}

function failMessage(spanOrPos, message, opts) {
	if (spanOrPos instanceof Function)
		spanOrPos = spanOrPos()
	const p = isa(spanOrPos, Span) ? spanOrPos.start : spanOrPos
	type(p, Pos)
	const msg = message instanceof Function ? message() : message
	type(msg, String)
	const posMessage = p + " " + highlightMarkdown(msg)
	return opts ? chalk.green(opts.modulePath()) + " " + posMessage : posMessage
}

function makeErrorType() {
	const it = function(message) {
		if (!(this instanceof it)) return new it(message);
		this.message = message
		this.stack = new Error(message).stack
	}
	it.prototype = Object.create(Error.prototype)
	return it
}

export const CompileError = makeErrorType()

function highlightMarkdown(str) {
	return str.replace(/`[^`]*`/g, function(x) {
		return chalk.bold.green(x.slice(1, x.length - 1))
	})
}
