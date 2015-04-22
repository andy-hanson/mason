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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1UvU2xpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0tBR3FCLEtBQUs7QUFLZCxXQUxTLEtBQUssQ0FLYixJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTt5QkFMVixLQUFLOztBQU14QixPQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNoQixPQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtBQUNsQixPQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtHQUNkOztlQVRtQixLQUFLOztVQVdyQixnQkFBRztBQUNOLFdBQU8sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQzVCOzs7VUFFTSxtQkFBRztBQUNULFdBQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFBO0lBQzlCOzs7VUFFRyxnQkFBRztBQUNOLFdBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDNUI7OztVQUVLLGtCQUFHO0FBQ1IsV0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDaEM7OztVQUVHLGdCQUFHO0FBQ04sV0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDOUI7OztVQUVHLGdCQUFHO0FBQ04sV0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMxQzs7O1VBRUksaUJBQUc7QUFDUCxXQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzFDOzs7VUFFZSwwQkFBQyxPQUFPLEVBQUU7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QUFPLEdBQUcsQ0FBQTtJQUNWOzs7VUFFTyxvQkFBRztBQUNWLFdBQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQTtJQUNuRTs7O1VBRUcsY0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQ2hCLFdBQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDdkM7OztVQS9GUyxhQUFDLElBQUksRUFBRTtBQUNoQixXQUFPLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDOzs7U0FIbUIsS0FBSzs7O2tCQUFMLEtBQUsiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVS9TbGljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICcuL0JhZydcbmltcG9ydCB7IE5vbmUsIHNvbWUgfSBmcm9tICcuL09wJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGljZSB7XG5cdHN0YXRpYyBhbGwoZGF0YSkge1xuXHRcdHJldHVybiBuZXcgU2xpY2UoZGF0YSwgMCwgZGF0YS5sZW5ndGgpXG5cdH1cblxuXHRjb25zdHJ1Y3RvcihkYXRhLCBzdGFydCwgZW5kKSB7XG5cdFx0dGhpcy5kYXRhID0gZGF0YVxuXHRcdHRoaXMuc3RhcnQgPSBzdGFydFxuXHRcdHRoaXMuZW5kID0gZW5kXG5cdH1cblxuXHRzaXplKCkge1xuXHRcdHJldHVybiB0aGlzLmVuZCAtIHRoaXMuc3RhcnRcblx0fVxuXG5cdGlzRW1wdHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhcnQgPT09IHRoaXMuZW5kXG5cdH1cblxuXHRoZWFkKCkge1xuXHRcdHJldHVybiB0aGlzLmRhdGFbdGhpcy5zdGFydF1cblx0fVxuXG5cdHNlY29uZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhW3RoaXMuc3RhcnQgKyAxXVxuXHR9XG5cblx0bGFzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhW3RoaXMuZW5kIC0gMV1cblx0fVxuXG5cdHRhaWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX25ldyh0aGlzLnN0YXJ0ICsgMSwgdGhpcy5lbmQpXG5cdH1cblxuXHRydGFpbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fbmV3KHRoaXMuc3RhcnQsIHRoaXMuZW5kIC0gMSlcblx0fVxuXG5cdG9wU3BsaXRPbmNlV2hlcmUoc3BsaXRPbikge1xuXHRcdGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0OyBpIDwgdGhpcy5lbmQ7IGkgPSBpICsgMSlcblx0XHRcdGlmIChzcGxpdE9uKHRoaXMuZGF0YVtpXSkpXG5cdFx0XHRcdHJldHVybiBzb21lKHtcblx0XHRcdFx0XHRiZWZvcmU6IHRoaXMuX25ldyh0aGlzLnN0YXJ0LCBpKSxcblx0XHRcdFx0XHRhdDogdGhpcy5kYXRhW2ldLFxuXHRcdFx0XHRcdGFmdGVyOiB0aGlzLl9uZXcoaSArIDEsIHRoaXMuZW5kKVxuXHRcdFx0XHR9KVxuXHRcdHJldHVybiBOb25lXG5cdH1cblxuXHRvcFNwbGl0TWFueVdoZXJlKHNwbGl0T24pIHtcblx0XHRsZXQgaUxhc3QgPSB0aGlzLnN0YXJ0XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHRmb3IgKGxldCBpID0gdGhpcy5zdGFydDsgaSA8IHRoaXMuZW5kOyBpID0gaSArIDEpXG5cdFx0XHRpZiAoc3BsaXRPbih0aGlzLmRhdGFbaV0pKSB7XG5cdFx0XHRcdG91dC5wdXNoKHsgYmVmb3JlOiB0aGlzLl9uZXcoaUxhc3QsIGkpLCBhdDogdGhpcy5kYXRhW2ldIH0pXG5cdFx0XHRcdGlMYXN0ID0gaSArIDFcblx0XHRcdH1cblxuXHRcdGlmIChpc0VtcHR5KG91dCkpXG5cdFx0XHRyZXR1cm4gTm9uZVxuXHRcdGVsc2Uge1xuXHRcdFx0b3V0LnB1c2goeyBiZWZvcmU6IHRoaXMuX25ldyhpTGFzdCwgdGhpcy5lbmQpIH0pXG5cdFx0XHRyZXR1cm4gc29tZShvdXQpXG5cdFx0fVxuXHR9XG5cblx0ZWFjaChmKSB7XG5cdFx0Zm9yIChsZXQgaSA9IHRoaXMuc3RhcnQ7IGkgPCB0aGlzLmVuZDsgaSA9IGkgKyAxKVxuXHRcdFx0Zih0aGlzLmRhdGFbaV0pXG5cdH1cblxuXHRtYXAoZikge1xuXHRcdGNvbnN0IG91dCA9IFtdXG5cdFx0dGhpcy5lYWNoKF8gPT4gb3V0LnB1c2goZihfKSkpXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cblx0ZmxhdE1hcChmKSB7XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHR0aGlzLmVhY2goXyA9PiBvdXQucHVzaCguLi5mKF8pKSlcblx0XHRyZXR1cm4gb3V0XG5cdH1cblxuXHRyZWR1Y2UocmVkdWNlciwgc3RhcnQpIHtcblx0XHRsZXQgYWNjID0gc3RhcnRcblx0XHR0aGlzLmVhY2goXyA9PiBhY2MgPSByZWR1Y2VyKGFjYywgXykpXG5cdFx0cmV0dXJuIGFjY1xuXHR9XG5cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuICdbJyArIHRoaXMuZGF0YS5zbGljZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZCkudG9TdHJpbmcoKSArICddJ1xuXHR9XG5cblx0X25ldyhzdGFydCwgZW5kKSB7XG5cdFx0cmV0dXJuIG5ldyBTbGljZSh0aGlzLmRhdGEsIHN0YXJ0LCBlbmQpXG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9