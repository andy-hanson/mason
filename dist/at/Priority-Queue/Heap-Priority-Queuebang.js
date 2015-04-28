"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../Bool", "../../compare", "../../control", "../../math/Num", "../../math/methods", "../../Type/Kind", "../../Type/Wrap-Type", "../at", "../atbang", "../at-Type", "../q", "../Seq/Arraybang", "../Seq/Seq", "../Seq/Seqbang", "./Priority-Queuebang" ], function(exports, Bool_0, compare_1, control_2, Num_3, methods_4, Kind_5, Wrap_45Type_6, _64_7, _64_33_8, _64_45Type_9, _63_10, Array_33_11, Seq_12, Seq_33_13, Priority_45Queue_33_14) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Bool_0), and = _ms.get(_$2, "and"), not = _ms.get(_$2, "not"), _$3 = _ms.getModule(compare_1), _60_63 = _ms.get(_$3, "<?"), _$4 = _ms.getModule(control_2), if_33 = _ms.get(_$4, "if!"), returning = _ms.get(_$4, "returning"), _$5 = _ms.getModule(Num_3), int_47 = _ms.get(_$5, "int/"), _$6 = _ms.getModule(methods_4), _43 = _ms.get(_$6, "+"), _45 = _ms.get(_$6, "-"), _42 = _ms.get(_$6, "*"), _$7 = _ms.getModule(Kind_5), kind_33 = _ms.get(_$7, "kind!"), self_45kind_33 = _ms.get(_$7, "self-kind!"), Wrap_45Type = _ms.getDefaultExport(Wrap_45Type_6), _$9 = _ms.getModule(_64_7), count = _ms.get(_$9, "count"), each_33 = _ms.get(_$9, "each!"), empty_63 = _ms.get(_$9, "empty?"), iterator = _ms.get(_$9, "iterator"), map = _ms.get(_$9, "map"), _$10 = _ms.getModule(_64_33_8), _43_43_33 = _ms.get(_$10, "++!"), empty_33 = _ms.get(_$10, "empty!"), _64_45Type = _ms.getDefaultExport(_64_45Type_9), _$11 = _ms.getModule(_64_45Type_9), empty = _ms.get(_$11, "empty"), _$12 = _ms.getModule(_63_10), un_45_63 = _ms.get(_$12, "un-?"), Array_33 = _ms.getDefaultExport(Array_33_11), _$14 = _ms.getModule(Seq_12), _63first = _ms.get(_$14, "?first"), _$15 = _ms.getModule(Seq_33_13), _63pop_62_33 = _ms.get(_$15, "?pop>!"), set_45nth_33 = _ms.get(_$15, "set-nth!"), Priority_45Queue_33 = _ms.getDefaultExport(Priority_45Queue_33_14), _$16 = _ms.getModule(Priority_45Queue_33_14), _63pop_33 = _ms.get(_$16, "?pop!");
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
				return map(_63first(heap), function(first) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWUhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvQ0FpQkE7QUFBQTs7RUFBQSxtQ0FBdUIsdUJBQVM7QUFBQSxHQUMvQixZQUFNO0FBQUEsR0FDTix1QkFBYztBQUFBLFVBRmlCO0FBQUE7Ozs7O0VBSWhDLGVBQUEsNEJBQUEsdUJBQXNDO0FBQUEsR0FDckMsWUFBQSxhQUFVLFdBQ1Q7QUFBQSxXQUFBLDJCQUFxQixNQUFBO0FBQUE7QUFBQTs7RUFFdkIsUUFBQSw0QkFBQSxnQ0FBMEM7QUFBQSxHQUN6QyxZQUFBLGlCQUFRLFNBQUEsR0FBRSxPQUNUO0FBQUEsV0FBQSxRQUFBLGVBQVksUUFBSzs7R0FDbEIsWUFBQSxpQkFBVSxTQUFBLEdBQ1Q7QUFBQSxJQUFBLGFBQU87V0FDUCxJQUFJLFNBQUEsT0FBZSxTQUFBLE9BQ2xCO0FBQUEsWUFBQSxVQUFBLE9BQWlCLFdBQ2hCO0FBQUEsTUFBQSxvQkFBWSxTQUFLLGFBQUE7QUFBQSxhQUNqQixNQUFJLElBQUEsU0FBSyxLQUFVLFdBQ2xCO0FBQUEsY0FBQSxjQUFBLE1BQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQ0osWUFBQSxnQkFBVyxTQUFBLEdBQ1Y7QUFBQSxXQUFBLFNBQU87O0dBQ1IsWUFBQSxnQkFBVyxTQUFBLEdBQ1Y7QUFBQSxXQUFBLFNBQU87O0dBQ1IsWUFBQSxnQkFBYSxTQUFBLEdBQ1o7QUFBQSxXQUFBLFNBQVM7Ozs7RUFJVixtQkFBWSxTQUFBLEtBQ1g7QUFBQSxVQUFBLElBQUUsR0FBRSxJQUFHLEdBQUg7QUFBQTtBQUFBLEVBQ0wsb0JBQWEsU0FBQSxLQUNaO0FBQUEsVUFBQSxJQUFFLEdBQUUsSUFBRyxHQUFIO0FBQUE7QUFBQSxFQUNMLHFCQUFjLFNBQUEsS0FDYjtBQUFBLFVBQUEsSUFBRSxPQUFNLElBQUcsR0FBSCxNQUFVLElBQUc7QUFBQTtBQUFBLEVBRXRCLGVBQVEsU0FBQSxNQUFLLElBQ1o7QUFBQSxHQUFBLFVBQUE7QUFBQSxVQUNBLFlBQUEsTUFBQTtBQUFBO0FBQUEsRUFHRCxvQkFBVyxTQUFBLE1BQUssS0FDZjtBQUFBLEdBQUEsZUFBUSxTQUFBLEtBQ1A7QUFBQSxJQUFBO1lBQU0sYUFBQTtBQUFBO0FBQUEsSUFDTjtvQkFBVTs7SUFDTDtLQUNKLGNBQUEsSUFBSSxPQUFJLEdBQUo7YUFBWSxPQUFBOztNQUNmO0FBQUEsT0FBQSxhQUFBLE1BQUE7T0FDQTs7O2NBRUE7QUFBQSxNQUFBLGFBQUEsTUFBQSxLQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFDSCxPQUFLLElBQUcsTUFBQSxPQUFhO0FBQUE7QUFBQSxFQUl0QixzQkFBYSxTQUFBLE1BQUssS0FDakI7QUFBQSxHQUFBLGFBQU8sTUFBQTtBQUFBLEdBQ1AsZUFBUSxTQUFBLEtBQ1A7QUFBQSxJQUFBLFdBQUssV0FBQTtBQUFBLElBQ0w7b0JBQVEsTUFBSTtBQUFBO0FBQUEsSUFDWixhQUFLLElBQUksT0FBQSxJQUFBO1lBQWMseUJBQUE7QUFBQTtBQUFBLElBQ3ZCLFdBQUssWUFBQTtBQUFBLElBQ0w7b0JBQVMsTUFBSTtBQUFBO0FBQUEsSUFDYixhQUFLLElBQUksT0FBQSxJQUFBO1lBQWMsMEJBQUE7QUFBQTtBQUFBLElBRXZCLGdCQUFTLFNBQUEsS0FDUjtBQUFBLFlBQUEsYUFBQSxNQUFBLEtBQUE7QUFBQTtBQUFBLElBQ0Qsc0JBQWEsV0FDWjtBQUFBLEtBQUE7WUFDQSxPQUFBO0FBQUE7QUFBQSxJQUNELHVCQUFjLFdBQ2I7QUFBQSxLQUFBO1lBQ0EsT0FBQTtBQUFBO0FBQUEsSUFDSTtLQUNKLGNBQUE7QUFBQSxNQUNDO0FBQUEsT0FBSztRQUNKLGNBQUEsSUFBQTtnQkFBUTs7U0FDUDtBQUFBLFVBQUE7QUFBQTtBQUFBO2lCQUVBO0FBQUEsU0FBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0tBQ0gsY0FBQTtBQUFBLE1BQ0M7QUFBQSxPQUFBLGVBQVc7QUFBQTtBQUFBO2NBRVg7QUFBQSxNQUFBLFFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUNILE9BQUs7QUFBQTtBQUFBLG9CQUVQO0FBQUEsRUFyR0EsMENBQUE7QUFBQSIsImZpbGUiOiJhdC9Qcmlvcml0eS1RdWV1ZS9IZWFwLVByaW9yaXR5LVF1ZXVlYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9