if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/mangle-identifier', 'esast/dist/specialize', '../util', './ms-call', './transpile'], function (exports, _esastDistAst, _esastDistMangleIdentifier, _esastDistSpecialize, _util, _msCall, _transpile) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mangleIdentifier = _interopRequireDefault(_esastDistMangleIdentifier);

	var _specialize = _interopRequireDefault(_esastDistSpecialize);

	// Define this here to avoid circular dependency with ast-constants.
	const _IdError = (0, _esastDistAst.Identifier)('Error');

	exports._IdError = _IdError;
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
		return (0, _esastDistAst.ThrowStatement)((0, _esastDistAst.NewExpression)(_IdError, [(0, _esastDistAst.Literal)(msg)]));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBU08sT0FBTSxRQUFRLEdBQUcsa0JBVG9CLFVBQVUsRUFTbkIsT0FBTyxDQUFDLENBQUE7O1NBQTlCLFFBQVEsR0FBUixRQUFRO0FBRWQsT0FDTixrQkFBa0IsR0FBRyxVQUFBLFlBQVk7U0FDaEMsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUNwQixZQVR1QixRQUFRLEVBU3RCLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQzFDLGtCQWZ5QyxVQUFVLEVBZXhDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQztFQUFBO09BRW5ELE9BQU8sR0FBRyxVQUFDLFlBQVksRUFBRSxHQUFHO1NBQzNCLHlCQWZtQix3QkFBd0IsRUFlbEIsQ0FBRSxrQkFqQkssa0JBQWtCLEVBaUJKLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUM7RUFBQTtPQUV4RixvQkFBb0IsR0FBRyx1Q0FwQk0sWUFBWSxFQXFCeEMsQ0FBRSxNQUFNLGdCQXJCc0UsU0FBUyxDQXFCbEUsRUFDckIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO09BRTFDLGtCQUFrQixHQUFHLFVBQUEsWUFBWSxFQUFJO0FBQ3BDLE1BQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDckMsTUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQ3BCLElBQUMsR0FBRyxrQkEzQnFDLFVBQVUsRUEyQnBDLCtCQUFpQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNuRCxjQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQTtHQUNoQztBQUNELFNBQU8sQ0FBQyxDQUFBO0VBQ1I7T0FFRCwwQkFBMEIsR0FBRyxVQUFBLFlBQVk7OztBQUV4QyxhQS9CTyxJQUFJLEVBK0JOLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFO1dBQzVCLFVBaENZLEtBQUssRUFnQ1gsWUFBWSxDQUFDLE1BQU0sRUFBRSxVQUFBLElBQUk7WUFDOUIsa0JBckNLLG1CQUFtQixFQXFDSixZQWhDZixlQUFlLEVBaUNuQixlQWhDSSxFQUFFLEVBZ0NILElBQUksQ0FBQyxFQUNSLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUNoQyxrQkF4Q21ELE9BQU8sRUF3Q2xELFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQztJQUFBO0dBQUM7RUFBQTtPQUVsQyxvQkFBb0IsR0FBRyxVQUFBLEdBQUc7U0FDekIsa0JBMUNnQixjQUFjLEVBMENmLGtCQTNDZ0QsYUFBYSxFQTJDL0MsUUFBUSxFQUFFLENBQUUsa0JBM0NhLE9BQU8sRUEyQ1osR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFDO0VBQUE7T0FFMUQsd0JBQXdCLEdBQUcsVUFBQSxHQUFHO1NBQzdCLGtCQTdDRCxlQUFlLEVBNkNFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFBQSxDQUFBOztTQWxDeEUsa0JBQWtCLEdBQWxCLGtCQUFrQjtTQUtsQixPQUFPLEdBQVAsT0FBTztTQUdQLG9CQUFvQixHQUFwQixvQkFBb0I7U0FJcEIsa0JBQWtCLEdBQWxCLGtCQUFrQjtTQVNsQiwwQkFBMEIsR0FBMUIsMEJBQTBCO1NBUzFCLG9CQUFvQixHQUFwQixvQkFBb0I7U0FHcEIsd0JBQXdCLEdBQXhCLHdCQUF3QjtBQUd6QixPQUNDLFdBQVcsR0FBRyxJQUFJLE9BQU8sRUFBRTtPQUUzQixvQkFBb0IsR0FBRyxVQUFBLEdBQUc7U0FDekIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsRUFBRSxVQUFBLEVBQUU7VUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO0dBQUEsQ0FBQztFQUFBO09BQ3JFLFdBQVcsR0FBRztBQUNiLEtBQUcsRUFBRSxLQUFLO0FBQ1YsTUFBSSxFQUFFLE1BQU07QUFDWixNQUFJLEVBQUUsS0FBSztBQUNYLE1BQUksRUFBRSxLQUFLO0FBQ1gsTUFBSSxFQUFFLEtBQUs7QUFDWCxNQUFJLEVBQUUsS0FBSztBQUNYLFVBQUksRUFBRSxLQUFLO0FBQ1gsTUFBSSxFQUFFLEtBQUs7QUFDWCxVQUFRLEVBQUUsU0FBUztBQUNuQixVQUFRLEVBQUUsU0FBUztFQUNuQixDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhwcmVzc2lvblN0YXRlbWVudCwgRm9yU3RhdGVtZW50LCBJZGVudGlmaWVyLCBMaXRlcmFsLCBOZXdFeHByZXNzaW9uLCBTdGF0ZW1lbnQsXG5cdFRlbXBsYXRlRWxlbWVudCwgVGhyb3dTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IG1hbmdsZUlkZW50aWZpZXIgZnJvbSAnZXNhc3QvZGlzdC9tYW5nbGUtaWRlbnRpZmllcidcbmltcG9ydCBzcGVjaWFsaXplLCB7IHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdCB9IGZyb20gJ2VzYXN0L2Rpc3Qvc3BlY2lhbGl6ZSdcbmltcG9ydCB7IG9wSWYsIG9wTWFwIH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCB7IG1zQ2hlY2tDb250YWlucywgbXNVbmxhenkgfSBmcm9tICcuL21zLWNhbGwnXG5pbXBvcnQgeyB0MCB9IGZyb20gJy4vdHJhbnNwaWxlJ1xuXG4vLyBEZWZpbmUgdGhpcyBoZXJlIHRvIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY3kgd2l0aCBhc3QtY29uc3RhbnRzLlxuZXhwb3J0IGNvbnN0IF9JZEVycm9yID0gSWRlbnRpZmllcignRXJyb3InKVxuXG5leHBvcnQgY29uc3Rcblx0YWNjZXNzTG9jYWxEZWNsYXJlID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0bG9jYWxEZWNsYXJlLmlzTGF6eSgpID9cblx0XHRcdG1zVW5sYXp5KGlkRm9yRGVjbGFyZUNhY2hlZChsb2NhbERlY2xhcmUpKSA6XG5cdFx0XHRJZGVudGlmaWVyKGlkRm9yRGVjbGFyZUNhY2hlZChsb2NhbERlY2xhcmUpLm5hbWUpLFxuXG5cdGRlY2xhcmUgPSAobG9jYWxEZWNsYXJlLCB2YWwpID0+XG5cdFx0dmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KFsgVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChsb2NhbERlY2xhcmUpLCB2YWwpIF0pLFxuXG5cdGZvclN0YXRlbWVudEluZmluaXRlID0gc3BlY2lhbGl6ZShGb3JTdGF0ZW1lbnQsXG5cdFx0WyAnYm9keScsIFN0YXRlbWVudCBdLFxuXHRcdHsgaW5pdDogbnVsbCwgdGVzdDogbnVsbCwgdXBkYXRlOiBudWxsIH0pLFxuXG5cdGlkRm9yRGVjbGFyZUNhY2hlZCA9IGxvY2FsRGVjbGFyZSA9PiB7XG5cdFx0bGV0IF8gPSBkZWNsYXJlVG9JZC5nZXQobG9jYWxEZWNsYXJlKVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpIHtcblx0XHRcdF8gPSBJZGVudGlmaWVyKG1hbmdsZUlkZW50aWZpZXIobG9jYWxEZWNsYXJlLm5hbWUpKVxuXHRcdFx0ZGVjbGFyZVRvSWQuc2V0KGxvY2FsRGVjbGFyZSwgXylcblx0XHR9XG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHRvcFR5cGVDaGVja0ZvckxvY2FsRGVjbGFyZSA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdC8vIFRPRE86IFdheSB0byB0eXBlY2hlY2sgbGF6aWVzXG5cdFx0b3BJZighbG9jYWxEZWNsYXJlLmlzTGF6eSgpLCAoKSA9PlxuXHRcdFx0b3BNYXAobG9jYWxEZWNsYXJlLm9wVHlwZSwgdHlwZSA9PlxuXHRcdFx0XHRFeHByZXNzaW9uU3RhdGVtZW50KG1zQ2hlY2tDb250YWlucyhcblx0XHRcdFx0XHR0MCh0eXBlKSxcblx0XHRcdFx0XHRhY2Nlc3NMb2NhbERlY2xhcmUobG9jYWxEZWNsYXJlKSxcblx0XHRcdFx0XHRMaXRlcmFsKGxvY2FsRGVjbGFyZS5uYW1lKSkpKSksXG5cblx0dGhyb3dFcnJvckZyb21TdHJpbmcgPSBtc2cgPT5cblx0XHRUaHJvd1N0YXRlbWVudChOZXdFeHByZXNzaW9uKF9JZEVycm9yLCBbIExpdGVyYWwobXNnKSBdKSksXG5cblx0dGVtcGxhdGVFbGVtZW50Rm9yU3RyaW5nID0gc3RyID0+XG5cdFx0VGVtcGxhdGVFbGVtZW50KGZhbHNlLCB7IGNvb2tlZDogc3RyLCByYXc6IHN0ckVzY2FwZUZvclRlbXBsYXRlKHN0cikgfSlcblxuY29uc3Rcblx0ZGVjbGFyZVRvSWQgPSBuZXcgV2Vha01hcCgpLFxuXG5cdHN0ckVzY2FwZUZvclRlbXBsYXRlID0gc3RyID0+XG5cdFx0c3RyLnJlcGxhY2UoL1tcXFxcYFxcblxcdFxcYlxcZlxcdlxcclxcdTIwMjhcXHUyMDI5XS9nLCBjaCA9PiBfc3RyRXNjYXBlc1tjaF0pLFxuXHRfc3RyRXNjYXBlcyA9IHtcblx0XHQnYCc6ICdcXFxcYCcsXG5cdFx0J1xcXFwnOiAnXFxcXFxcXFwnLFxuXHRcdCdcXG4nOiAnXFxcXG4nLFxuXHRcdCdcXHQnOiAnXFxcXHQnLFxuXHRcdCdcXGInOiAnXFxcXGInLFxuXHRcdCdcXGYnOiAnXFxcXGYnLFxuXHRcdCdcXHYnOiAnXFxcXHYnLFxuXHRcdCdcXHInOiAnXFxcXHInLFxuXHRcdCdcXHUyMDI4JzogJ1xcXFx1MjAyOCcsXG5cdFx0J1xcdTIwMjknOiAnXFxcXHUyMDI5J1xuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==