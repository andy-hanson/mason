"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../Bool", "../../compare", "../../control", "../../Fun", "../../math/methods", "../../methods", "../../Str", "../../Type/Kind", "../../Type/Method", "../../Type/Type", "../at", "../at-Type", "../../control", "../../math/Num", "../../show", "../q", "./Arraybang", "./Seqbang", "./Stream", "../../bang", "../../compare", "../../Try" ], function(exports, Bool_0, compare_1, control_2, Fun_3, methods_4, methods_5, Str_6, Kind_7, Method_8, Type_9, _64_10, _64_45Type_11, control_12, Num_13, show_14, _63_15, Array_33_16, Seq_33_17, Stream_18, _33_19, compare_20, Try_21) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Bool_0), not = _ms.get(_$2, "not"), _$3 = _ms.getModule(compare_1), _61_63 = _ms.get(_$3, "=?"), _$4 = _ms.getModule(control_2), End_45Loop = _ms.get(_$4, "End-Loop"), _if = _ms.get(_$4, "if"), loop = _ms.get(_$4, "loop"), Fun = _ms.getDefaultExport(Fun_3), _$5 = _ms.getModule(Fun_3), Pred = _ms.get(_$5, "Pred"), _$6 = _ms.getModule(methods_4), _45 = _ms.get(_$6, "-"), _43 = _ms.get(_$6, "+"), _$7 = _ms.getModule(methods_5), freeze = _ms.get(_$7, "freeze"), sub = _ms.get(_$7, "sub"), _$8 = _ms.getModule(Str_6), indent = _ms.get(_$8, "indent"), Kind = _ms.getDefaultExport(Kind_7), _$9 = _ms.getModule(Kind_7), kind_33 = _ms.get(_$9, "kind!"), self_45kind_33 = _ms.get(_$9, "self-kind!"), Method = _ms.getDefaultExport(Method_8), _$10 = _ms.getModule(Method_8), impl_33 = _ms.get(_$10, "impl!"), self_45impl_33 = _ms.get(_$10, "self-impl!"), _$11 = _ms.getModule(Type_9), _61_62 = _ms.get(_$11, "=>"), type_45of = _ms.get(_$11, "type-of"), _64 = _ms.getDefaultExport(_64_10), _$12 = _ms.getModule(_64_10), _43_43 = _ms.get(_$12, "++"), count = _ms.get(_$12, "count"), empty_63 = _ms.get(_$12, "empty?"), iterator = _ms.get(_$12, "iterator"), _64_45Type = _ms.getDefaultExport(_64_45Type_11), _$13 = _ms.getModule(_64_45Type_11), empty = _ms.get(_$13, "empty"), from_45stream = _ms.get(_$13, "from-stream"), _$15 = _ms.lazyGetModule(control_12), Ref_33 = _ms.lazyProp(_$15, "Ref!"), get = _ms.lazyProp(_$15, "get"), mod_33 = _ms.lazyProp(_$15, "mod!"), set_33 = _ms.lazyProp(_$15, "set!"), _$16 = _ms.lazyGetModule(Num_13), Nat = _ms.lazyProp(_$16, "Nat"), show = _ms.lazy(function() {
			return _ms.getDefaultExport(show_14)
		}), _63 = _ms.lazy(function() {
			return _ms.getDefaultExport(_63_15)
		}), _$18 = _ms.lazyGetModule(_63_15), un_45_63 = _ms.lazyProp(_$18, "un-?"), Array_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Array_33_16)
		}), _$20 = _ms.lazyGetModule(Seq_33_17), _43_43_62_33 = _ms.lazyProp(_$20, "++>!"), Stream = _ms.lazy(function() {
			return _ms.getDefaultExport(Stream_18)
		}), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_19)
		}), _$23 = _ms.lazyGetModule(_33_19), _33not = _ms.lazyProp(_$23, "!not"), _$24 = _ms.lazyGetModule(compare_20), _60_63 = _ms.lazyProp(_$24, "<?"), _$25 = _ms.lazyGetModule(Try_21), fails_63 = _ms.lazyProp(_$25, "fails?");
		const exports = { };
		const Seq = Kind(function() {
			const doc = "@ whose values are in a meaningful order.";
			return {
				doc: doc,
				displayName: "Seq"
			}
		}());
		kind_33(Seq, _64);
		self_45kind_33(Seq, _64_45Type);
		self_45impl_33(empty, Seq, function() {
			return empty(Array)
		});
		const _60_43_43_39 = exports["<++'"] = Method(function() {
			const doc = "TODO:REST\n(There is no `++>'` because `++` by default adds to the right for Seqs.)";
			const test = function() {
				return "TODO"
			};
			return _ms.set(function(_, left_45added) {
				_ms.checkContains(_64, _, "_");
				_ms.checkContains(_64, left_45added, "left-added");
				return _61_62(type_45of(_), _43_43(left_45added, _))
			}, "doc", doc, "test", test, "displayName", "<++'")
		}());
		const first = exports.first = function() {
			const doc = "First value in iteration order.";
			const test = function() {
				const _k0 = [ [ 1, 2 ] ], _v0 = 1;
				_ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
					return first([ ])
				});
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_) {
				return _ms.unlazy(un_45_63)(_63first(_), "Can not take first of empty.")
			}, "doc", doc, "test", test, "displayName", "first")
		}();
		const _63first = exports["?first"] = Method(function() {
			const doc = "First value in iteration order, if non-empty.";
			const test = function() {
				const _k0 = [ [ 1, 2 ] ], _v0 = _ms.unlazy(_63)(1);
				const _k1 = [ [ ] ], _v1 = empty(_ms.unlazy(_63));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			const _default = function(_) {
				return _63nth(_, 0)
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "?first"
			}
		}());
		const last = exports.last = function() {
			const doc = "Last value in iteration order.";
			const test = function() {
				const _k0 = [ [ 1, 2 ] ], _v0 = 2;
				_ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
					return last([ ])
				});
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_) {
				return _ms.unlazy(un_45_63)(_63last(_), "Can not take `last` of empty.")
			}, "doc", doc, "test", test, "displayName", "last")
		}();
		const _63last = exports["?last"] = Method(function() {
			const doc = "Last value in iteration order, if non-empty.";
			const test = function() {
				const _k0 = [ [ 1, 2 ] ], _v0 = _ms.unlazy(_63)(2);
				const _k1 = [ [ ] ], _v1 = empty(_ms.unlazy(_63));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			const _default = function(_) {
				return _if(not(empty_63(_)), _ms.lazy(function() {
					return _ms.sub(_, _45(count(_), 1))
				}))
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "?last"
			}
		}());
		const tail = exports.tail = Method(function() {
			const doc = "All elements but the first.\nTODO: Eager for Linked-Lists.";
			const test = function() {
				const _k0 = [ [ 1, 2 ] ], _v0 = _61_62(_ms.unlazy(Stream), [ 2 ]);
				const _k1 = [ [ ] ], _v1 = [ ];
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			const _default = function(_) {
				return function() {
					switch (true) {
						case _ms.bool(empty_63(_)): {
							return _
						}
						default: {
							return drop_39(_, 1)
						}
					}
				}()
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "tail"
			}
		}());
		const rtail = exports.rtail = Method(function() {
			const doc = "All elements but the last.\nTODO: Eager for finger trees.";
			const test = function() {
				const _k0 = [ [ 1, 2 ] ], _v0 = _61_62(_ms.unlazy(Stream), [ 1 ]);
				const _k1 = [ [ ] ], _v1 = [ ];
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			const _default = function(_) {
				return function() {
					switch (true) {
						case _ms.bool(empty_63(_)): {
							return _
						}
						default: {
							return take_39(_, _45(count(_), 1))
						}
					}
				}()
			};
			return {
				default: _default,
				doc: doc,
				test: test,
				displayName: "rtail"
			}
		}());
		const seq_61_63 = exports["seq=?"] = function() {
			const doc = "Whether two @s share the same elements in the same order.\nThe types of the @s do not matter.\nEquivalent to `=? (=> Array @a) (=> Array @b)`, but may not have to fully unlazy both.";
			const test = function() {
				const s = _ms.unlazy(Stream)(function*() {
					return (yield 1)
				});
				_ms.unlazy(_33)(seq_61_63, s, [ 1 ]);
				return _ms.unlazy(_33not)(seq_61_63, s, [ 2 ])
			};
			return _ms.set(function(_64a, _64b) {
				_ms.checkContains(_64, _64a, "@a");
				_ms.checkContains(_64, _64b, "@b");
				const iter_45a = iterator(_64a);
				const iter_45b = iterator(_64b);
				return loop(null, function() {
					const next_45a = iter_45a.next();
					const next_45b = iter_45b.next();
					return function() {
						switch (true) {
							case _ms.bool(next_45a.done): {
								return End_45Loop(next_45b.done)
							}
							case _ms.bool(next_45b.done): {
								return End_45Loop(false)
							}
							case _ms.bool(not(_61_63(next_45a.value, next_45b.value))): {
								return End_45Loop(false)
							}
							default: {
								return null
							}
						}
					}()
				})
			}, "doc", doc, "test", test, "displayName", "seq=?")
		}();
		const _63nth = exports["?nth"] = Method(function() {
			const doc = function(_, n) {
				_ms.checkContains(_ms.unlazy(Nat), n, "n");
				return "`n`th element in iteration order, if there are at least that many values.\n0th is the first.\""
			};
			const test = function() {
				const _k0 = [ [ 0, 1 ], 1 ], _v0 = _ms.unlazy(_63)(1);
				const _k1 = [ [ 0, 1 ], 2 ], _v1 = empty(_ms.unlazy(_63));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			const _default = function(_, n) {
				_ms.checkContains(_ms.unlazy(Nat), n, "n");
				const iter = iterator(_);
				const i = _ms.unlazy(Ref_33)(0);
				const ans = _ms.unlazy(Ref_33)(empty(_ms.unlazy(_63)));
				loop148: while (true) {
					const _$149 = iter.next(), value = _$149.value, done = _$149.done;
					switch (true) {
						case _ms.bool(done):
							{
								break loop148
							};
							break
						case _ms.bool(_61_63(_ms.unlazy(get)(i), n)):
							{
								_ms.unlazy(set_33)(ans, _ms.unlazy(_63)(value));
								break loop148
							};
							break
						default: {
							_ms.unlazy(mod_33)(i, _ms.sub(_43, 1))
						}
					}
				};
				return _ms.unlazy(get)(ans)
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "?nth"
			}
		}());
		impl_33(sub, Seq, function() {
			const doc = "Nth value in iteration order.";
			const test = function() {
				_ms.unlazy(_33)(_61_63, _ms.sub([ 0, 1 ], 1), 1);
				return _ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
					return _ms.sub([ 0, 1 ], 2)
				})
			};
			return _ms.set(function(_, n) {
				_ms.checkContains(_ms.unlazy(Nat), n, "n");
				return _ms.unlazy(un_45_63)(_63nth(_, n), _ms.lazy(function() {
					return ((("No element at index " + _ms.show(n)) + " for\n\t") + _ms.show(indent(_ms.unlazy(show)(_))))
				}))
			}, "doc", doc, "test", test)
		}());
		const slice = exports.slice = Method(function() {
			const doc = "The elements from index start (inclusive) to end (exclusive).\nTakes as much as possible.\nResult length should be - end start, unless `end` was past the end.";
			const test = function() {
				const _k0 = [ [ 0, 1, 2, 3 ], 1, 3 ], _v0 = [ 1, 2 ];
				return _ms.map(_k0, _v0)
			};
			const _default = function(_, start, end) {
				_ms.checkContains(_ms.unlazy(Nat), start, "start");
				_ms.checkContains(_ms.unlazy(Nat), end, "end");
				return _61_62(type_45of(_), slice_39(_, start, end))
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "slice"
			}
		}());
		const slice_39 = exports["slice'"] = function() {
			const doc = "Lazy slice.";
			const test = function() {
				const _k0 = [ [ 0, 1, 2, 3 ], 1, 3 ], _v0 = _61_62(_ms.unlazy(Stream), [ 1, 2 ]);
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, start, end) {
				_ms.checkContains(_ms.unlazy(Nat), start, "start");
				_ms.checkContains(_ms.unlazy(Nat), end, "end");
				return _ms.checkContains(_64, take_39(drop_39(_, start), _45(end, start)), "res")
			}, "doc", doc, "test", test, "displayName", "slice'")
		}();
		const take_39 = exports["take'"] = function() {
			const doc = "Stream including only the first count-to-take elements.";
			const test = function() {
				const _k0 = [ [ 0, 1, 2 ], 2 ], _v0 = _61_62(_ms.unlazy(Stream), [ 0, 1 ]);
				const _k1 = [ [ 0 ], 2 ], _v1 = _61_62(_ms.unlazy(Stream), [ 0 ]);
				const _ = [ 0, 1, 2, 3, 4 ];
				_ms.unlazy(_33)(seq_61_63, _, _43_43(take_39(_, 2), drop_39(_, 2)));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, count_45to_45take) {
				_ms.checkContains(_ms.unlazy(Nat), count_45to_45take, "count-to-take");
				return _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					const i = _ms.unlazy(Ref_33)(0);
					loop202: while (true) {
						switch (true) {
							case _ms.bool(_61_63(_ms.unlazy(get)(i), count_45to_45take)):
								{
									break loop202
								};
								break
							default: {
								const _$207 = iter.next(), value = _$207.value, done = _$207.done;
								switch (true) {
									case _ms.bool(done):
										{
											break loop202
										};
										break
									default: {
										(yield value);
										_ms.unlazy(mod_33)(i, _ms.sub(_43, 1))
									}
								}
							}
						}
					}
				})
			}, "doc", doc, "test", test, "displayName", "take'")
		}();
		const take_45while_39 = exports["take-while'"] = function() {
			const doc = "Stream stopping (and not including) the first element not satisfying while?.";
			const test = function() {
				const _k0 = [ [ 1, 2, - 1, 3 ], _ms.sub(_ms.unlazy(_60_63), 0) ], _v0 = _61_62(_ms.unlazy(Stream), [ 1, 2 ]);
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, while_63) {
				_ms.checkContains(Pred, while_63, "while?");
				return _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					loop222: while (true) {
						const _$223 = iter.next(), value = _$223.value, done = _$223.done;
						switch (true) {
							case _ms.bool(done):
								{
									break loop222
								};
								break
							case _ms.bool(while_63(value)):
								{
									(yield value)
								};
								break
							default: {
								break loop222
							}
						}
					}
				})
			}, "doc", doc, "test", test, "displayName", "take-while'")
		}();
		const drop_39 = exports["drop'"] = Method(function() {
			const doc = "Stream without the first count-to-drop elements.";
			const test = function() {
				const _k0 = [ [ 0, 1, 2, 3 ], 2 ], _v0 = _61_62(_ms.unlazy(Stream), [ 2, 3 ]);
				return _ms.map(_k0, _v0)
			};
			const _default = function(_, count_45to_45drop) {
				_ms.checkContains(_ms.unlazy(Nat), count_45to_45drop, "count-to-drop");
				return _ms.checkContains(_64, _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					const i = _ms.unlazy(Ref_33)(0);
					loop241: while (true) {
						switch (true) {
							case _ms.bool(_61_63(_ms.unlazy(get)(i), count_45to_45drop)):
								{
									break loop241
								};
								break
							default: {
								switch (true) {
									case _ms.bool(iter.next().done):
										{
											break loop241
										};
										break
									default: {
										_ms.unlazy(mod_33)(i, _ms.sub(_43, 1))
									}
								}
							}
						}
					};
					return (yield* iter)
				}), "res")
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "drop'"
			}
		}());
		const zip = exports.zip = function() {
			const doc = "Type-preserving zip.";
			const test = function() {
				const _k0 = [ [ 1, 2 ], [ 10, 20 ], _43 ], _v0 = [ 11, 22 ];
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_64a, _64b, zipper) {
				_ms.checkContains(_64, _64a, "@a");
				_ms.checkContains(_64, _64b, "@b");
				_ms.checkContains(_ms.sub(Fun, 2), zipper, "zipper");
				return _61_62(type_45of(_64a), zip_39(_64a, _64b, zipper))
			}, "doc", doc, "test", test, "displayName", "zip")
		}();
		const zip_39 = exports["zip'"] = function() {
			const doc = "Seq of zipper applied to corresponding elements of @a and @b.\nEnds as soon as either of them does, discarding extra elements.\n(Corresponding means: with the same index.)";
			const test = function() {
				const _k0 = [ [ 1, 2 ], [ 10, 20, 30 ], _43 ], _v0 = _61_62(_ms.unlazy(Stream), [ 11, 22 ]);
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_64a, _64b, zipper) {
				_ms.checkContains(_64, _64a, "@a");
				_ms.checkContains(_64, _64b, "@b");
				_ms.checkContains(_ms.sub(Fun, 2), zipper, "zipper");
				return _ms.unlazy(Stream)(function*() {
					const iter_45a = iterator(_64a);
					const iter_45b = iterator(_64b);
					loop274: while (true) {
						const next_45a = iter_45a.next();
						switch (true) {
							case _ms.bool(next_45a.done):
								{
									break loop274
								};
								break
							default: {
								const next_45b = iter_45b.next();
								switch (true) {
									case _ms.bool(next_45b.done):
										{
											break loop274
										};
										break
									default: {
										(yield zipper(next_45a.value, next_45b.value))
									}
								}
							}
						}
					}
				})
			}, "doc", doc, "test", test, "displayName", "zip'")
		}();
		const groups_45of_39 = exports["groups-of'"] = function() {
			const doc = "Seq of consecutive groups of `group-size` elements.";
			const test = function() {
				_ms.unlazy(_33)(seq_61_63, [ [ 1, 2 ], [ 3, 4 ] ], groups_45of_39(2, [ 1, 2, 3, 4 ]));
				_ms.unlazy(_33)(seq_61_63, [ [ 1, 2, 3 ] ], groups_45of_39(3, [ 1, 2, 3, 4 ]));
				return _ms.unlazy(_33)(seq_61_63, [ [ ], [ ], [ ] ], take_39(groups_45of_39(0, [ 1 ]), 3))
			};
			return _ms.set(function(group_45size, _) {
				_ms.checkContains(_ms.unlazy(Nat), group_45size, "group-size");
				return _ms.checkContains(_ms.sub(Seq, Array), function() {
					switch (true) {
						case _ms.bool(_61_63(group_45size, 0)): {
							return _ms.unlazy(Stream)(function*() {
								loop300: while (true) {
									(yield [ ])
								}
							})
						}
						default: {
							return _ms.unlazy(Stream)(function*() {
								const iter = iterator(_);
								loop305: while (true) {
									const next_45group = empty(_ms.unlazy(Array_33));
									loop307: while (true) {
										const _$308 = iter.next(), value = _$308.value, done = _$308.done;
										switch (true) {
											case _ms.bool(done):
												{
													break loop307
												};
												break
											default: {
												_ms.unlazy(_43_43_62_33)(next_45group, [ value ]);
												{
													const _ = count(next_45group);
													switch (true) {
														case _ms.bool(_61_63(_, group_45size)):
															{
																break loop307
															};
															break
														default: {
															null
														}
													}
												}
											}
										}
									};
									{
										const _ = count(next_45group);
										switch (true) {
											case _ms.bool(_61_63(_, group_45size)):
												{
													(yield freeze(next_45group))
												};
												break
											default: {
												break loop305
											}
										}
									}
								}
							})
						}
					}
				}(), "res")
			}, "doc", doc, "test", test, "displayName", "groups-of'")
		}();
		const reverse = exports.reverse = Method(function() {
			const doc = "Seq with the opposite order.";
			const test = function() {
				const _k0 = [ [ 1, 2 ] ], _v0 = [ 2, 1 ];
				return _ms.map(_k0, _v0)
			};
			const _default = function(_) {
				return _ms.checkContains(Array, from_45stream(_ms.unlazy(Array_33), _).reverse(), "res")
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "reverse"
			}
		}());
		const split_39 = exports["split'"] = function() {
			const doc = "Subseqs separated by elements where split? is true.";
			const test = function() {
				const _k0 = [ [ 1, 0, 1 ], _ms.sub(_61_63, 0) ], _v0 = _61_62(_ms.unlazy(Stream), [ [ 1 ], [ 1 ] ]);
				const _k1 = [ [ 0 ], _ms.sub(_61_63, 0) ], _v1 = _61_62(_ms.unlazy(Stream), [ [ ], [ ] ]);
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, split_63) {
				_ms.checkContains(Pred, split_63, "split?");
				return _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					const prev_45idx = _ms.unlazy(Ref_33)(0);
					const cur_45idx = _ms.unlazy(Ref_33)(0);
					loop342: while (true) {
						const _$343 = iter.next(), value = _$343.value, done = _$343.done;
						const next_45idx = _ms.lazy(function() {
							return _43(1, _ms.unlazy(get)(cur_45idx))
						});
						switch (true) {
							case _ms.bool(done):
								{
									(yield slice(_, _ms.unlazy(get)(prev_45idx), _ms.unlazy(get)(cur_45idx)));
									break loop342
								};
								break
							case _ms.bool(split_63(value)):
								{
									(yield slice(_, _ms.unlazy(get)(prev_45idx), _ms.unlazy(get)(cur_45idx)));
									_ms.unlazy(set_33)(prev_45idx, _ms.unlazy(next_45idx));
									_ms.unlazy(set_33)(cur_45idx, _ms.unlazy(next_45idx))
								};
								break
							default: {
								_ms.unlazy(set_33)(cur_45idx, _ms.unlazy(next_45idx))
							}
						}
					}
				})
			}, "doc", doc, "test", test, "displayName", "split'")
		}();
		exports.default = Seq;
		const displayName = exports.displayName = "Seq";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQTBCQTtBQUFBOzs7Ozs7Ozs7Ozs7RUFBQSxZQUFNLGdCQUFJO0FBQUEsR0FDVCxZQUFNO0FBQUEsVUFERztBQUFBOzs7O0VBR1YsUUFBQSxLQUFBO0FBQUEsRUFFQSxlQUFBLEtBQUE7QUFBQSxFQUNBLGVBQUEsT0FBQSxLQUFzQixXQUNyQjtBQUFBLFVBQUEsTUFBQTtBQUFBO0FBQUEsRUFHQSx1Q0FBTSxrQkFBTTtBQUFBLEdBQ1gsWUFDQztBQUFBLEdBRUQsYUFBTyxXQUNOO0FBQUEsV0FBQztBQUFBO0FBQUEsa0JBQ0QsU0FBQSxHQUFJLGNBQ0o7QUFBQSxzQkFERTtzQkFBYTtXQUNmLE9BQUEsVUFBRyxJQUFTLE9BQUEsY0FBZTtBQUFBOztFQUc3Qix5Q0FBTTtBQUFBLEdBQ0wsWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsSUFBQSxZQUFBLEVBQUUsRUFBRSxHQUFFLGFBQVM7QUFBQSwwQ0FDTCxXQUNUO0FBQUEsWUFBQSxNQUFNO0FBQUE7QUFBQTs7a0JBQ1AsU0FBQSxHQUNBO0FBQUEsZ0NBQUEsU0FBSyxJQUFTO0FBQUE7O0VBRWhCLHFDQUFRLGtCQUFNO0FBQUEsR0FDYixZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSxJQUFBLFlBQUEsRUFBRSxFQUFFLEdBQUUsNkJBQVc7QUFBQSxJQUNqQixZQUFBLEVBQUUsYUFBUzs7O0dBQ1osaUJBQVUsU0FBQSxHQUNUO0FBQUEsV0FBQSxPQUFLLEdBQUU7QUFBQTtBQUFBLFVBTks7QUFBQTs7Ozs7O0VBUWQsdUNBQUs7QUFBQSxHQUNKLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLEVBQUUsR0FBRSxhQUFTO0FBQUEsMENBQ0wsV0FDVDtBQUFBLFlBQUEsS0FBSztBQUFBO0FBQUE7O2tCQUNOLFNBQUEs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LEtBQUc7O01BRUgsY0FBQSxPQUFBLGNBQWMsS0FFYjtBQUFBLGlDQUFTLFlBQ1I7QUFBQSw4QkFDQztBQUFBLFNBQUcsT0FBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUw7QUFBQSxpQ0FBUyxZQUNSO0FBQUEsUUFBQSxhQUFPLFNBQUE7QUFBQSw4QkFFTjtBQUFBLFNBQUEscUJBQWE7K0JBRVo7QUFBQSxVQUFBLGNBQWE7VUFDUjtXQUNKLGNBQUE7QUFBQSxZQUNDO0FBQUEsYUFBQTs7O29CQUVBO0FBQUEscUNBQUEsY0FBZ0IsRUFBQTtBQUFBLFlBQ1Y7QUFBQSxhQUFBLFVBQUEsTUFBQTtBQUFBO2NBQ0wsY0FBQSxPQUFHLEdBQUg7QUFBQSxlQUNDO0FBQUEsZ0JBQUE7Ozt1QkFFQTtBQUFBLGVBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNDO0FBQUEsVUFBQSxVQUFBLE1BQUE7QUFBQTtXQUNMLGNBQUEsT0FBRyxHQUFIO0FBQUEsWUFDQztBQUFBLGFBQUcsT0FBQSxPQUFBO0FBQUE7QUFBQTtvQkFFSDtBQUFBLFlBQUE7Ozs7Ozs7Ozs7O0VBRVIsa0NBQVMsa0JBQU07QUFBQSxHQUNkLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLEVBQUUsR0FBRSxhQUFTLEVBQUUsR0FBRTtBQUFBOztHQUNwQixpQkFBVSxTQUFPLEdBQ2hCO0FBQUEsNkJBRFUsT0FDVixvQ0FBb0I7O1VBTFA7QUFBQTs7Ozs7O0VBT2YsZ0RBQU87QUFBQSxHQUNOLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLEVBQUUsR0FBRSxHQUFFLGFBQUksUUFBRyxZQUFRLDJCQUFVLEVBQUUsRUFBRSxLQUFJLEVBQUU7QUFBQSxJQUMzQyxZQUFBLEVBQUUsRUFBRSxhQUFJLFFBQUcsWUFBUSwyQkFBVSxFQUFFLEtBQUc7QUFBQTs7a0JBQ2xDLFNBQUEsR0FBRSxVQUNGO0FBQUEsc0JBRFM7OEJBQ0EsWUFDUjtBQUFBLEtBQUEsYUFBTyxTQUFBO0FBQUEsS0FDUCxzQ0FBZ0I7QUFBQSxLQUNoQixxQ0FBZTtBQUFBLDJCQUVkO0FBQUEsTUFBQSxjQUFhO01BQ2I7Y0FBWSxJQUFFLG1CQUFFO0FBQUE7QUFBQSxNQUNYO09BQ0osY0FBQTtBQUFBLFFBQ0M7QUFBQSxTQUFHLE9BQUEsTUFBTSxtQkFBRSw2QkFBZTtBQUFBLFNBQzFCOzs7T0FDRCxjQUFBLFNBQUE7QUFBQSxRQUNDO0FBQUEsU0FBRyxPQUFBLE1BQU0sbUJBQUUsNkJBQWU7QUFBQSw0QkFDMUI7NEJBQ0E7OztnQkFFQTtBQUFBLDJCQUFBOzs7Ozs7O29CQUVQO0FBQUEsRUFuV0EsMENBQUE7QUFBQSIsImZpbGUiOiJhdC9TZXEvU2VxLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=