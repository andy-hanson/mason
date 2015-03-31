import { AllKeywords, GroupKinds, GroupOpenToClose } from './Lang'
import { spanType } from './Span'
import type from './U/type'
import { abstractType } from './U/types'
import { code, implementMany2 } from './U'

export default class Token { }

export class Name extends Token {
	constructor(span, name) { this.span = span; this.name = name }
}

export class Group extends Token {
	// k:GroupKinds
	constructor(span, tokens, k) { this.span = span; this.tokens = tokens; this.k = k }
}
Group.is = k => {
	type(k, GroupKinds)
	return t => t instanceof Group && t.k === k
}

export class Keyword extends Token {
	// k: AllKeywords
	constructor(span, k) { this.span = span; this.k = k }
}
Keyword.is = k => {
	if (k instanceof Set)
		return t => t instanceof Keyword && k.has(t.k)
	else {
		type(k, AllKeywords)
		return t => t instanceof Keyword && t.k === k
	}
}

export class Literal extends Token {
	// k: Number | String | 'js'
	constructor(span, value, k) { this.span = span; this.value = value; this.k = k }
}

export class CallOnFocus extends Token {
	constructor(span, name) { this.span = span; this.name = name }
}

export class DotName extends Token {
	constructor(span, nDots, name) {
		this.span = span; this.nDots = nDots; this.name = name
	}
}

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
