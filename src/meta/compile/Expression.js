import Loc from 'esast/dist/Loc'
import tupl, { abstract } from 'tupl/dist/tupl'
import { Union } from 'tupl/dist/type'
import { JsGlobals, KAssign, KFun, SpecialKeywords } from './private/Lang'
import Op, { None } from './private/U/Op'
import { newSet } from './private/U/util'

const Expression = abstract('Expression', Object, 'doc')
export default Expression

export const
	Do = abstract('Do', Expression, `
		These can only appear as lines in a Block.
		Not to be confused with Generator expressions resulting from \`do\` keyword.`),
	Val = abstract('Val', Expression, 'These can appear in any expression.')

const makeType = superType => (name, ...namesTypes) =>
	// TODO: provide actual docs...
	tupl(name, superType, 'doc', [ 'loc', Loc ].concat(namesTypes))
const
	ee = makeType(Expression), ed = makeType(Do), ev = makeType(Val)

// TODO: Get rid of null
const KSpecial = newSet(SpecialKeywords, [ 'contains', 'debugger', 'sub', 'null' ])

export const
	Debug = ed('Debug', 'lines', [Expression]),
	BlockDo = ed('BlockDo', 'lines', [Expression]),
	BlockVal = ed('BlockVal', 'lines', [Expression], 'returned', Val),
	ModuleDefaultExport = ed('ModuleDefaultExport', 'value', Val),
	LocalDeclare = Object.assign(
		ee('LocalDeclare',
			'name', String, 'opType', Op(Val), 'isLazy', Boolean, 'okToNotUse', Boolean),
		{
			focus: loc => LocalDeclare(loc, '_', None, false, false),
			res: (loc, opType) => LocalDeclare(loc, 'res', opType, false, true)
		}),
	Assign = Object.assign(
		ed('Assign', 'assignee', LocalDeclare, 'k', KAssign, 'value', Val),
		{ focus: (loc, value) => Assign(loc, LocalDeclare.focus(loc), '=', value) }),
	AssignDestructure = ed('AssignDestructure',
		'assignees', [LocalDeclare],
		'k', KAssign,
		'value', Val,
		'isLazy', Boolean),
	LocalAccess = Object.assign(
		ev('LocalAccess', 'name', String),
		{ focus: loc => LocalAccess(loc, '_') }),
	GlobalAccess = Object.assign(
		ev('GlobalAccess', 'name', JsGlobals),
		{
			null: loc => GlobalAccess(loc, 'null'),
			true: loc => GlobalAccess(loc, 'true')
		}),
	// Module
	UseDo = ee('UseDo', 'path', String),
	Use = ee('Use', 'path', String, 'used', [LocalDeclare], 'opUseDefault', Op(LocalDeclare)),
	// `block` will contain ModuleExport and ModuleDefaultExport_s
	// TODO: BlockVal and don't have `exports` object
	Module = ee('Module', 'doUses', [UseDo], 'uses', [Use], 'debugUses', [Use], 'block', BlockDo),

	// Data
	// TODO: Don't store index here, do it in Vr
	ListEntry = ed('ListEntry', 'value', Val, 'index', Number),
	// TODO: Don't store length here, do it in Vr
	ListReturn = ev('ListReturn', 'length', Number),
	ListSimple = ev('ListSimple', 'parts', [Val]),

	// TODO: Don't store index here, do it in Vr
	MapEntry = ed('MapEntry', 'key', Val, 'val', Val, 'index', Number),
	// TODO: Don't store length here, do it in Vr
	MapReturn = ev('MapReturn', 'length', Number),
	ObjReturn = ev('ObjReturn',
		'keys', [LocalDeclare],
		'debugKeys', [LocalDeclare],
		'opObjed', Op(Val),
		'opDisplayName', Op(String)),
	// keysVals: values are Vals
	ObjSimple = ev('ObjSimple', 'keysVals', Object),

	// Case
	Pattern = ee('Pattern', 'type', Val, 'locals', [LocalDeclare], 'patterned', LocalAccess),
	CaseDoPart = ee('CaseDoPart', 'test', Union(Val, Pattern), 'result', BlockDo),
	CaseValPart = ee('CaseValPart', 'test', Union(Val, Pattern), 'result', BlockVal),
	CaseDo = ed('CaseDo', 'opCased', Op(Assign), 'parts', [CaseDoPart], 'opElse', Op(BlockDo)),
	// Unlike CaseDo, this has `return` statements.
	CaseVal = ev('CaseVal', 'opCased', Op(Assign), 'parts', [CaseValPart], 'opElse', Op(BlockVal)),

	// Statements
	Loop = ed('Loop', 'block', BlockDo),
	EndLoop = ed('EndLoop'),

	// Generators
	Yield = ev('Yield', 'yielded', Val),
	YieldTo = ev('YieldTo', 'yieldedTo', Val),

	// Expressions
	Call = Object.assign(
		ev('Call', 'called', Val, 'args', [Val]),
		{
			contains: (loc, testType, tested) =>
				Call(loc, Special.contains(loc), [ testType, tested ]),
			sub: (loc, args) => Call(loc, Special.sub(loc), args)
		}),
	// Only for use in a Call
	Splat = ev('Splat', 'splatted', Val),

	BlockWrap = ev('BlockWrap', 'block', BlockVal),

	Fun = ev('Fun',
		'k', KFun,
		'args', [LocalDeclare],
		'opRestArg', Op(LocalDeclare),
		// BlockDo or BlockVal
		'block', Expression,
		'opIn', Op(Debug),
		// If non-empty, block should be a BlockVal, and either it has a type or opOut is non-empty.
		'opResDeclare', Op(LocalDeclare),
		'opOut', Op(Debug)),

	Lazy = ev('Lazy', 'value', Val),
	NumberLiteral = ev('NumberLiteral', 'value', Number),
	Member = ev('Member', 'object', Val, 'name', String),
	// parts are Strings interleaved with Vals.
	Quote = Object.assign(
		ev('Quote', 'parts', [Object]),
		{
			forString(loc, str) {
				return Quote(loc, [ str ])
			}
		}),

	Special = Object.assign(
		ev('Special', 'k', KSpecial),
		{
			contains: loc => Special(loc, 'contains'),
			debugger: loc => Special(loc, 'debugger'),
			sub: loc => Special(loc, 'sub')
		})
