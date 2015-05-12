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
		return function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _esastDistAst.CallExpression(m, args);
		};
	};
	const msGetDefaultExport = ms('getDefaultExport'),
	      msGet = ms('get'),
	      msGetModule = ms('getModule'),
	      msLazyGetModule = ms('lazyGetModule'),
	      msArr = ms('arr'),
	      msBool = ms('bool'),
	      msExtract = ms('extract'),
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
	exports.msExtract = msExtract;
	exports.msLset = msLset;
	exports.msSet = msSet;
	exports.msMap = msMap;
	exports.msShow = msShow;
	exports.msCheckContains = msCheckContains;
	exports.msUnlazy = msUnlazy;
	exports.msLazy = msLazy;
	exports.msLazyGet = msLazyGet;
	const makeDestructureDeclarators = function (cx, loc, assignees, isLazy, value, isModule, isExport) {
		const destructuredName = '_$' + loc.start.line;
		const idDestructured = _esastDistAst.Identifier(destructuredName);
		const declarators = assignees.map(function (assignee) {
			// TODO: Don't compile it if it's never accessed
			const get = getMember(cx, idDestructured, assignee.name, isLazy, isModule);
			return makeDeclarator(cx, assignee.loc, assignee, get, isLazy, isExport);
		});
		// Getting lazy module is done by ms.lazyGetModule.
		const val = isLazy && !isModule ? lazyWrap(value) : value;
		return _UBag.unshift(_esastDistAst.VariableDeclarator(idDestructured, val), declarators);
	},
	      makeDeclarator = function (cx, loc, assignee, value, valueIsAlreadyLazy, isExport) {
		// TODO: assert(isEmpty(assignee.opType))
		// or TODO: Allow type check on lazy value?
		value = assignee.isLazy ? value : maybeWrapInCheckContains(cx, value, assignee.opType, assignee.name);

		if (isExport) {
			// TODO:ES6
			cx.check(!assignee.isLazy, assignee.loc, 'Lazy export not supported.');
			return _esastDistAst.VariableDeclarator(_esastUtil.idForDeclareCached(assignee), _esastDistAst.AssignmentExpression('=', _esastDistUtil.member(IdExports, assignee.name), value));
		} else {
			const val = assignee.isLazy && !valueIsAlreadyLazy ? lazyWrap(value) : value;
			_UUtil.assert(assignee.isLazy || !valueIsAlreadyLazy);
			return _esastDistAst.VariableDeclarator(_esastUtil.idForDeclareCached(assignee), val);
		}
	},
	      accessLocal = function (localAccess, vr) {
		return accessLocalDeclare(vr.accessToLocal.get(localAccess));
	},
	      accessLocalDeclare = function (localDeclare) {
		return localDeclare.isLazy ? msUnlazy(_esastUtil.idForDeclareCached(localDeclare)) : _esastUtil.idForDeclareNew(localDeclare);
	},
	      maybeWrapInCheckContains = function (cx, ast, opType, name) {
		return cx.opts.includeTypeChecks() ? _UOp.ifElse(opType, function (typ) {
			return msCheckContains(_transpile.t0(typ), ast, _esastDistAst.Literal(name));
		}, function () {
			return ast;
		}) : ast;
	},
	      opLocalCheck = function (cx, local, isLazy) {
		// TODO: Way to typecheck lazies
		if (!cx.opts.includeTypeChecks() || isLazy) return _UOp.None;else return local.opType.map(function (typ) {
			return _esastDistAst.ExpressionStatement(msCheckContains(_transpile.t0(typ), accessLocalDeclare(local), _esastDistAst.Literal(local.name)));
		});
	},
	      lazyWrap = function (value) {
		return msLazy(_esastDistUtil.thunk(value));
	},
	      toStatements = function (_) {
		return _ instanceof Array ? _.map(_esastDistUtil.toStatement) : [_esastDistUtil.toStatement(_)];
	};

	exports.makeDestructureDeclarators = makeDestructureDeclarators;
	exports.makeDeclarator = makeDeclarator;
	exports.accessLocal = accessLocal;
	exports.accessLocalDeclare = accessLocalDeclare;
	exports.maybeWrapInCheckContains = maybeWrapInCheckContains;
	exports.opLocalCheck = opLocalCheck;
	exports.lazyWrap = lazyWrap;
	exports.toStatements = toStatements;
	const getMember = function (cx, astObject, gotName, isLazy, isModule) {
		if (isLazy) return msLazyGet(astObject, _esastDistAst.Literal(gotName));else if (isModule && cx.opts.includeUseChecks()) return msGet(astObject, _esastDistAst.Literal(gotName));else return _esastDistUtil.member(astObject, gotName);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVNPLE9BQ04sYUFBYSxHQUFHLGNBVlIsZUFBZSxDQVVTLEVBQUUsQ0FBQztPQUNuQyxjQUFjLEdBQUcsY0FWTCxPQUFPLENBVU0sRUFBRSxDQUFDO09BQzVCLE9BQU8sR0FBRyxjQVhFLE9BQU8sQ0FXRCxJQUFJLENBQUM7T0FDdkIsaUJBQWlCLEdBQUcsY0FaUixPQUFPLENBWVMsYUFBYSxDQUFDO09BQzFDLEtBQUssR0FBRyxjQWR1QyxjQUFjLEVBY3JDO09BQ3hCLFNBQVMsR0FBRyxjQWRTLGVBQWUsQ0FjUixjQWQ1QixVQUFVLENBYzZCLEtBQUssQ0FBQyxDQUFDO09BQzlDLFFBQVEsR0FBRyxjQWZYLFVBQVUsQ0FlWSxRQUFRLENBQUM7T0FDL0IsYUFBYSxHQUFHLGNBaEJoQixVQUFVLENBZ0JpQixhQUFhLENBQUM7T0FDekMsU0FBUyxHQUFHLGNBakJaLFVBQVUsQ0FpQmEsU0FBUyxDQUFDO09BQ2pDLFdBQVcsR0FBRyxjQWxCZCxVQUFVLENBa0JlLFdBQVcsQ0FBQztPQUNyQyxnQkFBZ0IsR0FBRyxlQWxCWCxNQUFNLENBa0JZLGVBbEJsQixNQUFNLENBa0JtQixhQUFhLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDO09BQ2pFLG1CQUFtQixHQUFHLGVBbkJkLE1BQU0sQ0FtQmUsZUFuQnJCLE1BQU0sQ0FtQnNCLGNBcEJwQyxVQUFVLENBb0JxQyxVQUFVLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUM7T0FDN0UsUUFBUSxHQUFHLGNBckJYLFVBQVUsQ0FxQlksUUFBUSxDQUFDO09BQy9CLElBQUksR0FBRyxjQXRCUCxVQUFVLENBc0JRLEtBQUssQ0FBQyxDQUFBOztTQWJ4QixhQUFhLEdBQWIsYUFBYTtTQUNiLGNBQWMsR0FBZCxjQUFjO1NBQ2QsT0FBTyxHQUFQLE9BQU87U0FDUCxpQkFBaUIs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QyxlQXZHWCxLQUFLLENBdUdZLEtBQUssQ0FBQyxDQUFDO0VBQUE7T0FFeEMsWUFBWSxHQUFHLFVBQUEsQ0FBQztTQUFJLENBQUMsWUFBWSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsZ0JBekd2QixXQUFXLENBeUd5QixHQUFHLENBQUUsZUF6R3pDLFdBQVcsQ0F5RzBDLENBQUMsQ0FBQyxDQUFFO0VBQUEsQ0FBQTs7U0E1RGhGLDBCQUEwQixHQUExQiwwQkFBMEI7U0FhMUIsY0FBYyxHQUFkLGNBQWM7U0FtQmQsV0FBVyxHQUFYLFdBQVc7U0FHWCxrQkFBa0IsR0FBbEIsa0JBQWtCO1NBS2xCLHdCQUF3QixHQUF4Qix3QkFBd0I7U0FPeEIsWUFBWSxHQUFaLFlBQVk7U0FXWixRQUFRLEdBQVIsUUFBUTtTQUVSLFlBQVksR0FBWixZQUFZO0FBRWIsT0FBTSxTQUFTLEdBQUcsVUFBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFLO0FBQy9ELE1BQUksTUFBTSxFQUNULE9BQU8sU0FBUyxDQUFDLFNBQVMsRUFBRSxjQTlHakIsT0FBTyxDQThHa0IsT0FBTyxDQUFDLENBQUMsQ0FBQSxLQUN6QyxJQUFJLFFBQVEsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQzlDLE9BQU8sS0FBSyxDQUFDLFNBQVMsRUFBRSxjQWhIYixPQUFPLENBZ0hjLE9BQU8sQ0FBQyxDQUFDLENBQUEsS0FFekMsT0FBTyxlQWpIQSxNQUFNLENBaUhDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtFQUNsQyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgQnJlYWtTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LFxuXHRJZGVudGlmaWVyLCBMaXRlcmFsLCBSZXR1cm5TdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IHsgbWVtYmVyLCB0aHVuaywgdG9TdGF0ZW1lbnQgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyB1bnNoaWZ0IH0gZnJvbSAnLi4vVS9CYWcnXG5pbXBvcnQgeyBpZkVsc2UsIE5vbmUgfSBmcm9tICcuLi9VL09wJ1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vVS91dGlsJ1xuaW1wb3J0IHsgdDAgfSBmcm9tICcuL3RyYW5zcGlsZSdcbmltcG9ydCB7IGlkRm9yRGVjbGFyZUNhY2hlZCwgaWRGb3JEZWNsYXJlTmV3IH0gZnJvbSAnLi9lc2FzdC11dGlsJ1xuXG5leHBvcnQgY29uc3Rcblx0TGl0RW1wdHlBcnJheSA9IEFycmF5RXhwcmVzc2lvbihbXSksXG5cdExpdEVtcHR5U3RyaW5nID0gTGl0ZXJhbCgnJyksXG5cdExpdE51bGwgPSBMaXRlcmFsKG51bGwpLFxuXHRMaXRTdHJEaXNwbGF5TmFtZSA9IExpdGVyYWwoJ2Rpc3BsYXlOYW1lJyksXG5cdEJyZWFrID0gQnJlYWtTdGF0ZW1lbnQoKSxcblx0UmV0dXJuUmVzID0gUmV0dXJuU3RhdGVtZW50KElkZW50aWZpZXIoJ3JlcycpKSxcblx0SWREZWZpbmUgPSBJZGVudGlmaWVyKCdkZWZpbmUnKSxcblx0SWREaXNwbGF5TmFtZSA9IElkZW50aWZpZXIoJ2Rpc3BsYXlOYW1lJyksXG5cdElkRXhwb3J0cyA9IElkZW50aWZpZXIoJ2V4cG9ydHMnKSxcblx0SWRBcmd1bWVudHMgPSBJZGVudGlmaWVyKCdhcmd1bWVudHMnKSxcblx0SWRBcnJheVNsaWNlQ2FsbCA9IG1lbWJlcihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ3NsaWNlJyksICdjYWxsJyksXG5cdElkRnVuY3Rpb25BcHBseUNhbGwgPSBtZW1iZXIobWVtYmVyKElkZW50aWZpZXIoJ0Z1bmN0aW9uJyksICdhcHBseScpLCAnY2FsbCcpLFxuXHRJZE1vZHVsZSA9IElkZW50aWZpZXIoJ21vZHVsZScpLFxuXHRJZE1zID0gSWRlbnRpZmllcignX21zJylcblxuY29uc3QgbXMgPSBuYW1lID0+IHtcblx0Y29uc3QgbSA9IG1lbWJlcihJZE1zLCBuYW1lKVxuXHRyZXR1cm4gKC4uLmFyZ3MpID0+IENhbGxFeHByZXNzaW9uKG0sIGFyZ3MpXG59XG5leHBvcnQgY29uc3Rcblx0bXNHZXREZWZhdWx0RXhwb3J0ID0gbXMoJ2dldERlZmF1bHRFeHBvcnQnKSxcblx0bXNHZXQgPSBtcygnZ2V0JyksXG5cdG1zR2V0TW9kdWxlID0gbXMoJ2dldE1vZHVsZScpLFxuXHRtc0xhenlHZXRNb2R1bGUgPSBtcygnbGF6eUdldE1vZHVsZScpLFxuXHRtc0FyciA9IG1zKCdhcnInKSxcblx0bXNCb29sID0gbXMoJ2Jvb2wnKSxcblx0bXNFeHRyYWN0ID0gbXMoJ2V4dHJhY3QnKSxcblx0bXNMc2V0ID0gbXMoJ2xzZXQnKSxcblx0bXNTZXQgPSBtcygnc2V0JyksXG5cdG1zTWFwID0gbXMoJ21hcCcpLFxuXHRtc1Nob3cgPSBtcygnc2hvdycpLFxuXHRtc0NoZWNrQ29udGFpbnMgPSBtcygnY2hlY2tDb250YWlucycpLFxuXHRtc1VubGF6eSA9IG1zKCd1bmxhenknKSxcblx0bXNMYXp5ID0gbXMoJ2xhenknKSxcblx0bXNMYXp5R2V0ID0gbXMoJ2xhenlQcm9wJylcblxuZXhwb3J0IGNvbnN0XG5cdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzID0gKGN4LCBsb2MsIGFzc2lnbmVlcywgaXNMYXp5LCB2YWx1ZSwgaXNNb2R1bGUsIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgZGVzdHJ1Y3R1cmVkTmFtZSA9IGBfJCR7bG9jLnN0YXJ0LmxpbmV9YFxuXHRcdGNvbnN0IGlkRGVzdHJ1Y3R1cmVkID0gSWRlbnRpZmllcihkZXN0cnVjdHVyZWROYW1lKVxuXHRcdGNvbnN0IGRlY2xhcmF0b3JzID0gYXNzaWduZWVzLm1hcChhc3NpZ25lZSA9PiB7XG5cdFx0XHQvLyBUT0RPOiBEb24ndCBjb21waWxlIGl0IGlmIGl0J3MgbmV2ZXIgYWNjZXNzZWRcblx0XHRcdGNvbnN0IGdldCA9IGdldE1lbWJlcihjeCwgaWREZXN0cnVjdHVyZWQsIGFzc2lnbmVlLm5hbWUsIGlzTGF6eSwgaXNNb2R1bGUpXG5cdFx0XHRyZXR1cm4gbWFrZURlY2xhcmF0b3IoY3gsIGFzc2lnbmVlLmxvYywgYXNzaWduZWUsIGdldCwgaXNMYXp5LCBpc0V4cG9ydClcblx0XHR9KVxuXHRcdC8vIEdldHRpbmcgbGF6eSBtb2R1bGUgaXMgZG9uZSBieSBtcy5sYXp5R2V0TW9kdWxlLlxuXHRcdGNvbnN0IHZhbCA9IChpc0xhenkgJiYgIWlzTW9kdWxlKSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0cmV0dXJuIHVuc2hpZnQoVmFyaWFibGVEZWNsYXJhdG9yKGlkRGVzdHJ1Y3R1cmVkLCB2YWwpLCBkZWNsYXJhdG9ycylcblx0fSxcblxuXHRtYWtlRGVjbGFyYXRvciA9IChjeCwgbG9jLCBhc3NpZ25lZSwgdmFsdWUsIHZhbHVlSXNBbHJlYWR5TGF6eSwgaXNFeHBvcnQpID0+IHtcblx0XHQvLyBUT0RPOiBhc3NlcnQoaXNFbXB0eShhc3NpZ25lZS5vcFR5cGUpKVxuXHRcdC8vIG9yIFRPRE86IEFsbG93IHR5cGUgY2hlY2sgb24gbGF6eSB2YWx1ZT9cblx0XHR2YWx1ZSA9IGFzc2lnbmVlLmlzTGF6eSA/IHZhbHVlIDpcblx0XHRcdG1heWJlV3JhcEluQ2hlY2tDb250YWlucyhjeCwgdmFsdWUsIGFzc2lnbmVlLm9wVHlwZSwgYXNzaWduZWUubmFtZSlcblxuXHRcdGlmIChpc0V4cG9ydCkge1xuXHRcdFx0Ly8gVE9ETzpFUzZcblx0XHRcdGN4LmNoZWNrKCFhc3NpZ25lZS5pc0xhenksIGFzc2lnbmVlLmxvYywgJ0xhenkgZXhwb3J0IG5vdCBzdXBwb3J0ZWQuJylcblx0XHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0b3IoXG5cdFx0XHRcdGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksXG5cdFx0XHRcdEFzc2lnbm1lbnRFeHByZXNzaW9uKCc9JywgbWVtYmVyKElkRXhwb3J0cywgYXNzaWduZWUubmFtZSksIHZhbHVlKSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgdmFsID0gYXNzaWduZWUuaXNMYXp5ICYmICF2YWx1ZUlzQWxyZWFkeUxhenkgPyBsYXp5V3JhcCh2YWx1ZSkgOiB2YWx1ZVxuXHRcdFx0YXNzZXJ0KGFzc2lnbmVlLmlzTGF6eSB8fCAhdmFsdWVJc0FscmVhZHlMYXp5KVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoYXNzaWduZWUpLCB2YWwpXG5cdFx0fVxuXHR9LFxuXG5cdGFjY2Vzc0xvY2FsID0gKGxvY2FsQWNjZXNzLCB2cikgPT5cblx0XHRhY2Nlc3NMb2NhbERlY2xhcmUodnIuYWNjZXNzVG9Mb2NhbC5nZXQobG9jYWxBY2Nlc3MpKSxcblxuXHRhY2Nlc3NMb2NhbERlY2xhcmUgPSBsb2NhbERlY2xhcmUgPT5cblx0XHRsb2NhbERlY2xhcmUuaXNMYXp5ID9cblx0XHRcdG1zVW5sYXp5KGlkRm9yRGVjbGFyZUNhY2hlZChsb2NhbERlY2xhcmUpKSA6XG5cdFx0XHRpZEZvckRlY2xhcmVOZXcobG9jYWxEZWNsYXJlKSxcblxuXHRtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMgPSAoY3gsIGFzdCwgb3BUeXBlLCBuYW1lKSA9PlxuXHRcdGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSA/XG5cdFx0XHRpZkVsc2Uob3BUeXBlLFxuXHRcdFx0XHR0eXAgPT4gbXNDaGVja0NvbnRhaW5zKHQwKHR5cCksIGFzdCwgTGl0ZXJhbChuYW1lKSksXG5cdFx0XHRcdCgpID0+IGFzdCkgOlxuXHRcdFx0YXN0LFxuXG5cdG9wTG9jYWxDaGVjayA9IChjeCwgbG9jYWwsIGlzTGF6eSkgPT4ge1xuXHRcdC8vIFRPRE86IFdheSB0byB0eXBlY2hlY2sgbGF6aWVzXG5cdFx0aWYgKCFjeC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCkgfHwgaXNMYXp5KVxuXHRcdFx0cmV0dXJuIE5vbmVcblx0XHRlbHNlIHJldHVybiBsb2NhbC5vcFR5cGUubWFwKHR5cCA9PlxuXHRcdFx0RXhwcmVzc2lvblN0YXRlbWVudChtc0NoZWNrQ29udGFpbnMoXG5cdFx0XHRcdHQwKHR5cCksXG5cdFx0XHRcdGFjY2Vzc0xvY2FsRGVjbGFyZShsb2NhbCksXG5cdFx0XHRcdExpdGVyYWwobG9jYWwubmFtZSkpKSlcblx0fSxcblxuXHRsYXp5V3JhcCA9IHZhbHVlID0+IG1zTGF6eSh0aHVuayh2YWx1ZSkpLFxuXG5cdHRvU3RhdGVtZW50cyA9IF8gPT4gXyBpbnN0YW5jZW9mIEFycmF5ID8gXy5tYXAodG9TdGF0ZW1lbnQpIDogWyB0b1N0YXRlbWVudChfKSBdXG5cbmNvbnN0IGdldE1lbWJlciA9IChjeCwgYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PiB7XG5cdGlmIChpc0xhenkpXG5cdFx0cmV0dXJuIG1zTGF6eUdldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpXG5cdGVsc2UgaWYgKGlzTW9kdWxlICYmIGN4Lm9wdHMuaW5jbHVkZVVzZUNoZWNrcygpKVxuXHRcdHJldHVybiBtc0dldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpXG5cdGVsc2Vcblx0XHRyZXR1cm4gbWVtYmVyKGFzdE9iamVjdCwgZ290TmFtZSlcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9