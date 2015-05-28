if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util'], function (exports, _esastDistAst, _esastDistUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const IdArguments = (0, _esastDistAst.Identifier)('arguments'),
	      IdBuilt = (0, _esastDistAst.Identifier)('built'),
	      IdDefine = (0, _esastDistAst.Identifier)('define'),
	      IdError = (0, _esastDistAst.Identifier)('Error'),
	      IdExports = (0, _esastDistAst.Identifier)('exports'),
	      IdExtract = (0, _esastDistAst.Identifier)('_$'),
	      IdFunctionApplyCall = (0, _esastDistUtil.member)((0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('Function'), 'apply'), 'call'),
	      LitEmptyArray = (0, _esastDistAst.ArrayExpression)([]),
	      LitEmptyString = (0, _esastDistAst.Literal)(''),
	      LitNull = (0, _esastDistAst.Literal)(null),
	      LitTrue = (0, _esastDistAst.Literal)(true),
	      LitZero = (0, _esastDistAst.Literal)(0),
	      LitStrExports = (0, _esastDistAst.Literal)('exports'),
	      ReturnBuilt = (0, _esastDistAst.ReturnStatement)(IdBuilt),
	      ReturnExports = (0, _esastDistAst.ReturnStatement)(IdExports),
	      ReturnRes = (0, _esastDistAst.ReturnStatement)((0, _esastDistAst.Identifier)('res')),
	      SymbolIterator = (0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('Symbol'), 'iterator'),
	      UseStrict = (0, _esastDistAst.ExpressionStatement)((0, _esastDistAst.Literal)('use strict')),
	      ArraySliceCall = (0, _esastDistUtil.member)((0, _esastDistUtil.member)(LitEmptyArray, 'slice'), 'call'),
	     
	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = (0, _esastDistAst.IfStatement)((0, _esastDistAst.BinaryExpression)('!==', (0, _esastDistAst.UnaryExpression)('typeof', IdDefine), (0, _esastDistAst.Literal)('function')), (0, _esastDistAst.VariableDeclaration)('var', [(0, _esastDistAst.VariableDeclarator)(IdDefine, (0, _esastDistAst.CallExpression)((0, _esastDistAst.CallExpression)((0, _esastDistAst.Identifier)('require'), [(0, _esastDistAst.Literal)('amdefine')]), [(0, _esastDistAst.Identifier)('module')]))])),
	      DeclareBuiltBag = (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(IdBuilt, LitEmptyArray)]),
	      DeclareBuiltMap = (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(IdBuilt, (0, _esastDistAst.NewExpression)((0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('global'), 'Map'), []))]),
	      DeclareBuiltObj = (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(IdBuilt, (0, _esastDistAst.ObjectExpression)([]))]),
	      ExportsDefault = (0, _esastDistUtil.member)(IdExports, 'default'),
	      ExportsGet = (0, _esastDistUtil.member)(IdExports, '_get');
	exports.IdArguments = IdArguments;
	exports.IdBuilt = IdBuilt;
	exports.IdDefine = IdDefine;
	exports.IdError = IdError;
	exports.IdExports = IdExports;
	exports.IdExtract = IdExtract;
	exports.IdFunctionApplyCall = IdFunctionApplyCall;
	exports.LitEmptyArray = LitEmptyArray;
	exports.LitEmptyString = LitEmptyString;
	exports.LitNull = LitNull;
	exports.LitTrue = LitTrue;
	exports.LitZero = LitZero;
	exports.LitStrExports = LitStrExports;
	exports.ReturnBuilt = ReturnBuilt;
	exports.ReturnExports = ReturnExports;
	exports.ReturnRes = ReturnRes;
	exports.SymbolIterator = SymbolIterator;
	exports.UseStrict = UseStrict;
	exports.ArraySliceCall = ArraySliceCall;
	exports.AmdefineHeader = AmdefineHeader;
	exports.DeclareBuiltBag = DeclareBuiltBag;
	exports.DeclareBuiltMap = DeclareBuiltMap;
	exports.DeclareBuiltObj = DeclareBuiltObj;
	exports.ExportsDefault = ExportsDefault;
	exports.ExportsGet = ExportsGet;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sV0FBVyxHQUFHLGtCQVBrRSxVQUFVLEVBT2pFLFdBQVcsQ0FBQztPQUNyQyxPQUFPLEdBQUcsa0JBUnNFLFVBQVUsRUFRckUsT0FBTyxDQUFDO09BQzdCLFFBQVEsR0FBRyxrQkFUcUUsVUFBVSxFQVNwRSxRQUFRLENBQUM7T0FDL0IsT0FBTyxHQUFHLGtCQVZzRSxVQUFVLEVBVXJFLE9BQU8sQ0FBQztPQUM3QixTQUFTLEdBQUcsa0JBWG9FLFVBQVUsRUFXbkUsU0FBUyxDQUFDO09BQ2pDLFNBQVMsR0FBRyxrQkFab0UsVUFBVSxFQVluRSxJQUFJLENBQUM7T0FDNUIsbUJBQW1CLEdBQUcsbUJBVmQsTUFBTSxFQVVlLG1CQVZyQixNQUFNLEVBVXNCLGtCQWI0QyxVQUFVLEVBYTNDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQztPQUM3RSxhQUFhLEdBQUcsa0JBZFIsZUFBZSxFQWNTLEVBQUUsQ0FBQztPQUNuQyxjQUFjLEdBQUcsa0JBZEosT0FBTyxFQWNLLEVBQUUsQ0FBQztPQUM1QixPQUFPLEdBQUcsa0JBZkcsT0FBTyxFQWVGLElBQUksQ0FBQztPQUN2QixPQUFPLEdBQUcsa0JBaEJHLE9BQU8sRUFnQkYsSUFBSSxDQUFDO09BQ3ZCLE9BQU8sR0FBRyxrQkFqQkcsT0FBTyxFQWlCRixDQUFDLENBQUM7T0FDcEIsYUFBYSxHQUFHLGtCQWxCSCxPQUFPLEVBa0JJLFNBQVMsQ0FBQztPQUNsQyxXQUFXLEdBQUcsa0JBbkJ5QyxlQUFlLEVBbUJ4QyxPQUFPLENBQUM7T0FDdEMsYUFBYSxHQUFHLGtCQXBCdUMsZUFBZSxFQW9CdEMsU0FBUyxDQUFDO09BQzFDLFNBQVMsR0FBRyxrQkFyQjJDLGVBQWUsRUFxQjFDLGtCQXRCb0QsVUFBVSxFQXNCbkQsS0FBSyxDQUFDLENBQUM7T0FDOUMsY0FBYyxHQUFHLG1CQXBCVCxNQUFNLEVBb0JVLGtCQXZCd0QsVUFBVSxFQXVCdkQsUUFBUSxDQUFDLEVBQUUsVUFBVSxDQUFDO09BQ3pELFNBQVMsR0FBRyxrQkF4QitDLG1CQUFtQixFQXdCOUMsa0JBdkJuQixPQUFPLEVBdUJvQixZQUFZLENBQUMsQ0FBQztPQUV0RCxjQUFjLEdBQUcsbUJBdkJULE1BQU0sRUF1QlUsbUJBdkJoQixNQUFNLEVBdUJpQixhQUFhLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDOzs7QUFFL0QsZUFBYyxHQUFHLGtCQTNCakIsV0FBVyxFQTRCVixrQkE3QndCLGdCQUFnQixFQTZCdkIsS0FBSyxFQUFFLGtCQTVCK0MsZUFBZSxFQTRCOUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLGtCQTVCakQsT0FBTyxFQTRCa0QsVUFBVSxDQUFDLENBQUMsRUFDakYsa0JBNUJELG1CQUFtQixFQTRCRSxLQUFLLEVBQUUsQ0FDMUIsa0JBN0JtQixrQkFBa0IsRUE2QmxCLFFBQVEsRUFBRSxrQkEvQlksY0FBYyxFQWdDdEQsa0JBaEN3QyxjQUFjLEVBZ0N2QyxrQkFoQzhELFVBQVUsRUFnQzdELFNBQVMsQ0FBQyxFQUFFLENBQUUsa0JBL0I5QixPQUFPLEVBK0IrQixVQUFVLENBQUMsQ0FBRSxDQUFDLEVBQzlELENBQUUsa0JBakMyRSxVQUFVLEVBaUMxRSxRQUFRLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUM7T0FDakMsZUFBZSxHQUFHLGtCQWhDbEIsbUJBQW1CLEVBZ0NtQixPQUFPLEVBQUUsQ0FBRSxrQkFoQzVCLGtCQUFrQixFQWdDNkIsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFFLENBQUM7T0FDOUYsZUFBZSxHQUFHLGtCQWpDbEIsbUJBQW1CLEVBaUNtQixPQUFPLEVBQUUsQ0FDOUMsa0JBbENvQixrQkFBa0IsRUFrQ25CLE9BQU8sRUFDekIsa0JBcENvQixhQUFhLEVBb0NuQixtQkFsQ1IsTUFBTSxFQWtDUyxrQkFyQ3lELFVBQVUsRUFxQ3hELFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsQ0FBQyxDQUFDLENBQUUsQ0FBQztPQUM3RCxlQUFlLEdBQUcsa0JBcENsQixtQkFBbUIsRUFvQ21CLE9BQU8sRUFBRSxDQUM5QyxrQkFyQ29CLGtCQUFrQixFQXFDbkIsT0FBTyxFQUFFLGtCQXRDUSxnQkFBZ0IsRUFzQ1AsRUFBRyxDQUFDLENBQUMsQ0FBRSxDQUFDO09BRXRELGNBQWMsR0FBRyxtQkF0Q1QsTUFBTSxFQXNDVSxTQUFTLEVBQUUsU0FBUyxDQUFDO09BQzdDLFVBQVUsR0FBRyxtQkF2Q0wsTUFBTSxFQXVDTSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FuQ3RDLFdBQVcsR0FBWCxXQUFXO1NBQ1gsT0FBTyxHQUFQLE9BQU87U0FDUCxRQUFRLEdBQVIsUUFBUTtTQUNSLE9BQU8sR0FBUCxPQUFPO1NBQ1AsU0FBUyxHQUFULFNBQVM7U0FDVCxTQUFTLEdBQVQsU0FBUztTQUNULG1CQUFtQixHQUFuQixtQkFBbUI7U0FDbkIsYUFBYSxHQUFiLGFBQWE7U0FDYixjQUFjLEdBQWQsY0FBYztTQUNkLE9BQU8sR0FBUCxPQUFPO1NBQ1AsT0FBTyxHQUFQLE9BQU87U0FDUCxPQUFPLEdBQVAsT0FBTztTQUNQLGFBQWEsR0FBYixhQUFhO1NBQ2IsV0FBVyxHQUFYLFdBQVc7U0FDWCxhQUFhLEdBQWIsYUFBYTtTQUNiLFNBQVMsR0FBVCxTQUFTO1NBQ1QsY0FBYyxHQUFkLGNBQWM7U0FDZCxTQUFTLEdBQVQsU0FBUztTQUVULGNBQWMsR0FBZCxjQUFjO1NBRWQsY0FBYyxHQUFkLGNBQWM7U0FNZCxlQUFlLEdBQWYsZUFBZTtTQUNmLGVBQWUsR0FBZixlQUFlO1NBR2YsZUFBZSxHQUFmLGVBQWU7U0FHZixjQUFjLEdBQWQsY0FBYztTQUNkLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBDYWxsRXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgSWRlbnRpZmllcixcblx0SWZTdGF0ZW1lbnQsIExpdGVyYWwsIE5ld0V4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sIFJldHVyblN0YXRlbWVudCwgVW5hcnlFeHByZXNzaW9uLFxuXHRWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IG1lbWJlciB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcblxuXG5leHBvcnQgY29uc3Rcblx0SWRBcmd1bWVudHMgPSBJZGVudGlmaWVyKCdhcmd1bWVudHMnKSxcblx0SWRCdWlsdCA9IElkZW50aWZpZXIoJ2J1aWx0JyksXG5cdElkRGVmaW5lID0gSWRlbnRpZmllcignZGVmaW5lJyksXG5cdElkRXJyb3IgPSBJZGVudGlmaWVyKCdFcnJvcicpLFxuXHRJZEV4cG9ydHMgPSBJZGVudGlmaWVyKCdleHBvcnRzJyksXG5cdElkRXh0cmFjdCA9IElkZW50aWZpZXIoJ18kJyksXG5cdElkRnVuY3Rpb25BcHBseUNhbGwgPSBtZW1iZXIobWVtYmVyKElkZW50aWZpZXIoJ0Z1bmN0aW9uJyksICdhcHBseScpLCAnY2FsbCcpLFxuXHRMaXRFbXB0eUFycmF5ID0gQXJyYXlFeHByZXNzaW9uKFtdKSxcblx0TGl0RW1wdHlTdHJpbmcgPSBMaXRlcmFsKCcnKSxcblx0TGl0TnVsbCA9IExpdGVyYWwobnVsbCksXG5cdExpdFRydWUgPSBMaXRlcmFsKHRydWUpLFxuXHRMaXRaZXJvID0gTGl0ZXJhbCgwKSxcblx0TGl0U3RyRXhwb3J0cyA9IExpdGVyYWwoJ2V4cG9ydHMnKSxcblx0UmV0dXJuQnVpbHQgPSBSZXR1cm5TdGF0ZW1lbnQoSWRCdWlsdCksXG5cdFJldHVybkV4cG9ydHMgPSBSZXR1cm5TdGF0ZW1lbnQoSWRFeHBvcnRzKSxcblx0UmV0dXJuUmVzID0gUmV0dXJuU3RhdGVtZW50KElkZW50aWZpZXIoJ3JlcycpKSxcblx0U3ltYm9sSXRlcmF0b3IgPSBtZW1iZXIoSWRlbnRpZmllcignU3ltYm9sJyksICdpdGVyYXRvcicpLFxuXHRVc2VTdHJpY3QgPSBFeHByZXNzaW9uU3RhdGVtZW50KExpdGVyYWwoJ3VzZSBzdHJpY3QnKSksXG5cblx0QXJyYXlTbGljZUNhbGwgPSBtZW1iZXIobWVtYmVyKExpdEVtcHR5QXJyYXksICdzbGljZScpLCAnY2FsbCcpLFxuXHQvLyBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ2Z1bmN0aW9uJykgdmFyIGRlZmluZSA9IHJlcXVpcmUoJ2FtZGVmaW5lJykobW9kdWxlKVxuXHRBbWRlZmluZUhlYWRlciA9IElmU3RhdGVtZW50KFxuXHRcdEJpbmFyeUV4cHJlc3Npb24oJyE9PScsIFVuYXJ5RXhwcmVzc2lvbigndHlwZW9mJywgSWREZWZpbmUpLCBMaXRlcmFsKCdmdW5jdGlvbicpKSxcblx0XHRWYXJpYWJsZURlY2xhcmF0aW9uKCd2YXInLCBbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWREZWZpbmUsIENhbGxFeHByZXNzaW9uKFxuXHRcdFx0XHRDYWxsRXhwcmVzc2lvbihJZGVudGlmaWVyKCdyZXF1aXJlJyksIFsgTGl0ZXJhbCgnYW1kZWZpbmUnKSBdKSxcblx0XHRcdFx0WyBJZGVudGlmaWVyKCdtb2R1bGUnKSBdKSkgXSkpLFxuXHREZWNsYXJlQnVpbHRCYWcgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFsgVmFyaWFibGVEZWNsYXJhdG9yKElkQnVpbHQsIExpdEVtcHR5QXJyYXkpIF0pLFxuXHREZWNsYXJlQnVpbHRNYXAgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCxcblx0XHRcdE5ld0V4cHJlc3Npb24obWVtYmVyKElkZW50aWZpZXIoJ2dsb2JhbCcpLCAnTWFwJyksIFsgXSkpIF0pLFxuXHREZWNsYXJlQnVpbHRPYmogPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCwgT2JqZWN0RXhwcmVzc2lvbihbIF0pKSBdKSxcblxuXHRFeHBvcnRzRGVmYXVsdCA9IG1lbWJlcihJZEV4cG9ydHMsICdkZWZhdWx0JyksXG5cdEV4cG9ydHNHZXQgPSBtZW1iZXIoSWRFeHBvcnRzLCAnX2dldCcpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==