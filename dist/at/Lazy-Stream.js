"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../Fun", "../Generatorbang", "../math/Num", "../math/methods", "../Type/Kind", "../Type/Obj-Type", "./at", "./atbang", "./at-Type", "./Arraybang", "./Seq", "./Stream", "../bang", "../compare", "../control", "../math/methods", "../math/Num", "../Type/Type", "./Range", "./Seq" ], function(exports, Fun_0, Generator_33_1, Num_2, methods_3, Kind_4, Obj_45Type_5, _64_6, _64_33_7, _64_45Type_8, Array_33_9, Seq_10, Stream_11, _33_12, compare_13, control_14, methods_15, Num_16, Type_17, Range_18, Seq_19) {
	exports._get = _ms.lazy(function() {
		const Fun = _ms.getDefaultExport(Fun_0), _$2 = _ms.getModule(Fun_0), thunk = _ms.get(_$2, "thunk"), Generator_33 = _ms.getDefaultExport(Generator_33_1), _$3 = _ms.getModule(Generator_33_1), each_126 = _ms.get(_$3, "each~"), empty_45Generator = _ms.get(_$3, "empty-Generator"), _$4 = _ms.getModule(Num_2), Nat = _ms.get(_$4, "Nat"), _$5 = _ms.getModule(methods_3), _45 = _ms.get(_$5, "-"), _$6 = _ms.getModule(Kind_4), kind_33 = _ms.get(_$6, "kind!"), self_45kind_33 = _ms.get(_$6, "self-kind!"), Obj_45Type = _ms.getDefaultExport(Obj_45Type_5), _$8 = _ms.getModule(_64_6), count = _ms.get(_$8, "count"), empty_63 = _ms.get(_$8, "empty?"), iterator = _ms.get(_$8, "iterator"), _$9 = _ms.getModule(_64_33_7), _43_43_33 = _ms.get(_$9, "++!"), _64_45Type = _ms.getDefaultExport(_64_45Type_8), _$10 = _ms.getModule(_64_45Type_8), empty = _ms.get(_$10, "empty"), from_45stream = _ms.get(_$10, "from-stream"), Array_33 = _ms.getDefaultExport(Array_33_9), Seq = _ms.getDefaultExport(Seq_10), _$12 = _ms.getModule(Seq_10), _63nth = _ms.get(_$12, "?nth"), Stream = _ms.getDefaultExport(Stream_11), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_12)
		}), _$16 = _ms.lazyGetModule(compare_13), _61_63 = _ms.lazyProp(_$16, "=?"), _$17 = _ms.lazyGetModule(control_14), build = _ms.lazyProp(_$17, "build"), _$18 = _ms.lazyGetModule(methods_15), _43 = _ms.lazyProp(_$18, "+"), _$19 = _ms.lazyGetModule(Num_16), infinity = _ms.lazyProp(_$19, "infinity"), _$20 = _ms.lazyGetModule(Type_17), _61_62 = _ms.lazyProp(_$20, "=>"), _$21 = _ms.lazyGetModule(Range_18), range = _ms.lazyProp(_$21, "range"), _$22 = _ms.lazyGetModule(Seq_19), seq_61_63 = _ms.lazyProp(_$22, "seq=?"), take = _ms.lazyProp(_$22, "take");
		const exports = { };
		const Lazy_45Stream = Obj_45Type(function() {
			const doc = "Like Stream, but caches its elements as it produces them.\nIf you want to stream the results of an expensive computation and use it multiple times, use this.\nIf you have a cheap computation or only need to iterate through it once, use Stream.";
			const props = function() {
				const caching_45iterator = Generator_33;
				const cache = Array_33;
				return {
					"caching-iterator": caching_45iterator,
					cache: cache,
					displayName: "props"
				}
			}();
			return {
				doc: doc,
				props: props,
				displayName: "Lazy-Stream"
			}
		}());
		self_45kind_33(Lazy_45Stream, _64_45Type, function() {
			const _k0 = empty, _v0 = thunk(Lazy_45Stream(function() {
				const caching_45iterator = empty_45Generator;
				const cache = empty(Array_33);
				return {
					"caching-iterator": caching_45iterator,
					cache: cache
				}
			}()));
			const _k1 = from_45stream, _v1 = function(_) {
				return lazy_45streaming(function() {
					return iterator(_)
				})
			};
			return _ms.map(_k0, _v0, _k1, _v1)
		}());
		kind_33(Lazy_45Stream, Seq, function() {
			const _k0 = iterator, _v0 = function() {
				const test = function() {
					return _ms.unlazy(_33)(_ms.unlazy(_61_63), [ 1, 2 ], _ms.unlazy(build)(function(_yield) {
						const _ = _ms.unlazy(_61_62)(Lazy_45Stream, Stream(function*() {
							_yield(1);
							(yield 1);
							_yield(2);
							(yield 2);
							return _yield(3)
						}));
						_ms.unlazy(_33)(_ms.unlazy(seq_61_63), [ 1 ], _ms.unlazy(take)(_, 1));
						return _ms.unlazy(_33)(_ms.unlazy(seq_61_63), [ 1, 2 ], _ms.unlazy(take)(_, 2))
					}))
				};
				return _ms.set(function*(_) {
					(yield* iterator(_.cache));
					return (yield* _["caching-iterator"])
				}, "test", test)
			}();
			const _k1 = _63nth, _v1 = function(stream, n) {
				_ms.checkContains(Nat, n, "n");
				return function() {
					const _ = _63nth(stream.cache, n);
					switch (true) {
						case _ms.bool(empty_63(_)): {
							const left = _45(n, count(stream.cache));
							return _63nth(Stream(stream["caching-iterator"]), left)
						}
						default: {
							return _
						}
					}
				}()
			};
			return _ms.map(_k0, _v0, _k1, _v1)
		}());
		const lazy_45streaming = exports["lazy-streaming"] = function() {
			const doc = "Creates a Lazy-Stream from a generator.";
			const test = function() {
				const fibonaccis = Stream(function*() {
					(yield 1);
					(yield 1);
					return (yield* each_126(_ms.unlazy(range)(2, _ms.unlazy(infinity)), function*(i) {
						return (yield _ms.unlazy(_43)(_ms.sub(fibonaccis, _45(i, 1)), _ms.sub(fibonaccis, _45(i, 2))))
					}))
				});
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63), _ms.unlazy(take)(fibonaccis, 10), [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ])
			};
			return _ms.set(function(stream) {
				_ms.checkContains(_ms.sub(Fun, Generator_33), stream, "stream");
				const cash = empty(Array_33);
				return Lazy_45Stream(function() {
					const caching_45iterator = each_126(Stream(stream), function*(_) {
						_43_43_33(cash, [ _ ]);
						return (yield _)
					});
					const cache = cash;
					return {
						"caching-iterator": caching_45iterator,
						cache: cache
					}
				}())
			}, "doc", doc, "test", test, "displayName", "lazy-streaming")
		}();
		exports.default = Lazy_45Stream;
		const displayName = exports.displayName = "Lazy-Stream";
		return exports
	})
})
//# sourceMappingURL=../at/Lazy-Stream.js.map