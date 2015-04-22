import { code } from '../../CompileError'
import { NonNameCharacters, ReservedCharacters } from '../Lang'


export const
	showChar = ch => code(String.fromCharCode(ch))

const cc = ch => ch.charCodeAt(0)
export const
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
	Hyphen = cc('-'),
	LetterN = cc('n'),
	LetterT = cc('t')

const
	charPred = (chars, reverse) => {
		let src = 'switch(ch) {\n'
		for (let i = 0; i < chars.length; i = i + 1)
			src = `${src}case ${chars.charCodeAt(i)}: `
		const res = !reverse
		src = `${src} return ${res}\ndefault: return ${!res}\n}`
		return Function('ch', src)
	}
export const
	isDigit = charPred('0123456789'),
	isNameCharacter = charPred(NonNameCharacters, true),
	isNumberCharacter = charPred('0123456789.e'),
	isReservedCharacter = charPred(ReservedCharacters)
