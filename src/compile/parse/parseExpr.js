"use strict"

const
	assert = require("assert"),
	E = require("../E"),
	Lang = require("../Lang"),
	Op = require("../U/Op"),
	T = require("../T"),
	Sq = require("../U/Sq"),
	type = require("../U/type"),
	U = require("../U"),
	Px = require("./Px")
const
	parseCase = require("./parseCase"),
	parseFun_ = function() { return require("./parseFun") },
	parseLocals = require("./parseLocals"),
	parseSingle = require("./parseSingle")

const parseExpr = module.exports = function(px, sqt) {
	return Op.ifElse(Sq.opSplitManyWhere(sqt, T.Keyword.is(". ")),
		function(splits) {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before
			const sqtCaller = Sq.rightTail(first)

			const keys = []
			const lines = []
			for (let i = 0; i < splits.length - 1; i++) {
				const local = U.with(parseLocals.parseLocal(px, Sq.last(splits[i].before)), "okToNotUse", true)
				keys.push(local)
				const sqtValue = (i == splits.length - 2) ? splits[i + 1].before : Sq.rightTail(splits[i + 1].before)
				const value = parseExprPlain(px, sqtValue)
				lines.push(E.Assign({
					span: value.span, // TODO: Include name span
					assignee: local,
					k: ". ",
					value: parseExprPlain(px, sqtValue)
				}))
			}
			assert(Sq.last(splits).at === undefined)
			const val = E.BlockWrap(px.s({
				body: E.BlockBody(px.s({
					lines: lines,
					opReturn: [ E.DictReturn(px.s({
						keys: keys,
						debugKeys: [],
						opDicted: [],
						opDisplayName: []
					})) ],
					opIn: [],
					opOut: []
				}))
			}))
			if (Sq.isEmpty(sqtCaller))
				return val
			else {
				const parts = parseExprParts(px, sqtCaller)
				assert(!Sq.isEmpty(parts))
				return E.Call(px.s({
					called: Sq.head(parts),
					args: Sq.tail(parts).concat([ val ])
				}))
			}

		},
		function() { return parseExprPlain(px, sqt) }
	)
}

const parseExprPlain = function(px, sqt) {
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

const parseExprParts = parseExpr.parseExprParts = function(px, sqt) {
	type(px, Px, sqt, [T])
	if (Sq.isEmpty(sqt))
		return []
	const head = Sq.head(sqt), rest = Sq.tail(sqt)
	switch (true) {
		case T.Keyword.is(Lang.KFun)(head):
			return [ parseFun_()(px, rest, head.k) ]
		// `case!` can not be part of an expression - it is a statement.
		case T.Keyword.is("case")(head):
			return [ parseCase(px, rest, "case", false) ]
		case T.Keyword.is(Lang.GeneratorKeywords)(head): {
			const y = parseExpr(px, rest)
			switch (head.k) {
				case "<~": return [ E.Yield(px.s({ yielded: y })) ]
				case "<~~": return [ E.YieldTo(px.s({ yieldedTo: y })) ]
				default: fail()
			}
		}
		default:
			return Sq.cons(parseSingle(px, head), parseExprParts(px.withSqTSpan(rest), rest))
	}
}
