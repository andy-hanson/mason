"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./at/at", "./at/at-Type", "./at/Map/Weak-Id-Mapbang", "./Bool", "./Fun", "./js", "./math/bit-arithmetic", "./math/Num", "./math/methods", "./Obj", "./Str", "./Type/Method", "./bang", "./compare" ], function(exports, _64_0, _64_45Type_1, Weak_45Id_45Map_33_2, Bool_3, Fun_4, js_5, bit_45arithmetic_6, Num_7, methods_8, Obj_9, Str_10, Method_11, _33_12, compare_13) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(_64_0), empty_63 = _ms.get(_$2, "empty?"), fold = _ms.get(_$2, "fold"), map = _ms.get(_$2, "map"), _$3 = _ms.getModule(_64_45Type_1), empty = _ms.get(_$3, "empty"), Weak_45Id_45Map_33 = _ms.getDefaultExport(Weak_45Id_45Map_33_2), Bool = _ms.getDefaultExport(Bool_3), Fun = _ms.getDefaultExport(Fun_4), _$7 = _ms.getModule(js_5), id_61_63 = _ms.get(_$7, "id=?"), _$8 = _ms.getModule(bit_45arithmetic_6), bit_45and = _ms.get(_$8, "bit-and"), hexidecimal = _ms.get(_$8, "hexidecimal"), Num = _ms.getDefaultExport(Num_7), _$9 = _ms.getModule(Num_7), Int = _ms.get(_$9, "Int"), round_45towards_450 = _ms.get(_$9, "round-towards-0"), _$10 = _ms.getModule(methods_8), _43 = _ms.get(_$10, "+"), _42 = _ms.get(_$10, "*"), _$11 = _ms.getModule(Obj_9), p = _ms.get(_$11, "p"), _63p = _ms.get(_$11, "?p"), _64p_45all = _ms.get(_$11, "@p-all"), Str = _ms.getDefaultExport(Str_10), Method = _ms.getDefaultExport(Method_11), _$13 = _ms.getModule(Method_11), impl_33 = _ms.get(_$13, "impl!"), impl_45for = _ms.get(_$13, "impl-for"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_12)
		}), _$15 = _ms.lazyGetModule(_33_12), _33not = _ms.lazyProp(_$15, "!not"), _$16 = _ms.lazyGetModule(compare_13), _61_63 = _ms.lazyProp(_$16, "=?");
		const exports = { };
		const max_45hash_45code = hexidecimal("7fffffff");
		const keep_45small = function(_) {
			return bit_45and(_, max_45hash_45code)
		};
		const hashes = empty(Weak_45Id_45Map_33);
		const hash_45code = Method(function() {
			const doc = function(_) {
				return _ms.checkContains(Int, "Integer used to identify a value in a Hash-Map! (or Hash-Set!).\nThis should have a high probability of being different than the hash-codes of the other values in the map.", "res")
			};
			const test = function() {
				const a = function() {
					const x = 1;
					const y = 2;
					return {
						x: x,
						y: y,
						displayName: "a"
					}
				}();
				const b = function() {
					const x = 1;
					const y = 1;
					return {
						x: x,
						y: y,
						displayName: "b"
					}
				}();
				_ms.unlazy(_33)(_ms.unlazy(_61_63), hash_45code(a), hash_45code(a));
				return _ms.unlazy(_33not)(_ms.unlazy(_61_63), hash_45code(a), hash_45code(b))
			};
			const _default = function(_) {
				return _ms.checkContains(Int, function() {
					switch (true) {
						case _ms.bool(id_61_63(_, null)): {
							return 108
						}
						case _ms.bool(id_61_63(_, undefined)): {
							return 109
						}
						case _ms.bool(hashes.has(_)): {
							return hashes.get(_)
						}
						case _ms.bool(_ms.contains(Fun, _)): {
							return impl_45for(hash_45code, Fun)(_)
						}
						default: {
							hashes.set(_, 17);
							const vals = map(_64p_45all(_), function(name) {
								return p(_, name)
							});
							const hash = fold(vals, 17, function(acc, val) {
								const x = keep_45small(_42(acc, 23));
								return keep_45small(_43(hash_45code(val), x))
							});
							hashes.set(_, hash);
							return hash
						}
					}
				}(), "res")
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "hash-code"
			}
		}());
		impl_33(hash_45code, Bool, function(_) {
			return function() {
				switch (true) {
					case _ms.bool(_): {
						return 1
					}
					default: {
						return 0
					}
				}
			}()
		});
		impl_33(hash_45code, Fun, function(fun) {
			return hash_45code(function() {
				const _ = _63p(fun, "displayName");
				switch (true) {
					case _ms.bool(empty_63(_)): {
						return fun.toString(null)
					}
					default: {
						return _.val
					}
				}
			}())
		});
		impl_33(hash_45code, Str, function() {
			const test = function() {
				_ms.unlazy(_33)(_ms.unlazy(_61_63), hash_45code("a"), hash_45code("a"));
				return _ms.unlazy(_33not)(_ms.unlazy(_61_63), hash_45code("a"), hash_45code("b"))
			};
			return _ms.set(function(_) {
				const reducer = function(hash, ch) {
					return keep_45small(_42(31, _43(hash, ch.charCodeAt(0))))
				};
				return Array.prototype.reduce.call(_, reducer, 13)
			}, "test", test)
		}());
		impl_33(hash_45code, Symbol, function() {
			const test = function() {
				const sym = Symbol("test");
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), hash_45code(sym), hash_45code(sym))
			};
			return _ms.set(function() {
				return _ms.checkContains(Int, 42, "res")
			}, "test", test)
		}());
		impl_33(hash_45code, Num, function(_) {
			return bit_45and(round_45towards_450(_), max_45hash_45code)
		});
		exports.default = hash_45code;
		const displayName = exports.displayName = "hash-code";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQWlCQTtBQUFBOzs7O0VBQUEsMEJBQWdCLFlBQWE7QUFBQSxFQUU3QixxQkFBYyxTQUFBLEdBQ2I7QUFBQSxVQUFBLFVBQVEsR0FBUjtBQUFBO0FBQUEsRUFFRCxlQUFTLE1BQUE7QUFBQSxFQUVULG9CQUFZLGtCQUFNO0FBQUEsR0FDakIsWUFBTSxTQUFLLEdBQ1Y7QUFBQSw2QkFETSxLQUVMOztHQUNGLGFBQU8sV0FDTjtBQUFBLElBQUEscUJBQUc7QUFBQSxLQUNGLFVBQUc7QUFBQSxLQUNILFVBQUc7QUFBQSxZQUZEO0FBQUE7Ozs7O0lBR0gscUJBQUc7QUFBQSxLQUNGLFVBQUc7QUFBQSxLQUNILFVBQUc7QUFBQSxZQUZEO0FBQUE7Ozs7O3dDQUdFLFlBQUEsSUFBYyxZQUFBO0FBQUEsa0RBQ1gsWUFBQSxJQUFjLFlBQUE7QUFBQTtBQUFBLEdBR3ZCLGlCQUFVLFNBQUssR0FDZDtBQUFBLDZCQURVOztNQUVULGNBQUEsU0FBSyxHQUFFLFFBQ047QUFBQSxjQUFBO0FBQUE7QUFBQSxNQUNELGNBQUEsU0FBSyxHQUFMLGFBQ0M7QUFBQSxjQUFBO0FBQUE7QUFBQSxNQUNELGNBQUEsV0FBVyxLQUNWO0FBQUEsY0FBQSxXQUFXO0FBQUE7QUFBQSxNQUNaLDJCQUFDLEtBQUQsS0FFQztBQUFBLGNBQUEsV0FBQSxhQUFBLEtBQXlCO0FBQUE7QUFBQSxlQUd6QjtBQUFBLE9BQUEsV0FBVyxHQUFFO0FBQUEsT0FFYixhQUFPLElBQUEsV0FBSSxJQUFTLFNBQUEsTUFDbkI7QUFBQSxlQUFBLEVBQUUsR0FBRjtBQUFBO0FBQUEsT0FDRCxhQUFPLEtBQUEsTUFBVSxJQUFJLFNBQUEsS0FBSSxLQUN4QjtBQUFBLFFBQUEsVUFBSSxhQUFXLElBQUEsS0FBTztBQUFBLGVBQ3RCLGFBQVcsSUFBRyxZQUFBLE1BQUg7QUFBQTtBQUFBLE9BQ1osV0FBVyxHQUFYO0FBQUEsY0FDQTtBQUFBO0FBQUE7QUFBQTs7VUFwQ2M7QUFBQTs7Ozs7O0VBdUNsQixRQUFBLGFBQUEsTUFBc0IsU0FBQSxHQUFBO0FBQUE7O0tBQ3JCLGNBQUEsSUFDQztBQUFBLGFBQUE7QUFBQTtBQUFBLGNBRUE7QUFBQSxhQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUVGLFFBQUEsYUFBQSxLQUFxQixTQUFBLEtBRXBCO0FBQUEsVUFBQTtJQUFlLFVBQUEsS0FBQSxLQUFRO0FBQUE7S0FDdEIsY0FBQSxTQUFBLEtBQ0M7QUFBQSxhQUFBLGFBQWE7QUFBQTtBQUFBLGNBRWI7QUFBQSxhQUFBOzs7OztFQUVILFFBQUEsYUFBQSxnQkFBbUI7QUFBQSxHQUNsQixhQUFPLFdBQ047QUFBQSx3Q0FBSyxZQUFZLE1BQUksWUFBWTtBQUFBLGtEQUN6QixZQUFZLE1BQUksWUFBWTtBQUFBO0FBQUEsa0JBQ3BDLFNBQUEsR0FDQTtBQUFBLElBQUEsZ0JBQVcsU0FBQSxNQUFLLElBQ2Y7QUFBQSxZQUFBLGFBQVcsSUFBRyxJQUFHLElBQUEsTUFBUyxjQUFjO0FBQUE7QUFBQSxXQUN6Qyw0QkFBNEIsR0FBNUIsU0FBc0M7QUFBQTs7RUFFeEMsUUFBQSxhQUFBLG1CQUFzQjtBQUFBLEdBQ3JCLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBTSxPQUFRO0FBQUEsK0NBQ1QsWUFBQSxNQUFnQixZQUFBO0FBQUE7QUFBQSxrQkFDckIsV0FFQTtBQUFBLDZCQUZDLEtBRUQ7OztFQUVGLFFBQUEsYUFBQSxLQUFxQixTQUFBLEdBRXBCO0FBQUEsVUFBQSxVQUFBLG9CQUFRLElBQVI7QUFBQTtBQUFBLG9CQUVEO0FBQUEsRUFsR0EsMENBQUE7QUFBQSIsImZpbGUiOiJoYXNoLWNvZGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==