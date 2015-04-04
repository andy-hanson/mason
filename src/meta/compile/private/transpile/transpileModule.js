import { UseDo } from '../../Expression'
import { ArrayExpression, BinaryExpression, BlockStatement, CallExpression,
	Identifier, ExpressionStatement, FunctionExpression, IfStatement, Literal, ObjectExpression,
	Program, ReturnStatement, UnaryExpression, VariableDeclaration, VariableDeclarator,
	assignmentExpressionPlain, member, idSpecialCached }
	from '../esast'
import manglePath from '../manglePath'
import { flatMap, isEmpty, last, push } from '../U/Bag'
import { opIf } from '../U/Op'
import { t, IdDefine, IdExports, IdModule,
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
	const amdNames = ArrayExpression(AmdFirstUses.concat(
		allUses.map(use => Literal(manglePath(use.path, tx)))))
	const useIdentifiers = allUses.map(useIdentifier)
	const amdArgs = AmdFirstArgs.concat(useIdentifiers)
	const useDos = _.doUses.map((use, i) => {
		const d = ExpressionStatement(msGetModule([ useIdentifiers[i] ]))
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
		() => VariableDeclaration('const', useDeclarators))
	const moduleBody = useDos.concat(opUseDeclare, [ t(tx)(_.block) ])
	const doDefine = ExpressionStatement(
		CallExpression(IdDefine, [
			amdNames,
			FunctionExpression(null, amdArgs, BlockStatement([ lazyBody(moduleBody) ])) ]))
	return Program([ UseStrict, AmdefineHeader, doDefine ])
}

const
	useIdentifier = (use, i) => idSpecialCached(`${last(use.path.split('/'))}_${i}`),

	// const exports = { }
	DeclareExports = VariableDeclaration('const', [
		VariableDeclarator(IdExports, ObjectExpression([]))]),

	lazyBody = body =>
		ExpressionStatement(
			assignmentExpressionPlain(member(IdExports, '_get'), msLazy([
				FunctionExpression(null, [ ], BlockStatement(
					[DeclareExports].concat(body, ReturnStatement(IdExports))))]))),

	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = IfStatement(
		BinaryExpression('!==', UnaryExpression('typeof', IdDefine), Literal('function')),
		VariableDeclaration('var', [
			VariableDeclarator(IdDefine, CallExpression(
				CallExpression(Identifier('require'), [ Literal('amdefine') ]),
				[ IdModule ])) ])),

	UseStrict = ExpressionStatement(Literal('use strict')),

	AmdFirstUses = [ Literal('exports') ],
	AmdFirstArgs = [ IdExports ]
