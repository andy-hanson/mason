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
	      msBool = ms('bool'),
	      msCheckContains = ms('checkContains'),
	      msError = ms('error'),
	      msGet = ms('get'),
	      msGetDefaultExport = ms('getDefaultExport'),
	      msExtract = ms('extract'),
	      msGetModule = ms('getModule'),
	      msLazy = ms('lazy'),
	      msLazyGet = ms('lazyProp'),
	      msLazyGetModule = ms('lazyGetModule'),
	      msMap = ms('map'),
	      msSet = ms('set'),
	      msSetName = ms('setName'),
	      msSetLazy = ms('setLazy'),
	      msShow = ms('show'),
	      msSome = ms('some'),
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
	exports.msBool = msBool;
	exports.msCheckContains = msCheckContains;
	exports.msError = msError;
	exports.msGet = msGet;
	exports.msGetDefaultExport = msGetDefaultExport;
	exports.msExtract = msExtract;
	exports.msGetModule = msGetModule;
	exports.msLazy = msLazy;
	exports.msLazyGet = msLazyGet;
	exports.msLazyGetModule = msLazyGetModule;
	exports.msMap = msMap;
	exports.msSet = msSet;
	exports.msSetName = msSetName;
	exports.msSetLazy = msSetLazy;
	exports.msShow = msShow;
	exports.msSome = msSome;
	exports.msUnlazy = msUnlazy;
	exports.MsNone = MsNone;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9tcy1jYWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFNLEVBQUUsR0FBRyxJQUFJLElBQUk7QUFDbEIsUUFBTSxDQUFDLEdBQUcsbUJBSEYsTUFBTSxFQUdHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTs7QUFFNUIsU0FBTyxZQUFXO0FBQUUsVUFBTyxrQkFObkIsY0FBYyxFQU1vQixDQUFDLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7R0FBRSxDQUFBO0VBQ3JGLENBQUE7QUFDTSxPQUNOLElBQUksR0FBRyxrQkFUaUIsVUFBVSxFQVNoQixLQUFLLENBQUM7T0FDeEIsUUFBUSxHQUFHLEtBQUssSUFBSSxNQUFNLENBQUMsbUJBVFgsS0FBSyxFQVNZLEtBQUssQ0FBQyxDQUFDO09BQ3hDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO09BQ3pCLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO09BQ3ZCLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO09BQzdCLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO09BQ3JCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLGVBQWUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO09BQ3JDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO09BQ3JCLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztPQUMzQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztPQUN6QixXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztPQUM3QixNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNuQixTQUFTLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztPQUMxQixlQUFlLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQztPQUNyQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNqQixLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNqQixTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztPQUN6QixTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztPQUN6QixNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNuQixNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNuQixRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztPQUN2QixNQUFNLEdBQUcsbUJBakNELE1BQU0sRUFpQ0UsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBekI3QixJQUFJLEdBQUosSUFBSTtTQUNKLFFBQVEsR0FBUixRQUFRO1NBQ1IsS0FBSyxHQUFMLEtBQUs7U0FDTCxTQUFTLEdBQVQsU0FBUztTQUNULEtBQUssR0FBTCxLQUFLO1NBQ0wsUUFBUSxHQUFSLFFBQVE7U0FDUixXQUFXLEdBQVgsV0FBVztTQUNYLE9BQU8sR0FBUCxPQUFPO1NBQ1AsTUFBTSxHQUFOLE1BQU07U0FDTixlQUFlLEdBQWYsZUFBZTtTQUNmLE9BQU8sR0FBUCxPQUFPO1NBQ1AsS0FBSyxHQUFMLEtBQUs7U0FDTCxrQkFBa0IsR0FBbEIsa0JBQWtCO1NBQ2xCLFNBQVMsR0FBVCxTQUFTO1NBQ1QsV0FBVyxHQUFYLFdBQVc7U0FDWCxNQUFNLEdBQU4sTUFBTTtTQUNOLFNBQVMsR0FBVCxTQUFTO1NBQ1QsZUFBZSxHQUFmLGVBQWU7U0FDZixLQUFLLEdBQUwsS0FBSztTQUNMLEtBQUssR0FBTCxLQUFLO1NBQ0wsU0FBUyxHQUFULFNBQVM7U0FDVCxTQUFTLEdBQVQsU0FBUztTQUNULE1BQU0sR0FBTixNQUFNO1NBQ04sTUFBTSxHQUFOLE1BQU07U0FDTixRQUFRLEdBQVIsUUFBUTtTQUNSLE1BQU0sR0FBTixNQUFNIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9tcy1jYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsbEV4cHJlc3Npb24sIElkZW50aWZpZXIgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IG1lbWJlciwgdGh1bmsgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5cbmNvbnN0IG1zID0gbmFtZSA9PiB7XG5cdGNvbnN0IG0gPSBtZW1iZXIoSWRNcywgbmFtZSlcblx0Ly8gVE9ETzpFUzYgKC4uLmFyZ3MpID0+IENhbGxFeHByZXNzaW9uKG0sIGFyZ3MpXG5cdHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIENhbGxFeHByZXNzaW9uKG0sIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpIH1cbn1cbmV4cG9ydCBjb25zdFxuXHRJZE1zID0gSWRlbnRpZmllcignX21zJyksXG5cdGxhenlXcmFwID0gdmFsdWUgPT4gbXNMYXp5KHRodW5rKHZhbHVlKSksXG5cdG1zQWRkID0gbXMoJ2FkZCcpLFxuXHRtc0FkZE1hbnkgPSBtcygnYWRkTWFueScpLFxuXHRtc0FyciA9IG1zKCdhcnInKSxcblx0bXNBc3NlcnQgPSBtcygnYXNzZXJ0JyksXG5cdG1zQXNzZXJ0Tm90ID0gbXMoJ2Fzc2VydE5vdCcpLFxuXHRtc0Fzc29jID0gbXMoJ2Fzc29jJyksXG5cdG1zQm9vbCA9IG1zKCdib29sJyksXG5cdG1zQ2hlY2tDb250YWlucyA9IG1zKCdjaGVja0NvbnRhaW5zJyksXG5cdG1zRXJyb3IgPSBtcygnZXJyb3InKSxcblx0bXNHZXQgPSBtcygnZ2V0JyksXG5cdG1zR2V0RGVmYXVsdEV4cG9ydCA9IG1zKCdnZXREZWZhdWx0RXhwb3J0JyksXG5cdG1zRXh0cmFjdCA9IG1zKCdleHRyYWN0JyksXG5cdG1zR2V0TW9kdWxlID0gbXMoJ2dldE1vZHVsZScpLFxuXHRtc0xhenkgPSBtcygnbGF6eScpLFxuXHRtc0xhenlHZXQgPSBtcygnbGF6eVByb3AnKSxcblx0bXNMYXp5R2V0TW9kdWxlID0gbXMoJ2xhenlHZXRNb2R1bGUnKSxcblx0bXNNYXAgPSBtcygnbWFwJyksXG5cdG1zU2V0ID0gbXMoJ3NldCcpLFxuXHRtc1NldE5hbWUgPSBtcygnc2V0TmFtZScpLFxuXHRtc1NldExhenkgPSBtcygnc2V0TGF6eScpLFxuXHRtc1Nob3cgPSBtcygnc2hvdycpLFxuXHRtc1NvbWUgPSBtcygnc29tZScpLFxuXHRtc1VubGF6eSA9IG1zKCd1bmxhenknKSxcblx0TXNOb25lID0gbWVtYmVyKElkTXMsICdOb25lJylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9