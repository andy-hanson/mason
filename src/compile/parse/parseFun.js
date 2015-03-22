import check from "../check"
import { CaseKeywords, KFun } from "../Lang"
import type, { isa } from "../U/type"
import { code } from "../U"
import { ifElse, None, opIf, some } from "../U/Op"
import { head, isEmpty, last, opSplitOnceWhere, rightTail, tail } from "../U/Sq"
const
	E = require("../E"),
	Lang = require("../Lang"),
	T = require("../T"),
	Px = require("./Px")
const
	parseBlock_ = function() { return require("./parseBlock") },
	parseCase = require("./parseCase"),
	parseLocals = require("./parseLocals"),
	parseSpaced = require("./parseSpaced")

module.exports = function parseFun(px, k) {
	type(px, Px, k, KFun)

	// Look for return type at the beginning
	let _ = (function() {
		if (!isEmpty(px.sqt)) {
			const h = head(px.sqt)
			if (T.Group.is('sp')(h) && T.Keyword.is(":")(head(h.sqt)))
				return {
					opType: some(parseSpaced(px.w(tail(h.sqt)))),
					rest: tail(px.sqt)
				}
		}
		return { opType: None, rest: px.sqt }
	})()
	const opReturnType = _.opType, rest = _.rest

	px.check(!isEmpty(rest), function() {
		return "Expected an indented block after " + code(k)
	})
	const h = head(rest)

	_ = (function() {
		if (T.Keyword.is(CaseKeywords)(h)) {
			const eCase = parseCase(px.w(tail(rest)), h.k, true)
			return {
				args: [ E.LocalDeclare.UntypedFocus(h.span) ],
				opRestArg: None,
				body: E.BlockBody(px.s({
					opIn: None,
					lines: h.k === "case" ? [] : [eCase],
					opReturn: opIf(h.k === "case", function() { return eCase }),
					opOut: None
				}))
			}
		}
		// Might be curried.
		else return ifElse(opSplitOnceWhere(px.sqt,
			function(t) { return T.Keyword.is("|")(t) }),
			function(_) {
				const _$ = parseFunLocals(px.w(_.before))
				const pxAfter = px.w(_.after)
				return {
					args: _$.args,
					opRestArg: _$.opRestArg,
					body: E.BlockBody(pxAfter.s({
						opIn: None,
						lines: [],
						opReturn: some(parseFun(pxAfter, _.at.k)),
						opOut: None
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
		args: _.args,
		opRestArg: _.opRestArg,
		body: _.body,
		opReturnType: opReturnType,
		k: k
	}))
}

const parseFunLocals = function(px) {
	if (isEmpty(px.sqt))
		return {
			args: [],
			opRestArg: None
		}
	else {
		const l = last(px.sqt)
		if (isa(l, T.DotName)) {
			check(l.nDots === 3, l.span, "Splat argument must have exactly 3 dots")
			return {
				args: parseLocals(px.w(rightTail(px.sqt))),
				opRestArg: some(E.LocalDeclare({
					span: l.span,
					name: l.name,
					opType: None,
					isLazy: false,
					okToNotUse: false
				}))
			}
		}
		else return {
			args: parseLocals(px),
			opRestArg: None
		}
	}
}
