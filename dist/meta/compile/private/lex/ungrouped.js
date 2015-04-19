if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../../CompileError', '../Lang', '../Token', '../U/util', './GroupPre'], function (exports, module, _esastDistLoc, _CompileError, _Lang, _Token, _UUtil, _GroupPre) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _Loc = _interopRequire(_esastDistLoc);

	var _GroupPre2 = _interopRequire(_GroupPre);

	module.exports = function (_cx, _str) {
		cx = _cx;
		res = [];
		str = _str;
		len = _str.length;
		line = _esastDistLoc.StartLine;
		column = _esastDistLoc.StartColumn;
		index = 0;
		ungrouped(false);
		const r = res;
		cx = res = str = undefined;
		return r;
	};

	let cx,
	// Output array of tokens and GroupPres
	res,
	// String we are tokenizing, and its length
	str, len,
	// Position in str
	index,
	// Current line and column at index
	line, column;

	const o = function (t) {
		return res.push(t);
	},
	      pos = function () {
		return _esastDistLoc.Pos(line, column);
	},
	      loc = function () {
		return _esastDistLoc.singleCharLoc(pos());
	},
	      hasNext = function () {
		return index !== len;
	},
	      peek = function () {
		return str.charAt(index);
	},
	      tryEat = function (ch) {
		const canEat = peek() === ch;
		if (canEat) skip();
		return canEat;
	},
	      prev = function () {
		return str.charAt(index - 1);
	},
	      eat = function () {
		const ch = str[index];
		index = index + 1;
		if (ch === '\n') {
			line = line + 1;
			column = _esastDistLoc.StartColumn;
		} else column = column + 1;
		return ch;
	},
	      skip = eat,
	     

	// Caller must ensure that backing up nCharsToBackUp characters brings us to oldPos.
	stepBackMany = function (oldPos, nCharsToBackUp) {
		index = index - nCharsToBackUp;
		line = oldPos.line;
		column = oldPos.column;
	},
	      takeWhile = function (rgx) {
		const startIndex = index;
		while (rgx.test(peek())) index = index + 1;
		column = column + (index - startIndex);
		return str.slice(startIndex, index);
	},
	      skipWhileEquals = function (ch) {
		const startIndex = index;
		while (peek() === ch) index = index + 1;
		const diff = index - startIndex;
		column = column + diff;
		return diff;
	},
	      skipNewlines = function () {
		while (peek() === '\n') {
			index = index + 1;
			line = line + 1;
		}
		column = _esastDistLoc.StartColumn;
	},
	      skipRestOfLine = function () {
		while (peek() !== '\n') index = index + 1;
	};

	const cc = function (ch) {
		return ch.charCodeAt(0);
	};
	const N0 = cc('0'),
	      N1 = cc('1'),
	      N2 = cc('2'),
	      N3 = cc('3'),
	      N4 = cc('4'),
	      N5 = cc('5'),
	      N6 = cc('6'),
	      N7 = cc('7'),
	      N8 = cc('8'),
	      N9 = cc('9'),
	      OpParen = cc('('),
	      OpBracket = cc('['),
	      OpBrace = cc('{'),
	      ClParen = cc(')'),
	      ClBracket = cc(']'),
	      ClBrace = cc('}'),
	      Space = cc(' '),
	      Dot = cc('.'),
	      Colon = cc(':'),
	      Tilde = cc('~'),
	      Bar = cc('|'),
	      Underscore = cc('_'),
	      Backslash = cc('\\'),
	      Hash = cc('#'),
	      Newline = cc('\n'),
	      Quote = cc('"'),
	      Tab = cc('\t'),
	      Hyphen = cc('-');

	const ungrouped = function (isInQuote) {
		let indent = 0;

		while (hasNext()) {
			const startLine = line,
			      startColumn = column;
			const loc = function () {
				return _Loc(_esastDistLoc.Pos(startLine, startColumn), pos());
			};
			const keyword = function (k) {
				return _Token.Keyword(loc(), k);
			};
			const gp = function (k) {
				return _GroupPre2(loc(), k);
			};

			const eatNumber = function () {
				const lit = _ + takeWhile(/[0-9\.e]/);
				cx.check(!Number.isNaN(Number(lit)), pos, function () {
					return 'Invalid number literal ' + _CompileError.code(lit);
				});
				return _Token.Literal(loc(), lit, Number);
			};

			const _ = eat();
			switch (cc(_)) {
				case N0:case N1:case N2:case N3:case N4:
				case N5:case N6:case N7:case N8:case N9:
					o(eatNumber());
					break;
				case OpParen:case OpBracket:case OpBrace:case ClParen:case ClBracket:
					o(gp(_));
					break;
				case ClBrace:
					if (isInQuote) return;
					o(gp(_));
					break;
				case Space:
					cx.warnIf(peek() === ' ', loc, 'Multiple spaces in a row');
					o(gp('sp'));
					break;
				case Dot:
					if (peek() === ' ' || peek() === '\n') {
						// ObjLit assign in its own spaced group
						o(gp('sp'));
						o(keyword('. '));
						o(gp('sp'));
						break;
					} else {
						o(_Token.DotName(loc(),
						// +1 for the dot we just skipped.
						skipWhileEquals('.') + 1, takeWhile(_Lang.NameCharacter)));
						break;
					}
				case Colon:
					o(keyword(':'));
					break;
				case Tilde:
					if (tryEat('|')) {
						o(keyword('~|'));
						o(gp('sp'));
						break;
					} else {
						o(keyword('~'));
						break;
					}
					break;
				case Bar:
					// First arg in its own spaced group
					o(keyword('|'));
					o(gp('sp'));
					break;
				case Underscore:
					o(keyword('_'));
					break;
				case Hash:
					skipRestOfLine();
					break;
				case Newline:
					{
						cx.check(!isInQuote, loc, 'Quote interpolation cannot contain newline');
						cx.check(prev() !== ' ', loc, 'Line ends in a space');
						// Skip any blank lines.
						skipNewlines();
						const oldIndent = indent;
						indent = skipWhileEquals('\t');
						cx.check(peek() !== ' ', pos, 'Line begins in a space');
						if (indent <= oldIndent) {
							for (let i = indent; i < oldIndent; i = i + 1) o(gp('<-'));
							o(gp('ln'));
						} else {
							cx.check(indent === oldIndent + 1, loc, 'Line is indented more than once');
							o(gp('->'));
						}
						break;
					}
				case Quote:
					lexQuote(indent);
					break;
				case Tab:
					cx.fail(loc(), 'Tab may only be used to indent');
				case Hyphen:
					if (/[0-9]/.test(peek())) {
						o(eatNumber());
						break;
					}
				// Else fallthrough
				default:
					{
						cx.check(!_Lang.ReservedCharacters.has(_), loc, function () {
							return 'Reserved character ' + _CompileError.code(_);
						});
						// All other characters should be handled in a case above.
						_UUtil.assert(_Lang.NameCharacter.test(_));
						const name = _ + takeWhile(_Lang.NameCharacter);
						switch (name) {
							case 'region':
								// Rest of line is a comment.
								skipRestOfLine();
								o(keyword('region'));
								break;
							default:
								if (tryEat('_')) o(_Token.CallOnFocus(loc(), name));else if (_Lang.AllKeywords.has(name)) o(keyword(name));else if (_Lang.ReservedWords.has(name)) cx.fail(loc, 'Reserved word ' + _CompileError.code(name));else o(_Token.Name(loc(), name));
						}
					}
			}
		}
	};

	const lexQuote = function (indent) {
		const isIndented = peek() === '\n';
		const quoteIndent = indent + 1;

		let first = true;
		let read = '';
		let startOfRead = pos();

		const yieldRead = function () {
			if (read !== '') {
				o(_Token.Literal(_Loc(startOfRead, pos()),
				// Don't include leading newline of indented block
				first && isIndented ? read.slice(1) : read, String));
				first = false;
			}
			read = '';
			startOfRead = pos();
		};

		o(_GroupPre2(loc(), '"'));

		eatChars: while (true) {
			const chPos = pos();
			const ch = eat();
			switch (cc(ch)) {
				case Backslash:
					{
						const escaped = eat();
						cx.check(quoteEscape.has(escaped), pos, function () {
							return 'No need to escape ' + _CompileError.code(escaped);
						});
						read = read + quoteEscape.get(escaped);
						break;
					}
				case OpBrace:
					{
						yieldRead();
						// We can't just create a Group now because there may be other GroupPre_s inside.
						o(_GroupPre2(_esastDistLoc.singleCharLoc(chPos), '('));
						ungrouped(true);
						o(_GroupPre2(loc(), ')'));
						break;
					}
				case Newline:
					{
						cx.check(prev() !== ' ', chPos, 'Line ends in a space');
						cx.check(isIndented, chPos, 'Unclosed quote.');
						let newIndent = skipWhileEquals('\t');

						let s = '';

						// Allow blank lines.
						if (newIndent === 0) {
							while (tryEat('\n')) s = s + '\n';
							newIndent = skipWhileEquals('\t');
						}

						if (newIndent < quoteIndent) {
							// Indented quote section is over.
							// Undo reading the tabs and newline.
							stepBackMany(chPos, newIndent + 1);
							_UUtil.assert(peek() === '\n');
							break eatChars;
						} else read = read + s + '\n' + '\t'.repeat(newIndent - quoteIndent);
						break;
					}
				case Quote:
					if (!isIndented) break eatChars;
				// Else fallthrough
				default:
					read = read + ch;
			}
		}

		yieldRead();
		o(_GroupPre2(loc(), 'close"'));
	};

	const quoteEscape = _UUtil.newMap([['{', '{'], ['n', '\n'], ['t', '\t'], ['"', '"'], ['\\', '\\']]);
});
//# sourceMappingURL=../../../../meta/compile/private/lex/ungrouped.js.map