"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./private/js-impl", "./Try" ], function(exports, js_45impl_0, Try_1) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(js_45impl_0), iAnd = _ms.get(_$2, "iAnd"), iOr = _ms.get(_$2, "iOr"), _$4 = _ms.lazyGetModule(Try_1), oh_45no_33 = _ms.lazyProp(_$4, "oh-no!");
		const exports = { };
		const Bool = function() {
			const doc = "JavaScript's native Boolean type.\nEither true or false.";
			return _ms.set(Boolean, "doc", doc, "displayName", "Bool")
		}();
		const not = exports.not = function() {
			const doc = "Negation of a Bool.";
			const test = function() {
				const _k0 = [ false ], _v0 = true;
				const _k1 = [ true ], _v1 = false;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_) {
				_ms.checkContains(Bool, _, "_");
				return function() {
					switch (true) {
						case _ms.bool(_): {
							return false
						}
						default: {
							return true
						}
					}
				}()
			}, "doc", doc, "test", test, "displayName", "not")
		}();
		const and = exports.and = function() {
			const doc = "True iff all conditions are true.\nEquivalent to `all? args`.\nAll arguments after the first may be lazy.\"";
			const test = function() {
				const _k0 = [ false, false ], _v0 = false;
				const _k1 = [ false, true ], _v1 = false;
				const _k2 = [ true, false ], _v2 = false;
				const _k3 = [ true, true ], _v3 = true;
				const _k4 = [ true, true, false ], _v4 = false;
				const _k5 = [ true, false, _ms.lazy(function() {
					return _ms.unlazy(oh_45no_33)()
				}) ], _v5 = false;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3, _k4, _v4, _k5, _v5)
			};
			return _ms.set(iAnd, "doc", doc, "test", test, "displayName", "and")
		}();
		const nand = exports.nand = function() {
			const doc = "Negation of and.";
			const test = function() {
				const _k0 = [ false, false ], _v0 = true;
				const _k1 = [ false, true ], _v1 = true;
				const _k2 = [ true, false ], _v2 = true;
				const _k3 = [ true, true ], _v3 = false;
				const _k4 = [ true, true, false ], _v4 = true;
				const _k5 = [ true, false, _ms.lazy(function() {
					return _ms.unlazy(oh_45no_33)()
				}) ], _v5 = true;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3, _k4, _v4, _k5, _v5)
			};
			return _ms.set(function() {
				const args = [ ].slice.call(arguments, 0);
				return not(Function.apply.call(and, null, [ ].concat(_ms.arr(args))))
			}, "doc", doc, "test", test, "displayName", "nand")
		}();
		const or = exports.or = function() {
			const doc = "True iff any condition is true.\nEquivalent to `any? args`.\nAll arguments after the first may be lazy.";
			const test = function() {
				const _k0 = [ false, false ], _v0 = false;
				const _k1 = [ false, true ], _v1 = true;
				const _k2 = [ true, false ], _v2 = true;
				const _k3 = [ true, true ], _v3 = true;
				const _k4 = [ false, false, true ], _v4 = true;
				const _k5 = [ false, true, _ms.lazy(function() {
					return _ms.unlazy(oh_45no_33)()
				}) ], _v5 = true;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3, _k4, _v4, _k5, _v5)
			};
			return _ms.set(iOr, "doc", doc, "test", test, "displayName", "or")
		}();
		const nor = exports.nor = function() {
			const doc = "Negation of or.";
			const test = function() {
				const _k0 = [ false, false ], _v0 = true;
				const _k1 = [ false, true ], _v1 = false;
				const _k2 = [ true, false ], _v2 = false;
				const _k3 = [ true, true ], _v3 = false;
				const _k4 = [ false, false, true ], _v4 = false;
				const _k5 = [ false, true, _ms.lazy(function() {
					return _ms.unlazy(oh_45no_33)()
				}) ], _v5 = false;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3, _k4, _v4, _k5, _v5)
			};
			return _ms.set(function() {
				const args = [ ].slice.call(arguments, 0);
				return not(Function.apply.call(or, null, [ ].concat(_ms.arr(args))))
			}, "doc", doc, "test", test, "displayName", "nor")
		}();
		const implies = exports.implies = function() {
			const doc = "Whether `then` is true whenever `if` is.\nAlways true when `if` is false.";
			const test = function() {
				const _k0 = [ false, false ], _v0 = true;
				const _k1 = [ false, true ], _v1 = true;
				const _k2 = [ true, false ], _v2 = false;
				const _k3 = [ true, true ], _v3 = true;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
			};
			return _ms.set(function(_if, then) {
				_ms.checkContains(Bool, _if, "if");
				return function() {
					switch (true) {
						case _ms.bool(_if): {
							return _ms.unlazy(then)
						}
						default: {
							return true
						}
					}
				}()
			}, "doc", doc, "test", test, "displayName", "implies")
		}();
		const xor = exports.xor = function() {
			const doc = "True if `a` and `b` differ.";
			const test = function() {
				const _k0 = [ false, false ], _v0 = false;
				const _k1 = [ false, true ], _v1 = true;
				const _k2 = [ true, false ], _v2 = true;
				const _k3 = [ true, true ], _v3 = false;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
			};
			return _ms.set(function(a, b) {
				_ms.checkContains(Bool, a, "a");
				_ms.checkContains(Bool, b, "b");
				return function() {
					switch (true) {
						case _ms.bool(a): {
							return not(b)
						}
						default: {
							return b
						}
					}
				}()
			}, "doc", doc, "test", test, "displayName", "xor")
		}();
		exports.default = Bool;
		const displayName = exports.displayName = "Bool";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9Cb29sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvQ0FLQTtBQUFBOztFQUFBLHdCQUFNO0FBQUEsR0FDTCxZQUNDO0FBQUEsa0JBRUQ7O0VBRUQscUNBQUk7QUFBQSxHQUNILFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFBLGVBQWE7QUFBQSxJQUNiLFlBQUEsRUFBQSxjQUFZO0FBQUE7O2tCQUNaLFNBQUEsR0FDQTtBQUFBLHNCQURFOzs7TUFFRCxjQUFBLElBQ0M7QUFBQSxjQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsY0FBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztFQUVKLHFDQUFJO0FBQUEsR0FDSCxZQUNDO0FBQUEsR0FHRCxhQUFPLFdBQ047QUFBQSxJQUFBLFlBQUEsRUFBQSxPQUFBLGVBQW1CO0FBQUEsSUFDbkIsWUFBQSxFQUFBLE9BQUEsY0FBa0I7QUFBQSxJQUNsQixZQUFBLEVBQUEsTUFBQSxlQUFrQjtBQUFBLElBQ2xCLFlBQUEsRUFBQSxNQUFBLGNBQWlCO0FBQUEsSUFDakIsWUFBQSxFQUFBLE1BQUEsTUFBQSxlQUF1QjtBQUFBLElBRXZCLFlBQUEsRUFBQSxNQUFBOztnQkFBOEI7QUFBQTs7a0JBQy9COztFQUVELHVDQUFLO0FBQUEsR0FDSixZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSxJQUFBLFlBQUEsRUFBQSxPQUFBLGVBQW1CO0FBQUEsSUFDbkIsWUFBQSxFQUFBLE9BQUEsY0FBa0I7QUFBQSxJQUNsQixZQUFBLEVBQUEsTUFBQSxlQUFrQjtBQUFBLElBQ2xCLFlBQUEsRUFBQSxNQUFBLGNBQWlCO0FBQUEsSUFDakIsWUFBQSxFQUFBLE1BQUEsTUFBQSxlQUF1QjtBQUFBLElBRXZCLFlBQUEsRUFBQSxNQUFBOztnQkFBOEI7QUFBQTs7a0JBQzlCLFdBQ0E7QUFBQTtXQUFBLHdCQUFJLDhCQUFLO0FBQUE7O0VBRVgsbUNBQUc7QUFBQSxHQUNGLFlBQ0M7QUFBQSxHQUdELGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFBLE9BQUEsZUFBbUI7QUFBQSxJQUNuQixZQUFBLEVBQUEsT0FBQSxjQUFrQjtBQUFBLElBQ2xCLFlBQUEsRUFBQSxNQUFBLGVBQWtCO0FBQUEsSUFDbEIsWUFBQSxFQUFBLE1BQUEsY0FBaUI7QUFBQSxJQUNqQixZQUFBLEVBQUEsT0FBQSxPQUFBLGNBQXdCO0FBQUEsSUFFeEIsWUFBQSxFQUFBLE9BQUE7O2dCQUE4QjtBQUFBOztrQkFDL0I7O0VBRUQscUNBQUk7QUFBQSxHQUNILFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFBLE9BQUEsZUFBbUI7QUFBQSxJQUNuQixZQUFBLEVBQUEsT0FBQSxjQUFrQjtBQUFBLElBQ2xCLFlBQUEsRUFBQSxNQUFBLGVBQWtCO0FBQUEsSUFDbEIsWUFBQSxFQUFBLE1BQUEsY0FBaUI7QUFBQSxJQUNqQixZQUFBLEVBQUEsT0FBQSxPQUFBLGNBQXdCO0FBQUEsSUFFeEIsWUFBQSxFQUFBLE9BQUE7O2dCQUE4QjtBQUFBOztrQkFDOUIsV0FDQTtBQUFBO1dBQUEsd0JBQUksNkJBQUk7QUFBQTs7RUFFViw2Q0FBUTtBQUFBLEdBQ1AsWUFDQztBQUFBLEdBRUQsYUFBTyxXQUNOO0FBQUEsSUFBQSxZQUFBLEVBQUEsT0FBQSxlQUFtQjtBQUFBLElBQ25CLFlBQUEsRUFBQSxPQUFBLGNBQWtCO0FBQUEsSUFDbEIsWUFBQSxFQUFBLE1BQUEsZUFBa0I7QUFBQSxJQUNsQixZQUFBLEVBQUEsTUFBQSxjQUFpQjtBQUFBOztrQkFDakIsU0FBQSxLQUFRLE1BQ1I7QUFBQSxzQkFERzs7O01BRUYsY0FBQSxNQUNDO0FBQUEseUJBSE07QUFBQTtBQUFBLGVBS047QUFBQSxjQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0VBRUoscUNBQUk7QUFBQSxHQUNILFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFBLE9BQUEsZUFBbUI7QUFBQSxJQUNuQixZQUFBLEVBQUEsT0FBQSxjQUFrQjtBQUFBLElBQ2xCLFlBQUEsRUFBQSxNQUFBLGVBQWtCO0FBQUEsSUFDbEIsWUFBQSxFQUFBLE1BQUEsY0FBaUI7QUFBQTs7a0JBQ2pCLFNBQUEsR0FBTyxHQUNQO0FBQUEsc0JBREU7c0JBQU87OztNQUVSLGNBQUEsSUFDQztBQUFBLGNBQUEsSUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLGNBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7b0JBRUo7QUFBQSxFQTdHQSwwQ0FBQTtBQUFBIiwiZmlsZSI6IkJvb2wuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==