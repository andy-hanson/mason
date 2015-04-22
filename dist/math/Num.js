"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../Bool", "../compare", "../control", "../Obj", "../js", "../Type/Method", "../Type/Pred-Type", "./methods", "../bang", "../Fun", "../Try", "../Type/Type" ], function(exports, Bool_0, compare_1, control_2, Obj_3, js_4, Method_5, Pred_45Type_6, methods_7, _33_8, Fun_9, Try_10, Type_11) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Bool_0), and = _ms.get(_$2, "and"), compare = _ms.getDefaultExport(compare_1), _$3 = _ms.getModule(compare_1), _61_63 = _ms.get(_$3, "=?"), _60_63 = _ms.get(_$3, "<?"), _60_61_63 = _ms.get(_$3, "<=?"), _$4 = _ms.getModule(control_2), opr = _ms.get(_$4, "opr"), _$5 = _ms.getModule(Obj_3), p = _ms.get(_$5, "p"), _$6 = _ms.getModule(js_4), id_61_63 = _ms.get(_$6, "id=?"), js_45bar = _ms.get(_$6, "js-bar"), js_60 = _ms.get(_$6, "js<"), js_60_61 = _ms.get(_$6, "js<="), js_43 = _ms.get(_$6, "js+"), js_45 = _ms.get(_$6, "js-"), js_42 = _ms.get(_$6, "js*"), js_47 = _ms.get(_$6, "js/"), js_45mod = _ms.get(_$6, "js-mod"), _$7 = _ms.getModule(Method_5), impl_33 = _ms.get(_$7, "impl!"), Pred_45Type = _ms.getDefaultExport(Pred_45Type_6), _$8 = _ms.getModule(Pred_45Type_6), Opt = _ms.get(_$8, "Opt"), _$9 = _ms.getModule(methods_7), _43 = _ms.get(_$9, "+"), _45 = _ms.get(_$9, "-"), _42 = _ms.get(_$9, "*"), _47 = _ms.get(_$9, "/"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_8)
		}), _$11 = _ms.lazyGetModule(_33_8), _33not = _ms.lazyProp(_$11, "!not"), _$12 = _ms.lazyGetModule(Fun_9), spread_33 = _ms.lazyProp(_$12, "spread!"), _$13 = _ms.lazyGetModule(Try_10), fails_63 = _ms.lazyProp(_$13, "fails?"), _$14 = _ms.lazyGetModule(Type_11), contains_63 = _ms.lazyProp(_$14, "contains?");
		const exports = { };
		const Num = function() {
			const doc = "JavaScript's native Number type.\nAny floating-point value.";
			return _ms.set(global.Number, "doc", doc, "displayName", "Num")
		}();
		const Int = exports.Int = Pred_45Type(function() {
			const doc = "A multiple of 1.\nThis only contains Nums for which integer methods return sensible results, AKA safe ints.\nThis is anything between min-safe-integer and max-safe-integer.";
			const test = function() {
				_ms.unlazy(spread_33)(_ms.sub(_ms.unlazy(_33), _ms.sub(_ms.unlazy(contains_63), Int)), function() {
					const _0 = 1;
					const _1 = min_45safe_45int;
					const _2 = max_45safe_45int;
					return [ _0, _1, _2 ]
				}());
				return _ms.unlazy(spread_33)(_ms.sub(_ms.unlazy(_33not), _ms.sub(_ms.unlazy(contains_63), Int)), function() {
					const _0 = 1.1;
					const _1 = _45(min_45safe_45int, 1);
					const _2 = _43(max_45safe_45int, 1);
					return [ _0, _1, _2 ]
				}())
			};
			const predicate = function(_) {
				return Num.isSafeInteger(_)
			};
			return {
				doc: doc,
				test: test,
				predicate: predicate,
				displayName: "Int"
			}
		}());
		const Nat = exports.Nat = Pred_45Type(function() {
			const doc = "Any counting number, including `0`.";
			const test = function() {
				_ms.unlazy(_33)(_ms.unlazy(contains_63), Nat, 0);
				return _ms.unlazy(_33not)(_ms.unlazy(contains_63), Nat, - 1)
			};
			const predicate = function(_) {
				return and(_ms.contains(Int, _), _ms.lazy(function() {
					return _60_61_63(0, _)
				}))
			};
			return {
				doc: doc,
				test: test,
				predicate: predicate,
				displayName: "Nat"
			}
		}());
		impl_33(compare, Num, _45);
		impl_33(_61_63, Num, function() {
			const test = function() {
				const _k0 = [ not_45a_45number, not_45a_45number ], _v0 = true;
				return _ms.map(_k0, _v0)
			};
			return _ms.set(id_61_63, "test", test)
		}());
		impl_33(_60_63, Num, function(a, b) {
			_ms.checkContains(Num, b, "b");
			return js_60(a, b)
		});
		impl_33(_60_61_63, Num, function(a, b) {
			_ms.checkContains(Num, b, "b");
			return js_60_61(a, b)
		});
		impl_33(_43, Num, function(a, b) {
			_ms.checkContains(Num, b, "b");
			return js_43(a, b)
		});
		impl_33(_45, Num, function(a, b) {
			_ms.checkContains(Num, b, "b");
			return js_45(a, b)
		});
		impl_33(_42, Num, function(a, b) {
			_ms.checkContains(Num, b, "b");
			return js_42(a, b)
		});
		impl_33(_47, Num, function(a, b) {
			_ms.checkContains(Num, b, "b");
			return js_47(a, b)
		});
		const sign = exports.sign = function() {
			const test = function() {
				const _k0 = [ - 8 ], _v0 = - 1;
				const _k1 = [ 0 ], _v1 = 0;
				const _k2 = [ 8 ], _v2 = 1;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
			};
			return _ms.set(function(_) {
				_ms.checkContains(Num, _, "_");
				return function() {
					switch (true) {
						case _ms.bool(_60_63(0, _)): {
							return 1
						}
						case _ms.bool(_60_63(_, 0)): {
							return - 1
						}
						default: {
							return 0
						}
					}
				}()
			}, "test", test, "displayName", "sign")
		}();
		const remainder = exports.remainder = function() {
			const doc = "Remainder of `a` after dividing by `b`.\nSign of result is sign of `a`. Sign of `b` is ignored.";
			const test = function() {
				const _k0 = [ 2, 3 ], _v0 = 2;
				const _k1 = [ 2, - 3 ], _v1 = 2;
				const _k2 = [ - 2, 3 ], _v2 = - 2;
				const _k3 = [ - 2, - 3 ], _v3 = - 2;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
			};
			return _ms.set(function(numerator, denominator) {
				_ms.checkContains(Num, numerator, "numerator");
				_ms.checkContains(Num, denominator, "denominator");
				return js_45mod(numerator, denominator)
			}, "doc", doc, "test", test, "displayName", "remainder")
		}();
		const int_47 = exports["int/"] = function() {
			const doc = "Integer division: throws out any remainder.\nThis is the default in other programming languages, but in Mason `/ 1 2` is 0.5, not 0.";
			const test = function() {
				const _k0 = [ 3, 2 ], _v0 = 1;
				const _k1 = [ - 3, 2 ], _v1 = - 2;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(a, b) {
				_ms.checkContains(Num, a, "a");
				_ms.checkContains(Num, b, "b");
				return round_45down(_47(a, b))
			}, "doc", doc, "test", test, "displayName", "int/")
		}();
		const modulo = exports.modulo = function() {
			const doc = "Mathematical modulus.\nSmallest positive number which can be added to a multiple of `denominator` to get `numerator`.\"";
			const test = function() {
				const _k0 = [ 2, 3 ], _v0 = 2;
				const _k1 = [ 2, - 3 ], _v1 = 2;
				const _k2 = [ - 2, 3 ], _v2 = 1;
				const _k3 = [ - 2, - 3 ], _v3 = 1;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
			};
			return _ms.set(function(numerator, denominator) {
				_ms.checkContains(Num, numerator, "numerator");
				_ms.checkContains(Num, denominator, "denominator");
				const res = function() {
					switch (true) {
						case _ms.bool(_60_63(numerator, 0)): {
							return _43(abs(denominator), remainder(numerator, denominator))
						}
						default: {
							return remainder(numerator, denominator)
						}
					}
				}();
				divisible_63(_45(numerator, res), denominator);
				return res
			}, "doc", doc, "test", test, "displayName", "modulo")
		}();
		const divisible_63 = exports["divisible?"] = function() {
			const doc = "Whether an integer number of `b` can add up to `a`.";
			const test = function() {
				_ms.unlazy(_33)(divisible_63, 4, 2);
				_ms.unlazy(_33)(divisible_63, 4, - 2);
				return _ms.unlazy(_33not)(divisible_63, 3, 2)
			};
			return _ms.set(function(a, b) {
				_ms.checkContains(Num, a, "a");
				_ms.checkContains(Num, b, "b");
				return _61_63(0, remainder(a, b))
			}, "doc", doc, "test", test, "displayName", "divisible?")
		}();
		const log_45e = exports["log-e"] = function(_) {
			_ms.checkContains(Num, _, "_");
			return Math.log(_)
		};
		const log = exports.log = function() {
			const doc = "Mathematical logarithm.";
			const test = function() {
				_ms.unlazy(_33)(near_63, log(10, 0.01), - 2);
				const _k0 = [ 2, 8 ], _v0 = 3;
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(base, n) {
				_ms.checkContains(Num, base, "base");
				_ms.checkContains(Num, n, "n");
				return _47(log_45e(n), log_45e(base))
			}, "doc", doc, "test", test, "displayName", "log")
		}();
		const abs = exports.abs = function() {
			const doc = "Negates `a` until it is positive.";
			const test = function() {
				const _k0 = [ 1 ], _v0 = 1;
				const _k1 = [ - 1 ], _v1 = 1;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(a) {
				_ms.checkContains(Num, a, "a");
				return Math.abs(a)
			}, "doc", doc, "test", test, "displayName", "abs")
		}();
		const pow = exports.pow = function() {
			const doc = "`a` raised to the power of `b`.";
			const test = function() {
				const _k0 = [ 2, 3 ], _v0 = 8;
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(a, b) {
				_ms.checkContains(Num, a, "a");
				_ms.checkContains(Num, b, "b");
				return Math.pow(a, b)
			}, "doc", doc, "test", test, "displayName", "pow")
		}();
		const square = exports.square = function(_) {
			_ms.checkContains(Num, _, "_");
			return _42(_, _)
		};
		const square_45root = exports["square-root"] = function() {
			const test = function() {
				const _k0 = [ 4 ], _v0 = 2;
				_ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
					return square_45root(- 1)
				});
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_) {
				_ms.checkContains(Num, _, "_");
				_ms.unlazy(_33)(_60_61_63(0, _), (("Can't take square root of negative number " + _ms.show(_)) + "."));
				return Math.sqrt(_)
			}, "test", test, "displayName", "square-root")
		}();
		const round = exports.round = function() {
			const doc = "Closest integer.\nRounds up to break ties.";
			const test = function() {
				const _k0 = [ - 0.5 ], _v0 = - 0;
				const _k1 = [ 0.5 ], _v1 = 1;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_) {
				_ms.checkContains(Num, _, "_");
				return Math.round(_)
			}, "doc", doc, "test", test, "displayName", "round")
		}();
		const round_45down = exports["round-down"] = function() {
			const doc = "Greatest integer no greater than `a`.";
			const test = function() {
				const _k0 = [ - 0.5 ], _v0 = - 1;
				const _k1 = [ 0.5 ], _v1 = 0;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_) {
				_ms.checkContains(Num, _, "_");
				return Math.floor(_)
			}, "doc", doc, "test", test, "displayName", "round-down")
		}();
		const round_45up = exports["round-up"] = function() {
			const doc = "Least integer no less than `a`.";
			const test = function() {
				const _k0 = [ - 0.5 ], _v0 = - 0;
				const _k1 = [ 0.5 ], _v1 = 1;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_) {
				_ms.checkContains(Num, _, "_");
				return Math.ceil(_)
			}, "doc", doc, "test", test, "displayName", "round-up")
		}();
		const round_45towards_450 = exports["round-towards-0"] = function() {
			const doc = "`round-down` if positive, else `round-up`.";
			const test = function() {
				const _k0 = [ - 0.5 ], _v0 = 0;
				const _k1 = [ 0.5 ], _v1 = 0;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_) {
				_ms.checkContains(Num, _, "_");
				return js_45bar(_, 0)
			}, "doc", doc, "test", test, "displayName", "round-towards-0")
		}();
		const near_63 = exports["near?"] = function() {
			const doc = "Whether they are within sig-figs precision.";
			const test = function() {
				const _k0 = [ 1000.9, 1000, 3 ], _v0 = true;
				const _k1 = [ 1000.9, 1000, 4 ], _v1 = false;
				const _k2 = [ 0.001001, 0.001, 3 ], _v2 = true;
				const _k3 = [ 0.001001, 0.001, 4 ], _v3 = false;
				const _k4 = [ 0.001, - 0.001, 1 ], _v4 = false;
				const _k5 = [ 0.00999, 0, 2 ], _v5 = true;
				const _k6 = [ 0, 0.00999, 2 ], _v6 = true;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3, _k4, _v4, _k5, _v5, _k6, _v6)
			};
			return _ms.set(function(a, b, _63sig_45figs) {
				_ms.checkContains(Num, b, "b");
				_ms.checkContains(_ms.sub(Opt, Nat), _63sig_45figs, "?sig-figs");
				const sig_45figs = opr(_63sig_45figs, 6);
				return function() {
					switch (true) {
						case _ms.bool(_61_63(a, 0)): {
							return near_450_63(b, sig_45figs)
						}
						case _ms.bool(_61_63(b, 0)): {
							return near_450_63(a, sig_45figs)
						}
						default: {
							const avg_45mag = _47(_43(abs(a), abs(b)), 2);
							const n_45digits_45avg_45mag = round_45down(log(10, avg_45mag));
							const scale = pow(10, _42(- 1, n_45digits_45avg_45mag));
							const scaled_45diff = _45(_42(a, scale), _42(b, scale));
							const epsilon = pow(10, _42(- 1, sig_45figs));
							return _60_63(abs(scaled_45diff), epsilon)
						}
					}
				}()
			}, "doc", doc, "test", test, "displayName", "near?")
		}();
		const near_450_63 = exports["near-0?"] = function() {
			const doc = "Whether it is close to zero.\nIt must be `0.0...` where there are `sig-figs` 0s after the decimal point.";
			const test = function() {
				const _k0 = [ 0.00999, 2 ], _v0 = true;
				const _k1 = [ 0.01, 2 ], _v1 = false;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, _63sig_45figs) {
				_ms.checkContains(_ms.sub(Opt, Nat), _63sig_45figs, "?sig-figs");
				const sig_45figs = opr(_63sig_45figs, 6);
				const max = pow(10, _42(- 1, sig_45figs));
				return _60_63(abs(_), max)
			}, "doc", doc, "test", test, "displayName", "near-0?")
		}();
		const infinity = exports.infinity = p(Num, "POSITIVE_INFINITY");
		const _45infinity = exports["-infinity"] = p(Num, "NEGATIVE_INFINITY");
		const max_45safe_45int = exports["max-safe-int"] = p(Num, "MAX_SAFE_INTEGER");
		const min_45safe_45int = exports["min-safe-int"] = p(Num, "MIN_SAFE_INTEGER");
		const not_45a_45number = exports["not-a-number"] = Num.NaN;
		exports.default = Num;
		const displayName = exports.displayName = "Num";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL051bS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7b0NBZUE7QUFBQTs7OztFQUFBLHVCQUFLO0FBQUEsR0FDSixZQUNDO0FBQUEsa0JBQ0Q7O0VBRUQsMEJBQUssdUJBQVM7QUFBQSxHQUNiLFlBQ0M7QUFBQSxHQUNELGFBQU8sV0FDTjtBQUFBLG9GQUFtQixrQkFBTTtBQUFBLEtBQ3hCLFdBQUU7QUFBQSxLQUNGLFdBQUU7QUFBQSxLQUNGLFdBQUU7QUFBQSxZQUhzQjs7OEZBSUgsa0JBQU07QUFBQSxLQUMzQixXQUFFO0FBQUEsS0FDRixXQUFFLElBQUEsa0JBQWU7QUFBQSxLQUNqQixXQUFFLElBQUEsa0JBQWU7QUFBQSxZQUhVOzs7R0FJN0Isa0JBQVksU0FBQSxHQUNYO0FBQUEsV0FBQSxrQkFBa0I7QUFBQTtBQUFBLFVBYk47QUFBQTs7Ozs7O0VBZWQsMEJBQUssdUJBQVM7QUFBQSxHQUNiLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLDZDQUFBLEtBQWdCO0FBQUEsdURBQ2hCLEtBQW1COztHQUNwQixrQkFBWSxTQUFBLEdBQ1g7QUFBQSxXQUFBLGlCQUFLLEtBQUQ7WUFBTSxVQUFLLEdBQUU7QUFBQTtBQUFBO0FBQUEsVUFOTDtBQUFBOzs7Ozs7RUFTYixRQUFBLFNBQUEsS0FBQTtBQUFBLEVBQ0EsUUFBQSxRQUFBLGdCQUFZO0FBQUEsR0FDWCxhQUFPLFdBQ047QUFBQSxJQUFBLFlBQUEsRUFBQSxrQkFBQSwwQkFBaUM7QUFBQTs7a0JBQ2xDOztFQUNELFFBQUEsUUFBQSxLQUFjLFNBQUEsR0FBRSxHQUNmO0FBQUEscUJBRGlCO1VBQ2pCLE1BQUEsR0FBQTtBQUFBO0FBQUEsRUFDRCxRQUFBLFdBQUEsS0FBZSxTQUFBLEdBQUUsR0FDaEI7QUFBQSxxQkFEa0I7VUFDbEIsU0FBQSxHQUFBO0FBQUE7QUFBQSxFQUNELFFBQUEsS0FBQSxLQUFhLFNB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QUNaLFlBQUEsRUFBRSxhQUFTO0FBQUE7O2tCQUNYLFNBQUEsR0FDQTtBQUFBLHNCQURFO1dBQ0YsU0FBTyxHQUFFO0FBQUE7O0VBR1gsOENBQU07QUFBQSxHQUNMLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLFFBQU8sTUFBSyxXQUFPO0FBQUEsSUFDckIsWUFBQSxFQUFFLFFBQU8sTUFBSyxXQUFPO0FBQUEsSUFDckIsWUFBQSxFQUFFLFVBQVMsT0FBTSxXQUFPO0FBQUEsSUFDeEIsWUFBQSxFQUFFLFVBQVMsT0FBTSxXQUFPO0FBQUEsSUFDeEIsWUFBQSxFQUFFLE9BQU0sU0FBTyxXQUFPO0FBQUEsSUFFckIsWUFBQSxFQUFFLFNBQVEsR0FBRSxXQUFPO0FBQUEsSUFDbkIsWUFBQSxFQUFFLEdBQUUsU0FBUSxXQUFPO0FBQUE7O2tCQUNwQixTQUFBLEdBQUUsR0FBTSxlQUNSO0FBQUEsc0JBREk7OEJBQWMsS0FBRztJQUNyQixtQkFBVyxJQUFBLGVBQWM7QUFBQTs7TUFFeEIsY0FBQSxPQUFBLEdBQUssS0FDSjtBQUFBLGNBQUEsWUFBQSxHQUFBO0FBQUE7QUFBQSxNQUNELGNBQUEsT0FBQSxHQUFLLEtBQ0o7QUFBQSxjQUFBLFlBQUEsR0FBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLE9BQUEsa0JBQVUsSUFBRSxJQUFHLElBQUEsSUFBUSxJQUFBLEtBQVM7QUFBQSxPQUNoQywrQkFBbUIsYUFBVyxJQUFLLElBQUw7QUFBQSxPQUM5QixjQUFRLElBQUksSUFBRyxJQUFHLEtBQUg7QUFBQSxPQUNmLHNCQUFjLElBQUUsSUFBQSxHQUFBLFFBQVksSUFBQSxHQUFBO0FBQUEsT0FDNUIsZ0JBQVUsSUFBSSxJQUFHLElBQUcsS0FBSDtBQUFBLGNBQ2pCLE9BQUcsSUFBQSxnQkFBSDtBQUFBO0FBQUE7QUFBQTtBQUFBOztFQUVKLG9EQUFRO0FBQUEsR0FDUCxZQUNDO0FBQUEsR0FDRCxhQUFPLFdBQ047QUFBQSxJQUFBLFlBQUEsRUFBRSxTQUFRLFdBQU87QUFBQSxJQUNqQixZQUFBLEVBQUUsTUFBSyxXQUFPO0FBQUE7O2tCQUNkLFNBQUEsR0FBRSxlQUNGO0FBQUEsOEJBRFksS0FBRztJQUNmLG1CQUFXLElBQUEsZUFBYztBQUFBLElBRXpCLFlBQU0sSUFBSSxJQUFHLElBQUcsS0FBSDtBQUFBLFdBQ2IsT0FBQSxJQUFHLElBQUg7QUFBQTs7RUFHRixvQ0FBVSxFQUFBLEtBQU87QUFBQSxFQUNqQiwyQ0FBVyxFQUFBLEtBQU87QUFBQSxFQUNsQixtREFBYyxFQUFBLEtBQU87QUFBQSxFQUNyQixtREFBYyxFQUFBLEtBQU87QUFBQSxFQUNyQixtREFBYztvQkFFZjtBQUFBLEVBcFBBLDBDQUFBO0FBQUEiLCJmaWxlIjoibWF0aC9OdW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==