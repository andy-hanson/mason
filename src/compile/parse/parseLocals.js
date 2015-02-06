"use strict"

const
	check = require("../check"),
	E = require("../E"),
	Op = require("../U/Op"),
	Span = require("../Span"),
	Sq = require("../U/Sq"),
	T = require("../T"),
	type = require("../U/type"),
		isa = type.isa,
	U = require("../U"),
	Px = require("./Px")
const
	parseSpaced = require("./parseSpaced")

const parseLocals = module.exports = function(px, sqt) {
	return sqt.map(function(t) {
		return parseLocal(px.withSpan(t.span), t)
	})
}

const parseLocal = parseLocals.parseLocal = function(px, t) {
	let name
	let opType = Op.None
	let isLazy = false

	if (T.Group.is('sp')(t)) {
		const sqt = t.sqt
		const head = Sq.head(sqt)
		let rest = sqt
		if (T.Keyword.is("~")(head)) {
			isLazy = true
			rest = Sq.tail(sqt)
		}
		name = parseLocalName(px, Sq.head(rest))
		const rest2 = Sq.tail(rest)
		if (!Sq.isEmpty(rest2)) {
			const colon = Sq.head(rest2)
			check(T.Keyword.is(":")(colon), colon.span, "Expected " + U.code(":"))
			check(rest2.length > 1, px.span, "Expected something after " + colon)
			const sqtType = Sq.tail(rest2)
			opType = Op.Some(parseSpaced(px.withSpan(Span.ofSqT(px.span, sqtType)), sqtType))
		}
	}
	else
		name = parseLocalName(px, t)

	return E.LocalDeclare(px.s({ name: name, opType: opType, isLazy: isLazy, okToNotUse: false }))
}

const parseLocalName = function(px, t) {
	if (T.Keyword.is("_")(t))
		return "_"
	else {
		check(isa(t, T.Name), t.span, function() { return "Expected a local name, not " + t })
		return t.name
	}
}
