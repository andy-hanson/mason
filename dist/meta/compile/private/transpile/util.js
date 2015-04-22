if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', '../U/Bag', '../U/Op', '../U/util', './transpile', './esast-util'], function (exports, _esastDistAst, _esastDistUtil, _UBag, _UOp, _UUtil, _transpile, _esastUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const LitEmptyArray = _esastDistAst.ArrayExpression([]),
	      LitEmptyString = _esastDistAst.Literal(''),
	      LitNull = _esastDistAst.Literal(null),
	      LitStrDisplayName = _esastDistAst.Literal('displayName'),
	      Break = _esastDistAst.BreakStatement(),
	      ReturnRes = _esastDistAst.ReturnStatement(_esastDistAst.Identifier('res')),
	      IdDefine = _esastDistAst.Identifier('define'),
	      IdDisplayName = _esastDistAst.Identifier('displayName'),
	      IdExports = _esastDistAst.Identifier('exports'),
	      IdArguments = _esastDistAst.Identifier('arguments'),
	      IdArraySliceCall = _esastDistUtil.member(_esastDistUtil.member(LitEmptyArray, 'slice'), 'call'),
	      IdFunctionApplyCall = _esastDistUtil.member(_esastDistUtil.member(_esastDistAst.Identifier('Function'), 'apply'), 'call'),
	      IdModule = _esastDistAst.Identifier('module'),
	      IdMs = _esastDistAst.Identifier('_ms');

	exports.LitEmptyArray = LitEmptyArray;
	exports.LitEmptyString = LitEmptyString;
	exports.LitNull = LitNull;
	exports.LitStrDisplayName = LitStrDisplayName;
	exports.Break = Break;
	exports.ReturnRes = ReturnRes;
	exports.IdDefine = IdDefine;
	exports.IdDisplayName = IdDisplayName;
	exports.IdExports = IdExports;
	exports.IdArguments = IdArguments;
	exports.IdArraySliceCall = IdArraySliceCall;
	exports.IdFunctionApplyCall = IdFunctionApplyCall;
	exports.IdModule = IdModule;
	exports.IdMs = IdMs;
	const ms = function (name) {
		const m = _esastDistUtil.member(IdMs, name);
		return function (args) {
			return _esastDistAst.CallExpression(m, args);
		};
	};
	const msGetDefaultExport = ms('getDefaultExport'),
	      msGet = ms('get'),
	      msGetModule = ms('getModule'),
	      msLazyGetModule = ms('lazyGetModule'),
	      msArr = ms('arr'),
	      msBool = ms('bool'),
	      msLset = ms('lset'),
	      msSet = ms('set'),
	      msMap = ms('map'),
	      msShow = ms('show'),
	      msCheckContains = ms('checkContains'),
	      msUnlazy = ms('unlazy'),
	      msLazy = ms('lazy'),
	      msLazyGet = ms('lazyProp');

	exports.msGetDefaultExport = msGetDefaultExport;
	exports.msGet = msGet;
	exports.msGetModule = msGetModule;
	exports.msLazyGetModule = msLazyGetModule;
	exports.msArr = msArr;
	exports.msBool = msBool;
	exports.msLset = msLset;
	exports.msSet = msSet;
	exports.msMap = msMap;
	exports.msShow = msShow;
	exports.msCheckContains = msCheckContains;
	exports.msUnlazy = msUnlazy;
	exports.msLazy = msLazy;
	exports.msLazyGet = msLazyGet;
	const makeDestructureDeclarators = function (cx, loc, assignees, isLazy, value, k, isModule) {
		const destructuredName = '_$' + loc.start.line;
		const idDestructured = _esastDistAst.Identifier(destructuredName);
		const declarators = assignees.map(function (assignee) {
			// TODO: Don't compile it if it's never accessed
			const get = getMember(cx, idDestructured, assignee.name, isLazy, isModule);
			return makeDeclarator(cx, assignee.loc, assignee, k, get, isLazy);
		});
		// Getting lazy module is done by ms.lazyGetModule.
		const val = isLazy && !isModule ? lazyWrap(value) : value;
		return _UBag.unshift(_esastDistAst.VariableDeclarator(idDestructured, val), declarators);
	};

	exports.makeDestructureDeclarators = makeDestructureDeclarators;
	const getMember = function (cx, astObject, gotName, isLazy, isModule) {
		if (isLazy) return msLazyGet([astObject, _esastDistAst.Literal(gotName)]);else if (isModule && cx.opts.includeUseChecks()) return msGet([astObject, _esastDistAst.Literal(gotName)]);else return _esastDistUtil.member(astObject, gotName);
	};

	const makeDeclarator = function (cx, loc, assignee, k, value, valueIsAlreadyLazy) {
		// TODO: assert(isEmpty(assignee.opType))
		// or TODO: Allow type check on lazy value?
		value = assignee.isLazy ? value : maybeWrapInCheckContains(cx, value, assignee.opType, assignee.name);
		switch (k) {
			case '=':case '. ':case '<~':case '<~~':
				{
					const val = assignee.isLazy && !valueIsAlreadyLazy ? lazyWrap(value) : value;
					_UUtil.assert(assignee.isLazy || !valueIsAlreadyLazy);
					return _esastDistAst.VariableDeclarator(_esastUtil.idForDeclareCached(assignee), val);
				}
			case 'export':
				{
					// TODO:ES6
					_UUtil.assert(!assignee.isLazy);
					return _esastDistAst.VariableDeclarator(_esastUtil.idForDeclareCached(assignee), _esastDistAst.AssignmentExpression('=', _esastDistUtil.member(IdExports, assignee.name), value));
				}
			default:
				throw new Error(k);
		}
	};

	exports.makeDeclarator = makeDeclarator;
	const accessLocal = function (localAccess, vr) {
		return accessLocalDeclare(vr.accessToLocal.get(localAccess));
	};

	exports.accessLocal = accessLocal;
	const accessLocalDeclare = function (localDeclare) {
		return localDeclare.isLazy ? msUnlazy([_esastUtil.idForDeclareCached(localDeclare)]) : _esastUtil.idForDeclareNew(localDeclare);
	};

	exports.accessLocalDeclare = accessLocalDeclare;
	const maybeWrapInCheckContains = function (cx, ast, opType, name) {
		return cx.opts.includeTypeChecks() ? _UOp.ifElse(opType, function (typ) {
			return msCheckContains([_transpile.t(typ), ast, _esastDistAst.Literal(name)]);
		}, function () {
			return ast;
		}) : ast;
	};

	exports.maybeWrapInCheckContains = maybeWrapInCheckContains;
	const opLocalCheck = function (cx, local, isLazy) {
		// TODO: Way to typecheck lazies
		if (!cx.opts.includeTypeChecks() || isLazy) return _UOp.None;else return local.opType.map(function (typ) {
			return _esastDistAst.ExpressionStatement(msCheckContains([_transpile.t(typ), accessLocalDeclare(local), _esastDistAst.Literal(local.name)]));
		});
	};

	exports.opLocalCheck = opLocalCheck;
	const lazyWrap = function (value) {
		return msLazy([_esastDistUtil.thunk(value)]);
	};
	exports.lazyWrap = lazyWrap;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVNPLE9BQ04sYUFBYSxHQUFHLGNBVlIsZUFBZSxDQVVTLEVBQUUsQ0FBQztPQUNuQyxjQUFjLEdBQUcsY0FWTCxPQUFPLENBVU0sRUFBRSxDQUFDO09BQzVCLE9BQU8sR0FBRyxjQVhFLE9BQU8sQ0FXRCxJQUFJLENBQUM7T0FDdkIsaUJBQWlCLEdBQUcsY0FaUixPQUFPLENBWVMsYUFBYSxDQUFDO09BQzFDLEtBQUssR0FBRyxjQWR1QyxjQUFjLEVBY3JDO09BQ3hCLFNBQVMsR0FBRyxjQWRTLGVBQWUsQ0FjUixjQWQ1QixVQUFVLENBYzZCLEtBQUssQ0FBQyxDQUFDO09BQzlDLFFBQVEsR0FBRyxjQWZYLFVBQVUsQ0FlWSxRQUFRLENBQUM7T0FDL0IsYUFBYSxHQUFHLGNBaEJoQixVQUFVLENBZ0JpQixhQUFhLENBQUM7T0FDekMsU0FBUyxHQUFHLGNBakJaLFVBQVUsQ0FpQmEsU0FBUyxDQUFDO09BQ2pDLFdBQVcsR0FBRyxjQWxCZCxVQUFVLENBa0JlLFdBQVcsQ0FBQztPQUNyQyxnQkFBZ0IsR0FBRyxlQWxCWCxNQUFNLENBa0JZLGVBbEJsQixNQUFNLENBa0JtQixhQUFhLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDO09BQ2pFLG1CQUFtQixHQUFHLGVBbkJkLE1BQU0sQ0FtQmUsZUFuQnJCLE1BQU0sQ0FtQnNCLGNBcEJwQyxVQUFVLENBb0JxQyxVQUFVLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUM7T0FDN0UsUUFBUSxHQUFHLGNBckJYLFVBQVUsQ0FxQlksUUFBUSxDQUFDO09BQy9CLElBQUksR0FBRyxjQXRCUCxVQUFVLENBc0JRLEtBQUssQ0FBQyxDQUFBOztTQWJ4QixhQUFhLEdBQWIsYUFBYTtTQUNiLGNBQWMsR0FBZCxjQUFjO1NBQ2QsT0FBTyxHQUFQLE9BQU87U0FDUCxpQkFBaUIs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LEdBQzFCLEtBL0ZPLE1BQU0sQ0ErRk4sTUFBTSxFQUNaLFVBQUEsR0FBRztVQUFJLGVBQWUsQ0FBQyxDQUFFLFdBOUZuQixDQUFDLENBOEZvQixHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsY0FuRzVCLE9BQU8sQ0FtRzZCLElBQUksQ0FBQyxDQUFFLENBQUM7R0FBQSxFQUN0RDtVQUFNLEdBQUc7R0FBQSxDQUFDLEdBQ1gsR0FBRztFQUFBLENBQUE7O1NBTFEsd0JBQXdCLEdBQXhCLHdCQUF3QjtBQU85QixPQUFNLFlBQVksR0FBRyxVQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFLOztBQUVsRCxNQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLE1BQU0sRUFDekMsWUF2R2UsSUFBSSxDQXVHUixLQUNQLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO1VBQy9CLGNBN0c4RSxtQkFBbUIsQ0E2RzdFLGVBQWUsQ0FBQyxDQUNuQyxXQXhHTSxDQUFDLENBd0dMLEdBQUcsQ0FBQyxFQUNOLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUN6QixjQS9HVSxPQUFPLENBK0dULEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FBQSxDQUFDLENBQUE7RUFDekIsQ0FBQTs7U0FUWSxZQUFZLEdBQVosWUFBWTtBQVdsQixPQUFNLFFBQVEsR0FBRyxVQUFBLEtBQUs7U0FBSSxNQUFNLENBQUMsQ0FBRSxlQWpIekIsS0FBSyxDQWlIMEIsS0FBSyxDQUFDLENBQUUsQ0FBQztFQUFBLENBQUE7U0FBNUMsUUFBUSxHQUFSLFFBQVEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdHJhbnNwaWxlL3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJheUV4cHJlc3Npb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCcmVha1N0YXRlbWVudCwgQ2FsbEV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsXG5cdElkZW50aWZpZXIsIExpdGVyYWwsIFJldHVyblN0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdG9yIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBtZW1iZXIsIHRodW5rIH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuaW1wb3J0IHsgdW5zaGlmdCB9IGZyb20gJy4uL1UvQmFnJ1xuaW1wb3J0IHsgaWZFbHNlLCBOb25lIH0gZnJvbSAnLi4vVS9PcCdcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uL1UvdXRpbCdcbmltcG9ydCB7IHQgfSBmcm9tICcuL3RyYW5zcGlsZSdcbmltcG9ydCB7IGlkRm9yRGVjbGFyZUNhY2hlZCwgaWRGb3JEZWNsYXJlTmV3IH0gZnJvbSAnLi9lc2FzdC11dGlsJ1xuXG5leHBvcnQgY29uc3Rcblx0TGl0RW1wdHlBcnJheSA9IEFycmF5RXhwcmVzc2lvbihbXSksXG5cdExpdEVtcHR5U3RyaW5nID0gTGl0ZXJhbCgnJyksXG5cdExpdE51bGwgPSBMaXRlcmFsKG51bGwpLFxuXHRMaXRTdHJEaXNwbGF5TmFtZSA9IExpdGVyYWwoJ2Rpc3BsYXlOYW1lJyksXG5cdEJyZWFrID0gQnJlYWtTdGF0ZW1lbnQoKSxcblx0UmV0dXJuUmVzID0gUmV0dXJuU3RhdGVtZW50KElkZW50aWZpZXIoJ3JlcycpKSxcblx0SWREZWZpbmUgPSBJZGVudGlmaWVyKCdkZWZpbmUnKSxcblx0SWREaXNwbGF5TmFtZSA9IElkZW50aWZpZXIoJ2Rpc3BsYXlOYW1lJyksXG5cdElkRXhwb3J0cyA9IElkZW50aWZpZXIoJ2V4cG9ydHMnKSxcblx0SWRBcmd1bWVudHMgPSBJZGVudGlmaWVyKCdhcmd1bWVudHMnKSxcblx0SWRBcnJheVNsaWNlQ2FsbCA9IG1lbWJlcihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ3NsaWNlJyksICdjYWxsJyksXG5cdElkRnVuY3Rpb25BcHBseUNhbGwgPSBtZW1iZXIobWVtYmVyKElkZW50aWZpZXIoJ0Z1bmN0aW9uJyksICdhcHBseScpLCAnY2FsbCcpLFxuXHRJZE1vZHVsZSA9IElkZW50aWZpZXIoJ21vZHVsZScpLFxuXHRJZE1zID0gSWRlbnRpZmllcignX21zJylcblxuY29uc3QgbXMgPSBuYW1lID0+IHtcblx0Y29uc3QgbSA9IG1lbWJlcihJZE1zLCBuYW1lKVxuXHRyZXR1cm4gYXJncyA9PiBDYWxsRXhwcmVzc2lvbihtLCBhcmdzKVxufVxuZXhwb3J0IGNvbnN0XG5cdG1zR2V0RGVmYXVsdEV4cG9ydCA9IG1zKCdnZXREZWZhdWx0RXhwb3J0JyksXG5cdG1zR2V0ID0gbXMoJ2dldCcpLFxuXHRtc0dldE1vZHVsZSA9IG1zKCdnZXRNb2R1bGUnKSxcblx0bXNMYXp5R2V0TW9kdWxlID0gbXMoJ2xhenlHZXRNb2R1bGUnKSxcblx0bXNBcnIgPSBtcygnYXJyJyksXG5cdG1zQm9vbCA9IG1zKCdib29sJyksXG5cdG1zTHNldCA9IG1zKCdsc2V0JyksXG5cdG1zU2V0ID0gbXMoJ3NldCcpLFxuXHRtc01hcCA9IG1zKCdtYXAnKSxcblx0bXNTaG93ID0gbXMoJ3Nob3cnKSxcblx0bXNDaGVja0NvbnRhaW5zID0gbXMoJ2NoZWNrQ29udGFpbnMnKSxcblx0bXNVbmxhenkgPSBtcygndW5sYXp5JyksXG5cdG1zTGF6eSA9IG1zKCdsYXp5JyksXG5cdG1zTGF6eUdldCA9IG1zKCdsYXp5UHJvcCcpXG5cbmV4cG9ydCBjb25zdCBtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyA9IChjeCwgbG9jLCBhc3NpZ25lZXMsIGlzTGF6eSwgdmFsdWUsIGssIGlzTW9kdWxlKSA9PiB7XG5cdGNvbnN0IGRlc3RydWN0dXJlZE5hbWUgPSBgXyQke2xvYy5zdGFydC5saW5lfWBcblx0Y29uc3QgaWREZXN0cnVjdHVyZWQgPSBJZGVudGlmaWVyKGRlc3RydWN0dXJlZE5hbWUpXG5cdGNvbnN0IGRlY2xhcmF0b3JzID0gYXNzaWduZWVzLm1hcChhc3NpZ25lZSA9PiB7XG5cdFx0Ly8gVE9ETzogRG9uJ3QgY29tcGlsZSBpdCBpZiBpdCdzIG5ldmVyIGFjY2Vzc2VkXG5cdFx0Y29uc3QgZ2V0ID0gZ2V0TWVtYmVyKGN4LCBpZERlc3RydWN0dXJlZCwgYXNzaWduZWUubmFtZSwgaXNMYXp5LCBpc01vZHVsZSlcblx0XHRyZXR1cm4gbWFrZURlY2xhcmF0b3IoY3gsIGFzc2lnbmVlLmxvYywgYXNzaWduZWUsIGssIGdldCwgaXNMYXp5KVxuXHR9KVxuXHQvLyBHZXR0aW5nIGxhenkgbW9kdWxlIGlzIGRvbmUgYnkgbXMubGF6eUdldE1vZHVsZS5cblx0Y29uc3QgdmFsID0gKGlzTGF6eSAmJiAhaXNNb2R1bGUpID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0cmV0dXJuIHVuc2hpZnQoVmFyaWFibGVEZWNsYXJhdG9yKGlkRGVzdHJ1Y3R1cmVkLCB2YWwpLCBkZWNsYXJhdG9ycylcbn1cblxuY29uc3QgZ2V0TWVtYmVyID0gKGN4LCBhc3RPYmplY3QsIGdvdE5hbWUsIGlzTGF6eSwgaXNNb2R1bGUpID0+IHtcblx0aWYgKGlzTGF6eSlcblx0XHRyZXR1cm4gbXNMYXp5R2V0KFsgYXN0T2JqZWN0LCBMaXRlcmFsKGdvdE5hbWUpIF0pXG5cdGVsc2UgaWYgKGlzTW9kdWxlICYmIGN4Lm9wdHMuaW5jbHVkZVVzZUNoZWNrcygpKVxuXHRcdHJldHVybiBtc0dldChbIGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSBdKVxuXHRlbHNlXG5cdFx0cmV0dXJuIG1lbWJlcihhc3RPYmplY3QsIGdvdE5hbWUpXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlRGVjbGFyYXRvciA9IChjeCwgbG9jLCBhc3NpZ25lZSwgaywgdmFsdWUsIHZhbHVlSXNBbHJlYWR5TGF6eSkgPT4ge1xuXHQvLyBUT0RPOiBhc3NlcnQoaXNFbXB0eShhc3NpZ25lZS5vcFR5cGUpKVxuXHQvLyBvciBUT0RPOiBBbGxvdyB0eXBlIGNoZWNrIG9uIGxhenkgdmFsdWU/XG5cdHZhbHVlID0gYXNzaWduZWUuaXNMYXp5ID8gdmFsdWUgOlxuXHRcdG1heWJlV3JhcEluQ2hlY2tDb250YWlucyhjeCwgdmFsdWUsIGFzc2lnbmVlLm9wVHlwZSwgYXNzaWduZWUubmFtZSlcblx0c3dpdGNoIChrKSB7XG5cdFx0Y2FzZSAnPSc6IGNhc2UgJy4gJzogY2FzZSAnPH4nOiBjYXNlICc8fn4nOiB7XG5cdFx0XHRjb25zdCB2YWwgPSBhc3NpZ25lZS5pc0xhenkgJiYgIXZhbHVlSXNBbHJlYWR5TGF6eSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0XHRhc3NlcnQoYXNzaWduZWUuaXNMYXp5IHx8ICF2YWx1ZUlzQWxyZWFkeUxhenkpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksIHZhbClcblx0XHR9XG5cdFx0Y2FzZSAnZXhwb3J0Jzoge1xuXHRcdFx0Ly8gVE9ETzpFUzZcblx0XHRcdGFzc2VydCghYXNzaWduZWUuaXNMYXp5KVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihcblx0XHRcdFx0aWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSxcblx0XHRcdFx0QXNzaWdubWVudEV4cHJlc3Npb24oJz0nLCBtZW1iZXIoSWRFeHBvcnRzLCBhc3NpZ25lZS5uYW1lKSwgdmFsdWUpKVxuXHRcdH1cblx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3Ioaylcblx0fVxufVxuXG5leHBvcnQgY29uc3QgYWNjZXNzTG9jYWwgPSAobG9jYWxBY2Nlc3MsIHZyKSA9PlxuXHRhY2Nlc3NMb2NhbERlY2xhcmUodnIuYWNjZXNzVG9Mb2NhbC5nZXQobG9jYWxBY2Nlc3MpKVxuXG5leHBvcnQgY29uc3QgYWNjZXNzTG9jYWxEZWNsYXJlID0gbG9jYWxEZWNsYXJlID0+XG5cdGxvY2FsRGVjbGFyZS5pc0xhenkgP1xuXHRcdG1zVW5sYXp5KFsgaWRGb3JEZWNsYXJlQ2FjaGVkKGxvY2FsRGVjbGFyZSkgXSkgOlxuXHRcdGlkRm9yRGVjbGFyZU5ldyhsb2NhbERlY2xhcmUpXG5cbmV4cG9ydCBjb25zdCBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMgPSAoY3gsIGFzdCwgb3BUeXBlLCBuYW1lKSA9PlxuXHRjeC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCkgP1xuXHRcdGlmRWxzZShvcFR5cGUsXG5cdFx0XHR0eXAgPT4gbXNDaGVja0NvbnRhaW5zKFsgdCh0eXApLCBhc3QsIExpdGVyYWwobmFtZSkgXSksXG5cdFx0XHQoKSA9PiBhc3QpIDpcblx0XHRhc3RcblxuZXhwb3J0IGNvbnN0IG9wTG9jYWxDaGVjayA9IChjeCwgbG9jYWwsIGlzTGF6eSkgPT4ge1xuXHQvLyBUT0RPOiBXYXkgdG8gdHlwZWNoZWNrIGxhemllc1xuXHRpZiAoIWN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSB8fCBpc0xhenkpXG5cdFx0cmV0dXJuIE5vbmVcblx0ZWxzZSByZXR1cm4gbG9jYWwub3BUeXBlLm1hcCh0eXAgPT5cblx0XHRFeHByZXNzaW9uU3RhdGVtZW50KG1zQ2hlY2tDb250YWlucyhbXG5cdFx0XHR0KHR5cCksXG5cdFx0XHRhY2Nlc3NMb2NhbERlY2xhcmUobG9jYWwpLFxuXHRcdFx0TGl0ZXJhbChsb2NhbC5uYW1lKV0pKSlcbn1cblxuZXhwb3J0IGNvbnN0IGxhenlXcmFwID0gdmFsdWUgPT4gbXNMYXp5KFsgdGh1bmsodmFsdWUpIF0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==