import assert from 'assert'
import { builders } from 'ast-types'
const { blockStatement, returnStatement } = builders
import { flatMap, isEmpty } from '../U/Bag'
import { opIf, None } from '../U/Op'
import { BlockVal, LocalDeclare } from '../Expression'
import { declare, toStatements } from './ast-util'
import { t, maybeWrapInCheckContains, ReturnRes } from './util'

// TODO: We should create this once during parsing, not during verification/transpiling.
// See comment in Vx.
const ResDeclare = LocalDeclare.res(null)

export default (_, tx, opReturnType, opIn, opOut) => {
	if (opReturnType === undefined)
		opReturnType = opIn = opOut = None

	const body = flatMap(_.lines, line => toStatements(t(tx)(line)))

	const opReturned = opIf(_ instanceof BlockVal, () =>
		maybeWrapInCheckContains(t(tx)(_.returned), tx, opReturnType, 'res'))

	const needResLocal =
		tx.opts.includeInoutChecks() && !isEmpty(opReturned) && !isEmpty(opOut)
	if (needResLocal) {
		const makeRes = opReturned.map(ret => declare(ResDeclare, ret))
		const ret = opReturned.map(() => ReturnRes)
		return blockStatement(opIn.concat(body, makeRes, opOut, ret))
	}
	else {
		const ret = opReturned.map(returnStatement)
		return blockStatement(opIn.concat(body, opOut, ret))
	}
}
