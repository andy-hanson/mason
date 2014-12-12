"use strict"

const
	Lang = require("./Lang"),
	Op = require("./U/Op"),
	Span = require("./Span"),
		st = Span.spanType,
	T = require("./T"),
	abstractType = require("./U/types").abstractType,
	U = require("./U")

const E = module.exports = abstractType("E", Object)
Object.assign(E, {
	// These can only appear as lines in a BlockBody.
	// Not to be confused with E.Generator expressions resulting from `do` keyword.
	Do: abstractType("Do", E),
	// These can appear in any expression.
	Val: abstractType("Val", E)
})

const makeETypes = function(superType, types) {
	Object.keys(types).forEach(function(name) {
		E[name] = Span.spanType(name, superType, types[name])
	})
}

makeETypes(E, {
	// in and out are BlockBody_s.
	BlockBody: { lines: [E], opReturn: Op(E.Val), opIn: Op(E), opOut: Op(E) },
	LocalDeclare: { name: String, opType: Op(E.Val), isLazy: Boolean, okToNotUse: Boolean }
})
makeETypes(E, { CasePart: { test: E.Val, result: E.BlockBody } });
E.LocalDeclare.UntypedFocus = function(span) {
	return E.LocalDeclare({
		span: span,
		name: "_",
		opType: Op.None,
		isLazy: false,
		okToNotUse: false
	})
}

makeETypes(E.Do, {
	Assign: { assignee: E.LocalDeclare, k: Lang.KAssign, value: E.Val },
	AssignDestructure: { assignees: [E.LocalDeclare], k: Lang.KAssign, value: E.Val, isLazy: Boolean },
	CaseDo: { parts: [E.CasePart], opElse: Op(E.BlockBody) },
	// Unlike CaseDo, this has `return` statements.
	CaseVal: { parts: [E.CasePart], opElse: Op(E.BlockBody) },
	Debugger: { },
	EndLoop: { name: String },
	ListEntry: { value: E.Val, index: Number },
	Loop: { name: String, body: E.BlockBody },
	MapEntry: { key: E.Val, val: E.Val, index: Number },
	// The body of a module will contain ModuleExport and ModuleDefaultExport_s
	Module: { body: E.BlockBody },
	ModuleDefaultExport: { value: E.Val },
	Scope: { lines: [E] }
})

makeETypes(E.Val, {
	BlockWrap: { body: E.BlockBody },
	Call: { called: E.Val, args: [E.Val] },
	DictReturn: { keys: [String], opDicted: Op(E.Val), opDisplayName: Op(String) },
	Fun: {
		args: [E.LocalDeclare],
		opRestArg: Op(E.LocalDeclare),
		body: E.BlockBody,
		opReturnType: Op(E.Val),
		k: Lang.KFun
	},
	Lazy: { value: E.Val },
	ListReturn: { length: Number },
	ListSimple: { parts: [E.Val] },
	Literal: { value: String, k: new Set([Number, String, "js"]) },
	LocalAccess: { name: String },
	Map: { length: Number },
	Member: { object: E.Val, name: String },
	Null: { },
	True: { },
	Quote: { parts: [E.Val] },
	Require: { path: String },
	Sub: { subject: E.Val, subbers: [E.Val] },
	This: { },
	TypeTest: { tested: E.Val, testType: E.Val },
	Yield: { yielded: E.Val },
	YieldTo: { yieldedTo: E.Val },

	SpecialKeyword: { k: Lang.SpecialKeywords }
})
E.LocalAccess.focus = function(span) { return E.LocalAccess({ span: span, name: "_" }) }

