if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../manglePath', '../U/Bag', '../U/Op', './esast-util', './transpile', './util'], function (exports, module, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _manglePath, _UBag, _UOp, _esastUtil, _transpile, _util) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _manglePath2 = _interopRequire(_manglePath);

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

	module.exports = function (_, cx) {
		const allUses = _.doUses.concat(_.uses, _.debugUses);
		const amdNames = _esastDistAst.ArrayExpression(AmdFirstUses.concat(allUses.map(function (use) {
			return _esastDistAst.Literal(_manglePath2(use.path));
		})));
		const useIdentifiers = allUses.map(useIdentifier);
		const amdArgs = AmdFirstArgs.concat(useIdentifiers);
		const useDos = _.doUses.map(function (use, i) {
			const d = _esastDistAst.ExpressionStatement(_util.msGetModule(useIdentifiers[i]));
			d.loc = use.loc;
			return d;
		});
		const allUseDeclarators = _UBag.flatMap(_.uses.concat(_.debugUses), function (use, i) {
			return useDeclarators(cx, use, useIdentifiers[i + _.doUses.length]);
		});
		const opUseDeclare = _UOp.opIf(!_UBag.isEmpty(allUseDeclarators), function () {
			return _esastDistAst.VariableDeclaration('const', allUseDeclarators);
		});

		// TODO: Some way of determining when it's OK for a module to not be lazy.
		const isLazy = cx.opts.lazyModule();

		const lead = useDos.concat(opUseDeclare, _UOp.opIf(isLazy, function () {
			return DeclareExports;
		}));
		const trail = [_esastDistAst.ReturnStatement(_util.IdExports)];
		const moduleBody = _transpile.t3(_.block, lead, _UOp.None, trail);
		const body = isLazy ? _esastDistAst.BlockStatement([lazyBody(moduleBody)]) : moduleBody;

		const doDefine = _esastDistAst.ExpressionStatement(_esastDistAst.CallExpression(_util.IdDefine, [amdNames, _esastDistAst.FunctionExpression(null, amdArgs, body)]));

		const parts = _UOp.opIf(cx.opts.includeUseStrict(), function () {
			return UseStrict;
		}).concat(_UOp.opIf(cx.opts.amdefine(), function () {
			return AmdefineHeader;
		}), [doDefine]);
		return _esastDistAst.Program(parts);
	};

	const useDeclarators = function (cx, _, moduleIdentifier) {
		// TODO: Could be neater about this
		const isLazy = (_UBag.isEmpty(_.used) ? _.opUseDefault[0] : _.used[0]).isLazy;
		const value = (isLazy ? _util.msLazyGetModule : _util.msGetModule)(moduleIdentifier);

		const usedDefault = _.opUseDefault.map(function (def) {
			const defexp = _util.msGetDefaultExport(moduleIdentifier);
			const val = isLazy ? _util.lazyWrap(defexp) : defexp;
			const vd = _esastDistAst.VariableDeclarator(_esastUtil.idForDeclareCached(def), val);
			vd.loc = def.loc;
			return vd;
		});

		const usedDestruct = _UBag.isEmpty(_.used) ? [] : _util.makeDestructureDeclarators(cx, _.loc, _.used, isLazy, value, '=', true);
		usedDestruct.forEach(function (_) {
			return _.loc = _.loc;
		});

		return usedDefault.concat(usedDestruct);
	};

	const useIdentifier = function (use, i) {
		return _esastDistUtil.idCached('' + _UBag.last(use.path.split('/')) + '_' + i);
	},
	     

	// const exports = { }
	DeclareExports = _esastDistAst.VariableDeclaration('const', [_esastDistAst.VariableDeclarator(_util.IdExports, _esastDistAst.ObjectExpression([]))]),
	      lazyBody = function (body) {
		return _esastDistAst.ExpressionStatement(_esastDistSpecialize.assignmentExpressionPlain(_esastDistUtil.member(_util.IdExports, '_get'), _util.msLazy(_esastDistAst.FunctionExpression(null, [], body))));
	},
	     

	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = _esastDistAst.IfStatement(_esastDistAst.BinaryExpression('!==', _esastDistAst.UnaryExpression('typeof', _util.IdDefine), _esastDistAst.Literal('function')), _esastDistAst.VariableDeclaration('var', [_esastDistAst.VariableDeclarator(_util.IdDefine, _esastDistAst.CallExpression(_esastDistAst.CallExpression(_esastDistAst.Identifier('require'), [_esastDistAst.Literal('amdefine')]), [_util.IdModule]))])),
	      UseStrict = _esastDistAst.ExpressionStatement(_esastDistAst.Literal('use strict')),
	      AmdFirstUses = [_esastDistAst.Literal('exports')],
	      AmdFirstArgs = [_util.IdExports];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGVNb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQStCZSxVQUFDLENBQUMsRUFBRSxFQUFFLEVBQUs7QUFDekIsUUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7QUFDcEQsUUFBTSxRQUFRLEdBQUcsY0FqQ1QsZUFBZSxDQWlDVSxZQUFZLENBQUMsTUFBTSxDQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztVQUFJLGNBakNrQyxPQUFPLENBaUNqQyxhQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDcEQsUUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNqRCxRQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBQ25ELFFBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUN2QyxTQUFNLENBQUMsR0FBRyxjQXJDWCxtQkFBbUIsQ0FxQ1ksTUExQi9CLFdBQVcsQ0EwQmdDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDN0QsSUFBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFBO0FBQ2YsVUFBTyxDQUFDLENBQUE7R0FDUixDQUFDLENBQUE7QUFDRixRQUFNLGlCQUFpQixHQUFHLE1BbkNsQixPQUFPLENBbUNtQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQztV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QUFFLGNBdEdSLE9BQU8sQ0FzR1MsVUFBVSxDQUFDLENBQUMsRUFDakYsY0F0R2lDLG1CQUFtQixDQXNHaEMsS0FBSyxFQUFFLENBQzFCLGNBdkdxRCxrQkFBa0IsT0FTakUsUUFBUSxFQThGZSxjQXpHNEIsY0FBYyxDQTBHdEUsY0ExR3dELGNBQWMsQ0EwR3ZELGNBMUd5RCxVQUFVLENBMEd4RCxTQUFTLENBQUMsRUFBRSxDQUFFLGNBekdXLE9BQU8sQ0F5R1YsVUFBVSxDQUFDLENBQUUsQ0FBQyxFQUM5RCxPQWhHMEIsUUFBUSxDQWdHdEIsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDO09BRXJCLFNBQVMsR0FBRyxjQTVHWixtQkFBbUIsQ0E0R2EsY0E1R3NCLE9BQU8sQ0E0R3JCLFlBQVksQ0FBQyxDQUFDO09BRXRELFlBQVksR0FBRyxDQUFFLGNBOUdxQyxPQUFPLENBOEdwQyxTQUFTLENBQUMsQ0FBRTtPQUNyQyxZQUFZLEdBQUcsT0FyR0csU0FBUyxDQXFHQyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGVNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJheUV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEJsb2NrU3RhdGVtZW50LCBDYWxsRXhwcmVzc2lvbiwgSWRlbnRpZmllcixcblx0RXhwcmVzc2lvblN0YXRlbWVudCwgRnVuY3Rpb25FeHByZXNzaW9uLCBJZlN0YXRlbWVudCwgTGl0ZXJhbCwgT2JqZWN0RXhwcmVzc2lvbiwgUHJvZ3JhbSxcblx0UmV0dXJuU3RhdGVtZW50LCBVbmFyeUV4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRpb24sIFZhcmlhYmxlRGVjbGFyYXRvclxuXHR9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IHsgaWRDYWNoZWQsIG1lbWJlciB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcbmltcG9ydCB7IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4gfSBmcm9tICdlc2FzdC9kaXN0L3NwZWNpYWxpemUnXG5pbXBvcnQgbWFuZ2xlUGF0aCBmcm9tICcuLi9tYW5nbGVQYXRoJ1xuaW1wb3J0IHsgZmxhdE1hcCwgaXNFbXB0eSwgbGFzdCB9IGZyb20gJy4uL1UvQmFnJ1xuaW1wb3J0IHsgTm9uZSwgb3BJZiB9IGZyb20gJy4uL1UvT3AnXG5pbXBvcnQgeyBpZEZvckRlY2xhcmVDYWNoZWQgfSBmcm9tICcuL2VzYXN0LXV0aWwnXG5pbXBvcnQgeyB0MyB9IGZyb20gJy4vdHJhbnNwaWxlJ1xuaW1wb3J0IHsgSWREZWZpbmUsIElkRXhwb3J0cywgSWRNb2R1bGUsIGxhenlXcmFwLFxuXHRtc0dldE1vZHVsZSwgbXNMYXp5R2V0TW9kdWxlLCBtc0dldERlZmF1bHRFeHBvcnQsXG5cdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzLCBtc0xhenkgfSBmcm9tICcuL3V0aWwnXG5cbi8qXG4ndXNlIHN0cmljdCc7XG5pZiAodHlwZW9mIGRlZmluZSAhPT0gJ2Z1bmN0aW9uJylcblx0dmFyIGRlZmluZSA9IHJlcXVpcmUoJ2FtZGVmaW5lJykobW9kdWxlKTtcbmRlZmluZShbJ2V4cG9ydHMnLCAnYScsICdiJywgJ2MnXSwgZnVuY3Rpb24oZXhwb3J0cykge1xuXHQvLyBGYWtlIGV4cG9ydHMgLS0ganVzdCBhIGdldHRlci5cblx0ZXhwb3J0cy5fZ2V0ID0gX21zLmxhenkoZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgZXhwb3J0cyA9IHt9IC8vIFJlYWwgZXhwb3J0c1xuXHRcdC4uLiBpbXBvcnRzIC4uLlxuXHRcdHtcblx0XHRcdC4uLiBleHBvcnRzIC4uLlxuXHRcdH1cblx0XHRyZXR1cm4gZXhwb3J0c1xuXHR9KVxufSlcbiovXG5leHBvcnQgZGVmYXVsdCAoXywgY3gpID0+IHtcblx0Y29uc3QgYWxsVXNlcyA9IF8uZG9Vc2VzLmNvbmNhdChfLnVzZXMsIF8uZGVidWdVc2VzKVxuXHRjb25zdCBhbWROYW1lcyA9IEFycmF5RXhwcmVzc2lvbihBbWRGaXJzdFVzZXMuY29uY2F0KFxuXHRcdGFsbFVzZXMubWFwKHVzZSA9PiBMaXRlcmFsKG1hbmdsZVBhdGgodXNlLnBhdGgpKSkpKVxuXHRjb25zdCB1c2VJZGVudGlmaWVycyA9IGFsbFVzZXMubWFwKHVzZUlkZW50aWZpZXIpXG5cdGNvbnN0IGFtZEFyZ3MgPSBBbWRGaXJzdEFyZ3MuY29uY2F0KHVzZUlkZW50aWZpZXJzKVxuXHRjb25zdCB1c2VEb3MgPSBfLmRvVXNlcy5tYXAoKHVzZSwgaSkgPT4ge1xuXHRcdGNvbnN0IGQgPSBFeHByZXNzaW9uU3RhdGVtZW50KG1zR2V0TW9kdWxlKHVzZUlkZW50aWZpZXJzW2ldKSlcblx0XHRkLmxvYyA9IHVzZS5sb2Ncblx0XHRyZXR1cm4gZFxuXHR9KVxuXHRjb25zdCBhbGxVc2VEZWNsYXJhdG9ycyA9IGZsYXRNYXAoXy51c2VzLmNvbmNhdChfLmRlYnVnVXNlcyksICh1c2UsIGkpID0+XG5cdFx0dXNlRGVjbGFyYXRvcnMoY3gsIHVzZSwgdXNlSWRlbnRpZmllcnNbaSArIF8uZG9Vc2VzLmxlbmd0aF0pKVxuXHRjb25zdCBvcFVzZURlY2xhcmUgPSBvcElmKCFpc0VtcHR5KGFsbFVzZURlY2xhcmF0b3JzKSxcblx0XHQoKSA9PiBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIGFsbFVzZURlY2xhcmF0b3JzKSlcblxuXHQvLyBUT0RPOiBTb21lIHdheSBvZiBkZXRlcm1pbmluZyB3aGVuIGl0J3MgT0sgZm9yIGEgbW9kdWxlIHRvIG5vdCBiZSBsYXp5LlxuXHRjb25zdCBpc0xhenkgPSBjeC5vcHRzLmxhenlNb2R1bGUoKVxuXG5cdGNvbnN0IGxlYWQgPSB1c2VEb3MuY29uY2F0KG9wVXNlRGVjbGFyZSwgb3BJZihpc0xhenksICgpID0+IERlY2xhcmVFeHBvcnRzKSlcblx0Y29uc3QgdHJhaWwgPSBbIFJldHVyblN0YXRlbWVudChJZEV4cG9ydHMpIF1cblx0Y29uc3QgbW9kdWxlQm9keSA9IHQzKF8uYmxvY2ssIGxlYWQsIE5vbmUsIHRyYWlsKVxuXHRjb25zdCBib2R5ID1cblx0XHRpc0xhenkgP1xuXHRcdFx0QmxvY2tTdGF0ZW1lbnQoWyBsYXp5Qm9keShtb2R1bGVCb2R5KSBdKVxuXHRcdFx0OiBtb2R1bGVCb2R5XG5cblx0Y29uc3QgZG9EZWZpbmUgPSBFeHByZXNzaW9uU3RhdGVtZW50KFxuXHRcdENhbGxFeHByZXNzaW9uKElkRGVmaW5lLCBbXG5cdFx0XHRhbWROYW1lcyxcblx0XHRcdEZ1bmN0aW9uRXhwcmVzc2lvbihudWxsLCBhbWRBcmdzLCBib2R5KSBdKSlcblxuXHRjb25zdCBwYXJ0cyA9IG9wSWYoY3gub3B0cy5pbmNsdWRlVXNlU3RyaWN0KCksICgpID0+IFVzZVN0cmljdCkuY29uY2F0KFxuXHRcdG9wSWYoY3gub3B0cy5hbWRlZmluZSgpLCAoKSA9PiBBbWRlZmluZUhlYWRlciksXG5cdFx0WyBkb0RlZmluZSBdKVxuXHRyZXR1cm4gUHJvZ3JhbShwYXJ0cylcbn1cblxuY29uc3QgdXNlRGVjbGFyYXRvcnMgPSAoY3gsIF8sIG1vZHVsZUlkZW50aWZpZXIpID0+IHtcblx0Ly8gVE9ETzogQ291bGQgYmUgbmVhdGVyIGFib3V0IHRoaXNcblx0Y29uc3QgaXNMYXp5ID0gKGlzRW1wdHkoXy51c2VkKSA/IF8ub3BVc2VEZWZhdWx0WzBdIDogXy51c2VkWzBdKS5pc0xhenlcblx0Y29uc3QgdmFsdWUgPSAoaXNMYXp5ID8gbXNMYXp5R2V0TW9kdWxlIDogbXNHZXRNb2R1bGUpKG1vZHVsZUlkZW50aWZpZXIpXG5cblx0Y29uc3QgdXNlZERlZmF1bHQgPSBfLm9wVXNlRGVmYXVsdC5tYXAoZGVmID0+IHtcblx0XHRjb25zdCBkZWZleHAgPSBtc0dldERlZmF1bHRFeHBvcnQobW9kdWxlSWRlbnRpZmllcilcblx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0Y29uc3QgdmQgPSBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGRlZiksIHZhbClcblx0XHR2ZC5sb2MgPSBkZWYubG9jXG5cdFx0cmV0dXJuIHZkXG5cdH0pXG5cblx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eShfLnVzZWQpID8gW10gOlxuXHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKGN4LCBfLmxvYywgXy51c2VkLCBpc0xhenksIHZhbHVlLCAnPScsIHRydWUpXG5cdHVzZWREZXN0cnVjdC5mb3JFYWNoKF8gPT4gXy5sb2MgPSBfLmxvYylcblxuXHRyZXR1cm4gdXNlZERlZmF1bHQuY29uY2F0KHVzZWREZXN0cnVjdClcbn1cblxuY29uc3Rcblx0dXNlSWRlbnRpZmllciA9ICh1c2UsIGkpID0+IGlkQ2FjaGVkKGAke2xhc3QodXNlLnBhdGguc3BsaXQoJy8nKSl9XyR7aX1gKSxcblxuXHQvLyBjb25zdCBleHBvcnRzID0geyB9XG5cdERlY2xhcmVFeHBvcnRzID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBbXG5cdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkRXhwb3J0cywgT2JqZWN0RXhwcmVzc2lvbihbXSkpXSksXG5cblx0bGF6eUJvZHkgPSBib2R5ID0+XG5cdFx0RXhwcmVzc2lvblN0YXRlbWVudChcblx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4obWVtYmVyKElkRXhwb3J0cywgJ19nZXQnKSwgbXNMYXp5KFxuXHRcdFx0XHRGdW5jdGlvbkV4cHJlc3Npb24obnVsbCwgWyBdLCBib2R5KSkpKSxcblxuXHQvLyBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ2Z1bmN0aW9uJykgdmFyIGRlZmluZSA9IHJlcXVpcmUoJ2FtZGVmaW5lJykobW9kdWxlKVxuXHRBbWRlZmluZUhlYWRlciA9IElmU3RhdGVtZW50KFxuXHRcdEJpbmFyeUV4cHJlc3Npb24oJyE9PScsIFVuYXJ5RXhwcmVzc2lvbigndHlwZW9mJywgSWREZWZpbmUpLCBMaXRlcmFsKCdmdW5jdGlvbicpKSxcblx0XHRWYXJpYWJsZURlY2xhcmF0aW9uKCd2YXInLCBbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWREZWZpbmUsIENhbGxFeHByZXNzaW9uKFxuXHRcdFx0XHRDYWxsRXhwcmVzc2lvbihJZGVudGlmaWVyKCdyZXF1aXJlJyksIFsgTGl0ZXJhbCgnYW1kZWZpbmUnKSBdKSxcblx0XHRcdFx0WyBJZE1vZHVsZSBdKSkgXSkpLFxuXG5cdFVzZVN0cmljdCA9IEV4cHJlc3Npb25TdGF0ZW1lbnQoTGl0ZXJhbCgndXNlIHN0cmljdCcpKSxcblxuXHRBbWRGaXJzdFVzZXMgPSBbIExpdGVyYWwoJ2V4cG9ydHMnKSBdLFxuXHRBbWRGaXJzdEFyZ3MgPSBbIElkRXhwb3J0cyBdXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==