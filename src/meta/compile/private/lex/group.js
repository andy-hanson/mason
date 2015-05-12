import Loc, { StartPos } from 'esast/dist/Loc'
import { Group, Keyword } from '../Token'
import { head, isEmpty, last } from '../U/Bag'
import { assert } from '../U/util'
import GroupPre, {
	groupOpenToClose, GP_OpenParen, GP_OpenBracket, GP_OpenBlock, GP_OpenQuote, GP_Line,
	GP_Space, GP_CloseParen, GP_CloseBracket, GP_CloseBlock, GP_CloseQuote} from './GroupPre'

export default function group(cx, preGroupedTokens) {
	// Stack of GroupBuilders
	const stack = []
	let cur

	const
		newLevel = (pos, k) => {
			stack.push(cur)
			cur = Group(Loc(pos, null), [ ], k)
		},

		finishLevels = (closePos, k) => {
			// We may close other groups. For example, a G_Line can close a G_Paren.
			while (true) {
				const close = groupOpenToClose(cur.kind)
				if (close === k)
					break
				else {
					cx.check(
						cur.kind === GP_OpenParen ||
							cur.kind === GP_OpenBracket ||
							cur.kind === GP_Space,
						closePos, () =>
						`Trying to close ${showG(k)}, but last opened was ${showG(cur.kind)}`)
					finishLevel(closePos, close)
				}
			}
			finishLevel(closePos, k)
		},

		finishLevel = (closePos, k) => {
			let wrapped = wrapLevel(closePos)
			// cur is now the previous level on the stack
			// Don't add line/spaced
			switch (k) {
				case GP_Space: {
					const size = wrapped.tokens.length
					if (size === 0)
						return
					else if (size === 1)
						// Spaced should always have at least two elements
						wrapped = head(wrapped.tokens)
					break
				}
				case GP_Line:
					if (isEmpty(wrapped.tokens))
						return
					break
				case GP_CloseBlock:
					if (isEmpty(wrapped.tokens))
						cx.fail(closePos, 'Empty block')
				default:
					// fallthrough
			}
			cur.tokens.push(wrapped)
		},

		wrapLevel = closePos => {
			const builtGroup = cur
			cur = stack.pop()
			builtGroup.loc.end = closePos
			return builtGroup
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

	cur = Group(Loc(StartPos, null), [ ], GP_OpenBlock)
	startLine(StartPos)

	let endLoc = Loc(StartPos, StartPos)
	preGroupedTokens.forEach(_ => {
		if (_ instanceof GroupPre) {
			// It's a GroupPre
			const loc = _.loc
			endLoc = loc
			const kind = _.kind
			switch (kind) {
				case GP_OpenParen: case GP_OpenBracket:
					newLevel(loc.start, kind)
					newLevel(loc.end, GP_Space)
					break
				case GP_CloseParen: case GP_CloseBracket:
					finishLevels(loc.end, kind)
					break
				case GP_OpenQuote:
					newLevel(loc.start, kind)
					break
				case GP_CloseQuote:
					finishLevels(loc.start, kind)
					break
				case GP_OpenBlock:
					//  ~ before block is OK
					if (isEmpty(cur.tokens) || !Keyword.isLazy(last(cur.tokens)))
						endAndStart(loc, GP_Space)
					newLevel(loc.start, kind)
					startLine(loc.end)
					break
				case GP_CloseBlock:
					endLine(loc.start)
					finishLevels(loc.end, kind)
					break
				case GP_Line:
					endLine(loc.start)
					startLine(loc.end)
					break
				case GP_Space:
					endAndStart(loc, kind)
					break
				default: throw new Error(kind)
			}
		} else
			cur.tokens.push(_)
	})

	endLine(endLoc.end)
	assert(isEmpty(stack))
	cur.loc.end = endLoc.end
	return cur
}

// TODO
const showG = kind => kind
