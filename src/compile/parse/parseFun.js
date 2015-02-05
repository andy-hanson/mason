"use strict"

const
	check = require("../check"),
	E = require("../E"),
	Lang = require("../Lang"),
	Op = require("../U/Op"),
	T = require("../T"),
	Sq = require("../U/Sq"),
	type = require("../U/type"),
	U = require("../U"),
	Px = require("./Px")
const
	parseBlock_ = function() { return require("./parseBlock") },
	parseCase = require("./parseCase"),
	parseLocals = require("./parseLocals"),
	parseSpaced = require("./parseSpaced")

module.exports = function parseFun(px, sqt, k) {
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
				const _$ = parseBlock_().takeBlockFromEnd(px, rest, "any")
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
