"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../Bool", "../compare", "../control", "../math/Num", "../math/methods", "./Priority-Queuebang", "../Type/Kind", "../Type/Wrap-Type", "./at", "./atbang", "./at-Type", "./q", "./Arraybang", "./Seq", "./Seqbang" ], function(exports, Bool_0, compare_1, control_2, Num_3, methods_4, Priority_45Queue_33_5, Kind_6, Wrap_45Type_7, _64_8, _64_33_9, _64_45Type_10, _63_11, Array_33_12, Seq_13, Seq_33_14) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Bool_0), and = _ms.get(_$2, "and"), not = _ms.get(_$2, "not"), _$3 = _ms.getModule(compare_1), _60_63 = _ms.get(_$3, "<?"), _$4 = _ms.getModule(control_2), if_33 = _ms.get(_$4, "if!"), returning = _ms.get(_$4, "returning"), _$5 = _ms.getModule(Num_3), int_47 = _ms.get(_$5, "int/"), _$6 = _ms.getModule(methods_4), _43 = _ms.get(_$6, "+"), _45 = _ms.get(_$6, "-"), _42 = _ms.get(_$6, "*"), Priority_45Queue_33 = _ms.getDefaultExport(Priority_45Queue_33_5), _$7 = _ms.getModule(Priority_45Queue_33_5), _63pop_33 = _ms.get(_$7, "?pop!"), _$8 = _ms.getModule(Kind_6), kind_33 = _ms.get(_$8, "kind!"), self_45kind_33 = _ms.get(_$8, "self-kind!"), Wrap_45Type = _ms.getDefaultExport(Wrap_45Type_7), _$10 = _ms.getModule(_64_8), count = _ms.get(_$10, "count"), each_33 = _ms.get(_$10, "each!"), empty_63 = _ms.get(_$10, "empty?"), iterator = _ms.get(_$10, "iterator"), map_39 = _ms.get(_$10, "map'"), _$11 = _ms.getModule(_64_33_9), _43_43_33 = _ms.get(_$11, "++!"), empty_33 = _ms.get(_$11, "empty!"), _64_45Type = _ms.getDefaultExport(_64_45Type_10), _$12 = _ms.getModule(_64_45Type_10), empty = _ms.get(_$12, "empty"), _$13 = _ms.getModule(_63_11), un_45_63 = _ms.get(_$13, "un-?"), Array_33 = _ms.getDefaultExport(Array_33_12), _$15 = _ms.getModule(Seq_13), _63first = _ms.get(_$15, "?first"), _$16 = _ms.getModule(Seq_33_14), _63pop_62_33 = _ms.get(_$16, "?pop>!"), set_45nth_33 = _ms.get(_$16, "set-nth!");
		const exports = { };
		const Heap_45Priority_45Queue_33 = Wrap_45Type(function() {
			const doc = "Default implementation for Priority-Queue!.";
			const wrapped_45type = Array_33;
			return {
				doc: doc,
				"wrapped-type": wrapped_45type,
				displayName: "Heap-Priority-Queue!"
			}
		}());
		self_45kind_33(Heap_45Priority_45Queue_33, _64_45Type, function() {
			const _k0 = empty, _v0 = function() {
				return Heap_45Priority_45Queue_33(empty(Array_33))
			};
			return _ms.map(_k0, _v0)
		}());
		kind_33(Heap_45Priority_45Queue_33, Priority_45Queue_33, function() {
			const _k0 = _43_43_33, _v0 = function(_, added) {
				return each_33(added, _ms.sub(add_33, _.val))
			};
			const _k1 = _63pop_33, _v1 = function(_) {
				const heap = _.val;
				return map_39(_63first(heap), function(first) {
					return returning(first, function() {
						const last_45leaf = un_45_63(_63pop_62_33(heap));
						return if_33(not(empty_63(_)), function() {
							return fix_45down_33(heap, last_45leaf)
						})
					})
				})
			};
			const _k2 = empty_63, _v2 = function(_) {
				return empty_63(_.val)
			};
			const _k3 = empty_33, _v3 = function(_) {
				return empty_33(_.val)
			};
			const _k4 = iterator, _v4 = function(_) {
				return iterator(_.val)
			};
			return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3, _k4, _v4)
		}());
		const idx_45left = function(idx) {
			return _43(1, _42(2, idx))
		};
		const idx_45right = function(idx) {
			return _43(2, _42(2, idx))
		};
		const idx_45parent = function(idx) {
			return _45(int_47(_43(1, idx), 2), 1)
		};
		const add_33 = function(heap, em) {
			heap.push(em);
			return fix_45up_33(heap, em)
		};
		const fix_45up_33 = function(heap, val) {
			const rec_33 = function(idx) {
				const ip = _ms.lazy(function() {
					return idx_45parent(idx)
				});
				const parent = _ms.lazy(function() {
					return _ms.sub(heap, _ms.unlazy(ip))
				});
				switch (true) {
					case _ms.bool(and(_60_63(0, idx), _ms.lazy(function() {
						return _60_63(val, _ms.unlazy(parent))
					}))):
						{
							set_45nth_33(heap, idx, _ms.unlazy(parent));
							rec_33(_ms.unlazy(ip))
						};
						break
					default: {
						set_45nth_33(heap, idx, val)
					}
				}
			};
			return rec_33(_45(count(heap), 1))
		};
		const fix_45down_33 = function(heap, val) {
			const size = count(heap);
			const rec_33 = function(idx) {
				const il = idx_45left(idx);
				const left = _ms.lazy(function() {
					return _ms.sub(heap, il)
				});
				const l_60 = and(_60_63(il, size), _ms.lazy(function() {
					return _60_63(_ms.unlazy(left), val)
				}));
				const ir = idx_45right(idx);
				const right = _ms.lazy(function() {
					return _ms.sub(heap, ir)
				});
				const r_60 = and(_60_63(ir, size), _ms.lazy(function() {
					return _60_63(_ms.unlazy(right), val)
				}));
				const fill_33 = function(val) {
					return set_45nth_33(heap, idx, val)
				};
				const rec_45left_33 = function() {
					fill_33(_ms.unlazy(left));
					return rec_33(il)
				};
				const rec_45right_33 = function() {
					fill_33(_ms.unlazy(right));
					return rec_33(ir)
				};
				switch (true) {
					case _ms.bool(l_60):
						{
							switch (true) {
								case _ms.bool(and(r_60, _ms.lazy(function() {
									return _60_63(_ms.unlazy(right), _ms.unlazy(left))
								}))):
									{
										rec_45right_33()
									};
									break
								default: {
									rec_45left_33()
								}
							}
						};
						break
					case _ms.bool(r_60):
						{
							rec_45right_33(null)
						};
						break
					default: {
						fill_33(val)
					}
				}
			};
			return rec_33(0)
		};
		exports.default = Heap_45Priority_45Queue_33;
		const displayName = exports.displayName = "Heap-Priority-Queue!";
		return exports
	})
})
//# sourceMappingURL=../at/Heap-Priority-Queuebang.js.map