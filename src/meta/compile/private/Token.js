import Loc from 'esast/dist/Loc'
import tuple from 'esast/dist/private/tuple'
import { code } from '../CompileError'
import { AllKeywords, CaseKeywords, GroupOpenToClose, LineSplitKeywords } from './Lang'
import { implementMany2 } from './U/util'

export default class Token { }

const tt = (name, ...namesTypes) => tuple(name, Token, 'doc', [ 'loc', Loc ].concat(namesTypes))

const gIs = k => t => t instanceof Group && t.k === k
const kwIs = k =>
	(k instanceof Set) ?
		t => t instanceof Keyword && k.has(t.k) :
		t => t instanceof Keyword && t.k === k

export const
	G_Paren = 1,
	G_Bracket = 2,
	G_Block = 3,
	G_Quote = 4,
	G_Line = 5,
	G_Space = 6

export const
	Name = tt('Name', 'name', String),
	Group = Object.assign(
		tt('Group', 'tokens', [Token], 'k', Number),
		{
			isBlock: gIs(G_Block),
			isLine: gIs(G_Line),
			isSpaced: gIs(G_Space)
		}),
	Keyword = Object.assign(
		tt('Keyword', 'k', AllKeywords),
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
	TokenNumberLiteral = tt('TokenNumberLiteral', 'value', Number),
	CallOnFocus = tt('CallOnFocus', 'name', String),
	DotName = tt('DotName', 'nDots', Number, 'name', String)

// toString is used by some parsing errors. Use U.inspect for a more detailed view.
const show = implementMany2('show', [
	[CallOnFocus, () => '_'],
	[DotName, _ => '.'.repeat(_.nDots) + _.name],
	[Group, _ => `${_.k}...${GroupOpenToClose.get(_.k)}`],
	[Keyword, _ => { return _.k } ],
	[TokenNumberLiteral, _ => _.value],
	[Name, _ => _.name]
])
Object.assign(Token.prototype, {
	toString() { return code(show(this)) }
})
