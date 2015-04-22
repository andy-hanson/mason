"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../control", "../../Fun", "../../methods", "../../Type/Method", "../../Type/Kind", "../at", "../at-Type", "./Map", "./Hash-Mapbang", "./Mapbang" ], function(exports, control_0, Fun_1, methods_2, Method_3, Kind_4, _64_5, _64_45Type_6, Map_7, Hash_45Map_33_8, Map_33_9) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(control_0), returning = _ms.get(_$2, "returning"), _$3 = _ms.getModule(Fun_1), identity = _ms.get(_$3, "identity"), _$4 = _ms.getModule(methods_2), sub = _ms.get(_$4, "sub"), _$5 = _ms.getModule(Method_3), impl_33 = _ms.get(_$5, "impl!"), self_45impl_33 = _ms.get(_$5, "self-impl!"), Kind = _ms.getDefaultExport(Kind_4), _$6 = _ms.getModule(Kind_4), kind_33 = _ms.get(_$6, "kind!"), self_45kind_33 = _ms.get(_$6, "self-kind!"), _64 = _ms.getDefaultExport(_64_5), _$7 = _ms.getModule(_64_5), each_33 = _ms.get(_$7, "each!"), _64_45Type = _ms.getDefaultExport(_64_45Type_6), _$8 = _ms.getModule(_64_45Type_6), empty = _ms.get(_$8, "empty"), from_45stream = _ms.get(_$8, "from-stream"), Map = _ms.getDefaultExport(Map_7), Hash_45Map_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Hash_45Map_33_8)
		}), _$12 = _ms.lazyGetModule(Map_33_9), assoc_33 = _ms.lazyProp(_$12, "assoc!");
		const exports = { };
		const Map_45Type = Kind(function() {
			const doc = "Any sub-type of Map.";
			return {
				doc: doc,
				displayName: "Map-Type"
			}
		}());
		kind_33(Map_45Type, _64_45Type);
		self_45kind_33(Map, Map_45Type);
		self_45impl_33(empty, Map, function() {
			return empty(_ms.unlazy(Hash_45Map_33))
		});
		impl_33(sub, Map_45Type, identity);
		impl_33(from_45stream, Map_45Type, function() {
			const test = function() {
				const m = function() {
					const _k0 = 1, _v0 = 2;
					const _k1 = 3, _v1 = 4;
					return _ms.map(_k0, _v0, _k1, _v1)
				}();
				const _k0 = [ _ms.unlazy(Hash_45Map_33), m ], _v0 = function() {
					const _k0 = 1, _v0 = 2;
					const _k1 = 3, _v1 = 4;
					return _ms.map(_k0, _v0, _k1, _v1)
				}();
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(type, stream) {
				_ms.checkContains(_64, stream, "stream");
				return returning(empty(type), function(_) {
					return each_33(stream, function(pair) {
						const _$38 = pair, key = _$38.key, val = _$38.val;
						return _ms.unlazy(assoc_33)(_, key, val)
					})
				})
			}, "test", test)
		}());
		exports.default = Map_45Type;
		const displayName = exports.displayName = "Map-Type";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7b0NBYUE7QUFBQTs7OztFQUFBLG1CQUFXLGdCQUFJO0FBQUEsR0FDZCxZQUFNO0FBQUEsVUFEUTtBQUFBOzs7O0VBR2YsUUFBQSxZQUFBO0FBQUEsRUFHQSxlQUFBLEtBQUE7QUFBQSxFQUNBLGVBQUEsT0FBQSxLQUFzQixXQUNyQjtBQUFBLFVBQUE7O0VBRUQsUUFBQSxLQUFBLFlBQUE7QUFBQSxFQUVBLFFBQUEsZUFBQSx1QkFBMEI7QUFBQSxHQUN6QixhQUFPLFdBRU47QUFBQSxJQUFBLHFCQUFHO0FBQUEsS0FDRixZQUFBLFNBQUs7QUFBQSxLQUNMLFlBQUEsU0FBSztBQUFBOztJQUNOLFlBQUEsNkJBQUEsc0JBQWtCO0FBQUEsS0FDakIsWUFBQSxTQUFLO0FBQUEsS0FDTCxZQUFBLFNBQUs7QUFBQTs7OztrQkFDTixTQUFBLE1BQUssUUFDTDtBQUFBLHNCQURZO1dBQ1osVUFBVSxNQUFBLE9BQWMsU0FBQSxHQUN2QjtBQUFBLFlBQUEsUUFBQSxRQUFjLFNBQUEsTUFDYjtBQUFBLE1BQUEsYUFBVTtrQ0FDSCxHQUFQLEtBQUE7QUFBQTtBQUFBO0FBQUE7O29CQUVKO0FBQUEsRUF4Q0EsMENBQUE7QUFBQSIsImZpbGUiOiJhdC9NYXAvTWFwLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==