"use strict"

const
	assert = require("assert"),
	check = require("../check"),
	GroupPre = require("./GroupPre"),
	Lang = require("../Lang"),
	Span = require("../Span"),
	Stream = require("./Stream"),
	Sq = require("../U/Sq"),
	T = require("../T"),
	type = require("../U/type"),
	U = require("../U")

const lexPlain = module.exports = function* lexPlain(opts, stream, isInQuote) {
	type(stream, Stream, isInQuote, Boolean)

	let indent = 0
	const singleToken = function(stream) {
		const startPos = stream.pos
		const span = function() { return Span({ start: startPos, end: stream.pos }) }
		const s = function(members) { return Object.assign(members, { span: span() }) }
		const keyword = function(k) { return T.Keyword(s({ k: k })) }
		const gp = function(k) { return GroupPre(s({ k: k })) }

		const eatNumber = function() {
			let msLit = _ + stream.takeWhile(/[0-9\.e_]/)
			if (msLit.endsWith(".")) {
				msLit = msLit.slice(0, msLit.length - 1)
				stream.stepBack()
			}
			const jsLit = msLit.replace(/_/g, "")
			check(!Number.isNaN(Number(jsLit)), stream.pos, "Invalid number literal "+U.code(msLit))
			return T.Literal(s({ value: jsLit, k: Number }))
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
				check.warnIf(opts, stream.peek() === ' ', span(), "Multiple spaces in a row")
				return gp("sp")
			case '.':
				if (stream.peek() === ' ' || stream.peek() === '\n')
					return [ gp("sp"), keyword(". "), gp("sp") ] // Dict assign in its own spaced group
				else
					return T.DotName(s({
						nDots: stream.takeWhile('.').length + 1, // +1 for the dot we just skipped.
						name: stream.takeWhile(Lang.isNameCharacter)}))
			case ':':
				return keyword(":")
			case '~':
				return stream.tryEat("|") ?
					[ keyword("~|"), gp("sp") ] : // First arg in its own spaced group
					keyword("~")
			case '|':
				return [ keyword("|"), gp("sp") ] // First arg in its own spaced group
			case '_':
				return keyword("_")
			case '\\':
				stream.takeUpTo('\n')
				return singleToken(stream)
			case '\n': {
				check(!isInQuote, span(), "Quote interpolation cannot contain newline")
				check(stream.prev() != ' ', span(), "Line ends in a space")
				stream.takeWhile('\n') // Skip any blank lines
				const oldIndent = indent
				indent = stream.takeWhile('\t').length
				check(stream.peek() != ' ', Span.single(stream.pos), "Line begins in a space")
				if (indent <= oldIndent)
					return Sq.rcons(Sq.repeat(gp('<-'), oldIndent - indent), gp('ln'))
				else {
					check(indent === oldIndent + 1, span(), "Line is indented more than once")
					return gp('->')
				}
			}
			case '`': {
				const js = stream.takeUpTo(/[`\n]/)
				check(stream.eat() == "`", span(), "Unclosed " + U.code("`"))
				return T.Literal(s({ value: js, k: "js" }))
			}
			case '"':
				return lexQuote(opts, stream, indent)
			case '\t':
				check.fail(span(), "Tab may only be used to indent")
			case "-":
				if (/[0-9]/.test(stream.peek()))
					return eatNumber()
				// Else fallthrough
			default: {
				check(!Lang.ReservedCharacters.has(_), span(), "Reserved character '" + _ + "'")
				// All other characters should be handled in a case above.
				assert(Lang.isNameCharacter(_))
				const name = _ + stream.takeWhile(Lang.isNameCharacter)
				switch (name) {
					case "region":
						stream.takeUpTo('\n') // Rest of line is a comment
						return keyword("region")
					default:
						if (stream.tryEat('_'))
							return T.CallOnFocus(s({ name: name }))
						else if (Lang.AllKeywords.has(name))
							return keyword(name)
						else if (Lang.ReservedWords.has(name))
							check.fail(span(), "Reserved word "+U.code(name))
						else
							return T.Name(s({ name: name }))
				}
			}
		}
	}

	while (stream.hasNext()) {
		const st = singleToken(stream)
		if (st === 'STOP')
			break
		else if (st instanceof Array)
			for (let i = 0; i < st.length; i++)
				yield st[i]
		else if (st.next)
			yield* st
		else
			yield st
	}
}

const lexQuote = function*(opts, stream, indent) {
	type(stream, Stream, indent, Number)

	const startPos = stream.pos
	const isIndented = stream.peek() === '\n'
	const quoteIndent = indent + 1

	let first = true
	let read = ""
	let startOfRead = stream.pos

	const yieldRead = function*() {
		if (read !== "") {
			yield T.Literal({
				span: Span({ start: startOfRead, end: stream.pos }),
				// Don't include leading newline of indented block
				value: (first && isIndented) ? read.slice(1) : read,
				k: String
			})
			first = false
		}
		read = ""
		startOfRead = stream.pos
	}

	yield GroupPre({ span: Span.single(stream.pos), k: '"' })

	eatChars: while (true) {
		const restorePoint = stream.restorePoint()
		const ch = stream.eat()

		switch (ch) {
			case '\\': {
				const escaped = stream.eat()
				check(quoteEscape.has(escaped), stream.pos, function() {
					return "No need to escape " + U.code(escaped)
				})
				read += quoteEscape.get(escaped)
				break
			}
			case '{': {
				yield* yieldRead()
				const start = stream.pos
				// We can't just create a T.Group now because there may be other GroupPre_s inside.
				yield GroupPre({ span: Span.single(stream.pos), k: "(" })
				yield* lexPlain(opts, stream, true)
				yield GroupPre({ span: Span.single(stream.pos), k: ")" })
				break
			}
			case '\n': {
				// TODO: Make file cleansing its own step?
				check(stream.prev() != ' ', stream.pos, "Line ends in a space")
				check(isIndented, restorePoint.pos, "Unclosed quote.")
				let newIndent = stream.takeWhile('\t').length

				let s = ""

				// Allow blank lines.
				if (newIndent === 0) {
					while (stream.tryEat('\n'))
						s += '\n'
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
					read += s + '\n' + '\t'.repeat(newIndent - quoteIndent)
				break
			}
			case '"':
				if (!isIndented)
					break eatChars
				// Else fallthrough
			default:
				read += ch
		}
	}

	yield* yieldRead()
	yield GroupPre({ span: Span.single(stream.pos), k: 'close"' })
}

const quoteEscape = new Map([['{', '{'], ['n', '\n'], ['t', '\t'], ['"', '"'], ["\\", "\\"]])

