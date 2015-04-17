import Loc from 'esast/dist/Loc'
import { JsGlobals, KAssign, KFun, SpecialKeywords } from './private/Lang'
import Op, { None } from './private/U/Op'
import { tuple } from './private/U/types'
import { newSet } from './private/U/util'

export default class Expression { }
// These can only appear as lines in a Block.
// Not to be confused with Generator expressions resulting from `do` keyword.
export class Do extends Expression { }
// These can appear in any expression.
export class Val extends Expression { }

// TODO:ES6 splat
const ee = function() { return tuple(Expression, 'loc', Loc, ...arguments) }
const ed = function() { return tuple(Do, 'loc', Loc, ...arguments) }
const ev = function() { return tuple(Val, 'loc', Loc, ...arguments) }

// TODO: Get rid of null
const KSpecial = newSet(SpecialKeywords, [ 'contains', 'debugger', 'sub', 'null' ])

export const
	Debug = ed('lines', [Expression]),
	BlockDo = ed('lines', [Expression]),
	BlockVal = ed('lines', [Expression], 'returned', Val),
	ModuleDefaultExport = ed('value', Val),
	LocalDeclare = Object.assign(
		ee('name', String, 'opType', Op(Val), 'isLazy', Boolean, 'okToNotUse', Boolean),
		{
			focus: loc => LocalDeclare(loc, '_', None, false, false),
			res: (loc, opType) => LocalDeclare(loc, 'res', opType, false, true)
		}),
	Assign = Object.assign(
		ed('assignee', LocalDeclare, 'k', KAssign, 'value', Val),
		{ focus: (loc, value) => Assign(loc, LocalDeclare.focus(loc), '=', value) }),
	AssignDestructure = ed(
		'assignees', [LocalDeclare],
		'k', KAssign,
		'value', Val,
		'isLazy', Boolean),
	LocalAccess = Object.assign(
		ev('name', String),
		{ focus: loc => LocalAccess(loc, '_') }),
	GlobalAccess = Object.assign(
		ev('name', JsGlobals),
		{
			null: loc => GlobalAccess(loc, 'null'),
			true: loc => GlobalAccess(loc, 'true')
		}),
	// Module
	UseDo = ee('path', String),
	Use = ee('path', String, 'used', [LocalDeclare], 'opUseDefault', Op(LocalDeclare)),
	// `block` will contain ModuleExport and ModuleDefaultExport_s
	// TODO: BlockVal and don't have `exports` object
	Module = ee('doUses', [UseDo], 'uses', [Use], 'debugUses', [Use], 'block', BlockDo),

	// Data
	// TODO: Don't store index here, do it in Vr
	ListEntry = ed('value', Val, 'index', Number),
	// TODO: Don't store length here, do it in Vr
	ListReturn = ev('length', Number),
	ListSimple = ev('parts', [Val]),

	// TODO: Don't store index here, do it in Vr
	MapEntry = ed('key', Val, 'val', Val, 'index', Number),
	// TODO: Don't store length here, do it in Vr
	MapReturn = ev('length', Number),
	ObjReturn = ev(
		'keys', [LocalDeclare],
		'debugKeys', [LocalDeclare],
		'opObjed', Op(Val),
		'opDisplayName', Op(String)),
	// keysVals: values are Vals
	ObjSimple = ev('keysVals', Object),

	// Case
	CaseDoPart = ee('test', Val, 'result', BlockDo),
	CaseValPart = ee('test', Val, 'result', BlockVal),
	CaseDo = ed('opCased', Op(Assign), 'parts', [CaseDoPart], 'opElse', Op(BlockDo)),
	// Unlike CaseDo, this has `return` statements.
	CaseVal = ev('opCased', Op(Assign), 'parts', [CaseValPart], 'opElse', Op(BlockVal)),

	// Statements
	Loop = ed('block', BlockDo),
	EndLoop = ed(),

	// Generators
	Yield = ev('yielded', Val),
	YieldTo = ev('yieldedTo', Val),

	// Expressions
	Call = Object.assign(
		ev('called', Val, 'args', [Val]),
		{
			contains: (loc, testType, tested) =>
				Call(loc, Special.contains(loc), [ testType, tested ]),
			sub: (loc, args) => Call(loc, Special.sub(loc), args)
		}),
	// Only for use in a Call
	Splat = ev('splatted', Val),

	BlockWrap = ev('block', BlockVal),

	Fun = ev(
		'k', KFun,
		'args', [LocalDeclare],
		'opRestArg', Op(LocalDeclare),
		// BlockDo or BlockVal
		'block', Expression,
		'opIn', Op(Debug),
		// If non-empty, block should be a BlockVal, and either it has a type or opOut is non-empty.
		'opResDeclare', Op(LocalDeclare),
		'opOut', Op(Debug)),

	Lazy = ev('value', Val),
	ELiteral = ev('value', String, 'k', newSet([Number, String, 'js'])),
	Member = ev('object', Val, 'name', String),
	Quote = ev('parts', [Val]),

	Special = Object.assign(
		ev('k', KSpecial),
		{
			contains: loc => Special(loc, 'contains'),
			debugger: loc => Special(loc, 'debugger'),
			sub: loc => Special(loc, 'sub')
		})

