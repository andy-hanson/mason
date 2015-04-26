"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../Bool", "../compare", "../Fun", "../js", "../math/methods", "../Obj", "../private/bootstrap", "../Type/Type", "../Type/Kind", "../Type/Method", "../Type/Pred-Type", "../control", "../Generatorbang", "../math/Num", "./atbang", "./at-Type", "./q", "./Seq/Seq", "./Seq/Stream", "./Set/Setbang", "../control", "../bang", "../math/Num", "../Try", "./at-Type", "./Map/Weak-Id-Mapbang" ], function(exports, Bool_0, compare_1, Fun_2, js_3, methods_4, Obj_5, bootstrap_6, Type_7, Kind_8, Method_9, Pred_45Type_10, control_11, Generator_33_12, Num_13, _64_33_14, _64_45Type_15, _63_16, Seq_17, Stream_18, Set_33_19, control_20, _33_21, Num_22, Try_23, _64_45Type_24, Weak_45Id_45Map_33_25) {
	exports._get = _ms.lazy(function() {
		const Bool = _ms.getDefaultExport(Bool_0), _$2 = _ms.getModule(Bool_0), and = _ms.get(_$2, "and"), not = _ms.get(_$2, "not"), _$3 = _ms.getModule(compare_1), _61_63 = _ms.get(_$3, "=?"), Fun = _ms.getDefaultExport(Fun_2), _$4 = _ms.getModule(Fun_2), Act = _ms.get(_$4, "Act"), identity = _ms.get(_$4, "identity"), Pred = _ms.get(_$4, "Pred"), _$5 = _ms.getModule(js_3), defined_63 = _ms.get(_$5, "defined?"), id_61_63 = _ms.get(_$5, "id=?"), _$6 = _ms.getModule(methods_4), _43 = _ms.get(_$6, "+"), Obj = _ms.getDefaultExport(Obj_5), _$8 = _ms.getModule(bootstrap_6), msDef = _ms.get(_$8, "msDef"), _$9 = _ms.getModule(Type_7), _61_62 = _ms.get(_$9, "=>"), contains_63 = _ms.get(_$9, "contains?"), type_45of = _ms.get(_$9, "type-of"), Kind = _ms.getDefaultExport(Kind_8), Method = _ms.getDefaultExport(Method_9), _$11 = _ms.getModule(Method_9), impl_33 = _ms.get(_$11, "impl!"), _$12 = _ms.getModule(Pred_45Type_10), Any = _ms.get(_$12, "Any"), Opt = _ms.get(_$12, "Opt"), _$14 = _ms.lazyGetModule(control_11), opr = _ms.lazyProp(_$14, "opr"), Ref_33 = _ms.lazyProp(_$14, "Ref!"), get = _ms.lazyProp(_$14, "get"), set_33 = _ms.lazyProp(_$14, "set!"), Generator_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Generator_33_12)
		}), _$16 = _ms.lazyGetModule(Num_13), Nat = _ms.lazyProp(_$16, "Nat"), _$17 = _ms.lazyGetModule(_64_33_14), _45_45_33 = _ms.lazyProp(_$17, "--!"), _$18 = _ms.lazyGetModule(_64_45Type_15), empty = _ms.lazyProp(_$18, "empty"), _63 = _ms.lazy(function() {
			return _ms.getDefaultExport(_63_16)
		}), _$20 = _ms.lazyGetModule(Seq_17), first = _ms.lazyProp(_$20, "first"), seq_61_63 = _ms.lazyProp(_$20, "seq=?"), tail = _ms.lazyProp(_$20, "tail"), Stream = _ms.lazy(function() {
			return _ms.getDefaultExport(Stream_18)
		}), Set_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Set_33_19)
		}), _$24 = _ms.lazyGetModule(control_20), build = _ms.lazyProp(_$24, "build"), if_33 = _ms.lazyProp(_$24, "if!"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_21)
		}), _$25 = _ms.lazyGetModule(_33_21), _33not = _ms.lazyProp(_$25, "!not"), _$26 = _ms.lazyGetModule(Num_22), divisible_63 = _ms.lazyProp(_$26, "divisible?"), _$27 = _ms.lazyGetModule(Try_23), fails_63 = _ms.lazyProp(_$27, "fails?"), _64_45Type = _ms.lazy(function() {
			return _ms.getDefaultExport(_64_45Type_24)
		}), Weak_45Id_45Map_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Weak_45Id_45Map_33_25)
		});
		const exports = { };
		const _64 = Kind(function() {
			const doc = "\"Bag\". Contains a variable number of elements. Most things implementing `iterator` should be @s.\nIf the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.";
			const implementor_45test = function(_64_45type) {
				return _ms.unlazy(if_33)(not(_61_63(_64_45type, _ms.unlazy(Weak_45Id_45Map_33))), function() {
					_ms.unlazy(_33)(contains_63(_ms.unlazy(_64_45Type), _64_45type), "Be sure to make your @ type a @-Type.");
					const _ = _ms.unlazy(empty)(_64_45type);
					return _ms.unlazy(_33)(empty_63, _)
				})
			};
			return {
				doc: doc,
				"implementor-test": implementor_45test,
				displayName: "@"
			}
		}());
		const iterator = exports.iterator = Method(function() {
			const doc = function(_) {
				return _ms.checkContains(_ms.unlazy(Generator_33), "Creates a new Generator! which yields the values in the @. Should create a new one every time.", "res")
			};
			return {
				doc: doc,
				displayName: "iterator"
			}
		}());
		msDef("iterator", iterator);
		const empty_63 = exports["empty?"] = Method(function() {
			const doc = "Whether `count` is 0. Often much faster.";
			const test = function() {
				const _k0 = [ [ ] ], _v0 = true;
				const _k1 = [ [ 1 ] ], _v1 = false;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			const _default = function(_) {
				return _ms.checkContains(Bool, iterator(_).next().done, "res")
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "empty?"
			}
		}());
		impl_33(contains_63, _64, function() {
			const doc = "Whether one of the elements =? em.";
			const test = function() {
				_ms.unlazy(_33)(contains_63, [ 0 ], 0);
				return _ms.unlazy(_33not)(contains_63, [ 0 ], 1)
			};
			return _ms.set(function(_, em) {
				_ms.checkContains(Any, em, "em");
				return any_63(_, function(em_45compare) {
					return _61_63(em, em_45compare)
				})
			}, "doc", doc, "test", test)
		}());
		const fold = exports.fold = function() {
			const doc = "Keeps a state variable `acc` and keeps applying `folder acc em` for the elements, in order.\nReturns the final value.\nIf empty?_, fails unless a `start` value for `acc` is provided. Otherwise `acc` starts as the first element.";
			const test = function() {
				const _k0 = [ [ 1, 2, 3 ], _43 ], _v0 = 6;
				const _k1 = [ [ 1, 2, 3 ], 4, _43 ], _v1 = 10;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, b, c) {
				_ms.checkContains(_64, _, "_");
				const _$70 = function() {
					switch (true) {
						case _ms.bool(defined_63(c)): {
							const start = b;
							const folder = c;
							const rest = _;
							return {
								start: start,
								folder: folder,
								rest: rest
							}
						}
						default: {
							const start = _ms.unlazy(first)(_);
							const folder = b;
							const rest = _ms.unlazy(tail)(_);
							return {
								start: start,
								folder: folder,
								rest: rest
							}
						}
					}
				}(), start = _$70.start, rest = _$70.rest, folder = _$70.folder;
				const acc = _ms.unlazy(Ref_33)(start);
				const iter = iterator(rest);
				loop82: while (true) {
					const _$83 = iter.next(), value = _$83.value, done = _$83.done;
					switch (true) {
						case _ms.bool(done):
							{
								break loop82
							};
							break
						default: {
							_ms.unlazy(set_33)(acc, folder(_ms.unlazy(get)(acc), value))
						}
					}
				};
				return _ms.unlazy(get)(acc)
			}, "doc", doc, "test", test, "displayName", "fold")
		}();
		const each_33 = exports["each!"] = Method(function() {
			const doc = "Calls do-for-each on every element in the @, in order.";
			const test = function() {
				return _ms.unlazy(_33)(_61_63, [ 1, 2, 3 ], _ms.unlazy(build)(function(_yield) {
					return each_33([ 1, 2, 3 ], _yield)
				}))
			};
			const _default = function(_, do_45for_45each) {
				_ms.checkContains(Act, do_45for_45each, "do-for-each");
				const iter = iterator(_);
				loop98: while (true) {
					const _$99 = iter.next(), value = _$99.value, done = _$99.done;
					switch (true) {
						case _ms.bool(done):
							{
								break loop98
							};
							break
						default: {
							do_45for_45each(value)
						}
					}
				}
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "each!"
			}
		}());
		const any_63 = exports["any?"] = function() {
			const doc = "Whether pred? is true for at least one element.";
			const test = function() {
				const _k0 = [ [ 0, 1 ], _ms.sub(_61_63, 1) ], _v0 = true;
				const _k1 = [ [ 0, 1 ], _ms.sub(_61_63, 2) ], _v1 = false;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, _63pred_63) {
				_ms.checkContains(_64, _, "_");
				_ms.checkContains(_ms.sub(Opt, Pred), _63pred_63, "?pred?");
				const pred_63 = _ms.unlazy(opr)(_63pred_63, identity);
				return not(empty_63(_63find(_, pred_63)))
			}, "doc", doc, "test", test, "displayName", "any?")
		}();
		const all_63 = exports["all?"] = function() {
			const doc = "Whether pred? is true for every element.";
			const test = function() {
				const _k0 = [ [ 0, 0 ], _ms.sub(_61_63, 0) ], _v0 = true;
				const _k1 = [ [ 0, 1 ], _ms.sub(_61_63, 0) ], _v1 = false;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, _63pred_63) {
				_ms.checkContains(_64, _, "_");
				_ms.checkContains(_ms.sub(Opt, Pred), _63pred_63, "?pred?");
				const pred_63 = _ms.unlazy(opr)(_63pred_63, identity);
				return empty_63(_63find(_, function(em) {
					return not(pred_63(em))
				}))
			}, "doc", doc, "test", test, "displayName", "all?")
		}();
		const _63find = exports["?find"] = function() {
			const doc = "First element for which pred? is true.\n(To find all, use `keep`.)";
			const test = function() {
				const _k0 = [ [ 0, 1 ], _ms.sub(_61_63, 1) ], _v0 = _ms.unlazy(_63)(1);
				const _k1 = [ [ 0 ], _ms.sub(_61_63, 1) ], _v1 = _ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, pred_63) {
				_ms.checkContains(Pred, pred_63, "pred?");
				const iter = iterator(_);
				const found = _ms.unlazy(Ref_33)(_ms.unlazy(empty)(_ms.unlazy(_63)));
				loop135: while (true) {
					const _$136 = iter.next(), value = _$136.value, done = _$136.done;
					switch (true) {
						case _ms.bool(done):
							{
								break loop135
							};
							break
						case _ms.bool(pred_63(value)):
							{
								_ms.unlazy(set_33)(found, _ms.unlazy(_63)(value));
								break loop135
							};
							break
						default: {
							null
						}
					}
				};
				return _ms.unlazy(get)(found)
			}, "doc", doc, "test", test, "displayName", "?find")
		}();
		const count = exports.count = Method(function() {
			const doc = "Number of elements.";
			const test = function() {
				const _k0 = [ [ ] ], _v0 = 0;
				const _k1 = [ [ 1, 2, 3 ] ], _v1 = 3;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			const _default = function(_) {
				_ms.checkContains(_64, _, "_");
				return _ms.checkContains(_ms.unlazy(Nat), fold(_, 0, _ms.sub(_43, 1)), "res")
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "count"
			}
		}());
		const keep = exports.keep = function() {
			const doc = "Only the elements that satisfy `keep-if?`.";
			const test = function() {
				const _k0 = [ [ 1, 2 ], _ms.sub(_61_63, 2) ], _v0 = _61_62(_ms.unlazy(Stream), [ 2 ]);
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, keep_45if_63) {
				_ms.checkContains(_64, _, "_");
				_ms.checkContains(Pred, keep_45if_63, "keep-if?");
				return _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					loop164: while (true) {
						const _$165 = iter.next(), value = _$165.value, done = _$165.done;
						switch (true) {
							case _ms.bool(done):
								{
									break loop164
								};
								break
							case _ms.bool(keep_45if_63(value)):
								{
									(yield value)
								};
								break
							default: {
								null
							}
						}
					}
				})
			}, "doc", doc, "test", test, "displayName", "keep")
		}();
		const keep_39 = exports["keep'"] = Method(function() {
			const doc = "Type-preserving `keep`.";
			const test = function() {
				const _k0 = [ [ 1, 2 ], _ms.sub(_61_63, 2) ], _v0 = [ 2 ];
				return _ms.map(_k0, _v0)
			};
			const _default = function(_, keep_45if_63) {
				_ms.checkContains(_64, _, "_");
				_ms.checkContains(Pred, keep_45if_63, "keep-if?");
				return _61_62(type_45of(_), keep(_, keep_45if_63))
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "keep'"
			}
		}());
		const map = exports.map = function() {
			const doc = "Stream with `mapper` applied indiviually to the original elements.";
			const test = function() {
				const _k0 = [ [ true, false ], not ], _v0 = _61_62(_ms.unlazy(Stream), [ false, true ]);
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, mapper) {
				_ms.checkContains(_64, _, "_");
				_ms.checkContains(Fun, mapper, "mapper");
				return _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					loop188: while (true) {
						const _$189 = iter.next(), value = _$189.value, done = _$189.done;
						switch (true) {
							case _ms.bool(done):
								{
									break loop188
								};
								break
							default: {
								(yield mapper(value))
							}
						}
					}
				})
			}, "doc", doc, "test", test, "displayName", "map")
		}();
		const map_39 = exports["map'"] = function() {
			const doc = "Type-preserving `map`.";
			const test = function() {
				const _k0 = [ [ true, false ], not ], _v0 = [ false, true ];
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, mapper) {
				_ms.checkContains(_64, _, "_");
				_ms.checkContains(Fun, mapper, "mapper");
				return _61_62(type_45of(_), map(_, mapper))
			}, "doc", doc, "test", test, "displayName", "map'")
		}();
		const fold_45map = exports["fold-map"] = function() {
			const doc = "Performs a map while also carrying some state from one element to the next.\n`mapper-folder` takes in the state and the element,\nand produces `here` (the mapped value) and `next` (the next state value).\nUnlike map, this must be eagerly evaluated, like fold.";
			const test = function() {
				const f = function(acc, em) {
					const here = _43(1, em);
					const next = _43(1, acc);
					return {
						here: here,
						next: next
					}
				};
				const _k0 = [ [ 1, 2, 3 ], 0, f ], _v0 = function() {
					const mapped = [ 2, 3, 4 ];
					const folded = 3;
					return {
						mapped: mapped,
						folded: folded
					}
				}();
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, start, mapper_45folder) {
				_ms.checkContains(_64, _, "_");
				_ms.checkContains(Any, start, "start");
				_ms.checkContains(_ms.sub(Fun, 2, Obj), mapper_45folder, "mapper-folder");
				const acc = _ms.unlazy(Ref_33)(start);
				const mapped = _61_62(Array, map(_, function(em) {
					const _$217 = mapper_45folder(_ms.unlazy(get)(acc), em), here = _ms.checkContains(Any, _$217.here, "here"), next = _ms.checkContains(Any, _$217.next, "next");
					_ms.unlazy(set_33)(acc, next);
					return here
				}));
				const folded = _ms.unlazy(get)(acc);
				return {
					mapped: mapped,
					folded: folded
				}
			}, "doc", doc, "test", test, "displayName", "fold-map")
		}();
		const flat_45map = exports["flat-map"] = function() {
			const doc = "Like `map`, but each mapping produces multiple values.";
			const test = function() {
				const f = function(_) {
					return function() {
						switch (true) {
							case _ms.bool(_ms.unlazy(divisible_63)(_, 2)): {
								return [ _, _ ]
							}
							default: {
								return [ _ ]
							}
						}
					}()
				};
				const _k0 = [ [ 1, 2, 3, 4 ], f ], _v0 = _61_62(_ms.unlazy(Stream), [ 1, 2, 2, 3, 4, 4 ]);
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, mapper) {
				_ms.checkContains(_64, _, "_");
				_ms.checkContains(_ms.sub(Fun, Any, _64), mapper, "mapper");
				return _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					loop236: while (true) {
						const _$237 = iter.next(), value = _$237.value, done = _$237.done;
						switch (true) {
							case _ms.bool(done):
								{
									break loop236
								};
								break
							default: {
								(yield* iterator(mapper(value)))
							}
						}
					}
				})
			}, "doc", doc, "test", test, "displayName", "flat-map")
		}();
		const flat_45map_39 = exports["flat-map'"] = Method(function() {
			const doc = "Type-preserving flat-map.";
			const test = function() {
				const f = function(a) {
					return [ a, a ]
				};
				const _k0 = [ [ 1, 2 ], f ], _v0 = [ 1, 1, 2, 2 ];
				return _ms.map(_k0, _v0)
			};
			const _default = function(_, mapper) {
				_ms.checkContains(_ms.sub(Fun, Any, _64), mapper, "mapper");
				return _61_62(type_45of(_), flat_45map(_, mapper))
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "flat-map'"
			}
		}());
		const flatten = exports.flatten = function() {
			const doc = "For an @ containing many @, produces an @ containing all of their entries combined.\nThis does *not* consider more than 1 nested level, and there *every* element of _ must be an @.\nMore efficient than `fold + _`.";
			const test = function() {
				const _k0 = [ [ [ 1, 2 ], [ 3 ], [ ] ] ], _v0 = _61_62(_ms.unlazy(Stream), [ 1, 2, 3 ]);
				const _k1 = [ [ [ 1 ], [ [ 2 ] ] ] ], _v1 = _61_62(_ms.unlazy(Stream), [ 1, [ 2 ] ]);
				_ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
					return _61_62(Array, flatten([ [ 1 ], 2, [ 3 ] ]))
				});
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_) {
				_ms.checkContains(_ms.sub(_64, _64), _, "_");
				return _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					loop266: while (true) {
						const _$267 = iter.next(), value = _$267.value, done = _$267.done;
						switch (true) {
							case _ms.bool(done):
								{
									break loop266
								};
								break
							default: {
								(yield* iterator(value))
							}
						}
					}
				})
			}, "doc", doc, "test", test, "displayName", "flatten")
		}();
		const flatten_39 = exports["flatten'"] = Method(function() {
			const doc = "Type-preserving flatten.";
			const test = function() {
				const _k0 = [ [ [ 1, 2 ], [ 3 ], [ ] ] ], _v0 = [ 1, 2, 3 ];
				return _ms.map(_k0, _v0)
			};
			const _default = function(_) {
				return _61_62(type_45of(_), flatten(_))
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "flatten'"
			}
		}());
		const _43_43 = exports["++"] = function() {
			const doc = "Concatenation. Sets should override this.";
			const test = function() {
				const _k0 = [ [ 0 ], [ 1 ] ], _v0 = _61_62(_ms.unlazy(Stream), [ 0, 1 ]);
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_64a, _64b) {
				return _ms.checkContains(_ms.unlazy(Stream), _ms.unlazy(Stream)(function*() {
					(yield* iterator(_64a));
					return (yield* iterator(_64b))
				}), "res")
			}, "doc", doc, "test", test, "displayName", "++")
		}();
		const _43_43_39 = exports["++'"] = Method(function() {
			const doc = "Type-preserving +.";
			const test = function() {
				const _k0 = [ [ 0 ], [ 1 ] ], _v0 = [ 0, 1 ];
				return _ms.map(_k0, _v0)
			};
			const _default = function(_64a, _64b) {
				return _61_62(type_45of(_64a), _43_43(_64a, _64b))
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "++'"
			}
		}());
		const _45_45 = exports["--"] = function() {
			const doc = "@ without any of the elements in `remove`.\nRemoves the *first* occurrence of each element.";
			const test = function() {
				const _k0 = [ [ 1, 2, 1 ], [ 1 ] ], _v0 = _61_62(_ms.unlazy(Stream), [ 2, 1 ]);
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, remove) {
				_ms.checkContains(_64, remove, "remove");
				return _ms.checkContains(_64, _ms.unlazy(Stream)(function*() {
					const iter = iterator(_);
					const remove_45us = _61_62(_ms.unlazy(Set_33), remove);
					loop307: while (true) {
						const _$308 = iter.next(), value = _$308.value, done = _$308.done;
						switch (true) {
							case _ms.bool(done):
								{
									break loop307
								};
								break
							default: {
								{
									const _ = value;
									switch (true) {
										case _ms.bool(_ms.contains(remove_45us, _)):
											{
												_ms.unlazy(_45_45_33)(remove_45us, [ value ])
											};
											break
										default: {
											(yield value)
										}
									}
								}
							}
						}
					}
				}), "res")
			}, "doc", doc, "test", test, "displayName", "--")
		}();
		const _45_45_39 = exports["--'"] = Method(function() {
			const doc = "Type-preserving --.";
			const test = function() {
				const _k0 = [ [ 1, 2, 1 ], [ 1 ] ], _v0 = [ 2, 1 ];
				return _ms.map(_k0, _v0)
			};
			const _default = function(_, remove) {
				_ms.checkContains(_64, remove, "remove");
				return _61_62(type_45of(_), _45_45(_, remove))
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "--'"
			}
		}());
		impl_33(_61_63, _64, function() {
			const test = function() {
				return _ms.unlazy(_33)(_61_63, [ 1 ], [ 1 ])
			};
			return _ms.set(function(_64a, _64b) {
				return and(id_61_63(type_45of(_64a), type_45of(_64b)), _ms.lazy(function() {
					return _ms.unlazy(seq_61_63)(_64a, _64b)
				}))
			}, "test", test)
		}());
		exports.default = _64;
		const displayName = exports.displayName = "@";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQThCQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsWUFBSSxnQkFBSTtBQUFBLEdBQ1AsWUFDQztBQUFBLEdBQ0QsMkJBQW1CLFNBQUEsWUFDbEI7QUFBQSw2QkFBSSxJQUFLLE9BQUEsOENBQTJCLFdBQ25DO0FBQUEscUJBQUUsb0NBQUEsYUFBMkI7QUFBQSxLQUM3Qiw0QkFBSTtBQUFBLDRCQUNKLFVBQVM7QUFBQTtBQUFBO0FBQUEsVUFQSjtBQUFBOzs7OztFQVNSLG9DQUFVLGtCQUFNO0FBQUEsR0FDZixZQUFNLFNBQVksR0FDakI7QUFBQSx1REFBQzs7VUFGYTtBQUFBOzs7O0VBR2hCLE1BQU8sWUFBUDtBQUFBLEVBRUEscUNBQVEsa0JBQU07QUFBQSxHQUNiLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLGFBQVM7QUFBQSxJQUNYLFlBQUEsRUFBRSxFQUFFLGFBQVM7QUFBQTs7R0FDZCxpQkFBVSxTQUFNLEdBQ2Y7QUFBQSw2QkFEVSxNQUNWLFNBQUE7O1VBTlk7QUFBQTs7Ozs7O0VBU2IsUUFBQSxhQUFBLGdCQUFpQjtBQUFBLEdBQ2hCLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLG9CQUFBLGFBQVksRUFBRSxLQUFJO0FBQUEsOEJBQ2xCLGFBQWUsRUFBRSxLQUFJO0FBQUE7QUFBQSxrQkFDckIsU0FBQSxHQUFFLElBQ0Y7QUFBQSxzQkFESztXQUNMLE9BQUssR0FBRyxTQUFBLGNBQ1A7QUFBQSxZQUFBLE9BQUEsSUFBQTtBQUFBO0FBQUE7O0VBRUgsdUNBQUs7QUFBQSxHQUNKLFlBQ0M7QUFBQSxHQUNELGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLEVBQUUsR0FBRSxHQUFFLEtBQVIsYUFBbUI7QUFBQSxJQUNuQixZQUFBLEVBQUUsRUFBRSxHQUFFLEdB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QUFBO0FBQUE7bUJBRWQ7QUFBQSxXQUFHLE9BQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0VBRVgsbUNBQUssa0JBQU07QUFBQSxHQUNWLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLEVBQUUsR0FBRSxHQUFFLEtBQUksRUFBRSxhQUFTLEVBQUUsR0FBRTtBQUFBOztHQUM1QixpQkFBVSxTQUFBLEdBQUUsUUFDWDtBQUFBLHNCQURrQjtXQUNsQixPQUFBLFVBQUcsSUFBUyxPQUFJLEdBQUo7QUFBQTtBQUFBLFVBTEg7QUFBQTs7Ozs7O0VBT1gsUUFBQSxRQUFBLGdCQUFVO0FBQUEsR0FDVCxhQUFPLFdBQ047QUFBQSwyQkFBQSxRQUFLLEVBQUUsS0FBSSxFQUFFO0FBQUE7QUFBQSxrQkFDYixTQUFBLE1BQUcsTUFDSDtBQUFBLFdBQUEsSUFBSSxTQUFNLFVBQUEsT0FBYSxVQUFBO2tDQUFlLE1BQUE7QUFBQTtBQUFBOztvQkFFekM7QUFBQSxFQTNVQSwwQ0FBQTtBQUFBIiwiZmlsZSI6ImF0L2F0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=