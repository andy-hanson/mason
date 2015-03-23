import assert from "assert"
import check, { fail, warnIf } from "../check"
import { AllKeywords, isNameCharacter, ReservedCharacters, ReservedWords } from "../Lang"
import Span, { single } from "../Span"
import { CallOnFocus, DotName, Keyword, Literal, Name } from "../Token"
import { rcons, repeat } from "../U/Bag"
import type from "../U/type"
import { code } from "../U"
import GroupPre from "./GroupPre"
import Stream from "./Stream"

export default function* lexPlain(opts, stream, isInQuote) {
	type(stream, Stream, isInQuote, Boolean)

	let indent = 0

	while (stream.hasNext()) {
		const st = singleToken()
		if (st === 'STOP')
			break
		else if (st instanceof Array)
			for (let i = 0; i < st.length; i = i + 1)
				yield st[i]
		else if (st.next)
			yield* st
		else
			yield st
	}

	function singleToken() {
		const startPos = stream.pos
		const span = () => Span({ start: startPos, end: stream.pos })
		const s = members => Object.assign(members, { span: span() })
		const keyword = k => Keyword(s({ k: k }))
		const gp = k => GroupPre(s({ k: k }))

		function eatNumber() {
			let msLit = _ + stream.takeWhile(/[0-9\.e_]/)
			if (msLit.endsWith(".")) {
				msLit = msLit.slice(0, msLit.length - 1)
				stream.stepBack()
			}
			const jsLit = msLit.replace(/_/g, "")
			check(!Number.isNaN(Number(jsLit)), stream.pos,
				"Invalid number literal " + code(msLit))
			return Literal(s({ value: jsLit, k: Number }))
		}

		const _ = stream.eat()
		switch (_) {
			case '0': case '1': case '2': case '3': case '4':
			case '5': case '6': case '7': case '8': case '9':
				return eatNumber()
			case '(': case '[': case '{': case ')': case ']':
				return gp(_)
			case '}':
				return isInQuote ? "STOP" : gp(_)
			case ' ':
				warnIf(opts, stream.peek() === ' ', span(), "Multiple spaces in a row")
				return gp("sp")
			case '.':
				if (stream.peek() === ' ' || stream.peek() === '\n')
					// Dict assign in its own spaced group
					return [ gp("sp"), keyword(". "), gp("sp") ]
				else
					return DotName(s({
						// +1 for the dot we just skipped.
						nDots: stream.takeWhile('.').length + 1,
						name: stream.takeWhile(isNameCharacter)}))
			case ':':
				return keyword(":")
			case '~':
				return stream.tryEat("|") ?
					// First arg in its own spaced group
					[ keyword("~|"), gp("sp") ] :
					keyword("~")
			case '|':
				// First arg in its own spaced group
				return [ keyword("|"), gp("sp") ]
			case '_':
				return keyword("_")
			case '\\':
				stream.takeUpTo('\n')
				return singleToken()
			case '\n': {
				check(!isInQuote, span(), "Quote interpolation cannot contain newline")
				check(stream.prev() !== ' ', span(), "Line ends in a space")
				// Skip any blank lines.
				stream.takeWhile('\n')
				const oldIndent = indent
				indent = stream.takeWhile('\t').length
				check(stream.peek() !== ' ', single(stream.pos), "Line begins in a space")
				if (indent <= oldIndent)
					return rcons(repeat(gp('<-'), oldIndent - indent), gp('ln'))
				else {
					check(indent === oldIndent + 1, span(), "Line is indented more than once")
					return gp('->')
				}
			}
			case '`': {
				const js = stream.takeUpTo(/[`\n]/)
				check(stream.eat() === "`", span(), "Unclosed " + code("`"))
				return Literal(s({ value: js, k: "js" }))
			}
			case '"':
				return lexQuote(opts, stream, indent)
			case '\t':
				fail(span(), "Tab may only be used to indent")
			case "-":
				if (/[0-9]/.test(stream.peek()))
					return eatNumber()
				// Else fallthrough
			default: {
				check(!ReservedCharacters.has(_), span(), "Reserved character '" + _ + "'")
				// All other characters should be handled in a case above.
				assert(isNameCharacter(_))
				const name = _ + stream.takeWhile(isNameCharacter)
				switch (name) {
					case "region":
						// Rest of line is a comment.
						stream.takeUpTo('\n')
						return keyword("region")
					default:
						if (stream.tryEat('_'))
							return CallOnFocus(s({ name: name }))
						else if (AllKeywords.has(name))
							return keyword(name)
						else if (ReservedWords.has(name))
							fail(span(), "Reserved word " + code(name))
						else
							return Name(s({ name: name }))
				}
			}
		}
	}
}

const lexQuote = function*(opts, stream, indent) {
	type(stream, Stream, indent, Number)

	const isIndented = stream.peek() === '\n'
	const quoteIndent = indent + 1

	let first = true
	let read = ""
	let startOfRead = stream.pos

	const yieldRead = function*() {
		if (read !== "") {
			yield Literal({
				span: Span({ start: startOfRead, end: stream.pos }),
				// Don't include leading newline of indented block
				value: first && isIndented ? read.slice(1) : read,
				k: String
			})
			first = false
		}
		read = ""
		startOfRead = stream.pos
	}

	yield GroupPre({ span: single(stream.pos), k: '"' })

	eatChars: while (true) {
		const restorePoint = stream.restorePoint()
		const ch = stream.eat()

		switch (ch) {
			case '\\': {
				const escaped = stream.eat()
				check(quoteEscape.has(escaped), stream.pos, () =>
					"No need to escape " + code(escaped))
				read = read + quoteEscape.get(escaped)
				break
			}
			case '{': {
				yield* yieldRead()
				// We can't just create a Group now because there may be other GroupPre_s inside.
				yield GroupPre({ span: single(stream.pos), k: "(" })
				yield* lexPlain(opts, stream, true)
				yield GroupPre({ span: single(stream.pos), k: ")" })
				break
			}
			case '\n': {
				// TODO: Make file cleansing its own step?
				check(stream.prev() !== ' ', stream.pos, "Line ends in a space")
				check(isIndented, restorePoint.pos, "Unclosed quote.")
				let newIndent = stream.takeWhile('\t').length

				let s = ""

				// Allow blank lines.
				if (newIndent === 0) {
					while (stream.tryEat('\n'))
						s = s + '\n'
					newIndent = stream.takeWhile('\t').length
				}

				if (newIndent < quoteIndent) {
					// Indented quote section is over.
					// Undo reading the tabs and newline.
					stream.restore(restorePoint)
					assert(stream.peek() === '\n')
					break eatChars
				}
				else
					read = read + s + '\n' + '\t'.repeat(newIndent - quoteIndent)
				break
			}
			case '"':
				if (!isIndented)
					break eatChars
				// Else fallthrough
			default:
				read = read + ch
		}
	}

	yield* yieldRead()
	yield GroupPre({ span: single(stream.pos), k: 'close"' })
}

const quoteEscape = new Map([['{', '{'], ['n', '\n'], ['t', '\t'], ['"', '"'], ["\\", "\\"]])

