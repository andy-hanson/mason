"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
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
//# sourceMappingURL=../math/methods.js.map