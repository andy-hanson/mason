import Loc from 'esast/dist/Loc'
import tupl, { abstract } from 'tupl/dist/tupl'
import { code } from '../CompileError'
import { SV_False, SV_Null, SV_This, SV_ThisModuleDirectory, SV_True, SV_Undefined
	} from '../Expression'
import { implementMany } from './util'

const Token = abstract('Token', Object,
	'TODO:doc')
export default Token

const tt = (name, namesTypes, props) =>
	tupl(name, Token, 'doc', [ 'loc', Loc ].concat(namesTypes), { }, props)

// Don't use `0` because we want to use negative nmbers to represent GroupPre closers.
export const
	G_Paren = 1,
	G_Bracket = 2,
	G_Block = 3,
	G_Quote = 4,
	G_Line = 5,
	G_Space = 6

let nextId = 0
const nameToK = new Map()
const kToName = new Map()
const kw = name => {
	const k = kwNotName(name)
	nameToK.set(name, k)
	return k
}
const kwNotName = debugName => {
	const k = nextId
	kToName.set(k, debugName)
	nextId = nextId + 1
	return k
}

export const
	KW_Assign = kw('='),
	KW_AssignMutable = kw('::='),
	KW_AssignMutate = kw(':='),
	KW_BreakDo = kw('break!'),
	KW_Case = kw('case'),
	KW_CaseDo = kw('case!'),
	KW_Debug = kw('debug'),
	KW_Debugger = kw('debugger'),
	KW_Else = kw('else'),
	KW_False = kw('false'),
	KW_Focus = kwNotName('_'),
	KW_ForDo = kw('for!'),
	KW_Fun = kw('|'),
	KW_GenFun = kw('~|'),
	KW_IfDo = kw('if!'),
	KW_In = kw('in'),
	KW_Lazy = kwNotName('~'),
	KW_MapEntry = kw('->'),
	KW_Null = kw('null'),
	KW_ObjAssign = kw('. '),
	KW_Out = kw('out'),
	KW_Pass = kw('pass'),
	KW_Region = kw('region'),
	KW_This = kw('this'),
	KW_ThisModuleDirectory = kw('this-module-directory'),
	KW_True = kw('true'),
	KW_Type = kwNotName(':'),
	KW_Undefined = kw('undefined'),
	KW_UnlessDo = kw('unless!'),
	KW_Use = kw('use'),
	KW_UseDebug = kw('use-debug'),
	KW_UseDo = kw('use!'),
	KW_UseLazy = kw('use~'),
	KW_Yield = kw('<~'),
	KW_YieldTo = kw('<~~')

export const
	keywordKFromName = name => nameToK.get(name),
	opKWtoSV = kw => {
		switch (kw) {
			case KW_False: return SV_False
			case KW_Null: return SV_Null
			case KW_This: return SV_This
			case KW_ThisModuleDirectory: return SV_ThisModuleDirectory
			case KW_True: return SV_True
			case KW_Undefined: return SV_Undefined
			default: return null
		}
	}

export const
	CallOnFocus = tt('CallOnFocus', [ 'name', String ]),
	DotName = tt('DotName', [ 'nDots', Number, 'name', String ]),
	Group = tt('Group',
		[ 'tokens', [Token], 'kind', Number ]),
	Keyword = tt('Keyword', [ 'kind', Number ]),
	Name = tt('Name', [ 'name', String ]),
	TokenNumberLiteral = tt('TokenNumberLiteral', [ 'value', Number ])

export const
	isGroup = (groupKind, token) =>
		token instanceof Group && token.kind === groupKind,
	isKeyword = (keywordKind, token) =>
		token instanceof Keyword && token.kind === keywordKind

// toString is used by some parsing errors. Use U.inspect for a more detailed view.
implementMany({ CallOnFocus, DotName, Group, Keyword, Name, TokenNumberLiteral }, 'show', {
	CallOnFocus() { return `${this.name}_` },
	DotName() { return `${'.'.repeat(this.nDots)}${this.name}` },
	// TODO: better representation of k
	Group() { return `group(k=${this.kind})` },
	// TODO: better representation of k
	Keyword() { return code(kToName.get(this.kind)) },
	Name() { return this.name },
	TokenNumberLiteral() { return this.value }
})

//TODO:KILL
Keyword.prototype.toString = Keyword.prototype.show
