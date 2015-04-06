import { Assign, BlockWrap, CaseDo, CaseVal,
	CaseDoPart, CaseValPart, LocalDeclare } from '../../Expression'
import { CaseKeywords } from '../Lang'
import { Keyword } from '../Token'
import { ifElse, None, opIf, some } from '../U/Op'
import type from '../U/type'
import { lazy } from '../U/util'
import Px from './Px'
// TODO:ES6
import * as PB from './parseBlock'
import * as ParseExpr from './parseExpr'

// Don't use export default because that causes circular dependency problems.
export function parseCase(px, k, casedFromFun) {
	type(px, Px, k, CaseKeywords, casedFromFun, Boolean)
	const isVal = k === 'case'

	const { before, lines } = PB.takeBlockLinesFromEnd(px)

	const opCased = (() => {
		if (casedFromFun) {
			px.checkEmpty(before,
				'Can\'t give focus to case - it is the function\'s implicit first argument.')
			return None
		}
		else return opIf(!before.isEmpty(), () =>
			px.w(before, () => Assign.focus(px.span, ParseExpr.default(px))))
	})()

	const l = lines.last()
	const { partLines, opElse } = Keyword.isElse(l.tokens.head()) ? {
			partLines: lines.rtail(),
			opElse: some(px.w(l.tokens.tail(), isVal ? PB.justBlockVal : PB.justBlockDo))
		} : {
			partLines: lines,
			opElse: None
		}

	const parts = partLines.map(line => {
		const { before, block } =
			px.w(line.tokens, isVal ? PB.takeBlockValFromEnd : PB.takeBlockDoFromEnd)
		const test = px.w(before, ParseExpr.default)
		return (isVal ? CaseValPart : CaseDoPart)(line.span, test, block)
	})

	return (isVal ? CaseVal : CaseDo)(px.span, opCased, parts, opElse)
}
