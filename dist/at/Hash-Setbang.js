"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../compare", "../Type/Kind", "../Type/Method", "../Type/Obj-Type", "./at", "./atbang", "./at-Type", "./Map/Map", "./Map/Hash-Mapbang", "./Map/Mapbang", "./Set", "./Setbang" ], function(exports, compare_0, Kind_1, Method_2, Obj_45Type_3, _64_4, _64_33_5, _64_45Type_6, Map_7, Hash_45Map_33_8, Map_33_9, Set_10, Set_33_11) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(compare_0), _61_63 = _ms.get(_$2, "=?"), _$3 = _ms.getModule(Kind_1), kind_33 = _ms.get(_$3, "kind!"), self_45kind_33 = _ms.get(_$3, "self-kind!"), _$4 = _ms.getModule(Method_2), impl_33 = _ms.get(_$4, "impl!"), impl_45for = _ms.get(_$4, "impl-for"), Obj_45Type = _ms.getDefaultExport(Obj_45Type_3), _$6 = _ms.getModule(_64_4), each_33 = _ms.get(_$6, "each!"), iterator = _ms.get(_$6, "iterator"), _$7 = _ms.getModule(_64_33_5), _43_43_33 = _ms.get(_$7, "++!"), _45_45_33 = _ms.get(_$7, "--!"), empty_33 = _ms.get(_$7, "empty!"), _64_45Type = _ms.getDefaultExport(_64_45Type_6), _$8 = _ms.getModule(_64_45Type_6), empty = _ms.get(_$8, "empty"), _$9 = _ms.getModule(Map_7), keys = _ms.get(_$9, "keys"), Hash_45Map_33 = _ms.getDefaultExport(Hash_45Map_33_8), _$11 = _ms.getModule(Map_33_9), assoc_33 = _ms.get(_$11, "assoc!"), un_45assoc_33 = _ms.get(_$11, "un-assoc!"), Set = _ms.getDefaultExport(Set_10), Set_33 = _ms.getDefaultExport(Set_33_11);
		const exports = {};
		const Hash_45Set_33 = Obj_45Type(function() {
			const doc = "Set that considers elements equal using =?.\nRelies on an efficient hash-code implementation.";
			const props = function() {
				const data = Hash_45Map_33;
				return {
					data: data,
					displayName: "props"
				}
			}();
			return {
				doc: doc,
				props: props,
				displayName: "Hash-Set!"
			}
		}());
		self_45kind_33(Hash_45Set_33, _64_45Type, function() {
			const _k0 = empty, _v0 = function() {
				return Hash_45Set_33(function() {
					const data = empty(Hash_45Map_33);
					return {
						data: data
					}
				}())
			};
			return _ms.map(_k0, _v0)
		}());
		kind_33(Hash_45Set_33, Set_33, function() {
			const _k0 = iterator, _v0 = function(_) {
				return iterator(keys(_.data))
			};
			const _k1 = _43_43_33, _v1 = function(_, addeds) {
				return each_33(addeds, function(added) {
					return assoc_33(_.data, added, true)
				})
			};
			const _k2 = _45_45_33, _v2 = function(_, deleteds) {
				return each_33(deleteds, function(deleted) {
					return un_45assoc_33(_.data, deleted)
				})
			};
			const _k3 = empty_33, _v3 = function(_) {
				return empty_33(_.data)
			};
			return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
		}());
		impl_33(_61_63, Hash_45Set_33, impl_45for(_61_63, Set));
		exports.default = Hash_45Set_33;
		const displayName = exports.displayName = "Hash-Set!";
		return exports
	})
})
//# sourceMappingURL=../at/Hash-Setbang.js.map