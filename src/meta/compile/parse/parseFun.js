import assert from 'assert'
import check from '../check'
import { BlockDo, BlockVal, Debug, Fun, LocalDeclare } from '../Expression'
import { CaseKeywords, KFun } from '../Lang'
import { DotName, Group, Keyword } from '../Token'
import type from '../U/type'
import { code, lazy } from '../U'
import Op, { ifElse, None, opIf, some } from '../U/Op'
import parseCase from './parseCase'
import parseLocalDeclares from './parseLocalDeclares'
import parseSpaced from './parseSpaced'
import Px from './Px'
// TODO:ES6
const parseLinesFromBlock_ = lazy(() => require('./parseBlock').parseLinesFromBlock)
const parseBlockFromLines_ = lazy(() => require('./parseBlock').parseBlockFromLines)
const takeBlockLinesFromEnd_ = lazy(() => require('./parseBlock').takeBlockLinesFromEnd)

export default function parseFun(px, k) {
	type(px, Px, k, KFun)
	const { opReturnType, rest } = tryTakeReturnType(px)
	px.check(!rest.isEmpty(), () => `Expected an indented block after ${code(k)}`)
	const { args, opRestArg, block, opIn, opOut } = px.w(rest, argsAndBlock)
	return Fun(px.s({ k, args, opRestArg, opReturnType, block, opIn, opOut }))
}

const tryTakeReturnType = px => {
	if (!px.tokens.isEmpty()) {
		const h = px.tokens.head()
		if (Group.isSpaced(h) && Keyword.isColon(h.tokens.head()))
			return {
				opReturnType: some(px.w(h.tokens.tail(), parseSpaced)),
				rest: px.tokens.tail()
			}
	}
	return { opReturnType: None, rest: px.tokens }
}

const argsAndBlock = px => {
	const h = px.tokens.head()
	// Might be `|case`
	if (Keyword.isCaseOrCaseDo(h)) {
		const eCase = px.w(px.tokens.tail(), parseCase, h.k, true)
		const args = [ LocalDeclare.focus(h.span) ]
		return (h.k === 'case') ?
			{
				args, opRestArg: None, opIn: None, opOut: None,
				block: BlockVal(px.s({ lines: [], returned: eCase }))
			} :
			{
				args, opRestArg: None, opIn: None, opOut: None,
				block: BlockDo(px.s({ lines: [eCase] }))
			}
	} else {
		const { before, lines } = takeBlockLinesFromEnd_()(px)
		const { args, opRestArg } = px.w(before, parseFunLocals)
		const { opIn, opOut, rest } = px.w(lines, tryTakeInOut)
		const block = px.w(rest, parseBlockFromLines_())
		return { args, opRestArg, block, opIn, opOut }
	}
}

const parseFunLocals = px => {
	if (px.tokens.isEmpty())
		return { args: [], opRestArg: None }
	else {
		const l = px.tokens.last()
		if (l instanceof DotName) {
			check(l.nDots === 3, l.span, 'Splat argument must have exactly 3 dots')
			return {
				args: px.w(px.tokens.rtail(), parseLocalDeclares),
				opRestArg: some(LocalDeclare({
					span: l.span,
					name: l.name,
					opType: None,
					isLazy: false,
					okToNotUse: false
				}))
			}
		}
		else return { args: parseLocalDeclares(px), opRestArg: None }
	}
}

function tryTakeInOut(px) {
	function tryTakeInOrOut(lines, inOrOut) {
		if (!lines.isEmpty()) {
			const firstLine = lines.head()
			assert(Group.isLine(firstLine))
			const tokensFirst = firstLine.tokens
			if (Keyword.is(inOrOut)(tokensFirst.head()))
				return {
					took: some(Debug({
						span: firstLine.span,
						lines: px.w(tokensFirst, parseLinesFromBlock_())
					})),
					rest: lines.tail()
				}
		}
		return { took: None, rest: lines }
	}

	const { took: opIn, rest: restIn } = tryTakeInOrOut(px.tokens, 'in')
	const { took: opOut, rest } = tryTakeInOrOut(restIn, 'out')
	return { opIn, opOut, rest }
}
