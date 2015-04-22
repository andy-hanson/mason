"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../compare", "../../hash-code", "../../js", "../../methods", "../../Obj", "../../Objbang", "../../Type/Kind", "../../Type/Method", "../../Type/Obj-Type", "../at", "../atbang", "../at-Type", "../Stream", "../q", "./Map", "./Id-Mapbang", "./Mapbang", "./Map-Type", "../../Generatorbang", "../../bang", "../Seq" ], function(exports, compare_0, hash_45code_1, js_2, methods_3, Obj_4, Obj_33_5, Kind_6, Method_7, Obj_45Type_8, _64_9, _64_33_10, _64_45Type_11, Stream_12, _63_13, Map_14, Id_45Map_33_15, Map_33_16, Map_45Type_17, Generator_33_18, _33_19, Seq_20) {
	exports._get = _ms.lazy(function() {
		const _$4 = _ms.getModule(compare_0), _61_63 = _ms.get(_$4, "=?"), hash_45code = _ms.getDefaultExport(hash_45code_1), _$6 = _ms.getModule(js_2), defined_63 = _ms.get(_$6, "defined?"), _$7 = _ms.getModule(methods_3), freeze = _ms.get(_$7, "freeze"), Obj = _ms.getDefaultExport(Obj_4), _$9 = _ms.getModule(Obj_33_5), p_33 = _ms.get(_$9, "p!"), _$10 = _ms.getModule(Kind_6), kind_33 = _ms.get(_$10, "kind!"), self_45kind_33 = _ms.get(_$10, "self-kind!"), _$11 = _ms.getModule(Method_7), impl_33 = _ms.get(_$11, "impl!"), self_45impl_33 = _ms.get(_$11, "self-impl!"), Obj_45Type = _ms.getDefaultExport(Obj_45Type_8), _$13 = _ms.getModule(_64_9), flat_45map = _ms.get(_$13, "flat-map"), map_39 = _ms.get(_$13, "map'"), _$14 = _ms.getModule(_64_33_10), empty_33 = _ms.get(_$14, "empty!"), _$15 = _ms.getModule(_64_45Type_11), empty = _ms.get(_$15, "empty"), Stream = _ms.getDefaultExport(Stream_12), _63 = _ms.getDefaultExport(_63_13), _$17 = _ms.getModule(_63_13), Opt_45_62_63 = _ms.get(_$17, "Opt->?"), _$18 = _ms.getModule(Map_14), _63get = _ms.get(_$18, "?get"), keys = _ms.get(_$18, "keys"), values = _ms.get(_$18, "values"), Id_45Map_33 = _ms.getDefaultExport(Id_45Map_33_15), Map_33 = _ms.getDefaultExport(Map_33_16), _$20 = _ms.getModule(Map_33_16), assoc_33 = _ms.get(_$20, "assoc!"), un_45assoc_33 = _ms.get(_$20, "un-assoc!"), Map_45Type = _ms.getDefaultExport(Map_45Type_17), _$23 = _ms.lazyGetModule(Generator_33_18), if_126 = _ms.lazyProp(_$23, "if~"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_19)
		}), _$26 = _ms.lazyGetModule(Seq_20), seq_61_63 = _ms.lazyProp(_$26, "seq=?");
		const exports = { };
		const Hash_45Map_33 = Obj_45Type(function() {
			const doc = "Default Map! type. Depends on efficient `hash-code` of its keys.";
			const test = function() {
				const _ = function() {
					const _k0 = 1, _v0 = 2;
					const _k1 = 3, _v1 = 4;
					return _ms.map(_k0, _v0, _k1, _v1)
				}();
				_ms.unlazy(_33)(_61_63, _ms.sub(_, 1), 2);
				_ms.unlazy(_33)(_61_63, _ms.sub(_, 3), 4);
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63), keys(_), [ 1, 3 ]);
				return _ms.unlazy(_33)(_61_63, _63get(_, 8), empty(_63))
			};
			const props = function() {
				const hash_45_62bucket = Id_45Map_33;
				return {
					"hash->bucket": hash_45_62bucket,
					displayName: "props"
				}
			}();
			return {
				doc: doc,
				test: test,
				props: props,
				displayName: "Hash-Map!"
			}
		}());
		kind_33(Hash_45Map_33, Map_33);
		self_45kind_33(Hash_45Map_33, Map_45Type);
		self_45impl_33(empty, Hash_45Map_33, function() {
			return Hash_45Map_33(function() {
				const hash_45_62bucket = empty(Id_45Map_33);
				return {
					"hash->bucket": hash_45_62bucket
				}
			}())
		});
		const opt_45bucket = function(_, key) {
			return _["hash->bucket"].get(hash_45code(key))
		};
		const opt_45bucket_45entry = function(opt_45bucket, key) {
			return function() {
				const _ = opt_45bucket;
				switch (true) {
					case _ms.bool(defined_63(_)): {
						return function() {
							switch (true) {
								case _ms.bool(_61_63(_.key, key)): {
									return _
								}
								default: {
									return opt_45bucket_45entry(_["next!"], key)
								}
							}
						}()
					}
					default: {
						return undefined
					}
				}
			}()
		};
		impl_33(_63get, Hash_45Map_33, function(_, key) {
			const bucket = opt_45bucket(_, key);
			const entry = opt_45bucket_45entry(bucket, key);
			return _ms.checkContains(_63, map_39(Opt_45_62_63(entry), function(be) {
				return be["val!"]
			}), "res")
		});
		impl_33(keys, Hash_45Map_33, function(_) {
			const buckets = values(_["hash->bucket"]);
			const bucket_45keys_126 = function(_) {
				return _ms.unlazy(if_126)(defined_63(_), function*() {
					(yield _.key);
					return (yield* bucket_45keys_126(_["next!"]))
				})
			};
			return flat_45map(buckets, function(_) {
				return Stream(function() {
					return bucket_45keys_126(_)
				})
			})
		});
		impl_33(assoc_33, Hash_45Map_33, function(hm, key, val) {
			const bucket = opt_45bucket(hm, key);
			{
				const _ = opt_45bucket_45entry(bucket, key);
				switch (true) {
					case _ms.bool(defined_63(_)):
						{
							p_33(_, "val!", val)
						};
						break
					default: {
						const k = key;
						hm["hash->bucket"].set(hash_45code(key), function() {
							const key = k;
							const val_33 = val;
							const next_33 = bucket;
							return {
								key: key,
								"val!": val_33,
								"next!": next_33
							}
						}())
					}
				}
			}
		});
		impl_33(un_45assoc_33, Hash_45Map_33, function(hm, key) {
			const bucket = opt_45bucket(hm, key);
			return function() {
				const _ = bucket;
				switch (true) {
					case _ms.bool(defined_63(_)): {
						return function() {
							switch (true) {
								case _ms.bool(_61_63(_.key, key)): {
									{
										const _ = bucket["next!"];
										switch (true) {
											case _ms.bool(defined_63(_)):
												{
													assoc_33(hm["hash->bucket"], key, _)
												};
												break
											default: {
												un_45assoc_33(hm["hash->bucket"], hash_45code(key))
											}
										}
									};
									return _63(_["val!"])
								}
								default: {
									const delete_45from_45next_45bucket_33 = function(prev_45bucket) {
										const next = prev_45bucket["next!"];
										return function() {
											const _ = next;
											switch (true) {
												case _ms.bool(defined_63(_)): {
													return function() {
														switch (true) {
															case _ms.bool(_61_63(next.key, key)): {
																p_33(prev_45bucket, "next!", next["next!"]);
																return _63(next["val!"])
															}
															default: {
																return delete_45from_45next_45bucket_33(next)
															}
														}
													}()
												}
												default: {
													return empty(_63)
												}
											}
										}()
									};
									return delete_45from_45next_45bucket_33(bucket)
								}
							}
						}()
					}
					default: {
						return empty(_63)
					}
				}
			}()
		});
		impl_33(freeze, Hash_45Map_33, function(_) {
			freeze(_["hash->bucket"]);
			return Obj.freeze(_)
		});
		impl_33(empty_33, Hash_45Map_33, function(_) {
			return empty_33(_["hash->bucket"])
		});
		exports.default = Hash_45Map_33;
		const displayName = exports.displayName = "Hash-Map!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQTJCQTtBQUFBOzs7O0VBQUEsc0JBQVksc0JBQVE7QUFBQSxHQUNuQixZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSxJQUFBLHFCQUFHO0FBQUEsS0FDRixZQUFBLFNBQUs7QUFBQSxLQUNMLFlBQUEsU0FBSztBQUFBOztvQkFDTixnQkFBSyxHQUFFLElBQUc7QUFBQSxvQkFDVixnQkFBSyxHQUFFLElBQUc7QUFBQSwyQ0FDVixLQUFRLElBQU0sRUFBRSxHQUFFO0FBQUEsMkJBQ2xCLFFBQUssT0FBTSxHQUFFLElBQUcsTUFBQTtBQUFBO0FBQUEsR0FFakIseUJBQU07QUFBQSxJQUNMLHlCQUFjO0FBQUEsV0FEVDtBQUFBOzs7O1VBWGE7QUFBQTs7Ozs7O0VBY3BCLFFBQUEsZUFBQTtBQUFBLEVBRUEsZUFBQSxlQUFBO0FBQUEsRUFDQSxlQUFBLE9BQUEsZUFBNEIsV0FDM0I7QUFBQSxVQUFBLHlCQUFTO0FBQUEsSUFDUix5QkFBYyxNQUFBO0FBQUEsV0FETjtBQUFBOzs7O0VBR1YscUJBQWMsU0FBQSxHQUFFLEtBQ2Y7QUFBQSxVQUFBLHNCQUFtQixZQUFBO0FBQUE7QUFBQSxFQUVwQiw2QkFBb0IsU0FBQSxjQUFXLEtBQzlCO0FBQUE7SUFBSyxVQUFBO0FBQUE7S0FDSixjQUFBLFdBQUEsS0FDQztBQUFBOztRQUNDLGNBQUEsT0FBRyxPQUFILE9BQ0M7QUFBQSxnQkFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxnQkFBQSxxQkFBaUIsWUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBRUY7QUFBQSxhQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUVILFFBQUEsUUFBQSxlQUFzQixTQUFHLEdBQUUsS0FDMUI7QUFBQSxHQUFBLGVBQVMsYUFBVyxHQUFYO0FBQUEsR0FDVCxjQUFRLHFCQUFBLFFBQUE7QUFBQSw0QkFGYyxLQUd0QixPQUFLLGFBQUEsUUFBZ0IsU0FBQSxJQUNwQjtBQUFBLFdBQUE7OztFQUVGLFFBQUEsTUFBQSxlQUFzQixTQUFBLEdBQ3JCO0FBQUEsR0FBQSxnQkFBVSxPQUFPO0dBQ2pCLDBCQUFnQixTQUFBLEdBQ2Y7QUFBQSw4QkFBQSxXQUFJLElBQVksWUFDZjtBQUFBLEtBQUksT0FBRDtZQUNDLFFBQUEsa0JBQWE7OztVQUNuQixXQUFBLFNBQWtCLFNBQUEsR0FDakI7QUFBQSxXQUFBLE9BQVEsV0FDUDtBQUFBLFlBQUEsa0JBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlILFFBQUEsVUFBQSxlQUF3QixTQUFBLElBQUcsS0FBSSxLQUM5QjtBQUFBLEdBQUEsZUFBUyxhQUFBLElBQUE7QUFBQSxHQUNIO0FBQUEsSUFBQSxVQUFBLHFCQUFBLFFBQUE7QUFBQTtLQUNMLGNBQUEsV0FBQTtBQUFBLE1BQ0M7QUFBQSxPQUFBLEtBQUcsR0FBRyxRQUFOO0FBQUE7QUFBQTtjQUdBO0FBQUEsTUFBQSxVQUFJO0FBQUEsTUFDSix1QkFBb0IsWUFBQSxpQkFBZTtBQUFBLE9BQ2xDLFlBQUs7QUFBQSxPQUNMLGVBQU07QUFBQSxPQUNOLGdCQUFPO0FBQUEsY0FIMkI7QUFBQTs7Ozs7Ozs7O0VBS3RDLFFBQUEsZUFBQSxlQUEyQixTQUFBLElBQUcsS0FDN0I7QUFBQSxHQUFBLGVBQVMsYUFBQSxJQUFBO0FBQUE7SUFDSixVQUFBO0FBQUE7S0FDSixjQUFBLFdBQUEsS0FDQztBQUFBOztRQUNDLGNBQUEsT0FBRyxPQUFILE9BQ0M7QUFBQSxTQUFNO0FBQUEsVUFBQSxVQUFBOztXQUNMLGNBQUEsV0FBQTtBQUFBLFlBQ0M7QUFBQSxhQUFBLFNBQU8sb0JBQVAsS0FBMkI7QUFBQTtBQUFBO29CQUUzQjtBQUFBLFlBQUEsY0FBVSxvQkFBZ0IsWUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUM1QixJQUFFOztpQkFFRjtBQUFBLFNBQUEseUNBQTRCLFNBQUEsZUFDM0I7QUFBQSxVQUFBLGFBQU87O1dBQ0YsVUFBQTtBQUFBO1lBQ0osY0FBQSxXQUFBLEtBQ0M7QUFBQTs7ZUFDQyxjQUFBLE9BQUcsVUFBSCxPQUNDO0FBQUEsZ0JBQUEsS0FBQSxlQUFnQixTQUFPO3VCQUN2QixJQUFFOzt3QkFFRjtBQUFBLHVCQUFBLGlDQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFRjtBQUFBLG9CQUFBLE1BQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUVILGlDQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUVGO0FBQUEsYUFBQSxNQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUVILFFBQUEsUUFBQSxlQUF3QixTQUFBLEdBQ3ZCO0FBQUEsR0FBQSxPQUFPO1VBQ1AsV0FBVztBQUFBO0FBQUEsRUFFWixRQUFBLFVBQUEsZUFBd0IsU0FBQSxHQUN2QjtBQUFBLFVBQUEsU0FBTzs7b0JBRVI7QUFBQSxFQWxJQSwwQ0FBQTtBQUFBIiwiZmlsZSI6ImF0L01hcC9IYXNoLU1hcGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==