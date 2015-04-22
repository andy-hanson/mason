"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../Bool", "../../compare", "../../control", "../../js", "../../Objbang", "../../Type/Kind", "../../Type/Obj-Type", "../at", "../atbang", "../at-Type", "../Stream", "./Map", "./Mapbang", "./Map-Type", "./Sorted-Mapbang", "../../bang", "../../compare" ], function(exports, Bool_0, compare_1, control_2, js_3, Obj_33_4, Kind_5, Obj_45Type_6, _64_7, _64_33_8, _64_45Type_9, Stream_10, Map_11, Map_33_12, Map_45Type_13, Sorted_45Map_33_14, _33_15, compare_16) {
	exports._get = _ms.lazy(function() {
		const Bool = _ms.getDefaultExport(Bool_0), _$2 = _ms.getModule(Bool_0), and = _ms.get(_$2, "and"), not = _ms.get(_$2, "not"), _$3 = _ms.getModule(compare_1), _60_63 = _ms.get(_$3, "<?"), _$4 = _ms.getModule(control_2), _if = _ms.get(_$4, "if"), loop = _ms.get(_$4, "loop"), End_45Loop = _ms.get(_$4, "End-Loop"), _$5 = _ms.getModule(js_3), defined_63 = _ms.get(_$5, "defined?"), _$6 = _ms.getModule(Obj_33_4), p_33 = _ms.get(_$6, "p!"), _$7 = _ms.getModule(Kind_5), kind_33 = _ms.get(_$7, "kind!"), self_45kind_33 = _ms.get(_$7, "self-kind!"), Obj_45Type = _ms.getDefaultExport(Obj_45Type_6), _$9 = _ms.getModule(_64_7), empty_63 = _ms.get(_$9, "empty?"), _$10 = _ms.getModule(_64_33_8), empty_33 = _ms.get(_$10, "empty!"), _$11 = _ms.getModule(_64_45Type_9), empty = _ms.get(_$11, "empty"), Stream = _ms.getDefaultExport(Stream_10), _$13 = _ms.getModule(Map_11), _63get = _ms.get(_$13, "?get"), keys = _ms.get(_$13, "keys"), _$14 = _ms.getModule(Map_33_12), assoc_33 = _ms.get(_$14, "assoc!"), un_45assoc_33 = _ms.get(_$14, "un-assoc!"), Map_45Type = _ms.getDefaultExport(Map_45Type_13), Sorted_45Map_33 = _ms.getDefaultExport(Sorted_45Map_33_14), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_15)
		}), _$18 = _ms.lazyGetModule(_33_15), _33not = _ms.lazyProp(_$18, "!not"), _$19 = _ms.lazyGetModule(compare_16), _61_63 = _ms.lazyProp(_$19, "=?");
		const exports = { };
		const Splay_45Tree_33 = Obj_45Type(function() {
			const doc = "Default Sorted-Map! implementation.\nBinary tree that is good at accessing the same values many times.";
			const props = function() {
				const root_33 = true;
				return {
					"root!": root_33,
					displayName: "props"
				}
			}();
			return {
				doc: doc,
				props: props,
				displayName: "Splay-Tree!"
			}
		}());
		self_45kind_33(Splay_45Tree_33, Map_45Type, function() {
			const _k0 = empty, _v0 = function() {
				return Splay_45Tree_33(function() {
					const root_33 = undefined;
					return {
						"root!": root_33
					}
				}())
			};
			return _ms.map(_k0, _v0)
		}());
		kind_33(Splay_45Tree_33, Sorted_45Map_33, function() {
			const _k0 = empty_63, _v0 = function(_) {
				return not(defined_63(_["root!"]))
			};
			const _k1 = empty_33, _v1 = function(_) {
				return p_33(_, "root!", undefined)
			};
			const _k2 = _63get, _v2 = function(_, key) {
				return _if(and(not(empty_63(_)), _ms.lazy(function() {
					return splay_33_63(_, key)
				})), _ms.lazy(function() {
					return _["root!"]["val!"]
				}))
			};
			const _k3 = keys, _v3 = function(_) {
				return Stream(function*() {
					const get_126 = function*(_) {
						switch (true) {
							case _ms.bool(defined_63(_)):
								{
									(yield* get_126(_["left!"]));
									(yield _.key);
									(yield* get_126(_["right!"]))
								};
								break
							default: {
								null
							}
						}
					};
					return (yield* get_126(_["root!"]))
				})
			};
			const _k4 = assoc_33, _v4 = function(_, k, v) {
				switch (true) {
					case _ms.bool(empty_63(_)):
						{
							p_33(_, "root!", {
								key: k,
								"left!": undefined,
								"right!": undefined,
								"val!": v
							})
						};
						break
					case _ms.bool(splay_33_63(_, k)):
						{
							p_33(_["root!"], "val!", v)
						};
						break
					default: {
						const old_45root = _["root!"];
						_ms.unlazy(_33not)(empty_63, _);
						p_33(_, "root!", function() {
							switch (true) {
								case _ms.bool(_60_63(old_45root.key, k)): {
									const old_45right = old_45root["right!"];
									p_33(old_45root, "right!", undefined);
									return {
										key: k,
										"left!": old_45root,
										"right!": old_45right,
										"val!": v
									}
								}
								default: {
									const old_45left = old_45root["left!"];
									p_33(old_45root, "left!", undefined);
									return {
										key: k,
										"left!": old_45left,
										"right!": old_45root,
										"val!": v
									}
								}
							}
						}())
					}
				}
			};
			const _k5 = un_45assoc_33, _v5 = function(_, key) {
				return _if(and(not(empty_63(_)), _ms.lazy(function() {
					return splay_33_63(_, key)
				})), _ms.lazy(function() {
					return function() {
						const removed = _["root!"];
						p_33(_, "root!", function() {
							switch (true) {
								case _ms.bool(has_45left_63(removed)): {
									const right = removed.right;
									const new_45root = removed.left;
									splay_33_63(_, key);
									p_33(new_45root, "right!", right);
									return new_45root
								}
								default: {
									return removed.right
								}
							}
						}());
						return removed.val
					}()
				}))
			};
			return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3, _k4, _v4, _k5, _v5)
		}());
		const splay_33_63 = function(_, key) {
			_ms.unlazy(_33not)(empty_63, _);
			const dummy = {
				"left!": undefined,
				"right!": undefined
			};
			const start = {
				cur: _["root!"],
				left: dummy,
				right: dummy
			};
			const _$94 = loop(start, _ms.sub(splay_45step_33, key)), left = _$94.left, right = _$94.right, cur = _$94.cur, found = _$94.found;
			p_33(left, "right!", cur["left!"]);
			p_33(right, "left!", cur["right!"]);
			p_33(cur, "left!", dummy["right!"]);
			p_33(cur, "right!", dummy["left!"]);
			p_33(_, "root!", cur);
			return _ms.checkContains(Bool, found, "res")
		};
		const splay_45step_33 = function(key, _) {
			const not_45found = function(end) {
				return End_45Loop({
					cur: end,
					found: false,
					left: _.left,
					right: _.right
				})
			};
			return function() {
				switch (true) {
					case _ms.bool(_60_63(key, _.cur.key)): {
						return function() {
							switch (true) {
								case _ms.bool(has_45left_63(_.cur)): {
									const link_45right = function(new_45cur) {
										p_33(_.right, "left!", new_45cur);
										return {
											cur: new_45cur["left!"],
											left: _.left,
											right: new_45cur
										}
									};
									return function() {
										switch (true) {
											case _ms.bool(_60_63(key, _.cur["left!"].key)): {
												const tmp = _.cur["left!"];
												p_33(_.cur, "left!", tmp["right!"]);
												p_33(tmp, "right!", _.cur);
												return function() {
													switch (true) {
														case _ms.bool(has_45left_63(tmp)): {
															return link_45right(tmp)
														}
														default: {
															return not_45found(tmp)
														}
													}
												}()
											}
											default: {
												return link_45right(_.cur)
											}
										}
									}()
								}
								default: {
									return not_45found(_.cur)
								}
							}
						}()
					}
					case _ms.bool(_60_63(_.cur.key, key)): {
						return function() {
							switch (true) {
								case _ms.bool(has_45right_63(_.cur)): {
									const link_45left = function(new_45cur) {
										p_33(_.left, "right!", new_45cur);
										return {
											cur: new_45cur["right!"],
											left: new_45cur,
											right: _.right
										}
									};
									return function() {
										switch (true) {
											case _ms.bool(_60_63(_.cur["right!"].key, key)): {
												const tmp = _.cur["right!"];
												p_33(_.cur, "right!", tmp["left!"]);
												p_33(tmp, "left!", _.cur);
												return function() {
													switch (true) {
														case _ms.bool(has_45right_63(tmp)): {
															return link_45left(tmp)
														}
														default: {
															return not_45found(tmp)
														}
													}
												}()
											}
											default: {
												return link_45left(_.cur)
											}
										}
									}()
								}
								default: {
									return not_45found(_.cur)
								}
							}
						}()
					}
					default: {
						_ms.unlazy(_33)(_ms.unlazy(_61_63), key, _.cur.key);
						return End_45Loop({
							cur: _.cur,
							found: true,
							left: _.left,
							right: _.right
						})
					}
				}
			}()
		};
		const has_45left_63 = function(node) {
			return defined_63(node["left!"])
		};
		const has_45right_63 = function(node) {
			return defined_63(node["right!"])
		};
		exports.default = Splay_45Tree_33;
		const displayName = exports.displayName = "Splay-Tree!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7b0NBb0JBO0FBQUE7Ozs7RUFBQSx3QkFBYyxzQkFBUTtBQUFBLEdBQ3JCLFlBQ0M7QUFBQSxHQUNELHlCQUFNO0FBQUEsSUFDTCxnQkFBQTtBQUFBLFdBREs7QUFBQTs7OztVQUhlO0FBQUE7Ozs7O0VBTXRCLGVBQUEsaUJBQUEsdUJBQStCO0FBQUEsR0FDOUIsWUFBQSxhQUFVLFdBQ1Q7QUFBQSxXQUFBLDJCQUFXO0FBQUEsS0FDVixnQkFBTztBQUFBLFlBREc7QUFBQTs7Ozs7O0VBR2IsUUFBQSxpQkFBQSw0QkFBNkI7QUFBQSxHQUM1QixZQUFBLGdCQUFXLFNBQUEsR0FDVjtBQUFBLFdBQUEsSUFBSSxXQUFVOztHQUNmLFlBQUEsZ0JBQVcsU0FBQSxHQUNWO0FBQUEsV0FBQSxLQUFHLEdBQUcsU0FBTjtBQUFBO0FBQUEsR0FDRCxZQUFBLGNBQVMsU0FBQSxHQUFFLEtBQ1Y7QUFBQSxXQUFBLElBQUcsSUFBSyxJQUFBLFNBQUs7WUFBVSxZQUFTLEdBQVQ7QUFBQTtZQUFrQjs7O0dBQzFDLFlBQUEsWUFBUyxTQUFBLEdBQ1I7QUFBQSxXQUFBLE9BQVMsWUFDUjtBQUFBLEtBQUEsZ0JBQVMsVUFBQSxHQUFBO0FBQUEsTUFBSztPQUNiLGNBQUEsV0FBQTtBQUFBLFFBQ0M7QUFBQSxTQUFJLFFBQUEsUUFBSztTQUNMLE9BQUQ7U0FDQyxRQUFBLFFBQUs7OztnQkFFVDtBQUFBLFFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUNFLFFBQUEsUUFBSzs7O0dBQ1gsWUFBQSxnQkFBVyxTQUFBLEdBQUUsR0FBRSxHQUNkO0FBQUEsSUFBSztLQUNKLGNBQUEsU0FBQTtBQUFBLE1BQ0M7QUFBQSxPQUFBLEtBQUcsR0FBRyxTQUFPO0FBQUEsYUFBTTtBQUFBLGlCQUFpQjtBQUFBLGtCQUFrQjtBQUFBLGdCQUEzQjtBQUFBO0FBQUE7QUFBQTtLQUM1QixjQUFBLFlBQVEsR0FBUjtBQUFBLE1BQ0M7QUFBQSxPQUFBLEtBQUcsWUFBUyxRQUFaO0FBQUE7QUFBQTtjQUVBO0FBQUEsTUFBQSxtQkFBVzt5QkFDTCxVQUFZO0FBQUEsTUFDbEIsS0FBRyxHQUFHOztRQUNMLGNBQUEsT0FBRyxnQkFBSCxLQUNDO0FBQUEsU0FBQSxvQkFBWTtTQUNaLEtBQUEsWUFBYSxVQUFiO0FBQUEsZ0JBQ0E7QUFBQSxlQUFNO0FBQUEsbUJBQWlCO0FBQUEsb0JBQWlCO0FBQUEsa0JBQTFCO0FBQUE7QUFBQTtBQUFBLGlCQUVkO0FBQUEsU0FBQSxtQkFBVztTQUNYLEtBQUEsWUFBYSxTQUFiO0FBQUEsZ0JBQ0E7QUFBQSxlQUFNO0FBQUEsbUJBQWlCO0FBQUEsb0JBQWlCO0FBQUEsa0JBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUNuQixZQUFBLHFCQUFjLFNBQUEsR0FBRSxLQUNmO0FBQUEsV0FBQSxJQUFHLElBQUssSUFBQSxTQUFLO1lBQVUsWUFBUyxHQUFUO0FBQUE7dUJBQWtCO0FBQUEsTUFDeEMsZ0JBQVU7TUFFVixLQUFHLEdBQUc7O1FBQ0wsY0FBQSxjQUFBLFdBQ0M7QUFBQSxTQUFBLGNBQVE7U0FDUixtQkFBVztTQUVYLFlBQVEsR0FBUjtBQUFBLFNBQ0EsS0FBQSxZQUFhLFVBQWI7QUFBQSxnQkFDQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxnQkFBQTs7OzthQUVGOzs7Ozs7RUFLRixvQkFBVyxTQUFNLEdBQUUsS0FJbEI7QUFBQSxzQkFGQyxVQUFZO0FBQUEsR0FFYixjQUFRO0FBQUEsYUFBTztBQUFBLGNBQWtCO0FBQUE7QUFBQSxHQUNqQyxjQUFRO0FBQUEsU0FBOEI7VUFBeEI7QUFBQSxXQUFhO0FBQUE7QUFBQSxHQUMzQixhQUF1QixLQUFBLGVBQVcsaUJBQVc7R0FDN0MsS0FBQSxNQUFTLFVBQVE7R0FDakIsS0FBQSxPQUFVLFNBQU87R0FDakIsS0FBQSxLQUFRLFNBQU87R0FDZixLQUFBLEtBQVEsVUFBUTtHQUNoQixLQUFHLEdBQUcsU0FBTjtBQUFBLDRCQVhXLE1BWVg7O0VBRUQsd0JBQWUsU0FBQSxLQUFJLEdBQ2xCO0FBQUEsR0FBQSxvQkFBYSxTQUFBLEtBQ1o7QUFBQSxXQUFBLFdBQVM7QUFBQSxVQUFtQjtBQUFBLFlBQVg7QUFBQSxXQUFxQjtZQUFjOzs7OztLQUVwRCxjQUFBLE9BQUEsS0FBTyxhQUNOO0FBQUE7O1FBQ0MsY0FBQSxjQUFVLFNBQ1Q7QUFBQSxTQUFBLHFCQUFjLFNBQUEsV0FDYjtBQUFBLFVBQUEsS0FBRyxTQUFTLFNBQVo7QUFBQSxpQkFDQTtBQUFBLGdCQUFNO2lCQUFvQjtrQkFBYztBQUFBO0FBQUE7QUFBQTs7V0FFeEMsY0FBQSxPQUFBLEtBQU8sc0JBRU47QUFBQSxZQUFBLFlBQU07WUFDTixLQUFHLE9BQU8sU0FBTztZQUNqQixLQUFBLEtBQVEsVUFBUTs7O2NBRWYsY0FBQSxjQUFBLE9BQ0M7QUFBQSxzQkFBQSxhQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLHNCQUFBLFlBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQUVGO0FBQUEsbUJBQUEsYUFBVzs7Ozs7aUJBRWI7QUFBQSxnQkFBQSxZQUFVOzs7OztLQUViLGNBQUEsT0FBRyxXQUFILE9BQ0M7QUFBQTs7UUFDQyxjQUFBLGVBQVcsU0FDVjtBQUFBLFNBQUEsb0JBQWEsU0FBQSxXQUNaO0FBQUEsVUFBQSxLQUFHLFFBQVEsVUFBWDtBQUFBLGlCQUNBO0FBQUEsZ0JBQU07aUJBQXFCO0FBQUEsa0JBQWU7Ozs7O1dBRTFDLGNBQUEsT0FBRyxxQkFBSCxPQUVDO0FBQUEsWUFBQSxZQUFNO1lBQ04sS0FBRyxPQUFPLFVBQVE7WUFDbEIsS0FBQSxLQUFRLFNBQU87OztjQUVkLGNBQUEsZUFBQSxPQUNDO0FBQUEsc0JBQUEsWUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxzQkFBQSxZQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFFRjtBQUFBLG1CQUFBLFlBQVU7Ozs7O2lCQUVaO0FBQUEsZ0JBQUEsWUFBVTs7Ozs7Y0FFWjtBQUFBLDBDQUFNLEtBQVM7YUFDZixXQUFTO0FBQUEsWUFBa0I7Y0FBVjtBQUFBLGFBQXNCO2NBQWM7Ozs7OztFQUV4RCxzQkFBYSxTQUFBLE1BQ1o7QUFBQSxVQUFBLFdBQVM7O0VBQ1YsdUJBQWMsU0FBQSxNQUNiO0FBQUEsVUFBQSxXQUFTOztvQkFHWDtBQUFBLEVBOUpBLDBDQUFBO0FBQUEiLCJmaWxlIjoiYXQvTWFwL1NwbGF5LVRyZWViYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=