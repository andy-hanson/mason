import type from "../U/type"
import { set } from "../U"
import { GeneratorKeywords, KFun } from "../Lang"
import { ifElse } from "../U/Op"
import { cons, head, isEmpty, last, opSplitManyWhere, rightTail, tail } from "../U/Sq"
const
	assert = require("assert"),
	E = require("../E"),
	Lang = require("../Lang"),
	T = require("../T"),
	Px = require("./Px")
const
	parseCase = require("./parseCase"),
	parseFun_ = function() { return require("./parseFun") },
	parseLocals = require("./parseLocals"),
	parseSingle = require("./parseSingle")

const parseExpr = module.exports = function(px) {
	return ifElse(opSplitManyWhere(px.sqt, T.Keyword.is(". ")),
		function(splits) {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before
			const sqtCaller = rightTail(first)

			const keys = []
			const lines = []
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const local = set(
					parseLocals.parseLocal(px.wt(last(splits[i].before))),
					"okToNotUse", true)
				keys.push(local)
				const sqtValue = i === splits.length - 2 ?
					splits[i + 1].before :
					rightTail(splits[i + 1].before)
				const value = parseExprPlain(px.w(sqtValue))
				lines.push(E.Assign({
					// TODO: Include name span
					span: value.span,
					assignee: local,
					k: ". ",
					value: parseExprPlain(px.w(sqtValue))
				}))
			}
			assert(last(splits).at === undefined)
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
			if (isEmpty(sqtCaller))
				return val
			else {
				const parts = parseExprParts(px.w(sqtCaller))
				assert(!isEmpty(parts))
				return E.Call(px.s({
					called: head(parts),
					args: tail(parts).concat([ val ])
				}))
			}
		},
		function() { return parseExprPlain(px) }
	)
}

const parseExprPlain = function(px) {
	type(px, Px)
	const parts = parseExprParts(px)
	switch (parts.length) {
		case 0:
			return E.Null(px.s({}))
		case 1:
			return head(parts)
		default:
			return E.Call(px.s({ called: head(parts), args: tail(parts) }))
	}
}

const parseExprParts = parseExpr.parseExprParts = function(px) {
	type(px, Px)
	if (isEmpty(px.sqt))
		return []
	const first = head(px.sqt), rest = tail(px.sqt)
	switch (true) {
		case T.Keyword.is(KFun)(first):
			return [ parseFun_()(px.w(rest), first.k) ]
		// `case!` can not be part of an expression - it is a statement.
		case T.Keyword.is("case")(first):
			return [ parseCase(px.w(rest), "case", false) ]
		case T.Keyword.is(GeneratorKeywords)(first): {
			const y = parseExpr(px.w(rest))
			switch (first.k) {
				case "<~": return [ E.Yield(px.s({ yielded: y })) ]
				case "<~~": return [ E.YieldTo(px.s({ yieldedTo: y })) ]
				default: throw new Error(first.k)
			}
		}
		default:
			return cons(parseSingle(px.wt(first)), parseExprParts(px.w(rest)))
	}
}
