import { newSet } from './U/util'

export const isReservedName = name =>
	name === 'for' || name === 'return'

// TODO: Allow Opts to specify additional globals.
export const JsGlobals = newSet([
	'Array',
	'Boolean',
	'Date',
	'Error',
	'EvalError',
	'Function',
	'JSON',
	'Math',
	'Number',
	'Object',
	'Promise',
	'RangeError',
	'ReferenceError',
	'RegExp',
	'String',
	'Symbol',
	'SyntaxError',
	'TypeError',
	'URIError',
	'decodeURI',
	'decodeURIComponent',
	'encodeURI',
	'encodeURIComponent',
	'eval',
	'undefined',
	'Buffer',
	'clearInterval',
	'clearTimeout',
	'console',
	'global',
	'setInterval',
	'setTimeout'
])

// Anything not explicitly reserved is a valid name character.
// A `~` may appear in a name, but not at the beginning.
export const NonNameCharacters = '()[]{}.:|_ \n\t"`#;,'

export const defaultLoopName = 'anon-loop'
