import Loc from 'esast/dist/Loc'
import tupl, { abstract } from 'tupl/dist/tupl'
import { Nullable, Union } from 'tupl/dist/type'
import { JsGlobals } from './private/language'

const MsAst = abstract('MsAst', Object, 'doc')
export default MsAst

export const
	LineContent = abstract('ValOrDo', MsAst, 'Valid part of a Block.'),
	Do = abstract('Do', LineContent, `
		These can only appear as lines in a Block.
		Not to be confused with Generator expressions resulting from \`do\` keyword.`),
	Val = abstract('Val', LineContent, 'These can appear in any expression.')

const makeType = superType => (name, doc, namesTypes, protoProps, tuplProps) =>
	// TODO: provide actual docs...
	tupl(name, superType, doc, [ 'loc', Loc ].concat(namesTypes), protoProps, tuplProps)
const
	m = makeType(MsAst), d = makeType(Do), v = makeType(Val)

export const
	LD_Const = 0,
	LD_Lazy = 1,
	LD_Mutable = 2,
	LocalDeclare = m('LocalDeclare',
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

	Debug = d('Debug',
		'TODO:DOC',
		[ 'lines', [LineContent] ]),

	Block = abstract('Block', MsAst, 'TODO:DOC'),
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

	BagEntry = m('BagEntry',
		'TODO:DOC',
		[ 'value', Val ]),
	BlockBag = makeType(BlockVal)('BlockBag',
		'TODO:DOC',
		[ 'lines', [Union(LineContent, BagEntry)] ]),

	MapEntry = m('MapEntry',
		'TODO:DOC',
		[ 'key', Val, 'val', Val ]),
	BlockMap = makeType(BlockVal)('BlockMap',
		'TODO:DOC',
		[ 'lines', [Union(LineContent, MapEntry)] ]),

	LocalAccess = v('LocalAccess',
		'TODO:DOC',
		[ 'name', String ],
		{ },
		{ focus: loc => LocalAccess(loc, '_') }),
	Assign = d('Assign',
		'TODO:DOC',
		[
			'assignee', LocalDeclare,
			'value', Val
		],
		{ },
		{ focus: (loc, value) => Assign(loc, LocalDeclare.focus(loc), value) }),
	AssignDestructure = d('AssignDestructure',
		'TODO:DOC',
		[
			'assignees', [LocalDeclare],
			'value', Val
		],
		{
			// All assignees must share the same kind.
			kind() { return this.assignees[0].kind }
		}),
	AssignMutate = d('AssignMutate',
		'TODO:DOC',
		[
			'name', String,
			'value', Val
		]),
	GlobalAccess = v('GlobalAccess',
		'TODO:DOC',
		[ 'name', JsGlobals ]),

	// Module
	UseDo = m('UseDo',
		'TODO:DOC',
		[ 'path', String ]),
	Use = m('Use',
		'TODO:DOC',
		[
			'path', String,
			'used', [LocalDeclare],
			'opUseDefault', Nullable(LocalDeclare)
		]),
	Module = m('Module',
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
	BagSimple = v('ListSimple',
		'TODO:DOC',
		[ 'parts', [Val] ]),
	ObjPair = m('ObjPair',
		'TODO:DOC',
		[
			'key', String,
			'value', Val
		]),
	// Verifier checks that no two pairs may have the same key.
	ObjSimple = v('ObjSimple',
		'TODO:DOC',
		[ 'pairs', [ObjPair] ]),

	// Case
	Pattern = m('Pattern',
		'TODO:DOC',
		[
			'type', Val,
			'locals', [LocalDeclare],
			'patterned', LocalAccess
		]),
	CaseDoPart = m('CaseDoPart',
		'TODO:DOC',
		[
			'test', Union(Val, Pattern),
			'result', BlockDo
		]),
	CaseValPart = m('CaseValPart',
		'TODO:DOC',
		[
			'test', Union(Val, Pattern),
			'result', BlockVal
		]),
	CaseDo = d('CaseDo',
		'TODO:DOC',
		[
			'opCased', Nullable(Assign),
			'parts', [CaseDoPart],
			'opElse', Nullable(BlockDo)
		]),
	// Unlike CaseDo, this has `return` statements.
	CaseVal = v('CaseVal',
		'TODO:DOC',
		[
			'opCased', Nullable(Assign),
			'parts', [CaseValPart],
			'opElse', Nullable(BlockVal)
		]),

	// Loops
	ForDoPlain = d('ForDoPlain',
		'TODO:DOC',
		[ 'block', BlockDo ]),
	ForDoWithBag = d('ForDoWithBag',
		'TODO:DOC',
		[ 'element', LocalDeclare, 'bag', Val, 'block', BlockDo ]),
	BreakDo = d('BreakDo',
		'TODO:DOC',
		[ ]),

	// Other statements
	IfDo = d('IfDo',
		'TODO:DOC',
		[ 'test', Val, 'result', BlockDo ]),
	UnlessDo = d('UnlessDo',
		'TODO:DOC',
		[ 'test', Val, 'result', BlockDo ]),

	// Generators
	Yield = v('Yield',
		'TODO:DOC',
		[ 'yielded', Val ]),
	YieldTo = v('YieldTo',
		'TODO:DOC',
		[ 'yieldedTo', Val ]),

	// Expressions
	Splat = m('Splat',
		'TODO:DOC',
		[ 'splatted', Val ]),
	Call = v('Call',
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
	BlockWrap = v('BlockWrap',
		'TODO:DOC',
		[ 'block', BlockVal ]),

	Fun = v('Fun',
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

	Lazy = v('Lazy',
		'TODO:DOC',
		[ 'value', Val ]),
	NumberLiteral = v('NumberLiteral',
		'TODO:DOC',
		[ 'value', Number ]),
	Member = v('Member',
		'TODO:DOC',
		[
			'object', Val,
			'name', String
		]),
	// parts are Strings interleaved with Vals.
	Quote = v('Quote',
		'TODO:DOC',
		[ 'parts', [Object] ],
		{ },
		{
			forString: (loc, str) => Quote(loc, [ str ])
		}),

	SD_Debugger = 0,
	SpecialDo = d('SpecialDo',
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
	SpecialVal = v('Special',
		'TODO:DOC',
		[ 'kind', Number ])
