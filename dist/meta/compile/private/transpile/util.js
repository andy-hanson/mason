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
	},
	      templateElementForString = function (str) {
		return (0, _esastDistAst.TemplateElement)(false, { cooked: str, raw: strEscapeForTemplate(str) });
	};

	exports.accessLocalDeclare = accessLocalDeclare;
	exports.declare = declare;
	exports.forStatementInfinite = forStatementInfinite;
	exports.idForDeclareCached = idForDeclareCached;
	exports.opTypeCheckForLocalDeclare = opTypeCheckForLocalDeclare;
	exports.throwErrorFromString = throwErrorFromString;
	exports.templateElementForString = templateElementForString;
	const declareToId = new WeakMap(),
	      strEscapeForTemplate = function (str) {
		return str.replace(/[\\`\n\t\b\f\v\r\u2028\u2029]/g, function (ch) {
			return _strEscapes[ch];
		});
	},
	      _strEscapes = {
		'`': '\\`',
		'\\': '\\\\',
		'\n': '\\n',
		'\t': '\\t',
		'\b': '\\b',
		'\f': '\\f',
		'\u000b': '\\v',
		'\r': '\\r',
		'\u2028': '\\u2028',
		'\u2029': '\\u2029'
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFTTyxPQUNOLGtCQUFrQixHQUFHLFVBQUEsWUFBWTtTQUNoQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQ3BCLFlBTnVCLFFBQVEsRUFNdEIsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsR0FDMUMsa0JBYnlDLFVBQVUsRUFheEMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDO0VBQUE7T0FFbkQsT0FBTyxHQUFHLFVBQUMsWUFBWSxFQUFFLEdBQUc7U0FDM0IseUJBYm1CLHdCQUF3QixFQWFsQixDQUFFLGtCQWZLLGtCQUFrQixFQWVKLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUM7RUFBQTtPQUV4RixvQkFBb0IsR0FBRyx1Q0FsQk0sWUFBWSxFQW1CeEMsQ0FBRSxNQUFNLGdCQW5Cc0UsU0FBUyxDQW1CbEUsRUFDckIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO09BRTFDLGtCQUFrQixHQUFHLFVBQUEsWUFBWSxFQUFJO0FBQ3BDLE1BQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDckMsTUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQ3BCLElBQUMsR0FBRyxrQkF6QnFDLFVBQVUsRUF5QnBDLCtCQUFpQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNuRCxjQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQTtHQUNoQztBQUNELFNBQU8sQ0FBQyxDQUFBO0VBQ1I7T0FFRCwwQkFBMEIsR0FBRyxVQUFBLFlBQVk7OztBQUV4QyxhQTdCTyxJQUFJLEVBNkJOLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFO1dBQzVCLFVBOUJZLEtBQUssRUE4QlgsWUFBWSxDQUFDLE1BQU0sRUFBRSxVQUFBLElBQUk7WUFDOUIsa0JBbkNLLG1CQUFtQixFQW1DSixZQTdCZixlQUFlLEVBOEJuQixlQTdCSSxFQUFFLEVBNkJILElBQUksQ0FBQyxFQUNSLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUNoQyxrQkF0Q21ELE9BQU8sRUFzQ2xELFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQztJQUFBO0dBQUM7RUFBQTtPQUVsQyxvQkFBb0IsR0FBRyxVQUFBLEdBQUc7U0FDekIsa0JBeENnQixjQUFjLEVBd0NmLGtCQXpDZ0QsYUFBYSxnQkFLckUsT0FBTyxFQW9Dd0IsQ0FBRSxrQkF6Q2MsT0FBTyxFQXlDYixHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUM7RUFBQTtPQUV6RCx3QkFBd0IsR0FBRyxVQUFBLEdBQUc7U0FDN0Isa0JBM0NELGVBQWUsRUEyQ0UsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztFQUFBLENBQUE7O1NBbEN4RSxrQkFBa0IsR0FBbEIsa0JBQWtCO1NBS2xCLE9BQU8sR0FBUCxPQUFPO1NBR1Asb0JBQW9CLEdBQXBCLG9CQUFvQjtTQUlwQixrQkFBa0IsR0FBbEIsa0JBQWtCO1NBU2xCLDBCQUEwQixHQUExQiwwQkFBMEI7U0FTMUIsb0JBQW9CLEdBQXBCLG9CQUFvQjtTQUdwQix3QkFBd0IsR0FBeEIsd0JBQXdCO0FBR3pCLE9BQ0MsV0FBVyxHQUFHLElBQUksT0FBTyxFQUFFO09BRTNCLG9CQUFvQixHQUFHLFVBQUEsR0FBRztTQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFLFVBQUEsRUFBRTtVQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7R0FBQSxDQUFDO0VBQUE7T0FDckUsV0FBVyxHQUFHO0FBQ2IsS0FBRyxFQUFFLEtBQUs7QUFDVixNQUFJLEVBQUUsTUFBTTtBQUNaLE1BQUksRUFBRSxLQUFLO0FBQ1gsTUFBSSxFQUFFLEtBQUs7QUFDWCxNQUFJLEVBQUUsS0FBSztBQUNYLE1BQUksRUFBRSxLQUFLO0FBQ1gsVUFBSSxFQUFFLEtBQUs7QUFDWCxNQUFJLEVBQUUsS0FBSztBQUNYLFVBQVEsRUFBRSxTQUFTO0FBQ25CLFVBQVEsRUFBRSxTQUFTO0VBQ25CLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdHJhbnNwaWxlL3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeHByZXNzaW9uU3RhdGVtZW50LCBGb3JTdGF0ZW1lbnQsIElkZW50aWZpZXIsIExpdGVyYWwsIE5ld0V4cHJlc3Npb24sIFN0YXRlbWVudCxcblx0VGVtcGxhdGVFbGVtZW50LCBUaHJvd1N0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdG9yIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgbWFuZ2xlSWRlbnRpZmllciBmcm9tICdlc2FzdC9kaXN0L21hbmdsZS1pZGVudGlmaWVyJ1xuaW1wb3J0IHNwZWNpYWxpemUsIHsgdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0IH0gZnJvbSAnZXNhc3QvZGlzdC9zcGVjaWFsaXplJ1xuaW1wb3J0IHsgb3BJZiwgb3BNYXAgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IHsgSWRFcnJvciB9IGZyb20gJy4vYXN0LWNvbnN0YW50cydcbmltcG9ydCB7IG1zQ2hlY2tDb250YWlucywgbXNVbmxhenkgfSBmcm9tICcuL21zLWNhbGwnXG5pbXBvcnQgeyB0MCB9IGZyb20gJy4vdHJhbnNwaWxlJ1xuXG5leHBvcnQgY29uc3Rcblx0YWNjZXNzTG9jYWxEZWNsYXJlID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0bG9jYWxEZWNsYXJlLmlzTGF6eSgpID9cblx0XHRcdG1zVW5sYXp5KGlkRm9yRGVjbGFyZUNhY2hlZChsb2NhbERlY2xhcmUpKSA6XG5cdFx0XHRJZGVudGlmaWVyKGlkRm9yRGVjbGFyZUNhY2hlZChsb2NhbERlY2xhcmUpLm5hbWUpLFxuXG5cdGRlY2xhcmUgPSAobG9jYWxEZWNsYXJlLCB2YWwpID0+XG5cdFx0dmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KFsgVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChsb2NhbERlY2xhcmUpLCB2YWwpIF0pLFxuXG5cdGZvclN0YXRlbWVudEluZmluaXRlID0gc3BlY2lhbGl6ZShGb3JTdGF0ZW1lbnQsXG5cdFx0WyAnYm9keScsIFN0YXRlbWVudCBdLFxuXHRcdHsgaW5pdDogbnVsbCwgdGVzdDogbnVsbCwgdXBkYXRlOiBudWxsIH0pLFxuXG5cdGlkRm9yRGVjbGFyZUNhY2hlZCA9IGxvY2FsRGVjbGFyZSA9PiB7XG5cdFx0bGV0IF8gPSBkZWNsYXJlVG9JZC5nZXQobG9jYWxEZWNsYXJlKVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpIHtcblx0XHRcdF8gPSBJZGVudGlmaWVyKG1hbmdsZUlkZW50aWZpZXIobG9jYWxEZWNsYXJlLm5hbWUpKVxuXHRcdFx0ZGVjbGFyZVRvSWQuc2V0KGxvY2FsRGVjbGFyZSwgXylcblx0XHR9XG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHRvcFR5cGVDaGVja0ZvckxvY2FsRGVjbGFyZSA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdC8vIFRPRE86IFdheSB0byB0eXBlY2hlY2sgbGF6aWVzXG5cdFx0b3BJZighbG9jYWxEZWNsYXJlLmlzTGF6eSgpLCAoKSA9PlxuXHRcdFx0b3BNYXAobG9jYWxEZWNsYXJlLm9wVHlwZSwgdHlwZSA9PlxuXHRcdFx0XHRFeHByZXNzaW9uU3RhdGVtZW50KG1zQ2hlY2tDb250YWlucyhcblx0XHRcdFx0XHR0MCh0eXBlKSxcblx0XHRcdFx0XHRhY2Nlc3NMb2NhbERlY2xhcmUobG9jYWxEZWNsYXJlKSxcblx0XHRcdFx0XHRMaXRlcmFsKGxvY2FsRGVjbGFyZS5uYW1lKSkpKSksXG5cblx0dGhyb3dFcnJvckZyb21TdHJpbmcgPSBtc2cgPT5cblx0XHRUaHJvd1N0YXRlbWVudChOZXdFeHByZXNzaW9uKElkRXJyb3IsIFsgTGl0ZXJhbChtc2cpIF0pKSxcblxuXHR0ZW1wbGF0ZUVsZW1lbnRGb3JTdHJpbmcgPSBzdHIgPT5cblx0XHRUZW1wbGF0ZUVsZW1lbnQoZmFsc2UsIHsgY29va2VkOiBzdHIsIHJhdzogc3RyRXNjYXBlRm9yVGVtcGxhdGUoc3RyKSB9KVxuXG5jb25zdFxuXHRkZWNsYXJlVG9JZCA9IG5ldyBXZWFrTWFwKCksXG5cblx0c3RyRXNjYXBlRm9yVGVtcGxhdGUgPSBzdHIgPT5cblx0XHRzdHIucmVwbGFjZSgvW1xcXFxgXFxuXFx0XFxiXFxmXFx2XFxyXFx1MjAyOFxcdTIwMjldL2csIGNoID0+IF9zdHJFc2NhcGVzW2NoXSksXG5cdF9zdHJFc2NhcGVzID0ge1xuXHRcdCdgJzogJ1xcXFxgJyxcblx0XHQnXFxcXCc6ICdcXFxcXFxcXCcsXG5cdFx0J1xcbic6ICdcXFxcbicsXG5cdFx0J1xcdCc6ICdcXFxcdCcsXG5cdFx0J1xcYic6ICdcXFxcYicsXG5cdFx0J1xcZic6ICdcXFxcZicsXG5cdFx0J1xcdic6ICdcXFxcdicsXG5cdFx0J1xccic6ICdcXFxccicsXG5cdFx0J1xcdTIwMjgnOiAnXFxcXHUyMDI4Jyxcblx0XHQnXFx1MjAyOSc6ICdcXFxcdTIwMjknXG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9