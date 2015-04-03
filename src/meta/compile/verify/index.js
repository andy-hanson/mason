import { code } from '../CompileError'
import E, * as EExports from '../Expression'
import Opts from '../Opts'
import type from '../U/type'
import { assert, implementMany } from '../U'
import { ifElse } from '../U/Op'
import { cons, head, isEmpty, toArray } from '../U/Bag'
import verifyLines from './verifyLines'
import Vx from './Vx'
import { v, vm } from './util'

export default function verify(cx, e) {
	const vx = new Vx(cx)
	e.verify(e, vx)
	verifyLocalUse(vx)
	return vx.vr
}

function verifyLocalUse(vx) {
	const vr = vx.vr
	for (let local of vr.localToInfo.keys()) {
		const info = vr.localToInfo.get(local)
		const noNonDebug = isEmpty(info.nonDebugAccesses)
		if (noNonDebug && isEmpty(info.debugAccesses))
			vx.warnIf(!local.okToNotUse, local.span, () =>
				`Unused local variable ${code(local.name)}.`)
		else if (info.isInDebug)
			vx.check(noNonDebug, () => head(info.nonDebugAccesses).span, () =>
				`Debug-only local ${code(local.name)} used outside of debug.`)
		else
			vx.warnIf(!local.okToNotUse && noNonDebug, local.span, () =>
				`Local ${code(local.name)} used only in debug.`)
	}
}

implementMany(EExports, 'verify', {
	Assign(_, vx) {
		const doV = () => vm(vx, [ _.assignee, _.value ])
		if (_.assignee.isLazy)
			vx.withBlockLocals(doV)
		else
			doV()
	},
	BlockDo(_, vx) { verifyLines(vx, _.lines) },
	BlockVal(_, vx) {
		const newLocals = verifyLines(vx, _.lines)
		vx.plusLocals(newLocals, () => v(vx)(_.returned))
	},
	BlockWrap(_, vx) {
		vx.setEIsInGenerator(_)
		v(vx)(_.block)
	},
	CaseDo: verifyCase,
	CaseVal(_, vx) {
		vx.setEIsInGenerator(_)
		verifyCase(_, vx)
	},
	// Only reach here for in/out condition
	Debug(_, vx) { verifyLines(vx, [ _ ]) },
	EndLoop(_, vx) {
		ifElse(vx.opLoop,
			loop => vx.setEndLoop(_, loop),
			() => vx.fail(_.span, 'Not in a loop.'))
	},
	Fun(_, vx) {
		vx.withBlockLocals(() => {
			vx.check(isEmpty(_.opResDeclare) || _.block instanceof EExports.BlockVal, _.span,
				'Function with return condition must return something.')
			_.args.forEach((arg) => arg.opType.forEach(v(vx)))
			vx.withInGenerator(_.k === '~|', () => {
				const allArgs = _.args.concat(_.opRestArg)
				allArgs.forEach(_ => vx.registerLocal(_))
				vx.plusLocals(allArgs, () => {
					_.opIn.forEach(v(vx))
					v(vx)(_.block)
					_.opResDeclare.forEach(rd => {
						v(vx)(rd)
						vx.registerLocal(rd)
					})
					_.opOut.forEach(o => vx.plusLocals(_.opResDeclare, () => v(vx)(o)))
				})
			})
		})
	},
	GlobalAccess() { },
	LocalAccess(_, vx) { vx.localAccess(_) },
	Loop(_, vx) { vx.withInLoop(_, () => v(vx)(_.block)) },
	// Adding LocalDeclares to the available locals is done by Fun and buildVxBlockLine.
	LocalDeclare(_, vx) { _.opType.map(v(vx)) },
	MapEntry(_, vx) {
		v(vx)(_.key)
		v(vx)(_.val)
	},
	Module(_, vx) {
		const useLocals = verifyUses(vx, _.uses, _.debugUses)
		vx.plusLocals(useLocals, () => v(vx)(_.block))
	},
	Yield(_, vx) {
		vx.check(vx.isInGenerator, _.span, 'Cannot yield outside of generator context')
		v(vx)(_.yielded)
	},
	YieldTo(_, vx) {
		vx.check(vx.isInGenerator, _.span, 'Cannot yield outside of generator context')
		v(vx)(_.yieldedTo)
	},

	// These ones just recurse to their children.
	AssignDestructure(_, vx) {
		v(vx)(_.value)
		vm(vx, _.assignees)
	},
	Call(_, vx) {
		v(vx)(_.called)
		vm(vx, _.args)
	},
	CaseDoPart: verifyCasePart,
	CaseValPart: verifyCasePart,
	ObjReturn(_, vx) { vm(vx, _.opObjed) },
	ObjSimple(_, vx) {
		Object.getOwnPropertyNames(_.keysVals).forEach(key => v(vx)(_.keysVals[key]))
	},
	Lazy(_, vx) { vx.withBlockLocals(() => v(vx)(_.value)) },
	ListReturn() { },
	ListEntry(_, vx) { v(vx)(_.value) },
	ListSimple(_, vx) { _.parts.map(v(vx)) },
	ELiteral(_, vx) { vx.warnIf(_.k === 'js', _.span, 'Js literal') },
	MapReturn() { },
	Member(_, vx) { v(vx)(_.object) },
	ModuleDefaultExport(_, vx) { v(vx)(_.value) },
	Quote(_, vx) { vm(vx, _.parts) },
	Special() { },
	Splat(_, vx) { v(vx)(_.splatted) }
})

function verifyCase(_, vx) {
	const newLocals = []
	_.opCased.forEach(cased => {
		vx.registerLocal(cased.assignee)
		v(vx)(cased)
		newLocals.push(cased.assignee)
	})
	vx.plusLocals(newLocals, () => {
		vm(vx, _.parts)
		vm(vx, _.opElse)
	})
}

function verifyCasePart(_, vx) {
	v(vx)(_.test)
	v(vx)(_.result)
}

function verifyUses(vx, uses, debugUses) {
	const useLocals = []
	uses.forEach(use => {
		if (!(use instanceof EExports.UseDo)) {
			type(use, EExports.Use)
			use.used.forEach(_ => {
				vx.registerLocal(_)
				useLocals.push(_)
			})
		}
	})
	vx.withInDebug(true, () =>
		debugUses.forEach(use =>
			use.used.forEach(_ => {
				vx.registerLocal(_)
				useLocals.push(_)
			})))
	return useLocals
}

