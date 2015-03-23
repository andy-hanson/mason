import check, { fail, warnIf } from "../check"
import E, * as EExports from "../Expression"
import Opts from "../Opts"
import type from "../U/type"
import { code, ignore, implementMany } from "../U"
import { ifElse } from "../U/Op"
import { cons, head, isEmpty, toArray } from "../U/Bag"
import verifyLines from "./verifyLines"
import { vxStart } from "./Vx"
import { v, vm } from "./util"

export default function verify(e, opts) {
	type(e, E, opts, Opts)
	const vx = vxStart(opts)
	e.verify(vx)
	verifyLocalUse(vx.vr, opts)
	return vx.vr
}

function verifyLocalUse(vr, opts) {
	for (let local of vr.localToInfo.keys()) {
		const info = vr.localToInfo.get(local)
		const noNonDebug = isEmpty(info.nonDebugAccesses)
		if (info.isInDebug)
			check(noNonDebug, local.span, () =>
				"Debug-only local " + code(local.name) +
				" used outside of debug at " + info.nonDebugAccesses[0].span)
		if (noNonDebug && isEmpty(info.debugAccesses))
			warnIf(opts, !local.okToNotUse, local.span, () =>
				"Unused local variable " + code(local.name) + ".")
		else if (info.isInDebug)
			check(noNonDebug, local.span, () =>
				"Debug-only local used at " + head(info.nonDebugAccesses).span)
		else
			warnIf(opts, !local.okToNotUse && noNonDebug, local.span, () =>
				"Local " + code(local.name) + " used only in debug.")
	}
}

function vCaseDo(_, vx) {
	_.parts.concat(_.opElse).forEach(v(vx))
}

implementMany(EExports, "verify", {
	BlockBody: (_, vx) => {
		_.opIn.forEach(v(vx))
		const vxRet = verifyLines(vx, _.lines)
		_.opReturn.forEach(v(vxRet))
		const vxOut = isEmpty(_.opReturn) ? vxRet : vxRet.withRes(_.span)
		_.opOut.forEach(v(vxOut))
	},
	BlockWrap: (_, vx) => {
		vx.setEIsInGenerator(_)
		v(vx)(_.body)
	},
	CaseDo: vCaseDo,
	CaseVal: (_, vx) => {
		vx.setEIsInGenerator(_)
		vCaseDo(_, vx)
	},
	// Only reach here for in/out condition
	Debug: (_, vx) => { verifyLines(vx, [ _ ]) },
	EndLoop: (_, vx) => check(vx.hasLoop(_.name), _.span, "No loop called `" + _.name + "`"),
	Fun: (_, vx) => {
		vx = vx.withBlockLocals()
		_.opReturnType.forEach(v(vx))
		if (!isEmpty(_.opReturnType))
			check(!isEmpty(_.body.opReturn), _.span,
				"Function with return type must return something.")
		_.args.forEach((arg) => arg.opType.forEach(v(vx)))
		const vxGen = _.k === "~|" ? vx.inGenerator() : vx.notInGenerator()
		const allArgs = _.args.concat(_.opRestArg)
		allArgs.forEach(_ => vx.registerLocal(_))
		const vxBody = vxGen.plusLocals(allArgs)
		v(vxBody)(_.body)
	},
	LocalAccess: (_, vx) => {
		const me = _
		ifElse(vx.opGetLocal(_.name),
			l => vx.setAccessToLocal(me, l),
			() => fail(me.span,
				"Could not find local `" + me.name + "`\n" +
				"Available locals are: [`" + toArray(vx.allLocalNames()).join("`, `") + "`]"))
	},
	Loop: (_, vx) => v(vx.plusLoop(_.name))(_.body),
	// Adding LocalDeclares to the available locals is done by Fun and buildVxBlockLine.
	LocalDeclare: (_, vx) => { _.opType.map(v(vx)) },
	MapEntry: (_, vx) => {
		v(vx)(_.key)
		v(vx)(_.val)
	},
	Yield: (_, vx) => {
		check(vx.isInGenerator, _.span, "Cannot yield outside of generator context")
		v(vx)(_.yielded)
	},
	YieldTo: (_, vx) => {
		check(vx.isInGenerator, _.span, "Cannot yield outside of generator context")
		v(vx)(_.yieldedTo)
	},

	// These ones just recurse to their children.
	Assign: (_, vx) => {
		const vxAssign = _.assignee.isLazy ? vx.withBlockLocals() : vx
		return vm(vxAssign, [_.assignee, _.value])
	},
	AssignDestructure: (_, vx) => { vm(vx, cons(_.value, _.assignees)) },
	Call: (_, vx) => { vm(vx, cons(_.called, _.args)) },
	CasePart: (_, vx) => { vm(vx, [_.test, _.result]) },
	Debugger: ignore,
	DictReturn: (_, vx) => { vm(vx, _.opDicted) },
	Ignore: (_, vx) => { v(vx)(_.ignored) },
	Lazy: (_, vx) => { v(vx.withBlockLocals())(_.value) },
	ListReturn: ignore,
	ListEntry: (_, vx) => { v(vx)(_.value) },
	ListSimple: (_, vx) => { _.parts.map(v(vx)) },
	ELiteral: (_, vx) => { warnIf(vx.opts, _.k === 'js', _.span, "Js literal") },
	MapReturn: ignore,
	Member: (_, vx) => { v(vx)(_.object) },
	Module: (_, vx) => { v(vx)(_.body) },
	ModuleDefaultExport: (_, vx) => { v(vx)(_.value) },
	Null: ignore,
	Quote: (_, vx) => { vm(vx, _.parts) },
	Require: ignore,
	Scope: () => { throw new Error("Scopes are handled specially by verifyLines.") },
	SpecialKeyword: ignore,
	Splat: (_, vx) => { v(vx)(_.splatted) },
	Sub: (_, vx) => { vm(vx, cons(_.subject, _.subbers)) },
	This: ignore,
	True: ignore,
	TypeTest: (_, vx) => vm(vx, [ _.tested, _.testType ])
})
