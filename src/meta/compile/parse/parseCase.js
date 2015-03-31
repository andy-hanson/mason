import { Assign, BlockWrap, CaseDo,
	CasePart, CaseVal, LocalDeclare } from '../Expression'
import { CaseKeywords } from '../Lang'
import { Keyword } from '../Token'
import { lazy } from '../U'
import { ifElse, None, opIf, some } from '../U/Op'
import type from '../U/type'
import { justBlock, justDoBlock, takeBlockFromEnd, takeDoBlockFromEnd,
	takeBlockLinesFromEnd } from './parseBlock'
import Px from './Px'
// TODO:ES6
const parseExpr_ = lazy(() => require('./parseExpr').default)

export default function parseCase(px, k, casedFromFun) {
	type(px, Px, k, CaseKeywords, casedFromFun, Boolean)

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
			opElse: some(px.w(l.tokens.tail(), k === 'case' ? justBlock : justDoBlock))
		} : {
			partLines: lines,
			opElse: None
		}

	const parts = partLines.map(line => {
		const { before, block } = px.w(line.tokens,
			k === 'case' ? takeBlockFromEnd : takeDoBlockFromEnd)
		return CasePart({
			span: line.span,
			test: px.w(before, parseExpr_()),
			result: block
		})
	})

	const ctr = k === 'case' ? CaseVal : CaseDo
	return ctr(px.s({ opCased, parts, opElse }))
}
