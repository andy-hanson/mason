import Span, { Pos } from "./Span"
import type, { isa } from "./U/type"
const
	chalk = require("chalk")

export default function check(cond, spanOrPos, message) {
	if (!cond)
		check.fail(spanOrPos, message)
}

export function warnIf(opts, cond, spanOrPos, message) {
	if (cond)
		console.log(failMessage(spanOrPos, message, opts))
}

export function fail(spanOrPos, message) {
	throw check.CompileError(failMessage(spanOrPos, message))
}

const failMessage = function(spanOrPos, message, opts) {
	const p = isa(spanOrPos, Span) ? spanOrPos.start : spanOrPos
	type(p, Pos)
	const msg = message instanceof Function ? message() : message
	type(msg, String)
	const posMessage = p + " " + highlightMarkdown(msg)
	return opts ? chalk.green(opts.modulePath()) + " " + posMessage : posMessage
}

const makeErrorType = function() {
	const it = function(message) {
		if (!(this instanceof it)) return new it(message);
		this.message = message
		this.stack = new Error(message).stack
	}
	it.prototype = Object.create(Error.prototype)
	return it
}

check.CompileError = makeErrorType()

const highlightMarkdown = function(str) {
	return str.replace(/`[^`]*`/g, function(x) {
		return chalk.bold.green(x.slice(1, x.length - 1))
	})
}
