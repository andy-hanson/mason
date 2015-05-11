import { code } from '../../CompileError'
import { NonNameCharacters } from '../Lang'

export const
	showChar = ch => code(String.fromCharCode(ch))

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
	isNumberCharacter = charPred('0123456789.e')
