import Loc from 'esast/dist/Loc'
import tupl, { abstract } from 'tupl/dist/tupl'
import { Union } from 'tupl/dist/type'
import { JsGlobals } from './private/Lang'
import Op, { None } from './private/U/Op'

const Expression = abstract('Expression', Object, 'doc')
export default Expression

export const
	Do = abstract('Do', Expression, `
		These can only appear as lines in a Block.
		Not to be confused with Generator expressions resulting from \`do\` keyword.`),
	Val = abstract('Val', Expression, 'These can appear in any expression.')

const makeType = superType => (name, doc, namesTypes, protoProps, tuplProps) =>
	// TODO: provide actual docs...
	tupl(name, superType, 'doc', [ 'loc', Loc ].concat(namesTypes), protoProps, tuplProps)
const
	ee = makeType(Expression), ed = makeType(Do), ev = makeType(Val)

export const
	Debug = ed('Debug',
		'TODO:DOC',
		[ 'lines', [Expression] ]),
	BlockDo = ed('BlockDo',
		'TODO:DOC',
		[ 'lines', [Expression] ]),
	BlockVal = ed('BlockVal',
		'TODO:DOC',
		[ 'lines', [Expression], 'returned', Val ]),
	ModuleDefaultExport = ed('ModuleDefaultExport',
		'TODO:DOC',
		[ 'value', Val ]),
	LocalDeclare = ee('LocalDeclare',
		'TODO:DOC',
		[
			'name', String,
			'opType', Op(Val),
			'isLazy', Boolean
		],
		{ },
		{
			displayName: loc => LocalDeclare.plain(loc, 'displayName'),
			focus: loc => LocalDeclare.plain(loc, '_'),
			plain: (loc, name) => LocalDeclare(loc, name, None, false)
		}),
	LocalDeclareRes = makeType(LocalDeclare)('LocalDeclareRes',
		'TODO:DOC',
		[ 'opType', Op(Val) ],
		{
			name: 'res',
			isLazy: false
		}),
	Assign = ed('Assign',
		'TODO:DOC',
		[
			'assignee', LocalDeclare,
			'value', Val
		],
		{ },
		{ focus: (loc, value) => Assign(loc, LocalDeclare.focus(loc), value) }),
	AssignDestructure = ed('AssignDestructure',
		'TODO:DOC',
		[
			'assignees', [LocalDeclare],
			'value', Val,
			'isLazy', Boolean
		]),
	LocalAccess = ev('LocalAccess',
		'TODO:DOC',
		[ 'name', String ],
		{ },
		{ focus: loc => LocalAccess(loc, '_') }),
	GlobalAccess = ev('GlobalAccess',
		'TODO:DOC',
		[ 'name', JsGlobals ],
		{ },
		{
			null: loc => GlobalAccess(loc, 'null'),
			true: loc => GlobalAccess(loc, 'true')
		}),
	// Module
	UseDo = ee('UseDo',
		'TODO:DOC',
		[ 'path', String ]),
	Use = ee('Use',
		'TODO:DOC',
		[
			'path', String,
			'used', [LocalDeclare],
			'opUseDefault', Op(LocalDeclare)
		]),
	Module = ee('Module',
		'TODO:DOC',
		[
			'doUses', [UseDo],
			'uses', [Use],
			'debugUses', [Use],
			'lines', [Do],
			'exports', [LocalDeclare],
			'opDefaultExport', Val
		]),

	// Data
	ListEntry = ed('ListEntry',
		'TODO:DOC',
		[ 'value', Val ]),
	ListReturn = ev('ListReturn',
		'TODO:DOC',
		[ ]),
	ListSimple = ev('ListSimple',
		'TODO:DOC',
		[ 'parts', [Val] ]),

	MapEntry = ed('MapEntry',
		'TODO:DOC',
		[ 'key', Val, 'val', Val ]),
	MapReturn = ev('MapReturn',
		'TODO:DOC',
		[ ]),

	ObjReturn = ev('ObjReturn',
		'TODO:DOC',
		[
			'keys', [LocalDeclare],
			'opObjed', Op(Val),
			'opDisplayName', Op(String)
		]),
	ObjPair = ee('ObjPair',
		'TODO:DOC',
		[
			'key', String,
			'value', Val
		]),
	// Verifier checks that no two pairs may have the same key.
	ObjSimple = ev('ObjSimple',
		'TODO:DOC',
		[ 'pairs', [ObjPair] ]),

	// Case
	Pattern = ee('Pattern',
		'TODO:DOC',
		[
			'type', Val,
			'locals', [LocalDeclare],
			'patterned', LocalAccess
		]),
	CaseDoPart = ee('CaseDoPart',
		'TODO:DOC',
		[
			'test', Union(Val, Pattern),
			'result', BlockDo
		]),
	CaseValPart = ee('CaseValPart',
		'TODO:DOC',
		[
			'test', Union(Val, Pattern),
			'result', BlockVal
		]),
	CaseDo = ed('CaseDo',
		'TODO:DOC',
		[
			'opCased', Op(Assign),
			'parts', [CaseDoPart],
			'opElse', Op(BlockDo)
		]),
	// Unlike CaseDo, this has `return` statements.
	CaseVal = ev('CaseVal',
		'TODO:DOC',
		[
			'opCased', Op(Assign),
			'parts', [CaseValPart],
			'opElse', Op(BlockVal)
		]),

	// Statements
	Loop = ed('Loop',
		'TODO:DOC',
		[ 'block', BlockDo ]),
	EndLoop = ed('EndLoop',
		'TODO:DOC',
		[ ]),

	// Generators
	Yield = ev('Yield',
		'TODO:DOC',
		[ 'yielded', Val ]),
	YieldTo = ev('YieldTo',
		'TODO:DOC',
		[ 'yieldedTo', Val ]),

	// Expressions
	Splat = ee('Splat',
		'TODO:DOC',
		[ 'splatted', Val ]),
	Call = ev('Call',
		'TODO:DOC',
		[
			'called', Val,
			'args', [Union(Val, Splat)]
		],
		{ },
		{
			contains: (loc, testType, tested) =>
				Call(loc, Special.contains(loc), [ testType, tested ]),
			sub: (loc, args) => Call(loc, Special.sub(loc), args)
		}),
	BlockWrap = ev('BlockWrap',
		'TODO:DOC',
		[ 'block', BlockVal ]),

	Fun = ev('Fun',
		'TODO:DOC',
		[
			'isGenerator', Boolean,
			'args', [LocalDeclare],
			'opRestArg', Op(LocalDeclare),
			// BlockDo or BlockVal
			'block', Expression,
			'opIn', Op(Debug),
			// If non-empty, block should be a BlockVal,
			// and either it has a type or opOut is non-empty.
			'opResDeclare', Op(LocalDeclareRes),
			'opOut', Op(Debug)
		]),

	Lazy = ev('Lazy',
		'TODO:DOC',
		[ 'value', Val ]),
	NumberLiteral = ev('NumberLiteral',
		'TODO:DOC',
		[ 'value', Number ]),
	Member = ev('Member',
		'TODO:DOC',
		[
			'object', Val,
			'name', String
		]),
	// parts are Strings interleaved with Vals.
	Quote = ev('Quote',
		'TODO:DOC',
		[ 'parts', [Object] ],
		{ },
		{
			forString: (loc, str) => Quote(loc, [ str ])
		}),

	SP_Contains = 0,
	SP_Debugger = 1,
	SP_Sub = 2,
	SP_This = 3,
	SP_ThisModuleDirectory = 4,
	SP_False = 5,
	SP_True = 6,
	// k is a SP_***
	Special = ev('Special',
		'TODO:DOC',
		[ 'kind', Number ],
		{ },
		{
			contains: loc => Special(loc, SP_Contains),
			debugger: loc => Special(loc, SP_Debugger),
			sub: loc => Special(loc, SP_Sub)
		})
