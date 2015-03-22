const
	E = require("../E"),
	Lang = require("../Lang"),
	Op = require("../U/Op"),
	Sq = require("../U/Sq"),
	T = require("../T"),
	type = require("../U/type"),
	Px = require("./Px");
const
	parseBlock = require("./parseBlock"),
	parseExpr_ = function() { return require("./parseExpr") }

// For "case", returns a BlockWrap.
// For "case!", returns a Scope.
module.exports = function parseCase(px, k, casedFromFun) {
	type(px, Px, k, Lang.CaseKeywords, casedFromFun, Boolean)
	const kBlock = k === "case" ? "val" : "do"

	const _ = parseBlock.takeBlockLinesFromEnd(px)
	const before = _.before, lines = _.lines

	const opAssignCased = (function() {
		if (casedFromFun) {
			px.checkEmpty(before,
				"Cannot give focus to case - it is the function's implicit first argument.");
			return Op.None
		}
		else return Op.if(!Sq.isEmpty(before), function() {
			const pxBefore = px.w(before)
			return E.Assign(px.s({
				assignee: E.LocalDeclare.UntypedFocus(pxBefore.span),
				k: "=",
				value: parseExpr_()(pxBefore)
			}))
		})
	})()

	const last = Sq.last(lines)
	const _$ = T.Keyword.is("else")(Sq.head(last.sqt)) ? {
			partLines: Sq.rightTail(lines),
			opElse: Op.Some(parseBlock.justBlock(px.w(Sq.tail(last.sqt)), kBlock))
		} : {
			partLines: lines,
			opElse: Op.None
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
				opReturn: Op.None,
				opIn: Op.None,
				opOut: Op.None
			}))
		})) :
		Op.ifElse(opAssignCased,
			function(assignCased) { return E.Scope(px.s({
				lines: [ assignCased, theCase ]
			}))},
			function() { return theCase })
}
