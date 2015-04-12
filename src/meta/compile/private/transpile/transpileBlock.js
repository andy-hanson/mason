import { BlockStatement, ReturnStatement } from 'esast/dist/ast'
import { toStatements } from 'esast/dist/util'
import { BlockVal, LocalDeclare } from '../../Expression'
import { flatMap, isEmpty } from '../U/Bag'
import { ifElse, opIf, None } from '../U/Op'
import { assert } from '../U/util'
import { declare } from './esast-util'
import { t, maybeWrapInCheckContains, ReturnRes } from './util'

export default (_, tx, lead, opResDeclare, opOut) => {
	if (lead === undefined)
		lead = []
	if (opResDeclare === undefined)
		opResDeclare = opOut = None
	const body = flatMap(_.lines, line => toStatements(t(tx)(line)))
	const fin = ifElse(opResDeclare,
		rd => {
			assert(_ instanceof BlockVal)
			const returned = maybeWrapInCheckContains(t(tx)(_.returned), tx, rd.opType, 'res')
			return ifElse(opOut,
				o => [ declare(rd, returned) ].concat(o, [ ReturnRes ]),
				() => [ ReturnStatement(returned) ])
		},
		() => opOut.concat(opIf(_ instanceof BlockVal, () => ReturnStatement(t(tx)(_.returned)))))
	return BlockStatement(lead.concat(body, fin))
}
