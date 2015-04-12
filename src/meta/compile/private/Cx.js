import CompileError, { Warning } from '../CompileError'
import Loc, { Pos, singleCharLoc } from 'esast/dist/Loc'
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

	check(cond, loc, message) {
		if (!cond)
			this.fail(loc, message)
	}

	fail(loc, message) {
		throw CompileError(warning(loc, message))
	}

	warnIf(cond, loc, message) {
		if (cond)
			this.cx.warnings.push(warning(loc, message))
	}

	opts() { return this.cx.opts }
}

const unlazy = _ => _ instanceof Function ? _() : _

const warning = (loc, message) => {
	loc = unlazy(loc)
	message = unlazy(message)
	if (loc instanceof Pos)
		loc = singleCharLoc(loc)
	type(loc, Loc, message, String)
	return Warning(loc, message)
}
