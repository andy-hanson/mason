import Loc, { Pos, StartPos } from 'esast/dist/Loc'
import tuple from 'esast/dist/private/tuple'
import Token, { Group, Keyword } from '../Token'
import { isEmpty, last } from '../U/Bag'
import { assert } from '../U/util'
import Slice from '../U/Slice'
import { groupOpenToClose, GP_OpenParen, GP_OpenBracket, GP_OpenBlock, GP_OpenQuote, GP_Line,
	GP_Space, GP_CloseParen, GP_CloseBracket, GP_CloseBlock, GP_CloseQuote} from './GroupPre'


export default function group(cx, preGroupedTokens) {
	// Stack of GroupBuilders
	const stack = []

	// Should always be last(stack)
	let cur = null

	const
		newLevel = (pos, k) => {
			cur = GroupBuilder(pos, k, [ ])
			stack.push(cur)
		},

		finishLevels = (closePos, k) => {
			// We may close other groups. For example, a G_Line can close a G_Paren.
			while (true) {
				const old = last(stack)
				const oldClose = groupOpenToClose(old.k)
				if (oldClose === k)
					break
				else {
					cx.check(
						old.k === GP_OpenParen || old.k === GP_OpenBracket || old.k === GP_Space,
						closePos,
						`Trying to close ${showGroup(k)}, but last opened was ${showGroup(old.k)}`)
					finishLevel(closePos, oldClose)
				}
			}
			finishLevel(closePos, k)
		},

		finishLevel = (closePos, k) => {
			let wrapped = wrapLevel(closePos, k)
			// cur is now the previous level on the stack
			// Don't add line/spaced
			switch (k) {
				case GP_Space: {
					const size = wrapped.tokens.size()
					if (size === 0)
						return
					else if (size === 1)
						// Spaced should always have at least two elements
						wrapped = wrapped.tokens.head()
					break
				}
				case GP_Line:
					if (wrapped.tokens.isEmpty())
						return
					break
				case GP_CloseBlock:
					if (wrapped.tokens.isEmpty())
						cx.fail(closePos, 'Empty block')
				default:
					// fallthrough
			}
			cur.add(wrapped)
		},

		wrapLevel = (closePos, k) => {
			const old = stack.pop()
			cur = isEmpty(stack) ? null : last(stack)
			const loc = Loc(old.startPos, closePos)
			assert(groupOpenToClose(old.k) === k)
			const tokens = new Slice(old.body)
			// A GroupPre opener is also an equivalent Group kind. E.g. GP_OpenParen === G_Paren
			return Group(loc, tokens, old.k)
		},

		startLine = pos => {
			newLevel(pos, GP_Line)
			newLevel(pos, GP_Space)
		},
		endLine = pos => {
			finishLevels(pos, GP_Space)
			finishLevels(pos, GP_Line)
		},

		endAndStart = (loc, k) => {
			finishLevels(loc.start, k)
			newLevel(loc.end, k)
		}

	newLevel(StartPos, GP_OpenBlock)
	startLine(StartPos)

	let endLoc = Loc(StartPos, StartPos)
	preGroupedTokens.forEach(_ => {
		if (_ instanceof Token)
			cur.add(_)
		else {
			// It's a GroupPre
			const loc = _.loc
			endLoc = loc
			const k = _.k
			switch (k) {
				case GP_OpenParen: case GP_OpenBracket:
					newLevel(loc.start, k)
					newLevel(loc.end, GP_Space)
					break
				case GP_CloseParen: case GP_CloseBracket:
					finishLevels(loc.end, k)
					break
				case GP_OpenQuote:
					newLevel(loc.start, k)
					break
				case GP_CloseQuote:
					finishLevels(loc.start, k)
					break
				case GP_OpenBlock:
					//  ~ before block is OK
					if (isEmpty(cur.body) || !Keyword.isTilde(last(cur.body)))
						endAndStart(loc, GP_Space)
					newLevel(loc.start, k)
					startLine(loc.end)
					break
				case GP_CloseBlock:
					endLine(loc.start)
					finishLevels(loc.end, k)
					break
				case GP_Line:
					endLine(loc.start)
					startLine(loc.end)
					break
				case GP_Space:
					endAndStart(loc, k)
					break
				default: throw new Error(k)
			}
		}
	})

	endLine(endLoc.end)
	const wholeModuleBlock = wrapLevel(endLoc.end, GP_CloseBlock)
	assert(isEmpty(stack))
	return wholeModuleBlock
}

const GroupBuilder = tuple('GroupBuilder', Object, 'doc',
	// k is a Group kind
	[ 'startPos', Pos, 'k', Number, 'body', [Token] ],
	{
		add(t) { this.body.push(t) }
	})

// TODO: better names
const showGroup = k => k
