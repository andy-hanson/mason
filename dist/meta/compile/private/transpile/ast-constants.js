if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', './util'], function (exports, _esastDistAst, _esastDistUtil, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const Break = (0, _esastDistAst.BreakStatement)(),
	      IdDefine = (0, _esastDistAst.Identifier)('define'),
	      IdDisplayName = (0, _esastDistAst.Identifier)('displayName'),
	      IdError = (0, _esastDistAst.Identifier)('Error'),
	      IdExports = (0, _esastDistAst.Identifier)('exports'),
	      IdExtract = (0, _esastDistAst.Identifier)('_$'),
	      IdArguments = (0, _esastDistAst.Identifier)('arguments'),
	      IdFunctionApplyCall = (0, _esastDistUtil.member)((0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('Function'), 'apply'), 'call'),
	      LitEmptyArray = (0, _esastDistAst.ArrayExpression)([]),
	      LitEmptyString = (0, _esastDistAst.Literal)(''),
	      LitNull = (0, _esastDistAst.Literal)(null),
	      LitTrue = (0, _esastDistAst.Literal)(true),
	      LitStrDisplayName = (0, _esastDistAst.Literal)('displayName'),
	      LitStrExports = (0, _esastDistAst.Literal)('exports'),
	      ReturnExports = (0, _esastDistAst.ReturnStatement)(IdExports),
	      ReturnRes = (0, _esastDistAst.ReturnStatement)((0, _esastDistAst.Identifier)('res')),
	      UseStrict = (0, _esastDistAst.ExpressionStatement)((0, _esastDistAst.Literal)('use strict')),
	      ArraySliceCall = (0, _esastDistUtil.member)((0, _esastDistUtil.member)(LitEmptyArray, 'slice'), 'call'),
	     
	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = (0, _esastDistAst.IfStatement)((0, _util.binaryExpressionNotEqual)((0, _esastDistAst.UnaryExpression)('typeof', IdDefine), (0, _esastDistAst.Literal)('function')), (0, _esastDistAst.VariableDeclaration)('var', [(0, _esastDistAst.VariableDeclarator)(IdDefine, (0, _esastDistAst.CallExpression)((0, _esastDistAst.CallExpression)((0, _esastDistAst.Identifier)('require'), [(0, _esastDistAst.Literal)('amdefine')]), [(0, _esastDistAst.Identifier)('module')]))])),
	      ExportsDefault = (0, _esastDistUtil.member)(IdExports, 'default'),
	      ExportsGet = (0, _esastDistUtil.member)(IdExports, '_get');
	exports.Break = Break;
	exports.IdDefine = IdDefine;
	exports.IdDisplayName = IdDisplayName;
	exports.IdError = IdError;
	exports.IdExports = IdExports;
	exports.IdExtract = IdExtract;
	exports.IdArguments = IdArguments;
	exports.IdFunctionApplyCall = IdFunctionApplyCall;
	exports.LitEmptyArray = LitEmptyArray;
	exports.LitEmptyString = LitEmptyString;
	exports.LitNull = LitNull;
	exports.LitTrue = LitTrue;
	exports.LitStrDisplayName = LitStrDisplayName;
	exports.LitStrExports = LitStrExports;
	exports.ReturnExports = ReturnExports;
	exports.ReturnRes = ReturnRes;
	exports.UseStrict = UseStrict;
	exports.ArraySliceCall = ArraySliceCall;
	exports.AmdefineHeader = AmdefineHeader;
	exports.ExportsDefault = ExportsDefault;
	exports.ExportsGet = ExportsGet;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sS0FBSyxHQUFHLGtCQVBpQixjQUFjLEdBT2Y7T0FDeEIsUUFBUSxHQUFHLGtCQVJtRSxVQUFVLEVBUWxFLFFBQVEsQ0FBQztPQUMvQixhQUFhLEdBQUcsa0JBVDhELFVBQVUsRUFTN0QsYUFBYSxDQUFDO09BQ3pDLE9BQU8sR0FBRyxrQkFWb0UsVUFBVSxFQVVuRSxPQUFPLENBQUM7T0FDN0IsU0FBUyxHQUFHLGtCQVhrRSxVQUFVLEVBV2pFLFNBQVMsQ0FBQztPQUNqQyxTQUFTLEdBQUcsa0JBWmtFLFVBQVUsRUFZakUsSUFBSSxDQUFDO09BQzVCLFdBQVcsR0FBRyxrQkFiZ0UsVUFBVSxFQWEvRCxXQUFXLENBQUM7T0FDckMsbUJBQW1CLEdBQUcsbUJBWGQsTUFBTSxFQVdlLG1CQVhyQixNQUFNLEVBV3NCLGtCQWQwQyxVQUFVLEVBY3pDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQztPQUM3RSxhQUFhLEdBQUcsa0JBZlIsZUFBZSxFQWVTLEVBQUUsQ0FBQztPQUNuQyxjQUFjLEdBQUcsa0JBZkosT0FBTyxFQWVLLEVBQUUsQ0FBQztPQUM1QixPQUFPLEdBQUcsa0JBaEJHLE9BQU8sRUFnQkYsSUFBSSxDQUFDO09BQ3ZCLE9BQU8sR0FBRyxrQkFqQkcsT0FBTyxFQWlCRixJQUFJLENBQUM7T0FDdkIsaUJBQWlCLEdBQUcsa0JBbEJQLE9BQU8sRUFrQlEsYUFBYSxDQUFDO09BQzFDLGFBQWEsR0FBRyxrQkFuQkgsT0FBTyxFQW1CSSxTQUFTLENBQUM7T0FDbEMsYUFBYSxHQUFHLGtCQXBCTSxlQUFlLEVBb0JMLFNBQVMsQ0FBQztPQUMxQyxTQUFTLEdBQUcsa0JBckJVLGVBQWUsRUFxQlQsa0JBdEJrRCxVQUFVLEVBc0JqRCxLQUFLLENBQUMsQ0FBQztPQUM5QyxTQUFTLEdBQUcsa0JBdkI2QyxtQkFBbUIsRUF1QjVDLGtCQXRCbkIsT0FBTyxFQXNCb0IsWUFBWSxDQUFDLENBQUM7T0FFdEQsY0FBYyxHQUFHLG1CQXRCVCxNQUFNLEVBc0JVLG1CQXRCaEIsTUFBTSxFQXNCaUIsYUFBYSxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQzs7O0FBRS9ELGVBQWMsR0FBRyxrQkExQmpCLFdBQVcsRUEyQlYsVUF4Qk8sd0JBQXdCLEVBd0JOLGtCQTNCYSxlQUFlLEVBMkJaLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxrQkEzQmxELE9BQU8sRUEyQm1ELFVBQVUsQ0FBQyxDQUFDLEVBQ2xGLGtCQTVCdUQsbUJBQW1CLEVBNEJ0RCxLQUFLLEVBQUUsQ0FDMUIsa0JBN0IyRSxrQkFBa0IsRUE2QjFFLFFBQVEsRUFBRSxrQkE5QlUsY0FBYyxFQStCcEQsa0JBL0JzQyxjQUFjLEVBK0JyQyxrQkEvQjRELFVBQVUsRUErQjNELFNBQVMsQ0FBQyxFQUFFLENBQUUsa0JBOUI5QixPQUFPLEVBOEIrQixVQUFVLENBQUMsQ0FBRSxDQUFDLEVBQzlELENBQUUsa0JBaEN5RSxVQUFVLEVBZ0N4RSxRQUFRLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUM7T0FDakMsY0FBYyxHQUFHLG1CQTlCVCxNQUFNLEVBOEJVLFNBQVMsRUFBRSxTQUFTLENBQUM7T0FDN0MsVUFBVSxHQUFHLG1CQS9CTCxNQUFNLEVBK0JNLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtTQTNCdEMsS0FBSyxHQUFMLEtBQUs7U0FDTCxRQUFRLEdBQVIsUUFBUTtTQUNSLGFBQWEsR0FBYixhQUFhO1NBQ2IsT0FBTyxHQUFQLE9BQU87U0FDUCxTQUFTLEdBQVQsU0FBUztTQUNULFNBQVMsR0FBVCxTQUFTO1NBQ1QsV0FBVyxHQUFYLFdBQVc7U0FDWCxtQkFBbUIsR0FBbkIsbUJBQW1CO1NBQ25CLGFBQWEsR0FBYixhQUFhO1NBQ2IsY0FBYyxHQUFkLGNBQWM7U0FDZCxPQUFPLEdBQVAsT0FBTztTQUNQLE9BQU8sR0FBUCxPQUFPO1NBQ1AsaUJBQWlCLEdBQWpCLGlCQUFpQjtTQUNqQixhQUFhLEdBQWIsYUFBYTtTQUNiLGFBQWEsR0FBYixhQUFhO1NBQ2IsU0FBUyxHQUFULFNBQVM7U0FDVCxTQUFTLEdBQVQsU0FBUztTQUVULGNBQWMsR0FBZCxjQUFjO1NBRWQsY0FBYyxHQUFkLGNBQWM7U0FNZCxjQUFjLEdBQWQsY0FBYztTQUNkLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCcmVha1N0YXRlbWVudCwgQ2FsbEV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIElkZW50aWZpZXIsXG5cdElmU3RhdGVtZW50LCBMaXRlcmFsLCBSZXR1cm5TdGF0ZW1lbnQsIFVuYXJ5RXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdGlvbiwgVmFyaWFibGVEZWNsYXJhdG9yXG5cdH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBtZW1iZXIgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyBiaW5hcnlFeHByZXNzaW9uTm90RXF1YWwgfSBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBjb25zdFxuXHRCcmVhayA9IEJyZWFrU3RhdGVtZW50KCksXG5cdElkRGVmaW5lID0gSWRlbnRpZmllcignZGVmaW5lJyksXG5cdElkRGlzcGxheU5hbWUgPSBJZGVudGlmaWVyKCdkaXNwbGF5TmFtZScpLFxuXHRJZEVycm9yID0gSWRlbnRpZmllcignRXJyb3InKSxcblx0SWRFeHBvcnRzID0gSWRlbnRpZmllcignZXhwb3J0cycpLFxuXHRJZEV4dHJhY3QgPSBJZGVudGlmaWVyKCdfJCcpLFxuXHRJZEFyZ3VtZW50cyA9IElkZW50aWZpZXIoJ2FyZ3VtZW50cycpLFxuXHRJZEZ1bmN0aW9uQXBwbHlDYWxsID0gbWVtYmVyKG1lbWJlcihJZGVudGlmaWVyKCdGdW5jdGlvbicpLCAnYXBwbHknKSwgJ2NhbGwnKSxcblx0TGl0RW1wdHlBcnJheSA9IEFycmF5RXhwcmVzc2lvbihbXSksXG5cdExpdEVtcHR5U3RyaW5nID0gTGl0ZXJhbCgnJyksXG5cdExpdE51bGwgPSBMaXRlcmFsKG51bGwpLFxuXHRMaXRUcnVlID0gTGl0ZXJhbCh0cnVlKSxcblx0TGl0U3RyRGlzcGxheU5hbWUgPSBMaXRlcmFsKCdkaXNwbGF5TmFtZScpLFxuXHRMaXRTdHJFeHBvcnRzID0gTGl0ZXJhbCgnZXhwb3J0cycpLFxuXHRSZXR1cm5FeHBvcnRzID0gUmV0dXJuU3RhdGVtZW50KElkRXhwb3J0cyksXG5cdFJldHVyblJlcyA9IFJldHVyblN0YXRlbWVudChJZGVudGlmaWVyKCdyZXMnKSksXG5cdFVzZVN0cmljdCA9IEV4cHJlc3Npb25TdGF0ZW1lbnQoTGl0ZXJhbCgndXNlIHN0cmljdCcpKSxcblxuXHRBcnJheVNsaWNlQ2FsbCA9IG1lbWJlcihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ3NsaWNlJyksICdjYWxsJyksXG5cdC8vIGlmICh0eXBlb2YgZGVmaW5lICE9PSAnZnVuY3Rpb24nKSB2YXIgZGVmaW5lID0gcmVxdWlyZSgnYW1kZWZpbmUnKShtb2R1bGUpXG5cdEFtZGVmaW5lSGVhZGVyID0gSWZTdGF0ZW1lbnQoXG5cdFx0YmluYXJ5RXhwcmVzc2lvbk5vdEVxdWFsKFVuYXJ5RXhwcmVzc2lvbigndHlwZW9mJywgSWREZWZpbmUpLCBMaXRlcmFsKCdmdW5jdGlvbicpKSxcblx0XHRWYXJpYWJsZURlY2xhcmF0aW9uKCd2YXInLCBbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWREZWZpbmUsIENhbGxFeHByZXNzaW9uKFxuXHRcdFx0XHRDYWxsRXhwcmVzc2lvbihJZGVudGlmaWVyKCdyZXF1aXJlJyksIFsgTGl0ZXJhbCgnYW1kZWZpbmUnKSBdKSxcblx0XHRcdFx0WyBJZGVudGlmaWVyKCdtb2R1bGUnKSBdKSkgXSkpLFxuXHRFeHBvcnRzRGVmYXVsdCA9IG1lbWJlcihJZEV4cG9ydHMsICdkZWZhdWx0JyksXG5cdEV4cG9ydHNHZXQgPSBtZW1iZXIoSWRFeHBvcnRzLCAnX2dldCcpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==