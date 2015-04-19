import { code } from '../../CompileError'
import { LocalDeclare, Use, UseDo } from '../../Expression'
import { DotName, Group, Keyword, Name } from '../Token'
import { repeat } from '../U/Bag'
import { None, opIf, some } from '../U/Op'
import { assert } from '../U/util'
import { takeBlockLinesFromEnd } from './parseBlock'
import parseLocalDeclares from './parseLocalDeclares'
import { check, cx, loc, tokens, w, wt } from './vars'

export default function tryParseUse(k) {
	if (!tokens.isEmpty()) {
		const l0 = tokens.head()
		assert(Group.isLine(l0))
		if (Keyword.is(k)(l0.tokens.head()))
			return {
				uses: w(l0.tokens.tail(), parseUse, k),
				rest: tokens.tail()
			}
	}
	return { uses: [], rest: tokens }
}

const
	parseUse = k => {
		const { before, lines } = takeBlockLinesFromEnd()
		check(before.isEmpty(), () =>
			`Did not expect anything after ${code(k)} other than a block`)
		return lines.map(line => w(line.tokens, useLine, k))
	},

	// TODO:ES6 Just use module imports, no AssignDestructure needed
	useLine = k => {
		const tReq = tokens.head()
		const { path, name } = wt(tReq, parseRequire)

		if (k === 'use!') {
			check(tokens.size() === 1, () => `Unexpected ${tokens[1]}`)
			return UseDo(loc, path)
		} else {
			const isLazy = k === 'use~' || k === 'use-debug'
			const { used, opUseDefault } = w(tokens.tail(), parseThingsUsed, name, isLazy)
			return Use(loc, path, used, opUseDefault)
		}
	},

	parseThingsUsed = (name, isLazy) => {
		const useDefault = () => LocalDeclare(loc, name, None, isLazy, false)
		if (tokens.isEmpty())
			return { used: [], opUseDefault: some(useDefault()) }
		else {
			const hasDefaultUse = Keyword.isFocus(tokens.head())
			const opUseDefault = opIf(hasDefaultUse, useDefault)
			const rest = hasDefaultUse ? tokens.tail() : tokens
			const used = w(rest, parseLocalDeclares).map(l => {
				check(l.name !== '_', () => `${code('_')} not allowed as import name.`)
				l.isLazy = isLazy
				return l
			})
			return { used, opUseDefault }
		}
	},

	parseRequire = () => {
		assert(tokens.size() === 1)
		const t = tokens.head()
		if (t instanceof Name)
			return { path: t.name, name: t.name }
		else if (t instanceof DotName)
			return parseLocalRequire()
		else {
			check(Group.isSpaced(t), 'Not a valid module name.')
			return w(t.tokens, parseLocalRequire)
		}
	},

	parseLocalRequire = () => {
		const first = tokens.head()
		let parts = []
		if (first instanceof DotName)
			parts = first.nDots === 1 ? ['.'] : repeat('..', first.nDots - 1)
		else
			cx.check(first instanceof Name, first.loc, 'Not a valid part of module path.')
		parts.push(first.name)
		tokens.tail().each(t => {
			cx.check(t instanceof DotName && t.nDots === 1, t.loc,
				'Not a valid part of module path.')
			parts.push(t.name)
		})
		return {
			path: parts.join('/'),
			name: tokens.last().name
		}
	}
