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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sb0JBQW9CLEdBQUcsVUFITCx3QkFBd0IsRUFHTSxFQUFFLENBQUM7T0FDbkQsV0FBVyxHQUFHLGtCQVJrRSxVQUFVLEVBUWpFLFdBQVcsQ0FBQztPQUNyQyxPQUFPLEdBQUcsa0JBVHNFLFVBQVUsRUFTckUsT0FBTyxDQUFDO09BQzdCLFFBQVEsR0FBRyxrQkFWcUUsVUFBVSxFQVVwRSxRQUFRLENBQUM7T0FDL0IsT0FBTyxTQVBDLFFBQVEsQUFPRTtPQUNsQixTQUFTLEdBQUcsa0JBWm9FLFVBQVUsRUFZbkUsU0FBUyxDQUFDO09BQ2pDLFNBQVMsR0FBRyxrQkFib0UsVUFBVSxFQWFuRSxJQUFJLENBQUM7T0FDNUIsbUJBQW1CLEdBQUcsbUJBWGQsTUFBTSxFQVdlLG1CQVhyQixNQUFNLEVBV3NCLGtCQWQ0QyxVQUFVLEVBYzNDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQzs7O0FBRTdFLGNBQWEsR0FBRyxrQkFoQmdFLFVBQVUsRUFnQi9ELE9BQU8sQ0FBQztPQUNuQyxhQUFhLEdBQUcsa0JBakJSLGVBQWUsRUFpQlMsRUFBRSxDQUFDO09BQ25DLGNBQWMsR0FBRyxrQkFqQkosT0FBTyxFQWlCSyxFQUFFLENBQUM7T0FDNUIsT0FBTyxHQUFHLGtCQWxCRyxPQUFPLEVBa0JGLElBQUksQ0FBQztPQUN2QixhQUFhLEdBQUcsa0JBbkJILE9BQU8sRUFtQkksU0FBUyxDQUFDO09BQ2xDLFdBQVcsR0FBRyxrQkFwQkQsT0FBTyxFQW9CRSxvQkFBb0IsQ0FBQztPQUMzQyxPQUFPLEdBQUcsa0JBckJHLE9BQU8sRUFxQkYsSUFBSSxDQUFDO09BQ3ZCLE9BQU8sR0FBRyxrQkF0QkcsT0FBTyxFQXNCRixDQUFDLENBQUM7T0FDcEIsV0FBVyxHQUFHLGtCQXZCeUMsZUFBZSxFQXVCeEMsT0FBTyxDQUFDO09BQ3RDLGFBQWEsR0FBRyxrQkF4QnVDLGVBQWUsRUF3QnRDLFNBQVMsQ0FBQztPQUMxQyxTQUFTLEdBQUcsa0JBekIyQyxlQUFlLEVBeUIxQyxrQkExQm9ELFVBQVUsRUEwQm5ELEtBQUssQ0FBQyxDQUFDO09BQzlDLGlCQUFpQixHQUFHLGtCQTFCb0QsVUFBVSxFQTBCbkQsU0FBUyxFQUFFLENBQ3pDLFVBeEIyQyxvQkFBb0IsRUF3QjFDLGdDQUFnQyxDQUFDLENBQUUsQ0FBQztPQUMxRCxjQUFjLEdBQUcsbUJBMUJULE1BQU0sRUEwQlUsa0JBN0J3RCxVQUFVLEVBNkJ2RCxRQUFRLENBQUMsRUFBRSxVQUFVLENBQUM7T0FDekQsZUFBZSxHQUFHLFVBMUIwQixvQkFBb0IsRUEwQnpCLG1CQUFtQixDQUFDO09BQzNELGdCQUFnQixHQUFHLFVBM0J5QixvQkFBb0IsRUEyQnhCLDhCQUE4QixDQUFDO09BQ3ZFLFNBQVMsR0FBRyxrQkFoQytDLG1CQUFtQixFQWdDOUMsa0JBL0JuQixPQUFPLEVBK0JvQixZQUFZLENBQUMsQ0FBQztPQUV0RCxjQUFjLEdBQUcsbUJBL0JULE1BQU0sRUErQlUsbUJBL0JoQixNQUFNLEVBK0JpQixhQUFhLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDOzs7QUFFL0QsZUFBYyxHQUFHLGtCQW5DakIsV0FBVyxFQW9DVixrQkFyQ3dCLGdCQUFnQixFQXFDdkIsS0FBSyxFQUFFLGtCQW5DekIsZUFBZSxFQW1DMEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLGtCQXBDakQsT0FBTyxFQW9Da0QsVUFBVSxDQUFDLENBQUMsRUFDakYsa0JBcENnQixtQkFBbUIsRUFvQ2YsS0FBSyxFQUFFLENBQzFCLGtCQXJDb0Msa0JBQWtCLEVBcUNuQyxRQUFRLEVBQUUsa0JBdkNZLGNBQWMsRUF3Q3RELGtCQXhDd0MsY0FBYyxFQXdDdkMsa0JBeEM4RCxVQUFVLEVBd0M3RCxTQUFTLENBQUMsRUFBRSxDQUFFLGtCQXZDOUIsT0FBTyxFQXVDK0IsVUFBVSxDQUFDLENBQUUsQ0FBQyxFQUM5RCxDQUFFLGtCQXpDMkUsVUFBVSxFQXlDMUUsUUFBUSxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDO09BQ2pDLGVBQWUsR0FBRyxrQkF4Q0QsbUJBQW1CLEVBd0NFLE9BQU8sRUFBRSxDQUFFLGtCQXhDWCxrQkFBa0IsRUF3Q1ksT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFFLENBQUM7T0FDOUYsZUFBZSxHQUFHLGtCQXpDRCxtQkFBbUIsRUF5Q0UsT0FBTyxFQUFFLENBQzlDLGtCQTFDcUMsa0JBQWtCLEVBMENwQyxPQUFPLEVBQ3pCLGtCQTVDb0IsYUFBYSxFQTRDbkIsbUJBMUNSLE1BQU0sRUEwQ1Msa0JBN0N5RCxVQUFVLEVBNkN4RCxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFHLENBQUMsQ0FBQyxDQUFFLENBQUM7T0FDN0QsZUFBZSxHQUFHLGtCQTVDRCxtQkFBbUIsRUE0Q0UsT0FBTyxFQUFFLENBQzlDLGtCQTdDcUMsa0JBQWtCLEVBNkNwQyxPQUFPLEVBQUUsa0JBOUNRLGdCQUFnQixFQThDUCxFQUFHLENBQUMsQ0FBQyxDQUFFLENBQUM7T0FDdEQsY0FBYyxHQUFHLG1CQTdDVCxNQUFNLEVBNkNVLFNBQVMsRUFBRSxTQUFTLENBQUM7T0FDN0MsVUFBVSxHQUFHLG1CQTlDTCxNQUFNLEVBOENNLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvYXN0LWNvbnN0YW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycmF5RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgQ2FsbEV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIElkZW50aWZpZXIsXG5cdElmU3RhdGVtZW50LCBMaXRlcmFsLCBOZXdFeHByZXNzaW9uLCBPYmplY3RFeHByZXNzaW9uLCBSZXR1cm5TdGF0ZW1lbnQsIFN3aXRjaENhc2UsXG5cdFVuYXJ5RXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdGlvbiwgVmFyaWFibGVEZWNsYXJhdG9yIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBtZW1iZXIgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyBfSWRFcnJvciwgdGVtcGxhdGVFbGVtZW50Rm9yU3RyaW5nLCB0aHJvd0Vycm9yRnJvbVN0cmluZyB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGNvbnN0XG5cdEVtcHR5VGVtcGxhdGVFbGVtZW50ID0gdGVtcGxhdGVFbGVtZW50Rm9yU3RyaW5nKCcnKSxcblx0SWRBcmd1bWVudHMgPSBJZGVudGlmaWVyKCdhcmd1bWVudHMnKSxcblx0SWRCdWlsdCA9IElkZW50aWZpZXIoJ2J1aWx0JyksXG5cdElkRGVmaW5lID0gSWRlbnRpZmllcignZGVmaW5lJyksXG5cdElkRXJyb3IgPSBfSWRFcnJvcixcblx0SWRFeHBvcnRzID0gSWRlbnRpZmllcignZXhwb3J0cycpLFxuXHRJZEV4dHJhY3QgPSBJZGVudGlmaWVyKCdfJCcpLFxuXHRJZEZ1bmN0aW9uQXBwbHlDYWxsID0gbWVtYmVyKG1lbWJlcihJZGVudGlmaWVyKCdGdW5jdGlvbicpLCAnYXBwbHknKSwgJ2NhbGwnKSxcblx0Ly8gVE9ETzpFUzYgU2hvdWxkbid0IG5lZWQsIGp1c3QgdXNlIGFycm93IGZ1bmN0aW9ucy5cblx0SWRMZXhpY2FsVGhpcyA9IElkZW50aWZpZXIoJ190aGlzJyksXG5cdExpdEVtcHR5QXJyYXkgPSBBcnJheUV4cHJlc3Npb24oW10pLFxuXHRMaXRFbXB0eVN0cmluZyA9IExpdGVyYWwoJycpLFxuXHRMaXROdWxsID0gTGl0ZXJhbChudWxsKSxcblx0TGl0U3RyRXhwb3J0cyA9IExpdGVyYWwoJ2V4cG9ydHMnKSxcblx0TGl0U3RyVGhyb3cgPSBMaXRlcmFsKCdBbiBlcnJvciBvY2N1cnJlZC4nKSxcblx0TGl0VHJ1ZSA9IExpdGVyYWwodHJ1ZSksXG5cdExpdFplcm8gPSBMaXRlcmFsKDApLFxuXHRSZXR1cm5CdWlsdCA9IFJldHVyblN0YXRlbWVudChJZEJ1aWx0KSxcblx0UmV0dXJuRXhwb3J0cyA9IFJldHVyblN0YXRlbWVudChJZEV4cG9ydHMpLFxuXHRSZXR1cm5SZXMgPSBSZXR1cm5TdGF0ZW1lbnQoSWRlbnRpZmllcigncmVzJykpLFxuXHRTd2l0Y2hDYXNlTm9NYXRjaCA9IFN3aXRjaENhc2UodW5kZWZpbmVkLCBbXG5cdFx0dGhyb3dFcnJvckZyb21TdHJpbmcoJ05vIGJyYW5jaCBvZiBgc3dpdGNoYCBtYXRjaGVzLicpIF0pLFxuXHRTeW1ib2xJdGVyYXRvciA9IG1lbWJlcihJZGVudGlmaWVyKCdTeW1ib2wnKSwgJ2l0ZXJhdG9yJyksXG5cdFRocm93QXNzZXJ0RmFpbCA9IHRocm93RXJyb3JGcm9tU3RyaW5nKCdBc3NlcnRpb24gZmFpbGVkLicpLFxuXHRUaHJvd05vQ2FzZU1hdGNoID0gdGhyb3dFcnJvckZyb21TdHJpbmcoJ05vIGJyYW5jaCBvZiBgY2FzZWAgbWF0Y2hlcy4nKSxcblx0VXNlU3RyaWN0ID0gRXhwcmVzc2lvblN0YXRlbWVudChMaXRlcmFsKCd1c2Ugc3RyaWN0JykpLFxuXG5cdEFycmF5U2xpY2VDYWxsID0gbWVtYmVyKG1lbWJlcihMaXRFbXB0eUFycmF5LCAnc2xpY2UnKSwgJ2NhbGwnKSxcblx0Ly8gaWYgKHR5cGVvZiBkZWZpbmUgIT09ICdmdW5jdGlvbicpIHZhciBkZWZpbmUgPSByZXF1aXJlKCdhbWRlZmluZScpKG1vZHVsZSlcblx0QW1kZWZpbmVIZWFkZXIgPSBJZlN0YXRlbWVudChcblx0XHRCaW5hcnlFeHByZXNzaW9uKCchPT0nLCBVbmFyeUV4cHJlc3Npb24oJ3R5cGVvZicsIElkRGVmaW5lKSwgTGl0ZXJhbCgnZnVuY3Rpb24nKSksXG5cdFx0VmFyaWFibGVEZWNsYXJhdGlvbigndmFyJywgW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkRGVmaW5lLCBDYWxsRXhwcmVzc2lvbihcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24oSWRlbnRpZmllcigncmVxdWlyZScpLCBbIExpdGVyYWwoJ2FtZGVmaW5lJykgXSksXG5cdFx0XHRcdFsgSWRlbnRpZmllcignbW9kdWxlJykgXSkpIF0pKSxcblx0RGVjbGFyZUJ1aWx0QmFnID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBbIFZhcmlhYmxlRGVjbGFyYXRvcihJZEJ1aWx0LCBMaXRFbXB0eUFycmF5KSBdKSxcblx0RGVjbGFyZUJ1aWx0TWFwID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBbXG5cdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkQnVpbHQsXG5cdFx0XHROZXdFeHByZXNzaW9uKG1lbWJlcihJZGVudGlmaWVyKCdnbG9iYWwnKSwgJ01hcCcpLCBbIF0pKSBdKSxcblx0RGVjbGFyZUJ1aWx0T2JqID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBbXG5cdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkQnVpbHQsIE9iamVjdEV4cHJlc3Npb24oWyBdKSkgXSksXG5cdEV4cG9ydHNEZWZhdWx0ID0gbWVtYmVyKElkRXhwb3J0cywgJ2RlZmF1bHQnKSxcblx0RXhwb3J0c0dldCA9IG1lbWJlcihJZEV4cG9ydHMsICdfZ2V0JylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9