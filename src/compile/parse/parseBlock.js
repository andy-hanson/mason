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

const wrap = function(px, k) {
	return E.BlockWrap(px.s({ body: parseBody(px, k) }))
}

const parseModule = function(px, moduleName) {
	type(px, Px, moduleName, String)
	const mod = parseBody(px, "module")
	const b = mod.body
	// TODO: This also means no module is allowed to be called `displayName`.
	b.lines.forEach(function(line) {
		if (type.isa(line, E.Assign) && line.k === "export")
			px.check(line.assignee.name !== "displayName",
				"Module can not choose its own displayName.")
	})
	b.lines.push(E.Assign(px.s({
		assignee: E.LocalDeclare(px.s({
			name: "displayName",
			opType: [],
			isLazy: false,
			okToNotUse: true
		})),
		k: "export",
		value: E.Literal(px.s({ value: moduleName, k: String }))
	})))
	return mod
}

const justBlock = function(px, k) {
	type(px, Px, k, KParseBlock)
	const _ = takeBlockFromEnd(px, k)
	px.check(Sq.isEmpty(_.before), "Expected just a block")
	return _.block
}

const takeBlockFromEnd = function(px, k) {
	type(px, Px, k, KParseBlock)
	const _ = takeBlockLinesFromEnd(px)
	return {
		before: _.before,
		block: parseBody(px.w(_.lines), k)
	}
}

const takeBlockLinesFromEnd = function(px) {
	type(px, Px)
	px.check(!Sq.isEmpty(px.sqt), "Expected an indented block")
	const last = Sq.last(px.sqt)
	check(T.Group.is('->')(last), last.span, "Expected an indented block at the end")
	return { before: Sq.rightTail(px.sqt), lines: last.sqt }
}

const parseBody = function(px, k) {
	type(px, Px, k, KParseBlock)
	const _ = tryTakeInOut(px)
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
		else if (isa(ln, E.Assign) && ln.k === ". ")
			(inDebug ? debugKeys : dictKeys).push(ln.assignee)

		if (!inDebug)
			eLines.push(ln)
		// Else we are adding the E.Debug as a single line.
	}
	restLines.forEach(function(line) {
		addLine(parseLine_()(px.w(line.sqt), listLength))
	})

	// TODO
	// if (Sq.isEmpty(dictKeys))
	//	check(Sq.isEmpty(debugKeys), px.span, "Block can't have only debug keys")
	const isDict = !(Sq.isEmpty(dictKeys) && Sq.isEmpty(debugKeys))
	const isList = listLength > 0
	const isMap = mapLength > 0
	px.check(!(isDict && isList), "Block has both list and dict lines.")
	px.check(!(isDict && isMap), "Block has both dict and map lines.")
	px.check(!(isList && isMap), "Block has both list and map lines.")

	const isModule = k === "module"

	const doLinesOpReturn = (function() {
		if (k === "do") {
			px.check(!isDict, "Can't make dict in statement context")
			px.check(!isList, "Can't make list in statement context")
			px.check(!isMap, "Can't make map in statement context")
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
							// This is filled in by parseAssign.
							opDisplayName: Op.None
						})))
				} : {
					doLines: eLines,
					opReturn: Op.Some(E.DictReturn(px.s({
						keys: dictKeys,
						debugKeys: debugKeys,
						opDicted: Op.None,
						// This is filled in by parseAssign.
						opDisplayName: Op.None
					})))
				}
		else if (lastReturn)
			return {
				doLines: Sq.rightTail(eLines),
				opReturn: Op.Some(Sq.last(eLines))
			}
		else {
			px.check(k !== "val", "Expected a value block")
			return { doLines: eLines, opReturn: Op.None }
		}
	})()
	const doLines = doLinesOpReturn.doLines, opReturn = doLinesOpReturn.opReturn

	if (isModule) {
		// TODO: Handle debug-only exports
		const moduleLines =
			// Turn dict assigns into exports.
			doLines.map(function(line) {
				return isa(line, E.Assign) && line.k === ". " ?
					U.with(line, "k", "export") :
					line
			}).concat(opReturn.map(function(ret) {
				return E.ModuleDefaultExport({ span: ret.span, value: ret })
			}))

		const body = E.BlockBody(px.s({
			lines: moduleLines,
			opReturn: Op.None,
			opIn: opIn,
			opOut: opOut
		}))
		return E.Module(px.s({ body: body }))
	}
	else
		return E.BlockBody(px.s({ lines: doLines, opReturn: opReturn, opIn: opIn, opOut: opOut }))
}

const tryTakeInOut = function(px) {
	const tryTakeInOrOut = function(lines, inOrOut) {
		if (!Sq.isEmpty(lines)) {
			const firstLine = Sq.head(lines)
			const sqtFirst = firstLine.sqt, head = Sq.head(sqtFirst)
			if (T.Keyword.is(inOrOut)(head))
				return {
					took: Op.Some(E.Debug({
						span: firstLine.span,
						lines: parseLine_().parseLines(px.w(sqtFirst))
					})),
					rest: Sq.tail(lines)
				}
		}
		return { took: Op.None, rest: lines }
	}

	const _in = tryTakeInOrOut(px.sqt, "in")
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
