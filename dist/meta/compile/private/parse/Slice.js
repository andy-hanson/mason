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
		_createClass(Slice, null, [{
			key: 'group',
			value: function group(groupToken) {
				const subTokens = groupToken.subTokens;
				const loc = groupToken.loc;

				return new Slice(subTokens, 0, subTokens.length, loc);
			}
		}]);

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
			key: 'headSlice',
			value: function headSlice() {
				return Slice.group(this.head());
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
			key: 'mapSlices',
			value: function mapSlices(f) {
				const out = [];
				this.each(function (_) {
					return out.push(f(Slice.group(_)));
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
		}]);

		return Slice;
	})();

	module.exports = Slice;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL1NsaWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBUXFCLEtBQUs7ZUFBTCxLQUFLOztVQUNiLGVBQUMsVUFBVSxFQUFFO1VBQ2hCLFNBQVMsR0FBVSxVQUFVLENBQTdCLFNBQVM7VUFBRSxHQUFHLEdBQUssVUFBVSxDQUFsQixHQUFHOztBQUN0QixXQUFPLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNyRDs7Ozs7QUFHVSxXQVBTLEtBQUssQ0FPYixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7eUJBUGpCLEtBQUs7O0FBUXhCLE9BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0FBQ3BCLE9BQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBOztBQUVsQixPQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUNkLE9BQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0dBQ2Q7O2VBYm1CLEtBQUs7O1VBZXJCLGdCQUFHO0FBQ04sV0FBTyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDNUI7OztVQUVNLG1CQUFHO0FBQ1QsV0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUE7SUFDOUI7Ozs7O1VBR0csZ0JBQUc7QUFDTixXQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzlCOzs7VUFDUSxxQkFBRztBQUNYLFdBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUMvQjs7O1VBRUssa0JBQUc7QUFDUixXQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNsQzs7O1VBRUcsZ0JBQUc7QUFDTixXQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNoQzs7O1VBRUcsZ0JBQUc7QUFDTixXQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUN0Qzs7O1VBRUksaUJBQUc7QUFDUCxXQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNsQzs7Ozs7VUFHZSwwQkFBQyxPQUFPLEVBQUU7QUFDekIsU0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUMvQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzFCLE9BQU87QUFDTixXQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDeEIsT0FBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLFVBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0IsQ0FBQTtBQUNILFdBQU8sSUFBSSxDQUFBO0lBQ1g7Ozs7OztVQUllLDBCQUFDLE9BQU8sRUFBRTs7O0FBQ3pCLFFBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFDdEIsVUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsU0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUMvQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDNUIsUUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDOUQsVUFBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDYjtBQUNGLFdBQU8sVUE1RVMsSUFBSSxFQTRFUixDQUFDLFVBNUVOLE9BQU8sRUE0RU8sR0FBRyxDQUFDLEVBQUU7WUFBTSxVQTVFWCxJQUFJLEVBNEVZLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0tBQUEsQ0FBQyxDQUFBO0lBQy9FOzs7VUFFRyxjQUFDLENBQUMsRUFBRTtBQUNQLFNBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDL0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQjs7O1VBRUUsYUFBQyxDQUFDLEVBQUU7QUFDTixVQUFNLEdBQUcsR0FBRyxFQUFFLENBQUE7QUFDZCxRQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFBO0FBQzlCLFdBQU8sR0FBRyxDQUFBO0lBQ1Y7OztVQUNRLG1CQUFDLENBQUMsRUFBRTtBQUNaLFVBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQTtBQUNkLFFBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO1lBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFBO0FBQzNDLFdBQU8sR0FBRyxDQUFBO0lBQ1Y7OztVQUVLLGdCQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDdEIsUUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFBO0FBQ2YsUUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7WUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FBQSxDQUFDLENBQUE7QUFDckMsV0FBTyxHQUFHLENBQUE7SUFDVjs7O1VBRUksZUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFO0FBQ3ZCLFVBQU0sR0FBRyxHQUFHLGtCQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDakYsV0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDcEQ7OztVQUNTLG9CQUFDLFFBQVEsRUFBRTtBQUNwQixVQUFNLEdBQUcsR0FBRyxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FDaEMsSUFBSSxDQUFDLEdBQUcsR0FDUixrQkFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNuRCxXQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDdEQ7OztVQUNPLGtCQUFDLE1BQU0sRUFBRTtBQUNoQixVQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssR0FDaEMsSUFBSSxDQUFDLEdBQUcsR0FDUixrQkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDckQsV0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3REOzs7U0E3R21CLEtBQUs7OztrQkFBTCxLQUFLIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL1NsaWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB7IGlzRW1wdHksIG9wSWYsIHB1c2ggfSBmcm9tICcuLi91dGlsJ1xuXG4vKlxuUmVwcmVzZW50cyBhIHNlY3Rpb24gb2YgdG9rZW5zIHRoYXQgdGhlIHBhcnNlciBpcyBjdXJyZW50bHkgd29ya2luZyBvbi5cblNpbmNlIHdlIGRvbid0IG1vZGlmeSB0aGUgVG9rZW4gdHJlZSwgdGhpcyBpcyBqdXN0IGEgdmlldyBvbiBpdC5cblNvLCB0YWtpbmcgdGhlIHRhaWwgaXMgTygxKS5cbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGljZSB7XG5cdHN0YXRpYyBncm91cChncm91cFRva2VuKSB7XG5cdFx0Y29uc3QgeyBzdWJUb2tlbnMsIGxvYyB9ID0gZ3JvdXBUb2tlblxuXHRcdHJldHVybiBuZXcgU2xpY2Uoc3ViVG9rZW5zLCAwLCBzdWJUb2tlbnMubGVuZ3RoLCBsb2MpXG5cdH1cblxuXHQvLyBEbyBub3QgdXNlIGBuZXdgLiBVc2UgU2xpY2UuZ3JvdXAuXG5cdGNvbnN0cnVjdG9yKHRva2Vucywgc3RhcnQsIGVuZCwgbG9jKSB7XG5cdFx0dGhpcy50b2tlbnMgPSB0b2tlbnNcblx0XHR0aGlzLnN0YXJ0ID0gc3RhcnRcblx0XHQvLyBlbmQgaXMgZXhjbHVzaXZlLlxuXHRcdHRoaXMuZW5kID0gZW5kXG5cdFx0dGhpcy5sb2MgPSBsb2Ncblx0fVxuXG5cdHNpemUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZW5kIC0gdGhpcy5zdGFydFxuXHR9XG5cblx0aXNFbXB0eSgpIHtcblx0XHRyZXR1cm4gdGhpcy5zdGFydCA9PT0gdGhpcy5lbmRcblx0fVxuXG5cdC8vIEZvciB0aGVzZSBtZXRob2RzLCBjYWxsZXIgbXVzdCBlbnN1cmUgbm9uLWVtcHR5LlxuXHRoZWFkKCkge1xuXHRcdHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLnN0YXJ0XVxuXHR9XG5cdGhlYWRTbGljZSgpIHtcblx0XHRyZXR1cm4gU2xpY2UuZ3JvdXAodGhpcy5oZWFkKCkpXG5cdH1cblxuXHRzZWNvbmQoKSB7XG5cdFx0cmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuc3RhcnQgKyAxXVxuXHR9XG5cblx0bGFzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5lbmQgLSAxXVxuXHR9XG5cblx0dGFpbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fY2hvcFN0YXJ0KHRoaXMuc3RhcnQgKyAxKVxuXHR9XG5cblx0cnRhaWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2Nob3BFbmQodGhpcy5lbmQgLSAxKVxuXHR9XG5cblx0Ly8gTG9va3MgZm9yIHRoZSBmaXJzdCB0b2tlbiB0byBzYXRpc2Z5IGBzcGxpdE9uYCBhbmQgZG9lcyBub3QgbG9vayBmdXJ0aGVyLlxuXHRvcFNwbGl0T25jZVdoZXJlKHNwbGl0T24pIHtcblx0XHRmb3IgKGxldCBpID0gdGhpcy5zdGFydDsgaSA8IHRoaXMuZW5kOyBpID0gaSArIDEpXG5cdFx0XHRpZiAoc3BsaXRPbih0aGlzLnRva2Vuc1tpXSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YmVmb3JlOiB0aGlzLl9jaG9wRW5kKGkpLFxuXHRcdFx0XHRcdGF0OiB0aGlzLnRva2Vuc1tpXSxcblx0XHRcdFx0XHRhZnRlcjogdGhpcy5fY2hvcFN0YXJ0KGkgKyAxKVxuXHRcdFx0XHR9XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG5cdC8vIFNwbGl0cyBldmVyeSB0aW1lICBgc3BsaXRPbmAgaXMgdHJ1ZS5cblx0Ly8gRXZlcnkgb3V0cHV0IGJ1dCBsYXN0IHdpbGwgYmUgeyBiZWZvcmUsIGF0IH07IGxhc3Qgd2lsbCBiZSBqdXN0IHsgYmVmb3JlIH0uXG5cdG9wU3BsaXRNYW55V2hlcmUoc3BsaXRPbikge1xuXHRcdGxldCBpTGFzdCA9IHRoaXMuc3RhcnRcblx0XHRjb25zdCBvdXQgPSBbIF1cblx0XHRmb3IgKGxldCBpID0gdGhpcy5zdGFydDsgaSA8IHRoaXMuZW5kOyBpID0gaSArIDEpXG5cdFx0XHRpZiAoc3BsaXRPbih0aGlzLnRva2Vuc1tpXSkpIHtcblx0XHRcdFx0b3V0LnB1c2goeyBiZWZvcmU6IHRoaXMuX2Nob3AoaUxhc3QsIGkpLCBhdDogdGhpcy50b2tlbnNbaV0gfSlcblx0XHRcdFx0aUxhc3QgPSBpICsgMVxuXHRcdFx0fVxuXHRcdHJldHVybiBvcElmKCFpc0VtcHR5KG91dCksICgpID0+IHB1c2gob3V0LCB7IGJlZm9yZTogdGhpcy5fY2hvcFN0YXJ0KGlMYXN0KSB9KSlcblx0fVxuXG5cdGVhY2goZikge1xuXHRcdGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0OyBpIDwgdGhpcy5lbmQ7IGkgPSBpICsgMSlcblx0XHRcdGYodGhpcy50b2tlbnNbaV0pXG5cdH1cblxuXHRtYXAoZikge1xuXHRcdGNvbnN0IG91dCA9IFtdXG5cdFx0dGhpcy5lYWNoKF8gPT4gb3V0LnB1c2goZihfKSkpXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cdG1hcFNsaWNlcyhmKSB7XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHR0aGlzLmVhY2goXyA9PiBvdXQucHVzaChmKFNsaWNlLmdyb3VwKF8pKSkpXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cblx0cmVkdWNlKHJlZHVjZXIsIHN0YXJ0KSB7XG5cdFx0bGV0IGFjYyA9IHN0YXJ0XG5cdFx0dGhpcy5lYWNoKF8gPT4gYWNjID0gcmVkdWNlcihhY2MsIF8pKVxuXHRcdHJldHVybiBhY2Ncblx0fVxuXG5cdF9jaG9wKG5ld1N0YXJ0LCBuZXdFbmQpIHtcblx0XHRjb25zdCBsb2MgPSBMb2ModGhpcy50b2tlbnNbbmV3U3RhcnRdLmxvYy5zdGFydCwgdGhpcy50b2tlbnNbbmV3RW5kIC0gMV0ubG9jLmVuZClcblx0XHRyZXR1cm4gbmV3IFNsaWNlKHRoaXMudG9rZW5zLCBuZXdTdGFydCwgbmV3RW5kLCBsb2MpXG5cdH1cblx0X2Nob3BTdGFydChuZXdTdGFydCkge1xuXHRcdGNvbnN0IGxvYyA9IG5ld1N0YXJ0ID09PSB0aGlzLmVuZCA/XG5cdFx0XHR0aGlzLmxvYyA6XG5cdFx0XHRMb2ModGhpcy50b2tlbnNbbmV3U3RhcnRdLmxvYy5zdGFydCwgdGhpcy5sb2MuZW5kKVxuXHRcdHJldHVybiBuZXcgU2xpY2UodGhpcy50b2tlbnMsIG5ld1N0YXJ0LCB0aGlzLmVuZCwgbG9jKVxuXHR9XG5cdF9jaG9wRW5kKG5ld0VuZCkge1xuXHRcdGNvbnN0IGxvYyA9IG5ld0VuZCA9PT0gdGhpcy5zdGFydCA/XG5cdFx0XHR0aGlzLmxvYyA6XG5cdFx0XHRMb2ModGhpcy5sb2Muc3RhcnQsIHRoaXMudG9rZW5zW25ld0VuZCAtIDFdLmxvYy5lbmQpXG5cdFx0cmV0dXJuIG5ldyBTbGljZSh0aGlzLnRva2VucywgdGhpcy5zdGFydCwgbmV3RW5kLCBsb2MpXG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9