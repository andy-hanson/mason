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
	      msAdd = ms('add'),
	      msArr = ms('arr'),
	      msAssoc = ms('assoc'),
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
	exports.msAdd = msAdd;
	exports.msArr = msArr;
	exports.msAssoc = msAssoc;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9tcy1jYWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFNLEVBQUUsR0FBRyxVQUFBLElBQUksRUFBSTtBQUNsQixRQUFNLENBQUMsR0FBRyxtQkFIRixNQUFNLEVBR0csSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzVCLFNBQU87cUNBQUksSUFBSTtBQUFKLFFBQUk7OztVQUFLLGtCQUxaLGNBQWMsRUFLYSxDQUFDLEVBQUUsSUFBSSxDQUFDO0dBQUEsQ0FBQTtFQUMzQyxDQUFBO0FBQ00sT0FDTixJQUFJLEdBQUcsa0JBUmlCLFVBQVUsRUFRaEIsS0FBSyxDQUFDO09BQ3hCLFFBQVEsR0FBRyxVQUFBLEtBQUs7U0FBSSxNQUFNLENBQUMsbUJBUlgsS0FBSyxFQVFZLEtBQUssQ0FBQyxDQUFDO0VBQUE7T0FDeEMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7T0FDckIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDbkIsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDO09BQzNDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO09BQ3pCLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO09BQzdCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLFNBQVMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO09BQzFCLGVBQWUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO09BQ3JDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLGVBQWUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO09BQ3JDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUE7U0FsQnZCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7U0FDUixLQUFLLEdBQUwsS0FBSztTQUNMLEtBQUssR0FBTCxLQUFLO1NBQ0wsT0FBTyxHQUFQLE9BQU87U0FDUCxNQUFNLEdBQU4sTUFBTTtTQUNOLEtBQUssR0FBTCxLQUFLO1NBQ0wsa0JBQWtCLEdBQWxCLGtCQUFrQjtTQUNsQixTQUFTLEdBQVQsU0FBUztTQUNULFdBQVcsR0FBWCxXQUFXO1NBQ1gsTUFBTSxHQUFOLE1BQU07U0FDTixTQUFTLEdBQVQsU0FBUztTQUNULGVBQWUsR0FBZixlQUFlO1NBQ2YsTUFBTSxHQUFOLE1BQU07U0FDTixLQUFLLEdBQUwsS0FBSztTQUNMLEtBQUssR0FBTCxLQUFLO1NBQ0wsTUFBTSxHQUFOLE1BQU07U0FDTixlQUFlLEdBQWYsZUFBZTtTQUNmLFFBQVEsR0FBUixRQUFRIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9tcy1jYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsbEV4cHJlc3Npb24sIElkZW50aWZpZXIgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IG1lbWJlciwgdGh1bmsgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5cbmNvbnN0IG1zID0gbmFtZSA9PiB7XG5cdGNvbnN0IG0gPSBtZW1iZXIoSWRNcywgbmFtZSlcblx0cmV0dXJuICguLi5hcmdzKSA9PiBDYWxsRXhwcmVzc2lvbihtLCBhcmdzKVxufVxuZXhwb3J0IGNvbnN0XG5cdElkTXMgPSBJZGVudGlmaWVyKCdfbXMnKSxcblx0bGF6eVdyYXAgPSB2YWx1ZSA9PiBtc0xhenkodGh1bmsodmFsdWUpKSxcblx0bXNBZGQgPSBtcygnYWRkJyksXG5cdG1zQXJyID0gbXMoJ2FycicpLFxuXHRtc0Fzc29jID0gbXMoJ2Fzc29jJyksXG5cdG1zQm9vbCA9IG1zKCdib29sJyksXG5cdG1zR2V0ID0gbXMoJ2dldCcpLFxuXHRtc0dldERlZmF1bHRFeHBvcnQgPSBtcygnZ2V0RGVmYXVsdEV4cG9ydCcpLFxuXHRtc0V4dHJhY3QgPSBtcygnZXh0cmFjdCcpLFxuXHRtc0dldE1vZHVsZSA9IG1zKCdnZXRNb2R1bGUnKSxcblx0bXNMYXp5ID0gbXMoJ2xhenknKSxcblx0bXNMYXp5R2V0ID0gbXMoJ2xhenlQcm9wJyksXG5cdG1zTGF6eUdldE1vZHVsZSA9IG1zKCdsYXp5R2V0TW9kdWxlJyksXG5cdG1zTHNldCA9IG1zKCdsc2V0JyksXG5cdG1zTWFwID0gbXMoJ21hcCcpLFxuXHRtc1NldCA9IG1zKCdzZXQnKSxcblx0bXNTaG93ID0gbXMoJ3Nob3cnKSxcblx0bXNDaGVja0NvbnRhaW5zID0gbXMoJ2NoZWNrQ29udGFpbnMnKSxcblx0bXNVbmxhenkgPSBtcygndW5sYXp5JylcblxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=