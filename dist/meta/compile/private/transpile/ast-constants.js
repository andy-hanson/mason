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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sV0FBVyxHQUFHLGtCQVBrRSxVQUFVLEVBT2pFLFdBQVcsQ0FBQztPQUNyQyxPQUFPLEdBQUcsa0JBUnNFLFVBQVUsRUFRckUsT0FBTyxDQUFDO09BQzdCLFFBQVEsR0FBRyxrQkFUcUUsVUFBVSxFQVNwRSxRQUFRLENBQUM7T0FDL0IsT0FBTyxHQUFHLGtCQVZzRSxVQUFVLEVBVXJFLE9BQU8sQ0FBQztPQUM3QixTQUFTLEdBQUcsa0JBWG9FLFVBQVUsRUFXbkUsU0FBUyxDQUFDO09BQ2pDLFNBQVMsR0FBRyxrQkFab0UsVUFBVSxFQVluRSxJQUFJLENBQUM7T0FDNUIsbUJBQW1CLEdBQUcsbUJBVmQsTUFBTSxFQVVlLG1CQVZyQixNQUFNLEVBVXNCLGtCQWI0QyxVQUFVLEVBYTNDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQztPQUM3RSxhQUFhLEdBQUcsa0JBZFIsZUFBZSxFQWNTLEVBQUUsQ0FBQztPQUNuQyxjQUFjLEdBQUcsa0JBZEosT0FBTyxFQWNLLEVBQUUsQ0FBQztPQUM1QixPQUFPLEdBQUcsa0JBZkcsT0FBTyxFQWVGLElBQUksQ0FBQztPQUN2QixPQUFPLEdBQUcsa0JBaEJHLE9BQU8sRUFnQkYsSUFBSSxDQUFDO09BQ3ZCLE9BQU8sR0FBRyxrQkFqQkcsT0FBTyxFQWlCRixDQUFDLENBQUM7T0FDcEIsYUFBYSxHQUFHLGtCQWxCSCxPQUFPLEVBa0JJLFNBQVMsQ0FBQztPQUNsQyxhQUFhLEdBQUcsa0JBbkJ1QyxlQUFlLEVBbUJ0QyxTQUFTLENBQUM7T0FDMUMsU0FBUyxHQUFHLGtCQXBCMkMsZUFBZSxFQW9CMUMsa0JBckJvRCxVQUFVLEVBcUJuRCxLQUFLLENBQUMsQ0FBQztPQUM5QyxjQUFjLEdBQUcsbUJBbkJULE1BQU0sRUFtQlUsa0JBdEJ3RCxVQUFVLEVBc0J2RCxRQUFRLENBQUMsRUFBRSxVQUFVLENBQUM7T0FDekQsU0FBUyxHQUFHLGtCQXZCK0MsbUJBQW1CLEVBdUI5QyxrQkF0Qm5CLE9BQU8sRUFzQm9CLFlBQVksQ0FBQyxDQUFDO09BRXRELGNBQWMsR0FBRyxtQkF0QlQsTUFBTSxFQXNCVSxtQkF0QmhCLE1BQU0sRUFzQmlCLGFBQWEsRUFBRSxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUM7OztBQUUvRCxlQUFjLEdBQUcsa0JBMUJqQixXQUFXLEVBMkJWLGtCQTVCd0IsZ0JBQWdCLEVBNEJ2QixLQUFLLEVBQUUsa0JBM0IrQyxlQUFlLEVBMkI5QyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsa0JBM0JqRCxPQUFPLEVBMkJrRCxVQUFVLENBQUMsQ0FBQyxFQUNqRixrQkEzQkQsbUJBQW1CLEVBMkJFLEtBQUssRUFBRSxDQUMxQixrQkE1Qm1CLGtCQUFrQixFQTRCbEIsUUFBUSxFQUFFLGtCQTlCWSxjQUFjLEVBK0J0RCxrQkEvQndDLGNBQWMsRUErQnZDLGtCQS9COEQsVUFBVSxFQStCN0QsU0FBUyxDQUFDLEVBQUUsQ0FBRSxrQkE5QjlCLE9BQU8sRUE4QitCLFVBQVUsQ0FBQyxDQUFFLENBQUMsRUFDOUQsQ0FBRSxrQkFoQzJFLFVBQVUsRUFnQzFFLFFBQVEsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQztPQUNqQyxlQUFlLEdBQUcsa0JBL0JsQixtQkFBbUIsRUErQm1CLE9BQU8sRUFBRSxDQUFFLGtCQS9CNUIsa0JBQWtCLEVBK0I2QixPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUUsQ0FBQztPQUM5RixlQUFlLEdBQUcsa0JBaENsQixtQkFBbUIsRUFnQ21CLE9BQU8sRUFBRSxDQUM5QyxrQkFqQ29CLGtCQUFrQixFQWlDbkIsT0FBTyxFQUN6QixrQkFuQ29CLGFBQWEsRUFtQ25CLG1CQWpDUixNQUFNLEVBaUNTLGtCQXBDeUQsVUFBVSxFQW9DeEQsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRyxDQUFDLENBQUMsQ0FBRSxDQUFDO09BQzdELGVBQWUsR0FBRyxrQkFuQ2xCLG1CQUFtQixFQW1DbUIsT0FBTyxFQUFFLENBQzlDLGtCQXBDb0Isa0JBQWtCLEVBb0NuQixPQUFPLEVBQUUsa0JBckNRLGdCQUFnQixFQXFDUCxFQUFHLENBQUMsQ0FBQyxDQUFFLENBQUM7T0FFdEQsY0FBYyxHQUFHLG1CQXJDVCxNQUFNLEVBcUNVLFNBQVMsRUFBRSxTQUFTLENBQUM7T0FDN0MsVUFBVSxHQUFHLG1CQXRDTCxNQUFNLEVBc0NNLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtTQWxDdEMsV0FBVyxHQUFYLFdBQVc7U0FDWCxPQUFPLEdBQVAsT0FBTztTQUNQLFFBQVEsR0FBUixRQUFRO1NBQ1IsT0FBTyxHQUFQLE9BQU87U0FDUCxTQUFTLEdBQVQsU0FBUztTQUNULFNBQVMsR0FBVCxTQUFTO1NBQ1QsbUJBQW1CLEdBQW5CLG1CQUFtQjtTQUNuQixhQUFhLEdBQWIsYUFBYTtTQUNiLGNBQWMsR0FBZCxjQUFjO1NBQ2QsT0FBTyxHQUFQLE9BQU87U0FDUCxPQUFPLEdBQVAsT0FBTztTQUNQLE9BQU8sR0FBUCxPQUFPO1NBQ1AsYUFBYSxHQUFiLGFBQWE7U0FDYixhQUFhLEdBQWIsYUFBYTtTQUNiLFNBQVMsR0FBVCxTQUFTO1NBQ1QsY0FBYyxHQUFkLGNBQWM7U0FDZCxTQUFTLEdBQVQsU0FBUztTQUVULGNBQWMsR0FBZCxjQUFjO1NBRWQsY0FBYyxHQUFkLGNBQWM7U0FNZCxlQUFlLEdBQWYsZUFBZTtTQUNmLGVBQWUsR0FBZixlQUFlO1NBR2YsZUFBZSxHQUFmLGVBQWU7U0FHZixjQUFjLEdBQWQsY0FBYztTQUNkLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBDYWxsRXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgSWRlbnRpZmllcixcblx0SWZTdGF0ZW1lbnQsIExpdGVyYWwsIE5ld0V4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sIFJldHVyblN0YXRlbWVudCwgVW5hcnlFeHByZXNzaW9uLFxuXHRWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IG1lbWJlciB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcblxuXG5leHBvcnQgY29uc3Rcblx0SWRBcmd1bWVudHMgPSBJZGVudGlmaWVyKCdhcmd1bWVudHMnKSxcblx0SWRCdWlsdCA9IElkZW50aWZpZXIoJ2J1aWx0JyksXG5cdElkRGVmaW5lID0gSWRlbnRpZmllcignZGVmaW5lJyksXG5cdElkRXJyb3IgPSBJZGVudGlmaWVyKCdFcnJvcicpLFxuXHRJZEV4cG9ydHMgPSBJZGVudGlmaWVyKCdleHBvcnRzJyksXG5cdElkRXh0cmFjdCA9IElkZW50aWZpZXIoJ18kJyksXG5cdElkRnVuY3Rpb25BcHBseUNhbGwgPSBtZW1iZXIobWVtYmVyKElkZW50aWZpZXIoJ0Z1bmN0aW9uJyksICdhcHBseScpLCAnY2FsbCcpLFxuXHRMaXRFbXB0eUFycmF5ID0gQXJyYXlFeHByZXNzaW9uKFtdKSxcblx0TGl0RW1wdHlTdHJpbmcgPSBMaXRlcmFsKCcnKSxcblx0TGl0TnVsbCA9IExpdGVyYWwobnVsbCksXG5cdExpdFRydWUgPSBMaXRlcmFsKHRydWUpLFxuXHRMaXRaZXJvID0gTGl0ZXJhbCgwKSxcblx0TGl0U3RyRXhwb3J0cyA9IExpdGVyYWwoJ2V4cG9ydHMnKSxcblx0UmV0dXJuRXhwb3J0cyA9IFJldHVyblN0YXRlbWVudChJZEV4cG9ydHMpLFxuXHRSZXR1cm5SZXMgPSBSZXR1cm5TdGF0ZW1lbnQoSWRlbnRpZmllcigncmVzJykpLFxuXHRTeW1ib2xJdGVyYXRvciA9IG1lbWJlcihJZGVudGlmaWVyKCdTeW1ib2wnKSwgJ2l0ZXJhdG9yJyksXG5cdFVzZVN0cmljdCA9IEV4cHJlc3Npb25TdGF0ZW1lbnQoTGl0ZXJhbCgndXNlIHN0cmljdCcpKSxcblxuXHRBcnJheVNsaWNlQ2FsbCA9IG1lbWJlcihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ3NsaWNlJyksICdjYWxsJyksXG5cdC8vIGlmICh0eXBlb2YgZGVmaW5lICE9PSAnZnVuY3Rpb24nKSB2YXIgZGVmaW5lID0gcmVxdWlyZSgnYW1kZWZpbmUnKShtb2R1bGUpXG5cdEFtZGVmaW5lSGVhZGVyID0gSWZTdGF0ZW1lbnQoXG5cdFx0QmluYXJ5RXhwcmVzc2lvbignIT09JywgVW5hcnlFeHByZXNzaW9uKCd0eXBlb2YnLCBJZERlZmluZSksIExpdGVyYWwoJ2Z1bmN0aW9uJykpLFxuXHRcdFZhcmlhYmxlRGVjbGFyYXRpb24oJ3ZhcicsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZERlZmluZSwgQ2FsbEV4cHJlc3Npb24oXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKElkZW50aWZpZXIoJ3JlcXVpcmUnKSwgWyBMaXRlcmFsKCdhbWRlZmluZScpIF0pLFxuXHRcdFx0XHRbIElkZW50aWZpZXIoJ21vZHVsZScpIF0pKSBdKSksXG5cdERlY2xhcmVCdWlsdEJhZyA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgWyBWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCwgTGl0RW1wdHlBcnJheSkgXSksXG5cdERlY2xhcmVCdWlsdE1hcCA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEJ1aWx0LFxuXHRcdFx0TmV3RXhwcmVzc2lvbihtZW1iZXIoSWRlbnRpZmllcignZ2xvYmFsJyksICdNYXAnKSwgWyBdKSkgXSksXG5cdERlY2xhcmVCdWlsdE9iaiA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEJ1aWx0LCBPYmplY3RFeHByZXNzaW9uKFsgXSkpIF0pLFxuXG5cdEV4cG9ydHNEZWZhdWx0ID0gbWVtYmVyKElkRXhwb3J0cywgJ2RlZmF1bHQnKSxcblx0RXhwb3J0c0dldCA9IG1lbWJlcihJZEV4cG9ydHMsICdfZ2V0JylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9