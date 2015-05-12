import { ArrayExpression, AssignmentExpression, BinaryExpression, BlockStatement, CallExpression,
	Identifier, ExpressionStatement, FunctionExpression, IfStatement, Literal, Program,
	ReturnStatement, UnaryExpression, VariableDeclaration, VariableDeclarator
	} from 'esast/dist/ast'
import { idCached, member } from 'esast/dist/util'
import { assignmentExpressionPlain } from 'esast/dist/specialize'
import manglePath from '../manglePath'
import { flatMap, isEmpty, last } from '../U/Bag'
import { opIf } from '../U/Op'
import { idForDeclareCached } from './esast-util'
import { t0, tm } from './transpile'
import { IdDefine, IdExports, IdModule, lazyWrap, makeDestructureDeclarators,
	toStatements, msGetModule, msLazyGetModule, msGetDefaultExport, msLazy } from './util'

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
export default (_, cx) => {
	const allUses = _.doUses.concat(_.uses, _.debugUses)
	const amdNames = ArrayExpression(AmdFirstUses.concat(
		allUses.map(use => Literal(manglePath(use.path)))))
	const useIdentifiers = allUses.map(useIdentifier)
	const amdArgs = AmdFirstArgs.concat(useIdentifiers)
	const useDos = _.doUses.map((use, i) => {
		const d = ExpressionStatement(msGetModule(useIdentifiers[i]))
		d.loc = use.loc
		return d
	})
	const allUseDeclarators = flatMap(_.uses.concat(_.debugUses), (use, i) =>
		useDeclarators(cx, use, useIdentifiers[i + _.doUses.length]))
	const opUseDeclare = opIf(!isEmpty(allUseDeclarators),
		() => VariableDeclaration('const', allUseDeclarators))

	// TODO: Some way of determining when it's OK for a module to not be lazy.
	const isLazy = cx.opts.lazyModule()

	const lines = flatMap(_.lines, line => toStatements(tm(line)))

	const opDefaultExport = _.opDefaultExport.map(_ =>
		AssignmentExpression('=', ExportsDefault, t0(_)))

	const moduleBody = BlockStatement(
		useDos.concat(opUseDeclare, lines, opDefaultExport, [ ReturnExports ]))

	const body = isLazy ? BlockStatement([ lazyBody(moduleBody) ]) : moduleBody

	const doDefine = ExpressionStatement(
		CallExpression(IdDefine, [ amdNames, FunctionExpression(null, amdArgs, body) ]))

	const opUseStrict = opIf(cx.opts.includeUseStrict(), () => UseStrict)
	const opAmdefine = opIf(cx.opts.amdefine(), () => AmdefineHeader)

	return Program(opUseStrict.concat(opAmdefine, [ doDefine ]))
}

const useDeclarators = (cx, _, moduleIdentifier) => {
	// TODO: Could be neater about this
	const isLazy = (isEmpty(_.used) ? _.opUseDefault[0] : _.used[0]).isLazy
	const value = (isLazy ? msLazyGetModule : msGetModule)(moduleIdentifier)

	const usedDefault = _.opUseDefault.map(def => {
		const defexp = msGetDefaultExport(moduleIdentifier)
		const val = isLazy ? lazyWrap(defexp) : defexp
		const vd = VariableDeclarator(idForDeclareCached(def), val)
		vd.loc = def.loc
		return vd
	})

	const usedDestruct = isEmpty(_.used) ? [ ] :
		makeDestructureDeclarators(cx, _.loc, _.used, isLazy, value, true, false)
	usedDestruct.forEach(_ => _.loc = _.loc)

	return usedDefault.concat(usedDestruct)
}

const
	useIdentifier = (use, i) => idCached(`${last(use.path.split('/'))}_${i}`),

	lazyBody = body =>
		ExpressionStatement(
			assignmentExpressionPlain(member(IdExports, '_get'), msLazy(
				FunctionExpression(null, [ ], body)))),

	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = IfStatement(
		BinaryExpression('!==', UnaryExpression('typeof', IdDefine), Literal('function')),
		VariableDeclaration('var', [
			VariableDeclarator(IdDefine, CallExpression(
				CallExpression(Identifier('require'), [ Literal('amdefine') ]),
				[ IdModule ])) ])),

	UseStrict = ExpressionStatement(Literal('use strict')),

	ReturnExports = ReturnStatement(IdExports),

	ExportsDefault = member(IdExports, 'default'),

	AmdFirstUses = [ Literal('exports') ],
	AmdFirstArgs = [ IdExports ]
