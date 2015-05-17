if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../util'], function (exports, module, _esastDistLoc, _util) {
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
				var _this = this;

				let iLast = this.start;
				const out = [];
				for (let i = this.start; i < this.end; i = i + 1) if (splitOn(this.data[i])) {
					out.push({ before: this._chop(iLast, i), at: this.data[i] });
					iLast = i + 1;
				}
				return (0, _util.opIf)(!(0, _util.isEmpty)(out), function () {
					return (0, _util.push)(out, { before: _this._chopStart(iLast) });
				});
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
				const loc = (0, _Loc)(this.data[newStart].loc.start, this.data[newEnd - 1].loc.end);
				return new Slice(this.data, newStart, newEnd, loc);
			}
		}, {
			key: '_chopStart',
			value: function _chopStart(newStart) {
				return new Slice(this.data, newStart, this.end, newStart === this.end ? this.loc : (0, _Loc)(this.data[newStart].loc.start, this.loc.end));
			}
		}, {
			key: '_chopEnd',
			value: function _chopEnd(newEnd) {
				return new Slice(this.data, this.start, newEnd, newEnd === this.start ? this.loc : (0, _Loc)(this.loc.start, this.data[newEnd - 1].loc.end));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL1NsaWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0tBR3FCLEtBQUs7QUFLZCxXQUxTLEtBQUssQ0FLYixJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7eUJBTGYsS0FBSzs7QUFNeEIsT0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7QUFDaEIsT0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7O0FBRWxCLE9BQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0FBQ2QsT0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7R0FDZDs7ZUFYbUIsS0FBSzs7VUFhckIsZ0JBQUc7QUFDTixXQUFPLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUM1Qjs7O1VBRU0sbUJBQUc7QUFDVCxXQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUM5Qjs7O1VBRUcsZ0JBQUc7QUFDTixXQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzVCOzs7VUFFSyxrQkFBRztBQUNSLFdBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2hDOzs7VUFFRyxnQkFBRztBQUNOLFdBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzlCOzs7VUFFRyxnQkFBRztBQUNOLFdBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3RDOzs7VUFFSSxpQkFBRztBQUNQLFdBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2xDOzs7VUFFZSwwQkFB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SyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNsRDs7O1VBQ1Msb0JBQUMsUUFBUSxFQUFFO0FBQ3BCLFdBQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFDN0MsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDckY7OztVQUNPLGtCQUFDLE1BQU0sRUFBRTtBQUNoQixXQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQzdDLEFBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3pGOzs7VUEzRlcsZUFBQyxDQUFDLEVBQUU7QUFDZixXQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyRDs7O1NBSG1CLEtBQUs7OztrQkFBTCxLQUFLIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL1NsaWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB7IGlzRW1wdHksIG9wSWYsIHB1c2ggfSBmcm9tICcuLi91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGljZSB7XG5cdHN0YXRpYyBncm91cChnKSB7XG5cdFx0cmV0dXJuIG5ldyBTbGljZShnLnRva2VucywgMCwgZy50b2tlbnMubGVuZ3RoLCBnLmxvYylcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGRhdGEsIHN0YXJ0LCBlbmQsIGxvYykge1xuXHRcdHRoaXMuZGF0YSA9IGRhdGFcblx0XHR0aGlzLnN0YXJ0ID0gc3RhcnRcblx0XHQvLyBlbmQgaXMgZXhjbHVzaXZlXG5cdFx0dGhpcy5lbmQgPSBlbmRcblx0XHR0aGlzLmxvYyA9IGxvY1xuXHR9XG5cblx0c2l6ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5lbmQgLSB0aGlzLnN0YXJ0XG5cdH1cblxuXHRpc0VtcHR5KCkge1xuXHRcdHJldHVybiB0aGlzLnN0YXJ0ID09PSB0aGlzLmVuZFxuXHR9XG5cblx0aGVhZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhW3RoaXMuc3RhcnRdXG5cdH1cblxuXHRzZWNvbmQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0YVt0aGlzLnN0YXJ0ICsgMV1cblx0fVxuXG5cdGxhc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0YVt0aGlzLmVuZCAtIDFdXG5cdH1cblxuXHR0YWlsKCkge1xuXHRcdHJldHVybiB0aGlzLl9jaG9wU3RhcnQodGhpcy5zdGFydCArIDEpXG5cdH1cblxuXHRydGFpbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fY2hvcEVuZCh0aGlzLmVuZCAtIDEpXG5cdH1cblxuXHRvcFNwbGl0T25jZVdoZXJlKHNwbGl0T24pIHtcblx0XHRmb3IgKGxldCBpID0gdGhpcy5zdGFydDsgaSA8IHRoaXMuZW5kOyBpID0gaSArIDEpXG5cdFx0XHRpZiAoc3BsaXRPbih0aGlzLmRhdGFbaV0pKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGJlZm9yZTogdGhpcy5fY2hvcEVuZChpKSxcblx0XHRcdFx0XHRhdDogdGhpcy5kYXRhW2ldLFxuXHRcdFx0XHRcdGFmdGVyOiB0aGlzLl9jaG9wU3RhcnQoaSArIDEpXG5cdFx0XHRcdH1cblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cblx0b3BTcGxpdE1hbnlXaGVyZShzcGxpdE9uKSB7XG5cdFx0bGV0IGlMYXN0ID0gdGhpcy5zdGFydFxuXHRcdGNvbnN0IG91dCA9IFtdXG5cdFx0Zm9yIChsZXQgaSA9IHRoaXMuc3RhcnQ7IGkgPCB0aGlzLmVuZDsgaSA9IGkgKyAxKVxuXHRcdFx0aWYgKHNwbGl0T24odGhpcy5kYXRhW2ldKSkge1xuXHRcdFx0XHRvdXQucHVzaCh7IGJlZm9yZTogdGhpcy5fY2hvcChpTGFzdCwgaSksIGF0OiB0aGlzLmRhdGFbaV0gfSlcblx0XHRcdFx0aUxhc3QgPSBpICsgMVxuXHRcdFx0fVxuXHRcdHJldHVybiBvcElmKCFpc0VtcHR5KG91dCksICgpID0+IHB1c2gob3V0LCB7IGJlZm9yZTogdGhpcy5fY2hvcFN0YXJ0KGlMYXN0KSB9KSlcblx0fVxuXG5cdGVhY2goZikge1xuXHRcdGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0OyBpIDwgdGhpcy5lbmQ7IGkgPSBpICsgMSlcblx0XHRcdGYodGhpcy5kYXRhW2ldKVxuXHR9XG5cblx0bWFwKGYpIHtcblx0XHRjb25zdCBvdXQgPSBbXVxuXHRcdHRoaXMuZWFjaChfID0+IG91dC5wdXNoKGYoXykpKVxuXHRcdHJldHVybiBvdXRcblx0fVxuXG5cdHJlZHVjZShyZWR1Y2VyLCBzdGFydCkge1xuXHRcdGxldCBhY2MgPSBzdGFydFxuXHRcdGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0OyBpIDwgdGhpcy5lbmQ7IGkgPSBpICsgMSlcblx0XHRcdGFjYyA9IHJlZHVjZXIoYWNjLCB0aGlzLmRhdGFbaV0pXG5cdFx0cmV0dXJuIGFjY1xuXHR9XG5cblx0X2Nob3AobmV3U3RhcnQsIG5ld0VuZCkge1xuXHRcdGNvbnN0IGxvYyA9IExvYyh0aGlzLmRhdGFbbmV3U3RhcnRdLmxvYy5zdGFydCwgdGhpcy5kYXRhW25ld0VuZCAtIDFdLmxvYy5lbmQpXG5cdFx0cmV0dXJuIG5ldyBTbGljZSh0aGlzLmRhdGEsIG5ld1N0YXJ0LCBuZXdFbmQsIGxvYylcblx0fVxuXHRfY2hvcFN0YXJ0KG5ld1N0YXJ0KSB7XG5cdFx0cmV0dXJuIG5ldyBTbGljZSh0aGlzLmRhdGEsIG5ld1N0YXJ0LCB0aGlzLmVuZCxcblx0XHRcdG5ld1N0YXJ0ID09PSB0aGlzLmVuZCA/IHRoaXMubG9jIDogTG9jKHRoaXMuZGF0YVtuZXdTdGFydF0ubG9jLnN0YXJ0LCB0aGlzLmxvYy5lbmQpKVxuXHR9XG5cdF9jaG9wRW5kKG5ld0VuZCkge1xuXHRcdHJldHVybiBuZXcgU2xpY2UodGhpcy5kYXRhLCB0aGlzLnN0YXJ0LCBuZXdFbmQsXG5cdFx0XHQobmV3RW5kID09PSB0aGlzLnN0YXJ0KSA/IHRoaXMubG9jIDogTG9jKHRoaXMubG9jLnN0YXJ0LCB0aGlzLmRhdGFbbmV3RW5kIC0gMV0ubG9jLmVuZCkpXG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9