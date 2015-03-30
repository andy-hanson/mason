import { builders } from 'ast-types'
const { arrayExpression, assignmentExpression, binaryExpression, blockStatement, callExpression,
	expressionStatement, functionExpression, ifStatement, literal, objectExpression, program,
	returnStatement, unaryExpression, variableDeclaration, variableDeclarator } = builders
import { UseDo } from '../Expression'
import { fixupPath } from '../manglePath'
import { flatMap, isEmpty, last, push } from '../U/Bag'
import { opIf } from '../U/Op'
import { astThrowError, declare, member, toStatements } from './ast-util'
import { idSpecialCached } from './id'
import { t, IdDefine, IdExports, IdModule, IdRequire,
	msGetModule, msLazyGetModule, makeDestructureDeclarators, msLazy } from './util'

/*
'use strict';
if (typeof define !== 'function')
	var define = require('amdefine')(module);
define(['exports', 'a', 'b', 'c'], function(exports) {
	// Fake exports -- just a getter.
	exports._get = _ms.lazy(function() {
		const exports = {} // Real exports
		... imports ...
		{
			... exports ...
		}
		return exports
	})
})
*/
export default (_, tx) => {
	const allUses = _.doUses.concat(_.uses, _.debugUses)
	const amdNames = arrayExpression(AmdFirstUses.concat(
		allUses.map(use => literal(fixupPath(use.path, tx)))))
	const useIdentifiers = allUses.map(useIdentifier)
	const amdArgs = AmdFirstArgs.concat(useIdentifiers)
	const useDos = _.doUses.map((use, i) => {
		const d = expressionStatement(msGetModule([ useIdentifiers[i] ]))
		d.loc = use.span
		return d
	})
	const useDeclarators = flatMap(_.uses.concat(_.debugUses), (use, i) => {
		i = i + _.doUses.length
		const useId = useIdentifiers[i]
		// TODO: Could be neater about this
		const isLazy = use.used[0].isLazy
		const value = isLazy ? msLazyGetModule([ useId ]) : msGetModule([ useId ])
		const dd = makeDestructureDeclarators(tx, use.span, use.used, isLazy, value, '=', true)
		dd.forEach(_ => _.loc = use.span)
		return dd
	})
	const opUseDeclare = opIf(!isEmpty(useDeclarators),
		() => variableDeclaration('const', useDeclarators))
	const moduleBody = useDos.concat(opUseDeclare, [ t(tx)(_.block) ])
	const doDefine = expressionStatement(
		callExpression(IdDefine, [
			amdNames,
			functionExpression(null, amdArgs, blockStatement([ lazyBody(moduleBody) ])) ]))
	return program([ UseStrict, AmdefineHeader, doDefine ])
}

const
	useIdentifier = (use, i) => idSpecialCached(`${last(use.path.split('/'))}_${i}`),

	// const exports = { }
	DeclareExports = variableDeclaration('const', [
		variableDeclarator(IdExports, objectExpression([]))]),

	lazyBody = body =>
		expressionStatement(
			assignmentExpression('=', member(IdExports, '_get'), msLazy([
				functionExpression(null, [ ], blockStatement(
					[DeclareExports].concat(body, returnStatement(IdExports))))]))),


	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = ifStatement(
		binaryExpression('!==', unaryExpression('typeof', IdDefine), literal('function')),
		variableDeclaration('var', [
			variableDeclarator(IdDefine, callExpression(
				callExpression(IdRequire, [ literal('amdefine') ]),
				[ IdModule ])) ])),

	UseStrict = expressionStatement(literal('use strict')),

	AmdFirstUses = [ literal('exports') ],
	AmdFirstArgs = [ IdExports ]
