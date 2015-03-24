import check, { fail } from '../check'
import Span, { spanType } from '../Span'
import { head, isEmpty, last } from '../U/Bag'
import T from '../Token'

export default class Px {
	constructor(sqt, span) {
		this.sqt = sqt
		this.span = span
	}

	check(cond, message) {
		check(cond, this.span, message)
	}

	checkEmpty(sqt, message) {
		check(isEmpty(sqt), () => spanFromTokens(sqt), message)
	}

	fail(message) {
		fail(this.span, message)
	}

	s(props) {
		props.span = this.span
		return props
	}

	w(sqt) {
		return new Px(sqt, isEmpty(sqt) ? this.span : spanFromTokens(sqt))
	}

	wt(t) {
		return new Px([t], t.span)
	}
}

const spanFromTokens = ts => Span({
	start: head(ts).span.start,
	end: last(ts).span.end
})
