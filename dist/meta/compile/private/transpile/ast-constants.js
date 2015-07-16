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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sb0JBQW9CLEdBQUcsVUFITCx3QkFBd0IsRUFHTSxFQUFFLENBQUM7T0FDbkQsV0FBVyxHQUFHLGtCQVJrRSxVQUFVLEVBUWpFLFdBQVcsQ0FBQztPQUNyQyxPQUFPLEdBQUcsa0JBVHNFLFVBQVUsRUFTckUsT0FBTyxDQUFDO09BQzdCLFFBQVEsR0FBRyxrQkFWcUUsVUFBVSxFQVVwRSxRQUFRLENBQUM7T0FDL0IsT0FBTyxTQVBDLFFBQVEsQUFPRTtPQUNsQixTQUFTLEdBQUcsa0JBWm9FLFVBQVUsRUFZbkUsU0FBUyxDQUFDO09BQ2pDLFNBQVMsR0FBRyxrQkFib0UsVUFBVSxFQWFuRSxJQUFJLENBQUM7T0FDNUIsbUJBQW1CLEdBQUcsbUJBWGQsTUFBTSxFQVdlLG1CQVhyQixNQUFNLEVBV3NCLGtCQWQ0QyxVQUFVLEVBYzNDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQztPQUM3RSxhQUFhLEdBQUcsa0JBZlIsZUFBZSxFQWVTLEVBQUUsQ0FBQztPQUNuQyxjQUFjLEdBQUcsa0JBZkosT0FBTyxFQWVLLEVBQUUsQ0FBQztPQUM1QixPQUFPLEdBQUcsa0JBaEJHLE9BQU8sRUFnQkYsSUFBSSxDQUFDO09BQ3ZCLGFBQWEsR0FBRyxrQkFqQkgsT0FBTyxFQWlCSSxTQUFTLENBQUM7T0FDbEMsV0FBVyxHQUFHLGtCQWxCRCxPQUFPLEVBa0JFLG9CQUFvQixDQUFDO09BQzNDLE9BQU8sR0FBRyxrQkFuQkcsT0FBTyxFQW1CRixJQUFJLENBQUM7T0FDdkIsT0FBTyxHQUFHLGtCQXBCRyxPQUFPLEVBb0JGLENBQUMsQ0FBQztPQUNwQixXQUFXLEdBQUcsa0JBckJ5QyxlQUFlLEVBcUJ4QyxPQUFPLENBQUM7T0FDdEMsYUFBYSxHQUFHLGtCQXRCdUMsZUFBZSxFQXNCdEMsU0FB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Z0JBQWdCLEdBQWhCLGdCQUFnQjtTQUNoQixTQUFTLEdBQVQsU0FBUztTQUVULGNBQWMsR0FBZCxjQUFjO1NBRWQsY0FBYyxHQUFkLGNBQWM7U0FNZCxlQUFlLEdBQWYsZUFBZTtTQUNmLGVBQWUsR0FBZixlQUFlO1NBR2YsZUFBZSxHQUFmLGVBQWU7U0FHZixjQUFjLEdBQWQsY0FBYztTQUNkLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBDYWxsRXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgSWRlbnRpZmllcixcblx0SWZTdGF0ZW1lbnQsIExpdGVyYWwsIE5ld0V4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sIFJldHVyblN0YXRlbWVudCwgVW5hcnlFeHByZXNzaW9uLFxuXHRWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IG1lbWJlciB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcbmltcG9ydCB7IF9JZEVycm9yLCB0ZW1wbGF0ZUVsZW1lbnRGb3JTdHJpbmcsIHRocm93RXJyb3JGcm9tU3RyaW5nIH0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgY29uc3Rcblx0RW1wdHlUZW1wbGF0ZUVsZW1lbnQgPSB0ZW1wbGF0ZUVsZW1lbnRGb3JTdHJpbmcoJycpLFxuXHRJZEFyZ3VtZW50cyA9IElkZW50aWZpZXIoJ2FyZ3VtZW50cycpLFxuXHRJZEJ1aWx0ID0gSWRlbnRpZmllcignYnVpbHQnKSxcblx0SWREZWZpbmUgPSBJZGVudGlmaWVyKCdkZWZpbmUnKSxcblx0SWRFcnJvciA9IF9JZEVycm9yLFxuXHRJZEV4cG9ydHMgPSBJZGVudGlmaWVyKCdleHBvcnRzJyksXG5cdElkRXh0cmFjdCA9IElkZW50aWZpZXIoJ18kJyksXG5cdElkRnVuY3Rpb25BcHBseUNhbGwgPSBtZW1iZXIobWVtYmVyKElkZW50aWZpZXIoJ0Z1bmN0aW9uJyksICdhcHBseScpLCAnY2FsbCcpLFxuXHRMaXRFbXB0eUFycmF5ID0gQXJyYXlFeHByZXNzaW9uKFtdKSxcblx0TGl0RW1wdHlTdHJpbmcgPSBMaXRlcmFsKCcnKSxcblx0TGl0TnVsbCA9IExpdGVyYWwobnVsbCksXG5cdExpdFN0ckV4cG9ydHMgPSBMaXRlcmFsKCdleHBvcnRzJyksXG5cdExpdFN0clRocm93ID0gTGl0ZXJhbCgnQW4gZXJyb3Igb2NjdXJyZWQuJyksXG5cdExpdFRydWUgPSBMaXRlcmFsKHRydWUpLFxuXHRMaXRaZXJvID0gTGl0ZXJhbCgwKSxcblx0UmV0dXJuQnVpbHQgPSBSZXR1cm5TdGF0ZW1lbnQoSWRCdWlsdCksXG5cdFJldHVybkV4cG9ydHMgPSBSZXR1cm5TdGF0ZW1lbnQoSWRFeHBvcnRzKSxcblx0UmV0dXJuUmVzID0gUmV0dXJuU3RhdGVtZW50KElkZW50aWZpZXIoJ3JlcycpKSxcblx0U3ltYm9sSXRlcmF0b3IgPSBtZW1iZXIoSWRlbnRpZmllcignU3ltYm9sJyksICdpdGVyYXRvcicpLFxuXHRUaHJvd0Fzc2VydEZhaWwgPSB0aHJvd0Vycm9yRnJvbVN0cmluZygnQXNzZXJ0aW9uIGZhaWxlZC4nKSxcblx0VGhyb3dOb0Nhc2VNYXRjaCA9IHRocm93RXJyb3JGcm9tU3RyaW5nKCdObyBicmFuY2ggb2YgYGNhc2VgIG1hdGNoZXMuJyksXG5cdFVzZVN0cmljdCA9IEV4cHJlc3Npb25TdGF0ZW1lbnQoTGl0ZXJhbCgndXNlIHN0cmljdCcpKSxcblxuXHRBcnJheVNsaWNlQ2FsbCA9IG1lbWJlcihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ3NsaWNlJyksICdjYWxsJyksXG5cdC8vIGlmICh0eXBlb2YgZGVmaW5lICE9PSAnZnVuY3Rpb24nKSB2YXIgZGVmaW5lID0gcmVxdWlyZSgnYW1kZWZpbmUnKShtb2R1bGUpXG5cdEFtZGVmaW5lSGVhZGVyID0gSWZTdGF0ZW1lbnQoXG5cdFx0QmluYXJ5RXhwcmVzc2lvbignIT09JywgVW5hcnlFeHByZXNzaW9uKCd0eXBlb2YnLCBJZERlZmluZSksIExpdGVyYWwoJ2Z1bmN0aW9uJykpLFxuXHRcdFZhcmlhYmxlRGVjbGFyYXRpb24oJ3ZhcicsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZERlZmluZSwgQ2FsbEV4cHJlc3Npb24oXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKElkZW50aWZpZXIoJ3JlcXVpcmUnKSwgWyBMaXRlcmFsKCdhbWRlZmluZScpIF0pLFxuXHRcdFx0XHRbIElkZW50aWZpZXIoJ21vZHVsZScpIF0pKSBdKSksXG5cdERlY2xhcmVCdWlsdEJhZyA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgWyBWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCwgTGl0RW1wdHlBcnJheSkgXSksXG5cdERlY2xhcmVCdWlsdE1hcCA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEJ1aWx0LFxuXHRcdFx0TmV3RXhwcmVzc2lvbihtZW1iZXIoSWRlbnRpZmllcignZ2xvYmFsJyksICdNYXAnKSwgWyBdKSkgXSksXG5cdERlY2xhcmVCdWlsdE9iaiA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEJ1aWx0LCBPYmplY3RFeHByZXNzaW9uKFsgXSkpIF0pLFxuXG5cdEV4cG9ydHNEZWZhdWx0ID0gbWVtYmVyKElkRXhwb3J0cywgJ2RlZmF1bHQnKSxcblx0RXhwb3J0c0dldCA9IG1lbWJlcihJZEV4cG9ydHMsICdfZ2V0JylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9