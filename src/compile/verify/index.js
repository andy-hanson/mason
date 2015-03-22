import check, { fail, warnIf } from "../check"
import Opts from "../Opts"
import type from "../U/type"
import { code, ignore, implementMany } from "../U"
import { ifElse } from "../U/Op"
import { cons, head, isEmpty, toArray } from "../U/Sq"
const
	E = require("../E")
import verifyLines from "./verifyLines"
import { vxStart } from "./Vx"
import { v, vm } from "./util"

module.exports = function verify(e, opts) {
	type(e, E, opts, Opts)
	const vx = vxStart(opts)
	e.verify(vx)
	verifyLocalUse(vx.vr, opts)
	return vx.vr
}

const verifyLocalUse = function(vr, opts) {
	for (let local of vr.localToInfo.keys()) {
		const info = vr.localToInfo.get(local)
		const noNonDebug = isEmpty(info.nonDebugAccesses)
		if (info.isInDebug)
			check(noNonDebug, local.span, function() {
				return "Debug-only local " + code(local.name) +
					" used outside of debug at " + info.nonDebugAccesses[0].span
			})
		if (noNonDebug && isEmpty(info.debugAccesses))
			warnIf(opts, !local.okToNotUse, local.span, function() {
				return "Unused local variable " + code(local.name) + "."
			})
		else if (info.isInDebug)
			check(noNonDebug, local.span, function() {
				return "Debug-only local used at " + head(info.nonDebugAccesses).span
			})
		else
			warnIf(opts, !local.okToNotUse && noNonDebug, local.span, function() {
				return "Local " + code(local.name) + " used only in debug."
			})
	}
}

implementMany(E, "verify", {
	BlockBody: function(vx) {
		this.opIn.forEach(v(vx))
		const vxRet = verifyLines(vx, this.lines)
		this.opReturn.forEach(v(vxRet))
		const vxOut = isEmpty(this.opReturn) ? vxRet : vxRet.withRes(this.span)
		this.opOut.forEach(v(vxOut))
	},
	BlockWrap: function(vx) {
		vx.setEIsInGenerator(this)
		v(vx)(this.body)
	},
	CaseDo: function(vx) {
		this.parts.concat(this.opElse).forEach(v(vx))
	},
	CaseVal: function(vx) {
		vx.setEIsInGenerator(this)
		E.CaseDo.prototype.verify.call(this, vx)
	},
	Debug: function(vx) {
		// Only reach here for in/out condition
		verifyLines(vx, [ this ])
	},
	EndLoop: function(vx) {
		check(vx.hasLoop(this.name), this.span, "No loop called `" + this.name + "`")
	},
	Fun: function(vx) {
		vx = vx.withBlockLocals()
		this.opReturnType.forEach(v(vx))
		if (!isEmpty(this.opReturnType))
			check(!isEmpty(this.body.opReturn), this.span,
				"Function with return type must return something.")
		this.args.forEach(function(arg) { arg.opType.forEach(v(vx)) })
		const vxGen = this.k === "~|" ? vx.inGenerator() : vx.notInGenerator()
		const allArgs = this.args.concat(this.opRestArg)
		allArgs.forEach(function(_) { vx.registerLocal(_) })
		const vxBody = vxGen.plusLocals(allArgs)
		v(vxBody)(this.body)
	},
	LocalAccess: function(vx) {
		const me = this
		ifElse(vx.opGetLocal(this.name),
			function(l) { vx.setAccessToLocal(me, l) },
			function() {
				fail(me.span,
					"Could not find local `" + me.name + "`\n" +
					"Available locals are: [`" + toArray(vx.allLocalNames()).join("`, `") + "`]")
			})
	},
	Loop: function(vx) {
		v(vx.plusLoop(this.name))(this.body)
	},
	// Adding LocalDeclares to the available locals is done by Fun and buildVxBlockLine.
	LocalDeclare: function(vx) {
		this.opType.map(v(vx))
	},
	MapEntry: function(vx) {
		v(vx)(this.key)
		v(vx)(this.val)
	},
	Yield: function(vx) {
		check(vx.isInGenerator, this.span, "Cannot yield outside of generator context")
		v(vx)(this.yielded)
	},
	YieldTo: function(vx) {
		check(vx.isInGenerator, this.span, "Cannot yield outside of generator context")
		v(vx)(this.yieldedTo)
	},

	// These ones just recurse to their children.
	Assign: function(vx) {
		const vxAssign = this.assignee.isLazy ? vx.withBlockLocals() : vx
		return vm(vxAssign, [this.assignee, this.value])
	},
	AssignDestructure: function(vx) { vm(vx, cons(this.value, this.assignees)) },
	Call: function(vx) { vm(vx, cons(this.called, this.args)) },
	CasePart: function(vx) { vm(vx, [this.test, this.result]) },
	Debugger: ignore,
	DictReturn: function(vx) { vm(vx, this.opDicted) },
	Ignore: function(vx) { v(vx)(this.ignored) },
	Lazy: function(vx) {
		v(vx.withBlockLocals())(this.value)
	},
	ListReturn: ignore,
	ListEntry: function(vx) { v(vx)(this.value) },
	ListSimple: function(vx) { this.parts.map(v(vx)) },
	Literal: function(vx) {
		warnIf(vx.opts, this.k === 'js', this.span, "Js literal")
	},
	Map: ignore,
	Member: function(vx) { v(vx)(this.object) },
	Module: function(vx) { v(vx)(this.body) },
	ModuleDefaultExport: function(vx) { v(vx)(this.value) },
	Null: ignore,
	Quote: function(vx) { vm(vx, this.parts) },
	Require: ignore,
	Scope: function() { throw new Error("Scopes are handled specially by verifyLines.") },
	SpecialKeyword: ignore,
	Splat: function(vx) { v(vx)(this.splatted) },
	Sub: function(vx) { vm(vx, cons(this.subject, this.subbers)) },
	This: ignore,
	True: ignore,
	TypeTest: function(vx) { vm(vx, [this.tested, this.testType]) }
})
