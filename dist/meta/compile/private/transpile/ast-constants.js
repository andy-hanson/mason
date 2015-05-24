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
	      SymbolIterator = (0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('Symbol'), 'iterator'),
	      UseStrict = (0, _esastDistAst.ExpressionStatement)((0, _esastDistAst.Literal)('use strict')),
	      ArraySliceCall = (0, _esastDistUtil.member)((0, _esastDistUtil.member)(LitEmptyArray, 'slice'), 'call'),
	     
	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = (0, _esastDistAst.IfStatement)((0, _esastDistAst.BinaryExpression)('!==', (0, _esastDistAst.UnaryExpression)('typeof', IdDefine), (0, _esastDistAst.Literal)('function')), (0, _esastDistAst.VariableDeclaration)('var', [(0, _esastDistAst.VariableDeclarator)(IdDefine, (0, _esastDistAst.CallExpression)((0, _esastDistAst.CallExpression)((0, _esastDistAst.Identifier)('require'), [(0, _esastDistAst.Literal)('amdefine')]), [(0, _esastDistAst.Identifier)('module')]))])),
	      DeclareBuiltBag = (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(IdBuilt, LitEmptyArray)]),
	      DeclareBuiltMap = (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(IdBuilt, (0, _esastDistAst.NewExpression)((0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('global'), 'Map'), []))]),
	      ExportsDefault = (0, _esastDistUtil.member)(IdExports, 'default'),
	      ExportsGet = (0, _esastDistUtil.member)(IdExports, '_get');
	exports.IdArguments = IdArguments;
	exports.IdBuilt = IdBuilt;
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
	exports.SymbolIterator = SymbolIterator;
	exports.UseStrict = UseStrict;
	exports.ArraySliceCall = ArraySliceCall;
	exports.AmdefineHeader = AmdefineHeader;
	exports.DeclareBuiltBag = DeclareBuiltBag;
	exports.DeclareBuiltMap = DeclareBuiltMap;
	exports.ExportsDefault = ExportsDefault;
	exports.ExportsGet = ExportsGet;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sV0FBVyxHQUFHLGtCQVBrRSxVQUFVLEVBT2pFLFdBQVcsQ0FBQztPQUNyQyxPQUFPLEdBQUcsa0JBUnNFLFVBQVUsRUFRckUsT0FBTyxDQUFDO09BQzdCLFFBQVEsR0FBRyxrQkFUcUUsVUFBVSxFQVNwRSxRQUFRLENBQUM7T0FDL0IsT0FBTyxHQUFHLGtCQVZzRSxVQUFVLEVBVXJFLE9BQU8sQ0FBQztPQUM3QixTQUFTLEdBQUcsa0JBWG9FLFVBQVUsRUFXbkUsU0FBUyxDQUFDO09BQ2pDLFNBQVMsR0FBRyxrQkFab0UsVUFBVSxFQVluRSxJQUFJLENBQUM7T0FDNUIsbUJBQW1CLEdBQUcsbUJBVmQsTUFBTSxFQVVlLG1CQVZyQixNQUFNLEVBVXNCLGtCQWI0QyxVQUFVLEVBYTNDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQztPQUM3RSxNQUFNLEdBQUcsa0JBZHVFLFVBQVUsRUFjdEUsTUFBTSxDQUFDO09BQzNCLGFBQWEsR0FBRyxrQkFmUixlQUFlLEVBZVMsRUFBRSxDQUFDO09BQ25DLGNBQWMsR0FBRyxrQkFmSixPQUFPLEVBZUssRUFBRSxDQUFDO09BQzVCLE9BQU8sR0FBRyxrQkFoQkcsT0FBTyxFQWdCRixJQUFJLENBQUM7T0FDdkIsT0FBTyxHQUFHLGtCQWpCRyxPQUFPLEVBaUJGLElBQUksQ0FBQztPQUN2QixPQUFPLEdBQUcsa0JBbEJHLE9BQU8sRUFrQkYsQ0FBQyxDQUFDO09BQ3BCLGFBQWEsR0FBRyxrQkFuQkgsT0FBTyxFQW1CSSxTQUFTLENBQUM7T0FDbEMsVUFBVSxHQUFHLGtCQXBCQSxPQUFPLEVBb0JDLE1BQU0sQ0FBQztPQUM1QixhQUFhLEdBQUcsa0JBckJxQixlQUFlLEVBcUJwQixTQUFTLENBQUM7T0FDMUMsU0FBUyxHQUFHLGtCQXRCeUIsZUFBZSxFQXNCeEIsa0JBdkJvRCxVQUFVLEVBdUJuRCxLQUFLLENBQUMsQ0FBQztPQUM5QyxjQUFjLEdBQUcsbUJBckJULE1BQU0sRUFxQlUsa0JBeEJ3RCxVQUFVLEVBd0J2RCxRQUFRLENBQUMsRUFBRSxVQUFVLENBQUM7T0FDekQsU0FBUyxHQUFHLGtCQXpCK0MsbUJBQW1CLEVBeUI5QyxrQkF4Qm5CLE9BQU8sRUF3Qm9CLFlBQVksQ0FBQyxDQUFDO09BRXRELGNBQWMsR0FBRyxtQkF4QlQsTUFBTSxFQXdCVSxtQkF4QmhCLE1BQU0sRUF3QmlCLGFBQWEsRUFBRSxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUM7OztBQUUvRCxlQUFjLEdBQUcsa0JBNUJqQixXQUFXLEVBNkJWLGtCQTlCd0IsZ0JBQWdCLEVBOEJ2QixLQUFLLEVBQUUsa0JBN0I2QixlQUFlLEVBNkI1QixRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsa0JBN0JqRCxPQUFPLEVBNkJrRCxVQUFVLENBQUMsQ0FBQyxFQUNqRixrQkE5QnNFLG1CQUFtQixFQThCckUsS0FBSyxFQUFFLENBQzFCLGtCQTlCRixrQkFBa0IsRUE4QkcsUUFBUSxFQUFFLGtCQWhDWSxjQUFjLEVBaUN0RCxrQkFqQ3dDLGNBQWMsRUFpQ3ZDLGtCQWpDOEQsVUFBVSxFQWlDN0QsU0FBUyxDQUFDLEVBQUUsQ0FBRSxrQkFoQzlCLE9BQU8sRUFnQytCLFVBQVUsQ0FBQyxDQUFFLENBQUMsRUFDOUQsQ0FBRSxrQkFsQzJFLFVBQVUsRUFrQzFFLFFBQVEsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQztPQUNqQyxlQUFlLEdBQUcsa0JBbENxRCxtQkFBbUIsRUFrQ3BELE9BQU8sRUFBRSxDQUFFLGtCQWpDakQsa0JBQWtCLEVBaUNrRCxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUUsQ0FBQztPQUM5RixlQUFlLEdBQUcsa0JBbkNxRCxtQkFBbUIsRUFtQ3BELE9BQU8sRUFBRSxDQUM5QyxrQkFuQ0Qsa0JBQWtCLEVBbUNFLE9BQU8sRUFDekIsa0JBckNvQixhQUFhLEVBcUNuQixtQkFuQ1IsTUFBTSxFQW1DUyxrQkF0Q3lELFVBQVUsRUFzQ3hELFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsQ0FBQyxDQUFDLENBQUUsQ0FBQztPQUM3RCxjQUFjLEdBQUcsbUJBcENULE1BQU0sRUFvQ1UsU0FBUyxFQUFFLFNBQVMsQ0FBQztPQUM3QyxVQUFVLEdBQUcsbUJBckNMLE1BQU0sRUFxQ00sU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBakN0QyxXQUFXLEdBQVgsV0FBVztTQUNYLE9BQU8sR0FBUCxPQUFPO1NBQ1AsUUFBUSxHQUFSLFFBQVE7U0FDUixPQUFPLEdBQVAsT0FBTztTQUNQLFNBQVMsR0FBVCxTQUFTO1NBQ1QsU0FBUyxHQUFULFNBQVM7U0FDVCxtQkFBbUIsR0FBbkIsbUJBQW1CO1NBQ25CLE1BQU0sR0FBTixNQUFNO1NBQ04sYUFBYSxHQUFiLGFBQWE7U0FDYixjQUFjLEdBQWQsY0FBYztTQUNkLE9BQU8sR0FBUCxPQUFPO1NBQ1AsT0FBTyxHQUFQLE9BQU87U0FDUCxPQUFPLEdBQVAsT0FBTztTQUNQLGFBQWEsR0FBYixhQUFhO1NBQ2IsVUFBVSxHQUFWLFVBQVU7U0FDVixhQUFhLEdBQWIsYUFBYTtTQUNiLFNBQVMsR0FBVCxTQUFTO1NBQ1QsY0FBYyxHQUFkLGNBQWM7U0FDZCxTQUFTLEdBQVQsU0FBUztTQUVULGNBQWMsR0FBZCxjQUFjO1NBRWQsY0FBYyxHQUFkLGNBQWM7U0FNZCxlQUFlLEdBQWYsZUFBZTtTQUNmLGVBQWUsR0FBZixlQUFlO1NBR2YsY0FBYyxHQUFkLGNBQWM7U0FDZCxVQUFVLEdBQVYsVUFBVSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvYXN0LWNvbnN0YW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycmF5RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgQ2FsbEV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIElkZW50aWZpZXIsXG5cdElmU3RhdGVtZW50LCBMaXRlcmFsLCBOZXdFeHByZXNzaW9uLCBSZXR1cm5TdGF0ZW1lbnQsIFVuYXJ5RXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdGlvbixcblx0VmFyaWFibGVEZWNsYXJhdG9yIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBtZW1iZXIgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5cblxuZXhwb3J0IGNvbnN0XG5cdElkQXJndW1lbnRzID0gSWRlbnRpZmllcignYXJndW1lbnRzJyksXG5cdElkQnVpbHQgPSBJZGVudGlmaWVyKCdidWlsdCcpLFxuXHRJZERlZmluZSA9IElkZW50aWZpZXIoJ2RlZmluZScpLFxuXHRJZEVycm9yID0gSWRlbnRpZmllcignRXJyb3InKSxcblx0SWRFeHBvcnRzID0gSWRlbnRpZmllcignZXhwb3J0cycpLFxuXHRJZEV4dHJhY3QgPSBJZGVudGlmaWVyKCdfJCcpLFxuXHRJZEZ1bmN0aW9uQXBwbHlDYWxsID0gbWVtYmVyKG1lbWJlcihJZGVudGlmaWVyKCdGdW5jdGlvbicpLCAnYXBwbHknKSwgJ2NhbGwnKSxcblx0SWROYW1lID0gSWRlbnRpZmllcignbmFtZScpLFxuXHRMaXRFbXB0eUFycmF5ID0gQXJyYXlFeHByZXNzaW9uKFtdKSxcblx0TGl0RW1wdHlTdHJpbmcgPSBMaXRlcmFsKCcnKSxcblx0TGl0TnVsbCA9IExpdGVyYWwobnVsbCksXG5cdExpdFRydWUgPSBMaXRlcmFsKHRydWUpLFxuXHRMaXRaZXJvID0gTGl0ZXJhbCgwKSxcblx0TGl0U3RyRXhwb3J0cyA9IExpdGVyYWwoJ2V4cG9ydHMnKSxcblx0TGl0U3RyTmFtZSA9IExpdGVyYWwoJ25hbWUnKSxcblx0UmV0dXJuRXhwb3J0cyA9IFJldHVyblN0YXRlbWVudChJZEV4cG9ydHMpLFxuXHRSZXR1cm5SZXMgPSBSZXR1cm5TdGF0ZW1lbnQoSWRlbnRpZmllcigncmVzJykpLFxuXHRTeW1ib2xJdGVyYXRvciA9IG1lbWJlcihJZGVudGlmaWVyKCdTeW1ib2wnKSwgJ2l0ZXJhdG9yJyksXG5cdFVzZVN0cmljdCA9IEV4cHJlc3Npb25TdGF0ZW1lbnQoTGl0ZXJhbCgndXNlIHN0cmljdCcpKSxcblxuXHRBcnJheVNsaWNlQ2FsbCA9IG1lbWJlcihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ3NsaWNlJyksICdjYWxsJyksXG5cdC8vIGlmICh0eXBlb2YgZGVmaW5lICE9PSAnZnVuY3Rpb24nKSB2YXIgZGVmaW5lID0gcmVxdWlyZSgnYW1kZWZpbmUnKShtb2R1bGUpXG5cdEFtZGVmaW5lSGVhZGVyID0gSWZTdGF0ZW1lbnQoXG5cdFx0QmluYXJ5RXhwcmVzc2lvbignIT09JywgVW5hcnlFeHByZXNzaW9uKCd0eXBlb2YnLCBJZERlZmluZSksIExpdGVyYWwoJ2Z1bmN0aW9uJykpLFxuXHRcdFZhcmlhYmxlRGVjbGFyYXRpb24oJ3ZhcicsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZERlZmluZSwgQ2FsbEV4cHJlc3Npb24oXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKElkZW50aWZpZXIoJ3JlcXVpcmUnKSwgWyBMaXRlcmFsKCdhbWRlZmluZScpIF0pLFxuXHRcdFx0XHRbIElkZW50aWZpZXIoJ21vZHVsZScpIF0pKSBdKSksXG5cdERlY2xhcmVCdWlsdEJhZyA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgWyBWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCwgTGl0RW1wdHlBcnJheSkgXSksXG5cdERlY2xhcmVCdWlsdE1hcCA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEJ1aWx0LFxuXHRcdFx0TmV3RXhwcmVzc2lvbihtZW1iZXIoSWRlbnRpZmllcignZ2xvYmFsJyksICdNYXAnKSwgWyBdKSkgXSksXG5cdEV4cG9ydHNEZWZhdWx0ID0gbWVtYmVyKElkRXhwb3J0cywgJ2RlZmF1bHQnKSxcblx0RXhwb3J0c0dldCA9IG1lbWJlcihJZEV4cG9ydHMsICdfZ2V0JylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9