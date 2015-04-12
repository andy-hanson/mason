"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../at/at", "../Obj", "../show", "./Method", "./Type", "./Method" ], function(exports, _64_0, Obj_1, show_2, Method_3, Type_4, Method_5) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(_64_0), empty_63 = _ms.get(_$2, "empty?"), _$3 = _ms.getModule(Obj_1), flag_63 = _ms.get(_$3, "flag?"), _63p = _ms.get(_$3, "?p"), show = _ms.getDefaultExport(show_2), _$5 = _ms.getModule(Method_3), impl_33 = _ms.get(_$5, "impl!"), Type = _ms.getDefaultExport(Type_4), Method = _ms.lazy(function() {
			return _ms.getDefaultExport(Method_5)
		});
		const exports = {};
		impl_33(show, Type, function() {
			const test = function() {
				const _k0 = [ _ms.unlazy(Method) ], _v0 = "Method";
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(type, opts) {
				return function() {
					switch (true) {
						case _ms.bool(flag_63(opts, "repr")): {
							return show.default(type, opts)
						}
						default: {
							return function() {
								const _ = _63p(type, "displayName");
								switch (true) {
									case _ms.bool(empty_63(_)): {
										return "<anonymous Type>"
									}
									default: {
										return _.val
									}
								}
							}()
						}
					}
				}()
			}, "test", test)
		}());
		exports.default = null;
		const displayName = exports.displayName = "show-Type";
		return exports
	})
})
//# sourceMappingURL=../Type/show-Type.js.map