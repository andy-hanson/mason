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
	      SwitchCaseNoMatch = (0, _esastDistAst.SwitchCase)(undefined, [(0, _util.throwErrorFromString)('No branch of `switch` matches.')]),
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
	exports.SwitchCaseNoMatch = SwitchCaseNoMatch;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sb0JBQW9CLEdBQUcsVUFITCx3QkFBd0IsRUFHTSxFQUFFLENBQUM7T0FDbkQsV0FBVyxHQUFHLGtCQVJrRSxVQUFVLEVBUWpFLFdBQVcsQ0FBQztPQUNyQyxPQUFPLEdBQUcsa0JBVHNFLFVBQVUsRUFTckUsT0FBTyxDQUFDO09BQzdCLFFBQVEsR0FBRyxrQkFWcUUsVUFBVSxFQVVwRSxRQUFRLENBQUM7T0FDL0IsT0FBTyxTQVBDLFFBQVEsQUFPRTtPQUNsQixTQUFTLEdBQUcsa0JBWm9FLFVBQVUsRUFZbkUsU0FBUyxDQUFDO09BQ2pDLFNBQVMsR0FBRyxrQkFib0UsVUFBVSxFQWFuRSxJQUFJLENBQUM7T0FDNUIsbUJBQW1CLEdBQUcsbUJBWGQsTUFBTSxFQVdlLG1CQVhyQixNQUFNLEVBV3NCLGtCQWQ0QyxVQUFVLEVBYzNDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQzs7O0FBRTdFLGNBQWEsR0FBRyxrQkFoQmdFLFVBQVUsRUFnQi9ELE9BQU8sQ0FBQztPQUNuQyxhQUFhLEdBQUcsa0JBakJSLGVBQWUsRUFpQlMsRUFBRSxDQUFDO09BQ25DLGNBQWMsR0FBRyxrQkFqQkosT0FBTyxFQWlCSyxFQUFFLENBQUM7T0FDNUIsT0FBTyxHQUFHLGtCQWxCRyxPQUFPLEVBa0JGLElBQUksQ0FBQztPQUN2QixhQUFhLEdBQUcsa0JBbkJILE9BQU8sRUFtQkksU0FBUyxDQUFDO09BQ2xDLFdBQVcsR0FBRyxrQkFwQkQsT0FBTyxFQW9CRSxvQkFBb0IsQ0FBQztPQUMzQyxPQUFPLEdBQUcsa0JBckJHLE9BQU8sRUFxQkYsSUFBSSxDQUFDO09BQ3ZCLE9BQU8sR0FBRyxrQkF0QkcsT0FBTyxFQXNCRixDQUFDLENBQUM7T0FDcEIsV0FBVyxHQUFHLGtCQXZCeUMsZUFBZSxFQXVC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YixXQUFXLEdBQVgsV0FBVztTQUNYLE9BQU8sR0FBUCxPQUFPO1NBQ1AsT0FBTyxHQUFQLE9BQU87U0FDUCxXQUFXLEdBQVgsV0FBVztTQUNYLGFBQWEsR0FBYixhQUFhO1NBQ2IsU0FBUyxHQUFULFNBQVM7U0FDVCxpQkFBaUIsR0FBakIsaUJBQWlCO1NBRWpCLGNBQWMsR0FBZCxjQUFjO1NBQ2QsZUFBZSxHQUFmLGVBQWU7U0FDZixnQkFBZ0IsR0FBaEIsZ0JBQWdCO1NBQ2hCLFNBQVMsR0FBVCxTQUFTO1NBRVQsY0FBYyxHQUFkLGNBQWM7U0FFZCxjQUFjLEdBQWQsY0FBYztTQU1kLGVBQWUsR0FBZixlQUFlO1NBQ2YsZUFBZSxHQUFmLGVBQWU7U0FHZixlQUFlLEdBQWYsZUFBZTtTQUVmLGNBQWMsR0FBZCxjQUFjO1NBQ2QsVUFBVSxHQUFWLFVBQVUiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdHJhbnNwaWxlL2FzdC1jb25zdGFudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJheUV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIENhbGxFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBJZGVudGlmaWVyLFxuXHRJZlN0YXRlbWVudCwgTGl0ZXJhbCwgTmV3RXhwcmVzc2lvbiwgT2JqZWN0RXhwcmVzc2lvbiwgUmV0dXJuU3RhdGVtZW50LCBTd2l0Y2hDYXNlLFxuXHRVbmFyeUV4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRpb24sIFZhcmlhYmxlRGVjbGFyYXRvciB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IHsgbWVtYmVyIH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuaW1wb3J0IHsgX0lkRXJyb3IsIHRlbXBsYXRlRWxlbWVudEZvclN0cmluZywgdGhyb3dFcnJvckZyb21TdHJpbmcgfSBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBjb25zdFxuXHRFbXB0eVRlbXBsYXRlRWxlbWVudCA9IHRlbXBsYXRlRWxlbWVudEZvclN0cmluZygnJyksXG5cdElkQXJndW1lbnRzID0gSWRlbnRpZmllcignYXJndW1lbnRzJyksXG5cdElkQnVpbHQgPSBJZGVudGlmaWVyKCdidWlsdCcpLFxuXHRJZERlZmluZSA9IElkZW50aWZpZXIoJ2RlZmluZScpLFxuXHRJZEVycm9yID0gX0lkRXJyb3IsXG5cdElkRXhwb3J0cyA9IElkZW50aWZpZXIoJ2V4cG9ydHMnKSxcblx0SWRFeHRyYWN0ID0gSWRlbnRpZmllcignXyQnKSxcblx0SWRGdW5jdGlvbkFwcGx5Q2FsbCA9IG1lbWJlcihtZW1iZXIoSWRlbnRpZmllcignRnVuY3Rpb24nKSwgJ2FwcGx5JyksICdjYWxsJyksXG5cdC8vIFRPRE86RVM2IFNob3VsZG4ndCBuZWVkLCBqdXN0IHVzZSBhcnJvdyBmdW5jdGlvbnMuXG5cdElkTGV4aWNhbFRoaXMgPSBJZGVudGlmaWVyKCdfdGhpcycpLFxuXHRMaXRFbXB0eUFycmF5ID0gQXJyYXlFeHByZXNzaW9uKFtdKSxcblx0TGl0RW1wdHlTdHJpbmcgPSBMaXRlcmFsKCcnKSxcblx0TGl0TnVsbCA9IExpdGVyYWwobnVsbCksXG5cdExpdFN0ckV4cG9ydHMgPSBMaXRlcmFsKCdleHBvcnRzJyksXG5cdExpdFN0clRocm93ID0gTGl0ZXJhbCgnQW4gZXJyb3Igb2NjdXJyZWQuJyksXG5cdExpdFRydWUgPSBMaXRlcmFsKHRydWUpLFxuXHRMaXRaZXJvID0gTGl0ZXJhbCgwKSxcblx0UmV0dXJuQnVpbHQgPSBSZXR1cm5TdGF0ZW1lbnQoSWRCdWlsdCksXG5cdFJldHVybkV4cG9ydHMgPSBSZXR1cm5TdGF0ZW1lbnQoSWRFeHBvcnRzKSxcblx0UmV0dXJuUmVzID0gUmV0dXJuU3RhdGVtZW50KElkZW50aWZpZXIoJ3JlcycpKSxcblx0U3dpdGNoQ2FzZU5vTWF0Y2ggPSBTd2l0Y2hDYXNlKHVuZGVmaW5lZCwgW1xuXHRcdHRocm93RXJyb3JGcm9tU3RyaW5nKCdObyBicmFuY2ggb2YgYHN3aXRjaGAgbWF0Y2hlcy4nKSBdKSxcblx0U3ltYm9sSXRlcmF0b3IgPSBtZW1iZXIoSWRlbnRpZmllcignU3ltYm9sJyksICdpdGVyYXRvcicpLFxuXHRUaHJvd0Fzc2VydEZhaWwgPSB0aHJvd0Vycm9yRnJvbVN0cmluZygnQXNzZXJ0aW9uIGZhaWxlZC4nKSxcblx0VGhyb3dOb0Nhc2VNYXRjaCA9IHRocm93RXJyb3JGcm9tU3RyaW5nKCdObyBicmFuY2ggb2YgYGNhc2VgIG1hdGNoZXMuJyksXG5cdFVzZVN0cmljdCA9IEV4cHJlc3Npb25TdGF0ZW1lbnQoTGl0ZXJhbCgndXNlIHN0cmljdCcpKSxcblxuXHRBcnJheVNsaWNlQ2FsbCA9IG1lbWJlcihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ3NsaWNlJyksICdjYWxsJyksXG5cdC8vIGlmICh0eXBlb2YgZGVmaW5lICE9PSAnZnVuY3Rpb24nKSB2YXIgZGVmaW5lID0gcmVxdWlyZSgnYW1kZWZpbmUnKShtb2R1bGUpXG5cdEFtZGVmaW5lSGVhZGVyID0gSWZTdGF0ZW1lbnQoXG5cdFx0QmluYXJ5RXhwcmVzc2lvbignIT09JywgVW5hcnlFeHByZXNzaW9uKCd0eXBlb2YnLCBJZERlZmluZSksIExpdGVyYWwoJ2Z1bmN0aW9uJykpLFxuXHRcdFZhcmlhYmxlRGVjbGFyYXRpb24oJ3ZhcicsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZERlZmluZSwgQ2FsbEV4cHJlc3Npb24oXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKElkZW50aWZpZXIoJ3JlcXVpcmUnKSwgWyBMaXRlcmFsKCdhbWRlZmluZScpIF0pLFxuXHRcdFx0XHRbIElkZW50aWZpZXIoJ21vZHVsZScpIF0pKSBdKSksXG5cdERlY2xhcmVCdWlsdEJhZyA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgWyBWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCwgTGl0RW1wdHlBcnJheSkgXSksXG5cdERlY2xhcmVCdWlsdE1hcCA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEJ1aWx0LFxuXHRcdFx0TmV3RXhwcmVzc2lvbihtZW1iZXIoSWRlbnRpZmllcignZ2xvYmFsJyksICdNYXAnKSwgWyBdKSkgXSksXG5cdERlY2xhcmVCdWlsdE9iaiA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEJ1aWx0LCBPYmplY3RFeHByZXNzaW9uKFsgXSkpIF0pLFxuXHRFeHBvcnRzRGVmYXVsdCA9IG1lbWJlcihJZEV4cG9ydHMsICdkZWZhdWx0JyksXG5cdEV4cG9ydHNHZXQgPSBtZW1iZXIoSWRFeHBvcnRzLCAnX2dldCcpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==