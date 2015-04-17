"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../at/at", "../../at/Map/Mapbang", "../../at/Map/Id-Mapbang", "../../at/Map/multi-mapbang", "../../at/Range", "../../at/Stream", "../../Generatorbang", "../../math/Num", "../../math/methods", "../../Type/Type", "../../bang", "../../at/at", "../../at/Seq", "../../Bool", "../../math/Num" ], function(exports, _64_0, Map_33_1, Id_45Map_33_2, multi_45map_33_3, Range_4, Stream_5, Generator_33_6, Num_7, methods_8, Type_9, _33_10, _64_11, Seq_12, Bool_13, Num_14) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(_64_0), each_33 = _ms.get(_$2, "each!"), empty_63 = _ms.get(_$2, "empty?"), _$3 = _ms.getModule(Map_33_1), assoc_33 = _ms.get(_$3, "assoc!"), un_45assoc_33 = _ms.get(_$3, "un-assoc!"), Id_45Map_33 = _ms.getDefaultExport(Id_45Map_33_2), _$5 = _ms.getModule(multi_45map_33_3), add_45to_45_64_33 = _ms.get(_$5, "add-to-@!"), _$6 = _ms.getModule(Range_4), range = _ms.get(_$6, "range"), Stream = _ms.getDefaultExport(Stream_5), _$8 = _ms.getModule(Generator_33_6), each_126 = _ms.get(_$8, "each~"), _$9 = _ms.getModule(Num_7), infinity = _ms.get(_$9, "infinity"), square = _ms.get(_$9, "square"), _$10 = _ms.getModule(methods_8), _43 = _ms.get(_$10, "+"), _42 = _ms.get(_$10, "*"), _$11 = _ms.getModule(Type_9), _61_62 = _ms.get(_$11, "=>"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_10)
		}), _$14 = _ms.lazyGetModule(_64_11), any_63 = _ms.lazyProp(_$14, "any?"), _$15 = _ms.lazyGetModule(Seq_12), take = _ms.lazyProp(_$15, "take"), _$16 = _ms.lazyGetModule(Bool_13), not = _ms.lazyProp(_$16, "not"), _$17 = _ms.lazyGetModule(Num_14), divisible_63 = _ms.lazyProp(_$17, "divisible?");
		const exports = { };
		const primes = exports.primes = function() {
			const doc = "Infinite Seq of Num > 2, each divisible only by itself and one.";
			const test = function() {
				const is_45prime_63 = function(_) {
					return _ms.unlazy(not)(_ms.unlazy(any_63)(range(2, _), _ms.sub(_ms.unlazy(divisible_63), _)))
				};
				return each_33(_ms.unlazy(take)(primes, 20), _ms.sub(_ms.unlazy(_33), is_45prime_63))
			};
			return _ms.set(Stream(function*() {
				(yield 2);
				(yield 3);
				const prime_45factors = _61_62(Id_45Map_33, (yield* function*() {
					const _k0 = 9, _v0 = [ 3 ];
					return _ms.map(_k0, _v0)
				}()));
				return (yield* each_126(range(5, infinity, 2), function*(candidate) {
					{
						const _ = un_45assoc_33(prime_45factors, candidate);
						switch (true) {
							case _ms.bool(empty_63(_)):
								{
									(yield candidate);
									assoc_33(prime_45factors, square(candidate), [ candidate ])
								};
								break
							default: {
								each_33(_.val, function(factor) {
									const key = _43(candidate, _42(2, factor));
									return add_45to_45_64_33(prime_45factors, key, [ factor ])
								})
							}
						}
					}
				}))
			}), "doc", doc, "test", test, "displayName", "primes")
		}();
		const displayName = exports.displayName = "sieve-of-eratosthenes";
		return exports
	})
})
//# sourceMappingURL=../../meta/demo/sieve-of-eratosthenes.js.map