"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../compare", "../Obj", "../show", "../Str", "../Type/Type", "../Type/Method", "./at", "./Seq/Seq", "./at-Type", "./Seq/Dequebang" ], function(exports, compare_0, Obj_1, show_2, Str_3, Type_4, Method_5, _64_6, Seq_7, _64_45Type_8, Deque_33_9) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(compare_0), _60_63 = _ms.get(_$2, "<?"), _$3 = _ms.getModule(Obj_1), flag_63 = _ms.get(_$3, "flag?"), show = _ms.getDefaultExport(show_2), Str = _ms.getDefaultExport(Str_3), _$5 = _ms.getModule(Str_3), indent = _ms.get(_$5, "indent"), _$6 = _ms.getModule(Type_4), _61_62 = _ms.get(_$6, "=>"), type_45of = _ms.get(_$6, "type-of"), _$7 = _ms.getModule(Method_5), impl_33 = _ms.get(_$7, "impl!"), impl_45for = _ms.get(_$7, "impl-for"), _64 = _ms.getDefaultExport(_64_6), _$8 = _ms.getModule(_64_6), count = _ms.get(_$8, "count"), empty_63 = _ms.get(_$8, "empty?"), map_39 = _ms.get(_$8, "map'"), _$9 = _ms.getModule(Seq_7), take_39 = _ms.get(_$9, "take'"), _$11 = _ms.lazyGetModule(_64_45Type_8), empty = _ms.lazyProp(_$11, "empty"), Deque_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Deque_33_9)
		});
		const exports = { };
		impl_33(show, _64, function() {
			const test = function() {
				const d = _61_62(_ms.unlazy(Deque_33), [ 1, 2, 3 ]);
				const _k0 = [ d ], _v0 = "\n\t. 1\n\t. 2\n\t. 3";
				const _k1 = [ d, {
					repr: true
				} ], _v1 = "=> Deque!\n\t. 1\n\t. 2\n\t. 3";
				const _k2 = [ _ms.unlazy(empty)(_ms.unlazy(Deque_33)) ], _v2 = "[ ]";
				const _k3 = [ _ms.unlazy(empty)(_ms.unlazy(Deque_33)), {
					repr: true
				} ], _v3 = "empty Deque!";
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
			};
			return _ms.set(function(_, opts) {
				const content = function() {
					switch (true) {
						case _ms.bool(empty_63(_)): {
							return "[ ]"
						}
						default: {
							const ems = map_39(_, function(em) {
								return indent(show(em, opts))
							});
							const _$38 = function() {
								switch (true) {
									case _ms.bool(_60_63(100, count(_))): {
										const show_45ems = take_39(ems, 100);
										const end = "\n\t...";
										return {
											"show-ems": show_45ems,
											end: end
										}
									}
									default: {
										const show_45ems = ems;
										const end = "";
										return {
											"show-ems": show_45ems,
											end: end
										}
									}
								}
							}(), show_45ems = _$38["show-ems"], end = _$38.end;
							return (("\n\t. " + _ms.show(_61_62(Str, show_45ems, "\n\t. "))) + _ms.show(end))
						}
					}
				}();
				return function() {
					switch (true) {
						case _ms.bool(flag_63(opts, "repr")): {
							return function() {
								switch (true) {
									case _ms.bool(empty_63(_)): {
										return ("empty " + _ms.show(type_45of(_)))
									}
									default: {
										return (("=> " + _ms.show(type_45of(_))) + _ms.show(content))
									}
								}
							}()
						}
						default: {
							return content
						}
					}
				}()
			}, "test", test)
		}());
		exports.default = impl_33(show, Array, impl_45for(show, _64));
		const displayName = exports.displayName = "show-@";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL3Nob3ctQC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7b0NBYUE7QUFBQTs7OztFQUFBLFFBQUEsTUFBQSxnQkFBWTtBQUFBLEdBQ1gsYUFBTyxXQUNOO0FBQUEsSUFBQSxVQUFJLDZCQUFVLEVBQUUsR0FBRSxHQUFFO0FBQUEsSUFDcEIsWUFBQSxFQUFBLFdBQ0M7QUFBQSxJQUlELFlBQUEsRUFBQSxHQUFJO0FBQUEsV0FBTztBQUFBLGVBQ1Y7QUFBQSxJQUlELFlBQUEsbURBQXVCO0FBQUEsSUFDdkIsWUFBQSwyQ0FBaUI7QUFBQSxXQUFPO0FBQUEsZUFBWTtBQUFBOztrQkFFcEMsU0FBQSxHQUFFLE1BQ0Y7QUFBQSxJQUFBOztNQUNDLGNBQUEsU0FBQSxLQUNDO0FBQUEsY0FBQztBQUFBO0FBQUEsZUFHRDtBQUFBLE9BQUEsWUFBTSxPQUFLLEdBQUcsU0FBQSxJQUNiO0FBQUEsZUFBQSxPQUFPLEtBQUEsSUFBQTtBQUFBO0FBQUEsT0FDUjs7U0FDQyxjQUFBLE9BQUcsS0FBSCxNQUFPLE1BQ047QUFBQSxVQUFBLG1CQUFVLFFBQUEsS0FBVTtBQUFBLFVBQ3BCLFlBQU07QUFBQSxpQkFETjtBQUFBOzs7O2tCQUdBO0FBQUEsVUFBQSxtQkFBVTtBQUFBLFVBQ1YsWUFBTTtBQUFBLGlCQUROO0FBQUE7Ozs7OztjQUVELHNCQUFNLE9BQUEsS0FBQSxZQUFrQix1QkFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBOztNQUVsQyxjQUFBLFFBQUEsTUFBWSxVQUNYO0FBQUE7O1NBQ0MsY0FBQSxTQUFBLEtBQ0M7QUFBQSxpQkFBQyxxQkFBTSxVQUFDO0FBQUE7QUFBQSxrQkFFUjtBQUFBLGlCQUFDLG1CQUFHLFVBQUMsZ0JBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRWhCO0FBQUEsY0FBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztvQkFHSixRQUFBLE1BQUEsT0FBaUIsV0FBQSxNQUFBO0FBQUEsRUF4RGpCLDBDQUFBO0FBQUEiLCJmaWxlIjoiYXQvc2hvdy1hdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9