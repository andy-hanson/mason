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
	      SymbolIterator = (0, _esastDistUtil.member)((0, _esastDistAst.Identifier)('Symbol'), 'iterator'),
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
	exports.SymbolIterator = SymbolIterator;
	exports.UseStrict = UseStrict;
	exports.ArraySliceCall = ArraySliceCall;
	exports.AmdefineHeader = AmdefineHeader;
	exports.ExportsDefault = ExportsDefault;
	exports.ExportsGet = ExportsGet;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtPLE9BQ04sV0FBVyxHQUFHLGtCQU5rRSxVQUFVLEVBTWpFLFdBQVcsQ0FBQztPQUNyQyxRQUFRLEdBQUcsa0JBUHFFLFVBQVUsRUFPcEUsUUFBUSxDQUFDO09BQy9CLE9BQU8sR0FBRyxrQkFSc0UsVUFBVSxFQVFyRSxPQUFPLENBQUM7T0FDN0IsU0FBUyxHQUFHLGtCQVRvRSxVQUFVLEVBU25FLFNBQVMsQ0FBQztPQUNqQyxTQUFTLEdBQUcsa0JBVm9FLFVBQVUsRUFVbkUsSUFBSSxDQUFDO09BQzVCLG1CQUFtQixHQUFHLG1CQVJkLE1BQU0sRUFRZSxtQkFSckIsTUFBTSxFQVFzQixrQkFYNEMsVUFBVSxFQVczQyxVQUFVLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUM7T0FDN0UsTUFBTSxHQUFHLGtCQVp1RSxVQUFVLEVBWXRFLE1BQU0sQ0FBQztPQUMzQixhQUFhLEdBQUcsa0JBYlIsZUFBZSxFQWFTLEVBQUUsQ0FBQztPQUNuQyxjQUFjLEdBQUcsa0JBYkosT0FBTyxFQWFLLEVBQUUsQ0FBQztPQUM1QixPQUFPLEdBQUcsa0JBZEcsT0FBTyxFQWNGLElBQUksQ0FBQztPQUN2QixPQUFPLEdBQUcsa0JBZkcsT0FBTyxFQWVGLElBQUksQ0FBQztPQUN2QixPQUFPLEdBQUcsa0JBaEJHLE9BQU8sRUFnQkYsQ0FBQyxDQUFDO09BQ3BCLGFBQWEsR0FBRyxrQkFqQkgsT0FBTyxFQWlCSSxTQUFTLENBQUM7T0FDbEMsVUFBVSxHQUFHLGtCQWxCQSxPQUFPLEVBa0JDLE1BQU0sQ0FBQztPQUM1QixhQUFhLEdBQUcsa0JBbkJNLGVBQWUsRUFtQkwsU0FBUyxDQUFDO09BQzFDLFNBQVMsR0FBRyxrQkFwQlUsZUFBZSxFQW9CVCxrQkFyQm9ELFVBQVUsRUFxQm5ELEtBQUssQ0FBQyxDQUFDO09BQzlDLGNBQWMsR0FBRyxtQkFuQlQsTUFBTSxFQW1CVSxrQkF0QndELFVBQVUsRUFzQnZELFFBQVEsQ0FBQyxFQUFFLFVBQVUsQ0FBQztPQUN6RCxTQUFTLEdBQUcsa0JBdkIrQyxtQkFBbUIsRUF1QjlDLGtCQXRCbkIsT0FBTyxFQXNCb0IsWUFBWSxDQUFDLENBQUM7T0FFdEQsY0FBYyxHQUFHLG1CQXRCVCxNQUFNLEVBc0JVLG1CQXRCaEIsTUFBTSxFQXNCaUIsYUFBYSxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQzs7O0FBRS9ELGVBQWMsR0FBRyxrQkExQmpCLFdBQVcsRUEyQlYsa0JBNUJ3QixnQkFBZ0IsRUE0QnZCLEtBQUssRUFBRSxrQkEzQmMsZUFBZSxFQTJCYixRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsa0JBM0JqRCxPQUFPLEVBMkJrRCxVQUFVLENBQUMsQ0FBQyxFQUNqRixrQkE1QnVELG1CQUFtQixFQTRCdEQsS0FBSyxFQUFFLENBQzFCLGtCQTdCMkUsa0JBQWtCLEVBNkIxRSxRQUFRLEVBQUUsa0JBOUJZLGNBQWMsRUErQnRELGtCQS9Cd0MsY0FBYyxFQStCdkMsa0JBL0I4RCxVQUFVLEVBK0I3RCxTQUFTLENBQUMsRUFBRSxDQUFFLGtCQTlCOUIsT0FBTyxFQThCK0IsVUFBVSxDQUFDLENBQUUsQ0FBQyxFQUM5RCxDQUFFLGtCQWhDMkUsVUFBVSxFQWdDMUUsUUFBUSxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDO09BQ2pDLGNBQWMsR0FBRyxtQkE5QlQsTUFBTSxFQThCVSxTQUFTLEVBQUUsU0FBUyxDQUFDO09BQzdDLFVBQVUsR0FBRyxtQkEvQkwsTUFBTSxFQStCTSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUE7U0E1QnRDLFdBQVcsR0FBWCxXQUFXO1NBQ1gsUUFBUSxHQUFSLFFBQVE7U0FDUixPQUFPLEdBQVAsT0FBTztTQUNQLFNBQVMsR0FBVCxTQUFTO1NBQ1QsU0FBUyxHQUFULFNBQVM7U0FDVCxtQkFBbUIsR0FBbkIsbUJBQW1CO1NBQ25CLE1BQU0sR0FBTixNQUFNO1NBQ04sYUFBYSxHQUFiLGFBQWE7U0FDYixjQUFjLEdBQWQsY0FBYztTQUNkLE9BQU8sR0FBUCxPQUFPO1NBQ1AsT0FBTyxHQUFQLE9BQU87U0FDUCxPQUFPLEdBQVAsT0FBTztTQUNQLGFBQWEsR0FBYixhQUFhO1NBQ2IsVUFBVSxHQUFWLFVBQVU7U0FDVixhQUFhLEdBQWIsYUFBYTtTQUNiLFNBQVMsR0FBVCxTQUFTO1NBQ1QsY0FBYyxHQUFkLGNBQWM7U0FDZCxTQUFTLEdBQVQsU0FBUztTQUVULGNBQWMsR0FBZCxjQUFjO1NBRWQsY0FBYyxHQUFkLGNBQWM7U0FNZCxjQUFjLEdBQWQsY0FBYztTQUNkLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBDYWxsRXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgSWRlbnRpZmllcixcblx0SWZTdGF0ZW1lbnQsIExpdGVyYWwsIFJldHVyblN0YXRlbWVudCwgVW5hcnlFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3Jcblx0fSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IG1lbWJlciB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcblxuZXhwb3J0IGNvbnN0XG5cdElkQXJndW1lbnRzID0gSWRlbnRpZmllcignYXJndW1lbnRzJyksXG5cdElkRGVmaW5lID0gSWRlbnRpZmllcignZGVmaW5lJyksXG5cdElkRXJyb3IgPSBJZGVudGlmaWVyKCdFcnJvcicpLFxuXHRJZEV4cG9ydHMgPSBJZGVudGlmaWVyKCdleHBvcnRzJyksXG5cdElkRXh0cmFjdCA9IElkZW50aWZpZXIoJ18kJyksXG5cdElkRnVuY3Rpb25BcHBseUNhbGwgPSBtZW1iZXIobWVtYmVyKElkZW50aWZpZXIoJ0Z1bmN0aW9uJyksICdhcHBseScpLCAnY2FsbCcpLFxuXHRJZE5hbWUgPSBJZGVudGlmaWVyKCduYW1lJyksXG5cdExpdEVtcHR5QXJyYXkgPSBBcnJheUV4cHJlc3Npb24oW10pLFxuXHRMaXRFbXB0eVN0cmluZyA9IExpdGVyYWwoJycpLFxuXHRMaXROdWxsID0gTGl0ZXJhbChudWxsKSxcblx0TGl0VHJ1ZSA9IExpdGVyYWwodHJ1ZSksXG5cdExpdFplcm8gPSBMaXRlcmFsKDApLFxuXHRMaXRTdHJFeHBvcnRzID0gTGl0ZXJhbCgnZXhwb3J0cycpLFxuXHRMaXRTdHJOYW1lID0gTGl0ZXJhbCgnbmFtZScpLFxuXHRSZXR1cm5FeHBvcnRzID0gUmV0dXJuU3RhdGVtZW50KElkRXhwb3J0cyksXG5cdFJldHVyblJlcyA9IFJldHVyblN0YXRlbWVudChJZGVudGlmaWVyKCdyZXMnKSksXG5cdFN5bWJvbEl0ZXJhdG9yID0gbWVtYmVyKElkZW50aWZpZXIoJ1N5bWJvbCcpLCAnaXRlcmF0b3InKSxcblx0VXNlU3RyaWN0ID0gRXhwcmVzc2lvblN0YXRlbWVudChMaXRlcmFsKCd1c2Ugc3RyaWN0JykpLFxuXG5cdEFycmF5U2xpY2VDYWxsID0gbWVtYmVyKG1lbWJlcihMaXRFbXB0eUFycmF5LCAnc2xpY2UnKSwgJ2NhbGwnKSxcblx0Ly8gaWYgKHR5cGVvZiBkZWZpbmUgIT09ICdmdW5jdGlvbicpIHZhciBkZWZpbmUgPSByZXF1aXJlKCdhbWRlZmluZScpKG1vZHVsZSlcblx0QW1kZWZpbmVIZWFkZXIgPSBJZlN0YXRlbWVudChcblx0XHRCaW5hcnlFeHByZXNzaW9uKCchPT0nLCBVbmFyeUV4cHJlc3Npb24oJ3R5cGVvZicsIElkRGVmaW5lKSwgTGl0ZXJhbCgnZnVuY3Rpb24nKSksXG5cdFx0VmFyaWFibGVEZWNsYXJhdGlvbigndmFyJywgW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkRGVmaW5lLCBDYWxsRXhwcmVzc2lvbihcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24oSWRlbnRpZmllcigncmVxdWlyZScpLCBbIExpdGVyYWwoJ2FtZGVmaW5lJykgXSksXG5cdFx0XHRcdFsgSWRlbnRpZmllcignbW9kdWxlJykgXSkpIF0pKSxcblx0RXhwb3J0c0RlZmF1bHQgPSBtZW1iZXIoSWRFeHBvcnRzLCAnZGVmYXVsdCcpLFxuXHRFeHBvcnRzR2V0ID0gbWVtYmVyKElkRXhwb3J0cywgJ19nZXQnKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=