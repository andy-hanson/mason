import { JsGlobals, KAssign, KFun, SpecialKeywords, UseKeywords } from './private/Lang'
import Span, { spanTuple } from './private/Span'
import { cons } from './private/U/Bag'
import Op, { None } from './private/U/Op'
import type from './private/U/type'
import { abstractType } from './private/U/types'
import { assert, setUnion } from './private/U/util'

export default class Expression { }
// These can only appear as lines in a Block.
// Not to be confused with Generator expressions resulting from `do` keyword.
export class Do extends Expression { }
// These can appear in any expression.
export class Val extends Expression { }

// TODO:ES6 splat
const ee = function() { return spanTuple(Expression, ...arguments) }
const ed = function() { return spanTuple(Do, ...arguments) }
const ev = function() { return spanTuple(Val, ...arguments) }

// TODO: Get rid of null
const KSpecial = setUnion(SpecialKeywords, [ 'contains', 'debugger', 'sub', 'null' ])

export const
	Debug = ed('lines', [Expression]),
	BlockDo = ed('lines', [Expression]),
	BlockVal = ed('lines', [Expression], 'returned', Val),
	ModuleDefaultExport = ed('value', Val),
	LocalDeclare = Object.assign(
		ee('name', String, 'opType', Op(Val), 'isLazy', Boolean, 'okToNotUse', Boolean),
		{
			focus: span => new LocalDeclare(span, '_', None, false, false),
			res: (span, opType) => new LocalDeclare(span, 'res', opType, false, true)
		}),
	Assign = Object.assign(
		ed('assignee', LocalDeclare, 'k', KAssign, 'value', Val),
		{ focus: (span, value) => new Assign(span, LocalDeclare.focus(span), '=', value) }),
	AssignDestructure = ed(
		'assignees', [LocalDeclare],
		'k', KAssign,
		'value', Val,
		'isLazy', Boolean),
	LocalAccess = Object.assign(
		ev('name', String),
		{ focus: span => new LocalAccess(span, '_') }),
	GlobalAccess = Object.assign(
		ev('name', JsGlobals),
		{
			null: span => new GlobalAccess(span, 'null'),
			true: span => new GlobalAccess(span, 'true')
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
			contains: (span, testType, tested) =>
				new Call(span, Special.contains(span), [ testType, tested ]),
			sub: (span, args) => new Call(span, Special.sub(span), args)
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
	ELiteral = ev('value', String, 'k', new Set([Number, String, 'js'])),
	Member = ev('object', Val, 'name', String),
	Quote = ev('parts', [Val]),

	Special = Object.assign(
		ev('k', KSpecial),
		{
			contains: span => new Special(span, 'contains'),
			debugger: span => new Special(span, 'debugger'),
			sub: span => new Special(span, 'sub')
		})

