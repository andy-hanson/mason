import { KAssign, KFun, SpecialKeywords } from "./Lang"
import Span, { spanType } from "./Span"
import Op, { None } from "./U/Op"
import { abstractType } from "./U/types"

const E = abstractType("E", Object)
export default E
// These can only appear as lines in a BlockBody.
// Not to be confused with Generator expressions resulting from `do` keyword.
export const Do = abstractType("Do", E)
// These can appear in any expression.
export const Val = abstractType("Val", E)

function ed(name, props) {
	return spanType(name, Do, props)
}
function ev(name, props) {
	return spanType(name, Val, props)
}

export const Debug = ed("Debug", { lines: [E] })
export const BlockBody = spanType("BlockBody", E, {
	lines: [E],
	opReturn: Op(Val),
	opIn: Op(Debug), opOut: Op(Debug)
})
export const LocalDeclare = spanType("LocalDeclare", E, {
	name: String,
	opType: Op(Val),
	isLazy: Boolean,
	okToNotUse: Boolean
})
LocalDeclare.UntypedFocus = function(span) {
	return LocalDeclare({
		span: span,
		name: "_",
		opType: None,
		isLazy: false,
		okToNotUse: false
	})
}

export const CasePart = spanType("CasePart", E, {
	test: Val,
	result: BlockBody
})

export const Assign = ed("Assign", { assignee: LocalDeclare, k: KAssign, value: Val })
export const AssignDestructure = ed("AssignDestructure", {
	assignees: [LocalDeclare],
	k: KAssign,
	value: Val,
	isLazy: Boolean,
	checkProperties: Boolean
})
export const CaseDo = ed("CaseDo", { parts: [CasePart], opElse: Op(BlockBody) })
// Unlike CaseDo, this has `return` statements.
export const CaseVal = ed("CaseVal", { parts: [CasePart], opElse: Op(BlockBody) })
export const Debugger = ed("Debugger", { })
export const EndLoop = ed("EndLoop", { name: String })
// Transforms a Val to a Do, meaning we ignore its value.
export const Ignore = ed("Ignore", { ignored: Val })

export const ListEntry = ed("ListEntry", { value: Val, index: Number })

export const Loop = ed("Loop", { name: String, body: BlockBody })

export const MapEntry = ed("MapEntry", { key: Val, val: Val, index: Number })

// The body of a module will contain ModuleExport and ModuleDefaultExport_s
export const Module = ed("Module", { body: BlockBody })

export const ModuleDefaultExport = ed("ModuleDefaultExport", { value: Val })

export const Scope = ed("Scope", { lines: [E] })

export const BlockWrap = ev("BlockWrap", { body: BlockBody })

export const Call = ev("Call", { called: Val, args: [Val] })

export const DictReturn = ev("DictReturn", {
	keys: [LocalDeclare],
	debugKeys: [LocalDeclare],
	opDicted: Op(Val),
	opDisplayName: Op(String)
})

export const Fun = ev("Fun", {
	args: [LocalDeclare],
	opRestArg: Op(LocalDeclare),
	body: BlockBody,
	opReturnType: Op(Val),
	k: KFun
})

export const Lazy = ev("Lazy", { value: Val })

export const ListReturn = ev("ListReturn", { length: Number })

export const ListSimple = ev("ListSimple", { parts: [Val] })

export const ELiteral = ev("Literal", { value: String, k: new Set([Number, String, "js"]) })

export const LocalAccess = ev("LocalAcecss", { name: String })
LocalAccess.focus = function(span) { return LocalAccess({ span: span, name: "_" }) }

// TODO: MapReturn might be a better name.
export const Map = ev("Map", { length: Number })

export const Member = ev("Member", { object: Val, name: String })

export const Null = ev("Null", { })

export const True = ev("Null", { })

export const Quote = ev("Quote", { parts: [Val] })

export const Require = ev("Require", { path: String })

export const Sub = ev("Sub", { subject: Val, subbers: [Val] })

export const This = ev("This", { })

export const TypeTest = ev("TypeTest", { tested: Val, testType: Val })

export const Yield = ev("Yield", { yielded: Val })

export const YieldTo = ev("YieldTo", { yieldedTo: Val })

export const SpecialKeyword = ev("SpecialKeyword", { k: SpecialKeywords })

export const Splat = ev("Splat", { splatted: Val })
