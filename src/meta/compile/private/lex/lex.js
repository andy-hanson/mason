import { SubContext } from '../Cx'
import type from '../U/type'
import group from './group'
import Stream from './Stream'
import ungrouped from './ungrouped'

function eager(gen) {
	const arr = []
	for (let em of gen)
		arr.push(em)
	return arr[Symbol.iterator]()
}

export default function lex(cx, str) {
	// Lexing algorithm requires trailing newline
	str = str + '\n'
	const lx = new SubContext(cx)
	let ug = ungrouped(lx, new Stream(str), false)
	if (global.LOG_TIME) {
		console.time('ungrouped')
		ug = eager(ug)
		console.timeEnd('ungrouped')
	}
	if (global.LOG_TIME) console.time('group')
	const g = group(lx, ug)
	if (global.LOG_TIME) console.timeEnd('group')
	return g
}
