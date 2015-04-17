"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../compare", "../control", "../Fun", "../js", "../private/js-impl", "../methods", "../Type/Kind", "../Type/Method", "./at", "./at-Type", "./Seq", "../math/Num", "./Arraybang" ], function(exports, compare_0, control_1, Fun_2, js_3, js_45impl_4, methods_5, Kind_6, Method_7, _64_8, _64_45Type_9, Seq_10, Num_11, Array_33_12) {
	exports._get = _ms.lazy(function() {
		const _$4 = _ms.getModule(compare_0), _60_63 = _ms.get(_$4, "<?"), _$5 = _ms.getModule(control_1), _if = _ms.get(_$5, "if"), _$6 = _ms.getModule(Fun_2), thunk = _ms.get(_$6, "thunk"), _$7 = _ms.getModule(js_3), js_45sub = _ms.get(_$7, "js-sub"), _$8 = _ms.getModule(js_45impl_4), arrayIterator = _ms.get(_$8, "arrayIterator"), _$9 = _ms.getModule(methods_5), freeze = _ms.get(_$9, "freeze"), _$10 = _ms.getModule(Kind_6), kind_33 = _ms.get(_$10, "kind!"), self_45kind_33 = _ms.get(_$10, "self-kind!"), _$11 = _ms.getModule(Method_7), impl_33 = _ms.get(_$11, "impl!"), self_45impl_33 = _ms.get(_$11, "self-impl!"), _$12 = _ms.getModule(_64_8), count = _ms.get(_$12, "count"), iterator = _ms.get(_$12, "iterator"), _64_45Type = _ms.getDefaultExport(_64_45Type_9), _$13 = _ms.getModule(_64_45Type_9), empty = _ms.get(_$13, "empty"), from_45stream = _ms.get(_$13, "from-stream"), Seq = _ms.getDefaultExport(Seq_10), _$14 = _ms.getModule(Seq_10), _63nth = _ms.get(_$14, "?nth"), _$16 = _ms.lazyGetModule(Num_11), Nat = _ms.lazyProp(_$16, "Nat"), Array_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Array_33_12)
		});
		const exports = { };
		const doc = exports.doc = "Javascript's native mutable Array type. TODO: `Array` vs `Array!`";
		kind_33(Array, Seq);
		impl_33(count, Array, function(_) {
			return _.length
		});
		impl_33(iterator, Array, arrayIterator);
		self_45kind_33(Array, _64_45Type);
		self_45impl_33(empty, Array, thunk([ ]));
		self_45impl_33(from_45stream, Array, function(stream) {
			return freeze(from_45stream(_ms.unlazy(Array_33), stream))
		});
		impl_33(_63nth, Array, function(_, n) {
			_ms.checkContains(_ms.unlazy(Nat), n, "n");
			return _if(_60_63(n, count(_)), _ms.lazy(function() {
				return js_45sub(_, n)
			}))
		});
		exports.default = Array;
		const displayName = exports.displayName = "Array-as-Seq";
		return exports
	})
})
//# sourceMappingURL=../at/Array-as-Seq.js.map