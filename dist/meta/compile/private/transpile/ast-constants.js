if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', './util'], function (exports, _esastDistAst, _esastDistUtil, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const EmptyTemplateElement = (0, _util.templateElementForString)(''),
	      IdArguments = (0, _esastDistAst.Identifier)('arguments'),
	      IdBuilt = (0, _esastDistAst.Identifier)('built'),
	      IdDefine = (0, _esastDistAst.Identifier)('define'),
	      IdError = _util._IdError,
	      IdExports = (0, _esastDistAst.Identifier)('exports'),
	      IdExtract = (0, _esastDistAst.Identifier)('_$'),
	      IdFunctionApplyCall = (0, _esastDistUtil.member)((0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('Function'), 'apply'), 'call'),
	     
	// TODO:ES6 Shouldn't need, just use arrow functions.
	IdLexicalThis = (0, _esastDistAst.Identifier)('_this'),
	      LitEmptyArray = (0, _esastDistAst.ArrayExpression)([]),
	      LitEmptyString = (0, _esastDistAst.Literal)(''),
	      LitNull = (0, _esastDistAst.Literal)(null),
	      LitStrExports = (0, _esastDistAst.Literal)('exports'),
	      LitStrThrow = (0, _esastDistAst.Literal)('An error occurred.'),
	      LitTrue = (0, _esastDistAst.Literal)(true),
	      LitZero = (0, _esastDistAst.Literal)(0),
	      ReturnBuilt = (0, _esastDistAst.ReturnStatement)(IdBuilt),
	      ReturnExports = (0, _esastDistAst.ReturnStatement)(IdExports),
	      ReturnRes = (0, _esastDistAst.ReturnStatement)((0, _esastDistAst.Identifier)('res')),
	      SymbolIterator = (0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('Symbol'), 'iterator'),
	      ThrowAssertFail = (0, _util.throwErrorFromString)('Assertion failed.'),
	      ThrowNoCaseMatch = (0, _util.throwErrorFromString)('No branch of `case` matches.'),
	      UseStrict = (0, _esastDistAst.ExpressionStatement)((0, _esastDistAst.Literal)('use strict')),
	      ArraySliceCall = (0, _esastDistUtil.member)((0, _esastDistUtil.member)(LitEmptyArray, 'slice'), 'call'),
	     
	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = (0, _esastDistAst.IfStatement)((0, _esastDistAst.BinaryExpression)('!==', (0, _esastDistAst.UnaryExpression)('typeof', IdDefine), (0, _esastDistAst.Literal)('function')), (0, _esastDistAst.VariableDeclaration)('var', [(0, _esastDistAst.VariableDeclarator)(IdDefine, (0, _esastDistAst.CallExpression)((0, _esastDistAst.CallExpression)((0, _esastDistAst.Identifier)('require'), [(0, _esastDistAst.Literal)('amdefine')]), [(0, _esastDistAst.Identifier)('module')]))])),
	      DeclareBuiltBag = (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(IdBuilt, LitEmptyArray)]),
	      DeclareBuiltMap = (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(IdBuilt, (0, _esastDistAst.NewExpression)((0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('global'), 'Map'), []))]),
	      DeclareBuiltObj = (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(IdBuilt, (0, _esastDistAst.ObjectExpression)([]))]),
	      ExportsDefault = (0, _esastDistUtil.member)(IdExports, 'default'),
	      ExportsGet = (0, _esastDistUtil.member)(IdExports, '_get');
	exports.EmptyTemplateElement = EmptyTemplateElement;
	exports.IdArguments = IdArguments;
	exports.IdBuilt = IdBuilt;
	exports.IdDefine = IdDefine;
	exports.IdError = IdError;
	exports.IdExports = IdExports;
	exports.IdExtract = IdExtract;
	exports.IdFunctionApplyCall = IdFunctionApplyCall;
	exports.IdLexicalThis = IdLexicalThis;
	exports.LitEmptyArray = LitEmptyArray;
	exports.LitEmptyString = LitEmptyString;
	exports.LitNull = LitNull;
	exports.LitStrExports = LitStrExports;
	exports.LitStrThrow = LitStrThrow;
	exports.LitTrue = LitTrue;
	exports.LitZero = LitZero;
	exports.ReturnBuilt = ReturnBuilt;
	exports.ReturnExports = ReturnExports;
	exports.ReturnRes = ReturnRes;
	exports.SymbolIterator = SymbolIterator;
	exports.ThrowAssertFail = ThrowAssertFail;
	exports.ThrowNoCaseMatch = ThrowNoCaseMatch;
	exports.UseStrict = UseStrict;
	exports.ArraySliceCall = ArraySliceCall;
	exports.AmdefineHeader = AmdefineHeader;
	exports.DeclareBuiltBag = DeclareBuiltBag;
	exports.DeclareBuiltMap = DeclareBuiltMap;
	exports.DeclareBuiltObj = DeclareBuiltObj;
	exports.ExportsDefault = ExportsDefault;
	exports.ExportsGet = ExportsGet;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sb0JBQW9CLEdBQUcsVUFITCx3QkFBd0IsRUFHTSxFQUFFLENBQUM7T0FDbkQsV0FBVyxHQUFHLGtCQVJrRSxVQUFVLEVBUWpFLFdBQVcsQ0FBQztPQUNyQyxPQUFPLEdBQUcsa0JBVHNFLFVBQVUsRUFTckUsT0FBTyxDQUFDO09BQzdCLFFBQVEsR0FBRyxrQkFWcUUsVUFBVSxFQVVwRSxRQUFRLENBQUM7T0FDL0IsT0FBTyxTQVBDLFFBQVEsQUFPRTtPQUNsQixTQUFTLEdBQUcsa0JBWm9FLFVBQVUsRUFZbkUsU0FBUyxDQUFDO09BQ2pDLFNBQVMsR0FBRyxrQkFib0UsVUFBVSxFQWFuRSxJQUFJLENBQUM7T0FDNUIsbUJBQW1CLEdBQUcsbUJBWGQsTUFBTSxFQVdlLG1CQVhyQixNQUFNLEVBV3NCLGtCQWQ0QyxVQUFVLEVBYzNDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQzs7O0FBRTdFLGNBQWEsR0FBRyxrQkFoQmdFLFVBQVUsRUFnQi9ELE9BQU8sQ0FBQztPQUNuQyxhQUFhLEdBQUcsa0JBakJSLGVBQWUsRUFpQlMsRUFBRSxDQUFDO09BQ25DLGNBQWMsR0FBRyxrQkFqQkosT0FBTyxFQWlCSyxFQUFFLENBQUM7T0FDNUIsT0FBTyxHQUFHLGtCQWxCRyxPQUFPLEVBa0JGLElBQUksQ0FBQztPQUN2QixhQUFhLEdBQUcsa0JBbkJILE9BQU8sRUFtQkksU0FBUyxDQUFDO09BQ2xDLFdBQVcsR0FBRyxrQkFwQkQsT0FBTyxFQW9CRSxvQkFBb0IsQ0FBQztPQUMzQyxPQUFPLEdBQUcsa0JBckJHLE9BQU8sRUFxQkYsSUFBSSxDQUFDO09BQ3ZCLE9BQU8sR0FBRyxrQkF0QkcsT0FBTyxFQXNCRixDQUFDLENBQUM7T0FDcEIsV0FBVyxHQUFHLGtCQXZCeUMsZUFBZSxFQXVC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YixhQUFhO1NBQ2IsU0FBUyxHQUFULFNBQVM7U0FDVCxjQUFjLEdBQWQsY0FBYztTQUNkLGVBQWUsR0FBZixlQUFlO1NBQ2YsZ0JBQWdCLEdBQWhCLGdCQUFnQjtTQUNoQixTQUFTLEdBQVQsU0FBUztTQUVULGNBQWMsR0FBZCxjQUFjO1NBRWQsY0FBYyxHQUFkLGNBQWM7U0FNZCxlQUFlLEdBQWYsZUFBZTtTQUNmLGVBQWUsR0FBZixlQUFlO1NBR2YsZUFBZSxHQUFmLGVBQWU7U0FFZixjQUFjLEdBQWQsY0FBYztTQUNkLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBDYWxsRXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgSWRlbnRpZmllcixcblx0SWZTdGF0ZW1lbnQsIExpdGVyYWwsIE5ld0V4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sIFJldHVyblN0YXRlbWVudCwgVW5hcnlFeHByZXNzaW9uLFxuXHRWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IG1lbWJlciB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcbmltcG9ydCB7IF9JZEVycm9yLCB0ZW1wbGF0ZUVsZW1lbnRGb3JTdHJpbmcsIHRocm93RXJyb3JGcm9tU3RyaW5nIH0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgY29uc3Rcblx0RW1wdHlUZW1wbGF0ZUVsZW1lbnQgPSB0ZW1wbGF0ZUVsZW1lbnRGb3JTdHJpbmcoJycpLFxuXHRJZEFyZ3VtZW50cyA9IElkZW50aWZpZXIoJ2FyZ3VtZW50cycpLFxuXHRJZEJ1aWx0ID0gSWRlbnRpZmllcignYnVpbHQnKSxcblx0SWREZWZpbmUgPSBJZGVudGlmaWVyKCdkZWZpbmUnKSxcblx0SWRFcnJvciA9IF9JZEVycm9yLFxuXHRJZEV4cG9ydHMgPSBJZGVudGlmaWVyKCdleHBvcnRzJyksXG5cdElkRXh0cmFjdCA9IElkZW50aWZpZXIoJ18kJyksXG5cdElkRnVuY3Rpb25BcHBseUNhbGwgPSBtZW1iZXIobWVtYmVyKElkZW50aWZpZXIoJ0Z1bmN0aW9uJyksICdhcHBseScpLCAnY2FsbCcpLFxuXHQvLyBUT0RPOkVTNiBTaG91bGRuJ3QgbmVlZCwganVzdCB1c2UgYXJyb3cgZnVuY3Rpb25zLlxuXHRJZExleGljYWxUaGlzID0gSWRlbnRpZmllcignX3RoaXMnKSxcblx0TGl0RW1wdHlBcnJheSA9IEFycmF5RXhwcmVzc2lvbihbXSksXG5cdExpdEVtcHR5U3RyaW5nID0gTGl0ZXJhbCgnJyksXG5cdExpdE51bGwgPSBMaXRlcmFsKG51bGwpLFxuXHRMaXRTdHJFeHBvcnRzID0gTGl0ZXJhbCgnZXhwb3J0cycpLFxuXHRMaXRTdHJUaHJvdyA9IExpdGVyYWwoJ0FuIGVycm9yIG9jY3VycmVkLicpLFxuXHRMaXRUcnVlID0gTGl0ZXJhbCh0cnVlKSxcblx0TGl0WmVybyA9IExpdGVyYWwoMCksXG5cdFJldHVybkJ1aWx0ID0gUmV0dXJuU3RhdGVtZW50KElkQnVpbHQpLFxuXHRSZXR1cm5FeHBvcnRzID0gUmV0dXJuU3RhdGVtZW50KElkRXhwb3J0cyksXG5cdFJldHVyblJlcyA9IFJldHVyblN0YXRlbWVudChJZGVudGlmaWVyKCdyZXMnKSksXG5cdFN5bWJvbEl0ZXJhdG9yID0gbWVtYmVyKElkZW50aWZpZXIoJ1N5bWJvbCcpLCAnaXRlcmF0b3InKSxcblx0VGhyb3dBc3NlcnRGYWlsID0gdGhyb3dFcnJvckZyb21TdHJpbmcoJ0Fzc2VydGlvbiBmYWlsZWQuJyksXG5cdFRocm93Tm9DYXNlTWF0Y2ggPSB0aHJvd0Vycm9yRnJvbVN0cmluZygnTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpLFxuXHRVc2VTdHJpY3QgPSBFeHByZXNzaW9uU3RhdGVtZW50KExpdGVyYWwoJ3VzZSBzdHJpY3QnKSksXG5cblx0QXJyYXlTbGljZUNhbGwgPSBtZW1iZXIobWVtYmVyKExpdEVtcHR5QXJyYXksICdzbGljZScpLCAnY2FsbCcpLFxuXHQvLyBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ2Z1bmN0aW9uJykgdmFyIGRlZmluZSA9IHJlcXVpcmUoJ2FtZGVmaW5lJykobW9kdWxlKVxuXHRBbWRlZmluZUhlYWRlciA9IElmU3RhdGVtZW50KFxuXHRcdEJpbmFyeUV4cHJlc3Npb24oJyE9PScsIFVuYXJ5RXhwcmVzc2lvbigndHlwZW9mJywgSWREZWZpbmUpLCBMaXRlcmFsKCdmdW5jdGlvbicpKSxcblx0XHRWYXJpYWJsZURlY2xhcmF0aW9uKCd2YXInLCBbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWREZWZpbmUsIENhbGxFeHByZXNzaW9uKFxuXHRcdFx0XHRDYWxsRXhwcmVzc2lvbihJZGVudGlmaWVyKCdyZXF1aXJlJyksIFsgTGl0ZXJhbCgnYW1kZWZpbmUnKSBdKSxcblx0XHRcdFx0WyBJZGVudGlmaWVyKCdtb2R1bGUnKSBdKSkgXSkpLFxuXHREZWNsYXJlQnVpbHRCYWcgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFsgVmFyaWFibGVEZWNsYXJhdG9yKElkQnVpbHQsIExpdEVtcHR5QXJyYXkpIF0pLFxuXHREZWNsYXJlQnVpbHRNYXAgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCxcblx0XHRcdE5ld0V4cHJlc3Npb24obWVtYmVyKElkZW50aWZpZXIoJ2dsb2JhbCcpLCAnTWFwJyksIFsgXSkpIF0pLFxuXHREZWNsYXJlQnVpbHRPYmogPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCwgT2JqZWN0RXhwcmVzc2lvbihbIF0pKSBdKSxcblx0RXhwb3J0c0RlZmF1bHQgPSBtZW1iZXIoSWRFeHBvcnRzLCAnZGVmYXVsdCcpLFxuXHRFeHBvcnRzR2V0ID0gbWVtYmVyKElkRXhwb3J0cywgJ19nZXQnKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=