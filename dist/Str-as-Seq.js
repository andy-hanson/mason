"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./at/at", "./at/at-Type", "./at/Seq", "./compare", "./control", "./Fun", "./show", "./Str", "./Type/Impl-Type", "./Type/Kind", "./Type/Method", "./Type/Pred-Type", "./Type/Type", "./bang", "./Fun" ], function(exports, _64_0, _64_45Type_1, Seq_2, compare_3, control_4, Fun_5, show_6, Str_7, Impl_45Type_8, Kind_9, Method_10, Pred_45Type_11, Type_12, _33_13, Fun_14) {
	exports._get = _ms.lazy(function() {
		const _64 = _ms.getDefaultExport(_64_0), _$2 = _ms.getModule(_64_0), count = _ms.get(_$2, "count"), empty_63 = _ms.get(_$2, "empty?"), iterator = _ms.get(_$2, "iterator"), map = _ms.get(_$2, "map"), _64_45Type = _ms.getDefaultExport(_64_45Type_1), _$3 = _ms.getModule(_64_45Type_1), empty = _ms.get(_$3, "empty"), from_45stream = _ms.get(_$3, "from-stream"), Seq = _ms.getDefaultExport(Seq_2), _$5 = _ms.getModule(compare_3), _61_63 = _ms.get(_$5, "=?"), sort = _ms.get(_$5, "sort"), _$6 = _ms.getModule(control_4), opr = _ms.get(_$6, "opr"), Fun = _ms.getDefaultExport(Fun_5), _$7 = _ms.getModule(Fun_5), noop = _ms.get(_$7, "noop"), thunk = _ms.get(_$7, "thunk"), show = _ms.getDefaultExport(show_6), Str = _ms.getDefaultExport(Str_7), _$10 = _ms.getModule(Impl_45Type_8), self_45type = _ms.get(_$10, "self-type"), _$11 = _ms.getModule(Kind_9), kind_33 = _ms.get(_$11, "kind!"), self_45kind_33 = _ms.get(_$11, "self-kind!"), _$12 = _ms.getModule(Method_10), impl_33 = _ms.get(_$12, "impl!"), impl_45double_33 = _ms.get(_$12, "impl-double!"), impl_45for = _ms.get(_$12, "impl-for"), _$13 = _ms.getModule(Pred_45Type_11), Opt = _ms.get(_$13, "Opt"), _$14 = _ms.getModule(Type_12), _61_62 = _ms.get(_$14, "=>"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_13)
		}), _$17 = _ms.lazyGetModule(Fun_14), identity = _ms.lazyProp(_$17, "identity");
		const exports = { };
		const test = function() {
			return _ms.unlazy(_33)(_61_63, [ "1", "2", "3" ], map("123", _ms.unlazy(identity)))
		};
		self_45kind_33(Str, _64_45Type, function() {
			const _k0 = empty, _v0 = thunk("");
			const _k1 = from_45stream, _v1 = function(_) {
				return from_45stream(Array, _)
			};
			return _ms.map(_k0, _v0, _k1, _v1)
		}());
		impl_45double_33(_61_62, self_45type(Str), _64, function() {
			const test = function() {
				const _k0 = [ Str, [ 1, 2, 3 ] ], _v0 = "123";
				const _k1 = [ Str, [ 1, 2, 3 ], ", " ], _v1 = "1, 2, 3";
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(Str, _, _63joiner) {
				_ms.checkContains(_ms.sub(Opt, Str), _63joiner, "?joiner");
				noop(Str);
				const joiner = opr(_63joiner, "");
				return _61_62(Array, map(_, show)).join(joiner)
			}, "test", test)
		}());
		impl_33(sort, Str, function() {
			const test = function() {
				return "TODO"
			};
			return _ms.set(function(_, _63sort_45by) {
				_ms.checkContains(_ms.sub(Opt, Fun), _63sort_45by, "?sort-by");
				return _ms.checkContains(Str, _61_62(Str, sort.default(_, _63sort_45by)), "res")
			}, "test", test)
		}());
		exports.default = kind_33(Str, Seq, function() {
			const _k0 = count, _v0 = function(_) {
				return _.length
			};
			const _k1 = empty_63, _v1 = function(_) {
				return _61_63(0, _.length)
			};
			const _k2 = iterator, _v2 = impl_45for(iterator, Array);
			return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
		}());
		const displayName = exports.displayName = "Str-as-Seq";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9TdHItYXMtU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvQ0FvQkE7QUFBQTs7OztFQUFBLGFBQU8sV0FDTjtBQUFBLDBCQUFBLFFBQUssRUFBRyxLQUFJLEtBQUksT0FBSyxJQUFNOztFQUU1QixlQUFBLEtBQUEsdUJBQXFCO0FBQUEsR0FDcEIsWUFBQSxhQUFTLE1BV2M7QUFBQSxHQVR2QixZQUFBLHFCQUFnQixTQUFBLEdBQ2Y7QUFBQSxXQUFBLGNBQUEsT0FBa0I7QUFBQTtBQUFBOztFQUVwQixpQkFBQSxRQUFnQixZQUFBLE1BQWhCLGdCQUFpQztBQUFBLEdBQ2hDLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFBLEtBQU0sRUFBRSxHQUFFLEdBQUUsYUFBVTtBQUFBLElBQ3RCLFlBQUEsRUFBQSxLQUFNLEVBQUUsR0FBRSxHQUFFLEtBQUssY0FBVTtBQUFBOztrQkFDM0IsU0FBQSxLQUFJLEdBQUUsV0FDTjtBQUFBLDhCQURjLEtBQUc7SUFDakIsS0FBQTtBQUFBLElBQ0EsZUFBUyxJQUFBLFdBQWE7QUFBQSxXQUN0QixPQUFBLE9BQVUsSUFBSyxHQUFMLFlBQVY7QUFBQTs7RUFFRixRQUFBLE1BQUEsZ0JBQWM7QUFBQSxHQUNiLGFBQU8sV0FDTjtBQUFBLFdBQUM7QUFBQTtBQUFBLGtCQUNELFNBQUssR0FBRSxjQUNQO0FBQUEsOEJBRGdCLEtBQUc7NkJBQWxCLEtBQ0QsT0FBQSxLQUFRLGFBQWEsR0FBZDs7O29CQUVULFFBQUEsS0FBQSxnQkFBYTtBQUFBLEdBQ1osWUFBQSxhQUFVLFNBQUEsR0FDVDtBQUFBLFdBQUE7O0dBQ0QsWUFBQSxnQkFBVyxTQUFBLEdBQ1Y7QUFBQSxXQUFBLE9BQUcsR0FBRTs7R0FHTixZQUFBLGdCQUFZLFdBQUEsVUFBQTtBQUFBOztFQW5EYiwwQ0FBQTtBQUFBIiwiZmlsZSI6IlN0ci1hcy1TZXEuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==