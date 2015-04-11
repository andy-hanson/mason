import { code } from '../../CompileError'
import { BlockDo, BlockVal, Debug, Fun, LocalDeclare } from '../../Expression'
import { CaseKeywords, KFun } from '../Lang'
import { DotName, Group, Keyword } from '../Token'
import type from '../U/type'
import { flatMap } from '../U/Bag'
import Op, { ifElse, None, opIf, some } from '../U/Op'
import { assert, lazy } from '../U/util'
import parseLocalDeclares from './parseLocalDeclares'
import { parseSpaced } from './parseSpaced'
import Px from './Px'
// TODO:ES6
import * as PC from './parseCase'
import * as PB from './parseBlock'

export default function parseFun(px, k) {
	type(px, Px, k, KFun)
	const { opReturnType, rest } = tryTakeReturnType(px)
	px.check(!rest.isEmpty(), () => `Expected an indented block after ${code(k)}`)
	const { args, opRestArg, block, opIn, opOut } = px.w(rest, argsAndBlock)
	// Need res declare if there is a return type or out condition.
	const opResDeclare = ifElse(opReturnType,
		rt => some(LocalDeclare.res(rt.loc, opReturnType)),
		() => opOut.map(o => LocalDeclare.res(o.loc, opReturnType)))
	return Fun(px.loc, k, args, opRestArg, block, opIn, opResDeclare, opOut)
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
		const eCase = px.w(px.tokens.tail(), PC.parseCase, h.k, true)
		const args = [ LocalDeclare.focus(h.loc) ]
		return (h.k === 'case') ?
			{
				args, opRestArg: None, opIn: None, opOut: None,
				block: BlockVal(px.loc, [ ], eCase)
			} :
			{
				args, opRestArg: None, opIn: None, opOut: None,
				block: BlockDo(px.loc, [ eCase ])
			}
	} else {
		const { before, lines } = PB.takeBlockLinesFromEnd(px)
		const { args, opRestArg } = px.w(before, parseFunLocals)
		const { opIn, opOut, rest } = px.w(lines, tryTakeInOut)
		const block = px.w(rest, PB.parseBlockFromLines)
		return { args, opRestArg, block, opIn, opOut }
	}
}

const parseFunLocals = px => {
	if (px.tokens.isEmpty())
		return { args: [], opRestArg: None }
	else {
		const l = px.tokens.last()
		if (l instanceof DotName) {
			px.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots')
			return {
				args: px.w(px.tokens.rtail(), parseLocalDeclares),
				opRestArg: some(LocalDeclare(l.loc, l.name, None, false, false))
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
					took: some(Debug(
						firstLine.loc,
						px.w(tokensFirst, PB.parseLinesFromBlock))),
					rest: lines.tail()
				}
		}
		return { took: None, rest: lines }
	}

	const { took: opIn, rest: restIn } = tryTakeInOrOut(px.tokens, 'in')
	const { took: opOut, rest } = tryTakeInOrOut(restIn, 'out')
	return { opIn, opOut, rest }
}
