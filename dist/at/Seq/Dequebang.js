"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../Bool", "../../compare", "../../control", "../../math/Num", "../../math/methods", "../../methods", "../../Objbang", "../../Type/Kind", "../../Type/Pred-Type", "../../Type/Obj-Type", "../at", "../atbang", "../at-Type", "../q", "./Arraybang", "./Range", "./Seq", "./Seqbang" ], function(exports, Bool_0, compare_1, control_2, Num_3, methods_4, methods_5, Obj_33_6, Kind_7, Pred_45Type_8, Obj_45Type_9, _64_10, _64_33_11, _64_45Type_12, _63_13, Array_33_14, Range_15, Seq_16, Seq_33_17) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Bool_0), and = _ms.get(_$2, "and"), not = _ms.get(_$2, "not"), or = _ms.get(_$2, "or"), _$3 = _ms.getModule(compare_1), _61_63 = _ms.get(_$3, "=?"), _60_63 = _ms.get(_$3, "<?"), _$4 = _ms.getModule(control_2), _if = _ms.get(_$4, "if"), _$5 = _ms.getModule(Num_3), modulo = _ms.get(_$5, "modulo"), Nat = _ms.get(_$5, "Nat"), _$6 = _ms.getModule(methods_4), _43 = _ms.get(_$6, "+"), _45 = _ms.get(_$6, "-"), _42 = _ms.get(_$6, "*"), _$7 = _ms.getModule(methods_5), sub = _ms.get(_$7, "sub"), _$8 = _ms.getModule(Obj_33_6), p_33 = _ms.get(_$8, "p!"), _$9 = _ms.getModule(Kind_7), kind_33 = _ms.get(_$9, "kind!"), self_45kind_33 = _ms.get(_$9, "self-kind!"), _$10 = _ms.getModule(Pred_45Type_8), Any = _ms.get(_$10, "Any"), Obj_45Type = _ms.getDefaultExport(Obj_45Type_9), _64 = _ms.getDefaultExport(_64_10), _$12 = _ms.getModule(_64_10), _43_43 = _ms.get(_$12, "++"), count = _ms.get(_$12, "count"), each_33 = _ms.get(_$12, "each!"), empty_63 = _ms.get(_$12, "empty?"), iterator = _ms.get(_$12, "iterator"), map = _ms.get(_$12, "map"), _$13 = _ms.getModule(_64_33_11), empty_33 = _ms.get(_$13, "empty!"), _64_45Type = _ms.getDefaultExport(_64_45Type_12), _$14 = _ms.getModule(_64_45Type_12), empty = _ms.get(_$14, "empty"), _$15 = _ms.getModule(_63_13), un_45_63 = _ms.get(_$15, "un-?"), Array_33 = _ms.getDefaultExport(Array_33_14), _$17 = _ms.getModule(Range_15), range = _ms.get(_$17, "range"), _$18 = _ms.getModule(Seq_16), _63nth = _ms.get(_$18, "?nth"), reverse = _ms.get(_$18, "reverse"), Seq_33 = _ms.getDefaultExport(Seq_33_17), _$19 = _ms.getModule(Seq_33_17), _60_43_43_33 = _ms.get(_$19, "<++!"), _43_43_62_33 = _ms.get(_$19, "++>!"), _63_60pop_33 = _ms.get(_$19, "?<pop!"), _63pop_62_33 = _ms.get(_$19, "?pop>!"), set_45nth_33 = _ms.get(_$19, "set-nth!");
		const exports = { };
		const Deque_33 = Obj_45Type(function() {
			const doc = "Seq! that can efficiently add values on either side.";
			const props = function() {
				const data_33 = Array_33;
				const start_45index_33 = Nat;
				const end_45index_33 = Nat;
				return {
					"data!": data_33,
					"start-index!": start_45index_33,
					"end-index!": end_45index_33,
					displayName: "props"
				}
			}();
			return {
				doc: doc,
				props: props,
				displayName: "Deque!"
			}
		}());
		self_45kind_33(Deque_33, _64_45Type, function() {
			const _k0 = empty, _v0 = function() {
				return Deque_33(function() {
					const data_33 = empty(Array_33, 8);
					const start_45index_33 = 0;
					const end_45index_33 = 0;
					return {
						"data!": data_33,
						"start-index!": start_45index_33,
						"end-index!": end_45index_33
					}
				}())
			};
			return _ms.map(_k0, _v0)
		}());
		const capacity = function(_) {
			return count(_["data!"])
		};
		const expand_33 = function(_) {
			const old_45data = _["data!"];
			const old_45capacity = capacity(_);
			const new_45capacity = _42(2, old_45capacity);
			const new_45data = empty(Array_33, new_45capacity);
			each_33(range(0, old_45capacity), function(index) {
				return set_45nth_33(new_45data, index, _ms.sub(old_45data, index))
			});
			return p_33(_, "data!", new_45data)
		};
		const wrap_45index = function(_, index) {
			return modulo(index, capacity(_))
		};
		const next_45index = function(_, index) {
			_ms.checkContains(Nat, index, "index");
			return wrap_45index(_, _43(index, 1))
		};
		const prev_45index = function(_, index) {
			_ms.checkContains(Nat, index, "index");
			return wrap_45index(_, _45(index, 1))
		};
		const _63data_45index = function(_, index) {
			_ms.checkContains(Nat, index, "index");
			const a = _43(_["start-index!"], index);
			return function() {
				switch (true) {
					case _ms.bool(_60_63(a, capacity(_))): {
						return _if(or(_60_63(_["end-index!"], _["start-index!"]), _ms.lazy(function() {
							return _60_63(a, _["end-index!"])
						})), a)
					}
					default: {
						const b = wrap_45index(_, a);
						return _if(and(_60_63(_["end-index!"], _["start-index!"]), _ms.lazy(function() {
							return _60_63(b, _["end-index!"])
						})), b)
					}
				}
			}()
		};
		kind_33(Deque_33, Seq_33, function() {
			const _k0 = iterator, _v0 = function(_) {
				const indices = function() {
					switch (true) {
						case _ms.bool(_60_63(_["end-index!"], _["start-index!"])): {
							return _43_43(range(_["start-index!"], count(_["data!"])), range(0, _["end-index!"]))
						}
						default: {
							return range(_["start-index!"], _["end-index!"])
						}
					}
				}();
				return iterator(map(indices, _ms.sub(sub, _["data!"])))
			};
			const _k1 = _60_43_43_33, _v1 = function(_, ems) {
				_ms.checkContains(_64, ems, "ems");
				return each_33(reverse(ems), function(em) {
					const new_45start = prev_45index(_, _["start-index!"]);
					switch (true) {
						case _ms.bool(_61_63(new_45start, _["end-index!"])):
							{
								expand_33(_);
								_60_43_43_33(_, [ em ])
							};
							break
						default: {
							p_33(_, "start-index!", new_45start);
							set_45nth_33(_["data!"], _["start-index!"], em)
						}
					}
				})
			};
			const _k2 = _43_43_62_33, _v2 = function(_, ems) {
				_ms.checkContains(_64, ems, "ems");
				return each_33(ems, function(em) {
					const new_45end = next_45index(_, _["end-index!"]);
					switch (true) {
						case _ms.bool(_61_63(new_45end, _["start-index!"])):
							{
								expand_33(_);
								_43_43_62_33(_, [ em ])
							};
							break
						default: {
							set_45nth_33(_["data!"], _["end-index!"], em);
							p_33(_, "end-index!", new_45end)
						}
					}
				})
			};
			const _k3 = _63_60pop_33, _v3 = function(_) {
				return _if(not(empty_63(_)), _ms.lazy(function() {
					return function() {
						const x = _ms.sub(_["data!"], _["start-index!"]);
						p_33(_, "start-index!", next_45index(_, _["start-index!"]));
						return x
					}()
				}))
			};
			const _k4 = _63pop_62_33, _v4 = function(_) {
				return _if(not(empty_63(_)), _ms.lazy(function() {
					return function() {
						const new_45end = prev_45index(_, _["end-index!"]);
						p_33(_, "end-index!", new_45end);
						return _ms.sub(_["data!"], new_45end)
					}()
				}))
			};
			const _k5 = _63nth, _v5 = function(_, index) {
				_ms.checkContains(Nat, index, "index");
				return map(_63data_45index(_, index), _ms.sub(sub, _["data!"]))
			};
			const _k6 = set_45nth_33, _v6 = function(_, index, set_45to) {
				_ms.checkContains(Nat, index, "index");
				_ms.checkContains(Any, set_45to, "set-to");
				const data_45index = un_45_63(_63data_45index(_, index), _ms.lazy(function() {
					return ((("Can't set at index " + _ms.show(index)) + "; count is ") + _ms.show(count(_)))
				}));
				return set_45nth_33(_["data!"], data_45index, set_45to)
			};
			const _k7 = empty_33, _v7 = function(_) {
				empty_33(_["data!"]);
				p_33(_, "start-index!", 0);
				return p_33(_, "end-index!", 0)
			};
			return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3, _k4, _v4, _k5, _v5, _k6, _v6, _k7, _v7)
		}());
		exports.default = Deque_33;
		const displayName = exports.displayName = "Deque!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9EZXF1ZSEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQW9CQTtBQUFBOztFQUFBLGlCQUFTLHNCQUFRO0FBQUEsR0FDaEIsWUFBTTtBQUFBLEdBQ04seUJBQU07QUFBQSxJQUNMLGdCQUFPO0FBQUEsSUFDUCx5QkFBYztBQUFBLElBQ2QsdUJBQVk7QUFBQSxXQUhQO0FBQUE7Ozs7OztVQUZVO0FBQUE7Ozs7O0VBT2pCLGVBQUEsVUFBQSx1QkFBd0I7QUFBQSxHQUN2QixZQUFBLGFBQVUsV0FDVDtBQUFBLFdBQUEsb0JBQU07QUFBQSxLQUNMLGdCQUFPLE1BQUEsVUFBYTtBQUFBLEtBQ3BCLHlCQUFjO0FBQUEsS0FDZCx1QkFBWTtBQUFBLFlBSFA7QUFBQTs7Ozs7Ozs7RUFNUCxpQkFBWSxTQUFBLEdBQ1g7QUFBQSxVQUFBLE1BQU07O0VBRVAsa0JBQVcsU0FBQSxHQUNWO0FBQUEsR0FBQSxtQkFBVztHQUNYLHVCQUFlLFNBQUE7QUFBQSxHQUNmLHVCQUFlLElBQUUsR0FBRjtBQUFBLEdBQ2YsbUJBQVcsTUFBQSxVQUFBO0FBQUEsR0FDWCxRQUFNLE1BQU8sR0FBUCxpQkFBd0IsU0FBQSxPQUM3QjtBQUFBLFdBQUEsYUFBQSxZQUFBLGVBQXdCLFlBQVE7QUFBQTtBQUFBLFVBQ2pDLEtBQUcsR0FBRyxTQUFOO0FBQUE7QUFBQSxFQUVELHFCQUFjLFNBQUEsR0FBRSxPQUNmO0FBQUEsVUFBQSxPQUFBLE9BQUEsU0FBYTtBQUFBO0FBQUEsRUFFZCxxQkFBYyxTQUFBLEdBQUUsT0FDZjtBQUFBLHFCQURxQjtVQUNyQixhQUFXLEdBQUUsSUFBQSxPQUFTO0FBQUE7QUFBQSxFQUV2QixxQkFBYyxTQUFBLEdBQUUsT0FDZjtBQUFBLHFCQURxQjtVQUNyQixhQUFXLEdBQUUsSUFBQSxPQUFTO0FBQUE7QUFBQSxFQUV2Qix3QkFBZSxTQUFBLEdBQUUsT0FDaEI7QUFBQSxx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