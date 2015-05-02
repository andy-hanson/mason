import Loc, { Pos, StartLine, StartColumn, singleCharLoc } from 'esast/dist/Loc'
import { code } from '../../CompileError'
import { AllKeywords, NonNames } from '../Lang'
import { CallOnFocus, DotName, Keyword, TokenNumberLiteral, Name } from '../Token'
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

	// Use these for debugging pos.
	/*
	const
		checkPos = () => {
			const p = getCorrectPos()
			if (p.line !== line || p.column !== column)
				throw new Error(`index: ${index}, wrong: ${Pos(line, column)}, right: ${p}`)
		},
		indexToPos = new Map(),
		getCorrectPos = () => {
			if (index === 0)
				return Pos(StartLine, StartColumn)

			let oldPos, oldIndex
			for (oldIndex = index - 1; oldIndex > 0; oldIndex = oldIndex - 1) {
				oldPos = indexToPos.get(oldIndex)
				if (oldPos)
					break
			}
			if (oldPos === undefined) {
				assert(oldIndex === 0)
				oldPos = Pos(StartLine, StartColumn)
			}
			let newLine = oldPos.line, newColumn = oldPos.column
			for (; oldIndex < index; oldIndex = oldIndex + 1)
				if (str.charCodeAt(oldIndex) === Newline) {
					newLine = newLine + 1
					newColumn = StartColumn
				} else
					newColumn = newColumn + 1

			const p = Pos(newLine, newColumn)
			indexToPos.set(index, p)
			return p
		}
	*/

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
		tryEatNewline = () => {
			const canEat = peek() === Newline
			if (canEat) {
				index = index + 1
				line = line + 1
				column = StartColumn
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

		skipRestOfLine = () =>
			_skipWhile(_ => _ !== Newline)

	const ungrouped = isInQuote => {
		let indent = 0

		let ch, startLine, startColumn
		const
			loc = () => Loc(Pos(startLine, startColumn), pos()),
			keyword = k => Keyword(loc(), k),
			gp = k => o(GroupPre(loc(), k)),
			eatNumber = () => {
				const lit = takeWhileWithPrev(isNumberCharacter)
				const num = Number(lit)
				cx.check(!Number.isNaN(num), pos, () =>
					`Invalid number literal ${code(lit)}`)
				return TokenNumberLiteral(loc(), num)
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
					if (!(tryEat(Space) || tryEat(Tab)))
						cx.fail(loc, () => `${code('#')} must be followed by space or tab.}`)
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

					if (NonNames.has(name))
						if (name === 'region') {
							// Rest of line is a comment.
							skipRestOfLine()
							o(keyword('region'))
						} else if (AllKeywords.has(name))
							o(keyword(name))
						else
							cx.fail(loc, `Reserved word ${code(name)}`)
					else if (tryEat(Underscore))
						o(CallOnFocus(loc(), name))
					else
						o(Name(loc(), name))
				}
			}
		}
	}

	const lexQuote = indent => {
		const quoteIndent = indent + 1

		const isIndented = tryEatNewline()
		if (isIndented) {
			const actualIndent = skipWhileEquals(Tab)
			cx.check(actualIndent === quoteIndent, pos,
				'Indented quote must have exactly one more indent than previous line.')
		}

		let read = ''

		const yieldRead = () => {
			if (read !== '') {
				o(read)
				read = ''
			}
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
					// Allow extra blank lines.
					const numNewlines = skipNewlines() + 1
					const newIndent = skipWhileEquals(Tab)
					if (newIndent < quoteIndent) {
						// Indented quote section is over.
						// Undo reading the tabs and newline.
						stepBackMany(chPos, numNewlines + newIndent)
						assert(peek() === Newline)
						break eatChars
					} else
						read = read +
							'\n'.repeat(numNewlines) + '\t'.repeat(newIndent - quoteIndent)
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
