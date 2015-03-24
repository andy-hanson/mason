import Opts from '../Opts'
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

export default function lex(str, opts) {
	type(str, String, opts, Opts)
	// Lexing algorithm requires trailing newline
	str = str + '\n'
	let ug = ungrouped(opts, new Stream(str), false)
	if (global.LOG_TIME) {
		console.time('ungrouped')
		ug = eager(ug)
		console.timeEnd('ungrouped')
	}
	if (global.LOG_TIME) console.time('group')
	const g = group(ug, opts)
	if (global.LOG_TIME) console.timeEnd('group')
	return g
}
