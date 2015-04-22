"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../bang", "../../at/at", "../../at/at-Type", "../../at/Arraybang", "../../at/Seq", "../../at/Stream", "../../Bool", "../../compare", "../../control", "../../Fun", "../../Generatorbang", "../../math/Num", "../../math/methods", "../../Str", "../../Try" ], function(exports, _33_0, _64_1, _64_45Type_2, Array_33_3, Seq_4, Stream_5, Bool_6, compare_7, control_8, Fun_9, Generator_33_10, Num_11, methods_12, Str_13, Try_14) {
	exports._get = _ms.lazy(function() {
		const _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_0)
		}), _$2 = _ms.lazyGetModule(_33_0), _33not = _ms.lazyProp(_$2, "!not"), _64 = _ms.lazy(function() {
			return _ms.getDefaultExport(_64_1)
		}), _$3 = _ms.lazyGetModule(_64_1), count = _ms.lazyProp(_$3, "count"), map = _ms.lazyProp(_$3, "map"), _$4 = _ms.lazyGetModule(_64_45Type_2), empty = _ms.lazyProp(_$4, "empty"), Array_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Array_33_3)
		}), _$6 = _ms.lazyGetModule(Seq_4), seq_61_63 = _ms.lazyProp(_$6, "seq=?"), Stream = _ms.lazy(function() {
			return _ms.getDefaultExport(Stream_5)
		}), _$8 = _ms.lazyGetModule(Bool_6), and = _ms.lazyProp(_$8, "and"), _$9 = _ms.lazyGetModule(compare_7), _61_63 = _ms.lazyProp(_$9, "=?"), _60_63 = _ms.lazyProp(_$9, "<?"), _60_61_63 = _ms.lazyProp(_$9, "<=?"), _$10 = _ms.lazyGetModule(control_8), Ref_33 = _ms.lazyProp(_$10, "Ref!"), get = _ms.lazyProp(_$10, "get"), set_33 = _ms.lazyProp(_$10, "set!"), Fun = _ms.lazy(function() {
			return _ms.getDefaultExport(Fun_9)
		}), _$11 = _ms.lazyGetModule(Fun_9), noop = _ms.lazyProp(_$11, "noop"), Generator_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Generator_33_10)
		}), _$12 = _ms.lazyGetModule(Generator_33_10), each_126 = _ms.lazyProp(_$12, "each~"), gen_45next_33 = _ms.lazyProp(_$12, "gen-next!"), Num = _ms.lazy(function() {
			return _ms.getDefaultExport(Num_11)
		}), _$13 = _ms.lazyGetModule(Num_11), divisible_63 = _ms.lazyProp(_$13, "divisible?"), Int = _ms.lazyProp(_$13, "Int"), _$14 = _ms.lazyGetModule(methods_12), _43 = _ms.lazyProp(_$14, "+"), _45 = _ms.lazyProp(_$14, "-"), _42 = _ms.lazyProp(_$14, "*"), _47 = _ms.lazyProp(_$14, "/"), Str = _ms.lazy(function() {
			return _ms.getDefaultExport(Str_13)
		}), _$16 = _ms.lazyGetModule(Try_14), fails_63 = _ms.lazyProp(_$16, "fails?");
		const exports = { };
		const doc = exports.doc = "Making sure the code in README.md actually works.";
		const test = function() {
			const my_45obj = function() {
				const one = 1;
				const two = 2;
				return {
					one: one,
					two: two,
					displayName: "my-obj"
				}
			}();
			_ms.unlazy(_33)(_ms.unlazy(_61_63), my_45obj.one, 1);
			_ms.unlazy(_33)(_ms.unlazy(_61_63), my_45obj.two, 2);
			const this_45is_45true = true;
			_ms.unlazy(_33)(_ms.unlazy(_61_63), this_45is_45true, true);
			const my_45list = function() {
				const _0 = 1;
				const _1 = 2;
				return [ _0, _1 ]
			}();
			_ms.unlazy(_33)(_ms.unlazy(_61_63), my_45list, [ 1, 2 ]);
			const my_45map = function() {
				const _k0 = 1, _v0 = 2;
				const _k1 = 2, _v1 = 4;
				return _ms.map(_k0, _v0, _k1, _v1)
			}();
			_ms.unlazy(_33)(_ms.unlazy(_61_63), _ms.sub(my_45map, 1), 2);
			_ms.unlazy(_33)(_ms.unlazy(_61_63), _ms.sub(my_45map, 2), 4);
			const my_45list_452 = function() {
				const _0 = 1;
				const two = _ms.unlazy(_43)(1, 1);
				const _1 = two;
				return [ _0, _1 ]
			}();
			_ms.unlazy(_33)(_ms.unlazy(_61_63), my_45list, my_45list_452);
			const my_45obj_452 = function() {
				const displayName = "my-obj";
				const one = 1;
				const two = _ms.unlazy(_43)(1, 1);
				return {
					displayName: displayName,
					one: one,
					two: two
				}
			}();
			_ms.unlazy(_33)(_ms.unlazy(_61_63), my_45obj, my_45obj_452);
			const _$52 = my_45obj_452, one = _$52.one, two = _$52.two;
			_ms.unlazy(_33)(_ms.unlazy(_61_63), one, 1);
			_ms.unlazy(_33)(_ms.unlazy(_61_63), two, 2);
			const two_452 = function() {
				const one = 1;
				return _ms.unlazy(_43)(one, one)
			}();
			_ms.unlazy(_33)(_ms.unlazy(_61_63), two_452, 2);
			const identity = function(a) {
				return a
			};
			_ms.unlazy(_33)(_ms.unlazy(_61_63), identity(1), 1);
			const two_45of = function(a) {
				const _0 = a;
				const _1 = a;
				return [ _0, _1 ]
			};
			_ms.unlazy(_33)(_ms.unlazy(_61_63), two_45of(1), [ 1, 1 ]);
			const pair = function(a, b) {
				const first = a;
				const second = b;
				return {
					first: first,
					second: second
				}
			};
			_ms.unlazy(_33)(_ms.unlazy(_61_63), pair(1, 2), function() {
				const first = 1;
				const second = 2;
				return {
					first: first,
					second: second
				}
			}());
			_ms.unlazy(_33)(_ms.unlazy(_61_63), identity(pair(two_45of(1), two_45of(2))), function() {
				const first = [ 1, 1 ];
				const second = [ 2, 2 ];
				return {
					first: first,
					second: second
				}
			}());
			identity(pair(two_45of(1), two_45of(2)));
			_ms.unlazy(_33)(_ms.unlazy(seq_61_63), [ 2, 4, 6 ], _ms.unlazy(map)([ 1, 2, 3 ], function(x) {
				return _ms.unlazy(_42)(x, 2)
			}));
			const half = function(a) {
				_ms.unlazy(_33)(_ms.unlazy(divisible_63), a, 2);
				const res = _ms.unlazy(_47)(a, 2);
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _ms.unlazy(_42)(res, 2), a);
				return res
			};
			_ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
				return half(1)
			});
			_ms.unlazy(_33)(_ms.unlazy(_61_63), half(2), 1);
			const one_451 = _ms.checkContains(_ms.unlazy(Int), 1, "one-1");
			const Str_45_62Num = function(str) {
				_ms.checkContains(_ms.unlazy(Str), str, "str");
				return _ms.checkContains(_ms.unlazy(Num), _ms.unlazy(Num).parseFloat(str), "res")
			};
			_ms.unlazy(_33)(_ms.unlazy(_61_63), Str_45_62Num("3"), 3);
			const ints = _ms.checkContains(_ms.sub(_ms.unlazy(_64), _ms.unlazy(Int)), function() {
				const _0 = 1;
				const _1 = 2;
				return [ _0, _1 ]
			}(), "ints");
			_ms.unlazy(noop)(ints);
			const twice = function(x) {
				return _ms.unlazy(_42)(2, x)
			};
			const two_45and_45a_45half_45of = function(_) {
				_ms.checkContains(_ms.unlazy(Num), _, "_");
				return _ms.unlazy(_43)(twice(_), half(_))
			};
			_ms.unlazy(_33)(_ms.unlazy(_61_63), two_45and_45a_45half_45of(2), 5);
			const is_45str_63 = function(_) {
				return _ms.contains(_ms.unlazy(Str), _)
			};
			_ms.unlazy(_33)(is_45str_63, "");
			const rate_45guess = function(_) {
				return function() {
					switch (true) {
						case _ms.bool(_ms.unlazy(_61_63)(_, 7)): {
							return "You got it!"
						}
						case _ms.bool(_ms.contains(_ms.unlazy(Num), _)): {
							return ("Off by " + _ms.show(_ms.unlazy(_45)(_, 7)))
						}
						default: {
							return "Try using a number..."
						}
					}
				}()
			};
			_ms.unlazy(_33)(_ms.unlazy(_61_63), rate_45guess(7), "You got it!");
			_ms.unlazy(_33)(_ms.unlazy(_61_63), rate_45guess(9), "Off by 2");
			_ms.unlazy(_33)(_ms.unlazy(_61_63), rate_45guess("seven"), "Try using a number...");
			_ms.unlazy(_33)(_ms.unlazy(_61_63), (("One plus one is " + _ms.show(_ms.unlazy(_43)(1, 1))) + "."), "One plus one is 2.");
			const x = (("We hold these truths to be self-evident,\nthat one plus one is " + _ms.show(_ms.unlazy(_43)(1, 1))) + ".");
			_ms.unlazy(_33)(_ms.unlazy(_61_63), x, "We hold these truths to be self-evident,\nthat one plus one is 2.");
			_ms.unlazy(_33)(_ms.unlazy(_61_63), _ms.unlazy(count)("\t\n{\\"), 4);
			const arr = _ms.unlazy(empty)(_ms.unlazy(Array_33));
			const log_33 = function(_) {
				return arr.push(_)
			};
			const i = _ms.unlazy(Ref_33)(10);
			loop142: while (true) {
				{
					const _ = _ms.unlazy(get)(i);
					switch (true) {
						case _ms.bool(_ms.unlazy(_60_63)(0, _)):
							{
								log_33(_);
								_ms.unlazy(set_33)(i, _ms.unlazy(_45)(_, 1))
							};
							break
						default: {
							break loop142;
							log_33("This line is never run")
						}
					}
				}
			};
			_ms.unlazy(_33)(_ms.unlazy(_61_63), arr, [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]);
			const incrementing = function(gen_45maker) {
				_ms.checkContains(_ms.sub(_ms.unlazy(Fun), _ms.unlazy(Generator_33)), gen_45maker, "gen-maker");
				const gen = _ms.checkContains(_ms.unlazy(Generator_33), gen_45maker(null), "gen");
				const last_45value = _ms.unlazy(Ref_33)(0);
				loop156: while (true) {
					const _$157 = _ms.unlazy(gen_45next_33)(gen, _ms.unlazy(_43)(_ms.unlazy(get)(last_45value), 1)), value = _$157.value, done = _$157.done;
					_ms.unlazy(set_33)(last_45value, value);
					{
						const _ = done;
						switch (true) {
							case _ms.bool(_):
								{
									break loop156
								};
								break
							default: {
								null
							}
						}
					}
				};
				return _ms.unlazy(get)(last_45value)
			};
			const y = incrementing(function*() {
				const two = (yield 1);
				const three = (yield two);
				return _ms.checkContains(_ms.unlazy(Int), three, "res")
			});
			_ms.unlazy(_33)(_ms.unlazy(_61_63), y, 3);
			const one_45two_45one_45two = function*() {
				(yield* one_45two(null));
				return (yield* one_45two(null))
			};
			const one_45two = function*() {
				(yield 1);
				return (yield 2)
			};
			_ms.unlazy(_33)(_ms.unlazy(seq_61_63), _ms.unlazy(Stream)(one_45two_45one_45two), [ 1, 2, 1, 2 ]);
			const _double = function(x) {
				return _ms.unlazy(_42)(x, 2)
			};
			const triple = function(x) {
				return _ms.unlazy(_42)(x, 3)
			};
			const doubled_45then_45tripled = function(_) {
				_ms.checkContains(_ms.unlazy(_64), _, "_");
				return _ms.unlazy(Stream)(function*() {
					(yield* _ms.unlazy(each_126)(_, function*(x) {
						return (yield _double(x))
					}));
					return (yield* _ms.unlazy(each_126)(_, function*(x) {
						return (yield triple(x))
					}))
				})
			};
			_ms.unlazy(_33)(_ms.unlazy(seq_61_63), doubled_45then_45tripled([ 1, 2, 3 ]), [ 2, 4, 6, 3, 6, 9 ]);
			const dt2 = function(_) {
				return _ms.unlazy(_43)(_ms.unlazy(map)(_, _double), _ms.unlazy(map)(_, triple))
			};
			_ms.unlazy(_33)(_ms.unlazy(seq_61_63), dt2([ 1, 2, 3 ]), [ 2, 4, 6, 3, 6, 9 ]);
			const log = _ms.unlazy(empty)(_ms.unlazy(Array_33));
			const logging = function(gen_45maker) {
				_ms.checkContains(_ms.sub(_ms.unlazy(Fun), _ms.unlazy(Generator_33)), gen_45maker, "gen-maker");
				const gen = gen_45maker(null);
				const last_45value = _ms.unlazy(Ref_33)(null);
				loop202: while (true) {
					const _$203 = _ms.unlazy(gen_45next_33)(gen), value = _$203.value, done = _$203.done;
					{
						const _ = done;
						switch (true) {
							case _ms.bool(_):
								{
									_ms.unlazy(set_33)(last_45value, value);
									break loop202
								};
								break
							default: {
								log.push(value)
							}
						}
					}
				};
				return _ms.unlazy(get)(last_45value)
			};
			const increment_45thrice = function(x) {
				return logging(function*() {
					const incr1 = (yield* increment_126(x));
					const incr2 = (yield* increment_126(incr1));
					return (yield* increment_126(incr2))
				})
			};
			const increment_126 = function*(x) {
				(yield ("Incrementing " + _ms.show(x)));
				return _ms.unlazy(_43)(x, 1)
			};
			_ms.unlazy(_33)(_ms.unlazy(_61_63), increment_45thrice(0), 3);
			_ms.unlazy(_33)(_ms.unlazy(_61_63), log, [ "Incrementing 0", "Incrementing 1", "Incrementing 2" ]);
			const in_45range_63 = function(n, min, max) {
				return _ms.unlazy(and)(_ms.unlazy(_60_61_63)(min, n), _ms.lazy(function() {
					return _ms.unlazy(_60_61_63)(n, max)
				}))
			};
			_ms.unlazy(_33)(in_45range_63, 1, 0, 2);
			return _ms.set(_ms.unlazy(_33not)(in_45range_63, 3, 0, 2), "two-and-a-half-of", two_45and_45a_45half_45of, "is-str?", is_45str_63, "rate-guess", rate_45guess, "incrementing", incrementing, "one-two-one-two", one_45two_45one_45two, "one-two", one_45two, "double", _double, "triple", triple, "doubled-then-tripled", doubled_45then_45tripled, "dt2", dt2, "logging", logging, "increment-thrice", increment_45thrice, "increment~", increment_126, "my-obj", my_45obj, "in-range?", in_45range_63, "this-is-true", this_45is_45true, "my-list", my_45list, "my-map", my_45map, "my-list-2", my_45list_452, "my-obj-2", my_45obj_452, "half", half, "one-1", one_451, "Str->Num", Str_45_62Num)
		};
		const displayName = exports.displayName = "readme";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vcmVhZG1lLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvQ0FpQkE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsMEJBQU07QUFBQSxFQUVOLGFBQU8sV0FDTjtBQUFBLEdBQUEsNEJBQU87QUFBQSxJQUNOLFlBQUs7QUFBQSxJQUNMLFlBQUs7QUFBQSxXQUZDO0FBQUE7Ozs7O3VDQUdGLGNBQVc7QUFBQSx1Q0FDWCxjQUFXO0FBQUEsR0FFaEIseUJBQUE7QUFBQSx1Q0FDQSxrQkFBQTtBQUFBLEdBRUEsNkJBQVE7QUFBQSxJQUNQLFdBQUU7QUFBQSxJQUNGLFdBQUU7QUFBQSxXQUZLOzt1Q0FHUixXQUFhLEVBQUUsR0FBRTtBQUFBLEdBRWpCLDRCQUFPO0FBQUEsSUFDTixZQUFBLFNBQUs7QUFBQSxJQUNMLFlBQUEsU0FBSztBQUFBOzsrQ0FDRCxVQUFPLElBQUc7QUFBQSwrQ0FDVixVQUFPLElBQUc7QUFBQSxHQUVmLGlDQUFVO0FBQUEsSUFDVCxXQUFFO0FBQUEsSUFDRiw0QkFBUSxHQUFFO0FBQUEsSUFDVixXQUFFO0FBQUEsV0FITzs7dUNBSVYsV0FBQTtBQUFBLEdBQ0EsZ0NBQVM7QUFBQSxJQUNSLG9CQUFjO0FBQUEsSUFDZCxZQUFLO0FBQUEsSUFDTCw0QkFBTyxHQUFFO0FBQUEsV0FIRDtBQUFBOzs7Ozt1Q0FJVCxVQUFBO0FBQUEsR0FFQSxhQUFVO3VDQUNWLEtBQVM7QUFBQSx1Q0FDVCxLQUFTO0FBQUEsR0FFVCwyQkFBTztBQUFBLElBQ04sWUFBTTtBQUFBLDJCQUNOLEtBQUE7QUFBQTtBQUFBLHVDQUNELFNBQVc7QUFBQSxHQUVYLGlCQUFZLFNBQUEsR0FDWDtBQUFBLFdBQUE7QUFBQTtBQUFBLHVDQUNJLFNBQVUsSUFBRztBQUFBLEdBQ2xCLGlCQUFVLFNBQUEsR0FDVDtBQUFBLElBQUEsV0FBRTtBQUFBLElBQ0YsV0FBRTtBQUFBLFdB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QUksUUFBQSxVQUFRO0FBQUEsV0FDUixRQUFBLFVBQVE7QUFBQTtBQUFBLEdBRWIsa0JBQVcsWUFDVjtBQUFBLElBQUcsT0FBQTtBQUFBLFdBQ0EsT0FBQTtBQUFBO0FBQUEsNkRBRUksd0JBQXlCLEVBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQSxHQUV6QyxnQkFBUyxTQUFBLEdBQ1I7QUFBQSwyQkFBQSxHQUFJO0FBQUE7QUFBQSxHQUNMLGVBQVMsU0FBQSxHQUNSO0FBQUEsMkJBQUEsR0FBSTtBQUFBO0FBQUEsR0FDTCxpQ0FBdUIsU0FBQSxHQUN0QjtBQUFBOzhCQUFTLFlBQ1I7QUFBQSxLQUFJLDZCQUFNLEdBQUksVUFBQSxHQUNiO0FBQUEsYUFBRyxPQUFBLFFBQUE7QUFBQTtBQUFBLFlBQ0EsNkJBQU0sR0FBSSxVQUFBLEdBQ2I7QUFBQSxhQUFHLE9BQUEsT0FBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBDQUVFLHlCQUFzQixFQUFFLEdBQUUsR0FBRSxNQUFLLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUEsR0FDckQsWUFBTSxTQUFBLEdBQ0w7QUFBQSwyQ0FBTyxHQUFMLDBCQUFvQixHQUFMO0FBQUE7QUFBQSwwQ0FDVixJQUFLLEVBQUUsR0FBRSxHQUFFLE1BQUssRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQSxHQUVwQztHQUNBLGdCQUFVLFNBQUEsYUFDVDtBQUFBO0lBQUEsWUFBTSxZQUFVO0FBQUEsSUFDaEIsd0NBQWtCO0FBQUEsMEJBRWpCO0FBQUEsS0FBQSx3Q0FBYTtLQUNQO0FBQUEsTUFBQSxVQUFBO0FBQUE7T0FDTCxjQUFBO0FBQUEsUUFDQztBQUFBLDRCQUFBLGNBQUE7QUFBQSxTQUNBOzs7Z0JBRUE7QUFBQSxRQUFBLFNBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUNIO0FBQUE7QUFBQSxHQUVELDJCQUFtQixTQUFBLEdBQ2xCO0FBQUEsV0FBQSxRQUFVLFlBQ1Q7QUFBQSxLQUFBLGNBQVUsUUFBQSxjQUFBO0FBQUEsS0FDVixjQUFVLFFBQUEsY0FBQTtBQUFBLFlBQ04sUUFBQSxjQUFBO0FBQUE7QUFBQTtBQUFBLEdBQ04sc0JBQWMsVUFBQSxHQUNiO0FBQUEsSUFBSSxPQUFBLDRCQUFhO0FBQUEsMkJBQ2pCLEdBQUk7QUFBQTtBQUFBLHVDQUNBLG1CQUFrQixJQUFHO0FBQUEsdUNBQzFCLEtBQVMsRUFBRyxrQkFBaUIsa0JBQWlCO0FBQUEsR0FFOUMsc0JBQVksU0FBQSxHQUFFLEtBQUksS0FDakI7QUFBQSxpREFBSSxLQUFBO2tDQUFhLEdBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ2xCLGVBQVksR0FBRSxHQUFFO0FBQUEscUNBQ2hCLGVBQWUsR0FBRSxHQUFFOztFQWpPcEIsMENBQUE7QUFBQSIsImZpbGUiOiJtZXRhL2RlbW8vcmVhZG1lLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=