if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/mangle-identifier', 'esast/dist/specialize', 'esast/dist/util', './ast-constants', './ms-call'], function (exports, _esastDistAst, _esastDistMangleIdentifier, _esastDistSpecialize, _esastDistUtil, _astConstants, _msCall) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _mangleIdentifier = _interopRequire(_esastDistMangleIdentifier);

	var _specialize = _interopRequire(_esastDistSpecialize);

	const accessLocalDeclare = function (localDeclare) {
		return localDeclare.isLazy() ? (0, _msCall.msUnlazy)(idForDeclareCached(localDeclare)) : (0, _esastDistAst.Identifier)(idForDeclareCached(localDeclare).name);
	},
	      declare = function (localDeclare, val) {
		return (0, _esastDistSpecialize.variableDeclarationConst)([(0, _esastDistAst.VariableDeclarator)(idForDeclareCached(localDeclare), val)]);
	},
	     

	// Make declare from a string. This is for compiler-generated temporary locals.
	declareSpecial = function (name, val) {
		return (0, _esastDistSpecialize.variableDeclarationConst)([(0, _esastDistAst.VariableDeclarator)((0, _esastDistUtil.idCached)(name), val)]);
	},
	      idForDeclareCached = function (localDeclare) {
		let _ = declareToId.get(localDeclare);
		if (_ === undefined) {
			_ = (0, _esastDistAst.Identifier)((0, _mangleIdentifier)(localDeclare.name));
			declareToId.set(localDeclare, _);
		}
		return _;
	},
	      throwError = function (msg) {
		return (0, _esastDistAst.ThrowStatement)((0, _esastDistAst.NewExpression)(_astConstants.IdError, [(0, _esastDistAst.Literal)(msg)]));
	},
	      whileStatementInfinite = (0, _specialize)(_esastDistAst.WhileStatement, ['body', _esastDistAst.Statement], { test: (0, _esastDistAst.Literal)(true) });

	exports.accessLocalDeclare = accessLocalDeclare;
	exports.declare = declare;
	exports.declareSpecial = declareSpecial;
	exports.idForDeclareCached = idForDeclareCached;
	exports.throwError = throwError;
	exports.whileStatementInfinite = whileStatementInfinite;
	const declareToId = new WeakMap();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFRTyxPQUNOLGtCQUFrQixHQUFHLFVBQUEsWUFBWTtTQUNoQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQ3BCLFlBTE0sUUFBUSxFQUtMLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQzFDLGtCQVpNLFVBQVUsRUFZTCxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUM7RUFBQTtPQUVuRCxPQUFPLEdBQUcsVUFBQyxZQUFZLEVBQUUsR0FBRztTQUMzQix5QkFabUIsd0JBQXdCLEVBWWxCLENBQUUsa0JBZFosa0JBQWtCLEVBY2Esa0JBQWtCLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQztFQUFBOzs7O0FBR3hGLGVBQWMsR0FBRyxVQUFDLElBQUksRUFBRSxHQUFHO1NBQzFCLHlCQWhCbUIsd0JBQXdCLEVBZ0JsQixDQUFFLGtCQWxCWixrQkFBa0IsRUFrQmEsbUJBZnZDLFFBQVEsRUFld0MsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQztFQUFBO09BRXRFLGtCQUFrQixHQUFHLFVBQUEsWUFBWSxFQUFJO0FBQ3BDLE1BQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDckMsTUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQ3BCLElBQUMsR0FBRyxrQkF4QkUsVUFBVSxFQXdCRCx1QkFBaUIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDbkQsY0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUE7R0FDaEM7QUFDRCxTQUFPLENBQUMsQ0FBQTtFQUNSO09BRUQsVUFBVSxHQUFHLFVBQUEsR0FBRztTQUNmLGtCQTlCRCxjQUFjLEVBOEJFLGtCQS9CYSxhQUFhLGdCQUtsQyxPQUFPLEVBMEJ3QixDQUFFLGtCQS9CckIsT0FBTyxFQStCc0IsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFDO0VBQUE7T0FFekQsc0JBQXNCLEdBQUcsK0JBaENXLGNBQWMsRUFpQ2pELENBQUUsTUFBTSxnQkFsQ21DLFNBQVMsQ0FrQy9CLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLGtCQW5DVyxPQUFPLEVBbUNWLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTs7U0ExQnpCLGtCQUFrQixHQUFsQixrQkFBa0I7U0FLbEIsT0FBTyxHQUFQLE9BQU87U0FJUCxjQUFjLEdBQWQsY0FBYztTQUdkLGtCQUFrQixHQUFsQixrQkFBa0I7U0FTbEIsVUFBVSxHQUFWLFVBQVU7U0FHVixzQkFBc0IsR0FBdEIsc0JBQXNCO0FBSXZCLE9BQ0MsV0FBVyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdHJhbnNwaWxlL3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJZGVudGlmaWVyLCBMaXRlcmFsLCBOZXdFeHByZXNzaW9uLCBTdGF0ZW1lbnQsXG5cdFRocm93U3RhdGVtZW50LCBWYXJpYWJsZURlY2xhcmF0b3IsIFdoaWxlU3RhdGVtZW50IH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgbWFuZ2xlSWRlbnRpZmllciBmcm9tICdlc2FzdC9kaXN0L21hbmdsZS1pZGVudGlmaWVyJ1xuaW1wb3J0IHNwZWNpYWxpemUsIHsgdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0IH0gZnJvbSAnZXNhc3QvZGlzdC9zcGVjaWFsaXplJ1xuaW1wb3J0IHsgaWRDYWNoZWQgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyBJZEVycm9yIH0gZnJvbSAnLi9hc3QtY29uc3RhbnRzJ1xuaW1wb3J0IHsgbXNVbmxhenkgfSBmcm9tICcuL21zLWNhbGwnXG5cbmV4cG9ydCBjb25zdFxuXHRhY2Nlc3NMb2NhbERlY2xhcmUgPSBsb2NhbERlY2xhcmUgPT5cblx0XHRsb2NhbERlY2xhcmUuaXNMYXp5KCkgP1xuXHRcdFx0bXNVbmxhenkoaWRGb3JEZWNsYXJlQ2FjaGVkKGxvY2FsRGVjbGFyZSkpIDpcblx0XHRcdElkZW50aWZpZXIoaWRGb3JEZWNsYXJlQ2FjaGVkKGxvY2FsRGVjbGFyZSkubmFtZSksXG5cblx0ZGVjbGFyZSA9IChsb2NhbERlY2xhcmUsIHZhbCkgPT5cblx0XHR2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoWyBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGxvY2FsRGVjbGFyZSksIHZhbCkgXSksXG5cblx0Ly8gTWFrZSBkZWNsYXJlIGZyb20gYSBzdHJpbmcuIFRoaXMgaXMgZm9yIGNvbXBpbGVyLWdlbmVyYXRlZCB0ZW1wb3JhcnkgbG9jYWxzLlxuXHRkZWNsYXJlU3BlY2lhbCA9IChuYW1lLCB2YWwpID0+XG5cdFx0dmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KFsgVmFyaWFibGVEZWNsYXJhdG9yKGlkQ2FjaGVkKG5hbWUpLCB2YWwpIF0pLFxuXG5cdGlkRm9yRGVjbGFyZUNhY2hlZCA9IGxvY2FsRGVjbGFyZSA9PiB7XG5cdFx0bGV0IF8gPSBkZWNsYXJlVG9JZC5nZXQobG9jYWxEZWNsYXJlKVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpIHtcblx0XHRcdF8gPSBJZGVudGlmaWVyKG1hbmdsZUlkZW50aWZpZXIobG9jYWxEZWNsYXJlLm5hbWUpKVxuXHRcdFx0ZGVjbGFyZVRvSWQuc2V0KGxvY2FsRGVjbGFyZSwgXylcblx0XHR9XG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHR0aHJvd0Vycm9yID0gbXNnID0+XG5cdFx0VGhyb3dTdGF0ZW1lbnQoTmV3RXhwcmVzc2lvbihJZEVycm9yLCBbIExpdGVyYWwobXNnKSBdKSksXG5cblx0d2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSA9IHNwZWNpYWxpemUoV2hpbGVTdGF0ZW1lbnQsXG5cdFx0WyAnYm9keScsIFN0YXRlbWVudCBdLFxuXHRcdHsgdGVzdDogTGl0ZXJhbCh0cnVlKSB9KVxuXG5jb25zdFxuXHRkZWNsYXJlVG9JZCA9IG5ldyBXZWFrTWFwKClcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9