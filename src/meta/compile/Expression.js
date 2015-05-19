import Loc from 'esast/dist/Loc'
import tupl, { abstract } from 'tupl/dist/tupl'
import { Nullable, Union } from 'tupl/dist/type'
import { JsGlobals } from './private/language'

const Expression = abstract('Expression', Object, 'doc')
export default Expression

export const
	LineContent = abstract('ValOrDo', Expression, 'Valid part of a Block.'),
	Do = abstract('Do', LineContent, `
		These can only appear as lines in a Block.
		Not to be confused with Generator expressions resulting from \`do\` keyword.`),
	Val = abstract('Val', LineContent, 'These can appear in any expression.')

const makeType = superType => (name, doc, namesTypes, protoProps, tuplProps) =>
	// TODO: provide actual docs...
	tupl(name, superType, doc, [ 'loc', Loc ].concat(namesTypes), protoProps, tuplProps)
const
	ee = makeType(Expression), ed = makeType(Do), ev = makeType(Val)

export const
	LD_Const = 0,
	LD_Lazy = 1,
	LD_Mutable = 2,
	LocalDeclare = ee('LocalDeclare',
		'TODO:DOC',
		[
			'name', String,
			'opType', Nullable(Val),
			'kind', Number
		],
		{
			isLazy() { return this.kind === LD_Lazy },
			isMutable() { return this.kind === LD_Mutable }
		},
		{
			// Can't call this 'name' because LocalDeclare.name is 'LocalDeclare'
			declareName: loc =>
				LocalDeclare.plain(loc, 'name'),
			focus: loc =>
				LocalDeclare.plain(loc, '_'),
			noType: (loc, name, isLazy) =>
				LocalDeclare(loc, name, null, isLazy ? LD_Lazy : LD_Const),
			plain: (loc, name) =>
				LocalDeclare.noType(loc, name, false)
		}),
	LocalDeclareRes = makeType(LocalDeclare)('LocalDeclareRes',
		'TODO:DOC',
		[ 'opType', Nullable(Val) ],
		{
			name: 'res',
			kind: LD_Const
		}),

	Debug = ed('Debug',
		'TODO:DOC',
		[ 'lines', [LineContent] ]),

	Block = abstract('Block', Expression, 'TODO:DOC'),
	BlockDo = makeType(Block)('BlockDo',
		'TODO:DOC',
		[ 'lines', [LineContent] ]),
	BlockVal = abstract('BlockVal', Block, 'TODO:DOC'),
	BlockWithReturn = makeType(BlockVal)('BlockWithReturn',
		'TODO:DOC',
		[ 'lines', [LineContent], 'returned', Val ]),

	BlockObj = makeType(BlockVal)('BlockObj',
		'TODO:DOC',
		[
			'lines', [LineContent],
			'keys', [LocalDeclare],
			'opObjed', Nullable(Val),
			'opName', Nullable(String)
		]),

	BagEntry = ee('BagEntry',
		'TODO:DOC',
		[ 'value', Val ]),
	BlockBag = makeType(BlockVal)('BlockBag',
		'TODO:DOC',
		[ 'lines', [Union(LineContent, BagEntry)] ]),

	MapEntry = ee('MapEntry',
		'TODO:DOC',
		[ 'key', Val, 'val', Val ]),
	BlockMap = makeType(BlockVal)('BlockMap',
		'TODO:DOC',
		[ 'lines', [Union(LineContent, MapEntry)] ]),

	LocalAccess = ev('LocalAccess',
		'TODO:DOC',
		[ 'name', String ],
		{ },
		{ focus: loc => LocalAccess(loc, '_') }),
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
			'value', Val
		],
		{
			// All assignees must share the same kind.
			kind() { return this.assignees[0].kind }
		}),
	AssignMutate = ed('AssignMutate',
		'TODO:DOC',
		[
			'name', String,
			'value', Val
		]),
	GlobalAccess = ev('GlobalAccess',
		'TODO:DOC',
		[ 'name', JsGlobals ]),

	// Module
	UseDo = ee('UseDo',
		'TODO:DOC',
		[ 'path', String ]),
	Use = ee('Use',
		'TODO:DOC',
		[
			'path', String,
			'used', [LocalDeclare],
			'opUseDefault', Nullable(LocalDeclare)
		]),
	Module = ee('Module',
		'TODO:DOC',
		[
			'doUses', [UseDo],
			'uses', [Use],
			'debugUses', [Use],
			'lines', [Do],
			'exports', [LocalDeclare],
			'opDefaultExport', Nullable(Val)
		]),

	// Data
	BagSimple = ev('ListSimple',
		'TODO:DOC',
		[ 'parts', [Val] ]),
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
			'opCased', Nullable(Assign),
			'parts', [CaseDoPart],
			'opElse', Nullable(BlockDo)
		]),
	// Unlike CaseDo, this has `return` statements.
	CaseVal = ev('CaseVal',
		'TODO:DOC',
		[
			'opCased', Nullable(Assign),
			'parts', [CaseValPart],
			'opElse', Nullable(BlockVal)
		]),

	// Statements
	Loop = ed('Loop',
		'TODO:DOC',
		[ 'block', BlockDo ]),
	EndLoop = ed('EndLoop',
		'TODO:DOC',
		[ ]),
	IfDo = ed('IfDo',
		'TODO:DOC',
		[ 'test', Val, 'result', BlockDo ]),
	UnlessDo = ed('UnlessDo',
		'TODO:DOC',
		[ 'test', Val, 'result', BlockDo ]),

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
				Call(loc, SpecialVal(loc, SV_Contains), [ testType, tested ]),
			sub: (loc, args) => Call(loc, SpecialVal(loc, SV_Sub), args)
		}),
	BlockWrap = ev('BlockWrap',
		'TODO:DOC',
		[ 'block', BlockVal ]),

	Fun = ev('Fun',
		'TODO:DOC',
		[
			'isGenerator', Boolean,
			'args', [LocalDeclare],
			'opRestArg', Nullable(LocalDeclare),
			'block', Block,
			'opIn', Nullable(Debug),
			// If non-empty, block should be a BlockVal,
			// and either it has a type or opOut is non-empty.
			'opResDeclare', Nullable(LocalDeclareRes),
			'opOut', Nullable(Debug),
			'name', Nullable(String)
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

	SD_Debugger = 0,
	SpecialDo = ed('SpecialDo',
		'TODO:DOC',
		[ 'kind', Number ]),

	SV_Contains = 0,
	SV_False = 1,
	SV_Null = 2,
	SV_Sub = 3,
	SV_This = 4,
	SV_ThisModuleDirectory = 5,
	SV_True = 6,
	SV_Undefined = 7,
	// k is a SP_***
	SpecialVal = ev('Special',
		'TODO:DOC',
		[ 'kind', Number ])
