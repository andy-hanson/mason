import { Literal, ObjectExpression } from 'esast/dist/ast'
import { propertyIdOrLiteralCached, thunk } from 'esast/dist/util'
import { property } from 'esast/dist/specialize'
import { cat, flatMap, isEmpty, unshift } from '../U/Bag'
import { ifElse } from '../U/Op'
import { assert } from '../U/util'
import { t, accessLocalDeclare, msLset, msSet, IdDisplayName, LitStrDisplayName } from './util'

export const
	transpileObjReturn = (_, tx) => {
		const nonDebugKeys = _.keys
		// TODO: includeTypeChecks() is not the right method for this
		const keys = tx.opts().includeTypeChecks() ? _.keys.concat(_.debugKeys) : _.keys
		return ifElse(_.opObjed,
			objed => {
				const astObjed = t(tx)(objed)
				if (isEmpty(keys)) {
					assert(isEmpty(nonDebugKeys))
					return astObjed
				} else {
					const keysVals = cat(
						flatMap(keys, key => [ Literal(key.name), accessLocalDeclare(key) ]),
						flatMap(_.opDisplayName, dn => [LitStrDisplayName, Literal(dn)]))
					const anyLazy = keys.some(key => key.isLazy)
					const args = unshift(astObjed, keysVals)
					return (anyLazy ? msLset : msSet)(args)
				}
			},
			() => {
				assert(!isEmpty(keys))
				const props = keys.map(key => {
					const val = accessLocalDeclare(key)
					const id = propertyIdOrLiteralCached(key.name)
					return key.isLazy ?
						property('get', id, thunk(val)) :
						property('init', id, val)
				})
				const opPropDisplayName = _.opDisplayName.map(dn =>
					property('init', IdDisplayName, Literal(dn)))
				return ObjectExpression(cat(props, opPropDisplayName))
			})
	},

	transpileObjSimple = (_, tx) =>
		ObjectExpression(Object.getOwnPropertyNames(_.keysVals).map(keyName =>
			property('init', propertyIdOrLiteralCached(keyName), t(tx)(_.keysVals[keyName]))))
