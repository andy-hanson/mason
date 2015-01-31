// All parse functions go in the same module because they are recursively dependent.

"use strict"

const
	assert = require("assert"),
	check = require("./check"),
	E = require("./E"),
	Lang = require("./Lang"),
	Op = require("./U/Op"),
	Opts = require("./Opts"),
	Span = require("./Span"),
	Sq = require("./U/Sq"),
	T = require("./T"),
	type = require("./U/type"),
		isa = type.isa,
	U = require("./U")

module.exports = function parse(t, opts) {
	type(t, T.Group, opts, Opts)
	assert(t.k === "->") // Lexer always puts the whole file in a block.
	const px = Px({ span: t.span, opts: opts })
	return parseBlock.parseModule(px, t.sqt)
}

const Px = Span.spanType("Px", Object, { opts: Opts })
Object.assign(Px.prototype, {
	withSpan: function(span) {
		return U.with(this, "span", span);
	},
	sqtSpan: function(sqt) {
		return Span.ofSqT(this.span, sqt)
	},
	withSqTSpan: function(sqt) {
		return U.with(this, "span", this.sqtSpan(sqt))
	},
	s: function(members) {
		return Object.assign(members, { span: this.span })
	}
})

const parseBlock = (function() {
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
			addLine(parseLine(px.withSpan(line.span), line.sqt, listLength))
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
						took: Op.Some(E.Debug({ span: firstLine.span, lines: parseLines(px, sqt) })),
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

	return {
		wrap: wrap,
		parseModule: parseModule,
		justBlock: justBlock,
		takeBlockFromEnd: takeBlockFromEnd,
		takeBlockLinesFromEnd: takeBlockLinesFromEnd
	}
})()

// For "case", returns a BlockWrap.
// For "case!", returns a Scope.
const parseCase = function(px, sqt, k, casedFromFun) {
	type(px, Px, sqt, [T], k, Lang.CaseKeywords, casedFromFun, Boolean)
	const kBlock = (k === "case") ? "val" : "do"

	const _ = parseBlock.takeBlockLinesFromEnd(px, sqt)
	const before = _.before, lines = _.lines

	const opAssignCased = (function() {
		if (casedFromFun) {
			check(Sq.isEmpty(before), Span.ofSqT(px.span, before),
				"Cannot give focus to case in this context - it is the function's implicit first argument.");
			return Op.None
		}
		else return Op.if(!Sq.isEmpty(before), function() {
			const span = Span.ofSqT(px.span, before)
			return E.Assign({
				span: span,
				assignee: E.LocalDeclare.UntypedFocus(span),
				k: "=",
				value: parseExpr(px.withSpan(span), before)
			})
		})
	})()

	const last = Sq.last(lines)
	const _$ = T.Keyword.is("else")(Sq.head(last.sqt)) ? {
			partLines: Sq.rightTail(lines),
			opElse: Op.Some(parseBlock.justBlock(px.withSpan(last.span), Sq.tail(last.sqt), kBlock))
		} : {
			partLines: lines,
			opElse: Op.None
		}
	const partLines = _$.partLines, opElse = _$.opElse

	const parts = partLines.map(function(line) {
		const _ = parseBlock.takeBlockFromEnd(px.withSpan(line.span), line.sqt, kBlock)
		return E.CasePart({
			span: line.span,
			test: parseExpr(px, _.before),
			result: _.block
		})
	})

	const ctr = (k === "case") ? E.CaseVal : E.CaseDo
	const theCase = ctr({ span: px.span, parts: parts, opElse: opElse })

	return (k === "case") ?
		E.BlockWrap(px.s({
			body: E.BlockBody(px.s({
				lines: opAssignCased.concat([ theCase ]),
				opReturn: Op.None, // theCase contains the return statement.
				opIn: Op.None,
				opOut: Op.None
			}))
		})) :
		Op.ifElse(opAssignCased,
			function(assignCased) { return E.Scope(px.s({
				lines: [ assignCased, theCase ],
			}))},
			function() { return theCase })
}

