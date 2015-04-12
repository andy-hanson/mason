"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../private/boot-order", "require", "../cash", "./modules", "./tests/test", "./tests/perf-test" ], function(exports, boot_45order_0, require_1, $_2, modules_3, test_4, perf_45test_5) {
	exports._get = _ms.lazy(function() {
		_ms.getModule(boot_45order_0);
		const require = _ms.getDefaultExport(require_1), _$5 = _ms.getModule($_2), $done = _ms.get(_$5, "$done"), $ing = _ms.get(_$5, "$ing"), _$7 = _ms.getModule(modules_3), $_64all_45modules = _ms.get(_$7, "$@all-modules"), _$8 = _ms.getModule(test_4), $test_45all = _ms.get(_$8, "$test-all"), _$9 = _ms.getModule(perf_45test_5), $time_33 = _ms.get(_$9, "$time!");
		const exports = {};
		exports.default = function() {
			return $done($ing(function*() {
				(yield $_64all_45modules(require, "../modules-list"));
				return (yield $time_33("test", $test_45all(require, "../modules-list")))
			}))
		};
		const displayName = exports.displayName = "run-all-tests";
		return exports
	})
})
//# sourceMappingURL=../meta/run-all-tests.js.map