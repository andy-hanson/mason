import { Assign, BlockBody, BlockWrap, CaseDo, CasePart, CaseVal, LocalDeclare, Scope } from "../E"
import { CaseKeywords } from "../Lang"
import { Keyword } from "../T"
import { ifElse, None, opIf, some } from "../U/Op"
import type from "../U/type"
import { head, isEmpty, last, rightTail, tail } from "../U/Sq"
import { justBlock, takeBlockFromEnd, takeBlockLinesFromEnd } from "./parseBlock"
import Px from "./Px"
// TODO
const parseExpr_ = function() { return require("./parseExpr").default }

// For "case", returns a BlockWrap.
// For "case!", returns a Scope.
export default function parseCase(px, k, casedFromFun) {
	type(px, Px, k, CaseKeywords, casedFromFun, Boolean)
	const kBlock = k === "case" ? "val" : "do"

	const _ = takeBlockLinesFromEnd(px)
	const before = _.before, lines = _.lines

	const opAssignCased = (function() {
		if (casedFromFun) {
			px.checkEmpty(before,
				"Cannot give focus to case - it is the function's implicit first argument.");
			return None
		}
		else return opIf(!isEmpty(before), function() {
			const pxBefore = px.w(before)
			return Assign(px.s({
				assignee: LocalDeclare.UntypedFocus(pxBefore.span),
				k: "=",
				value: parseExpr_()(pxBefore)
			}))
		})
	})()

	const l = last(lines)
	const _$ = Keyword.is("else")(head(l.sqt)) ? {
			partLines: rightTail(lines),
			opElse: some(justBlock(px.w(tail(l.sqt)), kBlock))
		} : {
			partLines: lines,
			opElse: None
		}
	const partLines = _$.partLines, opElse = _$.opElse

	const parts = partLines.map(function(line) {
		const _ = takeBlockFromEnd(px.w(line.sqt), kBlock)
		return CasePart({
			span: line.span,
			test: parseExpr_()(px.w(_.before)),
			result: _.block
		})
	})

	const ctr = k === "case" ? CaseVal : CaseDo
	const theCase = ctr(px.s({ parts: parts, opElse: opElse }))

	return k === "case" ?
		BlockWrap(px.s({
			body: BlockBody(px.s({
				lines: opAssignCased.concat([ theCase ]),
				// theCase contains the return statement.
				opReturn: None,
				opIn: None,
				opOut: None
			}))
		})) :
		ifElse(opAssignCased,
			function(assignCased) { return Scope(px.s({
				lines: [ assignCased, theCase ]
			}))},
			function() { return theCase })
}
