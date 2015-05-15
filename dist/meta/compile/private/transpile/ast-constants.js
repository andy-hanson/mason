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
	      LitZero = (0, _esastDistAst.Literal)(0),
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
	exports.LitZero = LitZero;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sS0FBSyxHQUFHLGtCQVBpQixjQUFjLEdBT2Y7T0FDeEIsUUFBUSxHQUFHLGtCQVJtRSxVQUFVLEVBUWxFLFFBQVEsQ0FBQztPQUMvQixhQUFhLEdBQUcsa0JBVDhELFVBQVUsRUFTN0QsYUFBYSxDQUFDO09BQ3pDLE9BQU8sR0FBRyxrQkFWb0UsVUFBVSxFQVVuRSxPQUFPLENBQUM7T0FDN0IsU0FBUyxHQUFHLGtCQVhrRSxVQUFVLEVBV2pFLFNBQVMsQ0FBQztPQUNqQyxTQUFTLEdBQUcsa0JBWmtFLFVBQVUsRUFZakUsSUFBSSxDQUFDO09BQzVCLFdBQVcsR0FBRyxrQkFiZ0UsVUFBVSxFQWEvRCxXQUFXLENBQUM7T0FDckMsbUJBQW1CLEdBQUcsbUJBWGQsTUFBTSxFQVdlLG1CQVhyQixNQUFNLEVBV3NCLGtCQWQwQyxVQUFVLEVBY3pDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQztPQUM3RSxhQUFhLEdBQUcsa0JBZlIsZUFBZSxFQWVTLEVBQUUsQ0FBQztPQUNuQyxjQUFjLEdBQUcsa0JBZkosT0FBTyxFQWVLLEVBQUUsQ0FBQztPQUM1QixPQUFPLEdBQUcsa0JBaEJHLE9BQU8sRUFnQkYsSUFBSSxDQUFDO09BQ3ZCLE9BQU8sR0FBRyxrQkFqQkcsT0FBTyxFQWlCRixJQUFJLENBQUM7T0FDdkIsT0FBTyxHQUFHLGtCQWxCRyxPQUFPLEVBa0JGLENBQUMsQ0FBQztPQUNwQixpQkFBaUIsR0FBRyxrQkFuQlAsT0FBTyxFQW1CUSxhQUFhLENBQUM7T0FDMUMsYUFBYSxHQUFHLGtCQXBCSCxPQUFPLEVBb0JJLFNBQVMsQ0FBQztPQUNsQyxhQUFhLEdBQUcsa0JBckJNLGVBQWUsRUFxQkwsU0FBUyxDQUFDO09BQzFDLFNBQVMsR0FBRyxrQkF0QlUsZUFBZSxFQXNCVCxrQkF2QmtELFVBQVUsRUF1QmpELEtBQUssQ0FBQyxDQUFDO09BQzlDLFNBQVMsR0FBRyxrQkF4QjZDLG1CQUFtQixFQXdCNUMsa0JBdkJuQixPQUFPLEVBdUJvQixZQUFZLENBQUMsQ0FBQztPQUV0RCxjQUFjLEdBQUcsbUJBdkJULE1BQU0sRUF1QlUsbUJBdkJoQixNQUFNLEVBdUJpQixhQUFhLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDOzs7QUFFL0QsZUFBYyxHQUFHLGtCQTNCakIsV0FBVyxFQTRCVixVQXpCTyx3QkFBd0IsRUF5Qk4sa0JBNUJhLGVBQWUsRUE0QlosUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLGtCQTVCbEQsT0FBTyxFQTRCbUQsVUFBVSxDQUFDLENBQUMsRUFDbEYsa0JBN0J1RCxtQkFBbUIsRUE2QnRELEtBQUssRUFBRSxDQUMxQixrQkE5QjJFLGtCQUFrQixFQThCMUUsUUFBUSxFQUFFLGtCQS9CVSxjQUFjLEVBZ0NwRCxrQkFoQ3NDLGNBQWMsRUFnQ3JDLGtCQWhDNEQsVUFBVSxFQWdDM0QsU0FBUyxDQUFDLEVBQUUsQ0FBRSxrQkEvQjlCLE9BQU8sRUErQitCLFVBQVUsQ0FBQyxDQUFFLENBQUMsRUFDOUQsQ0FBRSxrQkFqQ3lFLFVBQVUsRUFpQ3hFLFFBQVEsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQztPQUNqQyxjQUFjLEdBQUcsbUJBL0JULE1BQU0sRUErQlUsU0FBUyxFQUFFLFNBQVMsQ0FBQztPQUM3QyxVQUFVLEdBQUcsbUJBaENMLE1BQU0sRUFnQ00sU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBNUJ0QyxLQUFLLEdBQUwsS0FBSztTQUNMLFFBQVEsR0FBUixRQUFRO1NBQ1IsYUFBYSxHQUFiLGFBQWE7U0FDYixPQUFPLEdBQVAsT0FBTztTQUNQLFNBQVMsR0FBVCxTQUFTO1NBQ1QsU0FBUyxHQUFULFNBQVM7U0FDVCxXQUFXLEdBQVgsV0FBVztTQUNYLG1CQUFtQixHQUFuQixtQkFBbUI7U0FDbkIsYUFBYSxHQUFiLGFBQWE7U0FDYixjQUFjLEdBQWQsY0FBYztTQUNkLE9BQU8sR0FBUCxPQUFPO1NBQ1AsT0FBTyxHQUFQLE9BQU87U0FDUCxPQUFPLEdBQVAsT0FBTztTQUNQLGlCQUFpQixHQUFqQixpQkFBaUI7U0FDakIsYUFBYSxHQUFiLGFBQWE7U0FDYixhQUFhLEdBQWIsYUFBYTtTQUNiLFNBQVMsR0FBVCxTQUFTO1NBQ1QsU0FBUyxHQUFULFNBQVM7U0FFVCxjQUFjLEdBQWQsY0FBYztTQUVkLGNBQWMsR0FBZCxjQUFjO1NBTWQsY0FBYyxHQUFkLGNBQWM7U0FDZCxVQUFVLEdBQVYsVUFBVSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvYXN0LWNvbnN0YW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycmF5RXhwcmVzc2lvbiwgQnJlYWtTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBJZGVudGlmaWVyLFxuXHRJZlN0YXRlbWVudCwgTGl0ZXJhbCwgUmV0dXJuU3RhdGVtZW50LCBVbmFyeUV4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRpb24sIFZhcmlhYmxlRGVjbGFyYXRvclxuXHR9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IHsgbWVtYmVyIH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuaW1wb3J0IHsgYmluYXJ5RXhwcmVzc2lvbk5vdEVxdWFsIH0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgY29uc3Rcblx0QnJlYWsgPSBCcmVha1N0YXRlbWVudCgpLFxuXHRJZERlZmluZSA9IElkZW50aWZpZXIoJ2RlZmluZScpLFxuXHRJZERpc3BsYXlOYW1lID0gSWRlbnRpZmllcignZGlzcGxheU5hbWUnKSxcblx0SWRFcnJvciA9IElkZW50aWZpZXIoJ0Vycm9yJyksXG5cdElkRXhwb3J0cyA9IElkZW50aWZpZXIoJ2V4cG9ydHMnKSxcblx0SWRFeHRyYWN0ID0gSWRlbnRpZmllcignXyQnKSxcblx0SWRBcmd1bWVudHMgPSBJZGVudGlmaWVyKCdhcmd1bWVudHMnKSxcblx0SWRGdW5jdGlvbkFwcGx5Q2FsbCA9IG1lbWJlcihtZW1iZXIoSWRlbnRpZmllcignRnVuY3Rpb24nKSwgJ2FwcGx5JyksICdjYWxsJyksXG5cdExpdEVtcHR5QXJyYXkgPSBBcnJheUV4cHJlc3Npb24oW10pLFxuXHRMaXRFbXB0eVN0cmluZyA9IExpdGVyYWwoJycpLFxuXHRMaXROdWxsID0gTGl0ZXJhbChudWxsKSxcblx0TGl0VHJ1ZSA9IExpdGVyYWwodHJ1ZSksXG5cdExpdFplcm8gPSBMaXRlcmFsKDApLFxuXHRMaXRTdHJEaXNwbGF5TmFtZSA9IExpdGVyYWwoJ2Rpc3BsYXlOYW1lJyksXG5cdExpdFN0ckV4cG9ydHMgPSBMaXRlcmFsKCdleHBvcnRzJyksXG5cdFJldHVybkV4cG9ydHMgPSBSZXR1cm5TdGF0ZW1lbnQoSWRFeHBvcnRzKSxcblx0UmV0dXJuUmVzID0gUmV0dXJuU3RhdGVtZW50KElkZW50aWZpZXIoJ3JlcycpKSxcblx0VXNlU3RyaWN0ID0gRXhwcmVzc2lvblN0YXRlbWVudChMaXRlcmFsKCd1c2Ugc3RyaWN0JykpLFxuXG5cdEFycmF5U2xpY2VDYWxsID0gbWVtYmVyKG1lbWJlcihMaXRFbXB0eUFycmF5LCAnc2xpY2UnKSwgJ2NhbGwnKSxcblx0Ly8gaWYgKHR5cGVvZiBkZWZpbmUgIT09ICdmdW5jdGlvbicpIHZhciBkZWZpbmUgPSByZXF1aXJlKCdhbWRlZmluZScpKG1vZHVsZSlcblx0QW1kZWZpbmVIZWFkZXIgPSBJZlN0YXRlbWVudChcblx0XHRiaW5hcnlFeHByZXNzaW9uTm90RXF1YWwoVW5hcnlFeHByZXNzaW9uKCd0eXBlb2YnLCBJZERlZmluZSksIExpdGVyYWwoJ2Z1bmN0aW9uJykpLFxuXHRcdFZhcmlhYmxlRGVjbGFyYXRpb24oJ3ZhcicsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZERlZmluZSwgQ2FsbEV4cHJlc3Npb24oXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKElkZW50aWZpZXIoJ3JlcXVpcmUnKSwgWyBMaXRlcmFsKCdhbWRlZmluZScpIF0pLFxuXHRcdFx0XHRbIElkZW50aWZpZXIoJ21vZHVsZScpIF0pKSBdKSksXG5cdEV4cG9ydHNEZWZhdWx0ID0gbWVtYmVyKElkRXhwb3J0cywgJ2RlZmF1bHQnKSxcblx0RXhwb3J0c0dldCA9IG1lbWJlcihJZEV4cG9ydHMsICdfZ2V0JylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9