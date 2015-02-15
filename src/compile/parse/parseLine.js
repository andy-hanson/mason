"use strict"

const
	assert = require("assert"),
	check = require("../check"),
	E = require("../E"),
	T = require("../T"),
	Lang = require("../Lang"),
	Op = require("../U/Op"),
	Span = require("../Span"),
	Sq = require("../U/Sq"),
	type = require("../U/type"),
		isa = type.isa,
	U = require("../U"),
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

	const first = Sq.head(px.sqt)
	const pxRest = px.w(Sq.tail(px.sqt))
	//const rest = function() { return Sq.tail(sqt) }
	//const pxRest = function() { return px.withSpan(Span.ofSqT(px.span, rest())) }

	// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
	if (isa(first, T.Keyword))
		switch (first.k) {
			case ". ":
				return E.ListEntry(px.s({
					value: parseExpr(pxRest),
					index: -1 // This is set by parseBlock
				}))
			case "case!":
				return parseCase(pxRest, "case!", false)
			case "debug":
				return (T.Group.is('->')(px.sqt[1])) ?
					E.Debug(px.s({ lines: parseLines(px) })) : // `debug`, then indented block
					E.Debug(px.s({ lines: parseLineOrLines(pxRest) })) // e.g. `debug use`
			case "debugger":
				px.checkEmpty(pxRest().sqt, function() { return "Did not expect anything after " + first })
				return E.Debugger(px.s({}))
			case "end-loop!":
				return E.EndLoop(px.s({ name: loopName(pxRest) }))
			case "loop!":
				return parseLoop(pxRest)
			case "region":
				return parseLines(px)
			case "use": case "use!": case "use~":
				return parseUse(pxRest, first.k)
			default: // fall through
		}

	return Op.ifElse(Sq.opSplitOnceWhere(px.sqt, T.Keyword.is(Lang.LineSplitKeywords)),
		function(_) {
			return (_.at.k == '->') ? parseMapEntry(px, _.before, _.after) : parseAssign(px, _.before, _.at, _.after)
		},
		function() { return parseExpr(px) })
}

const parseAssign = function(px, assigned, assigner, value) {
	let locals = parseLocals(px.w(assigned))
	const k = assigner.k
	const eValuePre = Sq.isEmpty(value) ? E.True(px.s({})) : parseExpr(px.w(value))

	const opDisplayName = Op.if(locals.length == 1, function() { return Sq.head(locals).name })

	let eValueNamed;
	if (locals.length === 1) {
		const name = Sq.head(locals).name
		if (name === "doc") {
			if (eValuePre instanceof E.Fun)
				// KLUDGE: `doc` for module can be a Fun signature.
				// TODO: Something better...
				eValueNamed = U.with(eValuePre, "args", eValuePre.args.map(function(arg) {
					return U.with(arg, "okToNotUse", true)
				}))
			else
				eValueNamed = eValuePre
		}
		else
			eValueNamed = tryAddDisplayName(eValuePre, name)
	}
	else
		eValueNamed = eValuePre

	const isYield = k === "<~" || k === "<~~"

	const eValue = valueFromAssign(eValueNamed, k, assigned)

	if (Sq.isEmpty(locals)) {
		px.check(isYield, "Assignment to nothing")
		return eValue
	}

	if (isYield)
		locals.forEach(function(_) {
			check(_.k !== "lazy", _.span, "Can not yield to lazy variable.")
		})

	if (k === ". ")
		locals = locals.map(function(l) {
			return U.with(l, "okToNotUse", true)
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
				check(_.isLazy, _.span, "If any part of destructuring assign is lazy, all must be.")
			})
		return E.AssignDestructure(px.s({ assignees: locals, k: k, value: eValue, isLazy: isLazy, checkProperties: false }))
	}
}

const valueFromAssign = function(valuePre, kAssign, assigned) {
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
			eValuePre.args[eValuePre.args.length - 1] = tryAddDisplayName(Sq.last(eValuePre.args), displayName)
			return eValuePre

		case isa(eValuePre, E.Fun):
			return E.DictReturn({
				span: eValuePre.span,
				keys: [], debugKeys: [],
				opDicted: Op.Some(eValuePre),
				opDisplayName: Op.Some(displayName)
			})

		case isa(eValuePre, E.DictReturn) &&
			!eValuePre.keys.some(function(key) { return key.name === "displayName" }):
			return U.with(eValuePre, "opDisplayName", Op.Some(displayName))

		case isa(eValuePre, E.BlockWrap):
			return Op.ifElse(eValuePre.body.opReturn,
				function(ret) {
					const namedRet = tryAddDisplayName(ret, displayName)
					return U.with(eValuePre, "body",
						U.with(eValuePre.body, "opReturn", Op.Some(namedRet)))
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
			return Lang.defaultLoopName
		case 1:
			px.check(isa(px.sqt[0], T.Name), function() { return "Expected a loop name, not " + px.sqt[0] })
			return px.sqt[0].name
		default:
			px.fail("Expected a loop name")
	}
}

const parseMapEntry = function(px, before, after) {
	return E.MapEntry(px.s({
		key: parseExpr(px.w(before)),
		val: parseExpr(px.w(after)),
		index: -1 // TODO: Filled in by ???
	}))
}

const parseLineOrLines = function(px) {
	const _ = parseLine(px)
	return (_ instanceof Array) ? _ : [ _ ]
}

const parseLines = function(px) {
	const first = Sq.head(px.sqt)
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
