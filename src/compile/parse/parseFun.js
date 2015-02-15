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

module.exports = function parseFun(px, k) {
	type(px, Px, k, Lang.KFun)

	// Look for return type at the beginning
	var _$ = (function() {
		if (!Sq.isEmpty(px.sqt)) {
			const head = Sq.head(px.sqt)
			if (T.Group.is('sp')(head) && T.Keyword.is(":")(Sq.head(head.sqt)))
				return {
					opType: Op.Some(parseSpaced(px.w(Sq.tail(head.sqt)))),
					rest: Sq.tail(px.sqt)
				}
		}
		return { opType: Op.None, rest: px.sqt }
	})()
	const opReturnType = _$.opType, rest = _$.rest

	px.check(!Sq.isEmpty(rest), function() { return "Expected an indented block after " + U.code(k) })
	const head = Sq.head(rest)

	var _$ = (function() {
		if (T.Keyword.is(Lang.CaseKeywords)(head)) {
			const eCase = parseCase(px.w(Sq.tail(rest)), head.k, true)
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
		else return Op.ifElse(Sq.opSplitOnceWhere(px.sqt, function(t) { return T.Keyword.is("|")(t) }),
			function(_) {
				const _$ = parseFunLocals(px.w(_.before))
				const pxAfter = px.w(_.after)
				return {
					args: _$.args,
					opRestArg: _$.opRestArg,
					body: E.BlockBody(pxAfter.s({
						opIn: Op.None,
						lines: [],
						opReturn: Op.Some(parseFun(pxAfter, _.at.k)),
						opOut: Op.None
					}))
				}
			},
			function() {
				const _$ = parseBlock_().takeBlockFromEnd(px.w(rest), "any")
				const _$2 = parseFunLocals(px.w(_$.before))
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

const parseFunLocals = function(px) {
	if (Sq.isEmpty(px.sqt))
		return {
			args: [],
			opRestArg: Op.None
		}
	else {
		const last = Sq.last(px.sqt)
		if (type.isa(last, T.DotName)) {
			check(last.nDots === 3, last.span, "Splat argument must have exactly 3 dots")
			return {
				args: parseLocals(px.w(Sq.rightTail(px.sqt))),
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
			args: parseLocals(px),
			opRestArg: Op.None
		}
	}
}
