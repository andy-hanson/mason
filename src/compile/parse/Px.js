"use strict"

const
	check = require("../check"),
	Opts = require("../Opts"),
	Span = require("../Span"),
	Sq = require("../U/Sq"),
	T = require("../T"),
	U = require("../U")

const Px = module.exports = Span.spanType("Px", Object, { sqt: [T] })
Object.assign(Px.prototype, {
	check: function(cond, message) {
		check(cond, this.span, message)
	},
	checkEmpty: function(sqt, message) {
		check(Sq.isEmpty(sqt), Span.ofSqT(this.span, sqt), message)
	},
	fail: function(message) {
		check.fail(this.span, message)
	},

	s: function(members) {
		return Object.assign(members, { span: this.span })
	},
	w: function(sqt) {
		return Px({
			span: Span.ofSqT(this.span, sqt),
			sqt: sqt,
			opts: this.opts
		})
	},
	wt: function(t) {
		return this.w([t])
	}
})
