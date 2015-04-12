"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "./Fun", "./js", "./Obj", "./Str", "./Type/Obj-Type", "./Type/Pred-Type", "./bang", "./compare", "./Type/Type" ], function(exports, Fun_0, js_1, Obj_2, Str_3, Obj_45Type_4, Pred_45Type_5, _33_6, compare_7, Type_8) {
	exports._get = _ms.lazy(function() {
		const Fun = _ms.getDefaultExport(Fun_0), _$3 = _ms.getModule(js_1), js_45sub = _ms.get(_$3, "js-sub"), _$4 = _ms.getModule(Obj_2), Obj_45Key = _ms.get(_$4, "Obj-Key"), Str = _ms.getDefaultExport(Str_3), Obj_45Type = _ms.getDefaultExport(Obj_45Type_4), _$7 = _ms.getModule(Pred_45Type_5), Any = _ms.get(_$7, "Any"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_6)
		}), _$10 = _ms.lazyGetModule(compare_7), _61_63 = _ms.lazyProp(_$10, "=?"), _$11 = _ms.lazyGetModule(Type_8), contains_63 = _ms.lazyProp(_$11, "contains?");
		const exports = {};
		const Js_45Method = Obj_45Type(function() {
			const doc = "A Js-Method allows you to call a JavaScript-style method as a function.\nUnlike a Mason Method, for a Js-Method,\nthe first argument becomes `this` within the implementation's body.";
			const test = function() {
				const toString = Js_45Method(function() {
					const impl_45name = "toString";
					return {
						"impl-name": impl_45name,
						displayName: "toString"
					}
				}());
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), toString(1), "1")
			};
			const props = function() {
				const displayName = Str;
				const impl_45name = Str;
				return {
					displayName: displayName,
					"impl-name": impl_45name
				}
			}();
			const extensible = true;
			const make_45callable = function(_) {
				const impl = "a[\"" + _ms.show(_["impl-name"]) + "\"]";
				return Fun("a", "b", "c", "d", "switch (arguments.length) {\n\tcase 0: throw new Error(\"Js-Methods always need at least one argument.\")\n\tcase 1: return " + _ms.show(impl) + "()\n\tcase 2: return " + _ms.show(impl) + "(b)\n\tcase 3: return " + _ms.show(impl) + "(b, c)\n\tcase 4: return " + _ms.show(impl) + "(b, c, d)\n\tcase 5: throw new Error(\"Does not support this many arguments.\")\n}")
			};
			return {
				doc: doc,
				test: test,
				props: props,
				extensible: extensible,
				"make-callable": make_45callable,
				displayName: "Js-Method"
			}
		}());
		const send = exports.send = function() {
			const doc = "Calls `target`'s js-method `name` with the given arguments.";
			const test = function() {
				const _k0 = [ 1, "toFixed", 2 ], _v0 = "1.00";
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(target, name) {
				const args = [  ].slice.call(arguments, 2);
				_ms.checkContains(Any, target, "target");
				_ms.checkContains(Obj_45Key, name, "name");
				const impl = js_45sub(target, name);
				_ms.unlazy(_33)(_ms.unlazy(contains_63)(Fun, impl), _ms.lazy(function() {
					return "Js-Method " + _ms.show(name) + " not implemented by " + _ms.show(target) + "."
				}));
				return impl.apply(target, args)
			}, "doc", doc, "test", test, "displayName", "send")
		}();
		const send_33 = exports["send!"] = send;
		exports.default = Js_45Method;
		const displayName = exports.displayName = "Js-Method";
		return exports
	})
})
//# sourceMappingURL=Js-Method.js.map