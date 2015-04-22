"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../control", "../../js", "../../Type/Kind", "../../Type/Method", "../atbang", "../at-Type", "../q", "../Stream", "./Map", "./Mapbang", "./Map-Type", "../../bang", "../../compare", "../Seq" ], function(exports, control_0, js_1, Kind_2, Method_3, _64_33_4, _64_45Type_5, _63_6, Stream_7, Map_8, Map_33_9, Map_45Type_10, _33_11, compare_12, Seq_13) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(control_0), returning = _ms.get(_$2, "returning"), _$3 = _ms.getModule(js_1), _new = _ms.get(_$3, "new"), _$4 = _ms.getModule(Kind_2), kind_33 = _ms.get(_$4, "kind!"), self_45kind_33 = _ms.get(_$4, "self-kind!"), _$5 = _ms.getModule(Method_3), impl_33 = _ms.get(_$5, "impl!"), self_45impl_33 = _ms.get(_$5, "self-impl!"), _$6 = _ms.getModule(_64_33_4), empty_33 = _ms.get(_$6, "empty!"), _$7 = _ms.getModule(_64_45Type_5), empty = _ms.get(_$7, "empty"), _$8 = _ms.getModule(_63_6), Opt_45_62_63 = _ms.get(_$8, "Opt->?"), Stream = _ms.getDefaultExport(Stream_7), _$10 = _ms.getModule(Map_8), _63get = _ms.get(_$10, "?get"), has_45key_63 = _ms.get(_$10, "has-key?"), keys = _ms.get(_$10, "keys"), values = _ms.get(_$10, "values"), Map_33 = _ms.getDefaultExport(Map_33_9), _$11 = _ms.getModule(Map_33_9), assoc_33 = _ms.get(_$11, "assoc!"), un_45assoc_33 = _ms.get(_$11, "un-assoc!"), Map_45Type = _ms.getDefaultExport(Map_45Type_10), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_11)
		}), _$15 = _ms.lazyGetModule(compare_12), _61_63 = _ms.lazyProp(_$15, "=?"), _$16 = _ms.lazyGetModule(Seq_13), seq_61_63 = _ms.lazyProp(_$16, "seq=?");
		const exports = { };
		const Id_45Map_33 = function() {
			const doc = "JavaScript's native Map type.\nOnly considers exactly identical keys =?; this makes it the fastest Map.";
			const test = function() {
				const _ = empty(Id_45Map_33);
				assoc_33(_, 1, 2);
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _ms.sub(_, 1), 2);
				const key_451 = function() {
					const a = 1;
					return {
						a: a,
						displayName: "key-1"
					}
				}();
				assoc_33(_, key_451, 3);
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _ms.sub(_, key_451), 3);
				const key_452 = function() {
					const a = 1;
					return {
						a: a,
						displayName: "key-2"
					}
				}();
				assoc_33(_, key_452, 4);
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _ms.sub(_, key_451), 3);
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _ms.sub(_, key_452), 4);
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63), keys(_), [ 1, key_451, key_452 ]);
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63), values(_), [ 2, 3, 4 ])
			};
			return _ms.set(global.Map, "doc", doc, "test", test, "displayName", "Id-Map!")
		}();
		self_45kind_33(Id_45Map_33, Map_45Type);
		self_45impl_33(empty, Id_45Map_33, function() {
			return _new(Id_45Map_33)
		});
		kind_33(Id_45Map_33, Map_33);
		impl_33(_63get, Id_45Map_33, function(_, key) {
			return Opt_45_62_63(_.get(key))
		});
		impl_33(has_45key_63, Id_45Map_33, function(_, key) {
			return _.has(key)
		});
		impl_33(keys, Id_45Map_33, function(_) {
			return Stream(function() {
				return _.keys()
			})
		});
		impl_33(values, Id_45Map_33, function(_) {
			return Stream(function() {
				return _.values()
			})
		});
		impl_33(empty_33, Id_45Map_33, function(_) {
			return _.clear()
		});
		impl_33(assoc_33, Id_45Map_33, function(_, key, val) {
			return _.set(key, val)
		});
		impl_33(un_45assoc_33, Id_45Map_33, function(_, key) {
			return returning(_63get(_, key), function() {
				return _.delete(key)
			})
		});
		exports.default = Id_45Map_33;
		const displayName = exports.displayName = "Id-Map!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9JZC1NYXAhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvQ0FpQkE7QUFBQTs7OztFQUFBLCtCQUFTO0FBQUEsR0FDUixZQUNDO0FBQUEsR0FDRCxhQUFPLFdBRU47QUFBQSxJQUFBLFVBQUksTUFBQTtBQUFBLElBQ0osU0FBTyxHQUFFLEdBQUU7QUFBQSxnREFDTixHQUFFLElBQUc7QUFBQSxJQUNWLDJCQUFPO0FBQUEsS0FDTixVQUFHO0FBQUEsWUFERztBQUFBOzs7O0lBRVAsU0FBTyxHQUFQLFNBQWU7QUFBQSxnREFDVixHQUFDLFVBQVE7QUFBQSxJQUNkLDJCQUFPO0FBQUEsS0FDTixVQUFHO0FBQUEsWUFERztBQUFBOzs7O0lBRVAsU0FBTyxHQUFQLFNBQWU7QUFBQSxnREFFVixHQUFDLFVBQVE7QUFBQSxnREFDVCxHQUFDLFVBQVE7QUFBQSwyQ0FFZCxLQUFRLElBQU0sRUFBRSxHQUFGLFNBQUE7QUFBQSxrREFDZCxPQUFRLElBQVEsRUFBRSxHQUFFLEdBQUU7QUFBQTtBQUFBLGtCQUV2Qjs7RUFFRCxlQUFBLGFBQUE7QUFBQSxFQUNBLGVBQUEsT0FBQSxhQUEwQixXQUN6QjtBQUFBLFVBQUEsS0FBQTtBQUFBO0FBQUEsRUFFRCxRQUFBLGFBQUE7QUFBQSxFQUNBLFFBQUEsUUFBQSxhQUFvQixTQUFBLEdBQUUsS0FDckI7QUFBQSxVQUFBLGFBQVEsTUFBRDtBQUFBO0FBQUEsRUFDUixRQUFBLGNBQUEsYUFBd0IsU0FBQSxHQUFFLEtBQ3pCO0FBQUEsVUFBQSxNQUFBO0FBQUE7QUFBQSxFQUNELFFBQUEsTUFBQSxhQUFvQixTQUFBLEdBQ25CO0FBQUEsVUFBQSxPQUFRLFdBQ1A7QUFBQSxXQUFBOzs7RUFDRixRQUFBLFFBQUEsYUFBc0IsU0FBQSxHQUNyQjtBQUFBLFVBQUEsT0FBUSxXQUNQO0FBQUEsV0FBQTs7O0VBQ0YsUUFBQSxVQUFBLGFBQXNCLFNBQUEsR0FDckI7QUFBQSxVQUFBOztFQUNELFFBQUEsVUFBQSxhQUFzQixTQUFBLEdBQUUsS0FBSSxLQUMzQjtBQUFBLFVBQUEsTUFBQSxLQUFBO0FBQUE7QUFBQSxFQUNELFFBQUEsZUFBQSxhQUF5QixTQUFBLEdBQUUsS0FDMUI7QUFBQSxVQUFBLFVBQVUsT0FBTSxHQUFOLE1BQWMsV0FDdkI7QUFBQSxXQUFBLFNBQUE7QUFBQTtBQUFBO0FBQUEsb0JBRUY7QUFBQSxFQWhFQSwwQ0FBQTtBQUFBIiwiZmlsZSI6ImF0L01hcC9JZC1NYXBiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=