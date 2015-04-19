import { code } from '../../CompileError'
import { BlockDo, BlockVal, Debug, Fun, LocalDeclare } from '../../Expression'
import { DotName, Group, Keyword } from '../Token'
import { ifElse, None, some } from '../U/Op'
import { assert } from '../U/util'
import parseLocalDeclares from './parseLocalDeclares'
import { parseSpaced } from './parseSpaced'
import { parseCase } from './parseCase'
import { takeBlockLinesFromEnd, parseBlockFromLines, parseLinesFromBlock } from './parseBlock'
import { check, cx, loc, w, tokens } from './vars'

export default function parseFun(k) {
	const { opReturnType, rest } = tryTakeReturnType()
	check(!rest.isEmpty(), () => `Expected an indented block after ${code(k)}`)
	const { args, opRestArg, block, opIn, opOut } = w(rest, argsAndBlock)
	// Need res declare if there is a return type or out condition.
	const opResDeclare = ifElse(opReturnType,
		rt => some(LocalDeclare.res(rt.loc, opReturnType)),
		() => opOut.map(o => LocalDeclare.res(o.loc, opReturnType)))
	return Fun(loc, k, args, opRestArg, block, opIn, opResDeclare, opOut)
}

const tryTakeReturnType = () => {
	if (!tokens.isEmpty()) {
		const h = tokens.head()
		if (Group.isSpaced(h) && Keyword.isColon(h.tokens.head()))
			return {
				opReturnType: some(w(h.tokens.tail(), parseSpaced)),
				rest: tokens.tail()
			}
	}
	return { opReturnType: None, rest: tokens }
}

const argsAndBlock = () => {
	const h = tokens.head()
	// Might be `|case`
	if (Keyword.isCaseOrCaseDo(h)) {
		const eCase = w(tokens.tail(), parseCase, h.k, true)
		const args = [ LocalDeclare.focus(h.loc) ]
		return (h.k === 'case') ?
			{
				args, opRestArg: None, opIn: None, opOut: None,
				block: BlockVal(loc, [ ], eCase)
			} :
			{
				args, opRestArg: None, opIn: None, opOut: None,
				block: BlockDo(loc, [ eCase ])
			}
	} else {
		const { before, lines } = takeBlockLinesFromEnd()
		const { args, opRestArg } = w(before, parseFunLocals)
		const { opIn, opOut, rest } = w(lines, tryTakeInOut)
		const block = w(rest, parseBlockFromLines)
		return { args, opRestArg, block, opIn, opOut }
	}
}

const parseFunLocals = () => {
	if (tokens.isEmpty())
		return { args: [], opRestArg: None }
	else {
		const l = tokens.last()
		if (l instanceof DotName) {
			cx.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots')
			return {
				args: w(tokens.rtail(), parseLocalDeclares),
				opRestArg: some(LocalDeclare(l.loc, l.name, None, false, false))
			}
		}
		else return { args: parseLocalDeclares(), opRestArg: None }
	}
}

function tryTakeInOut() {
	function tryTakeInOrOut(lines, inOrOut) {
		if (!lines.isEmpty()) {
			const firstLine = lines.head()
			assert(Group.isLine(firstLine))
			const tokensFirst = firstLine.tokens
			if (Keyword.is(inOrOut)(tokensFirst.head()))
				return {
					took: some(Debug(
						firstLine.loc,
						w(tokensFirst, parseLinesFromBlock))),
					rest: lines.tail()
				}
		}
		return { took: None, rest: lines }
	}

	const { took: opIn, rest: restIn } = tryTakeInOrOut(tokens, 'in')
	const { took: opOut, rest } = tryTakeInOrOut(restIn, 'out')
	return { opIn, opOut, rest }
}
