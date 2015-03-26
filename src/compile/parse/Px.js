import check, { fail } from '../check'
import Span, { spanType } from '../Span'
import { head, isEmpty, last } from '../U/Bag'
import T from '../Token'

export default class Px {
	constructor(tokens, span) {
		this.tokens = tokens
		this.span = span
	}

	check(cond, message) {
		check(cond, this.span, message)
	}

	checkEmpty(tokens, message) {
		check(isEmpty(tokens), () => spanFromTokens(tokens), message)
	}

	fail(message) {
		fail(this.span, message)
	}

	s(props) {
		props.span = this.span
		return props
	}

	w(tokens) {
		return new Px(tokens, isEmpty(tokens) ? this.span : spanFromTokens(tokens))
	}

	wt(t) {
		return new Px([t], t.span)
	}
}

const spanFromTokens = ts => Span({
	start: head(ts).span.start,
	end: last(ts).span.end
})
