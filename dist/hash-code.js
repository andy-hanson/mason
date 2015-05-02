"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./at/at", "./at/at-Type", "./at/Map/Weak-Id-Mapbang", "./Bool", "./compare", "./Fun", "./js", "./math/bit-arithmetic", "./math/Num", "./math/methods", "./Obj", "./Str", "./Type/Method", "./bang" ], function(exports, _64_0, _64_45Type_1, Weak_45Id_45Map_33_2, Bool_3, compare_4, Fun_5, js_6, bit_45arithmetic_7, Num_8, methods_9, Obj_10, Str_11, Method_12, _33_13) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(_64_0), empty_63 = _ms.get(_$2, "empty?"), fold = _ms.get(_$2, "fold"), map = _ms.get(_$2, "map"), _$3 = _ms.getModule(_64_45Type_1), empty = _ms.get(_$3, "empty"), Weak_45Id_45Map_33 = _ms.getDefaultExport(Weak_45Id_45Map_33_2), Bool = _ms.getDefaultExport(Bool_3), _$6 = _ms.getModule(compare_4), _61_63 = _ms.get(_$6, "=?"), Fun = _ms.getDefaultExport(Fun_5), _$8 = _ms.getModule(js_6), id_61_63 = _ms.get(_$8, "id=?"), _$9 = _ms.getModule(bit_45arithmetic_7), bit_45and = _ms.get(_$9, "bit-and"), hexidecimal = _ms.get(_$9, "hexidecimal"), Num = _ms.getDefaultExport(Num_8), _$10 = _ms.getModule(Num_8), Int = _ms.get(_$10, "Int"), round_45towards_450 = _ms.get(_$10, "round-towards-0"), _$11 = _ms.getModule(methods_9), _43 = _ms.get(_$11, "+"), _42 = _ms.get(_$11, "*"), _$12 = _ms.getModule(Obj_10), p = _ms.get(_$12, "p"), _63p = _ms.get(_$12, "?p"), _64p_45all = _ms.get(_$12, "@p-all"), Str = _ms.getDefaultExport(Str_11), Method = _ms.getDefaultExport(Method_12), _$14 = _ms.getModule(Method_12), impl_33 = _ms.get(_$14, "impl!"), impl_45for = _ms.get(_$14, "impl-for"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_13)
		}), _$16 = _ms.lazyGetModule(_33_13), _33not = _ms.lazyProp(_$16, "!not");
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
				_ms.unlazy(_33)(_61_63, hash_45code(a), hash_45code(a));
				return _ms.unlazy(_33not)(_61_63, hash_45code(a), hash_45code(b))
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
						return function() {
							const _ = fun.name;
							switch (true) {
								case _ms.bool(_61_63(0, _.length)): {
									return fun.toString()
								}
								default: {
									return _
								}
							}
						}()
					}
					default: {
						return _.val
					}
				}
			}())
		});
		impl_33(hash_45code, Str, function() {
			const test = function() {
				_ms.unlazy(_33)(_61_63, hash_45code("a"), hash_45code("a"));
				return _ms.unlazy(_33not)(_61_63, hash_45code("a"), hash_45code("b"))
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
				return _ms.unlazy(_33)(_61_63, hash_45code(sym), hash_45code(sym))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQWlCQTtBQUFBOzs7O0VBQUEsMEJBQWdCLFlBQWE7QUFBQSxFQUU3QixxQkFBYyxTQUFBLEdBQ2I7QUFBQSxVQUFBLFVBQVEsR0FBUjtBQUFBO0FBQUEsRUFFRCxlQUFTLE1BQUE7QUFBQSxFQUVULG9CQUFZLGtCQUFNO0FBQUEsR0FDakIsWUFBTSxTQUFLLEdBQ1Y7QUFBQSw2QkFETSxLQUVMOztHQUVGLGFBQU8sV0FDTjtBQUFBLElBQUEscUJBQUc7QUFBQSxLQUNGLFVBQUc7QUFBQSxLQUNILFVBQUc7QUFBQSxZQUZEO0FBQUE7Ozs7O0lBR0gscUJBQUc7QUFBQSxLQUNGLFVBQUc7QUFBQSxLQUNILFVBQUc7QUFBQSxZQUZEO0FBQUE7Ozs7O29CQUdILFFBQUssWUFBQSxJQUFjLFlBQUE7QUFBQSw4QkFDbkIsUUFBUSxZQUFBLElBQWMsWUFBQTtBQUFBO0FBQUEsR0FHdkIsaUJBQVUsU0FBSyxHQUNkO0FBQUEsNkJBRFU7O01BRVQsY0FBQSxTQUFLLEdBQUUsUUFDTjtBQUFBLGNBQUE7QUFBQTtBQUFBLE1BQ0QsY0FBQSxTQUFLLEdBQUwsYUFDQztBQUFBLGNBQUE7QUFBQTtBQUFBLE1BQ0QsY0FBQSxXQUFXLEtBQ1Y7QUFBQSxjQUFBLFdBQVc7QUFBQTtBQUFBLE1BQ1osMkJBQUMsS0FBRCxLQUVDO0FBQUEsY0FBQSxXQUFBLGFBQUEsS0FBeUI7QUFBQTtBQUFBLGVBR3pCO0FBQUEsT0FBQSxXQUFXLEdBQUU7QUFBQSxPQUViLGFBQU8sSUFBQSxXQUFJLElBQVMsU0FBQSxNQUNuQjtBQUFBLGVBQUEsRUFBRSxHQUFGO0FBQUE7QUFBQSxPQUNELGFBQU8sS0FBQSxNQUFVLElBQUksU0FBQSxLQUFJLEtBQ3hCO0FBQUEsUUFBQSxVQUFJLGFBQVcsSUFBQSxLQUFPO0FBQUEsZUFDdEIsYUFBVyxJQUFHLFlBQUEsTUFBSDtBQUFBO0FBQUEsT0FDWixXQUFXLEdBQVg7QUFBQSxjQUNBO0FBQUE7QUFBQTtBQUFBOztVQXJDYztBQUFBOzs7Ozs7RUF3Q2xCLFFBQUEsYUFBQSxNQUFzQixTQUFBLEdBQUE7QUFBQTs7S0FDckIsY0FBQSxJQUNDO0FBQUEsYUFBQTtBQUFBO0FBQUEsY0FFQTtBQUFBLGFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBRUYsUUFBQSxhQUFBLEtBQXFCLFNBQUEsS0FFcEI7QUFBQSxVQUFBO0lBQWUsVUFBQSxLQUFBLEtBQVE7QUFBQTtLQUN0QixjQUFBLFNBQUEsS0FDQztBQUFBO09BQUssVUFBQTs7UUFDSixjQUFBLE9BQUcsR0FBRSxZQUNKO0FBQUEsZ0JBQUE7O2lCQUVBO0FBQUEsZ0JBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBRUY7QUFBQSxhQUFBOzs7OztFQUVILFFBQUEsYUFBQSxnQkFBbUI7QUFBQSxHQUNsQixhQUFPLFdBQ047QUFBQSxvQkFBQSxRQUFLLFlBQVksTUFBSSxZQUFZO0FBQUEsOEJBQ2pDLFFBQVEsWUFBWSxNQUFJLFlBQVk7QUFBQTtBQUFBLGtCQUNwQyxTQUFBLEdBQ0E7QUFBQSxJQUFBLGdCQUFXLFNBQUEsTUFBSyxJQUNmO0FBQUEsWUFBQSxhQUFXLElBQUcsSUFBRyxJQUFBLE1BQVMsY0FBYztBQUFBO0FBQUEsV0FDekMsNEJBQTRCLEdBQTVCLFNBQXNDO0FBQUE7O0VBRXhDLFFBQUEsYUFBQSxtQkFBc0I7QUFBQSxHQUNyQixhQUFPLFdBQ047QUFBQSxJQUFBLFlBQU0sT0FBUTtBQUFBLDJCQUNkLFFBQUssWUFBQSxNQUFnQixZQUFBO0FBQUE7QUFBQSxrQkFDckIsV0FFQTtBQUFBLDZCQUZDLEtBRUQ7OztFQUVGLFFBQUEsYUFBQSxLQUFxQixTQUFBLEdBRXBCO0FBQUEsVUFBQSxVQUFBLG9CQUFRLElBQVI7QUFBQTtBQUFBLG9CQUVEO0FBQUEsRUF2R0EsMENBQUE7QUFBQSIsImZpbGUiOiJoYXNoLWNvZGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==