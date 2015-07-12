if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', './util'], function (exports, _esastDistAst, _esastDistUtil, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const EmptyTemplateElement = (0, _util.templateElementForString)(''),
	      IdArguments = (0, _esastDistAst.Identifier)('arguments'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1PLE9BQ04sb0JBQW9CLEdBQUcsVUFIZix3QkFBd0IsRUFHZ0IsRUFBRSxDQUFDO09BQ25ELFdBQVcsR0FBRyxrQkFSa0UsVUFBVSxFQVFqRSxXQUFXLENBQUM7T0FDckMsT0FBTyxHQUFHLGtCQVRzRSxVQUFVLEVBU3JFLE9BQU8sQ0FBQztPQUM3QixRQUFRLEdBQUcsa0JBVnFFLFVBQVUsRUFVcEUsUUFBUSxDQUFDO09BQy9CLE9BQU8sR0FBRyxrQkFYc0UsVUFBVSxFQVdyRSxPQUFPLENBQUM7T0FDN0IsU0FBUyxHQUFHLGtCQVpvRSxVQUFVLEVBWW5FLFNBQVMsQ0FBQztPQUNqQyxTQUFTLEdBQUcsa0JBYm9FLFVBQVUsRUFhbkUsSUFBSSxDQUFDO09BQzVCLG1CQUFtQixHQUFHLG1CQVhkLE1BQU0sRUFXZSxtQkFYckIsTUFBTSxFQVdzQixrQkFkNEMsVUFBVSxFQWMzQyxVQUFVLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUM7T0FDN0UsYUFBYSxHQUFHLGtCQWZSLGVBQWUsRUFlUyxFQUFFLENBQUM7T0FDbkMsY0FBYyxHQUFHLGtCQWZKLE9BQU8sRUFlSyxFQUFFLENBQUM7T0FDNUIsT0FBTyxHQUFHLGtCQWhCRyxPQUFPLEVBZ0JGLElBQUksQ0FBQztPQUN2QixVQUFVLEdBQUcsa0JBakJBLE9BQU8sRUFpQkMsUUFBUSxDQUFDO09BQzlCLGFBQWEsR0FBRyxrQkFsQkgsT0FBTyxFQWtCSSxTQUFTLENBQUM7T0FDbEMsT0FBTyxHQUFHLGtCQW5CRyxPQUFPLEVBbUJGLElBQUksQ0FBQztPQUN2QixPQUFPLEdBQUcsa0JBcEJHLE9BQU8sRUFvQkYsQ0FBQyxDQUFDO09BQ3BCLFdBQVcsR0FBRyxrQkFyQnlDLGVBQWUsRUFxQnhDLE9BQU8sQ0FBQztPQUN0QyxhQUFhLEdBQUcsa0JBdEJ1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ZSxHQUFmLGVBQWU7U0FHZixjQUFjLEdBQWQsY0FBYztTQUNkLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9hc3QtY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBDYWxsRXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgSWRlbnRpZmllcixcblx0SWZTdGF0ZW1lbnQsIExpdGVyYWwsIE5ld0V4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sIFJldHVyblN0YXRlbWVudCwgVW5hcnlFeHByZXNzaW9uLFxuXHRWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IG1lbWJlciB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcbmltcG9ydCB7IHRlbXBsYXRlRWxlbWVudEZvclN0cmluZyB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGNvbnN0XG5cdEVtcHR5VGVtcGxhdGVFbGVtZW50ID0gdGVtcGxhdGVFbGVtZW50Rm9yU3RyaW5nKCcnKSxcblx0SWRBcmd1bWVudHMgPSBJZGVudGlmaWVyKCdhcmd1bWVudHMnKSxcblx0SWRCdWlsdCA9IElkZW50aWZpZXIoJ2J1aWx0JyksXG5cdElkRGVmaW5lID0gSWRlbnRpZmllcignZGVmaW5lJyksXG5cdElkRXJyb3IgPSBJZGVudGlmaWVyKCdFcnJvcicpLFxuXHRJZEV4cG9ydHMgPSBJZGVudGlmaWVyKCdleHBvcnRzJyksXG5cdElkRXh0cmFjdCA9IElkZW50aWZpZXIoJ18kJyksXG5cdElkRnVuY3Rpb25BcHBseUNhbGwgPSBtZW1iZXIobWVtYmVyKElkZW50aWZpZXIoJ0Z1bmN0aW9uJyksICdhcHBseScpLCAnY2FsbCcpLFxuXHRMaXRFbXB0eUFycmF5ID0gQXJyYXlFeHByZXNzaW9uKFtdKSxcblx0TGl0RW1wdHlTdHJpbmcgPSBMaXRlcmFsKCcnKSxcblx0TGl0TnVsbCA9IExpdGVyYWwobnVsbCksXG5cdExpdFN0ck9oTm8gPSBMaXRlcmFsKCdPaCBubyEnKSxcblx0TGl0U3RyRXhwb3J0cyA9IExpdGVyYWwoJ2V4cG9ydHMnKSxcblx0TGl0VHJ1ZSA9IExpdGVyYWwodHJ1ZSksXG5cdExpdFplcm8gPSBMaXRlcmFsKDApLFxuXHRSZXR1cm5CdWlsdCA9IFJldHVyblN0YXRlbWVudChJZEJ1aWx0KSxcblx0UmV0dXJuRXhwb3J0cyA9IFJldHVyblN0YXRlbWVudChJZEV4cG9ydHMpLFxuXHRSZXR1cm5SZXMgPSBSZXR1cm5TdGF0ZW1lbnQoSWRlbnRpZmllcigncmVzJykpLFxuXHRTeW1ib2xJdGVyYXRvciA9IG1lbWJlcihJZGVudGlmaWVyKCdTeW1ib2wnKSwgJ2l0ZXJhdG9yJyksXG5cdFVzZVN0cmljdCA9IEV4cHJlc3Npb25TdGF0ZW1lbnQoTGl0ZXJhbCgndXNlIHN0cmljdCcpKSxcblxuXHRBcnJheVNsaWNlQ2FsbCA9IG1lbWJlcihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ3NsaWNlJyksICdjYWxsJyksXG5cdC8vIGlmICh0eXBlb2YgZGVmaW5lICE9PSAnZnVuY3Rpb24nKSB2YXIgZGVmaW5lID0gcmVxdWlyZSgnYW1kZWZpbmUnKShtb2R1bGUpXG5cdEFtZGVmaW5lSGVhZGVyID0gSWZTdGF0ZW1lbnQoXG5cdFx0QmluYXJ5RXhwcmVzc2lvbignIT09JywgVW5hcnlFeHByZXNzaW9uKCd0eXBlb2YnLCBJZERlZmluZSksIExpdGVyYWwoJ2Z1bmN0aW9uJykpLFxuXHRcdFZhcmlhYmxlRGVjbGFyYXRpb24oJ3ZhcicsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZERlZmluZSwgQ2FsbEV4cHJlc3Npb24oXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKElkZW50aWZpZXIoJ3JlcXVpcmUnKSwgWyBMaXRlcmFsKCdhbWRlZmluZScpIF0pLFxuXHRcdFx0XHRbIElkZW50aWZpZXIoJ21vZHVsZScpIF0pKSBdKSksXG5cdERlY2xhcmVCdWlsdEJhZyA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgWyBWYXJpYWJsZURlY2xhcmF0b3IoSWRCdWlsdCwgTGl0RW1wdHlBcnJheSkgXSksXG5cdERlY2xhcmVCdWlsdE1hcCA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEJ1aWx0LFxuXHRcdFx0TmV3RXhwcmVzc2lvbihtZW1iZXIoSWRlbnRpZmllcignZ2xvYmFsJyksICdNYXAnKSwgWyBdKSkgXSksXG5cdERlY2xhcmVCdWlsdE9iaiA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEJ1aWx0LCBPYmplY3RFeHByZXNzaW9uKFsgXSkpIF0pLFxuXG5cdEV4cG9ydHNEZWZhdWx0ID0gbWVtYmVyKElkRXhwb3J0cywgJ2RlZmF1bHQnKSxcblx0RXhwb3J0c0dldCA9IG1lbWJlcihJZEV4cG9ydHMsICdfZ2V0JylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9