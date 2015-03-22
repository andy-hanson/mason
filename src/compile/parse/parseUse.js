const
	assert = require("assert"),
	check = require("../check"),
	E = require("../E"),
	Lang = require("../Lang"),
	Op = require("../U/Op"),
	T = require("../T"),
	Sq = require("../U/Sq"),
	type = require("../U/type"),
		isa = type.isa,
	U = require("../U"),
	Px = require("./Px")
const
	parseBlock_ = function() { return require("./parseBlock") },
	parseLocals_ = function() { return require("./parseLocals") }

module.exports = function parseUse(px, k) {
	type(px, Px, k, Lang.UseKeywords)
	const _ = parseBlock_().takeBlockLinesFromEnd(px)
	px.check(Sq.isEmpty(_.before), function() {
		return "Did not expect anything after " + U.code("use") + " other than a block"
	})
	return _.lines.map(function(line) { return useLine(px.w(line.sqt), k) })
}

// TODO:ES6 Just use module imports, no AssignDestructure needed
const useLine = function(px, k) {
	const tReq = Sq.head(px.sqt)
	const _$ = parseRequire(px.wt(tReq))
	const required = _$.required, name = _$.name

	if (k === "use!") {
		px.check(px.sqt.length === 1, function() { return "Unexpected " + px.sqt[1] })
		return E.Ignore(px.s({ ignored: required }))
	} else {
		const isLazy = k === "use~"

		const defaultAssignee = E.LocalDeclare(px.s({
			name: name,
			opType: Op.None,
			isLazy: isLazy,
			okToNotUse: false
		}))
		const assignees = px.sqt.length === 1 ?
			[ defaultAssignee ] :
			parseLocals_()(px.w(Sq.tail(px.sqt))).map(function(l) {
				const l2 = l.name === "_" ? U.with(l, "name", name) : l
				return U.with(l2, "isLazy", isLazy)
			})
		return E.AssignDestructure(px.s({
			assignees: assignees,
			k: "=",
			value: required,
			isLazy: isLazy,
			checkProperties: true
		}))
	}
}

const parseRequire = function(px) {
	assert(px.sqt.length === 1)
	const t = px.sqt[0]
	if (isa(t, T.Name))
		return {
			required: E.Require({ span: t.span, path: t.name }),
			name: t.name
		}
	else if (isa(t, T.DotName))
		return parseLocalRequire(px)
	else {
		px.check(T.Group.is('sp')(t), "Not a valid module name")
		return parseLocalRequire(px.w(t.sqt))
	}
}

const parseLocalRequire = function(px) {
	const head = Sq.head(px.sqt)

	let parts = []
	if (isa(head, T.DotName))
		parts = head.nDots === 1 ? ["."] : Sq.repeat("..", head.nDots - 1)
	else
		check(isa(head, T.Name), head.span, "Not a valid part of module path")
	parts.push(head.name)
	Sq.tail(px.sqt).forEach(function(t) {
		check(isa(t, T.DotName) && t.nDots === 1, t.span, "Not a valid part of module path")
		parts.push(t.name)
	})
	return {
		required: E.Require({ span: px.span, path: parts.join("/") }),
		name: Sq.last(px.sqt).name
	}
}
