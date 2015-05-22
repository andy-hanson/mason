if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../util'], function (exports, module, _esastDistLoc, _util) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Loc = _interopRequireDefault(_esastDistLoc);

	/*
 Represents a section of tokens that the parser is currently working on.
 Since we don't modify the Token tree, this is just a view on it.
 So, taking the tail is O(1).
 */

	let Slice = (function () {

		// Do not use `new`. Use Slice.group.

		function Slice(tokens, start, end, loc) {
			_classCallCheck(this, Slice);

			this.tokens = tokens;
			this.start = start;
			// end is exclusive.
			this.end = end;
			this.loc = loc;
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

			// For these methods, caller must ensure non-empty.
			value: function head() {
				return this.tokens[this.start];
			}
		}, {
			key: 'second',
			value: function second() {
				return this.tokens[this.start + 1];
			}
		}, {
			key: 'last',
			value: function last() {
				return this.tokens[this.end - 1];
			}
		}, {
			key: 'tail',
			value: function tail() {
				return this._chopStart(this.start + 1);
			}
		}, {
			key: 'rtail',
			value: function rtail() {
				return this._chopEnd(this.end - 1);
			}
		}, {
			key: 'opSplitOnceWhere',

			// Looks for the first token to satisfy `splitOn` and does not look further.
			value: function opSplitOnceWhere(splitOn) {
				for (let i = this.start; i < this.end; i = i + 1) if (splitOn(this.tokens[i])) return {
					before: this._chopEnd(i),
					at: this.tokens[i],
					after: this._chopStart(i + 1)
				};
				return null;
			}
		}, {
			key: 'opSplitManyWhere',

			// Splits every time  `splitOn` is true.
			// Every output but last will be { before, at }; last will be just { before }.
			value: function opSplitManyWhere(splitOn) {
				var _this = this;

				let iLast = this.start;
				const out = [];
				for (let i = this.start; i < this.end; i = i + 1) if (splitOn(this.tokens[i])) {
					out.push({ before: this._chop(iLast, i), at: this.tokens[i] });
					iLast = i + 1;
				}
				return (0, _util.opIf)(!(0, _util.isEmpty)(out), function () {
					return (0, _util.push)(out, { before: _this._chopStart(iLast) });
				});
			}
		}, {
			key: 'each',
			value: function each(f) {
				for (let i = this.start; i < this.end; i = i + 1) f(this.tokens[i]);
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
			key: 'reduce',
			value: function reduce(reducer, start) {
				let acc = start;
				this.each(function (_) {
					return acc = reducer(acc, _);
				});
				return acc;
			}
		}, {
			key: '_chop',
			value: function _chop(newStart, newEnd) {
				const loc = (0, _Loc.default)(this.tokens[newStart].loc.start, this.tokens[newEnd - 1].loc.end);
				return new Slice(this.tokens, newStart, newEnd, loc);
			}
		}, {
			key: '_chopStart',
			value: function _chopStart(newStart) {
				const loc = newStart === this.end ? this.loc : (0, _Loc.default)(this.tokens[newStart].loc.start, this.loc.end);
				return new Slice(this.tokens, newStart, this.end, loc);
			}
		}, {
			key: '_chopEnd',
			value: function _chopEnd(newEnd) {
				const loc = newEnd === this.start ? this.loc : (0, _Loc.default)(this.loc.start, this.tokens[newEnd - 1].loc.end);
				return new Slice(this.tokens, this.start, newEnd, loc);
			}
		}], [{
			key: 'group',
			value: function group(groupToken) {
				const subTokens = groupToken.subTokens;
				const loc = groupToken.loc;

				return new Slice(subTokens, 0, subTokens.length, loc);
			}
		}]);

		return Slice;
	})();

	module.exports = Slice;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL1NsaWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBUXFCLEtBQUs7Ozs7QUFPZCxXQVBTLEtBQUssQ0FPYixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7eUJBUGpCLEtBQUs7O0FBUXhCLE9BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0FBQ3BCLE9BQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBOztBQUVsQixPQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUNkLE9BQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0dBQ2Q7O2VBYm1CLEtBQUs7O1VBZXJCLGdCQUFHO0FBQ04sV0FBTyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDNUI7OztVQUVNLG1CQUFHO0FBQ1QsV0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUE7SUFDOUI7Ozs7O1VBR0csZ0JBQUc7QUFDTixXQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzlCOzs7VUFFSyxrQkFBRztBQUNSLFdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2xDOzs7VUFFRyxnQkFBRztBQUNOLFdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2hDOzs7VUFFRyxnQkFBRztBQUNOLFdBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3RDOzs7VUFFSSxpQkFBRztBQUNQLFdBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2xD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QUNwRDs7O1VBQ1Msb0JBQUMsUUFBUSxFQUFFO0FBQ3BCLFVBQU0sR0FBRyxHQUFHLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUNoQyxJQUFJLENBQUMsR0FBRyxHQUNSLGtCQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ25ELFdBQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN0RDs7O1VBQ08sa0JBQUMsTUFBTSxFQUFFO0FBQ2hCLFVBQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsS0FBSyxHQUNoQyxJQUFJLENBQUMsR0FBRyxHQUNSLGtCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNyRCxXQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDdEQ7OztVQXBHVyxlQUFDLFVBQVUsRUFBRTtVQUNoQixTQUFTLEdBQVUsVUFBVSxDQUE3QixTQUFTO1VBQUUsR0FBRyxHQUFLLFVBQVUsQ0FBbEIsR0FBRzs7QUFDdEIsV0FBTyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDckQ7OztTQUptQixLQUFLOzs7a0JBQUwsS0FBSyIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9wYXJzZS9TbGljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgeyBpc0VtcHR5LCBvcElmLCBwdXNoIH0gZnJvbSAnLi4vdXRpbCdcblxuLypcblJlcHJlc2VudHMgYSBzZWN0aW9uIG9mIHRva2VucyB0aGF0IHRoZSBwYXJzZXIgaXMgY3VycmVudGx5IHdvcmtpbmcgb24uXG5TaW5jZSB3ZSBkb24ndCBtb2RpZnkgdGhlIFRva2VuIHRyZWUsIHRoaXMgaXMganVzdCBhIHZpZXcgb24gaXQuXG5TbywgdGFraW5nIHRoZSB0YWlsIGlzIE8oMSkuXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpY2Uge1xuXHRzdGF0aWMgZ3JvdXAoZ3JvdXBUb2tlbikge1xuXHRcdGNvbnN0IHsgc3ViVG9rZW5zLCBsb2MgfSA9IGdyb3VwVG9rZW5cblx0XHRyZXR1cm4gbmV3IFNsaWNlKHN1YlRva2VucywgMCwgc3ViVG9rZW5zLmxlbmd0aCwgbG9jKVxuXHR9XG5cblx0Ly8gRG8gbm90IHVzZSBgbmV3YC4gVXNlIFNsaWNlLmdyb3VwLlxuXHRjb25zdHJ1Y3Rvcih0b2tlbnMsIHN0YXJ0LCBlbmQsIGxvYykge1xuXHRcdHRoaXMudG9rZW5zID0gdG9rZW5zXG5cdFx0dGhpcy5zdGFydCA9IHN0YXJ0XG5cdFx0Ly8gZW5kIGlzIGV4Y2x1c2l2ZS5cblx0XHR0aGlzLmVuZCA9IGVuZFxuXHRcdHRoaXMubG9jID0gbG9jXG5cdH1cblxuXHRzaXplKCkge1xuXHRcdHJldHVybiB0aGlzLmVuZCAtIHRoaXMuc3RhcnRcblx0fVxuXG5cdGlzRW1wdHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhcnQgPT09IHRoaXMuZW5kXG5cdH1cblxuXHQvLyBGb3IgdGhlc2UgbWV0aG9kcywgY2FsbGVyIG11c3QgZW5zdXJlIG5vbi1lbXB0eS5cblx0aGVhZCgpIHtcblx0XHRyZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5zdGFydF1cblx0fVxuXG5cdHNlY29uZCgpIHtcblx0XHRyZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5zdGFydCArIDFdXG5cdH1cblxuXHRsYXN0KCkge1xuXHRcdHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmVuZCAtIDFdXG5cdH1cblxuXHR0YWlsKCkge1xuXHRcdHJldHVybiB0aGlzLl9jaG9wU3RhcnQodGhpcy5zdGFydCArIDEpXG5cdH1cblxuXHRydGFpbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fY2hvcEVuZCh0aGlzLmVuZCAtIDEpXG5cdH1cblxuXHQvLyBMb29rcyBmb3IgdGhlIGZpcnN0IHRva2VuIHRvIHNhdGlzZnkgYHNwbGl0T25gIGFuZCBkb2VzIG5vdCBsb29rIGZ1cnRoZXIuXG5cdG9wU3BsaXRPbmNlV2hlcmUoc3BsaXRPbikge1xuXHRcdGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0OyBpIDwgdGhpcy5lbmQ7IGkgPSBpICsgMSlcblx0XHRcdGlmIChzcGxpdE9uKHRoaXMudG9rZW5zW2ldKSlcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRiZWZvcmU6IHRoaXMuX2Nob3BFbmQoaSksXG5cdFx0XHRcdFx0YXQ6IHRoaXMudG9rZW5zW2ldLFxuXHRcdFx0XHRcdGFmdGVyOiB0aGlzLl9jaG9wU3RhcnQoaSArIDEpXG5cdFx0XHRcdH1cblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cblx0Ly8gU3BsaXRzIGV2ZXJ5IHRpbWUgIGBzcGxpdE9uYCBpcyB0cnVlLlxuXHQvLyBFdmVyeSBvdXRwdXQgYnV0IGxhc3Qgd2lsbCBiZSB7IGJlZm9yZSwgYXQgfTsgbGFzdCB3aWxsIGJlIGp1c3QgeyBiZWZvcmUgfS5cblx0b3BTcGxpdE1hbnlXaGVyZShzcGxpdE9uKSB7XG5cdFx0bGV0IGlMYXN0ID0gdGhpcy5zdGFydFxuXHRcdGNvbnN0IG91dCA9IFsgXVxuXHRcdGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0OyBpIDwgdGhpcy5lbmQ7IGkgPSBpICsgMSlcblx0XHRcdGlmIChzcGxpdE9uKHRoaXMudG9rZW5zW2ldKSkge1xuXHRcdFx0XHRvdXQucHVzaCh7IGJlZm9yZTogdGhpcy5fY2hvcChpTGFzdCwgaSksIGF0OiB0aGlzLnRva2Vuc1tpXSB9KVxuXHRcdFx0XHRpTGFzdCA9IGkgKyAxXG5cdFx0XHR9XG5cdFx0cmV0dXJuIG9wSWYoIWlzRW1wdHkob3V0KSwgKCkgPT4gcHVzaChvdXQsIHsgYmVmb3JlOiB0aGlzLl9jaG9wU3RhcnQoaUxhc3QpIH0pKVxuXHR9XG5cblx0ZWFjaChmKSB7XG5cdFx0Zm9yIChsZXQgaSA9IHRoaXMuc3RhcnQ7IGkgPCB0aGlzLmVuZDsgaSA9IGkgKyAxKVxuXHRcdFx0Zih0aGlzLnRva2Vuc1tpXSlcblx0fVxuXG5cdG1hcChmKSB7XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHR0aGlzLmVhY2goXyA9PiBvdXQucHVzaChmKF8pKSlcblx0XHRyZXR1cm4gb3V0XG5cdH1cblxuXHRyZWR1Y2UocmVkdWNlciwgc3RhcnQpIHtcblx0XHRsZXQgYWNjID0gc3RhcnRcblx0XHR0aGlzLmVhY2goXyA9PiBhY2MgPSByZWR1Y2VyKGFjYywgXykpXG5cdFx0cmV0dXJuIGFjY1xuXHR9XG5cblx0X2Nob3AobmV3U3RhcnQsIG5ld0VuZCkge1xuXHRcdGNvbnN0IGxvYyA9IExvYyh0aGlzLnRva2Vuc1tuZXdTdGFydF0ubG9jLnN0YXJ0LCB0aGlzLnRva2Vuc1tuZXdFbmQgLSAxXS5sb2MuZW5kKVxuXHRcdHJldHVybiBuZXcgU2xpY2UodGhpcy50b2tlbnMsIG5ld1N0YXJ0LCBuZXdFbmQsIGxvYylcblx0fVxuXHRfY2hvcFN0YXJ0KG5ld1N0YXJ0KSB7XG5cdFx0Y29uc3QgbG9jID0gbmV3U3RhcnQgPT09IHRoaXMuZW5kID9cblx0XHRcdHRoaXMubG9jIDpcblx0XHRcdExvYyh0aGlzLnRva2Vuc1tuZXdTdGFydF0ubG9jLnN0YXJ0LCB0aGlzLmxvYy5lbmQpXG5cdFx0cmV0dXJuIG5ldyBTbGljZSh0aGlzLnRva2VucywgbmV3U3RhcnQsIHRoaXMuZW5kLCBsb2MpXG5cdH1cblx0X2Nob3BFbmQobmV3RW5kKSB7XG5cdFx0Y29uc3QgbG9jID0gbmV3RW5kID09PSB0aGlzLnN0YXJ0ID9cblx0XHRcdHRoaXMubG9jIDpcblx0XHRcdExvYyh0aGlzLmxvYy5zdGFydCwgdGhpcy50b2tlbnNbbmV3RW5kIC0gMV0ubG9jLmVuZClcblx0XHRyZXR1cm4gbmV3IFNsaWNlKHRoaXMudG9rZW5zLCB0aGlzLnN0YXJ0LCBuZXdFbmQsIGxvYylcblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=