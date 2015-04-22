import Loc, { Pos, StartLine, StartColumn, singleCharLoc } from 'esast/dist/Loc'
import { code } from '../../CompileError'
import { AllKeywords, ReservedWords } from '../Lang'
import { CallOnFocus, DotName, Keyword, Literal, Name } from '../Token'
import { assert } from '../U/util'
import GroupPre, { GP_OpenParen, GP_OpenBracket, GP_OpenBlock, GP_OpenQuote, GP_Line,
	GP_Space, GP_CloseParen, GP_CloseBracket, GP_CloseBlock, GP_CloseQuote} from './GroupPre'
import { showChar, N0, N1, N2, N3, N4, N5, N6, N7, N8, N9,
	OpParen, OpBracket, OpBrace, ClParen, ClBracket, ClBrace, Space, Dot, Colon, Tilde, Bar,
	Underscore, Backslash, Hash, Newline, Quote, Tab, Hyphen, LetterN, LetterT,
	isDigit, isNameCharacter, isNumberCharacter, isReservedCharacter } from './char'

export default (cx, str) => {
	const res = [ ]
	let line = StartLine
	let column = StartColumn
	let index = 0

	const
		o = t => { res.push(t) },

		pos = () => Pos(line, column),
		loc = () => singleCharLoc(pos()),

		prev = () => str.charCodeAt(index - 1),
		peek = () => str.charCodeAt(index),

		eat = () => {
			const ch = str.charCodeAt(index)
			index = index + 1
			column = column + 1
			return ch
		},
		tryEat = ch => {
			const canEat = peek() === ch
			if (canEat) {
				index = index + 1
				column = column + 1
			}
			return canEat
		},

		// Caller must ensure that backing up nCharsToBackUp characters brings us to oldPos.
		stepBackMany = (oldPos, nCharsToBackUp) => {
			index = index - nCharsToBackUp
			line = oldPos.line
			column = oldPos.column
		},

		_skipWhile = pred => {
			const startIndex = index
			while (pred(peek()))
				index = index + 1
			const diff = index - startIndex
			column = column + diff
			return diff
		},
		takeWhileWithPrev = pred => {
			const startIndex = index
			_skipWhile(pred)
			return str.slice(startIndex - 1, index)
		},
		takeWhile = pred => {
			const startIndex = index
			_skipWhile(pred)
			return str.slice(startIndex, index)
		},
		skipWhileEquals = ch => _skipWhile(_ => _ === ch),

		// Called after seeing the first newline.
		skipNewlines = () => {
			line = line + 1
			const startLine = line
			while (peek() === Newline) {
				index = index + 1
				line = line + 1
			}
			column = StartColumn
			return line - startLine
		},

		skipRestOfLine = () => {
			while (peek() !== Newline)
				index = index + 1
		}

	const ungrouped = isInQuote => {
		let indent = 0

		let ch, startLine, startColumn
		const
			loc = () => Loc(Pos(startLine, startColumn), pos()),
			keyword = k => Keyword(loc(), k),
			gp = k => o(GroupPre(loc(), k)),
			eatNumber = () => {
				const lit = takeWhileWithPrev(isNumberCharacter)
				cx.check(!Number.isNaN(Number(lit)), pos, () =>
					`Invalid number literal ${code(lit)}`)
				return Literal(loc(), lit, Number)
			}

		while (index !== str.length) {
			startLine = line
			startColumn = column

			ch = eat()
			switch (ch) {
				case N0: case N1: case N2: case N3: case N4:
				case N5: case N6: case N7: case N8: case N9:
					o(eatNumber())
					break
				case OpParen:
					gp(GP_OpenParen)
					break
				case OpBracket:
					gp(GP_OpenBracket)
					break
				case ClParen:
					gp(GP_CloseParen)
					break
				case ClBracket:
					gp(GP_CloseBracket)
					break
				case ClBrace:
					cx.check(isInQuote, loc, () => `Reserved character ${showChar(ch)}`)
					return
				case Space:
					cx.warnIf(peek() === Space, loc, 'Multiple spaces in a row')
					gp(GP_Space)
					break
				case Dot: {
					const p = peek()
					if (p === Space || p === Newline) {
						// ObjLit assign in its own spaced group.
						// We can't just create a new Group here because we want to
						// ensure it's not part of the preceding or following spaced group.
						gp(GP_Space)
						o(keyword('. '))
						gp(GP_Space)
					} else
						o(DotName(
							loc(),
							// +1 for the dot we just skipped.
							skipWhileEquals(Dot) + 1,
							takeWhile(isNameCharacter)))
					break
				}
				case Colon:
					o(keyword(':'))
					break
				case Tilde:
					if (tryEat(Bar)) {
						o(keyword('~|'))
						gp(GP_Space)
						break
					} else {
						o(keyword('~'))
						break
					}
					break
				case Bar:
					// First arg in its own spaced group
					o(keyword('|'))
					gp(GP_Space)
					break
				case Underscore:
					o(keyword('_'))
					break
				case Hash:
					skipRestOfLine()
					break
				case Newline: {
					cx.check(!isInQuote, loc, 'Quote interpolation cannot contain newline')
					cx.check(prev() !== Space, loc, 'Line ends in a space')

					// Skip any blank lines.
					skipNewlines()
					const oldIndent = indent
					indent = skipWhileEquals(Tab)
					cx.check(peek() !== Space, pos, 'Line begins in a space')
					if (indent <= oldIndent) {
						for (let i = indent; i < oldIndent; i = i + 1)
							gp(GP_CloseBlock)
						gp(GP_Line)
					} else {
						cx.check(indent === oldIndent + 1, loc, 'Line is indented more than once')
						gp(GP_OpenBlock)
					}
					break
				}
				case Tab:
					cx.fail(loc(), 'Tab may only be used to indent')
					break
				case Quote:
					lexQuote(indent)
					break
				case Hyphen:
					if (isDigit(peek())) {
						o(eatNumber())
						break
					}
					// Else fallthrough
				default: {
					cx.check(
						!isReservedCharacter(ch), loc, () => `Reserved character ${showChar(ch)}`)
					// All other characters should be handled in a case above.
					const name = takeWhileWithPrev(isNameCharacter)
					switch (name) {
						case 'region':
							// Rest of line is a comment.
							skipRestOfLine()
							o(keyword('region'))
							break
						default:
							if (tryEat(Underscore))
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
		const isIndented = peek() === Newline
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

		o(GroupPre(loc(), GP_OpenQuote))

		eatChars: while (true) {
			const chPos = pos()
			const ch = eat()
			switch (ch) {
				case Backslash: {
					read = read + quoteEscape(eat())
					break
				}
				case OpBrace: {
					yieldRead()
					// We can't create a Group now because there may be other GroupPre_s inside.
					o(GroupPre(singleCharLoc(chPos), GP_OpenParen))
					ungrouped(true)
					o(GroupPre(loc(), GP_CloseParen))
					break
				}
				case Newline: {
					cx.check(prev !== Space, chPos, 'Line ends in a space')
					cx.check(isIndented, chPos, 'Unclosed quote.')
					let newIndent = skipWhileEquals(Tab)

					let extraNewlines = ''
					// Allow blank lines.
					if (newIndent === 0) {
						extraNewlines = '\n'.repeat(skipNewlines())
						newIndent = skipWhileEquals(Tab)
					}

					if (newIndent < quoteIndent) {
						// Indented quote section is over.
						// Undo reading the tabs and newline.
						stepBackMany(chPos, newIndent + 1)
						assert(peek() === Newline)
						break eatChars
					} else
						read = read + extraNewlines + '\n' + '\t'.repeat(newIndent - quoteIndent)
					break
				}
				case Quote:
					if (!isIndented)
						break eatChars
					// Else fallthrough
				default:
					read = read + String.fromCharCode(ch)
			}
		}

		yieldRead()
		o(GroupPre(loc(), GP_CloseQuote))
	}

	const quoteEscape = ch => {
		switch (ch) {
			case OpBrace: return '{'
			case LetterN: return '\n'
			case LetterT: return '\t'
			case Quote: return '"'
			case Backslash: return '\\'
			default: cx.fail(pos, `No need to escape ${showChar(ch)}`)
		}
	}

	ungrouped(false)
	return res
}
