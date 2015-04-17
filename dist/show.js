"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./Bool", "./compare", "./Fun", "./js", "./math/Num", "./private/bootstrap", "./private/js-impl", "./Obj", "./Str", "./Type/Method", "./Type/Type", "./at/at", "./at/q", "./Obj" ], function(exports, Bool_0, compare_1, Fun_2, js_3, Num_4, bootstrap_5, js_45impl_6, Obj_7, Str_8, Method_9, Type_10, _64_11, _63_12, Obj_13) {
	exports._get = _ms.lazy(function() {
		const Bool = _ms.getDefaultExport(Bool_0), _$3 = _ms.getModule(compare_1), _61_63 = _ms.get(_$3, "=?"), Fun = _ms.getDefaultExport(Fun_2), _$4 = _ms.getModule(Fun_2), spread_33 = _ms.get(_$4, "spread!"), _$5 = _ms.getModule(js_3), js_43 = _ms.get(_$5, "js+"), Num = _ms.getDefaultExport(Num_4), _$7 = _ms.getModule(bootstrap_5), msDef = _ms.get(_$7, "msDef"), _$8 = _ms.getModule(js_45impl_6), newSet = _ms.get(_$8, "newSet"), _$9 = _ms.getModule(Obj_7), flag_63 = _ms.get(_$9, "flag?"), p = _ms.get(_$9, "p"), _63p = _ms.get(_$9, "?p"), _64p = _ms.get(_$9, "@p"), Str = _ms.getDefaultExport(Str_8), _$10 = _ms.getModule(Str_8), indent = _ms.get(_$10, "indent"), Method = _ms.getDefaultExport(Method_9), _$11 = _ms.getModule(Method_9), impl_33 = _ms.get(_$11, "impl!"), _$12 = _ms.getModule(Type_10), _61_62 = _ms.get(_$12, "=>"), type_45of = _ms.get(_$12, "type-of"), _$14 = _ms.lazyGetModule(_64_11), _45_45 = _ms.lazyProp(_$14, "--"), empty_63 = _ms.lazyProp(_$14, "empty?"), map = _ms.lazyProp(_$14, "map"), _$15 = _ms.lazyGetModule(_63_12), _63_45or = _ms.lazyProp(_$15, "?-or"), Obj = _ms.lazy(function() {
			return _ms.getDefaultExport(Obj_13)
		});
		const exports = { };
		const showing = newSet();
		const show = Method(function() {
			const doc = function(_, opts) {
				return _ms.checkContains(Str, "Converts the value to a string for string interpolation.\nThis is the method called when you do `{...}`.\nFor a more detailed Str representation of data, use `inspect`.", "res")
			};
			const test = function() {
				const a = function() {
					const x = _ms.lazy(function() {
						return a
					});
					return {
						get x() {
							return _ms.unlazy(x)
						},
						displayName: "a"
					}
				}();
				const _k0 = [ a ], _v0 = "Obj\n\tx. <recursive>\n\tdisplayName. a";
				const _k1 = [ a, {
					repr: true
				} ], _v1 = "Obj\n\tx. <recursive>\n\tdisplayName. \"a\"";
				const _k2 = [ null ], _v2 = "()";
				const _k3 = [ undefined ], _v3 = "undefined";
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
			};
			const wrap = function(impl, _, opts) {
				return function() {
					switch (true) {
						case _ms.bool(showing.has(_)): {
							return "<recursive>"
						}
						default: {
							showing.add(_);
							const x = _ms.checkContains(Str, impl(_, opts), "x");
							showing.delete(_);
							return x
						}
					}
				}()
			};
			const _default = function(_, opts) {
				return function() {
					switch (true) {
						case _ms.bool(_61_63(_, null)): {
							return "()"
						}
						case _ms.bool(_61_63(_, undefined)): {
							return "undefined"
						}
						default: {
							const props = _ms.unlazy(_45_45)(_64p(_), [ "prototype" ]);
							const key_45vals = _61_62(Array, _ms.unlazy(map)(props, function(key) {
								const val = _ms.checkContains(Str, show(p(_, key), opts), "val");
								return ((("" + _ms.show(key)) + ". ") + _ms.show(indent(val)))
							}));
							return ((("" + _ms.show(type_45of(_))) + "\n\t") + _ms.show(key_45vals.join("\n\t")))
						}
					}
				}()
			};
			return {
				doc: doc,
				test: test,
				wrap: wrap,
				default: _default,
				displayName: "show"
			}
		}());
		const repr = exports.repr = function() {
			const doc = "Shows it with the `repr` flag set.\nFor debug printing, there is the helper function `console.dbg!`.";
			return _ms.set(function(_) {
				return show(_, {
					repr: true
				})
			}, "doc", doc, "displayName", "repr")
		}();
		spread_33(impl_33, show, function() {
			const _k0 = Str, _v0 = function() {
				const test = function() {
					const _k0 = [ "a" ], _v0 = "a";
					const _k1 = [ "a", {
						repr: true
					} ], _v1 = "\"a\"";
					return _ms.map(_k0, _v0, _k1, _v1)
				};
				return _ms.set(function(_, opts) {
					return function() {
						switch (true) {
							case _ms.bool(flag_63(opts, "repr")): {
								return js_43("\"", js_43(_, "\""))
							}
							default: {
								return _
							}
						}
					}()
				}, "test", test)
			}();
			const _k1 = Num, _v1 = function() {
				const test = function() {
					const _k0 = [ 12 ], _v0 = "12";
					const _k1 = [ - 1 ], _v1 = "-1";
					return _ms.map(_k0, _v0, _k1, _v1)
				};
				return _ms.set(function(_) {
					const base = 10;
					return _.toString(base)
				}, "test", test)
			}();
			const _k2 = Symbol, _v2 = function() {
				const test = function() {
					const _k0 = [ Symbol("name") ], _v0 = "<Symbol>";
					return _ms.map(_k0, _v0)
				};
				return _ms.set(function() {
					return "<Symbol>"
				}, "test", test)
			}();
			const _k3 = Bool, _v3 = function() {
				const test = function() {
					const _k0 = [ true ], _v0 = "true";
					const _k1 = [ false ], _v1 = "false";
					return _ms.map(_k0, _v0, _k1, _v1)
				};
				return _ms.set(function(_) {
					return function() {
						switch (true) {
							case _ms.bool(_): {
								return "true"
							}
							default: {
								return "false"
							}
						}
					}()
				}, "test", test)
			}();
			const _k4 = Fun, _v4 = function() {
				const test = function() {
					const a = function() {
						return 1
					};
					const _k0 = [ a ], _v0 = "a";
					const _k1 = [ _ms.unlazy(Obj) ], _v1 = "Obj";
					const _k2 = [ Fun("", "") ], _v2 = "<anonymous Fun>";
					return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
				};
				return _ms.set(function(_) {
					return _ms.checkContains(Str, _ms.unlazy(_63_45or)(_63p(_, "displayName"), _ms.lazy(function() {
						return function() {
							const name = p(_, "name");
							return function() {
								const _ = name;
								switch (true) {
									case _ms.bool(_ms.unlazy(empty_63)(_)): {
										return "<anonymous Fun>"
									}
									default: {
										return _
									}
								}
							}()
						}()
					})), "res")
				}, "test", test)
			}();
			return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3, _k4, _v4)
		}());
		msDef("show", show);
		exports.default = show;
		const displayName = exports.displayName = "show";
		return exports
	})
})
//# sourceMappingURL=show.js.map