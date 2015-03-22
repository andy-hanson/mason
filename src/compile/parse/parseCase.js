import { CaseKeywords } from "../Lang"
import { ifElse, None, opIf, some } from "../U/Op"
import type from "../U/type"
import { head, isEmpty, last, rightTail, tail } from "../U/Sq"
const
	E = require("../E"),
	Op = require("../U/Op"),
	T = require("../T"),
	Px = require("./Px");
const
	parseBlock = require("./parseBlock"),
	parseExpr_ = function() { return require("./parseExpr") }

// For "case", returns a BlockWrap.
// For "case!", returns a Scope.
module.exports = function parseCase(px, k, casedFromFun) {
	type(px, Px, k, CaseKeywords, casedFromFun, Boolean)
	const kBlock = k === "case" ? "val" : "do"

	const _ = parseBlock.takeBlockLinesFromEnd(px)
	const before = _.before, lines = _.lines

	const opAssignCased = (function() {
		if (casedFromFun) {
			px.checkEmpty(before,
				"Cannot give focus to case - it is the function's implicit first argument.");
			return None
		}
		else return opIf(!isEmpty(before), function() {
			const pxBefore = px.w(before)
			return E.Assign(px.s({
				assignee: E.LocalDeclare.UntypedFocus(pxBefore.span),
				k: "=",
				value: parseExpr_()(pxBefore)
			}))
		})
	})()

	const l = last(lines)
	const _$ = T.Keyword.is("else")(head(l.sqt)) ? {
			partLines: rightTail(lines),
			opElse: some(parseBlock.justBlock(px.w(tail(l.sqt)), kBlock))
		} : {
			partLines: lines,
			opElse: None
		}
	const partLines = _$.partLines, opElse = _$.opElse

	const parts = partLines.map(function(line) {
		const _ = parseBlock.takeBlockFromEnd(px.w(line.sqt), kBlock)
		return E.CasePart({
			span: line.span,
			test: parseExpr_()(px.w(_.before)),
			result: _.block
		})
	})

	const ctr = k === "case" ? E.CaseVal : E.CaseDo
	const theCase = ctr(px.s({ parts: parts, opElse: opElse }))

	return k === "case" ?
		E.BlockWrap(px.s({
			body: E.BlockBody(px.s({
				lines: opAssignCased.concat([ theCase ]),
				// theCase contains the return statement.
				opReturn: None,
				opIn: None,
				opOut: None
			}))
		})) :
		ifElse(opAssignCased,
			function(assignCased) { return E.Scope(px.s({
				lines: [ assignCased, theCase ]
			}))},
			function() { return theCase })
}
