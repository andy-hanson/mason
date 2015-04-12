if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "./Bag", "./Op", "./type", "./util"], function (exports, module, _Bag, _Op, _type, _util) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var isEmpty = _Bag.isEmpty;
	var None = _Op.None;
	var some = _Op.some;

	var type = _interopRequire(_type);

	var assert = _util.assert;

	let Slice = (function () {
		function Slice(data, start, end) {
			_classCallCheck(this, Slice);

			this.data = data;
			if (start === undefined) {
				assert(end === undefined);
				this.start = 0;
				this.end = data.length;
			} else {
				this.start = start;
				this.end = end;
				assert(0 <= start && start <= end && end <= data.length);
			}
		}

		_createClass(Slice, {
			size: {
				value: function size() {
					return this.end - this.start;
				}
			},
			isEmpty: {
				value: function isEmpty() {
					assert(this.start <= this.end);
					return this.start === this.end;
				}
			},
			head: {
				value: function head() {
					assert(!this.isEmpty());
					return this.data[this.start];
				}
			},
			second: {
				value: function second() {
					assert(this.size() >= 2);
					return this.data[this.start + 1];
				}
			},
			last: {
				value: function last() {
					assert(!this.isEmpty());
					return this.data[this.end - 1];
				}
			},
			tail: {
				value: function tail() {
					assert(!this.isEmpty());
					return this._new(this.start + 1, this.end);
				}
			},
			rtail: {
				value: function rtail() {
					assert(!this.isEmpty());
					return this._new(this.start, this.end - 1);
				}
			},
			opSplitOnceWhere: {
				value: function opSplitOnceWhere(splitOn) {
					for (let i = this.start; i < this.end; i = i + 1) if (splitOn(this.data[i])) return some({
						before: this._new(this.start, i),
						at: this.data[i],
						after: this._new(i + 1, this.end)
					});
					return None;
				}
			},
			opSplitManyWhere: {
				value: function opSplitManyWhere(splitOn) {
					let iLast = this.start;
					const out = [];
					for (let i = this.start; i < this.end; i = i + 1) if (splitOn(this.data[i])) {
						out.push({ before: this._new(iLast, i), at: this.data[i] });
						iLast = i + 1;
					}

					if (isEmpty(out)) return None;else {
						out.push({ before: this._new(iLast, this.end) });
						return some(out);
					}
				}
			},
			_new: {
				value: function _new(start, end) {
					return new Slice(this.data, start, end);
				}
			},
			each: {
				value: function each(f) {
					for (let i = this.start; i < this.end; i = i + 1) f(this.data[i]);
				}
			},
			map: {
				value: function map(f) {
					const out = [];
					this.each(function (_) {
						return out.push(f(_));
					});
					return out;
				}
			},
			flatMap: {
				value: function flatMap(f) {
					const out = [];
					this.each(function (_) {
						return out.push.apply(out, _toConsumableArray(f(_)));
					});
					return out;
				}
			},
			reduce: {
				value: function reduce(reducer, start) {
					let acc = start;
					this.each(function (_) {
						return acc = reducer(acc, _);
					});
					return acc;
				}
			},
			toString: {
				value: function toString() {
					return "[" + this.data.slice(this.start, this.end).toString() + "]";
				}
			}
		});

		return Slice;
	})();

	module.exports = Slice;
});
//# sourceMappingURL=../../../../meta/compile/private/U/Slice.js.map