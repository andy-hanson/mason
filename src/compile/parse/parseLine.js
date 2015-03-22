import assert from "assert"
import check from "../check"
import { defaultLoopName, LineSplitKeywords } from "../Lang"
import { set } from "../U"
import { ifElse, some } from "../U/Op"
import { head, isEmpty, last, opSplitOnceWhere, tail } from "../U/Sq"
import type, { isa } from "../U/type"
const
	E = require("../E"),
	T = require("../T"),
	Lang = require("../Lang"),
	Op = require("../U/Op"),
	Px = require("./Px")
const
	parseBlock_ = function() { return require("./parseBlock") },
	parseCase = require("./parseCase"),
	parseExpr = require("./parseExpr"),
	parseLocals = require("./parseLocals"),
	parseUse = require("./parseUse")

// Returns line or sq of lines
const parseLine = function(px) {
	type(px, Px)

	const first = head(px.sqt)
	const pxRest = px.w(tail(px.sqt))

	// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
	if (isa(first, T.Keyword))
		switch (first.k) {
			case ". ":
				return E.ListEntry(px.s({
					value: parseExpr(pxRest),
					// This is set by parseBlock.
					index: -1
				}))
			case "case!":
				return parseCase(pxRest, "case!", false)
			case "debug":
				return T.Group.is('->')(px.sqt[1]) ?
					// `debug`, then indented block
					E.Debug(px.s({ lines: parseLines(px) })) :
					// e.g. `debug use`
					E.Debug(px.s({ lines: parseLineOrLines(pxRest) }))
			case "debugger":
				px.checkEmpty(pxRest().sqt, function() {
					return "Did not expect anything after " + first
				})
				return E.Debugger(px.s({}))
			case "end-loop!":
				return E.EndLoop(px.s({ name: loopName(pxRest) }))
			case "loop!":
				return parseLoop(pxRest)
			case "region":
				return parseLines(px)
			case "use": case "use!": case "use~":
				return parseUse(pxRest, first.k)
			default:
				// fall through
		}

	return ifElse(opSplitOnceWhere(px.sqt, T.Keyword.is(LineSplitKeywords)),
		function(_) {
			return _.at.k === '->' ?
				parseMapEntry(px, _.before, _.after) :
				parseAssign(px, _.before, _.at, _.after)
		},
		function() { return parseExpr(px) })
}

const parseAssign = function(px, assigned, assigner, value) {
	let locals = parseLocals(px.w(assigned))
	const k = assigner.k
	const eValuePre = isEmpty(value) ? E.True(px.s({})) : parseExpr(px.w(value))

	let eValueNamed;
	if (locals.length === 1) {
		const name = head(locals).name
		if (name === "doc")
			if (eValuePre instanceof E.Fun)
				// KLUDGE: `doc` for module can be a Fun signature.
				// TODO: Something better...
				eValueNamed = set(eValuePre, "args", eValuePre.args.map(function(arg) {
					return set(arg, "okToNotUse", true)
				}))
			else
				eValueNamed = eValuePre
		else
			eValueNamed = tryAddDisplayName(eValuePre, name)
	}
	else
		eValueNamed = eValuePre

	const isYield = k === "<~" || k === "<~~"

	const eValue = valueFromAssign(eValueNamed, k)

	if (isEmpty(locals)) {
		px.check(isYield, "Assignment to nothing")
		return eValue
	}

	if (isYield)
		locals.forEach(function(_) {
			check(_.k !== "lazy", _.span, "Can not yield to lazy variable.")
		})

	if (k === ". ")
		locals = locals.map(function(l) {
			return set(l, "okToNotUse", true)
		})

	if (locals.length === 1) {
		const assign = E.Assign(px.s({ assignee: locals[0], k: k, value: eValue }))
		if (assign.assignee.name.endsWith("test") && k === ". ")
			return E.Debug(px.s({ lines: [ assign ] }))
		else return assign
	}
	else {
		const isLazy = locals.some(function(l) { return l.isLazy })
		if (isLazy)
			locals.forEach(function(_) {
				check(_.isLazy, _.span,
					"If any part of destructuring assign is lazy, all must be.")
			})
		return E.AssignDestructure(px.s({
			assignees: locals,
			k: k,
			value: eValue,
			isLazy: isLazy,
			checkProperties: false
		}))
	}
}

const valueFromAssign = function(valuePre, kAssign) {
	switch (kAssign) {
		case "<~":
			return E.Yield({ span: valuePre.span, yielded: valuePre })
		case "<~~":
			return E.YieldTo({ span: valuePre.span, yieldedTo: valuePre })
		default:
			return valuePre
	}
}

// We give it a displayName if:
// . It's a block
// . It's a function
// . It's one of those at the end of a block
// . It's one of those as the end member of a call.
const tryAddDisplayName = function(eValuePre, displayName)
{
	type(eValuePre, E, displayName, String)
	switch (true) {
		case isa(eValuePre, E.Call) && eValuePre.args.length > 0:
			// TODO: Immutable
			eValuePre.args[eValuePre.args.length - 1] =
				tryAddDisplayName(last(eValuePre.args), displayName)
			return eValuePre

		case isa(eValuePre, E.Fun):
			return E.DictReturn({
				span: eValuePre.span,
				keys: [], debugKeys: [],
				opDicted: some(eValuePre),
				opDisplayName: some(displayName)
			})

		case isa(eValuePre, E.DictReturn) &&
			!eValuePre.keys.some(function(key) { return key.name === "displayName" }):
			return set(eValuePre, "opDisplayName", some(displayName))

		case isa(eValuePre, E.BlockWrap):
			return ifElse(eValuePre.body.opReturn,
				function(ret) {
					const namedRet = tryAddDisplayName(ret, displayName)
					return set(eValuePre, "body",
						set(eValuePre.body, "opReturn", some(namedRet)))
				},
				function() { return eValuePre })

		default:
			return eValuePre
	}
}

const parseLoop = function(px) {
	const _ = parseBlock_().takeBlockFromEnd(px, "do")
	return E.Loop(px.s({ name: loopName(px.w(_.before)), body: _.block }))
}

const loopName = function(px) {
	switch (px.sqt.length) {
		case 0:
			return defaultLoopName
		case 1:
			px.check(isa(px.sqt[0], T.Name), function() {
				return "Expected a loop name, not " + px.sqt[0]
			})
			return px.sqt[0].name
		default:
			px.fail("Expected a loop name")
	}
}

const parseMapEntry = function(px, before, after) {
	return E.MapEntry(px.s({
		key: parseExpr(px.w(before)),
		val: parseExpr(px.w(after)),
		// TODO: Filled in by ???
		index: -1
	}))
}

const parseLineOrLines = function(px) {
	const _ = parseLine(px)
	return _ instanceof Array ? _ : [ _ ]
}

const parseLines = function(px) {
	const first = head(px.sqt)
	check(px.sqt.length > 1, first.span, "Expected indented block after " + first)
	const block = px.sqt[1]
	assert(px.sqt.length === 2 && T.Group.is('->')(block))
	const out = []
	block.sqt.forEach(function(line) {
		[].push.apply(out, parseLineOrLines(px.w(line.sqt)))
	})
	return out
}

module.exports = parseLine
Object.assign(module.exports, {
	parseLineOrLines: parseLineOrLines,
	parseLines: parseLines
})
