import Loc, { singleCharLoc } from 'esast/dist/Loc'
import { code } from '../../CompileError'
import { AllKeywords, isNameCharacter, ReservedCharacters, ReservedWords } from '../Lang'
import { CallOnFocus, DotName, Keyword, Literal, Name } from '../Token'
import type from '../U/type'
import { assert } from '../U/util'
import GroupPre from './GroupPre'
import Stream from './Stream'

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
	Backtick = cc('`'),
	Quote = cc('"'),
	Tab = cc('\t'),
	Hyphen = cc('-')

export default function* ungrouped(lx, stream, isInQuote) {
	type(stream, Stream, isInQuote, Boolean)

	let indent = 0

	while (stream.hasNext()) {
		const startPos = stream.pos
		const loc = () => Loc(startPos, stream.pos)
		const keyword = k => Keyword(loc(), k)
		const gp = k => GroupPre(loc(), k)

		const eatNumber = () => {
			let msLit = _ + stream.takeWhile(/[0-9\.e_]/)
			if (msLit.endsWith('.')) {
				msLit = msLit.slice(0, msLit.length - 1)
				stream.stepBack()
			}
			const jsLit = msLit.replace(/_/g, '')
			lx.check(!Number.isNaN(Number(jsLit)), stream.pos, () =>
				`Invalid number literal ${code(msLit)}`)
			return Literal(loc(), jsLit, Number)
		}

		const _ = stream.eat()
		switch (cc(_)) {
			case N0: case N1: case N2: case N3: case N4:
			case N5: case N6: case N7: case N8: case N9:
				yield eatNumber(_, stream)
				break
			case OpParen: case OpBracket: case OpBrace: case ClParen: case ClBracket:
				yield gp(_)
				break
			case ClBrace:
				if (isInQuote)
					return
				yield gp(_)
				break
			case Space:
				lx.warnIf(stream.peek() === ' ', loc, 'Multiple spaces in a row')
				yield gp('sp')
				break
			case Dot:
				if (stream.peek() === ' ' || stream.peek() === '\n') {
					// ObjLit assign in its own spaced group
					yield gp('sp')
					yield keyword('. ')
					yield gp('sp')
					break
				} else {
					yield DotName(
						loc(),
						// +1 for the dot we just skipped.
						stream.takeWhile('.').length + 1,
						stream.takeWhile(isNameCharacter))
					break
				}
			case Colon:
				yield keyword(':')
				break
			case Tilde:
				if (stream.tryEat('|')) {
					yield keyword('~|')
					yield gp('sp')
					break
				} else {
					yield keyword('~')
					break
				}
				break
			case Bar:
				// First arg in its own spaced group
				yield keyword('|')
				yield gp('sp')
				break
			case Underscore:
				yield keyword('_')
				break
			case Hash:
				stream.takeUpTo('\n')
				break
			case Newline: {
				lx.check(!isInQuote, loc, 'Quote interpolation cannot contain newline')
				lx.check(stream.prev() !== ' ', loc, 'Line ends in a space')
				// Skip any blank lines.
				stream.takeWhile('\n')
				const oldIndent = indent
				indent = stream.takeWhile('\t').length
				lx.check(stream.peek() !== ' ', stream.pos, 'Line begins in a space')
				if (indent <= oldIndent) {
					for (let i = indent; i < oldIndent; i = i + 1)
						yield gp('<-')
					yield gp('ln')
				} else {
					lx.check(indent === oldIndent + 1, loc, 'Line is indented more than once')
					yield gp('->')
				}
				break
			}
			case Backtick: {
				const js = stream.takeUpTo(/[`\n]/)
				lx.check(stream.eat() === '`', loc, () => `Unclosed ${code('`')}`)
				yield Literal(loc(), js, 'js')
				break
			}
			case Quote:
				yield* lexQuote(lx, stream, indent)
				break
			case Tab:
				lx.fail(loc(), 'Tab may only be used to indent')
			case Hyphen:
				if (/[0-9]/.test(stream.peek())) {
					yield eatNumber()
					break
				}
				// Else fallthrough
			default: {
				lx.check(
					!ReservedCharacters.has(_),
					loc,
					() => `Reserved character ${code(_)}`)
				// All other characters should be handled in a case above.
				assert(isNameCharacter(_))
				const name = _ + stream.takeWhile(isNameCharacter)
				switch (name) {
					case 'region':
						// Rest of line is a comment.
						stream.takeUpTo('\n')
						yield keyword('region')
						break
					default:
						if (stream.tryEat('_'))
							yield CallOnFocus(loc(), name)
						else if (AllKeywords.has(name))
							yield keyword(name)
						else if (ReservedWords.has(name))
							lx.fail(loc, `Reserved word ${code(name)}`)
						else
							yield Name(loc(), name)
				}
			}
		}
	}
}


function* lexQuote(lx, stream, indent) {
	type(stream, Stream, indent, Number)

	const isIndented = stream.peek() === '\n'
	const quoteIndent = indent + 1

	let first = true
	let read = ''
	let startOfRead = stream.pos

	function* yieldRead() {
		if (read !== '') {
			yield Literal(
				Loc(startOfRead, stream.pos),
				// Don't include leading newline of indented block
				first && isIndented ? read.slice(1) : read,
				String)
			first = false
		}
		read = ''
		startOfRead = stream.pos
	}

	yield GroupPre(singleCharLoc(stream.pos), '"')

	eatChars: while (true) {
		const chPos = stream.pos
		const ch = stream.eat()
		switch (cc(ch)) {
			case Backslash: {
				const escaped = stream.eat()
				lx.check(quoteEscape.has(escaped), stream.pos, () =>
					`No need to escape ${code(escaped)}`)
				read = read + quoteEscape.get(escaped)
				break
			}
			case OpBrace: {
				yield* yieldRead()
				// We can't just create a Group now because there may be other GroupPre_s inside.
				yield GroupPre(singleCharLoc(chPos), '(')
				yield* ungrouped(lx, stream, true)
				yield GroupPre(singleCharLoc(stream.pos), ')')
				break
			}
			case Newline: {
				lx.check(stream.prev() !== ' ', chPos, 'Line ends in a space')
				lx.check(isIndented, chPos, 'Unclosed quote.')
				let newIndent = stream.takeWhile('\t').length

				let s = ''

				// Allow blank lines.
				if (newIndent === 0) {
					while (stream.tryEat('\n'))
						s = s + '\n'
					newIndent = stream.takeWhile('\t').length
				}

				if (newIndent < quoteIndent) {
					// Indented quote section is over.
					// Undo reading the tabs and newline.
					stream.stepBackMany(chPos, newIndent + 1)
					assert(stream.peek() === '\n')
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

	yield* yieldRead()
	yield GroupPre(singleCharLoc(stream.pos), 'close"')
}

const quoteEscape = new Map([['{', '{'], ['n', '\n'], ['t', '\t'], ['"', '"'], ['\\', '\\']])

