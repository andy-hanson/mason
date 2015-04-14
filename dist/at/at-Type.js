"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../control", "../Fun", "../methods", "../Type/Kind", "../Type/Method", "../Type/Type", "./at", "./atbang", "./Range" ], function(exports, control_0, Fun_1, methods_2, Kind_3, Method_4, Type_5, _64_6, _64_33_7, Range_8) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(control_0), returning = _ms.get(_$2, "returning"), _$3 = _ms.getModule(Fun_1), identity = _ms.get(_$3, "identity"), _$4 = _ms.getModule(methods_2), sub = _ms.get(_$4, "sub"), Kind = _ms.getDefaultExport(Kind_3), _$5 = _ms.getModule(Kind_3), self_45kind_33 = _ms.get(_$5, "self-kind!"), Method = _ms.getDefaultExport(Method_4), _$6 = _ms.getModule(Method_4), impl_33 = _ms.get(_$6, "impl!"), self_45impl_33 = _ms.get(_$6, "self-impl!"), _$7 = _ms.getModule(Type_5), _61_62 = _ms.get(_$7, "=>"), _64 = _ms.getDefaultExport(_64_6), _$10 = _ms.lazyGetModule(_64_33_7), _43_43_33 = _ms.lazyProp(_$10, "++!"), _$12 = _ms.lazyGetModule(Range_8), range = _ms.lazyProp(_$12, "range");
		const exports = { };
		const _64_45Type = Kind(function() {
			const doc = "Any sub-type of @.";
			return {
				doc: doc,
				displayName: "@-Type"
			}
		}());
		impl_33(sub, _64_45Type, identity);
		const empty = exports.empty = Method(function() {
			const doc = "Given a type, makes an instance which is `empty?`.\nShould always return the same thing iff immutable.";
			return {
				doc: doc,
				displayName: "empty"
			}
		}());
		const from_45stream = exports["from-stream"] = Method(function() {
			const doc = function(_, stream) {
				_ms.checkContains(_64, stream, "stream");
				return "Creates a new value of this type by reading out from an @'s iterator."
			};
			const test = function() {
				const _k0 = [ Array, _ms.unlazy(range)(0, 5) ], _v0 = [ 0, 1, 2, 3, 4 ];
				return _ms.map(_k0, _v0)
			};
			const _default = function(type, stream) {
				return returning(empty(type), function(_) {
					return _ms.unlazy(_43_43_33)(_, stream)
				})
			};
			return {
				doc: doc,
				test: test,
				default: _default,
				displayName: "from-stream"
			}
		}());
		self_45kind_33(_64, _64_45Type);
		self_45impl_33(empty, _64, function() {
			return empty(Array)
		});
		impl_33(_61_62, _64_45Type, from_45stream);
		exports.default = _64_45Type;
		const displayName = exports.displayName = "@-Type";
		return exports
	})
})
//# sourceMappingURL=../at/at-Type.js.map