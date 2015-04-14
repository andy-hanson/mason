"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../at/q", "../at/Range", "../at/Seqbang", "../Bool", "../control", "../methods", "../Type/Method", "../Type/Obj-Type", "../Type/Type", "./methods", "./Num", "../bang", "../at/q", "../at/at-Type" ], function(exports, _63_0, Range_1, Seq_33_2, Bool_3, control_4, methods_5, Method_6, Obj_45Type_7, Type_8, methods_9, Num_10, _33_11, _63_12, _64_45Type_13) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(_63_0), un_45_63 = _ms.get(_$2, "un-?"), _$3 = _ms.getModule(Range_1), range = _ms.get(_$3, "range"), _$4 = _ms.getModule(Seq_33_2), set_45nth_33 = _ms.get(_$4, "set-nth!"), _$5 = _ms.getModule(Bool_3), and = _ms.get(_$5, "and"), _$6 = _ms.getModule(control_4), _if = _ms.get(_$6, "if"), _$7 = _ms.getModule(methods_5), sub = _ms.get(_$7, "sub"), _$8 = _ms.getModule(Method_6), impl_33 = _ms.get(_$8, "impl!"), Obj_45Type = _ms.getDefaultExport(Obj_45Type_7), _$10 = _ms.getModule(Type_8), contains_63 = _ms.get(_$10, "contains?"), _$11 = _ms.getModule(methods_9), _42 = _ms.get(_$11, "*"), _43 = _ms.get(_$11, "+"), _$12 = _ms.getModule(Num_10), Int = _ms.get(_$12, "Int"), Nat = _ms.get(_$12, "Nat"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_11)
		}), _63 = _ms.lazy(function() {
			return _ms.getDefaultExport(_63_12)
		}), _$16 = _ms.lazyGetModule(_64_45Type_13), empty = _ms.lazyProp(_$16, "empty");
		const exports = { };
		const Matrix = Obj_45Type(function() {
			const props = function() {
				const width = Nat;
				const height = Nat;
				const data = Array;
				return {
					width: width,
					height: height,
					data: data,
					displayName: "props"
				}
			}();
			const defaults = function() {
				const data = function(_) {
					return Array(_42(_.width, _.height))
				};
				return {
					data: data,
					displayName: "defaults"
				}
			}();
			return {
				props: props,
				defaults: defaults,
				displayName: "Matrix"
			}
		}());
		const data_45idx = function(_, ix, iy) {
			return _43(ix, _42(iy, _.width))
		};
		const has_45entry_63 = exports["has-entry?"] = function() {
			const doc = "TODO";
			const test = function() {
				const _ = Matrix({
					height: 3,
					width: 3
				});
				const _k0 = [ _, 0, 1 ], _v0 = true;
				const _k1 = [ _, 2, 3 ], _v1 = false;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, ix, iy) {
				_ms.checkContains(Matrix, _, "_");
				_ms.checkContains(Int, ix, "ix");
				_ms.checkContains(Int, iy, "iy");
				return and(contains_63(range(0, _.width), ix), _ms.lazy(function() {
					return contains_63(range(0, _.height), iy)
				}))
			}, "doc", doc, "test", test, "displayName", "has-entry?")
		}();
		const _63get_45mat = exports["?get-mat"] = function() {
			const doc = "TODO";
			const test = function() {
				const _ = Matrix({
					height: 3,
					width: 3
				});
				set_45mat_33(_, 0, 1, "a");
				const _k0 = [ _, 0, 1 ], _v0 = _ms.unlazy(_63)("a");
				const _k1 = [ _, 2, 3 ], _v1 = _ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, ix, iy) {
				_ms.checkContains(Matrix, _, "_");
				_ms.checkContains(Int, ix, "ix");
				_ms.checkContains(Int, iy, "iy");
				return _if(has_45entry_63(_, ix, iy), _ms.lazy(function() {
					return _ms.sub(_.data, data_45idx(_, ix, iy))
				}))
			}, "doc", doc, "test", test, "displayName", "?get-mat")
		}();
		impl_33(sub, Matrix, function() {
			const doc = "TODO";
			const test = "See ?get-mat";
			return _ms.set(function(_, ix, iy) {
				_ms.checkContains(Matrix, _, "_");
				_ms.checkContains(Nat, ix, "ix");
				_ms.checkContains(Nat, iy, "iy");
				return un_45_63(_63get_45mat(_, ix, iy), function() {
					return "Could not get data at " + _ms.show(ix) + ", " + _ms.show(iy) + " from " + _ms.show(_.width) + " * " + _ms.show(_.height) + " Matrix."
				}())
			}, "doc", doc, "test", test)
		}());
		const set_45mat_33 = exports["set-mat!"] = function() {
			const doc = "TODO";
			const test = "See ?get-mat";
			return _ms.set(function(_, ix, iy, val) {
				_ms.checkContains(Matrix, _, "_");
				_ms.checkContains(Nat, ix, "ix");
				_ms.checkContains(Nat, iy, "iy");
				_ms.unlazy(_33)(has_45entry_63, _, ix, iy);
				return set_45nth_33(_.data, data_45idx(_, ix, iy), val)
			}, "doc", doc, "test", test, "displayName", "set-mat!")
		}();
		exports.default = Matrix;
		const displayName = exports.displayName = "Matrix";
		return exports
	})
})
//# sourceMappingURL=../math/Matrix.js.map