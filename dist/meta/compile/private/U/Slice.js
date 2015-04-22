if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './Bag', './Op'], function (exports, module, _Bag, _Op) {
	'use strict';

	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	let Slice = (function () {
		function Slice(data, start, end) {
			_classCallCheck(this, Slice);

			this.data = data;
			this.start = start;
			this.end = end;
		}

		_createClass(Slice, [{
			key: 'size',
			value: function size() {
				return this.end - this.start;
			}
		}, {
			key: 'isEmpty',
			value: function isEmpty() {
				return this.start === this.end;
			}
		}, {
			key: 'head',
			value: function head() {
				return this.data[this.start];
			}
		}, {
			key: 'second',
			value: function second() {
				return this.data[this.start + 1];
			}
		}, {
			key: 'last',
			value: function last() {
				return this.data[this.end - 1];
			}
		}, {
			key: 'tail',
			value: function tail() {
				return this._new(this.start + 1, this.end);
			}
		}, {
			key: 'rtail',
			value: function rtail() {
				return this._new(this.start, this.end - 1);
			}
		}, {
			key: 'opSplitOnceWhere',
			value: function opSplitOnceWhere(splitOn) {
				for (let i = this.start; i < this.end; i = i + 1) if (splitOn(this.data[i])) return _Op.some({
					before: this._new(this.start, i),
					at: this.data[i],
					after: this._new(i + 1, this.end)
				});
				return _Op.None;
			}
		}, {
			key: 'opSplitManyWhere',
			value: function opSplitManyWhere(splitOn) {
				let iLast = this.start;
				const out = [];
				for (let i = this.start; i < this.end; i = i + 1) if (splitOn(this.data[i])) {
					out.push({ before: this._new(iLast, i), at: this.data[i] });
					iLast = i + 1;
				}

				if (_Bag.isEmpty(out)) return _Op.None;else {
					out.push({ before: this._new(iLast, this.end) });
					return _Op.some(out);
				}
			}
		}, {
			key: 'each',
			value: function each(f) {
				for (let i = this.start; i < this.end; i = i + 1) f(this.data[i]);
			}
		}, {
			key: 'map',
			value: function map(f) {
				const out = [];
				this.each(function (_) {
					return out.push(f(_));
				});
				return out;
			}
		}, {
			key: 'flatMap',
			value: function flatMap(f) {
				const out = [];
				this.each(function (_) {
					return out.push.apply(out, _toConsumableArray(f(_)));
				});
				return out;
			}
		}, {
			key: 'reduce',
			value: function reduce(reducer, start) {
				let acc = start;
				this.each(function (_) {
					return acc = reducer(acc, _);
				});
				return acc;
			}
		}, {
			key: 'toString',
			value: function toString() {
				return '[' + this.data.slice(this.start, this.end).toString() + ']';
			}
		}, {
			key: '_new',
			value: function _new(start, end) {
				return new Slice(this.data, start, end);
			}
		}], [{
			key: 'all',
			value: function all(data) {
				return new Slice(data, 0, data.length);
			}
		}]);

		return Slice;
	})();

	module.exports = Slice;
});
//# sourceMappingURL=../../../../meta/compile/private/U/Slice.js.map