import { Assign, CaseDo, CaseVal, CaseDoPart, CaseValPart } from '../../Expression'
import { Keyword } from '../Token'
import { None, opIf, some } from '../U/Op'
import { justBlockVal, justBlockDo, takeBlockLinesFromEnd,
	takeBlockValFromEnd, takeBlockDoFromEnd } from './parseBlock'
import { parseExpr } from './parseExpr'
import { checkEmpty, loc, w } from './vars'

// Don't use export default because that causes circular dependency problems.
export function parseCase(k, casedFromFun) {
	const isVal = k === 'case'

	const { before, lines } = takeBlockLinesFromEnd()

	const opCased = (() => {
		if (casedFromFun) {
			checkEmpty(before,
				'Can\'t give focus to case - it is the function\'s implicit first argument.')
			return None
		}
		else return opIf(!before.isEmpty(), () =>
			w(before, () => Assign.focus(loc, parseExpr())))
	})()

	const l = lines.last()
	const { partLines, opElse } = Keyword.isElse(l.tokens.head()) ? {
			partLines: lines.rtail(),
			opElse: some(w(l.tokens.tail(), isVal ? justBlockVal : justBlockDo))
		} : {
			partLines: lines,
			opElse: None
		}

	const parts = partLines.map(line => {
		const { before, block } =
			w(line.tokens, isVal ? takeBlockValFromEnd : takeBlockDoFromEnd)
		const test = w(before, parseExpr)
		return (isVal ? CaseValPart : CaseDoPart)(line.loc, test, block)
	})

	return (isVal ? CaseVal : CaseDo)(loc, opCased, parts, opElse)
}
