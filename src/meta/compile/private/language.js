import { newSet } from './util'

// TODO: Allow Opts to specify additional globals.
export const JsGlobals = newSet([
	'Array',
	'Boolean',
	'Buffer',
	'Date',
	'Error',
	'EvalError',
	'Function',
	'global',
	'JSON',
	'Math',
	'Number',
	'Object',
	'RangeError',
	'ReferenceError',
	'RegExp',
	'String',
	'Symbol',
	'SyntaxError',
	'TypeError',
	'URIError'
	// 'Set' and 'Map' conflict with mason's versions.
	// 'Promise': Use '$' instead.
	// For following, just use `global.xxx`.
	// 'clearInterval', 'clearTimeout', 'console', 'decodeURI', 'decodeURIComponent',
	// 'encodeURI', 'encodeURIComponent', 'eval', 'setInterval', 'setTimeout'
])

// Anything not explicitly reserved is a valid name character.
// A `~` may appear in a name, but not at the beginning.
const ReservedCharacters = '`#%^&\\;,'
export const NonNameCharacters = '()[]{}.:|_ \n\t"' + ReservedCharacters

export const defaultLoopName = 'anon-loop'
