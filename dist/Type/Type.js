"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../compare", "../js", "../private/bootstrap", "./Impl-Type", "./Kind", "./Method", "../at/q", "../Obj", "../Try" ], function(exports, compare_0, js_1, bootstrap_2, Impl_45Type_3, Kind_4, Method_5, _63_6, Obj_7, Try_8) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(compare_0), _61_63 = _ms.get(_$2, "=?"), _$3 = _ms.getModule(js_1), id_61_63 = _ms.get(_$3, "id=?"), js_45instanceof = _ms.get(_$3, "js-instanceof"), _$4 = _ms.getModule(bootstrap_2), Fun = _ms.get(_$4, "Fun"), impl_45contains_63_33 = _ms.get(_$4, "impl-contains?!"), msDef = _ms.get(_$4, "msDef"), Impl_45Type = _ms.getDefaultExport(Impl_45Type_3), Kind = _ms.getDefaultExport(Kind_4), _$6 = _ms.getModule(Kind_4), kind_33 = _ms.get(_$6, "kind!"), Method = _ms.getDefaultExport(Method_5), _$7 = _ms.getModule(Method_5), _45_45contains_63 = _ms.get(_$7, "--contains?"), impl_33 = _ms.get(_$7, "impl!"), _$9 = _ms.lazyGetModule(_63_6), _63_45or = _ms.lazyProp(_$9, "?-or"), Obj = _ms.lazy(function() {
			return _ms.getDefaultExport(Obj_7)
		}), _$10 = _ms.lazyGetModule(Obj_7), _63p_45with_45proto = _ms.lazyProp(_$10, "?p-with-proto"), _$11 = _ms.lazyGetModule(Try_8), oh_45no_33 = _ms.lazyProp(_$11, "oh-no!");
		const exports = { };
		const Type = Kind(function() {
			const doc = "Anything implementing contains?.\nTypes are generally used to succinctly make assertions about values.";
			return {
				doc: doc,
				displayName: "Type"
			}
		}());
		impl_33(_61_63, Type, id_61_63);
		const contains_63 = exports["contains?"] = _45_45contains_63;
		msDef("checkContains", function(type, value, name) {
			switch (true) {
				case _ms.bool(contains_63(type, value)):
					{
						null
					};
					break
				default: {
					_ms.unlazy(oh_45no_33)(((((((("" + _ms.show(name)) + " is no ") + _ms.show(type)) + ", is a ") + _ms.show(type_45of(value))) + ": ") + _ms.show(value)))
				}
			};
			return value
		});
		const _61_62 = exports["=>"] = Method(function() {
			const doc = function(convert_45to, convert_45me) {
				_ms.checkContains(Type, convert_45to, "convert-to");
				return "Converts a value to a given type."
			};
			const wrap = function(impl, type, converted, opts) {
				return function() {
					const _ = converted;
					switch (true) {
						case _ms.bool(_ms.contains(type, _)): {
							return _
						}
						default: {
							return impl(type, converted, opts)
						}
					}
				}()
			};
			return {
				doc: doc,
				wrap: wrap,
				displayName: "=>"
			}
		}());
		const type_45of = exports["type-of"] = function() {
			const doc = "Most specific Impl-Type for a value.";
			const test = function() {
				const _k0 = [ Type ], _v0 = Kind;
				const _k1 = [ null ], _v1 = _ms.unlazy(Obj);
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(obj) {
				return _ms.checkContains(Impl_45Type, _ms.unlazy(_63_45or)(_ms.unlazy(_63p_45with_45proto)(obj, "constructor"), _ms.unlazy(Obj)), "res")
			}, "doc", doc, "test", test, "displayName", "type-of")
		}();
		kind_33(Impl_45Type, Type);
		kind_33(Method, Type);
		impl_45contains_63_33(Fun, function(fun, _) {
			return js_45instanceof(_, fun)
		});
		exports.default = Type;
		const displayName = exports.displayName = "Type";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQVlBO0FBQUE7Ozs7RUFBQSxhQUFPLGdCQUFJO0FBQUEsR0FDVixZQUNDO0FBQUEsVUFGUztBQUFBOzs7O0VBR1gsUUFBQSxRQUFBLE1BQUE7QUFBQSxFQUVBLDJDQUFXO0FBQUEsRUFFWCxNQUFPLGlCQUFnQixTQUFBLE1BQUssT0FBTSxNQUNqQztBQUFBLEdBQUs7SUFDSixjQUFBLFlBQUEsTUFBQTtBQUFBLEtBQ0M7QUFBQSxNQUFBO0FBQUE7QUFBQTthQUVBO0FBQUEsNEJBQVEsT0FjQyxjQWRELCtCQUFhLCtCQUFhLFVBQUEsNEJBQWlCO0FBQUE7QUFBQTtBQUFBLFVBQ3JEO0FBQUE7QUFBQSxFQUVELCtCQUFJLGtCQUFNO0FBQUEsR0FDVCxZQUFNLFNBQUEsY0FBZ0IsY0FDckI7QUFBQSxzQkFEZ0I7V0FDZjtBQUFBO0FBQUEsR0FDRixhQUFPLFNBQUEsTUFBSyxNQUFLLFdBQVUsTUFDMUI7QUFBQTtLQUFLLFVBQUE7QUFBQTtNQUNKLDJCQUFDLE1BQUQsS0FDQztBQUFBLGNBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxjQUFBLEtBQUEsTUFBQSxXQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVJNO0FBQUE7Ozs7O0VBVVYsa0RBQVE7QUFBQSxHQUNQLFlBQ0M7QUFBQSxHQUNELGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFBLGNBQVk7QUFBQSxJQUNaLFlBQUEsRUFBRTs7O2tCQUNGLFNBQVcsS0FDWDtBQUFBLDZCQURDLGtFQUNJLEtBQW9COzs7RUFHMUIsUUFBQSxhQUFBO0FBQUEsRUFDQSxRQUFBLFFBQUE7QUFBQSxFQUdBLHNCQUFBLEtBQXFCLFNBQUEsS0FBSSxHQUN4QjtBQUFBLFVBQUEsZ0JBQWMsR0FBZDtBQUFBO0FBQUEsb0JBRUY7QUFBQSxFQXREQSwwQ0FBQTtBQUFBIiwiZmlsZSI6IlR5cGUvVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9