if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/mangle-identifier', 'esast/dist/specialize', 'esast/dist/util'], function (exports, _esastDistAst, _esastDistMangleIdentifier, _esastDistSpecialize, _esastDistUtil) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _mangleIdentifier = _interopRequire(_esastDistMangleIdentifier);

	var _specialize = _interopRequire(_esastDistSpecialize);

	const declareToId = new WeakMap(),
	      LitTrue = _esastDistAst.Literal(true);

	const idForDeclareCached = function (localDeclare) {
		let _ = declareToId.get(localDeclare);
		if (_ === undefined) {
			_ = _esastDistAst.Identifier(_mangleIdentifier(localDeclare.name));
			declareToId.set(localDeclare, _);
		}
		return _;
	},
	      idForDeclareNew = function (localDeclare) {
		return _esastDistAst.Identifier(idForDeclareCached(localDeclare).name);
	},
	      declare = function (localDeclare, val) {
		return _esastDistSpecialize.variableDeclarationConst([_esastDistAst.VariableDeclarator(idForDeclareCached(localDeclare), val)]);
	},
	      declareSpecial = function (name, val) {
		return _esastDistSpecialize.variableDeclarationConst([_esastDistAst.VariableDeclarator(_esastDistUtil.idCached(name), val)]);
	},
	      throwError = function (msg) {
		return _esastDistAst.ThrowStatement(_esastDistAst.NewExpression(_esastDistAst.Identifier('Error'), [_esastDistAst.Literal(msg)]));
	},
	      binaryExpressionPlus = _specialize(_esastDistAst.BinaryExpression, ['left', _esastDistAst.Expression, 'right', _esastDistAst.Expression], { operator: '+' }),
	      switchStatementOnTrue = _specialize(_esastDistAst.SwitchStatement, ['cases', [_esastDistAst.SwitchCase]], {
		discriminant: LitTrue,
		// May contain nested variable declarations
		lexical: true
	}),
	      unaryExpressionNegate = _specialize(_esastDistAst.UnaryExpression, ['argument', _esastDistAst.Expression], { operator: '-' }),
	      whileStatementInfinite = _specialize(_esastDistAst.WhileStatement, ['body', _esastDistAst.Statement], { test: LitTrue });
	exports.idForDeclareCached = idForDeclareCached;
	exports.idForDeclareNew = idForDeclareNew;
	exports.declare = declare;
	exports.declareSpecial = declareSpecial;
	exports.throwError = throwError;
	exports.binaryExpressionPlus = binaryExpressionPlus;
	exports.switchStatementOnTrue = switchStatementOnTrue;
	exports.unaryExpressionNegate = unaryExpressionNegate;
	exports.whileStatementInfinite = whileStatementInfinite;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9lc2FzdC11dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFPQSxPQUNDLFdBQVcsR0FBRyxJQUFJLE9BQU8sRUFBRTtPQUMzQixPQUFPLEdBQUcsY0FUd0MsT0FBTyxDQVN2QyxJQUFJLENBQUMsQ0FBQTs7QUFFakIsT0FDTixrQkFBa0IsR0FBRyxVQUFBLFlBQVksRUFBSTtBQUNwQyxNQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ3JDLE1BQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNwQixJQUFDLEdBQUcsY0FmZ0MsVUFBVSxDQWUvQixrQkFBaUIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDbkQsY0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUE7R0FDaEM7QUFDRCxTQUFPLENBQUMsQ0FBQTtFQUNSO09BRUQsZUFBZSxHQUFHLFVBQUEsWUFBWTtTQUFJLGNBckJJLFVBQVUsQ0FxQkgsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDO0VBQUE7T0FFbkYsT0FBTyxHQUFHLFVBQUMsWUFBWSxFQUFFLEdBQUc7U0FDM0IscUJBcEJtQix3QkFBd0IsQ0FvQmxCLENBQUUsY0F2QnNCLGtCQUFrQixDQXVCckIsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQztFQUFBO09BRXhGLGNBQWMsR0FBRyxVQUFDLElBQUksRUFBRSxHQUFHO1NBQzFCLHFCQXZCbUIsd0JBQXdCLENBdUJsQixDQUFFLGNBMUJzQixrQkFBa0IsQ0EwQnJCLGVBdEJ2QyxRQUFRLENBc0J3QyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFDO0VBQUE7T0FFdEUsVUFBVSxHQUFHLFVBQUEsR0FBRztTQUNmLGNBN0JnQixjQUFjLENBNkJmLGNBOUIyQyxhQUFhLENBOEIxQyxjQTlCUSxVQUFVLENBOEJQLE9BQU8sQ0FBQyxFQUFFLENBQUUsY0E5QkgsT0FBTyxDQThCSSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUM7RUFBQTtPQUVyRSxvQkFBb0IsR0FBRywwQkFoQ0gsZ0JBQWdCLEVBaUNuQyxDQUFFLE1BQU0sZ0JBakNELFVBQVUsRUFpQ0ssT0FBTyxnQkFqQ3RCLFVBQVUsQ0FpQzBCLEVBQzNDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDO09BRW5CLHFCQUFxQixHQUFHLDBCQW5DeEIsZUFBZSxFQW9DZCxDQUFFLE9BQU8sRUFBRSxlQXJDeUUsVUFBVSxDQXFDdkUsQ0FBRSxFQUN6QjtBQUNDLGNBQVksRUFBRSxPQUFPOztBQUVyQixTQUFPLEVBQUUsSUFBSTtFQUNiLENBQUM7T0FFSCxxQkFBcUIsR0FBRywwQkEzQ1MsZUFBZSxFQTRDL0MsQ0FBRSxVQUFVLGdCQTdDTCxVQUFVLENBNkNTLEVBQzFCLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDO09BRW5CLHNCQUFzQixHQUFHLDBCQS9DNkMsY0FBYyxFQWdEbkYsQ0FBRSxNQUFNLGdCQWpEaUUsU0FBUyxDQWlEN0QsRUFDckIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtTQXRDbkIsa0JBQWtCLEdBQWxCLGtCQUFrQjtTQVNsQixlQUFlLEdBQWYsZUFBZTtTQUVmLE9BQU8sR0FBUCxPQUFPO1NBR1AsY0FBYyxHQUFkLGNBQWM7U0FHZCxVQUFVLEdBQVYsVUFBVTtTQUdWLG9CQUFvQixHQUFwQixvQkFBb0I7U0FJcEIscUJBQXFCLEdBQXJCLHFCQUFxQjtTQVFyQixxQkFBcUIsR0FBckIscUJBQXFCO1NBSXJCLHNCQUFzQixHQUF0QixzQkFBc0IiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdHJhbnNwaWxlL2VzYXN0LXV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBJZGVudGlmaWVyLCBMaXRlcmFsLCBOZXdFeHByZXNzaW9uLCBTdGF0ZW1lbnQsIFN3aXRjaENhc2UsXG5cdFN3aXRjaFN0YXRlbWVudCwgVGhyb3dTdGF0ZW1lbnQsIFVuYXJ5RXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdG9yLCBXaGlsZVN0YXRlbWVudFxuXHR9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IG1hbmdsZUlkZW50aWZpZXIgZnJvbSAnZXNhc3QvZGlzdC9tYW5nbGUtaWRlbnRpZmllcidcbmltcG9ydCBzcGVjaWFsaXplLCB7IHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdCB9IGZyb20gJ2VzYXN0L2Rpc3Qvc3BlY2lhbGl6ZSdcbmltcG9ydCB7IGlkQ2FjaGVkIH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuXG5jb25zdFxuXHRkZWNsYXJlVG9JZCA9IG5ldyBXZWFrTWFwKCksXG5cdExpdFRydWUgPSBMaXRlcmFsKHRydWUpXG5cbmV4cG9ydCBjb25zdFxuXHRpZEZvckRlY2xhcmVDYWNoZWQgPSBsb2NhbERlY2xhcmUgPT4ge1xuXHRcdGxldCBfID0gZGVjbGFyZVRvSWQuZ2V0KGxvY2FsRGVjbGFyZSlcblx0XHRpZiAoXyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRfID0gSWRlbnRpZmllcihtYW5nbGVJZGVudGlmaWVyKGxvY2FsRGVjbGFyZS5uYW1lKSlcblx0XHRcdGRlY2xhcmVUb0lkLnNldChsb2NhbERlY2xhcmUsIF8pXG5cdFx0fVxuXHRcdHJldHVybiBfXG5cdH0sXG5cblx0aWRGb3JEZWNsYXJlTmV3ID0gbG9jYWxEZWNsYXJlID0+IElkZW50aWZpZXIoaWRGb3JEZWNsYXJlQ2FjaGVkKGxvY2FsRGVjbGFyZSkubmFtZSksXG5cblx0ZGVjbGFyZSA9IChsb2NhbERlY2xhcmUsIHZhbCkgPT5cblx0XHR2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoWyBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGxvY2FsRGVjbGFyZSksIHZhbCkgXSksXG5cblx0ZGVjbGFyZVNwZWNpYWwgPSAobmFtZSwgdmFsKSA9PlxuXHRcdHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdChbIFZhcmlhYmxlRGVjbGFyYXRvcihpZENhY2hlZChuYW1lKSwgdmFsKSBdKSxcblxuXHR0aHJvd0Vycm9yID0gbXNnID0+XG5cdFx0VGhyb3dTdGF0ZW1lbnQoTmV3RXhwcmVzc2lvbihJZGVudGlmaWVyKCdFcnJvcicpLCBbIExpdGVyYWwobXNnKSBdKSksXG5cblx0YmluYXJ5RXhwcmVzc2lvblBsdXMgPSBzcGVjaWFsaXplKEJpbmFyeUV4cHJlc3Npb24sXG5cdFx0WyAnbGVmdCcsIEV4cHJlc3Npb24sICdyaWdodCcsIEV4cHJlc3Npb24gXSxcblx0XHR7IG9wZXJhdG9yOiAnKycgfSksXG5cblx0c3dpdGNoU3RhdGVtZW50T25UcnVlID0gc3BlY2lhbGl6ZShTd2l0Y2hTdGF0ZW1lbnQsXG5cdFx0WyAnY2FzZXMnLCBbU3dpdGNoQ2FzZV0gXSxcblx0XHR7XG5cdFx0XHRkaXNjcmltaW5hbnQ6IExpdFRydWUsXG5cdFx0XHQvLyBNYXkgY29udGFpbiBuZXN0ZWQgdmFyaWFibGUgZGVjbGFyYXRpb25zXG5cdFx0XHRsZXhpY2FsOiB0cnVlXG5cdFx0fSksXG5cblx0dW5hcnlFeHByZXNzaW9uTmVnYXRlID0gc3BlY2lhbGl6ZShVbmFyeUV4cHJlc3Npb24sXG5cdFx0WyAnYXJndW1lbnQnLCBFeHByZXNzaW9uIF0sXG5cdFx0eyBvcGVyYXRvcjogJy0nIH0pLFxuXG5cdHdoaWxlU3RhdGVtZW50SW5maW5pdGUgPSBzcGVjaWFsaXplKFdoaWxlU3RhdGVtZW50LFxuXHRcdFsgJ2JvZHknLCBTdGF0ZW1lbnQgXSxcblx0XHR7IHRlc3Q6IExpdFRydWUgfSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9