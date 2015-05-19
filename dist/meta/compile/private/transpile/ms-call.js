if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util'], function (exports, _esastDistAst, _esastDistUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	const ms = function (name) {
		const m = (0, _esastDistUtil.member)(IdMs, name);
		return function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return (0, _esastDistAst.CallExpression)(m, args);
		};
	};
	const IdMs = (0, _esastDistAst.Identifier)('_ms'),
	      lazyWrap = function (value) {
		return msLazy((0, _esastDistUtil.thunk)(value));
	},
	      msArr = ms('arr'),
	      msBool = ms('bool'),
	      msGet = ms('get'),
	      msGetDefaultExport = ms('getDefaultExport'),
	      msExtract = ms('extract'),
	      msGetModule = ms('getModule'),
	      msLazy = ms('lazy'),
	      msLazyGet = ms('lazyProp'),
	      msLazyGetModule = ms('lazyGetModule'),
	      msLset = ms('lset'),
	      msMap = ms('map'),
	      msSet = ms('set'),
	      msShow = ms('show'),
	      msCheckContains = ms('checkContains'),
	      msUnlazy = ms('unlazy');
	exports.IdMs = IdMs;
	exports.lazyWrap = lazyWrap;
	exports.msArr = msArr;
	exports.msBool = msBool;
	exports.msGet = msGet;
	exports.msGetDefaultExport = msGetDefaultExport;
	exports.msExtract = msExtract;
	exports.msGetModule = msGetModule;
	exports.msLazy = msLazy;
	exports.msLazyGet = msLazyGet;
	exports.msLazyGetModule = msLazyGetModule;
	exports.msLset = msLset;
	exports.msMap = msMap;
	exports.msSet = msSet;
	exports.msShow = msShow;
	exports.msCheckContains = msCheckContains;
	exports.msUnlazy = msUnlazy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9tcy1jYWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFNLEVBQUUsR0FBRyxVQUFBLElBQUksRUFBSTtBQUNsQixRQUFNLENBQUMsR0FBRyxtQkFIRixNQUFNLEVBR0csSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzVCLFNBQU87cUNBQUksSUFBSTtBQUFKLFFBQUk7OztVQUFLLGtCQUxaLGNBQWMsRUFLYSxDQUFDLEVBQUUsSUFBSSxDQUFDO0dBQUEsQ0FBQTtFQUMzQyxDQUFBO0FBQ00sT0FDTixJQUFJLEdBQUcsa0JBUmlCLFVBQVUsRUFRaEIsS0FBSyxDQUFDO09BQ3hCLFFBQVEsR0FBRyxVQUFBLEtBQUs7U0FBSSxNQUFNLENBQUMsbUJBUlgsS0FBSyxFQVFZLEtBQUssQ0FBQyxDQUFDO0VBQUE7T0FDeEMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDbkIsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDO09BQzNDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO09BQ3pCLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO09BQzdCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLFNBQVMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO09BQzFCLGVBQWUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO09BQ3JDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLGVBQWUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO09BQ3JDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUE7U0FoQnZCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7U0FDUixLQUFLLEdBQUwsS0FBSztTQUNMLE1BQU0sR0FBTixNQUFNO1NBQ04sS0FBSyxHQUFMLEtBQUs7U0FDTCxrQkFBa0IsR0FBbEIsa0JBQWtCO1NBQ2xCLFNBQVMsR0FBVCxTQUFTO1NBQ1QsV0FBVyxHQUFYLFdBQVc7U0FDWCxNQUFNLEdBQU4sTUFBTTtTQUNOLFNBQVMsR0FBVCxTQUFTO1NBQ1QsZUFBZSxHQUFmLGVBQWU7U0FDZixNQUFNLEdBQU4sTUFBTTtTQUNOLEtBQUssR0FBTCxLQUFLO1NBQ0wsS0FBSyxHQUFMLEtBQUs7U0FDTCxNQUFNLEdBQU4sTUFBTTtTQUNOLGVBQWUsR0FBZixlQUFlO1NBQ2YsUUFBUSxHQUFSLFFBQVEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdHJhbnNwaWxlL21zLWNhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxsRXhwcmVzc2lvbiwgSWRlbnRpZmllciB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IHsgbWVtYmVyLCB0aHVuayB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcblxuY29uc3QgbXMgPSBuYW1lID0+IHtcblx0Y29uc3QgbSA9IG1lbWJlcihJZE1zLCBuYW1lKVxuXHRyZXR1cm4gKC4uLmFyZ3MpID0+IENhbGxFeHByZXNzaW9uKG0sIGFyZ3MpXG59XG5leHBvcnQgY29uc3Rcblx0SWRNcyA9IElkZW50aWZpZXIoJ19tcycpLFxuXHRsYXp5V3JhcCA9IHZhbHVlID0+IG1zTGF6eSh0aHVuayh2YWx1ZSkpLFxuXHRtc0FyciA9IG1zKCdhcnInKSxcblx0bXNCb29sID0gbXMoJ2Jvb2wnKSxcblx0bXNHZXQgPSBtcygnZ2V0JyksXG5cdG1zR2V0RGVmYXVsdEV4cG9ydCA9IG1zKCdnZXREZWZhdWx0RXhwb3J0JyksXG5cdG1zRXh0cmFjdCA9IG1zKCdleHRyYWN0JyksXG5cdG1zR2V0TW9kdWxlID0gbXMoJ2dldE1vZHVsZScpLFxuXHRtc0xhenkgPSBtcygnbGF6eScpLFxuXHRtc0xhenlHZXQgPSBtcygnbGF6eVByb3AnKSxcblx0bXNMYXp5R2V0TW9kdWxlID0gbXMoJ2xhenlHZXRNb2R1bGUnKSxcblx0bXNMc2V0ID0gbXMoJ2xzZXQnKSxcblx0bXNNYXAgPSBtcygnbWFwJyksXG5cdG1zU2V0ID0gbXMoJ3NldCcpLFxuXHRtc1Nob3cgPSBtcygnc2hvdycpLFxuXHRtc0NoZWNrQ29udGFpbnMgPSBtcygnY2hlY2tDb250YWlucycpLFxuXHRtc1VubGF6eSA9IG1zKCd1bmxhenknKVxuXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==