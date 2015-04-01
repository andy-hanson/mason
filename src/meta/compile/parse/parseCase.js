import { Assign, BlockWrap, CaseDo, CaseVal,
	CaseDoPart, CaseValPart, LocalDeclare } from '../Expression'
import { CaseKeywords } from '../Lang'
import { Keyword } from '../Token'
import { lazy } from '../U'
import { ifElse, None, opIf, some } from '../U/Op'
import type from '../U/type'
import { justBlockDo, justBlockVal, takeBlockDoFromEnd, takeBlockValFromEnd,
	takeBlockLinesFromEnd } from './parseBlock'
import Px from './Px'
// TODO:ES6
const parseExpr_ = lazy(() => require('./parseExpr').default)

export default function parseCase(px, k, casedFromFun) {
	type(px, Px, k, CaseKeywords, casedFromFun, Boolean)
	const isVal = k === 'case'

	const { before, lines } = takeBlockLinesFromEnd(px)

	const opCased = (() => {
		if (casedFromFun) {
			px.checkEmpty(before,
				'Can\'t give focus to case - it is the function\'s implicit first argument.')
			return None
		}
		else return opIf(!before.isEmpty(), () =>
			px.w(before, () => Assign.focus(px.span, parseExpr_()(px))))
	})()

	const l = lines.last()
	const { partLines, opElse } = Keyword.isElse(l.tokens.head()) ? {
			partLines: lines.rtail(),
			opElse: some(px.w(l.tokens.tail(), isVal ? justBlockVal : justBlockDo))
		} : {
			partLines: lines,
			opElse: None
		}

	const parts = partLines.map(line => {
		const { before, block } =
			px.w(line.tokens, isVal ? takeBlockValFromEnd : takeBlockDoFromEnd)
		const test = px.w(before, parseExpr_())
		return (isVal ? CaseValPart : CaseDoPart)({ span: line.span, test, result: block })
	})

	return (isVal ? CaseVal : CaseDo)(px.s({ opCased, parts, opElse }))
}
