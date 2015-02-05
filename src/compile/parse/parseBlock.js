"use strict"

const
	assert = require("assert"),
	check = require("../check"),
	E = require("../E"),
	T = require("../T"),
	Op = require("../U/Op"),
	Sq = require("../U/Sq"),
	type = require("../U/type"),
		isa = type.isa,
	U = require("../U"),
	Px = require("./Px")
const
	parseLine_ = function() { return require("./parseLine") }

const KParseBlock = new Set(["any", "do", "val", "module"])

const wrap = function(px, sqt, k) {
	return E.BlockWrap({ span: px.span, body: parseBody(px, sqt, k) })
}

const parseModule = function(px, sqt) {
	const mod = parseBody(px, sqt, "module")
	const b = mod.body
	// TODO: This also means no module is allowed to be called `displayName`.
	b.lines.forEach(function(line) {
		if (type.isa(line, E.Assign) && line.k === "export")
			check(line.assignee.name !== "displayName", "Module can not choose its own displayName.")
	})
	b.lines.push(E.Assign(px.s({
		assignee: E.LocalDeclare(px.s({
			name: "displayName",
			opType: [],
			isLazy: false,
			okToNotUse: true
		})),
		k: "export",
		value: E.Literal(px.s({ value: px.opts.moduleName(), k: String }))
	})))
	return mod
}

const justBlock = function(px, sqt, k) {
	type(px, Px, sqt, [T], k, KParseBlock)
	const _ = takeBlockFromEnd(px, sqt, k)
	check(Sq.isEmpty(_.before), px.span, "Expected just a block")
	return _.block
}

const takeBlockFromEnd = function(px, sqt, k) {
	type(px, Px, sqt, [T], k, KParseBlock)
	const _ = takeBlockLinesFromEnd(px, sqt)
	return {
		before: _.before,
		block: parseBody(px, _.lines, k)
	}
}

const takeBlockLinesFromEnd = function(px, sqt) {
	type(px, Px, sqt, [T])
	check(!Sq.isEmpty(sqt), px.span, "Expected an indented block")
	const last = Sq.last(sqt)
	check(T.Group.is('->')(last), last.span, "Expected an indented block at the end")
	return { before: Sq.rightTail(sqt), lines: last.sqt }
}

