"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./at/at", "./Bool", "./control", "./Fun", "./Generatorbang", "./js", "./methods", "./Type/Method", "./Type/Pred-Type", "./Type/Type", "./math/Num", "./Try", "./at/Stream", "./bang", "./compare", "./io/time", "./math/Num", "./math/methods", "./Try" ], function(exports, _64_0, Bool_1, control_2, Fun_3, Generator_33_4, js_5, methods_6, Method_7, Pred_45Type_8, Type_9, Num_10, Try_11, Stream_12, _33_13, compare_14, time_15, Num_16, methods_17, Try_18) {
	exports._get = _ms.lazy(function() {
		const _64 = _ms.getDefaultExport(_64_0), _$2 = _ms.getModule(_64_0), flatten = _ms.get(_$2, "flatten"), map = _ms.get(_$2, "map"), Bool = _ms.getDefaultExport(Bool_1), _$4 = _ms.getModule(control_2), _if = _ms.get(_$4, "if"), Fun = _ms.getDefaultExport(Fun_3), _$5 = _ms.getModule(Fun_3), apply = _ms.get(_$5, "apply"), Generator_33 = _ms.getDefaultExport(Generator_33_4), _$7 = _ms.getModule(js_5), _new = _ms.get(_$7, "new"), _$8 = _ms.getModule(methods_6), sub = _ms.get(_$8, "sub"), _$9 = _ms.getModule(Method_7), self_45impl_33 = _ms.get(_$9, "self-impl!"), _$10 = _ms.getModule(Pred_45Type_8), Any = _ms.get(_$10, "Any"), _$11 = _ms.getModule(Type_9), _61_62 = _ms.get(_$11, "=>"), Num = _ms.lazy(function() {
			return _ms.getDefaultExport(Num_10)
		}), _$14 = _ms.lazyGetModule(Try_11), $catch = _ms.lazyProp(_$14, "$catch"), oh_45no_33 = _ms.lazyProp(_$14, "oh-no!"), Stream = _ms.lazy(function() {
			return _ms.getDefaultExport(Stream_12)
		}), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_13)
		}), _$18 = _ms.lazyGetModule(compare_14), _61_63 = _ms.lazyProp(_$18, "=?"), _$19 = _ms.lazyGetModule(time_15), $after_45time = _ms.lazyProp(_$19, "$after-time"), _$20 = _ms.lazyGetModule(Num_16), divisible_63 = _ms.lazyProp(_$20, "divisible?"), _$21 = _ms.lazyGetModule(methods_17), _43 = _ms.lazyProp(_$21, "+"), _$22 = _ms.lazyGetModule(Try_18), $try = _ms.lazyProp(_$22, "$try");
		const exports = { };
		const $ = function() {
			const doc = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise\nCalled `$` because you \"cash in\" on it after some time.";
			return _ms.set(Promise, "doc", doc, "displayName", "$")
		}();
		self_45impl_33(sub, $, function() {
			return $
		});
		const $done = exports.$done = function() {
			const doc = "Don't forget $done!\nLogs any errors that happen inside a promise.\nIt would be great if we could make these errors happen top-level...\nThis is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.";
			return _ms.set(function(_) {
				_ms.checkContains($, _, "_");
				return _ms.unlazy($catch)(_, function(err) {
					global.console.log((((("=== error ===\n" + _ms.show(err.message)) + "\n") + _ms.show(err.stack)) + "\n=== error ==="));
					return _ms.unlazy(oh_45no_33)(err)
				})
			}, "doc", doc, "displayName", "$done")
		}();
		const $fail_45after_45time = exports["$fail-after-time"] = function() {
			const doc = "Fails if it takes too long.";
			const $test = function*() {
				const $x = _ms.unlazy($after_45time)(100, function() {
					return 1
				});
				const a = (yield _ms.unlazy($try)($fail_45after_45time($x, 1)));
				_ms.unlazy(_33)(_ms.unlazy(_61_63), a.message, "Took longer than 1 milliseconds.");
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), 1, (yield $fail_45after_45time($x, 200)))
			};
			return _ms.set(function(_, time_45ms) {
				_ms.checkContains($, _, "_");
				_ms.checkContains(_ms.unlazy(Num), time_45ms, "time-ms");
				return _ms.checkContains($, _new($, function(resolve, reject) {
					$after(_, resolve);
					const timeout = function() {
						return reject(_61_62(Error, (("Took longer than " + _ms.show(time_45ms)) + " milliseconds.")))
					};
					return global.setTimeout(timeout, time_45ms)
				}), "res")
			}, "doc", doc, "$test", $test, "displayName", "$fail-after-time")
		}();
		const $after = exports.$after = function() {
			const doc = "Applies `then` to the result whenever it is ready.\nIf `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.";
			const $test = function*() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), 2, (yield $after($resolved(1), _ms.sub(_ms.unlazy(_43), 1))))
			};
			return _ms.set(function(_, then) {
				_ms.checkContains($, _, "_");
				_ms.checkContains(Fun, then, "then");
				return _ms.checkContains($, _.then(then), "res")
			}, "doc", doc, "$test", $test, "displayName", "$after")
		}();
		const $resolved = exports.$resolved = function() {
			const doc = "$ that is already resolved.";
			const $test = function*() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), 1, (yield $resolved(1)))
			};
			return _ms.set(function(value) {
				return _ms.checkContains($, Promise.resolve(value), "res")
			}, "doc", doc, "$test", $test, "displayName", "$resolved")
		}();
		const $rejected = exports.$rejected = function() {
			const doc = "$ that is already rejected.";
			const test = function() {
				return $ing(function*() {
					const r = $rejected("a");
					_ms.unlazy(_33)(_ms.unlazy(_61_63), "a", (yield _ms.unlazy($try)(r)).message);
					const b = (yield _ms.unlazy($try)($after(r, function() {
						return _ms.unlazy(oh_45no_33)("b")
					})));
					return _ms.unlazy(_33)(_ms.unlazy(_61_63), "a", b.message)
				})
			};
			return _ms.set(function(_) {
				return Promise.reject(_61_62(Error, _))
			}, "doc", doc, "test", test, "displayName", "$rejected")
		}();
		const $delay = exports.$delay = function() {
			const doc = "Schedules a computation to happen later.\nDoes *not* run it in parallel.\nIt should go without saying,\nbut if you needlessly $delay things all the time your program will take longer.";
			const $test = function*() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), 1, (yield $delay(function() {
					return 1
				})))
			};
			return _ms.set(function(delayed) {
				_ms.checkContains(_ms.sub(Fun, 0), delayed, "delayed");
				return _new($, function(resolve) {
					return resolve(delayed())
				})
			}, "$test", $test, "doc", doc, "displayName", "$delay")
		}();
		const $all = exports.$all = function() {
			const doc = "$ that resolves when the last $ in the input does, with every value in the original iteration order.\nIf any one of them fails, fails with the first such failure.";
			const $test = function*() {
				_ms.unlazy(_33)(_ms.unlazy(_61_63), [ 1, 2 ], (yield $all([ $resolved(1), $resolved(2) ])));
				const all_45rejected = $all([ $rejected("a"), $rejected("b") ]);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), "a", (yield _ms.unlazy($try)(all_45rejected)).message)
			};
			return _ms.set(function(_) {
				_ms.checkContains(_ms.sub(_64, $), _, "_");
				return _ms.checkContains(_ms.sub($, Array), $.all(_61_62(Array, _)), "res")
			}, "doc", doc, "$test", $test, "displayName", "$all")
		}();
		const $map = exports.$map = function() {
			const doc = "Asynchronously runs mapper for every element of mapped and returns a $ joining them.\nUnlike map, this always returns an Array.";
			const $test = function*() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), [ 2, 3, 4 ], (yield $map([ 1, 2, 3 ], function(_) {
					return $delay(function() {
						return _ms.unlazy(_43)(_, 1)
					})
				})))
			};
			return _ms.set(function(mapped, mapper) {
				_ms.checkContains(_64, mapped, "mapped");
				_ms.checkContains(_ms.sub(Fun, Any, $), mapper, "mapper");
				return _ms.checkContains(_ms.sub($, Array), $all(map(mapped, mapper)), "res")
			}, "doc", doc, "$test", $test, "displayName", "$map")
		}();
		const $flat_45map = exports["$flat-map"] = function() {
			const doc = "Like $map but flattens the result.";
			const $test = function*() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), _61_62(_ms.unlazy(Stream), [ 1, 1, 2, 2, 3, 3 ]), (yield $flat_45map([ 1, 2, 3 ], function(_) {
					return $delay(function() {
						return [ _, _ ]
					})
				})))
			};
			return _ms.set(function(mapped, mapper) {
				_ms.checkContains(_64, mapped, "mapped");
				_ms.checkContains(_ms.sub(Fun, Any, _ms.sub($, _64)), mapper, "mapper");
				return _ms.checkContains(_ms.sub($, _64), $after($map(mapped, mapper), flatten), "res")
			}, "doc", doc, "$test", $test, "displayName", "$flat-map")
		}();
		const $keep = exports.$keep = function() {
			const doc = "Asynchronously runs keep-if? on each element and creates an Array of those that match.\nMaintains the original order.";
			const $test = function*() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), _61_62(_ms.unlazy(Stream), [ 2, 4 ]), (yield $keep([ 1, 2, 3, 4 ], function(_) {
					return $delay(function() {
						return _ms.unlazy(divisible_63)(_, 2)
					})
				})))
			};
			return _ms.set(function(keep_45some, keep_45if_63) {
				_ms.checkContains(_64, keep_45some, "keep-some");
				_ms.checkContains(_ms.sub(Fun, Any, _ms.sub($, Bool)), keep_45if_63, "keep-if?");
				return _ms.checkContains(_ms.sub($, Array), $flat_45map(keep_45some, function(_) {
					return $after(keep_45if_63(_), function(keep) {
						return _if(keep, _)
					})
				}), "res")
			}, "doc", doc, "$test", $test, "displayName", "$keep")
		}();
		const $call = exports.$call = function() {
			const doc = "Allows you to cal a function on $s as if they were the arguments.\nSo for any place you would write `f x` where `x` is an actualized value,\nyou may write `$call f $x` where `$x` is a promise.";
			const $test = function*() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), 3, (yield $call(_ms.unlazy(_43), $resolved(1), $resolved(2))))
			};
			return _ms.set(function(f) {
				const $args = [ ].slice.call(arguments, 1);
				return _ms.checkContains($, $after($all($args), _ms.sub(apply, f)), "res")
			}, "doc", doc, "$test", $test, "displayName", "$call")
		}();
		const $ing = exports.$ing = function() {
			const doc = "Within the generator, you may write:\n\ta <~ $get-a\nThe code after the assignment will become an $after of it.\nNote that $ing returns a $; it does *not* call $done at the end.";
			const $test = function*() {
				_ms.unlazy(_33)(_ms.unlazy(_61_63), "res", (yield $ing(function*() {
					const promised = (yield $resolved("promised"));
					_ms.unlazy(_33)(_ms.unlazy(_61_63), "promised", promised);
					return "res"
				})));
				const $whoops = (yield _ms.unlazy($try)($ing(function*() {
					(yield $rejected("whoops"));
					return _ms.unlazy(oh_45no_33)("It's been rejected, so the rest is never called.")
				})));
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), "whoops", $whoops.message)
			};
			return _ms.set(function(code) {
				_ms.checkContains(_ms.sub(Fun, Generator_33), code, "code");
				const gen = code();
				const do_45next = function(last_45value) {
					const _$182 = gen.next(last_45value), value = _$182.value, done = _$182.done;
					return function() {
						switch (true) {
							case _ms.bool(done): {
								return value
							}
							default: {
								return $after(value, do_45next)
							}
						}
					}()
				};
				return _ms.checkContains($, do_45next(), "res")
			}, "doc", doc, "$test", $test, "displayName", "$ing")
		}();
		exports.default = $;
		const displayName = exports.displayName = "$";
		return exports
	})
})
//# sourceMappingURL=cash.js.map