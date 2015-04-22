"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./methods", "./Num", "../bang", "./Num" ], function(exports, methods_0, Num_1, _33_2, Num_3) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(methods_0), _42 = _ms.get(_$2, "*"), _47 = _ms.get(_$2, "/"), Num = _ms.getDefaultExport(Num_1), _$5 = _ms.lazyGetModule(_33_2), _33call_45with = _ms.lazyProp(_$5, "!call-with"), _$6 = _ms.lazyGetModule(Num_3), near_63 = _ms.lazyProp(_$6, "near?");
		const exports = { };
		const doc = exports.doc = "For dealing with angles. By default angles are in radians.";
		const pi = exports.pi = Math.PI;
		const pi_472 = exports["pi/2"] = _47(pi, 2);
		const pi3_472 = exports["pi3/2"] = _42(pi, 1.5);
		const pi_422 = exports["pi*2"] = _42(pi, 2);
		const sin = exports.sin = function() {
			const doc = "Y-value of the point on the unit circle this many radians counter-clockwise from +x.";
			const test = function() {
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63), sin, function() {
					const _k0 = [ 0 ], _v0 = 0;
					const _k1 = [ pi_472 ], _v1 = 1;
					const _k2 = [ pi ], _v2 = 0;
					const _k3 = [ pi3_472 ], _v3 = - 1;
					return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
				}())
			};
			return _ms.set(function(radian_45angle) {
				_ms.checkContains(Num, radian_45angle, "radian-angle");
				return Math.sin(radian_45angle)
			}, "doc", doc, "test", test, "displayName", "sin")
		}();
		const cos = exports.cos = function() {
			const doc = "X-value of the point on the unit circle this many radians counter-clockwise from +x.";
			const test = function() {
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63), cos, function() {
					const _k0 = [ 0 ], _v0 = 1;
					const _k1 = [ pi_472 ], _v1 = 0;
					const _k2 = [ pi ], _v2 = - 1;
					const _k3 = [ pi3_472 ], _v3 = 0;
					return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
				}())
			};
			return _ms.set(function(radian_45angle) {
				_ms.checkContains(Num, radian_45angle, "radian-angle");
				return Math.cos(radian_45angle)
			}, "doc", doc, "test", test, "displayName", "cos")
		}();
		const tan = exports.tan = function() {
			const doc = "`/ sin cos`";
			const test = function() {
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63), tan, function() {
					const _k0 = [ 0 ], _v0 = 0;
					const _k1 = [ pi ], _v1 = 0;
					return _ms.map(_k0, _v0, _k1, _v1)
				}())
			};
			return _ms.set(function(_) {
				_ms.checkContains(Num, _, "_");
				return Math.tan(_)
			}, "doc", doc, "test", test, "displayName", "tan")
		}();
		const acos = exports.acos = function() {
			const doc = "`cos res` should be `n`.";
			const test = function() {
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63), acos, function() {
					const _k0 = [ 0 ], _v0 = pi_472;
					const _k1 = [ 0.5 ], _v1 = _47(pi, 3);
					const _k2 = [ 1 ], _v2 = 0;
					return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
				}())
			};
			return _ms.set(function(n) {
				_ms.checkContains(Num, n, "n");
				return Math.acos(n)
			}, "doc", doc, "test", test, "displayName", "acos")
		}();
		const asin = exports.asin = function() {
			const doc = "`sin res` should be `n`.";
			const test = function() {
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63), asin, function() {
					const _k0 = [ 0 ], _v0 = 0;
					const _k1 = [ 0.5 ], _v1 = _47(pi, 6);
					const _k2 = [ 1 ], _v2 = pi_472;
					return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
				}())
			};
			return _ms.set(function(n) {
				_ms.checkContains(Num, n, "n");
				return Math.asin(n)
			}, "doc", doc, "test", test, "displayName", "asin")
		}();
		const atan = exports.atan = function() {
			const doc = "`tan res` should be `n`.";
			const test = function() {
				return _ms.unlazy(_33call_45with)(_ms.unlazy(near_63), atan, function() {
					const _k0 = [ 0 ], _v0 = 0;
					return _ms.map(_k0, _v0)
				}())
			};
			return _ms.set(function(n) {
				_ms.checkContains(Num, n, "n");
				return Math.atan(n)
			}, "doc", doc, "test", test, "displayName", "atan")
		}();
		const degrees_45to_45radians_45factor = exports["degrees-to-radians-factor"] = _47(pi, 180);
		const degrees_45to_45radians = exports["degrees-to-radians"] = function() {
			const doc = "Converts an angle in degrees to one in radians.";
			const test = function() {
				const _k0 = [ 180 ], _v0 = pi;
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(degrees) {
				_ms.checkContains(Num, degrees, "degrees");
				return _42(degrees, degrees_45to_45radians_45factor)
			}, "doc", doc, "test", test, "displayName", "degrees-to-radians")
		}();
		const radians_45to_45degrees_45factor = exports["radians-to-degrees-factor"] = _47(180, pi);
		const radians_45to_45degrees = exports["radians-to-degrees"] = function() {
			const doc = "Converts an angle in radians to one in degrees.";
			const test = function() {
				const _k0 = [ pi ], _v0 = 180;
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(radians) {
				_ms.checkContains(Num, radians, "radians");
				return _42(radians, radians_45to_45degrees_45factor)
			}, "doc", doc, "test", test, "displayName", "radians-to-degrees")
		}();
		const displayName = exports.displayName = "trig";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL3RyaWcubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQU9BO0FBQUE7O0VBQUEsMEJBQU07QUFBQSxFQUVOLHdCQUFJO0VBQ0osaUNBQU0sSUFBQSxJQUFLO0FBQUEsRUFDWCxtQ0FBTyxJQUFBLElBQUs7QUFBQSxFQUNaLGlDQUFNLElBQUEsSUFBSztBQUFBLEVBRVgscUNBQUk7QUFBQSxHQUNILFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLDJEQUFBLGdCQUFvQjtBQUFBLEtBQ25CLFlBQUEsRUFBRSxXQUFPO0FBQUEsS0FDVCxZQUFBLEVBQUEsZ0JBQVk7QUFBQSxLQUNaLFlBQUEsRUFBQSxZQUFVO0FBQUEsS0FDVixZQUFBLEVBQUEsaUJBQWE7Ozs7a0JBQ2QsU0FBQSxnQkFDQTtBQUFBLHNCQURhO1dBQ2IsU0FBQTtBQUFBOztFQUVGLHFDQUFJO0FBQUEsR0FDSCxZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSwyREFBQSxnQkFBb0I7QUFBQSxLQUNuQixZQUFBLEVBQUUsV0FBTztBQUFBLEtBQ1QsWUFBQSxFQUFBLGdCQUFZO0FBQUEsS0FDWixZQUFBLEVBQUEsWUFBVTtLQUNWLFlBQUEsRUFBQSxpQkFBYTtBQUFBOzs7a0JBQ2QsU0FBQSxnQkFDQTtBQUFBLHNCQURhO1dBQ2IsU0FBQTtBQUFBOztFQUVGLHFDQUFJO0FBQUEsR0FDSCxZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSwyREFBQSxnQkFBb0I7QUFBQSxLQUNuQixZQUFBLEVBQUUsV0FBTztBQUFBLEtBQ1QsWUFBQSxFQUFBLFlBQVU7QUFBQTs7O2tCQUNYLFNBQUEsR0FDQTtBQUFBLHNCQURFO1dBQ0YsU0FBUztBQUFBOztFQUVYLHVDQUFLO0FBQUEsR0FDSixZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSwyREFBQSxpQkFBcUI7QUFBQSxLQUNwQixZQUFBLEVBQUUsV0FBTztBQUFBLEtBQ1QsWUFBQSxFQUFFLGFBQVMsSUFBQSxJQUFLO0FBQUEsS0FDaEIsWUFBQSxFQUFFLFdBQU87QUFBQTs7O2tCQUNWLFNBQUEsR0FDQTtBQUFBLHNCQURFO1dBQ0YsVUFBQTtBQUFBOztFQUVGLHVDQUFLO0FBQUEsR0FDSixZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSwyREFBQSxpQkFBcUI7QUFBQSxLQUNwQixZQUFBLEVBQUUsV0FBTztBQUFBLEtBQ1QsWUFBQSxFQUFFLGFBQVMsSUFBQSxJQUFLO0FBQUEsS0FDaEIsWUFBQSxFQUFFLFdBQU87QUFBQTs7O2tCQUNWLFNBQUEsR0FDQTtBQUFBLHNCQURFO1dBQ0YsVUFBQTtBQUFBOztFQUVGLHVDQUFLO0FBQUEsR0FDSixZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSwyREFBQSxpQkFBcUI7QUFBQSxLQUNwQixZQUFBLEVBQUUsV0FBTztBQUFBOzs7a0JBQ1YsU0FBQSxHQUNBO0FBQUEsc0JBREU7V0FDRixVQUFBO0FBQUE7O0VBR0QsK0VBQTJCLElBQUEsSUFBSztBQUFBLEVBQ2hDLDBFQUFtQjtBQUFBLEdBQ2xCLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLGFBQVM7QUFBQTs7a0JBQ1gsU0FBQSxTQUNBO0FBQUEsc0JBRFE7V0FDUixJQUFBLFNBQUE7QUFBQTs7RUFFRiwrRUFBMkIsSUFBRSxLQUFGO0FBQUEsRUFDM0IsMEVBQW1CO0FBQUEsR0FDbEIsWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsSUFBQSxZQUFBLEVBQUEsWUFBVTtBQUFBOztrQkFDVixTQUFBLFNBQ0E7QUFBQSxzQkFEUTtXQUNSLElBQUEsU0FBQTtBQUFBOztFQXhGSCwwQ0FBQTtBQUFBIiwiZmlsZSI6Im1hdGgvdHJpZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9