import check, { fail } from "../check"
import { ofSqT, spanType } from "../Span"
import { isEmpty } from "../U/Sq"
import T from "../T"

const Px = spanType("Px", Object, { sqt: [T] })
export default Px
Object.assign(Px.prototype, {
	check(cond, message) {
		check(cond, this.span, message)
	},
	checkEmpty(sqt, message) {
		check(isEmpty(sqt), ofSqT(this.span, sqt), message)
	},
	fail(message) {
		fail(this.span, message)
	},
	s(members) {
		return Object.assign(members, { span: this.span })
	},
	w(sqt) {
		return Px({
			span: ofSqT(this.span, sqt),
			sqt: sqt,
			opts: this.opts
		})
	},
	wt(t) {
		return this.w([t])
	}
})