const parseBody = function(px, lines, k) {
	type(px, Px, lines, [T], k, KParseBlock)
	const _ = tryTakeInOut(px, lines)
	const opIn = _.opIn, opOut = _.opOut, restLines = _.rest

	let dictKeys = []
	let debugKeys = []
	let listLength = 0
	let mapLength = 0
	const eLines = []
	function addLine(ln, inDebug) {
		if (ln instanceof Array) {
			ln.forEach(function(_) { addLine(_, inDebug) })
			return
		}
		if (ln instanceof E.Debug)
			ln.lines.forEach(function(_) { addLine(_, true) })
		else if (isa(ln, E.ListEntry)) {
			assert(!inDebug, "Not supported: debug list entries")
			// When ListEntries are first created they have no index.
			assert(ln.index === -1)
			ln = U.with(ln, "index", listLength)
			listLength = listLength + 1
		}
		else if (isa(ln, E.MapEntry)) {
			assert(!inDebug, "Not supported: debug map entries")
			assert(ln.index === -1)
			ln = U.with(ln, "index", mapLength)
			mapLength = mapLength + 1
		}
		else if (isa(ln, E.Assign) && ln.k === ". ") {
			(inDebug ? debugKeys : dictKeys).push(ln.assignee)
		}

		if (!inDebug)
			eLines.push(ln)
		// Else we are adding the E.Debug as a single line.
	}
	restLines.forEach(function(line) {
		addLine(parseLine_()(px.withSpan(line.span), line.sqt, listLength))
	})

	//if (Sq.isEmpty(dictKeys))
	//	check(Sq.isEmpty(debugKeys), px.span, "Block can't have only debug keys")
	const isDict = !(Sq.isEmpty(dictKeys) && Sq.isEmpty(debugKeys))
	const isList = listLength > 0
	const isMap = mapLength > 0
	check(!(isDict && isList), px.span, "Block has both list and dict lines.")
	check(!(isDict && isMap), px.span, "Block has both dict and map lines.")
	check(!(isList && isMap), px.span, "Block has both list and map lines.")

	const isModule = k === "module"

	const doLinesOpReturn = (function() {
		if (k === "do") {
			check(!isDict, px.span, "Can't make dict in statement context")
			check(!isList, px.span, "Can't make list in statement context")
			check(!isMap, px.span, "Can't make map in statement context")
			return { doLines: eLines, opReturn: Op.None }
		}
		if (isList)
			return {
				doLines: eLines,
				opReturn: Op.Some(E.ListReturn(px.s({ length: listLength })))
			}
		if (isMap)
			return {
				doLines: eLines,
				opReturn: Op.Some(E.Map(px.s({ length: mapLength })))
			}

		const lastReturn = !Sq.isEmpty(eLines) && isa(Sq.last(eLines), E.Val)
		if (isDict && !isModule)
			return lastReturn ?
				{
					doLines: Sq.rightTail(eLines),
					opReturn: Op.Some(
						E.DictReturn(px.s({
							keys: dictKeys,
							debugKeys: debugKeys,
							opDicted: Op.Some(Sq.last(eLines)),
							opDisplayName: Op.None // This is filled in by parseAssign
						})))
				} : {
					doLines: eLines,
					opReturn: Op.Some(E.DictReturn(px.s({
						keys: dictKeys,
						debugKeys: debugKeys,
						opDicted: Op.None,
						opDisplayName: Op.None // This is filled in by parseAssign
					})))
				}
		else if (lastReturn)
			return {
				doLines: Sq.rightTail(eLines),
				opReturn: Op.Some(Sq.last(eLines))
			}
		else {
			check(k !== "val", px.span, "Expected a value block")
			return { doLines: eLines, opReturn: Op.None }
		}
	})()
	const doLines = doLinesOpReturn.doLines, opReturn = doLinesOpReturn.opReturn

	if (isModule) {
		// TODO: Handle debug-only exports
		const moduleLines =
			// Turn dict assigns into exports.
			doLines.map(function(line) {
				return (isa(line, E.Assign) && line.k === ". ") ?
					U.with(line, "k", "export") :
					line
			}).concat(opReturn.map(function(ret) {
				return E.ModuleDefaultExport({ span: ret.span, value: ret })
			}))

		const body = E.BlockBody(px.s({ lines: moduleLines, opReturn: Op.None, opIn: opIn, opOut: opOut }));
		return E.Module(px.s({ body: body }))
	}
	else
		return E.BlockBody(px.s({ lines: doLines, opReturn: opReturn, opIn: opIn, opOut: opOut }))
}

const tryTakeInOut = function(px, lines) {
	const tryTakeInOrOut = function(lines, inOrOut) {
		if (!Sq.isEmpty(lines)) {
			const firstLine = Sq.head(lines)
			const sqt = firstLine.sqt, head = Sq.head(sqt)
			if (T.Keyword.is(inOrOut)(head))
				return {
					took: Op.Some(E.Debug({ span: firstLine.span, lines: parseLine_().parseLines(px, sqt) })),
					rest: Sq.tail(lines)
				}
		}
		return { took: Op.None, rest: lines }
	}

	const _in = tryTakeInOrOut(lines, "in")
	const _out = tryTakeInOrOut(_in.rest, "out")
	return {
		opIn: _in.took,
		opOut: _out.took,
		rest: _out.rest
	}
}

module.exports = {
	wrap: wrap,
	parseModule: parseModule,
	justBlock: justBlock,
	takeBlockFromEnd: takeBlockFromEnd,
	takeBlockLinesFromEnd: takeBlockLinesFromEnd
}
