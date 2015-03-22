import assert from "assert"
import check from "../check"
import { UseKeywords } from "../Lang"
import { code, set } from "../U"
import { None } from "../U/Op"
import { head, isEmpty, last, repeat, tail } from "../U/Sq"
import type, { isa } from "../U/type"
const
	E = require("../E"),
	T = require("../T"),
	Px = require("./Px")
const
	parseBlock_ = function() { return require("./parseBlock") },
	parseLocals_ = function() { return require("./parseLocals") }

module.exports = function parseUse(px, k) {
	type(px, Px, k, UseKeywords)
	const _ = parseBlock_().takeBlockLinesFromEnd(px)
	px.check(isEmpty(_.before), function() {
		return "Did not expect anything after " + code("use") + " other than a block"
	})
	return _.lines.map(function(line) { return useLine(px.w(line.sqt), k) })
}

// TODO:ES6 Just use module imports, no AssignDestructure needed
const useLine = function(px, k) {
	const tReq = head(px.sqt)
	const _$ = parseRequire(px.wt(tReq))
	const required = _$.required, name = _$.name

	if (k === "use!") {
		px.check(px.sqt.length === 1, function() { return "Unexpected " + px.sqt[1] })
		return E.Ignore(px.s({ ignored: required }))
	} else {
		const isLazy = k === "use~"

		const defaultAssignee = E.LocalDeclare(px.s({
			name: name,
			opType: None,
			isLazy: isLazy,
			okToNotUse: false
		}))
		const assignees = px.sqt.length === 1 ?
			[ defaultAssignee ] :
			parseLocals_()(px.w(tail(px.sqt))).map(function(l) {
				const l2 = l.name === "_" ? set(l, "name", name) : l
				return set(l2, "isLazy", isLazy)
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
	const first = head(px.sqt)

	let parts = []
	if (isa(first, T.DotName))
		parts = first.nDots === 1 ? ["."] : repeat("..", first.nDots - 1)
	else
		check(isa(first, T.Name), first.span, "Not a valid part of module path")
	parts.push(first.name)
	tail(px.sqt).forEach(function(t) {
		check(isa(t, T.DotName) && t.nDots === 1, t.span, "Not a valid part of module path")
		parts.push(t.name)
	})
	return {
		required: E.Require({ span: px.span, path: parts.join("/") }),
		name: last(px.sqt).name
	}
}
