const
	assert = require("assert"),
	check = require("../check"),
	E = require("../E"),
	Op = require("../U/Op"),
	Sq = require("../U/Sq"),
	T = require("../T"),
	type = require("../U/type"),
		isa = type.isa,
	U = require("../U")
const
	parseSpaced = require("./parseSpaced")

const parseLocals = module.exports = function(px) {
	return px.sqt.map(function(t) {
		return parseLocal(px.wt(t))
	})
}

const parseLocal = parseLocals.parseLocal = function(px) {
	let name
	let opType = Op.None
	let isLazy = false

	assert(px.sqt.length === 1)
	const t = px.sqt[0]

	if (T.Group.is('sp')(t)) {
		const sqt = t.sqt
		const head = Sq.head(sqt)
		let rest = sqt
		if (T.Keyword.is("~")(head)) {
			isLazy = true
			rest = Sq.tail(sqt)
		}
		name = parseLocalName(Sq.head(rest))
		const rest2 = Sq.tail(rest)
		if (!Sq.isEmpty(rest2)) {
			const colon = Sq.head(rest2)
			check(T.Keyword.is(":")(colon), colon.span, function() {
				return "Expected " + U.code(":")
			})
			px.check(rest2.length > 1, function() { return "Expected something after " + colon })
			const sqtType = Sq.tail(rest2)
			opType = Op.Some(parseSpaced(px.w(sqtType)))
		}
	}
	else
		name = parseLocalName(t)

	return E.LocalDeclare(px.s({ name: name, opType: opType, isLazy: isLazy, okToNotUse: false }))
}

const parseLocalName = function(t) {
	if (T.Keyword.is("_")(t))
		return "_"
	else {
		check(isa(t, T.Name), t.span, function() { return "Expected a local name, not " + t })
		return t.name
	}
}
