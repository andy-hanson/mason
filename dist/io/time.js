"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../cash", "../Fun", "../js", "../math/Num", "../bang", "../compare", "../meta/tests/perf-test" ], function(exports, $_0, Fun_1, js_2, Num_3, _33_4, compare_5, perf_45test_6) {
	exports._get = _ms.lazy(function() {
		const $ = _ms.getDefaultExport($_0), Fun = _ms.getDefaultExport(Fun_1), _$4 = _ms.getModule(js_2), _new = _ms.get(_$4, "new"), Num = _ms.getDefaultExport(Num_3), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_4)
		}), _$8 = _ms.lazyGetModule(compare_5), _61_63 = _ms.lazyProp(_$8, "=?"), _60_63 = _ms.lazyProp(_$8, "<?"), _$9 = _ms.lazyGetModule(perf_45test_6), $time = _ms.lazyProp(_$9, "$time");
		const exports = {};
		const current_45time_45ms = exports["current-time-ms"] = function() {
			const doc = "Milliseconds since 1 January 1970 00:00:00 UTC.";
			return _ms.set(function() {
				return _new(global.Date).getTime()
			}, "doc", doc, "displayName", "current-time-ms")
		}();
		const $after_45time = exports["$after-time"] = function() {
			const doc = "Does something after a certain time has passed.";
			const $test = function*() {
				const _ = $after_45time(100, function() {
					return 1
				});
				_ms.unlazy(_33)(_ms.unlazy(_60_63), 100, (yield _ms.unlazy($time)(_)));
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), 1, (yield _))
			};
			return _ms.set(function(time_45ms, _) {
				_ms.checkContains(Num, time_45ms, "time-ms");
				_ms.checkContains(Fun, _, "_");
				return _new($, function(resolve) {
					const f = function() {
						return resolve(_())
					};
					return global.setTimeout(f, time_45ms)
				})
			}, "doc", doc, "$test", $test, "displayName", "$after-time")
		}();
		const displayName = exports.displayName = "time";
		return exports
	})
})
//# sourceMappingURL=../io/time.js.map