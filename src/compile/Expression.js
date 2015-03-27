import { KAssign, KFun, SpecialKeywords, UseKeywords } from './Lang'
import Span, { spanType } from './Span'
import { setUnion } from './U'
import Op, { None } from './U/Op'
import { abstractType } from './U/types'

const Expression = abstractType('Expression', Object)
export default Expression
// These can only appear as lines in a BlockBody.
// Not to be confused with Generator expressions resulting from `do` keyword.
export const Do = abstractType('Do', Expression)
// These can appear in any expression.
export const Val = abstractType('Val', Expression)

const ee = (name, props) => spanType(name, Expression, props)
const ed = (name, props) => spanType(name, Do, props)
const ev = (name, props) => spanType(name, Val, props)

export const Debug = ed('Debug', { lines: [Expression] })
export const BlockBody = spanType('BlockBody', Expression, {
	lines: [Expression],
	opReturn: Op(Val),
	opIn: Op(Debug), opOut: Op(Debug)
})

export const ModuleDefaultExport = ed('ModuleDefaultExport', { value: Val })

// Locals
export const LocalDeclare = ee('LocalDeclare', {
	name: String,
	opType: Op(Val),
	isLazy: Boolean,
	okToNotUse: Boolean
})
LocalDeclare.UntypedFocus = span => LocalDeclare({
	span,
	name: '_',
	opType: None,
	isLazy: false,
	okToNotUse: false
})
export const Assign = ed('Assign', { assignee: LocalDeclare, k: KAssign, value: Val })
export const AssignDestructure = ed('AssignDestructure', {
	assignees: [LocalDeclare],
	k: KAssign,
	value: Val,
	isLazy: Boolean
})
export const LocalAccess = ev('LocalAccess', { name: String })
LocalAccess.focus = span => LocalAccess({ span, name: '_' })

// Module
export const UseDo = ee('UseDo', { path: String })
export const Use = ee('Use', {
	used: [LocalDeclare],
	path: String
})
// The body of a module will contain ModuleExport and ModuleDefaultExport_s
export const Module = ed('Module', {
	doUses: [UseDo],
	uses: [Use],
	debugUses: [Use],
	body: BlockBody
})

// Data
export const ListEntry = ed('ListEntry', { value: Val, index: Number })
export const ListReturn = ev('ListReturn', { length: Number })
export const ListSimple = ev('ListSimple', { parts: [Val] })
export const MapEntry = ed('MapEntry', { key: Val, val: Val, index: Number })
export const MapReturn = ev('Map', { length: Number })
export const ObjReturn = ev('ObjReturn', {
	keys: [LocalDeclare],
	debugKeys: [LocalDeclare],
	opObjed: Op(Val),
	opDisplayName: Op(String)
})
export const ObjSimple = ev('ObjSimple', {
	// values are Vals
	keysVals: Object
})

// Case
export const CasePart = ee('CasePart', { test: Val, result: BlockBody })
export const CaseDo = ed('CaseDo', { parts: [CasePart], opElse: Op(BlockBody) })
// Unlike CaseDo, this has `return` statements.
export const CaseVal = ed('CaseVal', { parts: [CasePart], opElse: Op(BlockBody) })


// Statements
export const Debugger = ed('Debugger', { })
export const Scope = ed('Scope', { lines: [Expression] })
export const BlockWrap = ev('BlockWrap', { body: BlockBody })

export const Loop = ed('Loop', { name: String, body: BlockBody })
export const EndLoop = ed('EndLoop', { name: String })

// Generators
export const Yield = ev('Yield', { yielded: Val })
export const YieldTo = ev('YieldTo', { yieldedTo: Val })

// Expressions
export const Call = ev('Call', { called: Val, args: [Val] })
Object.assign(Call, {
	contains: (span, testType, tested) =>
		Call({ span, called: Special.contains(span), args: [ testType, tested ] }),
	sub: (span, object, subbers) =>
		Call({ span, called: Special.sub(span), args: [object].concat(subbers) })
})
// For use in a Call
export const Splat = ev('Splat', { splatted: Val })

export const Fun = ev('Fun', {
	args: [LocalDeclare],
	opRestArg: Op(LocalDeclare),
	body: BlockBody,
	opReturnType: Op(Val),
	k: KFun
})

export const Lazy = ev('Lazy', { value: Val })
export const ELiteral = ev('Literal', { value: String, k: new Set([Number, String, 'js']) })
export const Member = ev('Member', { object: Val, name: String })
export const Quote = ev('Quote', { parts: [Val] })

const KSpecial = setUnion(SpecialKeywords, [ 'contains', 'true', 'null', 'sub' ])
export const Special = ev('Special', { k: KSpecial })
Object.assign(Special, {
	contains: span => Special({ span, k: 'contains' }),
	null: span => Special({ span, k: 'null' }),
	sub: span => Special({ span, k: 'sub' }),
	true: span => Special({ span, k: 'true' })
})
