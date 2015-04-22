"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../compare", "../Obj", "../show", "../Str", "../Type/Type", "../Type/Method", "./at", "./Seq", "./at-Type", "./Dequebang" ], function(exports, compare_0, Obj_1, show_2, Str_3, Type_4, Method_5, _64_6, Seq_7, _64_45Type_8, Deque_33_9) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(compare_0), _60_63 = _ms.get(_$2, "<?"), _$3 = _ms.getModule(Obj_1), flag_63 = _ms.get(_$3, "flag?"), show = _ms.getDefaultExport(show_2), Str = _ms.getDefaultExport(Str_3), _$5 = _ms.getModule(Str_3), indent = _ms.get(_$5, "indent"), _$6 = _ms.getModule(Type_4), _61_62 = _ms.get(_$6, "=>"), type_45of = _ms.get(_$6, "type-of"), _$7 = _ms.getModule(Method_5), impl_33 = _ms.get(_$7, "impl!"), impl_45for = _ms.get(_$7, "impl-for"), _64 = _ms.getDefaultExport(_64_6), _$8 = _ms.getModule(_64_6), count = _ms.get(_$8, "count"), empty_63 = _ms.get(_$8, "empty?"), map = _ms.get(_$8, "map"), _$9 = _ms.getModule(Seq_7), take = _ms.get(_$9, "take"), _$11 = _ms.lazyGetModule(_64_45Type_8), empty = _ms.lazyProp(_$11, "empty"), Deque_33 = _ms.lazy(function() {
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
							const ems = map(_, function(em) {
								return indent(show(em, opts))
							});
							const _$30 = function() {
								switch (true) {
									case _ms.bool(_60_63(100, count(_))): {
										const show_45ems = take(ems, 100);
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
							}(), show_45ems = _$30["show-ems"], end = _$30.end;
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
//# sourceMappingURL=../at/show-at.js.map