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
	      msAddMany = ms('addMany'),
	      msArr = ms('arr'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS9tcy1jYWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFNLEVBQUUsR0FBRyxVQUFBLElBQUksRUFBSTtBQUNsQixRQUFNLENBQUMsR0FBRyxtQkFIRixNQUFNLEVBR0csSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzVCLFNBQU87cUNBQUksSUFBSTtBQUFKLFFBQUk7OztVQUFLLGtCQUxaLGNBQWMsRUFLYSxDQUFDLEVBQUUsSUFBSSxDQUFDO0dBQUEsQ0FBQTtFQUMzQyxDQUFBO0FBQ00sT0FDTixJQUFJLEdBQUcsa0JBUmlCLFVBQVUsRUFRaEIsS0FBSyxDQUFDO09BQ3hCLFFBQVEsR0FBRyxVQUFBLEtBQUs7U0FBSSxNQUFNLENBQUMsbUJBUlgsS0FBSyxFQVFZLEtBQUssQ0FBQyxDQUFDO0VBQUE7T0FDeEMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7T0FDekIsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7T0FDckIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDbkIsZUFBZSxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7T0FDckMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7T0FDckIsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDakIsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDO09BQzNDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO09BQ3pCLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO09BQzdCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLFNBQVMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO09BQzFCLGVBQWUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO09BQ3JDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2pCLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO09BQ3pCLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO09BQ3pCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO09BQ3ZCLE1BQU0sR0FBRyxtQkE5QkQsTUFBTSxFQThCRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7U0F2QjdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7U0FDUixLQUFLLEdBQUwsS0FBSztTQUNMLFNBQVMsR0FBVCxTQUFTO1NBQ1QsS0FBSyxHQUFMLEtBQUs7U0FDTCxPQUFPLEdBQVAsT0FBTztTQUNQLE1BQU0sR0FBTixNQUFNO1NBQ04sZUFBZSxHQUFmLGVBQWU7U0FDZixPQUFPLEdBQVAsT0FBTztTQUNQLEtBQUssR0FBTCxLQUFLO1NBQ0wsa0JBQWtCLEdBQWxCLGtCQUFrQjtTQUNsQixTQUFTLEdBQVQsU0FBUztTQUNULFdBQVcsR0FBWCxXQUFXO1NBQ1gsTUFBTSxHQUFOLE1BQU07U0FDTixTQUFTLEdBQVQsU0FBUztTQUNULGVBQWUsR0FBZixlQUFlO1NBQ2YsS0FBSyxHQUFMLEtBQUs7U0FDTCxLQUFLLEdBQUwsS0FBSztTQUNMLFNBQVMsR0FBVCxTQUFTO1NBQ1QsU0FBUyxHQUFULFNBQVM7U0FDVCxNQUFNLEdBQU4sTUFBTTtTQUNOLE1BQU0sR0FBTixNQUFNO1NBQ04sUUFBUSxHQUFSLFFBQVE7U0FDUixNQUFNLEdBQU4sTUFBTSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvbXMtY2FsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGxFeHByZXNzaW9uLCBJZGVudGlmaWVyIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBtZW1iZXIsIHRodW5rIH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuXG5jb25zdCBtcyA9IG5hbWUgPT4ge1xuXHRjb25zdCBtID0gbWVtYmVyKElkTXMsIG5hbWUpXG5cdHJldHVybiAoLi4uYXJncykgPT4gQ2FsbEV4cHJlc3Npb24obSwgYXJncylcbn1cbmV4cG9ydCBjb25zdFxuXHRJZE1zID0gSWRlbnRpZmllcignX21zJyksXG5cdGxhenlXcmFwID0gdmFsdWUgPT4gbXNMYXp5KHRodW5rKHZhbHVlKSksXG5cdG1zQWRkID0gbXMoJ2FkZCcpLFxuXHRtc0FkZE1hbnkgPSBtcygnYWRkTWFueScpLFxuXHRtc0FyciA9IG1zKCdhcnInKSxcblx0bXNBc3NvYyA9IG1zKCdhc3NvYycpLFxuXHRtc0Jvb2wgPSBtcygnYm9vbCcpLFxuXHRtc0NoZWNrQ29udGFpbnMgPSBtcygnY2hlY2tDb250YWlucycpLFxuXHRtc0Vycm9yID0gbXMoJ2Vycm9yJyksXG5cdG1zR2V0ID0gbXMoJ2dldCcpLFxuXHRtc0dldERlZmF1bHRFeHBvcnQgPSBtcygnZ2V0RGVmYXVsdEV4cG9ydCcpLFxuXHRtc0V4dHJhY3QgPSBtcygnZXh0cmFjdCcpLFxuXHRtc0dldE1vZHVsZSA9IG1zKCdnZXRNb2R1bGUnKSxcblx0bXNMYXp5ID0gbXMoJ2xhenknKSxcblx0bXNMYXp5R2V0ID0gbXMoJ2xhenlQcm9wJyksXG5cdG1zTGF6eUdldE1vZHVsZSA9IG1zKCdsYXp5R2V0TW9kdWxlJyksXG5cdG1zTWFwID0gbXMoJ21hcCcpLFxuXHRtc1NldCA9IG1zKCdzZXQnKSxcblx0bXNTZXROYW1lID0gbXMoJ3NldE5hbWUnKSxcblx0bXNTZXRMYXp5ID0gbXMoJ3NldExhenknKSxcblx0bXNTaG93ID0gbXMoJ3Nob3cnKSxcblx0bXNTb21lID0gbXMoJ3NvbWUnKSxcblx0bXNVbmxhenkgPSBtcygndW5sYXp5JyksXG5cdE1zTm9uZSA9IG1lbWJlcihJZE1zLCAnTm9uZScpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==