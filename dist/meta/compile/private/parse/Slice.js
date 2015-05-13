if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../U/Bag'], function (exports, module, _esastDistLoc, _UBag) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Loc = _interopRequire(_esastDistLoc);

	let Slice = (function () {
		function Slice(data, start, end, loc) {
			_classCallCheck(this, Slice);

			this.data = data;
			this.start = start;
			// end is exclusive
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
				return this._chopStart(this.start + 1);
			}
		}, {
			key: 'rtail',
			value: function rtail() {
				return this._chopEnd(this.end - 1);
			}
		}, {
			key: 'opSplitOnceWhere',
			value: function opSplitOnceWhere(splitOn) {
				for (let i = this.start; i < this.end; i = i + 1) if (splitOn(this.data[i])) return {
					before: this._chopEnd(i),
					at: this.data[i],
					after: this._chopStart(i + 1)
				};
				return null;
			}
		}, {
			key: 'opSplitManyWhere',
			value: function opSplitManyWhere(splitOn) {
				let iLast = this.start;
				const out = [];
				for (let i = this.start; i < this.end; i = i + 1) if (splitOn(this.data[i])) {
					out.push({ before: this._chop(iLast, i), at: this.data[i] });
					iLast = i + 1;
				}

				if (_UBag.isEmpty(out)) return null;else {
					out.push({ before: this._chopStart(iLast) });
					return out;
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
			key: 'reduce',
			value: function reduce(reducer, start) {
				let acc = start;
				for (let i = this.start; i < this.end; i = i + 1) acc = reducer(acc, this.data[i]);
				return acc;
			}
		}, {
			key: '_chop',
			value: function _chop(newStart, newEnd) {
				const loc = _Loc(this.data[newStart].loc.start, this.data[newEnd - 1].loc.end);
				return new Slice(this.data, newStart, newEnd, loc);
			}
		}, {
			key: '_chopStart',
			value: function _chopStart(newStart) {
				return new Slice(this.data, newStart, this.end, newStart === this.end ? this.loc : _Loc(this.data[newStart].loc.start, this.loc.end));
			}
		}, {
			key: '_chopEnd',
			value: function _chopEnd(newEnd) {
				return new Slice(this.data, this.start, newEnd, newEnd === this.start ? this.loc : _Loc(this.loc.start, this.data[newEnd - 1].loc.end));
			}
		}], [{
			key: 'group',
			value: function group(g) {
				return new Slice(g.tokens, 0, g.tokens.length, g.loc);
			}
		}]);

		return Slice;
	})();

	module.exports = Slice;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL1NsaWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0tBR3FCLEtBQUs7QUFLZCxXQUxTLEtBQUssQ0FLYixJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7eUJBTGYsS0FBSzs7QUFNeEIsT0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7QUFDaEIsT0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7O0FBRWxCLE9BQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0FBQ2QsT0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7R0FDZDs7ZUFYbUIsS0FBSzs7VUFhckIsZ0JBQUc7QUFDTixXQUFPLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUM1Qjs7O1VBRU0sbUJBQUc7QUFDVCxXQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUM5Qjs7O1VBRUcsZ0JBQUc7QUFDTixXQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzVCOzs7VUFFSyxrQkFBRztBQUNSLFdBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2hDOzs7VUFFRyxnQkFBRztBQUNOLFdBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzlCOzs7VUFFRyxnQkFBRztBQUNOLFdBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3RDOzs7VUFFSSxpQkFBRztBQUNQLFdBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2xDOzs7VUFFZSwwQkFB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TyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDbEQ7OztVQUNTLG9CQUFDLFFBQVEsRUFBRTtBQUNwQixXQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQzdDLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3JGOzs7VUFDTyxrQkFBQyxNQUFNLEVBQUU7QUFDaEIsV0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUM3QyxBQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsS0FBSyxHQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUN6Rjs7O1VBakdXLGVBQUMsQ0FBQyxFQUFFO0FBQ2YsV0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDckQ7OztTQUhtQixLQUFLOzs7a0JBQUwsS0FBSyIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9wYXJzZS9TbGljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnLi4vVS9CYWcnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWNlIHtcblx0c3RhdGljIGdyb3VwKGcpIHtcblx0XHRyZXR1cm4gbmV3IFNsaWNlKGcudG9rZW5zLCAwLCBnLnRva2Vucy5sZW5ndGgsIGcubG9jKVxuXHR9XG5cblx0Y29uc3RydWN0b3IoZGF0YSwgc3RhcnQsIGVuZCwgbG9jKSB7XG5cdFx0dGhpcy5kYXRhID0gZGF0YVxuXHRcdHRoaXMuc3RhcnQgPSBzdGFydFxuXHRcdC8vIGVuZCBpcyBleGNsdXNpdmVcblx0XHR0aGlzLmVuZCA9IGVuZFxuXHRcdHRoaXMubG9jID0gbG9jXG5cdH1cblxuXHRzaXplKCkge1xuXHRcdHJldHVybiB0aGlzLmVuZCAtIHRoaXMuc3RhcnRcblx0fVxuXG5cdGlzRW1wdHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhcnQgPT09IHRoaXMuZW5kXG5cdH1cblxuXHRoZWFkKCkge1xuXHRcdHJldHVybiB0aGlzLmRhdGFbdGhpcy5zdGFydF1cblx0fVxuXG5cdHNlY29uZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhW3RoaXMuc3RhcnQgKyAxXVxuXHR9XG5cblx0bGFzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhW3RoaXMuZW5kIC0gMV1cblx0fVxuXG5cdHRhaWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2Nob3BTdGFydCh0aGlzLnN0YXJ0ICsgMSlcblx0fVxuXG5cdHJ0YWlsKCkge1xuXHRcdHJldHVybiB0aGlzLl9jaG9wRW5kKHRoaXMuZW5kIC0gMSlcblx0fVxuXG5cdG9wU3BsaXRPbmNlV2hlcmUoc3BsaXRPbikge1xuXHRcdGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0OyBpIDwgdGhpcy5lbmQ7IGkgPSBpICsgMSlcblx0XHRcdGlmIChzcGxpdE9uKHRoaXMuZGF0YVtpXSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YmVmb3JlOiB0aGlzLl9jaG9wRW5kKGkpLFxuXHRcdFx0XHRcdGF0OiB0aGlzLmRhdGFbaV0sXG5cdFx0XHRcdFx0YWZ0ZXI6IHRoaXMuX2Nob3BTdGFydChpICsgMSlcblx0XHRcdFx0fVxuXHRcdHJldHVybiBudWxsXG5cdH1cblxuXHRvcFNwbGl0TWFueVdoZXJlKHNwbGl0T24pIHtcblx0XHRsZXQgaUxhc3QgPSB0aGlzLnN0YXJ0XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHRmb3IgKGxldCBpID0gdGhpcy5zdGFydDsgaSA8IHRoaXMuZW5kOyBpID0gaSArIDEpXG5cdFx0XHRpZiAoc3BsaXRPbih0aGlzLmRhdGFbaV0pKSB7XG5cdFx0XHRcdG91dC5wdXNoKHsgYmVmb3JlOiB0aGlzLl9jaG9wKGlMYXN0LCBpKSwgYXQ6IHRoaXMuZGF0YVtpXSB9KVxuXHRcdFx0XHRpTGFzdCA9IGkgKyAxXG5cdFx0XHR9XG5cblx0XHRpZiAoaXNFbXB0eShvdXQpKVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHRlbHNlIHtcblx0XHRcdG91dC5wdXNoKHsgYmVmb3JlOiB0aGlzLl9jaG9wU3RhcnQoaUxhc3QpIH0pXG5cdFx0XHRyZXR1cm4gb3V0XG5cdFx0fVxuXHR9XG5cblx0ZWFjaChmKSB7XG5cdFx0Zm9yIChsZXQgaSA9IHRoaXMuc3RhcnQ7IGkgPCB0aGlzLmVuZDsgaSA9IGkgKyAxKVxuXHRcdFx0Zih0aGlzLmRhdGFbaV0pXG5cdH1cblxuXHRtYXAoZikge1xuXHRcdGNvbnN0IG91dCA9IFtdXG5cdFx0dGhpcy5lYWNoKF8gPT4gb3V0LnB1c2goZihfKSkpXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cblx0cmVkdWNlKHJlZHVjZXIsIHN0YXJ0KSB7XG5cdFx0bGV0IGFjYyA9IHN0YXJ0XG5cdFx0Zm9yIChsZXQgaSA9IHRoaXMuc3RhcnQ7IGkgPCB0aGlzLmVuZDsgaSA9IGkgKyAxKVxuXHRcdFx0YWNjID0gcmVkdWNlcihhY2MsIHRoaXMuZGF0YVtpXSlcblx0XHRyZXR1cm4gYWNjXG5cdH1cblxuXHRfY2hvcChuZXdTdGFydCwgbmV3RW5kKSB7XG5cdFx0Y29uc3QgbG9jID0gTG9jKHRoaXMuZGF0YVtuZXdTdGFydF0ubG9jLnN0YXJ0LCB0aGlzLmRhdGFbbmV3RW5kIC0gMV0ubG9jLmVuZClcblx0XHRyZXR1cm4gbmV3IFNsaWNlKHRoaXMuZGF0YSwgbmV3U3RhcnQsIG5ld0VuZCwgbG9jKVxuXHR9XG5cdF9jaG9wU3RhcnQobmV3U3RhcnQpIHtcblx0XHRyZXR1cm4gbmV3IFNsaWNlKHRoaXMuZGF0YSwgbmV3U3RhcnQsIHRoaXMuZW5kLFxuXHRcdFx0bmV3U3RhcnQgPT09IHRoaXMuZW5kID8gdGhpcy5sb2MgOiBMb2ModGhpcy5kYXRhW25ld1N0YXJ0XS5sb2Muc3RhcnQsIHRoaXMubG9jLmVuZCkpXG5cdH1cblx0X2Nob3BFbmQobmV3RW5kKSB7XG5cdFx0cmV0dXJuIG5ldyBTbGljZSh0aGlzLmRhdGEsIHRoaXMuc3RhcnQsIG5ld0VuZCxcblx0XHRcdChuZXdFbmQgPT09IHRoaXMuc3RhcnQpID8gdGhpcy5sb2MgOiBMb2ModGhpcy5sb2Muc3RhcnQsIHRoaXMuZGF0YVtuZXdFbmQgLSAxXS5sb2MuZW5kKSlcblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=