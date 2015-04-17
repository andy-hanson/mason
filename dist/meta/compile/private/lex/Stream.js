if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../U/type', '../U/util'], function (exports, module, _esastDistLoc, _UType, _UUtil) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _type = _interopRequire(_UType);

	let Stream = (function () {
		function Stream(str) {
			_classCallCheck(this, Stream);

			_type(str, String);
			_UUtil.assert(this instanceof Stream);
			Object.defineProperty(this, 'str', { value: str });
			// pos and index are mutable. pos should always be the position at index.
			this.pos = _esastDistLoc.StartPos;
			this.index = 0;
		}

		_createClass(Stream, [{
			key: 'hasNext',
			value: function hasNext() {
				return this.peek() !== 'EOF';
			}
		}, {
			key: 'peek',
			value: function peek(offset) {
				if (offset === undefined) offset = 0;
				_type(offset, Number);
				const index = this.index + offset;
				_UUtil.assert(index >= 0);
				return index >= this.str.length ? 'EOF' : this.str.charAt(index);
			}
		}, {
			key: 'tryEat',
			value: function tryEat(ch) {
				const canEat = this.peek() === ch;
				if (canEat) this.skip();
				return canEat;
			}
		}, {
			key: 'hasPrev',
			value: function hasPrev() {
				return this.index > 0;
			}
		}, {
			key: 'prev',
			value: function prev() {
				return this.str.charAt(this.index - 1);
			}
		}, {
			key: 'eat',
			value: function eat() {
				const ch = this.str[this.index];
				this.index = this.index + 1;
				this.pos = this.pos.next(ch);
				return ch;
			}
		}, {
			key: 'skip',
			value: function skip(n) {
				if (n === undefined) n = 1;
				_type(n, Number);
				const endIndex = this.index + n;
				for (; this.index !== endIndex; this.index = this.index + 1) this.pos = this.pos.next(this.peek());
			}
		}, {
			key: 'stepBackMany',

			// Caller must ensure that backing up nCharsToBackUp characters brings us to oldPos.
			value: function stepBackMany(oldPos, nCharsToBackUp) {
				this.index = this.index - nCharsToBackUp;
				this.pos = oldPos;
			}
		}, {
			key: 'stepBack',

			// Call only if you know this isn't the start of a line.
			value: function stepBack() {
				_UUtil.assert(this.pos.column > 1);
				this.index = this.index - 1;
				this.pos = this.pos.withPrevColumn();
			}
		}, {
			key: 'takeWhile',
			value: function takeWhile(whl) {
				const startIndex = this.index;
				const pred = charClassPred(whl);
				while (this.hasNext() && pred(this.peek())) this.skip();
				return this.str.slice(startIndex, this.index);
			}
		}, {
			key: 'takeUpTo',
			value: function takeUpTo(upTo) {
				const pred = charClassPred(upTo);
				return this.takeWhile(function (ch) {
					return !pred(ch);
				});
			}
		}]);

		return Stream;
	})();

	module.exports = Stream;

	function charClassPred(whl) {
		if (typeof whl === 'string') {
			_UUtil.assert(whl.length === 1);
			return function (ch) {
				return ch === whl;
			};
		}
		if (whl instanceof RegExp) return function (ch) {
			return whl.test(ch);
		};
		_type(whl, Function);
		return whl;
	}
});
//# sourceMappingURL=../../../../meta/compile/private/lex/Stream.js.map