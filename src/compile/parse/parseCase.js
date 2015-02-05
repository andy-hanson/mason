"use strict"

const
	check = require("../check"),
	E = require("../E"),
	Lang = require("../Lang"),
	Op = require("../U/Op"),
	Span = require("../Span"),
	Sq = require("../U/Sq"),
	T = require("../T"),
	type = require("../U/type"),
	Px = require("./Px");
const
	parseBlock = require("./parseBlock"),
	parseExpr_ = function() { return require("./parseExpr") }

// For "case", returns a BlockWrap.
// For "case!", returns a Scope.
module.exports = function parseCase(px, sqt, k, casedFromFun) {
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
				value: parseExpr_()(px.withSpan(span), before)
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
			test: parseExpr_()(px, _.before),
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
