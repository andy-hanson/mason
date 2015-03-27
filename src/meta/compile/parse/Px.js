import check, { fail } from '../check'
import Span, { spanType } from '../Span'
import { head, isEmpty, last } from '../U/Bag'
import type from '../U/type'
import Slice from '../U/Slice'
import T from '../Token'

export default class Px {
	constructor(tokens, span) {
		type(tokens, Slice)
		this.tokens = tokens
		this.span = span
	}

	check(cond, message) {
		check(cond, this.span, message)
	}

	checkEmpty(tokens, message) {
		check(tokens.isEmpty(), () => spanFromTokens(tokens), message)
	}

	fail(message) {
		fail(this.span, message)
	}

	s(props) {
		props.span = this.span
		return props
	}

	w(tokens, fun, arg, arg2, arg3) {
		const t = this.tokens
		this.tokens = tokens
		const s = this.span
		this.span = tokens.isEmpty() ? this.span : spanFromTokens(tokens)
		const f = fun(this, arg, arg2, arg3)
		this.tokens = t
		this.span = s
		return f
		// return new Px(tokens, tokens.isEmpty() ? this.span : spanFromTokens(tokens))
	}

	wt(t, fun, arg) {
		return this.w(new Slice([t]), fun, arg)
		// return new Px(new Slice([t]), t.span)
	}
}

const spanFromTokens = ts => Span({
	start: ts.head().span.start,
	end: ts.last().span.end
})
