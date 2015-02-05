"use strict"

const
	E = require("../E"),
	Lang = require("../Lang"),
	T = require("../T"),
	Sq = require("../U/Sq"),
	type = require("../U/type"),
	Px = require("./Px")
const
	parseCase = require("./parseCase"),
	parseFun_ = function() { return require("./parseFun") },
	parseSingle = require("./parseSingle")

const parseExpr = module.exports = function(px, sqt) {
	type(px, Px, sqt, [T])
	const parts = parseExprParts(px, sqt)
	switch (parts.length) {
		case 0:
			return E.Null(px.s({}))
		case 1:
			return Sq.head(parts)
		default:
			return E.Call(px.s({ called: Sq.head(parts), args: Sq.tail(parts) }))
	}
}

const parseExprParts = parseExpr.parseExprParts = function(px, sqt) {
	type(px, Px, sqt, [T])
	if (Sq.isEmpty(sqt))
		return []
	const head = Sq.head(sqt), rest = Sq.tail(sqt)
	switch (true) {
		case T.Keyword.is(Lang.KFun)(head):
			return [ parseFun_()(px, rest, head.k) ]
		// `case!` can not be part of an expression - it is a statement.
		case T.Keyword.is("case")(head):
			return [ parseCase(px, rest, "case", false) ]
		default:
			return Sq.cons(parseSingle(px, head), parseExprParts(px.withSqTSpan(rest), rest))
	}
}
