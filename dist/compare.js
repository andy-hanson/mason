"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./Bool", "./js", "./Type/Method", "./at/at", "./at/at-Type", "./at/Arraybang", "./at/q", "./at/Seq", "./control", "./Fun", "./Obj", "./Type/Pred-Type", "./bang", "./at/at", "./at/q", "./at/at-Type", "./Try" ], function(exports, Bool_0, js_1, Method_2, _64_3, _64_45Type_4, Array_33_5, _63_6, Seq_7, control_8, Fun_9, Obj_10, Pred_45Type_11, _33_12, _64_13, _63_14, _64_45Type_15, Try_16) {
	exports._get = _ms.lazy(function() {
		const Bool = _ms.getDefaultExport(Bool_0), _$2 = _ms.getModule(Bool_0), not = _ms.get(_$2, "not"), or = _ms.get(_$2, "or"), _$3 = _ms.getModule(js_1), id_61_63 = _ms.get(_$3, "id=?"), Method = _ms.getDefaultExport(Method_2), _64 = _ms.lazy(function() {
			return _ms.getDefaultExport(_64_3)
		}), _$6 = _ms.lazyGetModule(_64_3), all_63 = _ms.lazyProp(_$6, "all?"), empty_63 = _ms.lazyProp(_$6, "empty?"), iterator = _ms.lazyProp(_$6, "iterator"), _$7 = _ms.lazyGetModule(_64_45Type_4), from_45stream = _ms.lazyProp(_$7, "from-stream"), Array_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Array_33_5)
		}), _$9 = _ms.lazyGetModule(_63_6), un_45_63 = _ms.lazyProp(_$9, "un-?"), Seq = _ms.lazy(function() {
			return _ms.getDefaultExport(Seq_7)
		}), _$10 = _ms.lazyGetModule(Seq_7), first = _ms.lazyProp(_$10, "first"), tail = _ms.lazyProp(_$10, "tail"), _$11 = _ms.lazyGetModule(control_8), _if = _ms.lazyProp(_$11, "if"), if_33 = _ms.lazyProp(_$11, "if!"), opr = _ms.lazyProp(_$11, "opr"), returning = _ms.lazyProp(_$11, "returning"), Ref_33 = _ms.lazyProp(_$11, "Ref!"), get = _ms.lazyProp(_$11, "get"), set_33 = _ms.lazyProp(_$11, "set!"), Fun = _ms.lazy(function() {
			return _ms.getDefaultExport(Fun_9)
		}), _$12 = _ms.lazyGetModule(Fun_9), identity = _ms.lazyProp(_$12, "identity"), _$13 = _ms.lazyGetModule(Obj_10), obj_61_63 = _ms.lazyProp(_$13, "obj=?"), _$14 = _ms.lazyGetModule(Pred_45Type_11), Opt = _ms.lazyProp(_$14, "Opt"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_12)
		}), _$17 = _ms.lazyGetModule(_64_13), count = _ms.lazyProp(_$17, "count"), _63 = _ms.lazy(function() {
			return _ms.getDefaultExport(_63_14)
		}), _$19 = _ms.lazyGetModule(_64_45Type_15), empty = _ms.lazyProp(_$19, "empty"), _$20 = _ms.lazyGetModule(Try_16), fails_63 = _ms.lazyProp(_$20, "fails?");
		const exports = { };
		const compare = Method(function() {
			const doc = "A Num < 0 if a < b, > 0 if a > b, and = 0 if a = b.\nIt could be implemented as:\n\tcase\n\t\t<? a b\n\t\t\t-1\n\t\t>? a b\n\t\t\t1\n\t\telse\n\t\t\t0\nBut instead, other comparison operators are defined in terms of this.\n`compare a b` should always be `* -1 (compare b a)`.";
			return {
				doc: doc,
				displayName: "compare"
			}
		}());
		const _61_63 = exports["=?"] = Method(function() {
			const doc = "Whether two objects are considered equivalent.\nGenerally, if two values are `=?`, then most functions called on them should return the same results.\n`=?` defaults to `obj=?`.\nValues can be `=?` but not `obj=?` if they are conceptually the same, but have different representations.\nFor example, two Sets with the same values might internally have different ordering.\n\nValues of different types should generally not be =?.\nFor example, [ 1 2 3 ] is not `=?` (=> Stream [ 1 2 3 ]), but it is `seq=?`.\nUnlike other comparison methods, `=?` should not make assertions about type.";
			const _default = function(a, b) {
				return _ms.checkContains(Bool, or(id_61_63(a, b), _ms.lazy(function() {
					return _ms.unlazy(obj_61_63)(a, b)
				})), "res")
			};
			return {
				doc: doc,
				default: _default,
				displayName: "=?"
			}
		}());
		const _60_63 = exports["<?"] = Method(function() {
			const doc = "Whether `lesser` comes before `greater` in these values' ordering.\nSame as `not  (>=? lesser greater)`.";
			const _default = function(lesser, greater) {
				return _ms.checkContains(Bool, _60_63(compare(lesser, greater), 0), "res")
			};
			return {
				doc: doc,
				default: _default,
				displayName: "<?"
			}
		}());
		const _60_61_63 = exports["<=?"] = Method(function() {
			const doc = "<? or =?.";
			const _default = function(lesser, greater) {
				return _ms.checkContains(Bool, _60_61_63(compare(lesser, greater), 0), "res")
			};
			return {
				doc: doc,
				default: _default,
				displayName: "<=?"
			}
		}());
		const same_63 = exports["same?"] = function() {
			const doc = "Whether two values have the same `f`.";
			const test = function() {
				const _k0 = [ _ms.unlazy(count), [ 1 ], [ 2 ] ], _v0 = true;
				const _k1 = [ _ms.unlazy(count), [ ], [ 1 ] ], _v1 = false;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(f, a, b) {
				_ms.checkContains(_ms.unlazy(Fun), f, "f");
				return _61_63(f(a), f(b))
			}, "doc", doc, "test", test, "displayName", "same?")
		}();
		const max = exports.max = function() {
			const doc = "An element that is >=? all others. Fails when empty.";
			const test = function() {
				const _k0 = [ [ 1, 3, 2 ] ], _v0 = 3;
				const _k1 = [ [ 2, 1, 2 ] ], _v1 = 2;
				_ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
					return max([ ])
				});
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_) {
				_ms.checkContains(_ms.unlazy(_64), _, "_");
				return _ms.unlazy(un_45_63)(_63max(_), "Can not take max of empty.")
			}, "doc", doc, "test", test, "displayName", "max")
		}();
		const _63max = exports["?max"] = function() {
			const doc = "Like max, but returns empty ? for empty.";
			const test = function() {
				const _k0 = [ [ 1 ] ], _v0 = _ms.unlazy(_63)(1);
				const _k1 = [ [ ] ], _v1 = _ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_) {
				_ms.checkContains(_ms.unlazy(_64), _, "_");
				return _63max_45by(_, _ms.unlazy(identity))
			}, "doc", doc, "test", test, "displayName", "?max")
		}();
		const max_45by = exports["max-by"] = function() {
			const doc = "An element whose `by em` is >=? all other elements' `by em`s.\nLike `max (map _ by)` except the mapping is not applied to the result.";
			const test = function() {
				const _k0 = [ [ "five", "six", "seven" ], _ms.unlazy(count) ], _v0 = "seven";
				_ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
					return max_45by([ ], _ms.unlazy(identity))
				});
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, by) {
				_ms.checkContains(_ms.unlazy(_64), _, "_");
				_ms.checkContains(_ms.unlazy(Fun), by, "by");
				return _ms.unlazy(un_45_63)(_63max_45by(_, by), "Can not take max of empty.")
			}, "doc", doc, "test", test, "displayName", "max-by")
		}();
		const _63max_45by = exports["?max-by"] = function() {
			const doc = "Like max-by, but returns empty ? for empty.";
			const test = function() {
				const _k0 = [ [ 1 ], _ms.unlazy(identity) ], _v0 = _ms.unlazy(_63)(1);
				const _k1 = [ [ ], _ms.unlazy(identity) ], _v1 = _ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, by) {
				_ms.checkContains(_ms.unlazy(_64), _, "_");
				_ms.checkContains(_ms.unlazy(Fun), by, "by");
				return _ms.unlazy(_if)(not(_ms.unlazy(empty_63)(_)), _ms.lazy(function() {
					return function() {
						const iter = _ms.unlazy(iterator)(_);
						const value = iter.next().value;
						const cur_45max = _ms.unlazy(Ref_33)(value);
						const cur_45max_45by = _ms.unlazy(Ref_33)(by(value));
						loop95: while (true) {
							const _$96 = iter.next(), value = _$96.value, done = _$96.done;
							switch (true) {
								case _ms.bool(done):
									{
										break loop95
									};
									break
								default: {
									const value_45by = by(value);
									_ms.unlazy(if_33)(_60_63(_ms.unlazy(get)(cur_45max_45by), value_45by), function() {
										_ms.unlazy(set_33)(cur_45max, value);
										return _ms.unlazy(set_33)(cur_45max_45by, value_45by)
									})
								}
							}
						};
						return _ms.unlazy(get)(cur_45max)
					}()
				}))
			}, "doc", doc, "test", test, "displayName", "?max-by")
		}();
		const sorted_63 = exports["sorted?"] = function() {
			const doc = "Whether it is already in sorted order.";
			const test = function() {
				const _k0 = [ [ ] ], _v0 = true;
				const _k1 = [ [ 1, 2, 3 ] ], _v1 = true;
				const _k2 = [ [ 3, 2, 1 ] ], _v2 = false;
				const _k3 = [ [ "six", "five", "seven" ], _ms.unlazy(count) ], _v3 = true;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
			};
			return _ms.set(function(seq, _63sort_45by) {
				_ms.checkContains(_ms.unlazy(Seq), seq, "seq");
				_ms.checkContains(_ms.sub(_ms.unlazy(Opt), _ms.unlazy(Fun)), _63sort_45by, "?sort-by");
				const sort_45by = _ms.unlazy(opr)(_63sort_45by, _ms.unlazy(identity));
				return function() {
					const _ = seq;
					switch (true) {
						case _ms.bool(_ms.unlazy(empty_63)(_)): {
							return true
						}
						default: {
							const sb_45prev = _ms.unlazy(Ref_33)(sort_45by(_ms.unlazy(first)(_)));
							return _ms.unlazy(all_63)(_ms.unlazy(tail)(_), function(em) {
								const sb_45cur = sort_45by(em);
								return _ms.unlazy(returning)(_60_63(_ms.unlazy(get)(sb_45prev), sb_45cur), function() {
									return _ms.unlazy(set_33)(sb_45prev, sb_45cur)
								})
							})
						}
					}
				}()
			}, "doc", doc, "test", test, "displayName", "sorted?")
		}();
		const sort = exports.sort = Method(function() {
			const doc = "Puts the elements in sorted order.\nOrder is determined by calling `compare`.\nOptional `sort-by` determines an attribute of elements to be compared.";
			const test = function() {
				const _k0 = [ [ 3, 2, 1 ] ], _v0 = [ 1, 2, 3 ];
				const _k1 = [ [ "five", "six", "seven" ], _ms.unlazy(count) ], _v1 = [ "six", "five", "seven" ];
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			const _default = function(_, _63sort_45by) {
				_ms.checkContains(_ms.unlazy(_64), _, "_");
				_ms.checkContains(_ms.sub(_ms.unlazy(Opt), _ms.unlazy(Fun)), _63sort_45by, "?sort-by");
				const sort_45by = _ms.unlazy(opr)(_63sort_45by, _ms.unlazy(identity));
				const sorted = _ms.unlazy(from_45stream)(_ms.unlazy(Array_33), _);
				sorted.sort(function(a, b) {
					return compare(sort_45by(a), sort_45by(b))
				});
				return _ms.checkContains(Array, sorted, "res")
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "sort"
			}
		}());
		exports.default = compare;
		const displayName = exports.displayName = "compare";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb21wYXJlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvQ0FxQkE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFBQSxnQkFBVSxrQkFBTTtBQUFBLEdBQ2YsWUFDQztBQUFBLFVBRmM7QUFBQTs7OztFQUdoQiwrQkFBSSxrQkFBTTtBQUFBLEdBQ1QsWUFDQztBQUFBLEdBR0QsaUJBQVUsU0FBTSxHQUFFLEdBQ2pCO0FBQUEsNkJBRFUsTUFDVixHQUFHLFNBQUEsR0FBQTtrQ0FBWSxHQUFBO0FBQUE7O1VBTlA7QUFBQTs7Ozs7RUFRViwrQkFBSSxrQkFBTTtBQUFBLEdBQ1QsWUFDQztBQUFBLEdBQ0QsaUJBQVUsU0FBTSxRQUFPLFNBQ3RCO0FBQUEsNkJBRFUsTUFDVixPQUFHLFFBQUEsUUFBQSxVQUF5Qjs7VUFKcEI7QUFBQTs7Ozs7RUFNVixtQ0FBSyxrQkFBTTtBQUFBLEdBQ1YsWUFBTTtBQUFBLEdBQ04saUJBQVUsU0FBTSxRQUFPLFNBQ3RCO0FBQUEsNkJBRFUsTUFDVixVQUFJLFFBQUEsUUFBQSxVQUF5Qjs7VUFIcEI7QUFBQTs7Ozs7RUFNViw4Q0FBTTtBQUFBLEdBQ0wsWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsSUFBQSxZQUFBLHFCQUFRLEVBQUUsS0FBSSxFQUFFLGFBQVM7QUFBQSxJQUN6QixZQUFBLHFCQUFRLEtBQUksRUFBRSxhQUFTO0FBQUE7O2tCQUN2QixTQUFBLEdBQU0sR0FBRSxHQUNSO0FBQUE7V0FBQSxPQUFHLEVBQUEsSUFBTSxFQUFBO0FBQUE7O0VBS1gscUNBQUk7QUFBQSxHQUNILFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLEVBQUUsR0FBRSxHQUFFLGFBQVM7QUFBQSxJQUNqQixZQUFBLEVBQUUsRUFBRSxHQUFFLEdBQUUsYUFBUztBQUFBLDBDQUNQLFdBQ1Q7QUFBQSxZQUFBLElBQUk7QUFBQTtBQUFB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