import { SubContext } from '../Cx'
import group from './group'
import ungrouped from './ungrouped'


export default function lex(cx, str) {
	// Lexing algorithm requires trailing newline
	str = str + '\n'
	const lx = new SubContext(cx)
	const ug = ungrouped(lx, str)
	return group(lx, ug)
}
