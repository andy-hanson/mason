"use strict"

const
	Opts = require("../Opts"),
	Span = require("../Span"),
	U = require("../U")

const Px = module.exports = Span.spanType("Px", Object, { opts: Opts })
Object.assign(Px.prototype, {
	withSpan: function(span) {
		return U.with(this, "span", span);
	},
	sqtSpan: function(sqt) {
		return Span.ofSqT(this.span, sqt)
	},
	withSqTSpan: function(sqt) {
		return U.with(this, "span", this.sqtSpan(sqt))
	},
	s: function(members) {
		return Object.assign(members, { span: this.span })
	}
})
