import check from '../check'
import { Block, Fun, LocalDeclare } from '../Expression'
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
const takeBlockFromEnd_ = lazy(() => require('./parseBlock').takeBlockFromEnd)

export default function parseFun(px, k) {
	type(px, Px, k, KFun)
	const { opReturnType, rest } = tryTakeReturnType(px)
	px.check(!rest.isEmpty(), () => `Expected an indented block after ${code(k)}`)
	const { args, opRestArg, block } = px.w(rest, argsAndBlock)
	return Fun(px.s({ args, opRestArg, block, opReturnType, k }))
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
		const [ lines, opReturn ] = h.k === 'case' ?
			[ None, some(eCase) ] :
			[ some(eCase), None ]
		return {
			args: [ LocalDeclare.focus(h.span) ],
			opRestArg: None,
			block: Block(px.s({ lines, opReturn, opIn: None, opOut: None }))
		}
	} else {
		const { before, block } = takeBlockFromEnd_()(px, 'any')
		const { args, opRestArg } = px.w(before, parseFunLocals)
		type(block, Block)
		return { args, opRestArg, block }
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
