"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../Fun", "../js", "../private/js-impl", "../Obj", "../Objbang", "../Str", "./Impl-Type", "./Kind", "./Method", "./Obj-Type", "./Type", "../bang", "../compare", "../js", "../math/Num", "../Try" ], function(exports, Fun_0, js_1, js_45impl_2, Obj_3, Obj_33_4, Str_5, Impl_45Type_6, Kind_7, Method_8, Obj_45Type_9, Type_10, _33_11, compare_12, js_13, Num_14, Try_15) {
	exports._get = _ms.lazy(function() {
		const Fun = _ms.getDefaultExport(Fun_0), _$3 = _ms.getModule(js_1), js_45instanceof = _ms.get(_$3, "js-instanceof"), _$4 = _ms.getModule(js_45impl_2), buildStr = _ms.get(_$4, "buildStr"), Obj = _ms.getDefaultExport(Obj_3), _$6 = _ms.getModule(Obj_33_4), p_43_33 = _ms.get(_$6, "p+!"), Str = _ms.getDefaultExport(Str_5), Impl_45Type = _ms.getDefaultExport(Impl_45Type_6), _$9 = _ms.getModule(Kind_7), kind_33 = _ms.get(_$9, "kind!"), _$10 = _ms.getModule(Method_8), impl_33 = _ms.get(_$10, "impl!"), Obj_45Type = _ms.getDefaultExport(Obj_45Type_9), Type = _ms.getDefaultExport(Type_10), _$12 = _ms.getModule(Type_10), contains_63 = _ms.get(_$12, "contains?"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_11)
		}), _$15 = _ms.lazyGetModule(compare_12), _61_63 = _ms.lazyProp(_$15, "=?"), _$17 = _ms.lazyGetModule(js_13), defined_63 = _ms.lazyProp(_$17, "defined?"), Num = _ms.lazy(function() {
			return _ms.getDefaultExport(Num_14)
		}), _$19 = _ms.lazyGetModule(Try_15), fails_63 = _ms.lazyProp(_$19, "fails?");
		const exports = { };
		const if_33 = function(cond, fun) {
			switch (true) {
				case _ms.bool(cond):
					{
						fun()
					};
					break
				default: {
					null
				}
			}
		};
		const Wrap_45Type = Obj_45Type(function() {
			const doc = "Obj with only one prop (always called `val`).\nThese are useful for wrapping a value with a new type.";
			const props = function() {
				const displayName = Str;
				const prototype = Obj;
				return {
					displayName: displayName,
					prototype: prototype
				}
			}();
			const opt_45props = function() {
				const wrapped_45type = Type;
				return {
					"wrapped-type": wrapped_45type,
					displayName: "opt-props"
				}
			}();
			const extensible = true;
			const defaults = function() {
				const prototype = function() {
					return Obj.create(Obj.prototype)
				};
				return {
					prototype: prototype,
					displayName: "defaults"
				}
			}();
			const post_45construct = function(_) {
				return p_43_33(_.prototype, "constructor", _)
			};
			const make_45callable = function(_) {
				const src = buildStr(function(add_33) {
					add_33("return function ctr(_) {\n\tif (!(this instanceof ctr)) return new ctr(_)\n\tthis.val = _");
					if_33(_ms.unlazy(defined_63)(_["wrapped-type"]), function() {
						return add_33("_ms.checkContains(wrappedType, _, \"val\")")
					});
					return add_33("}")
				});
				const f = Fun("wrappedType", src);
				return f(_["wrapped-type"])
			};
			const test = function() {
				const W = Wrap_45Type(function() {
					const doc = "W";
					const wrapped_45type = _ms.unlazy(Num);
					return {
						doc: doc,
						"wrapped-type": wrapped_45type,
						displayName: "W"
					}
				}());
				const w = W(3);
				_ms.unlazy(_33)(_ms.unlazy(_61_63), w.val, 3);
				_ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
					return W("three")
				})
			};
			return {
				doc: doc,
				props: props,
				"opt-props": opt_45props,
				extensible: extensible,
				defaults: defaults,
				"post-construct": post_45construct,
				"make-callable": make_45callable,
				test: test,
				displayName: "Wrap-Type"
			}
		}());
		kind_33(Wrap_45Type, Impl_45Type);
		impl_33(contains_63, Wrap_45Type, function(wt, _) {
			return js_45instanceof(_, wt)
		});
		exports.default = Wrap_45Type;
		const displayName = exports.displayName = "Wrap-Type";
		return exports
	})
})
//# sourceMappingURL=../Type/Wrap-Type.js.map