const parseExpr = function(px, sqt) {
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

const parseExprParts = function(px, sqt) {
	type(px, Px, sqt, [T])
	if (Sq.isEmpty(sqt))
		return []
	const head = Sq.head(sqt), rest = Sq.tail(sqt)
	switch (true) {
		case T.Keyword.is(Lang.KFun)(head):
			return [ parseFun(px, rest, head.k) ]
		// `case!` can not be part of an expression - it is a statement.
		case T.Keyword.is("case")(head):
			return [ parseCase(px, rest, "case", false) ]
		default:
			return Sq.cons(parseSingle(px, head), parseExprParts(px.withSqTSpan(rest), rest))
	}
}

const parseFunLocals = function(px, sqt) {
	if (Sq.isEmpty(sqt))
		return {
			args: [],
			opRestArg: Op.None
		}
	else {
		const last = Sq.last(sqt)
		if (type.isa(last, T.DotName)) {
			check(last.nDots === 3, last.span, "Splat argument must have exactly 3 dots")
			return {
				args: parseLocals(px, Sq.rightTail(sqt)),
				opRestArg: Op.Some(E.LocalDeclare({
					span: last.span,
 					name: last.name,
 					opType: Op.None,
 					isLazy: false,
 					okToNotUse: false
				}))
			}
		}
		else return {
			args: parseLocals(px, sqt),
			opRestArg: Op.None
		}
	}
}

const parseFun = function(px, sqt, k) {
	type(px, Px, sqt, [T], k, Lang.KFun)

	// Look for return type at the beginning
	var _$ = (function() {
		if (!Sq.isEmpty(sqt)) {
			const head = Sq.head(sqt)
			if (T.Group.is('sp')(head) && T.Keyword.is(":")(Sq.head(head.sqt)))
				return {
					opType: Op.Some(parseSpaced(px.withSpan(head.span), Sq.tail(head.sqt))),
					rest: Sq.tail(sqt)
				}
		}
		return { opType: Op.None, rest: sqt }
	})()
	const opReturnType = _$.opType, rest = _$.rest

	check(!Sq.isEmpty(rest), px.span, "Expected an indented block after " + U.code(k))
	const head = Sq.head(rest)

	var _$ = (function() {
		if (T.Keyword.is(Lang.CaseKeywords)(head)) {
			const eCase = parseCase(px, Sq.tail(rest), head.k, true)
			return {
				args: [ E.LocalDeclare.UntypedFocus(head.span) ],
				opRestArg: Op.None,
				body: E.BlockBody(px.s({
					opIn: Op.None,
					lines: (head.k === "case") ? [] : [eCase],
					opReturn: Op.if(head.k === "case", function() { return eCase }),
					opOut: Op.None
				}))
			}
		}
		// Might be curried.
		else return Op.ifElse(Sq.opSplitOnceWhere(sqt, function(t) { return T.Keyword.is("|")(t) }),
			function(_) {
				const pxRest = px.withSqTSpan(_.after)
				const _$ = parseFunLocals(px, _.before)
				return {
					args: _$.args,
					opRestArg: _$.opRestArg,
					body: E.BlockBody(pxRest.s({
						opIn: Op.None,
						lines: [],
						opReturn: Op.Some(parseFun(pxRest, _.after, _.at.k)),
						opOut: Op.None
					}))
				}
			},
			function() {
				const _$ = parseBlock.takeBlockFromEnd(px, rest, "any")
				const _$2 = parseFunLocals(px, _$.before)
				return {
					args: _$2.args,
					opRestArg: _$2.opRestArg,
					body: _$.block
				}
			})
	})()

	return E.Fun(px.s({
		args: _$.args,
		opRestArg: _$.opRestArg,
		body: _$.body,
		opReturnType: opReturnType,
		k: k
	}))
}

const parseLine = (function() {
	const parseAssign = function(px, assigned, assigner, value) {
		let locals = parseLocals(px, assigned)
		const k = assigner.k
		const eValuePre = Sq.isEmpty(value) ? E.True(px.s({})) : parseExpr(px, value)

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
			check(isYield, px.span, "Assignment to nothing")
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
				locals.forEach(function(l) {
					check(l.isLazy, l.span, "If any part of destructuring assign is lazy, all must be.")
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
	function tryAddDisplayName(eValuePre, displayName)
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

	const parseLoop = function(px, sqt) {
		const _ = parseBlock.takeBlockFromEnd(px, sqt, "do")
		return E.Loop({ span: px.span, name: loopName(px, _.before), body: _.block })
	}

	const loopName = function(px, sqt) {
		switch (sqt.length) {
			case 0:
				return Lang.defaultLoopName
			case 1:
				check(isa(sqt[0], T.Name), px.span, "Expected a loop name, not " + sqt[0])
				return sqt[0].name
			default:
				check.fail(px.span, "Expected a loop name")
		}
	}

	const parseMapEntry = function(px, before, after) {
		return E.MapEntry(px.s({
			key: parseExpr(px.withSqTSpan(before), before),
			val: parseExpr(px.withSqTSpan(after), after),
			index: -1
		}))
	}

	// Returns line or sq of lines
	return function(px, sqt) {
		type(px, Px, sqt, [T])

		const first = Sq.head(sqt)
		const rest = function() { return Sq.tail(sqt) }
		const pxRest = function() { return px.withSpan(Span.ofSqT(px.span, rest())) }

		// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
		if (isa(first, T.Keyword))
			switch (first.k) {
				case ". ":
					return E.ListEntry({
						span: px.span,
						value: parseExpr(pxRest(), rest()),
						index: -1 // This is set by parseBlock
					})
				case "case!":
					return parseCase(pxRest(), rest(), "case!", false)
				case "debug":
					return (T.Group.is('->')(sqt[1])) ?
						E.Debug(px.s({ lines: parseLines(px, sqt) })) : // `debug`, then indented block
						E.Debug(px.s({ lines: parseLineOrLines(px, Sq.tail(sqt)) })) // e.g. `debug use`
				case "debugger":
					check(Sq.isEmpty(rest()), px.span, "Did not expect anything after " + first)
					return E.Debugger(px.s({}))
				case "end-loop!":
					return E.EndLoop(px.s({ name: loopName(px, rest()) }))
				case "loop!":
					return parseLoop(pxRest(), rest())
				case "region":
					return parseLines(px, sqt)
				case "use": case "use~":
					return parseUse(pxRest(), rest(), first.k)
				default: // fall through
			}

		return Op.ifElse(Sq.opSplitOnceWhere(sqt, T.Keyword.is(Lang.LineSplitKeywords)),
			function(_) {
				return (_.at.k == '->') ? parseMapEntry(px, _.before, _.after) : parseAssign(px, _.before, _.at, _.after)
			},
			function() { return parseExpr(px, sqt) })
	}
})()

const parseLineOrLines = function(px, sqt) {
	const _ = parseLine(px, sqt)
	return (_ instanceof Array) ? _ : [ _ ]
}

const parseLines = function(px, sqt) {
	const first = Sq.head(sqt)
	check(sqt.length > 1, first.span, "Expected indented block after " + first)
	const block = sqt[1]
	assert(sqt.length === 2 && T.Group.is('->')(block))
	const out = []
	block.sqt.forEach(function(line) {
		[].push.apply(out, parseLineOrLines(px.withSpan(line.span), line.sqt))
	})
	return out
}


const parseLocals = (function() {
	const parseLocals = function(px, sqt) { return sqLocals(px, sqt).map(E.LocalDeclare) }

	// Sq of { span, name, opType, isLazy }
	const sqLocals = function(px, sqt) {
		return sqt.map(function(t) {
			return Object.assign(parseLocal(px.withSpan(t.span), t), { span: t.span })
		})
	}

	const parseLocal = function(px, t) {
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

		return { name: name, opType: opType, isLazy: isLazy, okToNotUse: false }
	}

	const parseLocalName = function(px, t) {
		if (T.Keyword.is("_")(t))
			return "_"
		else {
			check(isa(t, T.Name), t.span, function() { return "Expected a local name, not " + t })
			return t.name
		}
	}

	return parseLocals
})()

const parseSingle = function(px, t) {
	type(px, Px, t, T)
	px = px.withSpan(t.span)
	switch (true) {
		case isa(t, T.CallOnFocus):
			return E.Call(px.s({
				called: E.LocalAccess(px.s({ name: t.name })),
				args: [E.LocalAccess.focus(px.span)]
			}))

		case isa(t, T.Literal):
			return E.Literal(t)
		case isa(t, T.Name):
			return E.LocalAccess(px.s({ name: t.name }))
		case T.Keyword.is("this")(t):
			return E.This(px.s({}))
		case T.Keyword.is("_")(t):
			return E.LocalAccess.focus(px.span)
		case T.Keyword.is(Lang.SpecialKeywords)(t):
			return E.SpecialKeyword(px.s({ k: t.k }))

		case T.Group.is('sp')(t):
			return parseSpaced(px, t.sqt)
		case T.Group.is('->')(t):
			return parseBlock.wrap(px, t.sqt, "val")
		case T.Group.is('"')(t):
			return E.Quote(px.s({
				parts: t.sqt.map(function(tSub) { return parseSingle(px, tSub) })
			}))
		case T.Group.is('(')(t):
			return parseExpr(px, t.sqt)
		case T.Group.is('[')(t):
			return E.ListSimple(px.s({
				parts: parseExprParts(px, t.sqt)
			}))

		case isa(t, T.DotName):
			if (t.nDots === 3)
				return E.Splat(px.s({ splatted: E.LocalAccess(px.s({ name: t.name })) }))

		default:
			check.fail(px.span, "Unexpected " + t)
	}
}

const parseSpaced = function(px, sqt) {
	type(px, Px, sqt, [T])
	const head = Sq.head(sqt), rest = Sq.tail(sqt)
	switch (true) {
		case T.Keyword.is(":")(head): {
			check(!T.Keyword.is(":")(Sq.head(rest)), head.span, "Two " + U.code(":") + " in a row")
			const eType = parseSpaced(px, rest)
			const focus = E.LocalAccess.focus(head.span)
			return E.TypeTest({ span: head.span, tested: focus, testType: eType })
		}
		case T.Keyword.is("~")(head):
			return E.Lazy({ span: head.span, value: parseSpaced(px, rest) })
		default: {
			const memberOrSubscript = function(px) { return function(e, t) {
				const span = t.span
				if (isa(t, T.DotName))
					switch (t.nDots) {
						case 1:
							return E.Member({ span: span, object: e, name: t.name })
						default:
							check.fail(span, "Too many dots!")
					}
				if (T.Group.is('[')(t))
					return E.Sub({
						span: span,
						subject: e,
						subbers: parseExprParts(px, t.sqt)
					})
				if (T.Group.is('(')(t))
					return E.Call({
						span: span,
						called: e,
						args: []
					})
				check.fail(span, "Expected member or sub, not " + t)
			} }
			return rest.reduce(memberOrSubscript(px), parseSingle(px, head))
		}
	}
}

// TODO:ES6 Just use module imports, no AssignDestructure needed
const parseUse = (function() {
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
			parseLocals(px, Sq.tail(sqt)).map(function(l) {
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

	return function(px, sqt, k) {
		type(px, Px, sqt, [T], k, Lang.UseKeywords)
		const _ = parseBlock.takeBlockLinesFromEnd(px, sqt)
		check(Sq.isEmpty(_.before), px.span, "Did not expect anything after " + U.code("use") + " other than a block")
		return _.lines.map(function(line) { return useLine(px.withSpan(line.span), line.sqt, k) })
	}
})()
