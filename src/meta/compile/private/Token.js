import Loc from 'esast/dist/Loc'
import { code } from '../CompileError'
import { AllKeywords, CaseKeywords, GroupKinds, GroupOpenToClose, LineSplitKeywords } from './Lang'
import type from './U/type'
import { tuple } from './U/types'
import { implementMany2 } from './U/util'

export default class Token { }

const tt = function() { return tuple(Token, 'loc', Loc, ...arguments) }

const gIs = k => {
	type(k, GroupKinds)
	return t => t instanceof Group && t.k === k
}
const kwIs = k => {
	if (k instanceof Set)
		return t => t instanceof Keyword && k.has(t.k)
	else {
		type(k, AllKeywords)
		return t => t instanceof Keyword && t.k === k
	}
}

export const
	Name = tt('name', String),
	Group = Object.assign(
		tt('tokens', [Token], 'k', GroupKinds),
		{
			isBlock: gIs('->'),
			isLine: gIs('ln'),
			isSpaced: gIs('sp')
		}),
	Keyword = Object.assign(
		tt('k', AllKeywords),
		{
			is: kwIs,
			isBar: kwIs('|'),
			isCaseOrCaseDo: kwIs(CaseKeywords),
			isColon: kwIs(':'),
			isFocus: kwIs('_'),
			isElse: kwIs('else'),
			isLineSplit: kwIs(LineSplitKeywords),
			isTilde: kwIs('~'),
			isObjAssign: kwIs('. ')
		}),
	// k: Number | String | 'js'
	Literal = tt('value', String, 'k', Object),
	CallOnFocus = tt('name', String),
	DotName = tt('nDots', Number, 'name', String)

// toString is used by some parsing errors. Use U.inspect for a more detailed view.
const show = implementMany2('show', [
	[CallOnFocus, () => '_'],
	[DotName, _ => '.'.repeat(_.nDots) + _.name],
	[Group, _ => `${_.k}...${GroupOpenToClose.get(_.k)}`],
	[Keyword, _ => { return _.k } ],
	[Literal, _ => _.value],
	[Name, _ => _.name]
])
Object.assign(Token.prototype, {
	toString() { return code(show(this)) }
})
