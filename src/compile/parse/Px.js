import check, { fail } from "../check"
import Span, { spanType } from "../Span"
import { head, isEmpty, last } from "../U/Bag"
import T from "../Token"

const Px = spanType("Px", Object, { sqt: [T] })
export default Px
Object.assign(Px.prototype, {
	check(cond, message) {
		check(cond, this.span, message)
	},
	checkEmpty(sqt, message) {
		check(isEmpty(sqt), () => spanFromTokens(sqt), message)
	},
	fail(message) {
		fail(this.span, message)
	},
	s(members) {
		return Object.assign(members, { span: this.span })
	},
	w(sqt) {
		return Px({
			span: isEmpty(sqt) ? this.span : spanFromTokens(sqt),
			sqt: sqt,
			opts: this.opts
		})
	},
	wt(t) {
		return this.w([t])
	}
})

const spanFromTokens = ts => Span({
	start: head(ts).span.start,
	end: last(ts).span.end
})
