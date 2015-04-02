import { SubContext } from '../Cx'
import Span, { spanType } from '../Span'
import { head, isEmpty, last } from '../U/Bag'
import type from '../U/type'
import Slice from '../U/Slice'
import T from '../Token'

export default class Px extends SubContext {
	constructor(cx, tokens, span) {
		super(cx)
		type(tokens, Slice)
		this.tokens = tokens
		this.span = span
	}

	check(cond, span, message) {
		if (span instanceof Span)
			super.check(cond, this.span, message)
		else
			super.check(cond, this.span, message)
	}

	checkEmpty(tokens, message) {
		super.check(tokens.isEmpty(), () => spanFromTokens(tokens), message)
	}

	fail(message) {
		super.fail(this.span, message)
	}

	w(tokens, fun, arg, arg2, arg3) {
		const t = this.tokens
		this.tokens = tokens
		const s = this.span
		this.span = tokens.isEmpty() ? this.span : spanFromTokens(tokens)
		const res = fun(this, arg, arg2, arg3)
		this.tokens = t
		this.span = s
		return res
	}

	wt(t, fun, arg) {
		return this.w(new Slice([t]), fun, arg)
	}
}

const spanFromTokens = ts => new Span(ts.head().span.start, ts.last().span.end)
