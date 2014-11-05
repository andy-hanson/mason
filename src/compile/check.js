"use strict"

const
	chalk = require("chalk"),
	Span = require("./Span"),
	type = require("./U/type"),
	U = require("./U")

const check = module.exports = function(cond, spanOrPos, message) {
	if (!cond)
		check.fail(spanOrPos, message)
}

check.fail = function(spanOrPos, message) {
	const p = type.isa(spanOrPos, Span) ? spanOrPos.start : spanOrPos
	type(p, Span.Pos)
	const msg = (message instanceof Function) ? message() : message
	type(msg, String)
	throw check.CompileError(chalk.bold.red(p) + " " + highlightMarkdown(msg))
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
