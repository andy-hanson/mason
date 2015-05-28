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
		}),
	LocalDeclareUntyped = makeType(LocalDeclare)('LocalDeclareUntyped',
		'TODO:DOC',
		[ 'name', String, 'kind', Number ],
		{ opType: null }),
	LocalDeclarePlain = makeType(LocalDeclareUntyped)('LocalDeclarePlain',
		'TODO:DOC',
		[ 'name', String ],
		{ kind: LD_Const })

const localDeclarePlainType = name =>
	makeType(LocalDeclarePlain)(`LocalDeclare_${name}`,
		'TODO:DOC',
		[ ],
		{ name })

export const
	LocalDeclareBuilt = localDeclarePlainType('built'),
	LocalDeclareFocus = localDeclarePlainType('_'),
	LocalDeclareName = localDeclarePlainType('name'),
	LocalDeclareRes = makeType(LocalDeclare)('LocalDeclareRes',
		'TODO:DOC',
		[ 'opType', Nullable(Val) ],
		{
			name: 'res',
			kind: LD_Const
		}),

	// All have .allAssignees()
	Assign = abstract('Assign', Do, 'TODO:DOC'),
	AssignSingle = makeType(Assign)('AssignSingle',
		'TODO:DOC',
		[
			'assignee', LocalDeclare,
			'value', Val
		],
		{
			allAssignees() { return [ this.assignee ] }
		},
		{
			focus: (loc, value) =>
				AssignSingle(loc, LocalDeclareFocus(loc), value)
		}),
	AssignDestructure = makeType(Assign)('AssignDestructure',
		'TODO:DOC',
		[
			'assignees', [LocalDeclare],
			'value', Val
		],
		{
			allAssignees() { return this.assignees },
			// All assignees must share the same kind.
			kind() { return this.assignees[0].kind }
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

	ObjEntry = m('ObjEntry',
		'TODO:DOC',
		[ 'assign', Assign ]),

	// TODO: BlockBag, BlockMap, BlockObj => BlockBuild(kind, ...)
	BlockObj = makeType(BlockVal)('BlockObj',
		'TODO:DOC',
		[
			'built', LocalDeclareBuilt,
			'lines', [LineContent],
			'opObjed', Nullable(Val),
			'opName', Nullable(String)
		],
		{ },
		{
			of: (loc, lines, opObjed, opName) =>
				BlockObj(loc, LocalDeclareBuilt(loc), lines, opObjed, opName)
		}),

	BagEntry = m('BagEntry',
		'TODO:DOC',
		[ 'value', Val ]),
	BlockBag = makeType(BlockVal)('BlockBag',
		'TODO:DOC',
		[ 'built', LocalDeclareBuilt, 'lines', [Union(LineContent, BagEntry)] ],
		{ },
		{ of: (loc, lines) => BlockBag(loc, LocalDeclareBuilt(loc), lines) }),

	MapEntry = m('MapEntry',
		'TODO:DOC',
		[ 'key', Val, 'val', Val ]),
	BlockMap = makeType(BlockVal)('BlockMap',
		'TODO:DOC',
		[ 'built', LocalDeclareBuilt, 'lines', [Union(LineContent, MapEntry)] ],
		{ },
		{ of: (loc, lines) => BlockMap(loc, LocalDeclareBuilt(loc), lines) }),

	LocalAccess = v('LocalAccess',
		'TODO:DOC',
		[ 'name', String ],
		{ },
		{ focus: loc => LocalAccess(loc, '_') }),
	GlobalAccess = v('GlobalAccess',
		'TODO:DOC',
		[ 'name', JsGlobals ]),

	LocalMutate = d('LocalMutate',
		'TODO:DOC',
		[
			'name', String,
			'value', Val
		]),

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
	BagSimple = v('BagSimple',
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
			'opCased', Nullable(AssignSingle),
			'parts', [CaseDoPart],
			'opElse', Nullable(BlockDo)
		]),
	// Unlike CaseDo, this has `return` statements.
	CaseVal = v('CaseVal',
		'TODO:DOC',
		[
			'opCased', Nullable(AssignSingle),
			'parts', [CaseValPart],
			'opElse', Nullable(BlockVal)
		]),

	Iteratee = m('Iteratee',
		'TODO:DOC',
		[
			'element', LocalDeclare,
			'bag', Val
		]),


	ForDo = d('ForDo',
		'TODO:DOC',
		[ 'opIteratee', Nullable(Iteratee), 'block', BlockDo ]),
	ForVal = v('ForVal',
		'TODO:DOC',
		[ 'opIteratee', Nullable(Iteratee), 'block', BlockDo ]),
	ForBag = v('ForBag',
		'TODO:DOC',
		[ 'built', LocalDeclareBuilt, 'opIteratee', Nullable(Iteratee), 'block', BlockDo ],
		{ },
		{
			of: (loc, opIteratee, block) => ForBag(loc, LocalDeclareBuilt(loc), opIteratee, block)
		}),

	BreakDo = d('BreakDo',
		'TODO:DOC',
		[ ]),
	BreakVal = d('BreakVal',
		'TODO:DOC',
		[ 'value', Val ]),
	Continue = d('Continue',
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
	SpecialVal = v('SpecialVal',
		'TODO:DOC',
		[ 'kind', Number ])
