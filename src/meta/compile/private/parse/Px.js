import Loc from 'esast/dist/Loc'
import { SubContext } from '../Cx'
import type from '../U/type'
import Slice from '../U/Slice'

export default class Px extends SubContext {
	constructor(cx, tokens, loc) {
		super(cx)
		type(tokens, Slice)
		this.tokens = tokens
		this.loc = loc
	}

	check(cond, loc, message) {
		if (message === undefined) {
			message = loc
			super.check(cond, this.loc, message)
		} else
			super.check(cond, loc, message)
	}

	checkEmpty(tokens, message) {
		super.check(tokens.isEmpty(), () => locFromTokens(tokens), message)
	}

	fail(loc, message) {
		if (message === undefined) {
			message = loc
			super.fail(this.loc, message)
		} else
			super.fail(loc, message)
	}

	w(tokens, fun, arg, arg2, arg3) {
		const t = this.tokens
		this.tokens = tokens
		const s = this.loc
		this.loc = tokens.isEmpty() ? this.loc : locFromTokens(tokens)
		const res = fun(this, arg, arg2, arg3)
		this.tokens = t
		this.loc = s
		return res
	}

	wt(t, fun, arg) {
		return this.w(new Slice([t]), fun, arg)
	}
}

const locFromTokens = ts => Loc(ts.head().loc.start, ts.last().loc.end)
