"use strict"

const
	check = require("../check"),
	E = require("../E"),
	Lang = require("../Lang"),
	Op = require("../U/Op"),
	T = require("../T"),
	Span = require("../Span"),
	Sq = require("../U/Sq"),
	type = require("../U/type"),
		isa = type.isa,
	U = require("../U"),
	Px = require("./Px")
const
	parseBlock_ = function() { return require("./parseBlock") },
	parseLocals_ = function() { return require("./parseLocals") }

module.exports = function parseUse(px, sqt, k) {
	type(px, Px, sqt, [T], k, Lang.UseKeywords)
	const _ = parseBlock_().takeBlockLinesFromEnd(px, sqt)
	check(Sq.isEmpty(_.before), px.span, "Did not expect anything after " + U.code("use") + " other than a block")
	return _.lines.map(function(line) { return useLine(px.withSpan(line.span), line.sqt, k) })
}

// TODO:ES6 Just use module imports, no AssignDestructure needed
const useLine = function(px, sqt, k) {
	const tReq = Sq.head(sqt)
	const _$ = parseRequire(px.withSpan(tReq.span), tReq)
	const required = _$.required, name = _$.name
	const isLazy = k === "use~"

	const defaultAssignee = E.LocalDeclare(px.s({
		name: name,
		opType: Op.None,
		isLazy: isLazy,
		okToNotUse: false
	}))
	const assignees = (sqt.length === 1) ?
		[ defaultAssignee ] :
		parseLocals_()(px, Sq.tail(sqt)).map(function(l) {
			const l2 = (l.name === "_") ? U.with(l, "name", name) : l
			return U.with(l2, "isLazy", isLazy)
		})
	return E.AssignDestructure({
		span: px.sqtSpan(sqt),
		assignees: assignees,
		k: "=",
		value: required,
		isLazy: isLazy,
		checkProperties: true
	})
}

const parseRequire = function(px, t) {
	if (isa(t, T.Name))
		return {
			required: E.Require({ span: t.span, path: t.name }),
			name: t.name
		}
	else if (isa(t, T.DotName))
		return parseLocalRequire(px, [t])
	else {
		check(T.Group.is('sp')(t), px.span, "Not a valid module name")
		return parseLocalRequire(px, t.sqt)
	}
}

const parseLocalRequire = function(px, sqt) {
	const head = Sq.head(sqt)

	let parts = []
	if (isa(head, T.DotName))
		parts = (head.nDots === 1) ? ["."] : Sq.repeat("..", head.nDots - 1)
	else
		check(isa(head, T.Name), head.span, "Not a valid part of module path")
	parts.push(head.name)
	Sq.tail(sqt).forEach(function(t) {
		check(isa(t, T.DotName) && t.nDots === 1, t.span, "Not a valid part of module path")
		parts.push(t.name)
	})
	return {
		required: E.Require({ span: px.span, path: parts.join("/") }),
		name: Sq.last(sqt).name
	}
}
