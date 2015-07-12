if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/mangle-identifier', 'esast/dist/specialize', '../util', './ast-constants', './ms-call', './transpile'], function (exports, _esastDistAst, _esastDistMangleIdentifier, _esastDistSpecialize, _util, _astConstants, _msCall, _transpile) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mangleIdentifier = _interopRequireDefault(_esastDistMangleIdentifier);

	var _specialize = _interopRequireDefault(_esastDistSpecialize);

	const accessLocalDeclare = function (localDeclare) {
		return localDeclare.isLazy() ? (0, _msCall.msUnlazy)(idForDeclareCached(localDeclare)) : (0, _esastDistAst.Identifier)(idForDeclareCached(localDeclare).name);
	},
	      declare = function (localDeclare, val) {
		return (0, _esastDistSpecialize.variableDeclarationConst)([(0, _esastDistAst.VariableDeclarator)(idForDeclareCached(localDeclare), val)]);
	},
	      forStatementInfinite = (0, _specialize.default)(_esastDistAst.ForStatement, ['body', _esastDistAst.Statement], { init: null, test: null, update: null }),
	      idForDeclareCached = function (localDeclare) {
		let _ = declareToId.get(localDeclare);
		if (_ === undefined) {
			_ = (0, _esastDistAst.Identifier)((0, _mangleIdentifier.default)(localDeclare.name));
			declareToId.set(localDeclare, _);
		}
		return _;
	},
	      opTypeCheckForLocalDeclare = function (localDeclare) {
		return (
			// TODO: Way to typecheck lazies
			(0, _util.opIf)(!localDeclare.isLazy(), function () {
				return (0, _util.opMap)(localDeclare.opType, function (type) {
					return (0, _esastDistAst.ExpressionStatement)((0, _msCall.msCheckContains)((0, _transpile.t0)(type), accessLocalDeclare(localDeclare), (0, _esastDistAst.Literal)(localDeclare.name)));
				});
			})
		);
	},
	      throwErrorFromString = function (msg) {
		return (0, _esastDistAst.ThrowStatement)((0, _esastDistAst.NewExpression)(_astConstants.IdError, [(0, _esastDistAst.Literal)(msg)]));
	};

	exports.accessLocalDeclare = accessLocalDeclare;
	exports.declare = declare;
	exports.forStatementInfinite = forStatementInfinite;
	exports.idForDeclareCached = idForDeclareCached;
	exports.opTypeCheckForLocalDeclare = opTypeCheckForLocalDeclare;
	exports.throwErrorFromString = throwErrorFromString;
	const declareToId = new WeakMap();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFTTyxPQUNOLGtCQUFrQixHQUFHLFVBQUEsWUFBWTtTQUNoQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQ3BCLFlBTnVCLFFBQVEsRUFNdEIsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsR0FDMUMsa0JBYnlDLFVBQVUsRUFheEMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDO0VBQUE7T0FFbkQsT0FBTyxHQUFHLFVBQUMsWUFBWSxFQUFFLEdBQUc7U0FDM0IseUJBYm1CLHdCQUF3QixFQWFsQixDQUFFLGtCQWZaLGtCQUFrQixFQWVhLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUM7RUFBQTtPQUV4RixvQkFBb0IsR0FBRyx1Q0FsQk0sWUFBWSxFQW1CeEMsQ0FBRSxNQUFNLGdCQW5Cc0UsU0FBUyxDQW1CbEUsRUFDckIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO09BRTFDLGtCQUFrQixHQUFHLFVBQUEsWUFBWSxFQUFJO0FBQ3BDLE1BQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDckMsTUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQ3BCLElBQUMsR0FBRyxrQkF6QnFDLFVBQVUsRUF5QnBDLCtCQUFpQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNuRCxjQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQTtHQUNoQztBQUNELFNBQU8sQ0FBQyxDQUFBO0VBQ1I7T0FFRCwwQkFBMEIsR0FBRyxVQUFBLFlBQVk7OztBQUV4QyxhQTdCTyxJQUFJLEVBNkJOLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFO1dBQzVCLFVBOUJZLEtBQUssRUE4QlgsWUFBWSxDQUFDLE1BQU0sRUFBRSxVQUFBLElBQUk7WUFDOUIsa0JBbkNLLG1CQUFtQixFQW1DSixZQTdCZixlQUFlLEVBOEJuQixlQTdCSSxFQUFFLEVBNkJILElBQUksQ0FBQyxFQUNSLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUNoQyxrQkF0Q21ELE9BQU8sRUFzQ2xELFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQztJQUFBO0dBQUM7RUFBQTtPQUVsQyxvQkFBb0IsR0FBRyxVQUFBLEdBQUc7U0FDekIsa0JBeENELGNBQWMsRUF3Q0Usa0JBekNnRCxhQUFhLGdCQUtyRSxPQUFPLEVBb0N3QixDQUFFLGtCQXpDYyxPQUFPLEVBeUNiLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBQztFQUFBLENBQUE7O1NBL0J6RCxrQkFBa0IsR0FBbEIsa0JBQWtCO1NBS2xCLE9BQU8sR0FBUCxPQUFPO1NBR1Asb0JBQW9CLEdBQXBCLG9CQUFvQjtTQUlwQixrQkFBa0IsR0FBbEIsa0JBQWtCO1NBU2xCLDBCQUEwQixHQUExQiwwQkFBMEI7U0FTMUIsb0JBQW9CLEdBQXBCLG9CQUFvQjtBQUdyQixPQUNDLFdBQVcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhwcmVzc2lvblN0YXRlbWVudCwgRm9yU3RhdGVtZW50LCBJZGVudGlmaWVyLCBMaXRlcmFsLCBOZXdFeHByZXNzaW9uLCBTdGF0ZW1lbnQsXG5cdFRocm93U3RhdGVtZW50LCBWYXJpYWJsZURlY2xhcmF0b3IgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCBtYW5nbGVJZGVudGlmaWVyIGZyb20gJ2VzYXN0L2Rpc3QvbWFuZ2xlLWlkZW50aWZpZXInXG5pbXBvcnQgc3BlY2lhbGl6ZSwgeyB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QgfSBmcm9tICdlc2FzdC9kaXN0L3NwZWNpYWxpemUnXG5pbXBvcnQgeyBvcElmLCBvcE1hcCB9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgeyBJZEVycm9yIH0gZnJvbSAnLi9hc3QtY29uc3RhbnRzJ1xuaW1wb3J0IHsgbXNDaGVja0NvbnRhaW5zLCBtc1VubGF6eSB9IGZyb20gJy4vbXMtY2FsbCdcbmltcG9ydCB7IHQwIH0gZnJvbSAnLi90cmFuc3BpbGUnXG5cbmV4cG9ydCBjb25zdFxuXHRhY2Nlc3NMb2NhbERlY2xhcmUgPSBsb2NhbERlY2xhcmUgPT5cblx0XHRsb2NhbERlY2xhcmUuaXNMYXp5KCkgP1xuXHRcdFx0bXNVbmxhenkoaWRGb3JEZWNsYXJlQ2FjaGVkKGxvY2FsRGVjbGFyZSkpIDpcblx0XHRcdElkZW50aWZpZXIoaWRGb3JEZWNsYXJlQ2FjaGVkKGxvY2FsRGVjbGFyZSkubmFtZSksXG5cblx0ZGVjbGFyZSA9IChsb2NhbERlY2xhcmUsIHZhbCkgPT5cblx0XHR2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoWyBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGxvY2FsRGVjbGFyZSksIHZhbCkgXSksXG5cblx0Zm9yU3RhdGVtZW50SW5maW5pdGUgPSBzcGVjaWFsaXplKEZvclN0YXRlbWVudCxcblx0XHRbICdib2R5JywgU3RhdGVtZW50IF0sXG5cdFx0eyBpbml0OiBudWxsLCB0ZXN0OiBudWxsLCB1cGRhdGU6IG51bGwgfSksXG5cblx0aWRGb3JEZWNsYXJlQ2FjaGVkID0gbG9jYWxEZWNsYXJlID0+IHtcblx0XHRsZXQgXyA9IGRlY2xhcmVUb0lkLmdldChsb2NhbERlY2xhcmUpXG5cdFx0aWYgKF8gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XyA9IElkZW50aWZpZXIobWFuZ2xlSWRlbnRpZmllcihsb2NhbERlY2xhcmUubmFtZSkpXG5cdFx0XHRkZWNsYXJlVG9JZC5zZXQobG9jYWxEZWNsYXJlLCBfKVxuXHRcdH1cblx0XHRyZXR1cm4gX1xuXHR9LFxuXG5cdG9wVHlwZUNoZWNrRm9yTG9jYWxEZWNsYXJlID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0Ly8gVE9ETzogV2F5IHRvIHR5cGVjaGVjayBsYXppZXNcblx0XHRvcElmKCFsb2NhbERlY2xhcmUuaXNMYXp5KCksICgpID0+XG5cdFx0XHRvcE1hcChsb2NhbERlY2xhcmUub3BUeXBlLCB0eXBlID0+XG5cdFx0XHRcdEV4cHJlc3Npb25TdGF0ZW1lbnQobXNDaGVja0NvbnRhaW5zKFxuXHRcdFx0XHRcdHQwKHR5cGUpLFxuXHRcdFx0XHRcdGFjY2Vzc0xvY2FsRGVjbGFyZShsb2NhbERlY2xhcmUpLFxuXHRcdFx0XHRcdExpdGVyYWwobG9jYWxEZWNsYXJlLm5hbWUpKSkpKSxcblxuXHR0aHJvd0Vycm9yRnJvbVN0cmluZyA9IG1zZyA9PlxuXHRcdFRocm93U3RhdGVtZW50KE5ld0V4cHJlc3Npb24oSWRFcnJvciwgWyBMaXRlcmFsKG1zZykgXSkpXG5cbmNvbnN0XG5cdGRlY2xhcmVUb0lkID0gbmV3IFdlYWtNYXAoKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=