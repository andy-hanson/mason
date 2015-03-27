import check, { fail, warnIf } from '../check'
import E, * as EExports from '../Expression'
import Opts from '../Opts'
import type from '../U/type'
import { code, ignore, implementMany } from '../U'
import { ifElse } from '../U/Op'
import { cons, head, isEmpty, toArray } from '../U/Bag'
import verifyLines from './verifyLines'
import Vx from './Vx'
import { v, vm } from './util'

export default function verify(e, opts) {
	type(e, E, opts, Opts)
	const vx = new Vx(opts)
	e.verify(e, vx)
	verifyLocalUse(vx.vr, opts)
	return vx.vr
}

function verifyLocalUse(vr, opts) {
	for (let local of vr.localToInfo.keys()) {
		const info = vr.localToInfo.get(local)
		const noNonDebug = isEmpty(info.nonDebugAccesses)
		if (noNonDebug && isEmpty(info.debugAccesses))
			warnIf(opts, !local.okToNotUse, local.span, () =>
				`Unused local variable ${code(local.name)}.`)
		else if (info.isInDebug)
			check(noNonDebug, () => head(info.nonDebugAccesses).span, () =>
				`Debug-only local ${code(local.name)} used outside of debug.`)
		else
			warnIf(opts, !local.okToNotUse && noNonDebug, local.span, () =>
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
	BlockBody(_, vx) {
		_.opIn.forEach(v(vx))
		const newLocals = verifyLines(vx, _.lines)
		vx.plusLocals(newLocals, () => {
			_.opReturn.forEach(v(vx))
			const doV = () => _.opOut.forEach(v(vx))
			if (!isEmpty(_.opReturn))
				vx.withRes(_.span, doV)
			else
				doV()
		})
	},
	BlockWrap(_, vx) {
		vx.setEIsInGenerator(_)
		v(vx)(_.body)
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
			() => fail(_.span, 'Not in a loop.'))
	},
	Fun(_, vx) {
		vx.withBlockLocals(() => {
			_.opReturnType.forEach(v(vx))
			if (!isEmpty(_.opReturnType))
				check(!isEmpty(_.body.opReturn), _.span,
					'Function with return type must return something.')
			_.args.forEach((arg) => arg.opType.forEach(v(vx)))
			vx.withInGenerator(_.k === '~|', () => {
				const allArgs = _.args.concat(_.opRestArg)
				allArgs.forEach(_ => vx.registerLocal(_))
				vx.plusLocals(allArgs, () => v(vx)(_.body))
			})
		})
	},
	LocalAccess(_, vx) {
		ifElse(vx.opGetLocal(_.name),
			l => vx.setAccessToLocal(_, l),
			() => fail(_.span,
				`Could not find local ${code(_.name)}.` +
				`Available locals are: [${toArray(vx.allLocalNames()).map(code).join(', ')}])`))
	},
	Loop(_, vx) { vx.withInLoop(_, () => v(vx)(_.body)) },
	// Adding LocalDeclares to the available locals is done by Fun and buildVxBlockLine.
	LocalDeclare(_, vx) { _.opType.map(v(vx)) },
	MapEntry(_, vx) {
		v(vx)(_.key)
		v(vx)(_.val)
	},
	Module(_, vx) {
		const useLocals = verifyUses(vx, _.uses, _.debugUses)
		vx.plusLocals(useLocals, () => v(vx)(_.body))
	},
	Yield(_, vx) {
		check(vx.isInGenerator, _.span, 'Cannot yield outside of generator context')
		v(vx)(_.yielded)
	},
	YieldTo(_, vx) {
		check(vx.isInGenerator, _.span, 'Cannot yield outside of generator context')
		v(vx)(_.yieldedTo)
	},

	// These ones just recurse to their children.
	AssignDestructure(_, vx) { vm(vx, cons(_.value, _.assignees)) },
	Call(_, vx) { vm(vx, cons(_.called, _.args)) },
	CasePart(_, vx) { vm(vx, [_.test, _.result]) },
	Debugger() { },
	ObjReturn(_, vx) { vm(vx, _.opObjed) },
	ObjSimple(_, vx) {
		Object.getOwnPropertyNames(_.keysVals).forEach(key => v(vx)(_.keysVals[key]))
	},
	Lazy(_, vx) { vx.withBlockLocals(() => v(vx)(_.value)) },
	ListReturn() { },
	ListEntry(_, vx) { v(vx)(_.value) },
	ListSimple(_, vx) { _.parts.map(v(vx)) },
	ELiteral(_, vx) { warnIf(vx.opts, _.k === 'js', _.span, 'Js literal') },
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
	vx.plusLocals(newLocals, () =>
		_.parts.concat(_.opElse).forEach(v(vx)))
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

