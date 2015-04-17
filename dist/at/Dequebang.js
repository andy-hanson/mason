"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../Bool", "../compare", "../control", "../math/Num", "../math/methods", "../methods", "../Objbang", "./Seqbang", "../Type/Kind", "../Type/Pred-Type", "../Type/Obj-Type", "./at", "./atbang", "./at-Type", "./q", "./Arraybang", "./Range", "./Seq" ], function(exports, Bool_0, compare_1, control_2, Num_3, methods_4, methods_5, Obj_33_6, Seq_33_7, Kind_8, Pred_45Type_9, Obj_45Type_10, _64_11, _64_33_12, _64_45Type_13, _63_14, Array_33_15, Range_16, Seq_17) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Bool_0), and = _ms.get(_$2, "and"), not = _ms.get(_$2, "not"), or = _ms.get(_$2, "or"), _$3 = _ms.getModule(compare_1), _61_63 = _ms.get(_$3, "=?"), _60_63 = _ms.get(_$3, "<?"), _$4 = _ms.getModule(control_2), _if = _ms.get(_$4, "if"), _$5 = _ms.getModule(Num_3), modulo = _ms.get(_$5, "modulo"), Nat = _ms.get(_$5, "Nat"), _$6 = _ms.getModule(methods_4), _43 = _ms.get(_$6, "+"), _45 = _ms.get(_$6, "-"), _42 = _ms.get(_$6, "*"), _$7 = _ms.getModule(methods_5), sub = _ms.get(_$7, "sub"), _$8 = _ms.getModule(Obj_33_6), p_33 = _ms.get(_$8, "p!"), Seq_33 = _ms.getDefaultExport(Seq_33_7), _$9 = _ms.getModule(Seq_33_7), _60_43_43_33 = _ms.get(_$9, "<++!"), _43_43_62_33 = _ms.get(_$9, "++>!"), _63_60pop_33 = _ms.get(_$9, "?<pop!"), _63pop_62_33 = _ms.get(_$9, "?pop>!"), set_45nth_33 = _ms.get(_$9, "set-nth!"), _$10 = _ms.getModule(Kind_8), kind_33 = _ms.get(_$10, "kind!"), self_45kind_33 = _ms.get(_$10, "self-kind!"), _$11 = _ms.getModule(Pred_45Type_9), Any = _ms.get(_$11, "Any"), Obj_45Type = _ms.getDefaultExport(Obj_45Type_10), _64 = _ms.getDefaultExport(_64_11), _$13 = _ms.getModule(_64_11), _43_43 = _ms.get(_$13, "++"), count = _ms.get(_$13, "count"), each_33 = _ms.get(_$13, "each!"), empty_63 = _ms.get(_$13, "empty?"), iterator = _ms.get(_$13, "iterator"), map = _ms.get(_$13, "map"), map_39 = _ms.get(_$13, "map'"), _$14 = _ms.getModule(_64_33_12), empty_33 = _ms.get(_$14, "empty!"), _64_45Type = _ms.getDefaultExport(_64_45Type_13), _$15 = _ms.getModule(_64_45Type_13), empty = _ms.get(_$15, "empty"), _$16 = _ms.getModule(_63_14), un_45_63 = _ms.get(_$16, "un-?"), Array_33 = _ms.getDefaultExport(Array_33_15), _$18 = _ms.getModule(Range_16), range = _ms.get(_$18, "range"), _$19 = _ms.getModule(Seq_17), _63nth = _ms.get(_$19, "?nth"), reverse = _ms.get(_$19, "reverse");
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
				return map_39(_63data_45index(_, index), _ms.sub(sub, _["data!"]))
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
//# sourceMappingURL=../at/Dequebang.js.map