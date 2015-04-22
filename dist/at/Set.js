"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../Bool", "../compare", "../Type/Type", "../Type/Kind", "../Type/Method", "./at", "./at-Type", "./Hash-Setbang", "./at", "./Stream" ], function(exports, Bool_0, compare_1, Type_2, Kind_3, Method_4, _64_5, _64_45Type_6, Hash_45Set_33_7, _64_8, Stream_9) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Bool_0), and = _ms.get(_$2, "and"), _$3 = _ms.getModule(compare_1), _61_63 = _ms.get(_$3, "=?"), same_63 = _ms.get(_$3, "same?"), _$4 = _ms.getModule(Type_2), _61_62 = _ms.get(_$4, "=>"), contains_63 = _ms.get(_$4, "contains?"), type_45of = _ms.get(_$4, "type-of"), Kind = _ms.getDefaultExport(Kind_3), _$5 = _ms.getModule(Kind_3), kind_33 = _ms.get(_$5, "kind!"), self_45kind_33 = _ms.get(_$5, "self-kind!"), Method = _ms.getDefaultExport(Method_4), _$6 = _ms.getModule(Method_4), impl_33 = _ms.get(_$6, "impl!"), _64 = _ms.getDefaultExport(_64_5), _$7 = _ms.getModule(_64_5), all_63 = _ms.get(_$7, "all?"), count = _ms.get(_$7, "count"), keep = _ms.get(_$7, "keep"), _64_45Type = _ms.getDefaultExport(_64_45Type_6), _$8 = _ms.getModule(_64_45Type_6), empty = _ms.get(_$8, "empty"), from_45stream = _ms.get(_$8, "from-stream"), Hash_45Set_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Hash_45Set_33_7)
		}), _$12 = _ms.lazyGetModule(_64_8), _45_45 = _ms.lazyProp(_$12, "--"), Stream = _ms.lazy(function() {
			return _ms.getDefaultExport(Stream_9)
		});
		const exports = { };
		const Set = Kind(function() {
			const doc = "@ without repeat values.";
			return {
				doc: doc,
				displayName: "Set"
			}
		}());
		self_45kind_33(Set, _64_45Type, function() {
			const _k0 = empty, _v0 = function() {
				return empty(_ms.unlazy(Hash_45Set_33))
			};
			const _k1 = from_45stream, _v1 = function(_) {
				return from_45stream(_ms.unlazy(Hash_45Set_33), _)
			};
			return _ms.map(_k0, _v0, _k1, _v1)
		}());
		kind_33(Set, _64);
		impl_33(_61_63, Set, function() {
			const doc = "Two Sets are =? if they have the same type and contain the same values.";
			const test = function() {
				const a = _61_62(Set, [ 1, 2 ]);
				const b = _61_62(Set, [ 1, 2 ]);
				const _k0 = [ a, b ], _v0 = true;
				const _k1 = [ a, [ _ms.unlazy(_45_45), b, [ 1 ] ] ], _v1 = false;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(a, b) {
				return and(same_63(type_45of, a, b), _ms.lazy(function() {
					return same_63(count, a, b)
				}), _ms.lazy(function() {
					return all_63(a, _ms.sub(contains_63, b))
				}))
			}, "doc", doc, "test", test)
		}());
		const set_61_63 = exports["set=?"] = function() {
			const doc = "Whether two @s have the same values, regardless of order or count.";
			const test = function() {
				const _k0 = [ [ 1, 2, 3 ], [ 3, 2, 1 ] ], _v0 = true;
				const _k1 = [ [ 1 ], [ 1, 1, 1 ] ], _v1 = true;
				const _k2 = [ [ 1, 2 ], [ 1, 2, 3 ] ], _v2 = false;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
			};
			return _ms.set(function(a, b) {
				_ms.checkContains(_64, a, "a");
				_ms.checkContains(_64, b, "b");
				return _61_63(_61_62(Set, a), _61_62(Set, b))
			}, "doc", doc, "test", test, "displayName", "set=?")
		}();
		const intersect = exports.intersect = Method(function() {
			const doc = "TODO";
			const test = function() {
				const _k0 = [ _61_62(Set, [ 1, 2 ]), _61_62(Set, [ 2, 3 ]) ], _v0 = _61_62(_ms.unlazy(Stream), [ 2 ]);
				return _ms.map(_k0, _v0)
			};
			const _default = function(a, b) {
				return keep(a, _ms.sub(contains_63, _61_62(Set, b)))
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "intersect"
			}
		}());
		exports.default = Set;
		const displayName = exports.displayName = "Set";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7b0NBY0E7QUFBQTs7Ozs7O0VBQUEsWUFBTSxnQkFBSTtBQUFBLEdBQ1QsWUFBTTtBQUFBLFVBREc7QUFBQTs7OztFQUdWLGVBQUEsS0FBQSx1QkFBcUI7QUFBQSxHQUNwQixZQUFBLGFBQVUsV0FDVDtBQUFBLFdBQUE7O0dBQ0QsWUFBQSxxQkFBZ0IsU0FBQSxHQUNmO0FBQUEsV0FBQSx5Q0FBc0I7QUFBQTtBQUFBOztFQUN4QixRQUFBLEtBQUE7QUFBQSxFQUVBLFFBQUEsUUFBQSxnQkFBWTtBQUFBLEdBQ1gsWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsSUFBQSxVQUFJLE9BQUEsS0FBTyxFQUFFLEdBQUU7QUFBQSxJQUNmLFVBQUksT0FBQSxLQUFPLEVBQUUsR0FBRTtBQUFBLElBQ2YsWUFBQSxFQUFBLEdBQUEsV0FBVztBQUFBLElBQ1gsWUFBQSxFQUFBLEdBQUksc0JBQUEsR0FBTyxFQUFFLGVBQVc7QUFBQTs7a0JBQ3hCLFNBQUEsR0FBRSxHQUNGO0FBQUEsV0FBQSxJQUFJLFFBQUEsV0FBQSxHQUFBO1lBQXFCLFFBQUEsT0FBQSxHQUFBO0FBQUE7WUFBbUIsT0FBQSxXQUFRLGFBQVM7QUFBQTtBQUFBOztFQUUvRCxnREFBTTtBQUFBLEdBQ0wsWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsSUFBQSxZQUFBLEVBQUUsRUFBRSxHQUFFLEdBQUUsS0FBSSxFQUFFLEdBQUUsR0FBRSxhQUFTO0FBQUEsSUFDM0IsWUFBQSxFQUFFLEVBQUUsS0FBSSxFQUFFLEdBQUUsR0FBRSxhQUFTO0FBQUEsSUFDdkIsWUFBQSxFQUFFLEVBQUUsR0FBRSxLQUFJLEVBQUUsR0FBRSxHQUFFLGFBQVM7QUFBQTs7a0JBQ3pCLFNBQUEsR0FBSSxHQUNKO0FBQUEsc0JBREU7c0JBQUk7V0FDTixPQUFHLE9BQUEsS0FBQSxJQUFXLE9BQUEsS0FBQTtBQUFBOztFQUVoQixzQ0FBVyxrQkFBTTtBQUFBLEdBQ2hCLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLE9BQUEsS0FBUSxFQUFFLEdBQUUsTUFBSyxPQUFBLEtBQVEsRUFBRSxHQUFFLGNBQVUsMkJBQVUsRUFBRTtBQUFBOztHQUN0RCxpQkFBVSxTQUFBLEdBQUUsR0FDWDtBQUFBLFdBQUEsS0FBQSxXQUFPLGFBQVUsT0FBQSxLQUFBO0FBQUE7QUFBQSxVQUxGO0FBQUE7Ozs7OztvQkFPakI7QUFBQSxFQWxEQSwwQ0FBQTtBQUFBIiwiZmlsZSI6ImF0L1NldC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9