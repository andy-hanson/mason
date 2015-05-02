"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./private/bootstrap", "./Type/Method" ], function(exports, bootstrap_0, Method_1) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(bootstrap_0), Obj = _ms.get(_$2, "Obj"), msDef = _ms.get(_$2, "msDef"), Method = _ms.getDefaultExport(Method_1);
		const exports = { };
		const sub = exports.sub = Method(function() {
			const doc = "Implementing this allows the use of the special syntax `a[b]`.";
			return {
				doc: doc,
				displayName: "sub"
			}
		}());
		msDef("sub", sub);
		const freeze = exports.freeze = Method(function() {
			const doc = "Returns a compacted and immutable version of it.\nDoes not have to return the same value, but often does.";
			const _default = function(_) {
				return Obj.freeze(_)
			};
			return {
				doc: doc,
				default: _default,
				displayName: "freeze"
			}
		}());
		const frozen_63 = exports["frozen?"] = function(_) {
			return Obj.isFrozen(_)
		};
		const displayName = exports.displayName = "methods";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRob2RzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvQ0FJQTtBQUFBOztFQUNDLDBCQUFLLGtCQUFNO0FBQUEsR0FDVixZQUFNO0FBQUEsVUFESTtBQUFBOzs7O0VBRVgsTUFBTyxPQUFQO0FBQUEsRUFJQSxnQ0FBUSxrQkFBTTtBQUFBLEdBQ2IsWUFDQztBQUFBLEdBR0QsaUJBQVUsU0FBQSxHQUNUO0FBQUEsV0FBQSxXQUFXO0FBQUE7QUFBQSxVQU5DO0FBQUE7Ozs7O0VBUWQsdUNBQVUsU0FBQSxHQUNUO0FBQUEsVUFBQSxhQUFhO0FBQUE7QUFBQSxFQXBCZiwwQ0FBQTtBQUFBIiwiZmlsZSI6Im1ldGhvZHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==