"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../js", "../Type/Kind", "../Type/Type", "./at", "./atbang", "./at-Type", "./Setbang" ], function(exports, js_0, Kind_1, Type_2, _64_3, _64_33_4, _64_45Type_5, Set_33_6) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(js_0), _new = _ms.get(_$2, "new"), _$3 = _ms.getModule(Kind_1), kind_33 = _ms.get(_$3, "kind!"), self_45kind_33 = _ms.get(_$3, "self-kind!"), _$4 = _ms.getModule(Type_2), contains_63 = _ms.get(_$4, "contains?"), _$5 = _ms.getModule(_64_3), count = _ms.get(_$5, "count"), each_33 = _ms.get(_$5, "each!"), iterator = _ms.get(_$5, "iterator"), _$6 = _ms.getModule(_64_33_4), _43_43_33 = _ms.get(_$6, "++!"), _45_45_33 = _ms.get(_$6, "--!"), empty_33 = _ms.get(_$6, "empty!"), _64_45Type = _ms.getDefaultExport(_64_45Type_5), _$7 = _ms.getModule(_64_45Type_5), empty = _ms.get(_$7, "empty"), Set_33 = _ms.getDefaultExport(Set_33_6);
		const exports = { };
		const Id_45Set_33 = global.Set;
		self_45kind_33(Id_45Set_33, _64_45Type, function() {
			const _k0 = empty, _v0 = function() {
				return _new(Id_45Set_33)
			};
			return _ms.map(_k0, _v0)
		}());
		kind_33(Id_45Set_33, Set_33, function() {
			const _k0 = count, _v0 = function(_) {
				return _.size
			};
			const _k1 = _43_43_33, _v1 = function(_, addeds) {
				return each_33(addeds, function(added) {
					return _.add(added)
				})
			};
			const _k2 = empty_33, _v2 = function(_) {
				return _.clear(null)
			};
			const _k3 = _45_45_33, _v3 = function(_, deleteds) {
				return each_33(deleteds, function(deleted) {
					return _.delete(deleted)
				})
			};
			const _k4 = iterator, _v4 = function(_) {
				return _.keys(null)
			};
			const _k5 = contains_63, _v5 = function(_, val) {
				return _.has(val)
			};
			return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2, _k3, _v3, _k4, _v4, _k5, _v5)
		}());
		exports.default = Id_45Set_33;
		const displayName = exports.displayName = "Id-Set!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0lkLVNldCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29DQVNBO0FBQUE7O0VBQUEsb0JBQVU7RUFFVixlQUFBLGFBQUEsdUJBQXlCO0FBQUEsR0FDeEIsWUFBQSxhQUFVLFdBQ1Q7QUFBQSxXQUFBLEtBQUE7QUFBQTtBQUFBOztFQUVGLFFBQUEsYUFBQSxtQkFBa0I7QUFBQSxHQUNqQixZQUFBLGFBQVUsU0FBQSxHQUNUO0FBQUEsV0FBQTs7R0FDRCxZQUFBLGlCQUFRLFNBQUEsR0FBRSxRQUNUO0FBQUEsV0FBQSxRQUFBLFFBQWMsU0FBQSxPQUNiO0FBQUEsWUFBQSxNQUFBO0FBQUE7QUFBQTtBQUFBLEdBQ0YsWUFBQSxnQkFBVyxTQUFBLEdBQ1Y7QUFBQSxXQUFBLFFBQVE7QUFBQTtBQUFBLEdBQ1QsWUFBQSxpQkFBUSxTQUFBLEdBQUUsVUFDVDtBQUFBLFdBQUEsUUFBQSxVQUFnQixTQUFBLFNBQ2Y7QUFBQSxZQUFBLFNBQUE7QUFBQTtBQUFBO0FBQUEsR0FDRixZQUFBLGdCQUFhLFNBQUEsR0FFWjtBQUFBLFdBQUEsT0FBTztBQUFBO0FBQUEsR0FDUixZQUFBLG1CQUFjLFNBQUEsR0FBRSxLQUNmO0FBQUEsV0FBQSxNQUFBO0FBQUE7QUFBQTs7b0JBRUY7QUFBQSxFQWhDQSwwQ0FBQTtBQUFBIiwiZmlsZSI6ImF0L0lkLVNldGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==