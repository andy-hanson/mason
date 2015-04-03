import { setUnion } from './U'

const g = [ '<~', '<~~' ]
export const GeneratorKeywords = new Set(g)
export const AssignKeywords = new Set(['=', '. '].concat(g))

export const LineSplitKeywords = setUnion(AssignKeywords, new Set(['->']))

// `export` is not a keyword, but `. ` assigns in module context become exports.
export const KAssign = setUnion(AssignKeywords, new Set(['export']))
export const KFun = new Set(['|', '~|'])
export const CaseKeywords = new Set(['case', 'case!'])
export const SpecialKeywords = new Set([ 'this', 'this-module-directory' ])
export const UseKeywords = new Set([ 'use!', 'use', 'use~', 'use-debug' ])

export const AllKeywords = setUnion(
	LineSplitKeywords, KFun, CaseKeywords, SpecialKeywords, UseKeywords, new Set([
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
]))

export const ReservedWords = new Set([ 'for', 'return' ])

export const GroupKinds = new Set(['(', '[', '{', '->', 'ln', 'sp', '"'])
export const GroupPres = setUnion(GroupKinds, new Set([')', ']', '}', '<-', 'close"']))

export const ReservedCharacters = new Set('`;,%^&\\')

export const GroupOpenToClose = new Map([
	['(', ')'],
	['[', ']'],
	['{', '}'],
	['->', '<-'],
	['ln', 'ln'],
	['sp', 'sp'],
	['"', 'close"']])

// TODO: Allow Opts to specify additional globals.
export const JsGlobals = new Set([
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
export const isNameCharacter = (ch) => /[^()[\]{}\.:|_\s\"`#;,]/.test(ch)

export const defaultLoopName = 'anon-loop'

export const fileExtension = '.ms'
