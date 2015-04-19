import Loc from 'esast/dist/Loc'
import Slice from '../U/Slice'

export let
	cx, tokens, loc

export const
	init = (_cx, _tokens, _loc) => {
		cx = _cx
		tokens = _tokens
		loc = _loc
	},

	uninit = () => { cx = tokens = loc = undefined },

	check = (cond, message) =>
		cx.check(cond, loc, message),

	checkEmpty = (tokens, message) =>
		cx.check(tokens.isEmpty(), () => locFromTokens(tokens), message),

	w = (_tokens, fun, arg, arg2) => {
		const t = tokens
		tokens = _tokens
		const l = loc
		loc = tokens.isEmpty() ? loc : locFromTokens(tokens)
		const res = fun(arg, arg2)
		tokens = t
		loc = l
		return res
	},

	wt = (t, fun, arg) => w(new Slice([ t ]), fun, arg)

const locFromTokens = ts => Loc(ts.head().loc.start, ts.last().loc.end)
