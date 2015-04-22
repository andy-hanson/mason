import group from './group'
import ungrouped from './ungrouped'

export default function lex(cx, str) {
	// Lexing algorithm requires trailing newline
	str = str + '\n'
	const ug = ungrouped(cx, str)
	return group(cx, ug)
}
