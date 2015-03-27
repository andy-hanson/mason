import { Assign, BlockBody, BlockWrap, CaseDo,
	CasePart, CaseVal, LocalDeclare } from '../Expression'
import { CaseKeywords } from '../Lang'
import { Keyword } from '../Token'
import { ifElse, None, opIf, some } from '../U/Op'
import type from '../U/type'
import { head, isEmpty, last, rtail, tail } from '../U/Bag'
import { justBlock, takeBlockFromEnd, takeBlockLinesFromEnd } from './parseBlock'
import Px from './Px'
// TODO
const parseExpr_ = () => require('./parseExpr').default

export default function parseCase(px, k, casedFromFun) {
	type(px, Px, k, CaseKeywords, casedFromFun, Boolean)
	const kBlock = k === 'case' ? 'val' : 'do'

	const _ = takeBlockLinesFromEnd(px)
	const before = _.before, lines = _.lines

	const opCased = (() => {
		if (casedFromFun) {
			px.checkEmpty(before,
				'Can\'t give focus to case - it is the function\'s implicit first argument.')
			return None
		}
		else return opIf(!isEmpty(before), () => {
			const pxBefore = px.w(before)
			return Assign.focus(pxBefore.span, parseExpr_()(pxBefore))
		})
	})()

	const l = last(lines)
	const _$ = Keyword.is('else')(head(l.tokens)) ? {
			partLines: rtail(lines),
			opElse: some(justBlock(px.w(tail(l.tokens)), kBlock))
		} : {
			partLines: lines,
			opElse: None
		}
	const partLines = _$.partLines, opElse = _$.opElse

	const parts = partLines.map(line => {
		const _ = takeBlockFromEnd(px.w(line.tokens), kBlock)
		return CasePart({
			span: line.span,
			test: parseExpr_()(px.w(_.before)),
			result: _.block
		})
	})

	const ctr = k === 'case' ? CaseVal : CaseDo
	return ctr(px.s({ opCased, parts, opElse }))
}
