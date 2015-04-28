"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../compare", "../../control", "../../Fun", "../../math/Num", "../../math/methods", "../../Type/Kind", "../../Type/Pred-Type", "../../Type/Obj-Type", "../at", "../at-Type", "./Seq", "../../bang", "../../compare", "../../math/Num", "../q", "./Seq" ], function(exports, compare_0, control_1, Fun_2, Num_3, methods_4, Kind_5, Pred_45Type_6, Obj_45Type_7, _64_8, _64_45Type_9, Seq_10, _33_11, compare_12, Num_13, _63_14, Seq_15) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(compare_0), _60_63 = _ms.get(_$2, "<?"), _60_61_63 = _ms.get(_$2, "<=?"), _$3 = _ms.getModule(control_1), _if = _ms.get(_$3, "if"), opr = _ms.get(_$3, "opr"), Ref_33 = _ms.get(_$3, "Ref!"), get = _ms.get(_$3, "get"), set_33 = _ms.get(_$3, "set!"), _$4 = _ms.getModule(Fun_2), noop = _ms.get(_$4, "noop"), thunk = _ms.get(_$4, "thunk"), Num = _ms.getDefaultExport(Num_3), _$5 = _ms.getModule(Num_3), Nat = _ms.get(_$5, "Nat"), round_45down = _ms.get(_$5, "round-down"), sign = _ms.get(_$5, "sign"), _$6 = _ms.getModule(methods_4), _43 = _ms.get(_$6, "+"), _45 = _ms.get(_$6, "-"), _42 = _ms.get(_$6, "*"), _47 = _ms.get(_$6, "/"), _$7 = _ms.getModule(Kind_5), kind_33 = _ms.get(_$7, "kind!"), self_45kind_33 = _ms.get(_$7, "self-kind!"), _$8 = _ms.getModule(Pred_45Type_6), Opt = _ms.get(_$8, "Opt"), Obj_45Type = _ms.getDefaultExport(Obj_45Type_7), _64 = _ms.getDefaultExport(_64_8), _$10 = _ms.getModule(_64_8), count = _ms.get(_$10, "count"), iterator = _ms.get(_$10, "iterator"), _64_45Type = _ms.getDefaultExport(_64_45Type_9), _$11 = _ms.getModule(_64_45Type_9), empty = _ms.get(_$11, "empty"), from_45stream = _ms.get(_$11, "from-stream"), _$12 = _ms.getModule(Seq_10), _63nth = _ms.get(_$12, "?nth"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_11)
		}), _$15 = _ms.lazyGetModule(compare_12), _61_63 = _ms.lazyProp(_$15, "=?"), _$16 = _ms.lazyGetModule(Num_13), infinity = _ms.lazyProp(_$16, "infinity"), _63 = _ms.lazy(function() {
			return _ms.getDefaultExport(_63_14)
		}), _$18 = _ms.lazyGetModule(Seq_15), seq_61_63 = _ms.lazyProp(_$18, "seq=?"), take_39 = _ms.lazyProp(_$18, "take'");
		const exports = { };
		const Range = Obj_45Type(function() {
			const doc = "Seq of Nums taking fixed steps.";
			const props = function() {
				const start = Num;
				const end = Num;
				const step = Num;
				return {
					start: start,
					end: end,
					step: step,
					displayName: "props"
				}
			}();
			const post_45construct = function(_) {
				_ms.unlazy(_33)(_ms.unlazy(_61_63), sign(_.step), sign(_45(_.end, _.start)));
				return noop(_)
			};
			const test = function() {
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63), [ 0, 1, 2 ], _ms.unlazy(take_39)(range(0, _ms.unlazy(infinity)), 3))
			};
			return {
				doc: doc,
				props: props,
				"post-construct": post_45construct,
				test: test,
				displayName: "Range"
			}
		}());
		const range = exports.range = function(_45start_45, _45end_45, _63step) {
			_ms.checkContains(Num, _45start_45, "-start-");
			_ms.checkContains(Num, _45end_45, "-end-");
			_ms.checkContains(_ms.sub(Opt, Num), _63step, "?step");
			const _45step_45 = opr(_63step, sign(_45(_45end_45, _45start_45)));
			return Range(function() {
				const start = _45start_45;
				const end = _45end_45;
				const step = _45step_45;
				return {
					start: start,
					end: end,
					step: step
				}
			}())
		};
		const range_45incl = exports["range-incl"] = function() {
			const doc = "TODO";
			const test = function() {
				return "TODO"
			};
			return _ms.set(function(start, end, _63step) {
				_ms.checkContains(Num, start, "start");
				_ms.checkContains(Num, end, "end");
				_ms.checkContains(_ms.sub(Opt, Num), _63step, "?step");
				const step = opr(_63step, sign(_45(end, start)));
				return range(start, _43(end, step), step)
			}, "doc", doc, "test", test, "displayName", "range-incl")
		}();
		self_45kind_33(Range, _64_45Type, function() {
			const _k0 = empty, _v0 = thunk(range(0, 0));
			const _k1 = from_45stream, _v1 = function(_) {
				return _
			};
			return _ms.map(_k0, _v0, _k1, _v1)
		}());
		const length = exports.length = function() {
			const doc = "Difference between and and start values.";
			const test = function() {
				const _k0 = [ range(5, 10, 2) ], _v0 = 5;
				const _k1 = [ range(5, 10, 3) ], _v1 = 5;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_) {
				_ms.checkContains(Range, _, "_");
				return _45(_.end, _.start)
			}, "doc", doc, "test", test, "displayName", "length")
		}();
		kind_33(Range, _64, function() {
			const _k0 = _63nth, _v0 = function() {
				const test = function() {
					const r = range(0, 10, 2);
					const _k0 = [ r, 2 ], _v0 = _ms.unlazy(_63)(4);
					const _k1 = [ r, 6 ], _v1 = empty(_ms.unlazy(_63));
					return _ms.map(_k0, _v0, _k1, _v1)
				};
				return _ms.set(function(_, n) {
					_ms.checkContains(Nat, n, "n");
					const it = _43(_.start, _42(_.step, n));
					return _if(_60_63(it, _.end), it)
				}, "test", test)
			}();
			const _k1 = count, _v1 = function() {
				const test = function() {
					const _k0 = [ range(0, 2, 0.5) ], _v0 = 4;
					return _ms.map(_k0, _v0)
				};
				return _ms.set(function(_) {
					return round_45down(_47(length(_), _.step))
				}, "test", test)
			}();
			const _k2 = iterator, _v2 = function() {
				const test = function() {
					return _ms.unlazy(_33)(_ms.unlazy(seq_61_63), range(0, 10, 2), [ 0, 2, 4, 6, 8 ])
				};
				return _ms.set(function*(range) {
					const cur = Ref_33(range.start);
					loop84: while (true) {
						{
							const _ = get(cur);
							switch (true) {
								case _ms.bool(_60_61_63(range.end, _)):
									{
										break loop84
									};
									break
								default: {
									(yield _);
									set_33(cur, _43(_, range.step))
								}
							}
						}
					}
				}, "test", test)
			}();
			return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
		}());
		exports.default = Range;
		const displayName = exports.displayName = "Range";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9SYW5nZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7b0NBbUJBO0FBQUE7Ozs7OztFQUFBLGNBQVEsc0JBQVE7QUFBQSxHQUNmLFlBQU07QUFBQSxHQUNOLHlCQUFNO0FBQUEsSUFDTCxjQUFPO0FBQUEsSUFDUCxZQUFLO0FBQUEsSUFDTCxhQUFNO0FBQUEsV0FIRDtBQUFBOzs7Ozs7R0FJTix5QkFBaUIsU0FBQSxHQUdoQjtBQUFBLHdDQURNLEtBQU0sU0FBUSxLQUFNLElBQUcsT0FBTTtXQUNuQyxLQUFLO0FBQUE7QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLGtEQUFRLEVBQUUsR0FBRSxHQUFFLHlCQUFXLE1BQU8sMEJBQVk7QUFBQTtBQUFBLFVBWDlCO0FBQUE7Ozs7Ozs7RUFjaEIsOEJBQVEsU0FBQSxhQUFZLFdBQVUsU0FDN0I7QUFBQSxxQkFEZTtxQkFBVTs2QkFBVSxLQUFHO0dBQ3RDLG1CQUFTLElBQUEsU0FBVSxLQUFNLElBQUEsV0FBQTtBQUFBLFVBQ3pCLGlCQUFLO0FBQUEsSUFDSixjQUFPO0FBQUEsSUFDUCxZQUFLO0FBQUEsSUFDTCxhQUFNO0FBQUEsV0FIRjtBQUFBOzs7Ozs7RUFLTix3REFBVztBQUFBLEdBQ1YsWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsV0FBQztBQUFBO0FBQUEsa0JBQ0QsU0FBQSxPQUFVLEtBQVEsU0FDbEI7QUFBQSxzQkFETTtzQkFBUTs4QkFBVSxLQUFHO0lBQzNCLGFBQU8sSUFBQSxTQUFVLEtBQU0sSUFBQSxLQUFBO0FBQUEsV0FDdkIsTUFBQSxPQUFZLElBQUEsS0FBQSxPQUFaO0FBQUE7O0VBRUYsZUFBQSxPQUFBLHVCQUF1QjtBQUFBLEdBQ3RCLFlBQUEsYUFBUyxNQUFNLE1BQU8sR0FBRTtBQUFBLEdBR3hCLFlBQUEscUJBQWdCLFNBQUEsR0FDZjtBQUFBLFdBQUE7QUFBQTtBQUFBOztFQUVGLDJDQUFPO0FBQUEsR0FDTixZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSxJQUFBLFlBQUEsRUFBRSxNQUFPLEdBQUUsSUFBRyxZQUFRO0FBQUEsSUFDdEIsWUFBQSxFQUFFLE1BQU8sR0FBRSxJQUFHLFlBQVE7QUFBQTs7a0JBQ3RCLFNBQUEsR0FDQTtBQUFBLHNCQURFO1dBQ0YsSUFBRSxPQUFNOzs7RUFFVixRQUFBLE9BQUEsZ0JBQWE7QUFBQSxHQUNaLFlBQUEseUJBQU87QUFBQSxJQUNOLGFBQU8sV0FDTjtBQUFBLEtBQUEsVUFBSSxNQUFNLEdBQUUsSUFBRztBQUFBLEtBQ2YsWUFBQSxFQUFBLEdBQUksMkJBQVM7QUFBQSxLQUNiLFlBQUEsRUFBQSxHQUFJLFdBQU87OzttQkFDWCxTQUFBLEdBQUUsR0FDRjtBQUFBLHVCQURJO0tBQ0osV0FBSyxJQUFFLFNBQVEsSUFBRyxRQUFIO0FBQUEsWUFDZixJQUFHLE9BQUEsSUFBTyxRQUFWO0FBQUE7O0dBQ0YsWUFBQSx3QkFBUTtBQUFBLElBQ1AsYUFBTyxXQUNOO0FBQUEsS0FBQSxZQUFBLEVBQUUsTUFBTyxHQUFFLEdBQUUsY0FBVTtBQUFBOzttQkFDdkIsU0FBQSxHQUNBO0FBQUEsWUFBQSxhQUFXLElBQUEsT0FBRyxJQUFROzs7R0FFeEIsWUFBQSwyQkFBVztBQUFBLElBQ1YsYUFBTyxXQUNOO0FBQUEsbURBQVEsTUFBTyxHQUFFLElBQUcsSUFBRyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQTtBQUFBLG1CQUNoQyxVQUFBLE9BQ0Q7QUFBQSxLQUFBLFlBQU0sT0FBSzswQkFFVjtBQUFBLE1BQU07QUFBQSxPQUFBLFVBQUEsSUFBQTtBQUFBO1FBQ0wsY0FBQSxVQUFJLFdBQVU7QUFBQSxTQUNiO0FBQUEsVUFBQTs7O2lCQUVBO0FBQUEsU0FBRyxPQUFBO0FBQUEsU0FDSCxPQUFBLEtBQVMsSUFBRyxHQUFFOzs7Ozs7Ozs7b0JBVXBCO0FBQUEsRUFuR0EsMENBQUE7QUFBQSIsImZpbGUiOiJhdC9TZXEvUmFuZ2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==