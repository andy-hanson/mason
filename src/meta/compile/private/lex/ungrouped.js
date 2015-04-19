import Loc, { Pos, StartLine, StartColumn, singleCharLoc } from 'esast/dist/Loc'
import { code } from '../../CompileError'
import { AllKeywords, NameCharacter, ReservedCharacters, ReservedWords } from '../Lang'
import { CallOnFocus, DotName, Keyword, Literal, Name } from '../Token'
import { assert, newMap } from '../U/util'
import GroupPre from './GroupPre'

export default (_cx, _str) => {
	cx = _cx
	res = [ ]
	str = _str
	len = _str.length
	line = StartLine
	column = StartColumn
	index = 0
	ungrouped(false)
	const r = res
	cx = res = str = undefined
	return r
}

let
	cx,
	// Output array of tokens and GroupPres
	res,
	// String we are tokenizing, and its length
	str, len,
	// Position in str
	index,
	// Current line and column at index
	line, column

const
	o = t => res.push(t),

	pos = () => Pos(line, column),
	loc = () => singleCharLoc(pos()),

	hasNext = () => index !== len,

	peek = () => str.charAt(index),

	tryEat = ch => {
		const canEat = peek() === ch
		if (canEat)
			skip()
		return canEat
	},

	prev = () => str.charAt(index - 1),

	eat = () => {
		const ch = str[index]
		index = index + 1
		if (ch === '\n') {
			line = line + 1
			column = StartColumn
		} else
			column = column + 1
		return ch
	},
	skip = eat,

	// Caller must ensure that backing up nCharsToBackUp characters brings us to oldPos.
	stepBackMany = (oldPos, nCharsToBackUp) => {
		index = index - nCharsToBackUp
		line = oldPos.line
		column = oldPos.column
	},

	takeWhile = rgx => {
		const startIndex = index
		while (rgx.test(peek()))
			index = index + 1
		column = column + (index - startIndex)
		return str.slice(startIndex, index)
	},

	skipWhileEquals = ch => {
		const startIndex = index
		while (peek() === ch)
			index = index + 1
		const diff = index - startIndex
		column = column + diff
		return diff
	},

	skipNewlines = () => {
		while (peek() === '\n') {
			index = index + 1
			line = line + 1
		}
		column = StartColumn
	},

	skipRestOfLine = () => {
		while (peek() !== '\n')
			index = index + 1
	}

const cc = ch => ch.charCodeAt(0)
const
	N0 = cc('0'), N1 = cc('1'), N2 = cc('2'), N3 = cc('3'), N4 = cc('4'),
	N5 = cc('5'), N6 = cc('6'), N7 = cc('7'), N8 = cc('8'), N9 = cc('9'),
	OpParen = cc('('), OpBracket = cc('['), OpBrace = cc('{'),
	ClParen = cc(')'), ClBracket = cc(']'), ClBrace = cc('}'),
	Space = cc(' '),
	Dot = cc('.'),
	Colon = cc(':'),
	Tilde = cc('~'),
	Bar = cc('|'),
	Underscore = cc('_'),
	Backslash = cc('\\'),
	Hash = cc('#'),
	Newline = cc('\n'),
	Quote = cc('"'),
	Tab = cc('\t'),
	Hyphen = cc('-')

