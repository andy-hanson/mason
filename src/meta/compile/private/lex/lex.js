import { SubContext } from '../Cx'
import group from './group'
import Stream from './Stream'
import ungrouped from './ungrouped'


export default function lex(cx, str) {
	// Lexing algorithm requires trailing newline
	str = str + '\n'
	const lx = new SubContext(cx)
	const ug = ungrouped(lx, new Stream(str), false)
	return group(lx, ug)
}
