"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../Bool", "../compare", "../control", "../Fun", "../math/methods", "../methods", "../Str", "../Type/Kind", "../Type/Method", "../Type/Type", "./at", "./at-Type", "../control", "../show", "./q", "./Arraybang", "../math/Num", "./Seqbang", "./Stream", "../bang", "../compare", "../Try" ], function(exports, Bool_0, compare_1, control_2, Fun_3, methods_4, methods_5, Str_6, Kind_7, Method_8, Type_9, _64_10, _64_45Type_11, control_12, show_13, _63_14, Array_33_15, Num_16, Seq_33_17, Stream_18, _33_19, compare_20, Try_21) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Bool_0), not = _ms.get(_$2, "not"), _$3 = _ms.getModule(compare_1), _61_63 = _ms.get(_$3, "=?"), _$4 = _ms.getModule(control_2), End_45Loop = _ms.get(_$4, "End-Loop"), _if = _ms.get(_$4, "if"), loop = _ms.get(_$4, "loop"), Fun = _ms.getDefaultExport(Fun_3), _$5 = _ms.getModule(Fun_3), Pred = _ms.get(_$5, "Pred"), _$6 = _ms.getModule(methods_4), _45 = _ms.get(_$6, "-"), _43 = _ms.get(_$6, "+"), _$7 = _ms.getModule(methods_5), freeze = _ms.get(_$7, "freeze"), sub = _ms.get(_$7, "sub"), _$8 = _ms.getModule(Str_6), indent = _ms.get(_$8, "indent"), Kind = _ms.getDefaultExport(Kind_7), _$9 = _ms.getModule(Kind_7), kind_33 = _ms.get(_$9, "kind!"), self_45kind_33 = _ms.get(_$9, "self-kind!"), Method = _ms.getDefaultExport(Method_8), _$10 = _ms.getModule(Method_8), impl_33 = _ms.get(_$10, "impl!"), self_45impl_33 = _ms.get(_$10, "self-impl!"), _$11 = _ms.getModule(Type_9), _61_62 = _ms.get(_$11, "=>"), type_45of = _ms.get(_$11, "type-of"), _64 = _ms.getDefaultExport(_64_10), _$12 = _ms.getModule(_64_10), _43_43 = _ms.get(_$12, "++"), count = _ms.get(_$12, "count"), empty_63 = _ms.get(_$12, "empty?"), iterator = _ms.get(_$12, "iterator"), _64_45Type = _ms.getDefaultExport(_64_45Type_11), _$13 = _ms.getModule(_64_45Type_11), empty = _ms.get(_$13, "empty"), from_45stream = _ms.get(_$13, "from-stream"), _$15 = _ms.lazyGetModule(control_12), Ref_33 = _ms.lazyProp(_$15, "Ref!"), get = _ms.lazyProp(_$15, "get"), mod_33 = _ms.lazyProp(_$15, "mod!"), set_33 = _ms.lazyProp(_$15, "set!"), show = _ms.lazy(function() {
			return _ms.getDefaultExport(show_13)
		}), _63 = _ms.lazy(function() {
			return _ms.getDefaultExport(_63_14)
		}), _$17 = _ms.lazyGetModule(_63_14), un_45_63 = _ms.lazyProp(_$17, "un-?"), Array_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Array_33_15)
		}), _$19 = _ms.lazyGetModule(Num_16), Nat = _ms.lazyProp(_$19, "Nat"), _$20 = _ms.lazyGetModule(Seq_33_17), _43_43_62_33 = _ms.lazyProp(_$20, "++>!"), Stream = _ms.lazy(function() {
			return _ms.getDefaultExport(Stream_18)
		}), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_19)
		}), _$23 = _ms.lazyGetModule(_33_19), _33not = _ms.lazyProp(_$23, "!not"), _$24 = _ms.lazyGetModule(compare_20), _60_63 = _ms.lazyProp(_$24, "<?"), _$25 = _ms.lazyGetModule(Try_21), fails_63 = _ms.lazyProp(_$25, "fails?");
		const exports = {};
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
					return first([  ])
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
				const _k1 = [ [  ] ], _v1 = empty(_ms.unlazy(_63));
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
					return last([  ])
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
				const _k1 = [ [  ] ], _v1 = empty(_ms.unlazy(_63));
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
				const _k1 = [ [  ] ], _v1 = [  ];
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			const _default = function(_) {
				return function() {
					switch (true) {
						case _ms.bool(empty_63(_)): {
							return _
						}
						default: {
							return drop(_, 1)
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
				const _k1 = [ [  ] ], _v1 = [  ];
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			const _default = function(_) {
				return function() {
					switch (true) {
						case _ms.bool(empty_63(_)): {
							return _
						}
						default: {
							return take(_, _45(count(_), 1))
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
				loop148 :  while (true) {
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
					return "No element at index " + _ms.show(n) + " for\n\t" + _ms.show(indent(_ms.unlazy(show)(_)))
				}))
			}, "doc", doc, "test", test)
		}());
		const slice = exports.slice = Method(function() {
			const doc = "The elements from index start (inclusive) to end (exclusive).\nTakes as much as possible.\nResult length should be - end start, unless `end` was past the end.";
			const test = function() {
				const _k0 = [ [ 0, 1, 2, 3 ], 1, 3 ], _v0 = _61_62(_ms.unlazy(Stream), [ 1, 2 ]);
				return _ms.map(_k0, _v0)
			};
			const _default = function(_, start, end) {
				_ms.checkContains(_ms.unlazy(Nat), start, "start");
				_ms.checkContains(_ms.unlazy(Nat), end, "end");
				return _ms.checkContains(_64, take(drop(_, start), _45(end, start)), "res")
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "slice"
			}
		}());
		const slice_39 = exports["slice'"] = Method(function() {
			const doc = "Type-preserving slice.";
			const test = function() {
				const _k0 = [ [ 0, 1, 2, 3 ], 1, 3 ], _v0 = [ 1, 2 ];
				return _ms.map(_k0, _v0)
			};
			const _default = function(_, start, end) {
				_ms.checkContains(_ms.unlazy(Nat), start, "start");
				_ms.checkContains(_ms.unlazy(Nat), end, "end");
				return _61_62(type_45of(_), slice(_, start, end))
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "slice'"
			}
		}());
		const take = exports.take = function() {
			const doc = "Stream including only the first count-to-take elements.";
			const test = function() {
				const _k0 = [ [ 0, 1, 2 ], 2 ], _v0 = _61_62(_ms.unlazy(Stream), [ 0, 1 ]);
				const _k1 = [ [ 0 ], 2 ], _v1 = _61_62(_ms.unlazy(Stream), [ 0 ]);
				const _ = [ 0, 1, 2, 3, 4 ];
				_ms.unlazy(_33)(seq_61_63, _, _43_43(take(_, 2), drop(_, 2)));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, count_45to_45take) {
				_ms.checkContains(_ms.unlazy(Nat), count_45to_45take, "count-to-take");
				return _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					const i = _ms.unlazy(Ref_33)(0);
					loop200 :  while (true) {
						switch (true) {
							case _ms.bool(_61_63(_ms.unlazy(get)(i), count_45to_45take)):
								{
									break loop200
								};
								break
							
							default: {
								const _$205 = iter.next(), value = _$205.value, done = _$205.done;
								switch (true) {
									case _ms.bool(done):
										{
											break loop200
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
			}, "doc", doc, "test", test, "displayName", "take")
		}();
		const take_45while = exports["take-while"] = function() {
			const doc = "Stream stopping (and not including) the first element not satisfying while?.";
			const test = function() {
				const _k0 = [ [ 1, 2, - 1, 3 ], _ms.sub(_ms.unlazy(_60_63), 0) ], _v0 = _61_62(_ms.unlazy(Stream), [ 1, 2 ]);
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, while_63) {
				_ms.checkContains(Pred, while_63, "while?");
				return _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					loop220 :  while (true) {
						const _$221 = iter.next(), value = _$221.value, done = _$221.done;
						switch (true) {
							case _ms.bool(done):
								{
									break loop220
								};
								break
							
							case _ms.bool(while_63(value)):
								{
									(yield value)
								};
								break
							
							default: {
								break loop220
							}
						}
					}
				})
			}, "doc", doc, "test", test, "displayName", "take-while")
		}();
		const drop = exports.drop = Method(function() {
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
					loop239 :  while (true) {
						switch (true) {
							case _ms.bool(_61_63(_ms.unlazy(get)(i), count_45to_45drop)):
								{
									break loop239
								};
								break
							
							default: {
								switch (true) {
									case _ms.bool(iter.next().done):
										{
											break loop239
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
				displayName: "drop"
			}
		}());
		const zip = exports.zip = function() {
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
					loop265 :  while (true) {
						const next_45a = iter_45a.next();
						switch (true) {
							case _ms.bool(next_45a.done):
								{
									break loop265
								};
								break
							
							default: {
								const next_45b = iter_45b.next();
								switch (true) {
									case _ms.bool(next_45b.done):
										{
											break loop265
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
			}, "doc", doc, "test", test, "displayName", "zip")
		}();
		const zip_39 = exports["zip'"] = function() {
			const doc = "Type-preserving zip.";
			const test = function() {
				const _k0 = [ [ 1, 2 ], [ 10, 20 ], _43 ], _v0 = [ 11, 22 ];
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_64a, _64b, zipper) {
				_ms.checkContains(_64, _64a, "@a");
				_ms.checkContains(_64, _64b, "@b");
				_ms.checkContains(_ms.sub(Fun, 2), zipper, "zipper");
				return _61_62(type_45of(_64a), zip(_64a, _64b, zipper))
			}, "doc", doc, "test", test, "displayName", "zip'")
		}();
		const groups_45of = exports["groups-of"] = function() {
			const doc = "Seq of consecutive groups of `group-size` elements.";
			const test = function() {
				_ms.unlazy(_33)(seq_61_63, [ [ 1, 2 ], [ 3, 4 ] ], groups_45of(2, [ 1, 2, 3, 4 ]));
				_ms.unlazy(_33)(seq_61_63, [ [ 1, 2, 3 ] ], groups_45of(3, [ 1, 2, 3, 4 ]));
				return _ms.unlazy(_33)(seq_61_63, [ [  ], [  ], [  ] ], take(groups_45of(0, [ 1 ]), 3))
			};
			return _ms.set(function(group_45size, _) {
				_ms.checkContains(_ms.unlazy(Nat), group_45size, "group-size");
				return _ms.checkContains(_ms.sub(Seq, Array), function() {
					switch (true) {
						case _ms.bool(_61_63(group_45size, 0)): {
							return _ms.unlazy(Stream)(function*() {
								loop298 :  while (true) {
									(yield [  ])
								}
							})
						}
						default: {
							return _ms.unlazy(Stream)(function*() {
								const iter = iterator(_);
								loop303 :  while (true) {
									const next_45group = empty(_ms.unlazy(Array_33));
									loop305 :  while (true) {
										const _$306 = iter.next(), value = _$306.value, done = _$306.done;
										switch (true) {
											case _ms.bool(done):
												{
													break loop305
												};
												break
											
											default: {
												_ms.unlazy(_43_43_62_33)(next_45group, [ value ]);
												{
													const _ = count(next_45group);
													switch (true) {
														case _ms.bool(_61_63(_, group_45size)):
															{
																break loop305
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
												break loop303
											}
										}
									}
								}
							})
						}
					}
				}(), "res")
			}, "doc", doc, "test", test, "displayName", "groups-of")
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
		const split = exports.split = function() {
			const doc = "Subseqs separated by elements where split? is true.";
			const test = function() {
				const _k0 = [ [ 1, 0, 1 ], _ms.sub(_61_63, 0) ], _v0 = _61_62(_ms.unlazy(Stream), [ [ 1 ], [ 1 ] ]);
				const _k1 = [ [ 0 ], _ms.sub(_61_63, 0) ], _v1 = _61_62(_ms.unlazy(Stream), [ [  ], [  ] ]);
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, split_63) {
				_ms.checkContains(Pred, split_63, "split?");
				return _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					const prev_45idx = _ms.unlazy(Ref_33)(0);
					const cur_45idx = _ms.unlazy(Ref_33)(0);
					loop340 :  while (true) {
						const _$341 = iter.next(), value = _$341.value, done = _$341.done;
						const next_45idx = _ms.lazy(function() {
							return _43(1, _ms.unlazy(get)(cur_45idx))
						});
						switch (true) {
							case _ms.bool(done):
								{
									(yield slice_39(_, _ms.unlazy(get)(prev_45idx), _ms.unlazy(get)(cur_45idx)));
									break loop340
								};
								break
							
							case _ms.bool(split_63(value)):
								{
									(yield slice_39(_, _ms.unlazy(get)(prev_45idx), _ms.unlazy(get)(cur_45idx)));
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
			}, "doc", doc, "test", test, "displayName", "split")
		}();
		exports.default = Seq;
		const displayName = exports.displayName = "Seq";
		return exports
	})
})
//# sourceMappingURL=../at/Seq.js.map