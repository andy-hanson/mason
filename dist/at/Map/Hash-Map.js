"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../../Fun", "../../private/js-impl", "../../methods", "../../private/bootstrap", "../../Type/Alias-Type", "../../Type/Kind", "../../Type/Method", "../at-Type", "./Hash-Mapbang", "./Mapbang", "./Map-Type" ], function(exports, Fun_0, js_45impl_1, methods_2, bootstrap_3, Alias_45Type_4, Kind_5, Method_6, _64_45Type_7, Hash_45Map_33_8, Map_33_9, Map_45Type_10) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Fun_0), thunk = _ms.get(_$2, "thunk"), _$3 = _ms.getModule(js_45impl_1), makeMap = _ms.get(_$3, "makeMap"), _$4 = _ms.getModule(methods_2), freeze = _ms.get(_$4, "freeze"), _$5 = _ms.getModule(bootstrap_3), msDef = _ms.get(_$5, "msDef"), Alias_45Type = _ms.getDefaultExport(Alias_45Type_4), _$7 = _ms.getModule(Kind_5), self_45kind_33 = _ms.get(_$7, "self-kind!"), _$8 = _ms.getModule(Method_6), self_45impl_33 = _ms.get(_$8, "self-impl!"), _$9 = _ms.getModule(_64_45Type_7), empty = _ms.get(_$9, "empty"), Hash_45Map_33 = _ms.getDefaultExport(Hash_45Map_33_8), _$11 = _ms.getModule(Map_33_9), assoc_33 = _ms.get(_$11, "assoc!"), Map_45Type = _ms.getDefaultExport(Map_45Type_10);
		const exports = {};
		const Hash_45Map = Alias_45Type(function() {
			const alias_45of = Hash_45Map_33;
			return {
				"alias-of": alias_45of,
				displayName: "Hash-Map"
			}
		}());
		self_45kind_33(Hash_45Map, Map_45Type);
		self_45impl_33(empty, Hash_45Map, thunk(freeze(empty(Hash_45Map_33))));
		msDef("map", function() {
			const args = [  ].slice.call(arguments, 0);
			const hm = empty(Hash_45Map_33);
			makeMap(hm, assoc_33, args);
			return freeze(hm)
		});
		exports.default = Hash_45Map;
		const displayName = exports.displayName = "Hash-Map";
		return exports
	})
})
//# sourceMappingURL=../../at/Map/Hash-Map.js.map