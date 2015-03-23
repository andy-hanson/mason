import check, { fail } from "../check"
import { ofSqT, spanType } from "../Span"
import { isEmpty } from "../U/Sq"
import T from "../T"

const Px = spanType("Px", Object, { sqt: [T] })
export default Px
Object.assign(Px.prototype, {
	check: function(cond, message) {
		check(cond, this.span, message)
	},
	checkEmpty: function(sqt, message) {
		check(isEmpty(sqt), ofSqT(this.span, sqt), message)
	},
	fail: function(message) {
		fail(this.span, message)
	},

	s: function(members) {
		return Object.assign(members, { span: this.span })
	},
	w: function(sqt) {
		return Px({
			span: ofSqT(this.span, sqt),
			sqt: sqt,
			opts: this.opts
		})
	},
	wt: function(t) {
		return this.w([t])
	}
})
