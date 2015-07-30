if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util'], function (exports, _esastDistAst, _esastDistUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	const ms = name => {
		const m = (0, _esastDistUtil.member)(IdMs, name);
		// TODO:ES6 (...args) => CallExpression(m, args)
		return function () {
			return (0, _esastDistAst.CallExpression)(m, Array.prototype.slice.call(arguments));
		};
	};
	const IdMs = (0, _esastDistAst.Identifier)('_ms'),
	      lazyWrap = value => msLazy((0, _esastDistUtil.thunk)(value)),
	      msAdd = ms('add'),
	      msAddMany = ms('addMany'),
	      msArr = ms('arr'),
	      msAssert = ms('assert'),
	      msAssertNot = ms('assertNot'),
	      msAssoc = ms('assoc'),
	      msCheckContains = ms('checkContains'),
	      msError = ms('error'),
	      msGet = ms('get'),
	      msGetDefaultExport = ms('getDefaultExport'),
	      msExtract = ms('extract'),
	      msGetModule = ms('getModule'),
	      msLazy = ms('lazy'),
	      msLazyGet = ms('lazyProp'),
	      msLazyGetModule = ms('lazyGetModule'),
	      msNewMutableProperty = ms('newMutableProperty'),
	      msNewProperty = ms('newProperty'),
	      msSet = ms('set'),
	      msSetName = ms('setName'),
	      msSetLazy = ms('setLazy'),
	      msShow = ms('show'),
	      msSome = ms('some'),
	      msSymbol = ms('symbol'),
	      msUnlazy = ms('unlazy'),
	      MsNone = (0, _esastDistUtil.member)(IdMs, 'None');
	exports.IdMs = IdMs;
	exports.lazyWrap = lazyWrap;
	exports.msAdd = msAdd;
	exports.msAddMany = msAddMany;
	exports.msArr = msArr;
	exports.msAssert = msAssert;
	exports.msAssertNot = msAssertNot;
	exports.msAssoc = msAssoc;
	exports.msCheckContains = msCheckContains;
	exports.msError = msError;
	exports.msGet = msGet;
	exports.msGetDefaultExport = msGetDefaultExport;
	exports.msExtract = msExtract;
	exports.msGetModule = msGetModule;
	exports.msLazy = msLazy;
	exports.msLazyGet = msLazyGet;
	exports.msLazyGetModule = msLazyGetModule;
	exports.msNewMutableProperty = msNewMutableProperty;
	exports.msNewProperty = msNewProperty;
	exports.msSet = msSet;
	exports.msSetName = msSetName;
	exports.msSetLazy = msSetLazy;
	exports.msShow = msShow;
	exports.msSome = msSome;
	exports.msSymbol = msSymbol;
	exports.msUnlazy = msUnlazy;
	exports.MsNone = MsNone;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9tcy1jYWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFNLEVBQUUsR0FBRyxJQUFJLElBQUk7QUFDbEIsUUFBTSxDQUFDLEdBQUcsbUJBSEYsTUFBTSxFQUdHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTs7QUFFNUIsU0FBTyxZQUFXO0FBQUUsVUFBTyxrQkFObkIsY0FBYyxFQU1vQixDQUFDLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7R0FBRSxDQUFBO0VBQ3JGLENBQUE7QUFDTSxPQUNOLElBQUksR0FBRyxrQkFUaUIsVUFBVSxFQVNoQixLQUFLLENBQUM7T0FDeEIsUUFBUSxHQUFHLEtBQUssSUFBSSxNQUFNLENBQUMsbUJBVFgsS0FBSyxFQVNZLEtBQUssQ0FBQyxDQUFDO09BQ3hDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO09BQ3pCLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO09BQ3ZCLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO09BQzdCLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO09BQ3JCLGVBQWUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO09BQ3JDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO09BQ3JCLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztPQUMzQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztPQUN6QixXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztPQUM3QixNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNuQixTQUFTLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztPQUMxQixlQUFlLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQztPQUNyQyxvQkFBb0IsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7T0FDL0MsYUFBYSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7T0FDakMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7T0FDekIsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7T0FDekIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDbkIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDbkIsUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7T0FDdkIsUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7T0FDdkIsTUFBTSxHQUFHLG1CQWxDRCxNQUFNLEVBa0NFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvbXMtY2FsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGxFeHByZXNzaW9uLCBJZGVudGlmaWVyIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBtZW1iZXIsIHRodW5rIH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuXG5jb25zdCBtcyA9IG5hbWUgPT4ge1xuXHRjb25zdCBtID0gbWVtYmVyKElkTXMsIG5hbWUpXG5cdC8vIFRPRE86RVM2ICguLi5hcmdzKSA9PiBDYWxsRXhwcmVzc2lvbihtLCBhcmdzKVxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBDYWxsRXhwcmVzc2lvbihtLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSB9XG59XG5leHBvcnQgY29uc3Rcblx0SWRNcyA9IElkZW50aWZpZXIoJ19tcycpLFxuXHRsYXp5V3JhcCA9IHZhbHVlID0+IG1zTGF6eSh0aHVuayh2YWx1ZSkpLFxuXHRtc0FkZCA9IG1zKCdhZGQnKSxcblx0bXNBZGRNYW55ID0gbXMoJ2FkZE1hbnknKSxcblx0bXNBcnIgPSBtcygnYXJyJyksXG5cdG1zQXNzZXJ0ID0gbXMoJ2Fzc2VydCcpLFxuXHRtc0Fzc2VydE5vdCA9IG1zKCdhc3NlcnROb3QnKSxcblx0bXNBc3NvYyA9IG1zKCdhc3NvYycpLFxuXHRtc0NoZWNrQ29udGFpbnMgPSBtcygnY2hlY2tDb250YWlucycpLFxuXHRtc0Vycm9yID0gbXMoJ2Vycm9yJyksXG5cdG1zR2V0ID0gbXMoJ2dldCcpLFxuXHRtc0dldERlZmF1bHRFeHBvcnQgPSBtcygnZ2V0RGVmYXVsdEV4cG9ydCcpLFxuXHRtc0V4dHJhY3QgPSBtcygnZXh0cmFjdCcpLFxuXHRtc0dldE1vZHVsZSA9IG1zKCdnZXRNb2R1bGUnKSxcblx0bXNMYXp5ID0gbXMoJ2xhenknKSxcblx0bXNMYXp5R2V0ID0gbXMoJ2xhenlQcm9wJyksXG5cdG1zTGF6eUdldE1vZHVsZSA9IG1zKCdsYXp5R2V0TW9kdWxlJyksXG5cdG1zTmV3TXV0YWJsZVByb3BlcnR5ID0gbXMoJ25ld011dGFibGVQcm9wZXJ0eScpLFxuXHRtc05ld1Byb3BlcnR5ID0gbXMoJ25ld1Byb3BlcnR5JyksXG5cdG1zU2V0ID0gbXMoJ3NldCcpLFxuXHRtc1NldE5hbWUgPSBtcygnc2V0TmFtZScpLFxuXHRtc1NldExhenkgPSBtcygnc2V0TGF6eScpLFxuXHRtc1Nob3cgPSBtcygnc2hvdycpLFxuXHRtc1NvbWUgPSBtcygnc29tZScpLFxuXHRtc1N5bWJvbCA9IG1zKCdzeW1ib2wnKSxcblx0bXNVbmxhenkgPSBtcygndW5sYXp5JyksXG5cdE1zTm9uZSA9IG1lbWJlcihJZE1zLCAnTm9uZScpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==