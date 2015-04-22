import { newSet, newMap } from './U/util'

const g = [ '<~', '<~~' ]
export const GeneratorKeywords = newSet(g)
export const AssignKeywords = newSet([ '=', '. ' ].concat(g))

export const LineSplitKeywords = newSet(AssignKeywords, [ '->' ])

// `export` is not a keyword, but `. ` assigns in module context become exports.
export const KAssign = newSet(AssignKeywords, [ 'export' ])
export const KFun = newSet([ '|', '~|' ])
export const CaseKeywords = newSet([ 'case', 'case!' ])
export const SpecialKeywords = newSet([ 'this', 'this-module-directory' ])
export const UseKeywords = newSet([ 'use!', 'use', 'use~', 'use-debug' ])

export const AllKeywords = newSet(
	LineSplitKeywords, KFun, CaseKeywords, SpecialKeywords, UseKeywords, [
	'~',
	':',
	'_',
	'debug',
	'debugger',
	'else',
	'end-loop!',
	'in',
	'loop!',
	'out',
	'region'
])

export const ReservedWords = newSet([ 'for', 'return' ])

export const GroupKinds = newSet(['(', '[', '{', '->', 'ln', 'sp', '"'])

export const GroupOpenToClose = newMap([
	['(', ')'],
	['[', ']'],
	['{', '}'],
	['->', '<-'],
	['ln', 'ln'],
	['sp', 'sp'],
	['"', 'close"']])

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
	'setTimeout',
	// Not really globals, but it works out that way.
	'false', 'true', 'null'
])

// Anything not explicitly reserved is a valid name character.
// A `~` may appear in a name, but not at the beginning.
export const NonNameCharacters = '()[]{}.:|_ \n\t"`#;,'
export const ReservedCharacters = '`;,%^&\\'

export const defaultLoopName = 'anon-loop'

export const fileExtension = '.ms'
