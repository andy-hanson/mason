"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./methods", "./private/js-impl", "./Type/Alias-Type", "./Type/Method", "./at/at", "./at/at-Type", "./at/Map/Map", "./at/Map/Hash-Mapbang", "./at/Map/Mapbang", "./at/Map/Weak-Id-Mapbang", "./at/Seq/Seq", "./Obj", "./Try", "./bang", "./at/Seq/Seq", "./compare", "./control", "./math/methods" ], function(exports, methods_0, js_45impl_1, Alias_45Type_2, Method_3, _64_4, _64_45Type_5, Map_6, Hash_45Map_33_7, Map_33_8, Weak_45Id_45Map_33_9, Seq_10, Obj_11, Try_12, _33_13, Seq_14, compare_15, control_16, methods_17) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(methods_0), sub = _ms.get(_$2, "sub"), _$3 = _ms.getModule(js_45impl_1), iCurry = _ms.get(_$3, "iCurry"), Alias_45Type = _ms.getDefaultExport(Alias_45Type_2), Method = _ms.getDefaultExport(Method_3), _$5 = _ms.getModule(Method_3), impl_33 = _ms.get(_$5, "impl!"), self_45impl_33 = _ms.get(_$5, "self-impl!"), _64 = _ms.lazy(function() {
			return _ms.getDefaultExport(_64_4)
		}), _$7 = _ms.lazyGetModule(_64_4), _43_43 = _ms.lazyProp(_$7, "++"), each_33 = _ms.lazyProp(_$7, "each!"), map = _ms.lazyProp(_$7, "map"), map_39 = _ms.lazyProp(_$7, "map'"), _$8 = _ms.lazyGetModule(_64_45Type_5), empty = _ms.lazyProp(_$8, "empty"), Map = _ms.lazy(function() {
			return _ms.getDefaultExport(Map_6)
		}), Hash_45Map_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Hash_45Map_33_7)
		}), _$11 = _ms.lazyGetModule(Map_33_8), get_45or_45add_33 = _ms.lazyProp(_$11, "get-or-add!"), Weak_45Id_45Map_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Weak_45Id_45Map_33_9)
		}), _$13 = _ms.lazyGetModule(Seq_10), rtail = _ms.lazyProp(_$13, "rtail"), last = _ms.lazyProp(_$13, "last"), Obj = _ms.lazy(function() {
			return _ms.getDefaultExport(Obj_11)
		}), _$14 = _ms.lazyGetModule(Obj_11), Obj_45_62Map = _ms.lazyProp(_$14, "Obj->Map"), _$15 = _ms.lazyGetModule(Try_12), oh_45no_33 = _ms.lazyProp(_$15, "oh-no!"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_13)
		}), _$18 = _ms.lazyGetModule(Seq_14), seq_61_63 = _ms.lazyProp(_$18, "seq=?"), _$19 = _ms.lazyGetModule(compare_15), _61_63 = _ms.lazyProp(_$19, "=?"), _$20 = _ms.lazyGetModule(control_16), build = _ms.lazyProp(_$20, "build"), _$21 = _ms.lazyGetModule(methods_17), _43 = _ms.lazyProp(_$21, "+");
		const exports = { };
		const Fun = function() {
			const doc = "TODO\n<describe Fun vs Callable>\nsub does nothing, but here is the syntax.\n* Fun[Num Str] takes a Num and returns a Str.\n* Fun[2] takes 2 arguments.\n* Fun[2 Str] takes 2 arguments and returns a Str.\n* Fun without a sub is assumed to be a one-argument function, so never write Fun[1].";
			return _ms.set(global.Function, "doc", doc, "displayName", "Fun")
		}();
		const Act = exports.Act = Alias_45Type(function() {
			const doc = "A function returning nothing.\nFun[Num] describes a function taking nothing and returning a Num;\nAct[Num] describes a function taking a Num and returning nothing.";
			const alias_45of = Fun;
			return {
				doc: doc,
				"alias-of": alias_45of,
				displayName: "Act"
			}
		}());
		const Pred = exports.Pred = Alias_45Type(function() {
			const doc = "Fun[Any Bool].";
			const alias_45of = Fun;
			return {
				doc: doc,
				"alias-of": alias_45of,
				displayName: "Pred"
			}
		}());
		const apply = exports.apply = function() {
			const doc = "Calls the function with the given arguments list.";
			const test = function() {
				const _k0 = [ _ms.unlazy(_43), [ 1, 2 ] ], _v0 = 3;
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, args) {
				_ms.checkContains(Fun, _, "_");
				_ms.checkContains(_ms.unlazy(_64), args, "args");
				return Function.apply.call(_, null, [ ].concat(_ms.arr(args)))
			}, "doc", doc, "test", test, "displayName", "apply")
		}();
		const call = exports.call = function() {
			const doc = "Calls the function with the given arguments.";
			const test = function() {
				const _k0 = [ _ms.unlazy(_43), 1, 2 ], _v0 = 3;
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_) {
				const args = [ ].slice.call(arguments, 1);
				_ms.checkContains(Fun, _, "_");
				return Function.apply.call(_, null, [ ].concat(_ms.arr(args)))
			}, "doc", doc, "test", test, "displayName", "call")
		}();
		const fun_45copy = exports["fun-copy"] = function() {
			const doc = "Creates a new function with identical functionality.\n*Does* copy any values captured by its scope.\nDoes *not* copy any properties on the old function.";
			const test = function() {
				const f1 = function() {
					const doc = "f1";
					return _ms.set(function(_) {
						return _
					}, "doc", doc, "displayName", "f1")
				}();
				const f2 = function() {
					const doc = "f2";
					return _ms.set(fun_45copy(f1), "doc", doc, "displayName", "f2")
				}();
				_ms.unlazy(_33)(_ms.unlazy(_61_63), f1.doc, "f1");
				_ms.unlazy(_33)(_ms.unlazy(_61_63), f2.doc, "f2");
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), f1(1), f2(1))
			};
			return _ms.set(function(_) {
				_ms.checkContains(Fun, _, "_");
				return Fun.prototype.call.bind(_, null)
			}, "doc", doc, "test", test, "displayName", "fun-copy")
		}();
		const identity = exports.identity = function() {
			const doc = "Outputs its input unmodified.";
			const test = function() {
				const _k0 = [ 1 ], _v0 = 1;
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_) {
				return _
			}, "doc", doc, "test", test, "displayName", "identity")
		}();
		const noop = exports.noop = function() {
			const doc = "Does nothing.";
			return _ms.set(function() {
				return null
			}, "doc", doc, "displayName", "noop")
		}();
		const id_45memoize = exports["id-memoize"] = function() {
			const doc = "When an Obj is passed into `fun`, stores the result in a `Weak-Id-Map!`\nand uses that if the exact same (`id=?`) Obj is used again.";
			const test = function() {
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63), [ 1, 2, 1 ], _ms.unlazy(build)(function(_yield) {
					const get_45a = id_45memoize(function(x) {
						_yield(x.a);
						return x.a
					});
					const a1 = {
						a: 1
					};
					_ms.unlazy(_33)(_ms.unlazy(_61_63), get_45a(a1), 1);
					_ms.unlazy(_33)(_ms.unlazy(_61_63), get_45a(a1), 1);
					const a2 = {
						a: 2
					};
					_ms.unlazy(_33)(_ms.unlazy(_61_63), get_45a(a2), 2);
					const a1b = {
						a: 1
					};
					return _ms.unlazy(_33)(_ms.unlazy(_61_63), get_45a(a1b), 1)
				}))
			};
			return _ms.set(function(_) {
				_ms.checkContains(Fun, _, "_");
				const wm = _ms.unlazy(empty)(_ms.unlazy(Weak_45Id_45Map_33));
				return function(arg) {
					_ms.checkContains(_ms.unlazy(Obj), arg, "arg");
					return _ms.unlazy(get_45or_45add_33)(wm, arg, _ms.lazy(function() {
						return _(arg)
					}))
				}
			}, "doc", doc, "test", test, "displayName", "id-memoize")
		}();
		const hash_45memoize = exports["hash-memoize"] = function() {
			const doc = "Stores the argument every time you call it,\nand re-uses the result if called again with the same argument.\nThis will make those arguments unavailable for garbage collection...";
			const test = function() {
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63), [ 1, 2 ], _ms.unlazy(build)(function(_yield) {
					const get_45a = hash_45memoize(function(x) {
						_yield(x.a);
						return x.a
					});
					const a1 = call(function() {
						const a = 1;
						return {
							a: a
						}
					});
					_ms.unlazy(_33)(_ms.unlazy(_61_63), get_45a(a1), 1);
					_ms.unlazy(_33)(_ms.unlazy(_61_63), get_45a(a1), 1);
					const a2 = {
						a: 2
					};
					_ms.unlazy(_33)(_ms.unlazy(_61_63), get_45a(a2), 2);
					const a1b = call(function() {
						const a = 1;
						return {
							a: a
						}
					});
					_ms.unlazy(_33)(_ms.unlazy(_61_63), a1, a1b);
					return _ms.unlazy(_33)(_ms.unlazy(_61_63), get_45a(a1b), 1)
				}))
			};
			return _ms.set(function(_) {
				_ms.checkContains(Fun, _, "_");
				const hm = _ms.unlazy(empty)(_ms.unlazy(Hash_45Map_33));
				return function(arg) {
					_ms.checkContains(_ms.unlazy(Obj), arg, "arg");
					return _ms.unlazy(get_45or_45add_33)(hm, arg, _ms.lazy(function() {
						return _(arg)
					}))
				}
			}, "doc", doc, "test", test, "displayName", "hash-memoize")
		}();
		const spread = exports.spread = function() {
			const doc = "Applies `fun`, starting with the given args, to each entry in an arguments list or map.";
			const test = function() {
				const all_454 = function(a, b, c, d) {
					return [ a, b, c, d ]
				};
				const x = spread(all_454, 1, 2, 3, function() {
					const _0 = 4;
					const _1 = 5;
					return [ _0, _1 ]
				}());
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63), x, function() {
					const _0 = [ 1, 2, 3, 4 ];
					const _1 = [ 1, 2, 3, 5 ];
					return [ _0, _1 ]
				}());
				const y = spread(all_454, 1, 2, function() {
					const _k0 = 3, _v0 = 4;
					const _k1 = 5, _v1 = 6;
					return _ms.map(_k0, _v0, _k1, _v1)
				}());
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63), y, function() {
					const _0 = [ 1, 2, 3, 4 ];
					const _1 = [ 1, 2, 5, 6 ];
					return [ _0, _1 ]
				}());
				const z = spread(all_454, 1, 2, function() {
					const three = 4;
					const five = 6;
					return {
						three: three,
						five: five,
						displayName: "z"
					}
				}());
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63), z, function() {
					const _0 = [ 1, 2, "three", 4 ];
					const _1 = [ 1, 2, "five", 6 ];
					const _2 = [ 1, 2, "displayName", "z" ];
					return [ _0, _1, _2 ]
				}())
			};
			return _ms.set(function(fun) {
				const args = [ ].slice.call(arguments, 1);
				_ms.checkContains(Fun, fun, "fun");
				const init_45args = _ms.unlazy(rtail)(args);
				const last_45arg = _ms.unlazy(last)(args);
				const _64spreaded = function() {
					const _ = last_45arg;
					switch (true) {
						case _ms.bool(_ms.contains(_ms.unlazy(Map), _)): {
							return _ms.unlazy(map_39)(_, function(pair) {
								const _$163 = pair, key = _$163.key, val = _$163.val;
								return [ key, val ]
							})
						}
						case _ms.bool(_ms.contains(_ms.unlazy(_64), _)): {
							return _ms.unlazy(map)(_, function(em) {
								return [ em ]
							})
						}
						case _ms.bool(_ms.contains(_ms.unlazy(Obj), _)): {
							return _ms.unlazy(map_39)(_ms.unlazy(Obj_45_62Map)(_), function(pair) {
								const _$170 = pair, key = _$170.key, val = _$170.val;
								return [ key, val ]
							})
						}
						default: {
							return _ms.unlazy(oh_45no_33)(("Can only spread a @ or Map, not " + _ms.show(_)))
						}
					}
				}();
				return _ms.checkContains(_ms.unlazy(_64), _ms.unlazy(map)(_64spreaded, function(spreaded) {
					const all_45args = _ms.unlazy(_43_43)(init_45args, spreaded);
					return Function.apply.call(fun, null, [ ].concat(_ms.arr(all_45args)))
				}), "res")
			}, "doc", doc, "test", test, "displayName", "spread")
		}();
		const spread_33 = exports["spread!"] = function() {
			const doc = "TODO";
			const test = function() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), [ 1, 2, 3 ], _ms.unlazy(build)(function(yield_33) {
					const f = function(a, b, c) {
						yield_33(a);
						yield_33(b);
						return yield_33(c)
					};
					return spread_33(f, 1, function() {
						const _k0 = 2, _v0 = 3;
						return _ms.map(_k0, _v0)
					}())
				}))
			};
			return _ms.set(function(fun) {
				const args = [ ].slice.call(arguments, 1);
				return _ms.unlazy(each_33)(Function.apply.call(spread, null, [ ].concat(fun, _ms.arr(args))), noop)
			}, "doc", doc, "test", test, "displayName", "spread!")
		}();
		const thunk = exports.thunk = function() {
			const doc = "Makes function which, when called, returns `a`.";
			const test = function() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), thunk(1)(), 1)
			};
			return _ms.set(function(_) {
				return function() {
					return _
				}
			}, "doc", doc, "test", test, "displayName", "thunk")
		}();
		const curry = function() {
			const doc = "Creates a function which calls `f` with the given arguments first.";
			const test = function() {
				const _431 = _ms.sub(_ms.unlazy(_43), 1);
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _431(1), 2);
				const all_453 = function(a, b, c) {
					return [ a, b, c ]
				};
				const one_45two = _ms.sub(all_453, 1, 2);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), one_45two(3), [ 1, 2, 3 ])
			};
			return _ms.set(iCurry, "doc", doc, "test", test, "displayName", "curry")
		}();
		impl_33(sub, Fun, curry);
		impl_33(sub, Method, curry);
		self_45impl_33(sub, Fun, function() {
			const doc = "Subbing Fun does nothing and is only for documentation.\nE.g. Fun[Int Str] takes an Int and returns a Str.";
			const test = function() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), _ms.sub(Fun, Fun, Fun), Fun)
			};
			return _ms.set(function() {
				return Fun
			}, "doc", doc, "test", test)
		}());
		exports.default = Fun;
		const displayName = exports.displayName = "Fun";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9GdW4ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQXNCQTtBQUFBOzs7Ozs7Ozs7Ozs7OztFQUFBLHVCQUFLO0FBQUEsR0FDSixZQUNDO0FBQUEsa0JBQ0Q7O0VBRUQsMEJBQUssd0JBQVU7QUFBQSxHQUNkLFlBQ0M7QUFBQSxHQUNELG1CQUFVO0FBQUEsVUFISTtBQUFBOzs7OztFQUtmLDRCQUFNLHdCQUFVO0FBQUEsR0FDZixZQUFNO0FBQUEsR0FDTixtQkFBVTtBQUFBLFVBRks7QUFBQTs7Ozs7RUFJaEIseUNBQU07QUFBQSxHQUNMLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxtQkFBSSxFQUFFLEdBQUUsYUFBUztBQUFBOztrQkFDakIsU0FBQSxHQUFNLE1BQ047QUFBQSxzQkFERTs7K0JBQ0YsNEJBQUU7QUFBQTs7RUFFSix1Q0FBSztBQUFBLEdBQ0osWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsSUFBQSxZQUFBLG1CQUFJLEdBQUUsV0FBTztBQUFBOztrQkFDYixTQUFBLEdBQ0E7QUFBQTtzQkFERTsrQkFDRiw0QkFBRTtBQUFBOztFQUVKLG9EQUFTO0FBQUEsR0FDUixZQUNDO0FBQUEsR0FDRCxhQUFPLFdBQ047QUFBQSxJQUFBLHNCQUFJO0FBQUEsS0FDSCxZQUFNO0FBQUEsb0JBQ0wsU0FBQSxHQUNBO0FBQUEsYUFBQTtBQUFBOztJQUNGLHNCQUFJO0FBQUEsS0FDSCxZQUFNO0FBQUEsb0JBQ04sV0FBQTs7d0NBQ0ksUUFBUTtBQUFBLHdDQUNSLFFBQVE7QUFBQSwrQ0FDUixHQUFJLElBQUcsR0FBSTtBQUFBO0FBQUEsa0JBRWhCLFNBQUEsR0FFQTtBQUFBLHNCQUZFO1dBRUYsd0JBQXdCLEdBQUU7QUFBQTs7RUFFNUIsK0NBQVM7QUFBQSxHQUNSLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxF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QUFBQSxRQUFBLGNBQVU7ZUFDVixFQUFBLEtBQUE7QUFBQTtBQUFBO0FBQUEsTUFDRiw0Q0FBQSxLQUNDO0FBQUEsOEJBQUksR0FBRyxTQUFBLElBQ047QUFBQSxlQUFBLEVBQUE7QUFBQTtBQUFBO0FBQUEsTUFDRiw0Q0FBQSxLQUNDO0FBQUEsMERBQUssSUFBVyxTQUFBLE1BQ2Y7QUFBQSxRQUFBLGNBQVU7ZUFDVixFQUFBLEtBQUE7QUFBQTtBQUFBO0FBQUEsZUFFRDtBQUFBLHFDQUFRLCtDQUFpQztBQUFBO0FBQUE7QUFBQTtBQUFBLDhEQUMzQyxhQUFlLFNBQUEsVUFDZDtBQUFBLEtBQUEsc0NBQVcsYUFBQTtBQUFBLGdDQUNYLDhCQUFJO0FBQUE7OztFQUVQLGtEQUFRO0FBQUEsR0FDUCxZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSwrQ0FBSyxFQUFFLEdBQUUsR0FBRSx1QkFBWSxTQUFBLFVBQ3RCO0FBQUEsS0FBQSxVQUFLLFNBQUEsR0FBRSxHQUFFLEdBQ1I7QUFBQSxNQUFBLFNBQUE7QUFBQSxNQUNBLFNBQUE7QUFBQSxhQUNBLFNBQUE7QUFBQTtBQUFBLFlBQ0QsVUFBQSxHQUFVLGNBQUM7QUFBQSxNQUNWLFlBQUEsU0FBSztBQUFBOzs7O2tCQUNQLFNBQUEsS0FDQTtBQUFBO21EQUFNLHlCQUFBLGFBQVksU0FBbEI7QUFBQTs7RUFFRix5Q0FBTTtBQUFBLEdBQ0wsWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsK0NBQUssTUFBTyxNQUFLO0FBQUE7QUFBQSxrQkFDakIsU0FBQSxHQUNBO0FBQUEsV0FBQyxXQUNBO0FBQUEsWUFBQTtBQUFBO0FBQUE7O0VBRUgseUJBQU87QUFBQSxHQUNOLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsc0NBQU87QUFBQSx3Q0FDRixLQUFJLElBQUc7QUFBQSxJQUNaLGdCQUFTLFNBQUEsR0FBRSxHQUFFLEdBQ1o7QUFBQSxZQUFBLEVBQUEsR0FBQSxHQUFBO0FBQUE7QUFBQSxJQUNELDBCQUFVLFNBQU0sR0FBRTtBQUFBLCtDQUNiLFVBQVMsSUFBRyxFQUFFLEdBQUUsR0FBRTtBQUFBO0FBQUEsa0JBQ3hCOztFQUVELFFBQUEsS0FBQSxLQUFBO0FBQUEsRUFFQSxRQUFBLEtBQUEsUUFBQTtBQUFBLEVBRUEsZUFBQSxLQUFBLGdCQUFrQjtBQUFBLEdBQ2pCLFlBQ0M7QUFBQSxHQUNELGFBQU8sV0FDTjtBQUFBLHVEQUFLLEtBQUcsS0FBQSxNQUFSO0FBQUE7QUFBQSxrQkFDQSxXQUNBO0FBQUEsV0FBQTtBQUFBOztvQkFFRjtBQUFBLEVBN05BLDBDQUFBO0FBQUEiLCJmaWxlIjoiRnVuLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=