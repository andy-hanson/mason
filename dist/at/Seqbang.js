"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../math/Num", "../Type/Kind", "../Type/Method", "./at", "./atbang", "./at-Type", "./q", "./Seq", "./Dequebang", "../bang", "../compare", "./at", "./Arraybang", "./Seq" ], function(exports, Num_0, Kind_1, Method_2, _64_3, _64_33_4, _64_45Type_5, _63_6, Seq_7, Deque_33_8, _33_9, compare_10, _64_11, Array_33_12, Seq_13) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(Num_0), Nat = _ms.get(_$2, "Nat"), Kind = _ms.getDefaultExport(Kind_1), _$3 = _ms.getModule(Kind_1), kind_33 = _ms.get(_$3, "kind!"), self_45kind_33 = _ms.get(_$3, "self-kind!"), Method = _ms.getDefaultExport(Method_2), _64 = _ms.getDefaultExport(_64_3), _64_33 = _ms.getDefaultExport(_64_33_4), _64_45Type = _ms.getDefaultExport(_64_45Type_5), _$7 = _ms.getModule(_64_45Type_5), empty = _ms.get(_$7, "empty"), _63 = _ms.getDefaultExport(_63_6), Seq = _ms.getDefaultExport(Seq_7), Deque_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Deque_33_8)
		}), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_9)
		}), _$14 = _ms.lazyGetModule(compare_10), _61_63 = _ms.lazyProp(_$14, "=?"), _$15 = _ms.lazyGetModule(_64_11), empty_63 = _ms.lazyProp(_$15, "empty?"), Array_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Array_33_12)
		}), _$17 = _ms.lazyGetModule(Seq_13), seq_61_63 = _ms.lazyProp(_$17, "seq=?");
		const exports = { };
		const Seq_33 = Kind(function() {
			const doc = "Mutable Seq.\nArray!s can efficiently change existing elements and add new ones on the right.\nDeque!s are like Arrays, but can add new values on the left.";
			const implementor_45test = function(type) {
				const _ = function() {
					const _ = type;
					switch (true) {
						case _ms.bool(_ms.unlazy(_61_63)(_, Array)): {
							return empty(_ms.unlazy(Array_33))
						}
						default: {
							return empty(type)
						}
					}
				}();
				_43_43_62_33(_, [ 1, 2 ]);
				_60_43_43_33(_, [ - 2, - 1 ]);
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63), _, [ - 2, - 1, 1, 2 ]);
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _63pop_62_33(_), _63(2));
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _63_60pop_33(_), _63(- 2));
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _63pop_62_33(_), _63(1));
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _63_60pop_33(_), _63(- 1));
				_ms.unlazy(_33)(_ms.unlazy(_61_63), _63pop_62_33(_), empty(_63));
				_ms.unlazy(_33)(_ms.unlazy(empty_63), _);
				return _43_43_62_33(_, [ 1, 2, 3 ])
			};
			return {
				doc: doc,
				"implementor-test": implementor_45test,
				displayName: "Seq!"
			}
		}());
		self_45kind_33(Seq_33, _64_45Type, function() {
			const _k0 = empty, _v0 = function() {
				return empty(_ms.unlazy(Deque_33))
			};
			return _ms.map(_k0, _v0)
		}());
		kind_33(Seq_33, _64_33);
		kind_33(Seq_33, Seq);
		const _60_43_43_33 = exports["<++!"] = Method(function() {
			const doc = function(_, added) {
				_ms.checkContains(_64, added, "added");
				return "Makes `_` into `+ added _`."
			};
			return {
				doc: doc,
				displayName: "<++!"
			}
		}());
		const _43_43_62_33 = exports["++>!"] = Method(function() {
			const doc = function(_, added) {
				_ms.checkContains(_64, added, "added");
				return "Makes `_` into `+ _ added`."
			};
			return {
				doc: doc,
				displayName: "++>!"
			}
		}());
		const _63_60pop_33 = exports["?<pop!"] = Method(function() {
			const doc = function(_) {
				return _ms.checkContains(_63, "Takes one element off the left side, if not empty?.", "res")
			};
			return {
				doc: doc,
				displayName: "?<pop!"
			}
		}());
		const _63pop_62_33 = exports["?pop>!"] = Method(function() {
			const doc = function(_) {
				return _ms.checkContains(_63, "Takes one element off the right side, if not empty?.", "res")
			};
			return {
				doc: doc,
				displayName: "?pop>!"
			}
		}());
		const set_45nth_33 = exports["set-nth!"] = Method(function() {
			const doc = function(_, n, val) {
				_ms.checkContains(Nat, n, "n");
				return "Makes `_[n]` be `val`."
			};
			return {
				doc: doc,
				displayName: "set-nth!"
			}
		}());
		exports.default = Seq_33;
		const displayName = exports.displayName = "Seq!";
		return exports
	})
})
//# sourceMappingURL=../at/Seqbang.js.map