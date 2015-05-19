if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util'], function (exports, _esastDistAst, _esastDistUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const IdArguments = (0, _esastDistAst.Identifier)('arguments'),
	      IdDefine = (0, _esastDistAst.Identifier)('define'),
	      IdError = (0, _esastDistAst.Identifier)('Error'),
	      IdExports = (0, _esastDistAst.Identifier)('exports'),
	      IdExtract = (0, _esastDistAst.Identifier)('_$'),
	      IdFunctionApplyCall = (0, _esastDistUtil.member)((0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('Function'), 'apply'), 'call'),
	      IdName = (0, _esastDistAst.Identifier)('name'),
	      LitEmptyArray = (0, _esastDistAst.ArrayExpression)([]),
	      LitEmptyString = (0, _esastDistAst.Literal)(''),
	      LitNull = (0, _esastDistAst.Literal)(null),
	      LitTrue = (0, _esastDistAst.Literal)(true),
	      LitZero = (0, _esastDistAst.Literal)(0),
	      LitStrExports = (0, _esastDistAst.Literal)('exports'),
	      LitStrName = (0, _esastDistAst.Literal)('name'),
	      ReturnExports = (0, _esastDistAst.ReturnStatement)(IdExports),
	      ReturnRes = (0, _esastDistAst.ReturnStatement)((0, _esastDistAst.Identifier)('res')),
	      UseStrict = (0, _esastDistAst.ExpressionStatement)((0, _esastDistAst.Literal)('use strict')),
	      ArraySliceCall = (0, _esastDistUtil.member)((0, _esastDistUtil.member)(LitEmptyArray, 'slice'), 'call'),
	     
	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = (0, _esastDistAst.IfStatement)((0, _esastDistAst.BinaryExpression)('!==', (0, _esastDistAst.UnaryExpression)('typeof', IdDefine), (0, _esastDistAst.Literal)('function')), (0, _esastDistAst.VariableDeclaration)('var', [(0, _esastDistAst.VariableDeclarator)(IdDefine, (0, _esastDistAst.CallExpression)((0, _esastDistAst.CallExpression)((0, _esastDistAst.Identifier)('require'), [(0, _esastDistAst.Literal)('amdefine')]), [(0, _esastDistAst.Identifier)('module')]))])),
	      ExportsDefault = (0, _esastDistUtil.member)(IdExports, 'default'),
	      ExportsGet = (0, _esastDistUtil.member)(IdExports, '_get');
	exports.IdArguments = IdArguments;
	exports.IdDefine = IdDefine;
	exports.IdError = IdError;
	exports.IdExports = IdExports;
	exports.IdExtract = IdExtract;
	exports.IdFunctionApplyCall = IdFunctionApplyCall;
	exports.IdName = IdName;
	exports.LitEmptyArray = LitEmptyArray;
	exports.LitEmptyString = LitEmptyString;
	exports.LitNull = LitNull;
	exports.LitTrue = LitTrue;
	exports.LitZero = LitZero;
	exports.LitStrExports = LitStrExports;
	exports.LitStrName = LitStrName;
	exports.ReturnExports = ReturnExports;
	exports.ReturnRes = ReturnRes;
	exports.UseStrict = UseStrict;
	exports.ArraySliceCall = ArraySliceCall;
	exports.AmdefineHeader = AmdefineHeader;
	exports.ExportsDefault = ExportsDefault;
	exports.ExportsGet = ExportsGet;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtPLE9BQ04sV0FBVyxHQUFHLGtCQU5rRSxVQUFVLEVBTWpFLFdBQVcsQ0FBQztPQUNyQyxRQUFRLEdBQUcsa0JBUHFFLFVBQVUsRUFPcEUsUUFBUSxDQUFDO09BQy9CLE9BQU8sR0FBRyxrQkFSc0UsVUFBVSxFQVFyRSxPQUFPLENBQUM7T0FDN0IsU0FBUyxHQUFHLGtCQVRvRSxVQUFVLEVBU25FLFNBQVMsQ0FBQztPQUNqQyxTQUFTLEdBQUcsa0JBVm9FLFVBQVUsRUFVbkUsSUFBSSxDQUFDO09BQzVCLG1CQUFtQixHQUFHLG1CQVJkLE1BQU0sRUFRZSxtQkFSckIsTUFBTSxFQVFzQixrQkFYNEMsVUFBVSxFQVczQyxVQUFVLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUM7T0FDN0UsTUFBTSxHQUFHLGtCQVp1RSxVQUFVLEVBWXRFLE1BQU0sQ0FBQztPQUMzQixhQUFhLEdBQUcsa0JBYlIsZUFBZSxFQWFTLEVBQUUsQ0FBQztPQUNuQyxjQUFjLEdBQUcsa0JBYkosT0FBTyxFQWFLLEVBQUUsQ0FBQztPQUM1QixPQUFPLEdBQUcsa0JBZEcsT0FBTyxFQWNGLElBQUksQ0FBQztPQUN2QixPQUFPLEdBQUcsa0JBZkcsT0FBTyxFQWVGLElBQUksQ0FBQztPQUN2QixPQUFPLEdBQUcsa0JBaEJHLE9BQU8sRUFnQkYsQ0FBQyxDQUFDO09BQ3BCLGFBQWEsR0FBRyxrQkFqQkgsT0FBTyxFQWlCSSxTQUFTLENBQUM7T0FDbEMsVUFBVSxHQUFHLGtCQWxCQSxPQUFPLEVBa0JDLE1BQU0sQ0FBQztPQUM1QixhQUFhLEdBQUcsa0JBbkJNLGVBQWUsRUFtQkwsU0FBUyxDQUFDO09BQzFDLFNBQVMsR0FBRyxrQkFwQlUsZUFBZSxFQW9CVCxrQkFyQm9ELFVBQVUsRUFxQm5ELEtBQUssQ0FBQyxDQUFDO09BQzlDLFNBQVMsR0FBRyxrQkF0QitDLG1CQUFtQixFQXNCOUMsa0JBckJuQixPQUFPLEVBcUJvQixZQUFZLENBQUMsQ0FBQztPQUV0RCxjQUFjLEdBQUcsbUJBckJULE1BQU0sRUFxQlUsbUJBckJoQixNQUFNLEVBcUJpQixhQUFhLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDOzs7QUFFL0QsZUFBYyxHQUFHLGtCQXpCakIsV0FBVyxFQTBCVixrQkEzQndCLGdCQUFnQixFQTJCdkIsS0FBSyxFQUFFLGtCQTFCYyxlQUFlLEVBMEJiLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxrQkExQmpELE9BQU8sRUEwQmtELFVBQVUsQ0FBQyxDQUFDLEVBQ2pGLGtCQTNCdUQsbUJBQW1CLEVBMkJ0RCxLQUFLLEVBQUUsQ0FDMUIsa0JBNUIyRSxrQkFBa0IsRUE0QjFFLFFBQVEsRUFBRSxrQkE3QlksY0FBYyxFQThCdEQsa0JBOUJ3QyxjQUFjLEVBOEJ2QyxrQkE5QjhELFVBQVUsRUE4QjdELFNBQVMsQ0FBQyxFQUFFLENBQUUsa0JBN0I5QixPQUFPLEVBNkIrQixVQUFVLENBQUMsQ0FBRSxDQUFDLEVBQzlELENBQUUsa0JBL0IyRSxVQUFVLEVBK0IxRSxRQUFRLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUM7T0FDakMsY0FBYyxHQUFHLG1CQTdCVCxNQUFNLEVBNkJVLFNBQVMsRUFBRSxTQUFTLENBQUM7T0FDN0MsVUFBVSxHQUFHLG1CQTlCTCxNQUFNLEVBOEJNLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtTQTNCdEMsV0FBVyxHQUFYLFdBQVc7U0FDWCxRQUFRLEdBQVIsUUFBUTtTQUNSLE9BQU8sR0FBUCxPQUFPO1NBQ1AsU0FBUyxHQUFULFNBQVM7U0FDVCxTQUFTLEdBQVQsU0FBUztTQUNULG1CQUFtQixHQUFuQixtQkFBbUI7U0FDbkIsTUFBTSxHQUFOLE1BQU07U0FDTixhQUFhLEdBQWIsYUFBYTtTQUNiLGNBQWMsR0FBZCxjQUFjO1NBQ2QsT0FBTyxHQUFQLE9BQU87U0FDUCxPQUFPLEdBQVAsT0FBTztTQUNQLE9BQU8sR0FBUCxPQUFPO1NBQ1AsYUFBYSxHQUFiLGFBQWE7U0FDYixVQUFVLEdBQVYsVUFBVTtTQUNWLGFBQWEsR0FBYixhQUFhO1NBQ2IsU0FBUyxHQUFULFNBQVM7U0FDVCxTQUFTLEdBQVQsU0FBUztTQUVULGNBQWMsR0FBZCxjQUFjO1NBRWQsY0FBYyxHQUFkLGNBQWM7U0FNZCxjQUFjLEdBQWQsY0FBYztTQUNkLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBDYWxsRXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgSWRlbnRpZmllcixcblx0SWZTdGF0ZW1lbnQsIExpdGVyYWwsIFJldHVyblN0YXRlbWVudCwgVW5hcnlFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3Jcblx0fSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IG1lbWJlciB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcblxuZXhwb3J0IGNvbnN0XG5cdElkQXJndW1lbnRzID0gSWRlbnRpZmllcignYXJndW1lbnRzJyksXG5cdElkRGVmaW5lID0gSWRlbnRpZmllcignZGVmaW5lJyksXG5cdElkRXJyb3IgPSBJZGVudGlmaWVyKCdFcnJvcicpLFxuXHRJZEV4cG9ydHMgPSBJZGVudGlmaWVyKCdleHBvcnRzJyksXG5cdElkRXh0cmFjdCA9IElkZW50aWZpZXIoJ18kJyksXG5cdElkRnVuY3Rpb25BcHBseUNhbGwgPSBtZW1iZXIobWVtYmVyKElkZW50aWZpZXIoJ0Z1bmN0aW9uJyksICdhcHBseScpLCAnY2FsbCcpLFxuXHRJZE5hbWUgPSBJZGVudGlmaWVyKCduYW1lJyksXG5cdExpdEVtcHR5QXJyYXkgPSBBcnJheUV4cHJlc3Npb24oW10pLFxuXHRMaXRFbXB0eVN0cmluZyA9IExpdGVyYWwoJycpLFxuXHRMaXROdWxsID0gTGl0ZXJhbChudWxsKSxcblx0TGl0VHJ1ZSA9IExpdGVyYWwodHJ1ZSksXG5cdExpdFplcm8gPSBMaXRlcmFsKDApLFxuXHRMaXRTdHJFeHBvcnRzID0gTGl0ZXJhbCgnZXhwb3J0cycpLFxuXHRMaXRTdHJOYW1lID0gTGl0ZXJhbCgnbmFtZScpLFxuXHRSZXR1cm5FeHBvcnRzID0gUmV0dXJuU3RhdGVtZW50KElkRXhwb3J0cyksXG5cdFJldHVyblJlcyA9IFJldHVyblN0YXRlbWVudChJZGVudGlmaWVyKCdyZXMnKSksXG5cdFVzZVN0cmljdCA9IEV4cHJlc3Npb25TdGF0ZW1lbnQoTGl0ZXJhbCgndXNlIHN0cmljdCcpKSxcblxuXHRBcnJheVNsaWNlQ2FsbCA9IG1lbWJlcihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ3NsaWNlJyksICdjYWxsJyksXG5cdC8vIGlmICh0eXBlb2YgZGVmaW5lICE9PSAnZnVuY3Rpb24nKSB2YXIgZGVmaW5lID0gcmVxdWlyZSgnYW1kZWZpbmUnKShtb2R1bGUpXG5cdEFtZGVmaW5lSGVhZGVyID0gSWZTdGF0ZW1lbnQoXG5cdFx0QmluYXJ5RXhwcmVzc2lvbignIT09JywgVW5hcnlFeHByZXNzaW9uKCd0eXBlb2YnLCBJZERlZmluZSksIExpdGVyYWwoJ2Z1bmN0aW9uJykpLFxuXHRcdFZhcmlhYmxlRGVjbGFyYXRpb24oJ3ZhcicsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZERlZmluZSwgQ2FsbEV4cHJlc3Npb24oXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKElkZW50aWZpZXIoJ3JlcXVpcmUnKSwgWyBMaXRlcmFsKCdhbWRlZmluZScpIF0pLFxuXHRcdFx0XHRbIElkZW50aWZpZXIoJ21vZHVsZScpIF0pKSBdKSksXG5cdEV4cG9ydHNEZWZhdWx0ID0gbWVtYmVyKElkRXhwb3J0cywgJ2RlZmF1bHQnKSxcblx0RXhwb3J0c0dldCA9IG1lbWJlcihJZEV4cG9ydHMsICdfZ2V0JylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9