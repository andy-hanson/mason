"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../Type/Method" ], function(exports, Method_0) {
	exports._get = _ms.lazy(function() {
		const Method = _ms.getDefaultExport(Method_0);
		const exports = { };
		const _43 = exports["+"] = Method(function() {
			const doc = function(a, b) {
				return "Combines two values of the same type into a greater value of that type."
			};
			return {
				doc: doc,
				displayName: "+"
			}
		}());
		const _45 = exports["-"] = Method(function() {
			const doc = function(a, b) {
				return "`+ b res` should be `a`."
			};
			return {
				doc: doc,
				displayName: "-"
			}
		}());
		const _42 = exports["*"] = Method(function() {
			const doc = function(a, b) {
				return "Sum of `b` copies of `a`."
			};
			return {
				doc: doc,
				displayName: "*"
			}
		}());
		const _47 = exports["/"] = Method(function() {
			const doc = function(a, b) {
				return "`* b res` should be `a`."
			};
			return {
				doc: doc,
				displayName: "/"
			}
		}());
		const displayName = exports.displayName = "methods";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL21ldGhvZHMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQUdBO0FBQUE7O0VBQUEsMkJBQUcsa0JBQU07QUFBQSxHQUNSLFlBQU0sU0FBQSxHQUFFLEdBQ1A7QUFBQSxXQUFDO0FBQUE7QUFBQSxVQUZNO0FBQUE7Ozs7RUFJVCwyQkFBRyxrQkFBTTtBQUFBLEdBQ1IsWUFBTSxTQUFBLEdBQUUsR0FDUDtBQUFBLFdBQUM7QUFBQTtBQUFBLFVBRk07QUFBQTs7OztFQUlULDJCQUFHLGtCQUFNO0FBQUEsR0FDUixZQUFNLFNBQUEsR0FBRSxHQUNQO0FBQUEsV0FBQztBQUFBO0FBQUEsVUFGTTtBQUFBOzs7O0VBSVQsMkJBQUcsa0JBQU07QUFBQSxHQUNSLFlBQU0sU0FBQSxHQUFFLEdBQ1A7QUFBQSxXQUFDO0FBQUE7QUFBQSxVQUZNO0FBQUE7Ozs7RUFmVCwwQ0FBQTtBQUFBIiwiZmlsZSI6Im1hdGgvbWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9