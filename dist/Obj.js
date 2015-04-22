"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./Bool", "./compare", "./js", "./methods", "./private/bootstrap", "./Type/Type", "./Type/Kind", "./at/at", "./at/at-Type", "./at/q", "./at/Id-Setbang", "./at/Map/Map", "./control", "./Fun", "./Objbang", "./bang", "./at/Set", "./math/Num", "./Try" ], function(exports, Bool_0, compare_1, js_2, methods_3, bootstrap_4, Type_5, Kind_6, _64_7, _64_45Type_8, _63_9, Id_45Set_33_10, Map_11, control_12, Fun_13, Obj_33_14, _33_15, Set_16, Num_17, Try_18) {
	exports._get = _ms.lazy(function() {
		const Bool = _ms.getDefaultExport(Bool_0), _$2 = _ms.getModule(Bool_0), and = _ms.get(_$2, "and"), not = _ms.get(_$2, "not"), nor = _ms.get(_$2, "nor"), xor = _ms.get(_$2, "xor"), _$3 = _ms.getModule(compare_1), _61_63 = _ms.get(_$3, "=?"), _$4 = _ms.getModule(js_2), defined_63 = _ms.get(_$4, "defined?"), js_61_61 = _ms.get(_$4, "js=="), js_45typeof = _ms.get(_$4, "js-typeof"), id_61_63 = _ms.get(_$4, "id=?"), js_45sub = _ms.get(_$4, "js-sub"), _$5 = _ms.getModule(methods_3), freeze = _ms.get(_$5, "freeze"), _$6 = _ms.getModule(bootstrap_4), Str = _ms.get(_$6, "Str"), _$7 = _ms.getModule(Type_5), _61_62 = _ms.get(_$7, "=>"), contains_63 = _ms.get(_$7, "contains?"), Kind = _ms.getDefaultExport(Kind_6), _64 = _ms.lazy(function() {
			return _ms.getDefaultExport(_64_7)
		}), _$10 = _ms.lazyGetModule(_64_7), _43_43 = _ms.lazyProp(_$10, "++"), all_63 = _ms.lazyProp(_$10, "all?"), count = _ms.lazyProp(_$10, "count"), each_33 = _ms.lazyProp(_$10, "each!"), empty_63 = _ms.lazyProp(_$10, "empty?"), keep = _ms.lazyProp(_$10, "keep"), _$11 = _ms.lazyGetModule(_64_45Type_8), empty = _ms.lazyProp(_$11, "empty"), _63 = _ms.lazy(function() {
			return _ms.getDefaultExport(_63_9)
		}), _$12 = _ms.lazyGetModule(_63_9), Opt_45_62_63 = _ms.lazyProp(_$12, "Opt->?"), Id_45Set_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Id_45Set_33_10)
		}), Map = _ms.lazy(function() {
			return _ms.getDefaultExport(Map_11)
		}), _$14 = _ms.lazyGetModule(Map_11), make_45map = _ms.lazyProp(_$14, "make-map"), _$15 = _ms.lazyGetModule(control_12), returning = _ms.lazyProp(_$15, "returning"), Fun = _ms.lazy(function() {
			return _ms.getDefaultExport(Fun_13)
		}), _$17 = _ms.lazyGetModule(Obj_33_14), empty_45Obj_33 = _ms.lazyProp(_$17, "empty-Obj!"), p_43_33 = _ms.lazyProp(_$17, "p+!"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_15)
		}), _$20 = _ms.lazyGetModule(Set_16), set_61_63 = _ms.lazyProp(_$20, "set=?"), Num = _ms.lazy(function() {
			return _ms.getDefaultExport(Num_17)
		}), _$22 = _ms.lazyGetModule(Try_18), fails_63 = _ms.lazyProp(_$22, "fails?");
		const exports = { };
		const Obj = function() {
			const doc = "Contains anything that can store keys.\nEverything shares Obj.prototype.";
			return _ms.set(global.Object, "doc", doc, "displayName", "Obj")
		}();
		const Obj_45Key = exports["Obj-Key"] = Kind(function() {
			const doc = "Can be used as a name for a property of an object.";
			const implementors = [ Str, Symbol ];
			return {
				doc: doc,
				implementors: implementors,
				displayName: "Obj-Key"
			}
		}());
		const can_45get_45p_63 = exports["can-get-p?"] = function() {
			const doc = "Whether it's safe to try to directly access properties.";
			const test = function() {
				const _k0 = [ null ], _v0 = false;
				const _k1 = [ undefined ], _v1 = false;
				const _k2 = [ 1 ], _v2 = true;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
			};
			return _ms.set(function(_) {
				return not(js_61_61(_, null))
			}, "doc", doc, "test", test, "displayName", "can-get-p?")
		}();
		const flag_63 = exports["flag?"] = function() {
			const doc = "If it has a property for the flag, uses that. Otherwise false.";
			const test = function() {
				const _k0 = [ {
					a: true
				}, "a" ], _v0 = true;
				const _k1 = [ {
					a: false
				}, "a" ], _v1 = false;
				const _k2 = [ empty_45Obj, "a" ], _v2 = false;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
			};
			return _ms.set(function(obj, flag) {
				_ms.checkContains(Obj_45Key, flag, "flag");
				return function() {
					const _ = _63p(obj, flag);
					switch (true) {
						case _ms.bool(_ms.unlazy(empty_63)(_)): {
							return false
						}
						default: {
							const b = _ms.checkContains(Bool, _.val, "b");
							return b
						}
					}
				}()
			}, "doc", doc, "test", test, "displayName", "flag?")
		}();
		const forbidden_45fun_45props = _ms.lazy(function() {
			return _61_62(_ms.unlazy(Id_45Set_33), [ "arguments", "caller" ])
		});
		const _64p_45all = exports["@p-all"] = function() {
			const doc = "Every property name directly stored in an object.\nIncludes non-enumerable properties and symbols.";
			const test = function() {
				const obj = _ms.unlazy(empty_45Obj_33)();
				_ms.unlazy(p_43_33)(obj, "a", 0);
				const sym = Symbol("s");
				Obj.defineProperty(obj, sym, function() {
					const value = 0;
					const enumerable = false;
					return {
						value: value,
						enumerable: enumerable
					}
				}());
				_ms.unlazy(_33)(_ms.unlazy(set_61_63), _64p_45all(obj), [ "a", sym ]);
				return _ms.unlazy(_33)(_ms.unlazy(set_61_63), _64p_45all(_64p_45all), [ "length", "name", "prototype", "doc", "test", "displayName" ])
			};
			return _ms.set(function(_) {
				const props = Obj.getOwnPropertyNames(_);
				const own_45names = function() {
					switch (true) {
						case _ms.bool(_ms.contains(_ms.unlazy(Fun), _)): {
							return _ms.unlazy(keep)(props, function(name) {
								return not(contains_63(_ms.unlazy(forbidden_45fun_45props), name))
							})
						}
						default: {
							return props
						}
					}
				}();
				return _ms.checkContains(_ms.sub(_ms.unlazy(_64), Obj_45Key), _ms.unlazy(_43_43)(own_45names, Obj.getOwnPropertySymbols(_)), "res")
			}, "doc", doc, "test", test, "displayName", "@p-all")
		}();
		const _64p = exports["@p"] = function() {
			const doc = "Like @p-all, but excludes non-enumerable properties and symbols.";
			const test = function() {
				const obj = _ms.unlazy(empty_45Obj_33)();
				Obj.defineProperty(obj, "a", function() {
					const value = 0;
					const enumerable = false;
					return {
						value: value,
						enumerable: enumerable
					}
				}());
				const sym = Symbol("s");
				Obj.defineProperty(obj, sym, function() {
					const value = 0;
					const enumerable = true;
					return {
						value: value,
						enumerable: enumerable
					}
				}());
				_ms.unlazy(_33)(_ms.unlazy(empty_63), _64p(obj));
				return _ms.unlazy(_33)(_ms.unlazy(set_61_63), _64p(_64p), [ "doc", "test", "displayName" ])
			};
			return _ms.set(function(_) {
				return _ms.checkContains(_ms.sub(_ms.unlazy(_64), Str), function() {
					switch (true) {
						case _ms.bool(can_45get_45p_63(_)): {
							return Obj.keys(_)
						}
						default: {
							return [ ]
						}
					}
				}(), "res")
			}, "doc", doc, "test", test, "displayName", "@p")
		}();
		const _63p = exports["?p"] = function() {
			const doc = "`?` containing the value of the property, if it exists.";
			const test = function() {
				const x = function() {
					const a = 1;
					const b = null;
					return {
						a: a,
						b: b,
						displayName: "x"
					}
				}();
				const _k0 = [ x, "a" ], _v0 = _ms.unlazy(_63)(1);
				const _k1 = [ x, "b" ], _v1 = _ms.unlazy(_63)(null);
				const _k2 = [ x, "toString" ], _v2 = _ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
			};
			return _ms.set(function(_, name) {
				_ms.checkContains(Obj_45Key, name, "name");
				return function() {
					switch (true) {
						case _ms.bool(p_63(_, name)): {
							return _ms.unlazy(_63)(js_45sub(_, name))
						}
						default: {
							return _ms.unlazy(empty)(_ms.unlazy(_63))
						}
					}
				}()
			}, "doc", doc, "test", test, "displayName", "?p")
		}();
		const _63p_45with_45proto = exports["?p-with-proto"] = function() {
			const doc = "Like `?p`, but also looks through the prototype chain.";
			const test = function() {
				const _k0 = [ 1, "toString" ], _v0 = _ms.unlazy(_63)(_ms.unlazy(Num).prototype.toString);
				const _k1 = [ 1, "asdfghjkl" ], _v1 = _ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, name) {
				_ms.checkContains(Obj_45Key, name, "name");
				return function() {
					switch (true) {
						case _ms.bool(can_45get_45p_63(_)): {
							return _ms.unlazy(Opt_45_62_63)(js_45sub(_, name))
						}
						default: {
							return _ms.unlazy(empty)(_ms.unlazy(_63))
						}
					}
				}()
			}, "doc", doc, "test", test, "displayName", "?p-with-proto")
		}();
		const p = exports.p = function() {
			const doc = "Gets the value of a property. Does not include properties in the prototype.";
			const test = function() {
				const x = function() {
					const a = 1;
					const b = null;
					return {
						a: a,
						b: b,
						displayName: "x"
					}
				}();
				const _k0 = [ x, "a" ], _v0 = 1;
				const _k1 = [ x, "b" ], _v1 = null;
				_ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
					return p("c")
				});
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, name) {
				_ms.checkContains(Obj_45Key, name, "name");
				_ms.unlazy(_33)(p_63, _, name);
				return js_45sub(_, name)
			}, "doc", doc, "test", test, "displayName", "p")
		}();
		const p_63 = exports["p?"] = function() {
			const doc = "Whether there is a property by that name.";
			const test = function() {
				const x = {
					a: 1
				};
				const _k0 = [ x, "a" ], _v0 = true;
				const _k1 = [ x, "b" ], _v1 = false;
				const _k2 = [ x, "toString" ], _v2 = false;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
			};
			return _ms.set(function(_, name) {
				_ms.checkContains(Obj_45Key, name, "name");
				return and(can_45get_45p_63(_), _ms.lazy(function() {
					return Obj.prototype.hasOwnProperty.call(_, name)
				}))
			}, "doc", doc, "test", test, "displayName", "p?")
		}();
		const p_45with_45proto_63 = exports["p-with-proto?"] = function() {
			const doc = "Like `p?` but looks through the prototype.";
			const test = function() {
				const _k0 = [ empty_45Obj, "toString" ], _v0 = true;
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_, name) {
				_ms.checkContains(Obj_45Key, name, "name");
				return and(can_45get_45p_63(_), _ms.lazy(function() {
					return defined_63(js_45sub(_, name))
				}))
			}, "doc", doc, "test", test, "displayName", "p-with-proto?")
		}();
		const obj_61_63 = exports["obj=?"] = function() {
			const doc = "For Objs, whether they are of the same type and have `=?` properties.\nFor primitives, whether they are `=?`.";
			const test = function() {
				const a = function() {
					const a = 1;
					return {
						a: a,
						displayName: "a"
					}
				}();
				const b = function() {
					const displayName = "a";
					const a = 1;
					return {
						displayName: displayName,
						a: a
					}
				}();
				const c = function() {
					const x = 3;
					return {
						x: x,
						displayName: "c"
					}
				}();
				const _k0 = [ a, b ], _v0 = true;
				const _k1 = [ a, c ], _v1 = false;
				const _k2 = [ 1, 1 ], _v2 = true;
				const _k3 = [ obj_61_63, obj_61_63 ], _v3 = true;
				return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3)
			};
			return _ms.set(function(a, b) {
				const null_45a = id_61_63(a, null);
				const null_45b = id_61_63(b, null);
				const obj_45a = and(not(null_45a), _ms.lazy(function() {
					return id_61_63(js_45typeof(a), "object")
				}));
				const obj_45b = and(not(null_45b), _ms.lazy(function() {
					return id_61_63(js_45typeof(b), "object")
				}));
				return _ms.checkContains(Bool, function() {
					switch (true) {
						case _ms.bool(nor(obj_45a, obj_45b)): {
							return id_61_63(a, b)
						}
						case _ms.bool(xor(obj_45a, obj_45b)): {
							return false
						}
						default: {
							const same_45type = id_61_63(Obj.getPrototypeOf(a), Obj.getPrototypeOf(b));
							return and(same_45type, _ms.lazy(function() {
								return function() {
									const ak = Obj.getOwnPropertyNames(a);
									const bk = Obj.getOwnPropertyNames(b);
									return and(_61_63(_ms.unlazy(count)(ak), _ms.unlazy(count)(bk)), _ms.lazy(function() {
										return function() {
											return _ms.unlazy(all_63)(ak, function(k) {
												return _61_63(js_45sub(a, k), js_45sub(b, k))
											})
										}()
									}))
								}()
							}))
						}
					}
				}(), "res")
			}, "doc", doc, "test", test, "displayName", "obj=?")
		}();
		const empty_45Obj = exports["empty-Obj"] = Obj.freeze(Obj.create(Obj.prototype));
		const empty_45Obj_63 = exports["empty-Obj?"] = function() {
			const doc = "Whether there are no properties, not even hidden ones.";
			const test = function() {
				const _k0 = [ empty_45Obj ], _v0 = true;
				const _k1 = [ Obj ], _v1 = false;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_) {
				_ms.checkContains(Obj, _, "_");
				return _ms.unlazy(empty_63)(_64p_45all(_))
			}, "doc", doc, "test", test, "displayName", "empty-Obj?")
		}();
		const Obj_45_62Map = exports["Obj->Map"] = function() {
			const doc = "A Map whose keys are property names and whose values are the properties' values.";
			const test = function() {
				const _k0 = [ {
					a: 1,
					b: 2
				} ], _v0 = function() {
					const _k0 = "a", _v0 = 1;
					const _k1 = "b", _v1 = 2;
					return _ms.map(_k0, _v0, _k1, _v1)
				}();
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_) {
				return _ms.unlazy(make_45map)(_64p(_), _ms.sub(p, _))
			}, "doc", doc, "test", test, "displayName", "Obj->Map")
		}();
		const Map_45_62Obj = exports["Map->Obj"] = function() {
			const doc = "Given a Map whose keys are Strs, creates an Obj whose Obj->Map is that.";
			const test = function() {
				const map = function() {
					const _k0 = "a", _v0 = 1;
					const _k1 = "b", _v1 = 2;
					return _ms.map(_k0, _v0, _k1, _v1)
				}();
				const _k0 = [ map ], _v0 = {
					a: 1,
					b: 2
				};
				_ms.unlazy(_33)(_61_63, map, Obj_45_62Map(Map_45_62Obj(map)));
				_ms.unlazy(_33)(_ms.unlazy(fails_63), function() {
					return Map_45_62Obj(function() {
						const _k0 = 1, _v0 = 2;
						return _ms.map(_k0, _v0)
					}())
				});
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_) {
				_ms.checkContains(_ms.unlazy(Map), _, "_");
				return _ms.unlazy(returning)(_ms.unlazy(empty_45Obj_33)(), function(obj) {
					_ms.unlazy(each_33)(_, function(pair) {
						return _ms.unlazy(p_43_33)(obj, pair.key, pair.val)
					});
					return freeze(obj)
				})
			}, "doc", doc, "test", test, "displayName", "Map->Obj")
		}();
		const prototype = exports.prototype = function() {
			const doc = "Gets prototype of an object.";
			const test = function() {
				const _k0 = [ empty_45Obj ], _v0 = Obj.prototype;
				const _k1 = [ Obj_45Key ], _v1 = Kind.prototype;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(Obj.getPrototypeOf, "doc", doc, "test", test, "displayName", "prototype")
		}();
		exports.default = Obj;
		const displayName = exports.displayName = "Obj";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmoubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQXVCQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsdUJBQUs7QUFBQSxHQUNKLFlBQ0M7QUFBQSxrQkFDRDs7RUFFRCx1Q0FBUyxnQkFBSTtBQUFBLEdBQ1osWUFBTTtBQUFBLEdBQ04scUJBQWMsRUFBQSxLQUFBO0FBQUEsVUFGRjtBQUFBOzs7OztFQUliLDREQUFXO0FBQUEsR0FDVixZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSxJQUFBLFlBQUEsRUFBRSxjQUFRO0FBQUEsSUFDVixZQUFBLEVBQUEsbUJBQWlCO0FBQUEsSUFDakIsWUFBQSxFQUFFLFdBQU87QUFBQTs7a0JBQ1QsU0FBQSxHQUNBO0FBQUEsV0FBQSxJQUFJLFNBQU0sR0FBRTtBQUFBOztFQUVkLDhDQUFNO0FBQUEsR0FDTCxZQUFNO0FBQUEsR0FDTixhQUFPLFdBRU47QUFBQSxJQUFBLFlBQUEsRUFBRTtBQUFBLFFBQUk7QUFBQSxPQUFPLGFBQVE7QUFBQSxJQUNyQixZQUFBLEVBQUU7QUFBQSxRQUFJO0FBQUEsT0FBUSxhQUFRO0FBQUEsSUFDdEIsWUFBQSxFQUFBLGFBQWEsYUFBUTtBQUFBOztrQkFDckIsU0FBQSxLQUFJLE1BQ0o7QUFBQSxzQkFEUzs7S0FDSixVQUFBLEtBQUEsS0FBQTtBQUFBO01BQ0osbUNBQUEsS0FDQztBQUFBLGNBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxPQUFBLDRCQUFFLE1BQU87Y0FDVDtBQUFBO0FBQUE7QUFBQTtBQUFBOztFQUVKO1VBQXVCLGdDQUFXLEVBQUcsYUFBWTtBQUFBO0FBQUEsRUFDakQsa0RBQU87QUFBQSxHQUNOLFlBQ0M7QUFBQSxHQUNELGFBQU8sV0FDTjtBQUFBLElBQUE7d0JBQ0EsS0FBUyxLQUFHO0FBQUEsSUFDWixZQUFNLE9BQVE7QUFBQSxJQUNkLG1CQUFBLEtBQUEsZ0JBQTBCO0FB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