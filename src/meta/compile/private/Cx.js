import CompileError, { Warning } from '../CompileError'
import Span, { Pos } from './Span'
import type from './U/type'

export default class Cx {
	constructor(opts) {
		this.opts = opts
		this.warnings = []
	}
}

// Intended to be inherited by specific contexts.
export class SubContext {
	constructor(cx) {
		this.cx = cx
	}

	check(cond, span, message) {
		if (!cond)
			this.fail(span, message)
	}

	fail(span, message) {
		throw CompileError(warning(span, message))
	}

	warnIf(cond, span, message) {
		if (cond)
			this.cx.warnings.push(warning(span, message))
	}

	opts() { return this.cx.opts }
}

const unlazy = _ => _ instanceof Function ? _() : _

const warning = (span, message) => {
	span = unlazy(span); message = unlazy(message)
	if (span instanceof Pos)
		span = Span.single(span)
	type(span, Span, message, String)
	return Warning(span, message)
}
