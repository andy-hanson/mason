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
	      LitStrOhNo = (0, _esastDistAst.Literal)('Oh no!'),
	      LitStrExports = (0, _esastDistAst.Literal)('exports'),
	      LitTrue = (0, _esastDistAst.Literal)(true),
	      LitZero = (0, _esastDistAst.Literal)(0),
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
	exports.LitStrOhNo = LitStrOhNo;
	exports.LitStrExports = LitStrExports;
	exports.LitTrue = LitTrue;
	exports.LitZero = LitZero;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sV0FBVyxHQUFHLGtCQVBrRSxVQUFVLEVBT2pFLFdBQVcsQ0FBQztPQUNyQyxPQUFPLEdBQUcsa0JBUnNFLFVBQVUsRUFRckUsT0FBTyxDQUFDO09BQzdCLFFBQVEsR0FBRyxrQkFUcUUsVUFBVSxFQVNwRSxRQUFRLENBQUM7T0FDL0IsT0FBTyxHQUFHLGtCQVZzRSxVQUFVLEVBVXJFLE9BQU8sQ0FBQztPQUM3QixTQUFTLEdBQUcsa0JBWG9FLFVBQVUsRUFXbkUsU0FBUyxDQUFDO09BQ2pDLFNBQVMsR0FBRyxrQkFab0UsVUFBVSxFQVluRSxJQUFJLENBQUM7T0FDNUIsbUJBQW1CLEdBQUcsbUJBVmQsTUFBTSxFQVVlLG1CQVZyQixNQUFNLEVBVXNCLGtCQWI0QyxVQUFVLEVBYTNDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQztPQUM3RSxhQUFhLEdBQUcsa0JBZFIsZUFBZSxFQWNTLEVBQUUsQ0FBQztPQUNuQyxjQUFjLEdBQUcsa0JBZEosT0FBTyxFQWNLLEVBQUUsQ0FBQztPQUM1QixPQUFPLEdBQUcsa0JBZkcsT0FBTyxFQWVGLElBQUksQ0FBQztPQUN2QixVQUFVLEdBQUcsa0JBaEJBLE9BQU8sRUFnQkMsUUFBUSxDQUFDO09BQzlCLGFBQWEsR0FBRyxrQkFqQkgsT0FBTyxFQWlCSSxTQUFTLENBQUM7T0FDbEMsT0FBTyxHQUFHLGtCQWxCRyxPQUFPLEVBa0JGLElBQUksQ0FBQztPQUN2QixPQUFPLEdBQUcsa0JBbkJHLE9BQU8sRUFtQkYsQ0FBQyxDQUFDO09BQ3BCLFdBQVcsR0FBRyxrQkFwQnlDLGVBQWUsRUFvQnhDLE9BQU8sQ0FBQztPQUN0QyxhQUFhLEdBQUcsa0JBckJ1QyxlQUFlLEVBcUJ0QyxTQUFTLENBQUM7T0FDMUMsU0FBUyxHQUFHLGtCQXRCMkMs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cHJpdmF0ZS90cmFuc3BpbGUvYXN0LWNvbnN0YW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycmF5RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgQ2FsbEV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIElkZW50aWZpZXIsXG5cdElmU3RhdGVtZW50LCBMaXRlcmFsLCBOZXdFeHByZXNzaW9uLCBPYmplY3RFeHByZXNzaW9uLCBSZXR1cm5TdGF0ZW1lbnQsIFVuYXJ5RXhwcmVzc2lvbixcblx0VmFyaWFibGVEZWNsYXJhdGlvbiwgVmFyaWFibGVEZWNsYXJhdG9yIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBtZW1iZXIgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5cblxuZXhwb3J0IGNvbnN0XG5cdElkQXJndW1lbnRzID0gSWRlbnRpZmllcignYXJndW1lbnRzJyksXG5cdElkQnVpbHQgPSBJZGVudGlmaWVyKCdidWlsdCcpLFxuXHRJZERlZmluZSA9IElkZW50aWZpZXIoJ2RlZmluZScpLFxuXHRJZEVycm9yID0gSWRlbnRpZmllcignRXJyb3InKSxcblx0SWRFeHBvcnRzID0gSWRlbnRpZmllcignZXhwb3J0cycpLFxuXHRJZEV4dHJhY3QgPSBJZGVudGlmaWVyKCdfJCcpLFxuXHRJZEZ1bmN0aW9uQXBwbHlDYWxsID0gbWVtYmVyKG1lbWJlcihJZGVudGlmaWVyKCdGdW5jdGlvbicpLCAnYXBwbHknKSwgJ2NhbGwnKSxcblx0TGl0RW1wdHlBcnJheSA9IEFycmF5RXhwcmVzc2lvbihbXSksXG5cdExpdEVtcHR5U3RyaW5nID0gTGl0ZXJhbCgnJyksXG5cdExpdE51bGwgPSBMaXRlcmFsKG51bGwpLFxuXHRMaXRTdHJPaE5vID0gTGl0ZXJhbCgnT2ggbm8hJyksXG5cdExpdFN0ckV4cG9ydHMgPSBMaXRlcmFsKCdleHBvcnRzJyksXG5cdExpdFRydWUgPSBMaXRlcmFsKHRydWUpLFxuXHRMaXRaZXJvID0gTGl0ZXJhbCgwKSxcblx0UmV0dXJuQnVpbHQgPSBSZXR1cm5TdGF0ZW1lbnQoSWRCdWlsdCksXG5cdFJldHVybkV4cG9ydHMgPSBSZXR1cm5TdGF0ZW1lbnQoSWRFeHBvcnRzKSxcblx0UmV0dXJuUmVzID0gUmV0dXJuU3RhdGVtZW50KElkZW50aWZpZXIoJ3JlcycpKSxcblx0U3ltYm9sSXRlcmF0b3IgPSBtZW1iZXIoSWRlbnRpZmllcignU3ltYm9sJyksICdpdGVyYXRvcicpLFxuXHRVc2VTdHJpY3QgPSBFeHByZXNzaW9uU3RhdGVtZW50KExpdGVyYWwoJ3VzZSBzdHJpY3QnKSksXG5cblx0QXJyYXlTbGljZUNhbGwgPSBtZW1iZXIobWVtYmVyKExpdEVtcHR5QXJyYXksICdzbGljZScpLCAnY2FsbCcpLFxuXHQvLyBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ2Z1bmN0aW9uJykgdmFyIGRlZmluZSA9IHJlcXVpcmUoJ2FtZGVmaW5lJykobW9kdWxlKVxuXHRBbWRlZmluZUhlYWRlciA9IElmU3RhdGVtZW50KFxuXHRcdEJpbmFyeUV4cHJlc3Npb24oJyE9PScsIFVuYXJ5RXhwcmVzc2lvbigndHlwZW9mJywgSWREZWZpbmUpLCBMaXRlcmFsKCdmdW5jdGlvbicpKSxcblx0XHRWYXJpYWJsZURlY2xhcmF0aW9uKCd2YXInLCBbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWREZWZpbmUsIENhbGxFeHByZXNzaW9uKFxuXHRcdFx0XHRDYWxsRXhwcmVzc2lvbihJZGVudGlmaWVyKCdyZXF1aXJlJyksIFsgTGl0ZXJhbCgnYW1kZWZpbmUnKSBdKSxcblx0XHRcdFx0WyBJZGVudGlmaWVyKCdtb2R1bGUnKSBdKSkgXSkpLFxuXHREZWNsYXJlQnVpbHRCYWcgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFsgVmFyaWFibGVEZWNsYXJhdG9yKElkQnVpbHQsIExpdEVtcHR5QXJyYXkpIF0pLFxuXHREZWNsYXJlQnVpbHRNYXAgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCxcblx0XHRcdE5ld0V4cHJlc3Npb24obWVtYmVyKElkZW50aWZpZXIoJ2dsb2JhbCcpLCAnTWFwJyksIFsgXSkpIF0pLFxuXHREZWNsYXJlQnVpbHRPYmogPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCwgT2JqZWN0RXhwcmVzc2lvbihbIF0pKSBdKSxcblxuXHRFeHBvcnRzRGVmYXVsdCA9IG1lbWJlcihJZEV4cG9ydHMsICdkZWZhdWx0JyksXG5cdEV4cG9ydHNHZXQgPSBtZW1iZXIoSWRFeHBvcnRzLCAnX2dldCcpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==