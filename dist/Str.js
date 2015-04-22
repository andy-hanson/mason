"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./Bool", "./compare", "./js", "./RegExp", "./Type/Kind", "./Type/Method", "./Type/Pred-Type", "./at/at" ], function(exports, Bool_0, compare_1, js_2, RegExp_3, Kind_4, Method_5, Pred_45Type_6, _64_7) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Bool_0), and = _ms.get(_$2, "and"), compare = _ms.getDefaultExport(compare_1), _$3 = _ms.getModule(compare_1), _61_63 = _ms.get(_$3, "=?"), _$4 = _ms.getModule(js_2), id_61_63 = _ms.get(_$4, "id=?"), _$5 = _ms.getModule(RegExp_3), regexp = _ms.get(_$5, "regexp"), Kind = _ms.getDefaultExport(Kind_4), _$7 = _ms.getModule(Method_5), impl_33 = _ms.get(_$7, "impl!"), Pred_45Type = _ms.getDefaultExport(Pred_45Type_6), _$10 = _ms.lazyGetModule(_64_7), count = _ms.lazyProp(_$10, "count");
		const exports = { };
		const Str = function() {
			const doc = "JavaScript's native String type.";
			return _ms.set(global.String, "doc", doc, "displayName", "Str")
		}();
		const Str_45Test = exports["Str-Test"] = Kind(function() {
			const doc = "Something we can compare a Str to.";
			const implementors = [ Str, RegExp ];
			return {
				doc: doc,
				implementors: implementors,
				displayName: "Str-Test"
			}
		}());
		const _45_62upper = exports["->upper"] = function() {
			const doc = "Converts a-z to A-Z.";
			const test = function() {
				const _k0 = [ "hi" ], _v0 = "HI";
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(s) {
				_ms.checkContains(Str, s, "s");
				return s.toUpperCase()
			}, "doc", doc, "test", test, "displayName", "->upper")
		}();
		const Char = exports.Char = Pred_45Type(function() {
			const doc = "Any String with only one character.";
			const predicate = function(_) {
				return and(_ms.contains(Str, _), _ms.lazy(function() {
					return _61_63(_ms.unlazy(count)(_), 1)
				}))
			};
			return {
				doc: doc,
				predicate: predicate,
				displayName: "Char"
			}
		}());
		const indent = exports.indent = function() {
			const doc = "Adds a `\\t` to all `\\n` in `str`.\nDoes *not* do anything to the first line.";
			const test = function() {
				const s = "a\nb";
				const s_45indented = "a\n\tb";
				const _k0 = [ s ], _v0 = s_45indented;
				const _k1 = [ "a" ], _v1 = "a";
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(str) {
				_ms.checkContains(Str, str, "str");
				return ("" + _ms.show(str.replace(regexp("\n", "g"), "\n\t")))
			}, "doc", doc, "test", test, "displayName", "indent")
		}();
		const split_45str = exports["split-str"] = function() {
			const doc = "Like `@.split` but using a Str-Test instead of a predicate.";
			const test = function() {
				const _k0 = [ " ", "I am a Str" ], _v0 = [ "I", "am", "a", "Str" ];
				const _k1 = [ regexp("."), "abc" ], _v1 = [ "", "", "", "" ];
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(splitter, _) {
				_ms.checkContains(Str_45Test, splitter, "splitter");
				_ms.checkContains(Str, _, "_");
				return _ms.checkContains(_ms.sub(Array, Str), _.split(splitter), "res")
			}, "doc", doc, "test", test, "displayName", "split-str")
		}();
		impl_33(_61_63, Str, id_61_63);
		impl_33(compare, Str, function(a, b) {
			return a.localeCompare(b)
		});
		exports.default = Str;
		const displayName = exports.displayName = "Str";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9TdHIubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQVdBO0FBQUE7O0VBQUEsdUJBQUs7QUFBQSxHQUNKLFlBQU07QUFBQSxrQkFDTjs7RUFFRCx5Q0FBVSxnQkFBSTtBQUFBLEdBQ2IsWUFBTTtBQUFBLEdBQ04scUJBQWMsRUFBQSxLQUFBO0FBQUEsVUFGRDtBQUFBOzs7OztFQUlkLG9EQUFRO0FBQUEsR0FDUCxZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSxJQUFBLFlBQUEsRUFBRyxjQUFVO0FBQUE7O2tCQUNiLFNBQUEsR0FDQTtBQUFBLHNCQURFO1dBQ0Y7OztFQUVGLDRCQUFNLHVCQUFTO0FBQUEsR0FDZCxZQUFNO0FBQUEsR0FDTixrQkFBWSxTQUFBLEdBQ1g7QUFBQSxXQUFBLGlCQUFLLEtBQUQ7WUFBTSx5QkFBSSxJQUFPO0FBQUE7QUFBQTtBQUFBLFVBSFI7QUFBQTs7Ozs7RUFLZiwyQ0FBTztBQUFBLEdBQ04sWUFDQztBQUFBLEdBQ0QsYUFBTyxXQUNOO0FBQUEsSUFBQSxVQUNDO0FBQUEsSUFDRCxxQkFDQztBQUFBLElBQ0QsWUFBQSxFQUFBLFdBQVM7QUFBQSxJQUNULFlBQUEsRUFBRyxhQUFTO0FBQUE7O2tCQUNaLFNBQUEsS0FDQTtBQUFBLHNCQURJO1dBQ0gsQ0FNcUMsY0FOcEMsWUFBWSxPQUFTLE1BQUssTUFBSztBQUFBOztFQUVuQyxzREFBVTtBQUFBLEdBQ1QsWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsSUFBQSxZQUFBLEVBQUcsS0FBSSxzQkFBaUIsRUFBRyxLQUFJLE1BQUssS0FBSTtBQUFBLElBQ3hDLFlBQUEsRUFBRSxPQUFTLE1BQUssZUFBVSxFQUFZO0FBQUE7O2tCQUN0QyxTQUFZLFVBQWtCLEdBQzlCO0FBQUEsc0JBRHFCO3NCQUFXO3FDQUEvQixPQUFLLE1BQ04sUUFBQTs7O0VBRUYsUUFBQSxRQUFBLEtBQUE7QUFBQSxFQUNBLFFBQUEsU0FBQSxLQUFtQixTQUFBLEdBQUUsR0FDcEI7QUFBQSxVQUFBLGdCQUFBO0FBQUE7QUFBQSxvQkFFRDtBQUFBLEVBeERBLDBDQUFBO0FBQUEiLCJmaWxlIjoiU3RyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=