const ungrouped = isInQuote => {
	let indent = 0

	while (hasNext()) {
		const startLine = line, startColumn = column
		const loc = () => Loc(Pos(startLine, startColumn), pos())
		const keyword = k => Keyword(loc(), k)
		const gp = k => GroupPre(loc(), k)

		const eatNumber = () => {
			const lit = _ + takeWhile(/[0-9\.e]/)
			cx.check(!Number.isNaN(Number(lit)), pos, () => `Invalid number literal ${code(lit)}`)
			return Literal(loc(), lit, Number)
		}

		const _ = eat()
		switch (cc(_)) {
			case N0: case N1: case N2: case N3: case N4:
			case N5: case N6: case N7: case N8: case N9:
				o(eatNumber())
				break
			case OpParen: case OpBracket: case OpBrace: case ClParen: case ClBracket:
				o(gp(_))
				break
			case ClBrace:
				if (isInQuote)
					return
				o(gp(_))
				break
			case Space:
				cx.warnIf(peek() === ' ', loc, 'Multiple spaces in a row')
				o(gp('sp'))
				break
			case Dot:
				if (peek() === ' ' || peek() === '\n') {
					// ObjLit assign in its own spaced group
					o(gp('sp'))
					o(keyword('. '))
					o(gp('sp'))
					break
				} else {
					o(DotName(
						loc(),
						// +1 for the dot we just skipped.
						skipWhileEquals('.') + 1,
						takeWhile(NameCharacter)))
					break
				}
			case Colon:
				o(keyword(':'))
				break
			case Tilde:
				if (tryEat('|')) {
					o(keyword('~|'))
					o(gp('sp'))
					break
				} else {
					o(keyword('~'))
					break
				}
				break
			case Bar:
				// First arg in its own spaced group
				o(keyword('|'))
				o(gp('sp'))
				break
			case Underscore:
				o(keyword('_'))
				break
			case Hash:
				skipRestOfLine()
				break
			case Newline: {
				cx.check(!isInQuote, loc, 'Quote interpolation cannot contain newline')
				cx.check(prev() !== ' ', loc, 'Line ends in a space')
				// Skip any blank lines.
				skipNewlines()
				const oldIndent = indent
				indent = skipWhileEquals('\t')
				cx.check(peek() !== ' ', pos, 'Line begins in a space')
				if (indent <= oldIndent) {
					for (let i = indent; i < oldIndent; i = i + 1)
						o(gp('<-'))
					o(gp('ln'))
				} else {
					cx.check(indent === oldIndent + 1, loc, 'Line is indented more than once')
					o(gp('->'))
				}
				break
			}
			case Quote:
				lexQuote(indent)
				break
			case Tab:
				cx.fail(loc(), 'Tab may only be used to indent')
			case Hyphen:
				if (/[0-9]/.test(peek())) {
					o(eatNumber())
					break
				}
				// Else fallthrough
			default: {
				cx.check(
					!ReservedCharacters.has(_),
					loc,
					() => `Reserved character ${code(_)}`)
				// All other characters should be handled in a case above.
				assert(NameCharacter.test(_))
				const name = _ + takeWhile(NameCharacter)
				switch (name) {
					case 'region':
						// Rest of line is a comment.
						skipRestOfLine()
						o(keyword('region'))
						break
					default:
						if (tryEat('_'))
							o(CallOnFocus(loc(), name))
						else if (AllKeywords.has(name))
							o(keyword(name))
						else if (ReservedWords.has(name))
							cx.fail(loc, `Reserved word ${code(name)}`)
						else
							o(Name(loc(), name))
				}
			}
		}
	}
}

const lexQuote = indent => {
	const isIndented = peek() === '\n'
	const quoteIndent = indent + 1

	let first = true
	let read = ''
	let startOfRead = pos()

	const yieldRead = () => {
		if (read !== '') {
			o(Literal(
				Loc(startOfRead, pos()),
				// Don't include leading newline of indented block
				first && isIndented ? read.slice(1) : read,
				String))
			first = false
		}
		read = ''
		startOfRead = pos()
	}

	o(GroupPre(loc(), '"'))

	eatChars: while (true) {
		const chPos = pos()
		const ch = eat()
		switch (cc(ch)) {
			case Backslash: {
				const escaped = eat()
				cx.check(quoteEscape.has(escaped), pos, () => `No need to escape ${code(escaped)}`)
				read = read + quoteEscape.get(escaped)
				break
			}
			case OpBrace: {
				yieldRead()
				// We can't just create a Group now because there may be other GroupPre_s inside.
				o(GroupPre(singleCharLoc(chPos), '('))
				ungrouped(true)
				o(GroupPre(loc(), ')'))
				break
			}
			case Newline: {
				cx.check(prev() !== ' ', chPos, 'Line ends in a space')
				cx.check(isIndented, chPos, 'Unclosed quote.')
				let newIndent = skipWhileEquals('\t')

				let s = ''

				// Allow blank lines.
				if (newIndent === 0) {
					while (tryEat('\n'))
						s = s + '\n'
					newIndent = skipWhileEquals('\t')
				}

				if (newIndent < quoteIndent) {
					// Indented quote section is over.
					// Undo reading the tabs and newline.
					stepBackMany(chPos, newIndent + 1)
					assert(peek() === '\n')
					break eatChars
				}
				else
					read = read + s + '\n' + '\t'.repeat(newIndent - quoteIndent)
				break
			}
			case Quote:
				if (!isIndented)
					break eatChars
				// Else fallthrough
			default:
				read = read + ch
		}
	}

	yieldRead()
	o(GroupPre(loc(), 'close"'))
}

const quoteEscape = newMap([['{', '{'], ['n', '\n'], ['t', '\t'], ['"', '"'], ['\\', '\\']])
