"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../../Obj", "../../show", "../../Str", "../../Type/Method", "../../Type/Type", "../at", "./Map", "./Weak-Id-Mapbang" ], function(exports, Obj_0, show_1, Str_2, Method_3, Type_4, _64_5, Map_6, Weak_45Id_45Map_33_7) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Obj_0), flag_63 = _ms.get(_$2, "flag?"), show = _ms.getDefaultExport(show_1), Str = _ms.getDefaultExport(Str_2), _$5 = _ms.getModule(Method_3), impl_33 = _ms.get(_$5, "impl!"), _$6 = _ms.getModule(Type_4), _61_62 = _ms.get(_$6, "=>"), type_45of = _ms.get(_$6, "type-of"), _$7 = _ms.getModule(_64_5), map = _ms.get(_$7, "map"), Map = _ms.getDefaultExport(Map_6), Weak_45Id_45Map_33 = _ms.getDefaultExport(Weak_45Id_45Map_33_7);
		const exports = {};
		impl_33(show, Map, function() {
			const test = function() {
				const m = function() {
					const _k0 = 1, _v0 = 2;
					return _ms.map(_k0, _v0)
				}();
				const _k0 = [ m ], _v0 = "\n\t1 -> 2";
				const _k1 = [ m, {
					repr: true
				} ], _v1 = "Hash-Map!\n\t1 -> 2";
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, opts) {
				const parts = map(_, function(pair) {
					const _$22 = pair, key = _$22.key, val = _$22.val;
					return "" + _ms.show(show(key, opts)) + " -> " + _ms.show(show(val, opts))
				});
				const type = function() {
					switch (true) {
						case _ms.bool(flag_63(opts, "repr")): {
							return show(type_45of(_), opts)
						}
						default: {
							return ""
						}
					}
				}();
				return "" + _ms.show(type) + "\n\t" + _ms.show(_61_62(Str, parts, "\n\t"))
			}, "test", test)
		}());
		exports.default = impl_33(show, Weak_45Id_45Map_33, function() {
			return "<a Weak-Id-Map!>"
		});
		const displayName = exports.displayName = "show-Map";
		return exports
	})
})
//# sourceMappingURL=../../at/Map/show-Map.js.map