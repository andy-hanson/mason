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
	      msIterator = ms('iterator'),
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
	exports.msIterator = msIterator;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9tcy1jYWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFNLEVBQUUsR0FBRyxVQUFBLElBQUksRUFBSTtBQUNsQixRQUFNLENBQUMsR0FBRyxtQkFIRixNQUFNLEVBR0csSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzVCLFNBQU87cUNBQUksSUFBSTtBQUFKLFFBQUk7OztVQUFLLGtCQUxaLGNBQWMsRUFLYSxDQUFDLEVBQUUsSUFBSSxDQUFDO0dBQUEsQ0FBQTtFQUMzQyxDQUFBO0FBQ00sT0FDTixJQUFJLEdBQUcsa0JBUmlCLFVBQVUsRUFRaEIsS0FBSyxDQUFDO09BQ3hCLFFBQVEsR0FBRyxVQUFBLEtBQUs7U0FBSSxNQUFNLENBQUMsbUJBUlgsS0FBSyxFQVFZLEtBQUssQ0FBQyxDQUFDO0VBQUE7T0FDeEMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDbkIsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDO09BQzNDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO09BQ3pCLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO09BQzdCLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO09BQzNCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLFNBQVMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO09BQzFCLGVBQWUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO09BQ3JDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLGVBQWUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO09BQ3JDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUE7U0FqQnZCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7U0FDUixLQUFLLEdBQUwsS0FBSztTQUNMLE1BQU0sR0FBTixNQUFNO1NBQ04sS0FBSyxHQUFMLEtBQUs7U0FDTCxrQkFBa0IsR0FBbEIsa0JBQWtCO1NBQ2xCLFNBQVMsR0FBVCxTQUFTO1NBQ1QsV0FBVyxHQUFYLFdBQVc7U0FDWCxVQUFVLEdBQVYsVUFBVTtTQUNWLE1BQU0sR0FBTixNQUFNO1NBQ04sU0FBUyxHQUFULFNBQVM7U0FDVCxlQUFlLEdBQWYsZUFBZTtTQUNmLE1BQU0sR0FBTixNQUFNO1NBQ04sS0FBSyxHQUFMLEtBQUs7U0FDTCxLQUFLLEdBQUwsS0FBSztTQUNMLE1BQU0sR0FBTixNQUFNO1NBQ04sZUFBZSxHQUFmLGVBQWU7U0FDZixRQUFRLEdBQVIsUUFBUSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvbXMtY2FsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGxFeHByZXNzaW9uLCBJZGVudGlmaWVyIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBtZW1iZXIsIHRodW5rIH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuXG5jb25zdCBtcyA9IG5hbWUgPT4ge1xuXHRjb25zdCBtID0gbWVtYmVyKElkTXMsIG5hbWUpXG5cdHJldHVybiAoLi4uYXJncykgPT4gQ2FsbEV4cHJlc3Npb24obSwgYXJncylcbn1cbmV4cG9ydCBjb25zdFxuXHRJZE1zID0gSWRlbnRpZmllcignX21zJyksXG5cdGxhenlXcmFwID0gdmFsdWUgPT4gbXNMYXp5KHRodW5rKHZhbHVlKSksXG5cdG1zQXJyID0gbXMoJ2FycicpLFxuXHRtc0Jvb2wgPSBtcygnYm9vbCcpLFxuXHRtc0dldCA9IG1zKCdnZXQnKSxcblx0bXNHZXREZWZhdWx0RXhwb3J0ID0gbXMoJ2dldERlZmF1bHRFeHBvcnQnKSxcblx0bXNFeHRyYWN0ID0gbXMoJ2V4dHJhY3QnKSxcblx0bXNHZXRNb2R1bGUgPSBtcygnZ2V0TW9kdWxlJyksXG5cdG1zSXRlcmF0b3IgPSBtcygnaXRlcmF0b3InKSxcblx0bXNMYXp5ID0gbXMoJ2xhenknKSxcblx0bXNMYXp5R2V0ID0gbXMoJ2xhenlQcm9wJyksXG5cdG1zTGF6eUdldE1vZHVsZSA9IG1zKCdsYXp5R2V0TW9kdWxlJyksXG5cdG1zTHNldCA9IG1zKCdsc2V0JyksXG5cdG1zTWFwID0gbXMoJ21hcCcpLFxuXHRtc1NldCA9IG1zKCdzZXQnKSxcblx0bXNTaG93ID0gbXMoJ3Nob3cnKSxcblx0bXNDaGVja0NvbnRhaW5zID0gbXMoJ2NoZWNrQ29udGFpbnMnKSxcblx0bXNVbmxhenkgPSBtcygndW5sYXp5JylcblxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=