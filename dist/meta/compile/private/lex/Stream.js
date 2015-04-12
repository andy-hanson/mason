if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "esast/dist/Loc", "../U/type", "../U/util"], function (exports, module, _esastDistLoc, _UType, _UUtil) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var StartPos = _esastDistLoc.StartPos;

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var set = _UUtil.set;

	let Stream = (function () {
		function Stream(str) {
			_classCallCheck(this, Stream);

			type(str, String);
			assert(this instanceof Stream);
			Object.defineProperty(this, "str", { value: str });
			// pos and index are mutable. pos should always be the position at index.
			this.pos = StartPos;
			this.index = 0;
		}

		_createClass(Stream, {
			hasNext: {
				value: function hasNext() {
					return this.peek() !== "EOF";
				}
			},
			peek: {
				value: function peek(offset) {
					if (offset === undefined) offset = 0;
					type(offset, Number);
					const index = this.index + offset;
					assert(index >= 0);
					return index >= this.str.length ? "EOF" : this.str.charAt(index);
				}
			},
			tryEat: {
				value: function tryEat(ch) {
					const canEat = this.peek() === ch;
					if (canEat) this.skip();
					return canEat;
				}
			},
			hasPrev: {
				value: function hasPrev() {
					return this.index > 0;
				}
			},
			prev: {
				value: function prev() {
					return this.str.charAt(this.index - 1);
				}
			},
			eat: {
				value: function eat() {
					const ch = this.str[this.index];
					this.index = this.index + 1;
					this.pos = this.pos.next(ch);
					return ch;
				}
			},
			skip: {
				value: function skip(n) {
					if (n === undefined) n = 1;
					type(n, Number);
					const endIndex = this.index + n;
					for (; this.index !== endIndex; this.index = this.index + 1) this.pos = this.pos.next(this.peek());
				}
			},
			stepBackMany: {

				// Caller must ensure that backing up nCharsToBackUp characters brings us to oldPos.

				value: function stepBackMany(oldPos, nCharsToBackUp) {
					this.index = this.index - nCharsToBackUp;
					this.pos = oldPos;
				}
			},
			stepBack: {

				// Call only if you know this isn't the start of a line.

				value: function stepBack() {
					assert(this.pos.column > 1);
					this.index = this.index - 1;
					this.pos = this.pos.withPrevColumn();
				}
			},
			takeWhile: {
				value: function takeWhile(whl) {
					const startIndex = this.index;
					const pred = charClassPred(whl);
					while (this.hasNext() && pred(this.peek())) this.skip();
					return this.str.slice(startIndex, this.index);
				}
			},
			takeUpTo: {
				value: function takeUpTo(upTo) {
					const pred = charClassPred(upTo);
					return this.takeWhile(function (ch) {
						return !pred(ch);
					});
				}
			}
		});

		return Stream;
	})();

	module.exports = Stream;

	function charClassPred(whl) {
		if (typeof whl === "string") {
			assert(whl.length === 1);
			return function (ch) {
				return ch === whl;
			};
		}
		if (whl instanceof RegExp) return function (ch) {
			return whl.test(ch);
		};
		type(whl, Function);
		return whl;
	}
});
//# sourceMappingURL=../../../../meta/compile/private/lex/Stream.js.map