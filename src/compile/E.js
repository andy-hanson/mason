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
	LocalDeclare: { name: String, opType: Op(E.Val), isLazy: Boolean }
})
makeETypes(E, { CasePart: { test: E.Val, result: E.BlockBody } });
E.LocalDeclare.UntypedFocus = function(span) {
	return E.LocalDeclare({ span: span, name: "_", opType: Op.None, isLazy: false })
}

makeETypes(E.Do, {
	Assign: { assignee: E.LocalDeclare, k: Lang.KAssign, value: E.Val },
	AssignDestructure: { assignees: [E.LocalDeclare], k: Lang.KAssign, value: E.Val },
	CaseDo: { opCased: Op(E.Val), parts: [E.CasePart], opElse: Op(E.BlockBody) },
	// The body of a module will contain ModuleExport and ModuleDefaultExport_s
	Module: { body: E.BlockBody },
	ModuleDefaultExport: { value: E.Val },
	EndLoop: { name: String },
	ListEntry: { value: E.Val, index: Number },
	Loop: { name: String, body: E.BlockBody }
})

const KFun = new Set(["|", "~|"])

makeETypes(E.Val, {
	BlockWrap: { body: E.BlockBody },
	Call: { called: E.Val, args: [E.Val] },
	// This and CaseDo differ only in that one is a Do and one is a Val,
	// and that a CaseVal can only contain E.Val results in its parts.
	// CaseVal compiles differently because it must return a result.
	CaseVal: { opCased: Op(E.Val), parts: [E.CasePart], opElse: Op(E.BlockBody) },
	Dict: { keys: [String], opDicted: Op(E.Val), opDisplayName: Op(String) },
	Fun: {
		args: [E.LocalDeclare],
		body: E.BlockBody,
		opReturnType: Op(E.Val),
		k:KFun
	},
	JSKeyword: { k: Lang.JSKeywords },
	Lazy: { value: E.Val },
	List: { length: Number },
	Literal: { value: String, k: new Set([Number, String, "js"]) },
	LocalAccess: { name: String },
	MapEntry: { key: E.Val, val: E.Val },
	Member: { object: E.Val, name: String },
	Quote: { parts: [E.Val] },
	Require: { path: String },
	Sub: { subject: E.Val, subbers: [E.Val] },
	TypeTest: { tested: E.Val, testType: E.Val },
	Yield: { yielded: E.Val },
	YieldTo: { yieldedTo: E.Val }
})
E.Fun.K = KFun
E.LocalAccess.focus = function(span) { return E.LocalAccess({ span: span, name: "_" }) }

