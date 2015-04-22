if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../../CompileError', '../Lang', '../Token', '../U/util', './GroupPre', './char'], function (exports, module, _esastDistLoc, _CompileError, _Lang, _Token, _UUtil, _GroupPre, _char) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _Loc = _interopRequire(_esastDistLoc);

	var _GroupPre2 = _interopRequire(_GroupPre);

	module.exports = function (cx, str) {
		const res = [];
		let line = _esastDistLoc.StartLine;
		let column = _esastDistLoc.StartColumn;
		let index = 0;

		const o = function (t) {
			res.push(t);
		},
		      pos = function () {
			return _esastDistLoc.Pos(line, column);
		},
		      loc = function () {
			return _esastDistLoc.singleCharLoc(pos());
		},
		      prev = function () {
			return str.charCodeAt(index - 1);
		},
		      peek = function () {
			return str.charCodeAt(index);
		},
		      eat = function () {
			const ch = str.charCodeAt(index);
			index = index + 1;
			column = column + 1;
			return ch;
		},
		      tryEat = function (ch) {
			const canEat = peek() === ch;
			if (canEat) {
				index = index + 1;
				column = column + 1;
			}
			return canEat;
		},
		     

		// Caller must ensure that backing up nCharsToBackUp characters brings us to oldPos.
		stepBackMany = function (oldPos, nCharsToBackUp) {
			index = index - nCharsToBackUp;
			line = oldPos.line;
			column = oldPos.column;
		},
		      _skipWhile = function (pred) {
			const startIndex = index;
			while (pred(peek())) index = index + 1;
			const diff = index - startIndex;
			column = column + diff;
			return diff;
		},
		      takeWhileWithPrev = function (pred) {
			const startIndex = index;
			_skipWhile(pred);
			return str.slice(startIndex - 1, index);
		},
		      takeWhile = function (pred) {
			const startIndex = index;
			_skipWhile(pred);
			return str.slice(startIndex, index);
		},
		      skipWhileEquals = function (ch) {
			return _skipWhile(function (_) {
				return _ === ch;
			});
		},
		     

		// Called after seeing the first newline.
		skipNewlines = function () {
			line = line + 1;
			const startLine = line;
			while (peek() === _char.Newline) {
				index = index + 1;
				line = line + 1;
			}
			column = _esastDistLoc.StartColumn;
			return line - startLine;
		},
		      skipRestOfLine = function () {
			while (peek() !== _char.Newline) index = index + 1;
		};

		const ungrouped = function (isInQuote) {
			let indent = 0;

			let ch, startLine, startColumn;
			const loc = function () {
				return _Loc(_esastDistLoc.Pos(startLine, startColumn), pos());
			},
			      keyword = function (k) {
				return _Token.Keyword(loc(), k);
			},
			      gp = function (k) {
				return o(_GroupPre2(loc(), k));
			},
			      eatNumber = function () {
				const lit = takeWhileWithPrev(_char.isNumberCharacter);
				cx.check(!Number.isNaN(Number(lit)), pos, function () {
					return 'Invalid number literal ' + _CompileError.code(lit);
				});
				return _Token.Literal(loc(), lit, Number);
			};

			while (index !== str.length) {
				startLine = line;
				startColumn = column;

				ch = eat();
				switch (ch) {
					case _char.N0:case _char.N1:case _char.N2:case _char.N3:case _char.N4:
					case _char.N5:case _char.N6:case _char.N7:case _char.N8:case _char.N9:
						o(eatNumber());
						break;
					case _char.OpParen:
						gp(_GroupPre.GP_OpenParen);
						break;
					case _char.OpBracket:
						gp(_GroupPre.GP_OpenBracket);
						break;
					case _char.ClParen:
						gp(_GroupPre.GP_CloseParen);
						break;
					case _char.ClBracket:
						gp(_GroupPre.GP_CloseBracket);
						break;
					case _char.ClBrace:
						cx.check(isInQuote, loc, function () {
							return 'Reserved character ' + _char.showChar(ch);
						});
						return;
					case _char.Space:
						cx.warnIf(peek() === _char.Space, loc, 'Multiple spaces in a row');
						gp(_GroupPre.GP_Space);
						break;
					case _char.Dot:
						{
							const p = peek();
							if (p === _char.Space || p === _char.Newline) {
								// ObjLit assign in its own spaced group.
								// We can't just create a new Group here because we want to
								// ensure it's not part of the preceding or following spaced group.
								gp(_GroupPre.GP_Space);
								o(keyword('. '));
								gp(_GroupPre.GP_Space);
							} else o(_Token.DotName(loc(),
							// +1 for the dot we just skipped.
							skipWhileEquals(_char.Dot) + 1, takeWhile(_char.isNameCharacter)));
							break;
						}
					case _char.Colon:
						o(keyword(':'));
						break;
					case _char.Tilde:
						if (tryEat(_char.Bar)) {
							o(keyword('~|'));
							gp(_GroupPre.GP_Space);
							break;
						} else {
							o(keyword('~'));
							break;
						}
						break;
					case _char.Bar:
						// First arg in its own spaced group
						o(keyword('|'));
						gp(_GroupPre.GP_Space);
						break;
					case _char.Underscore:
						o(keyword('_'));
						break;
					case _char.Hash:
						skipRestOfLine();
						break;
					case _char.Newline:
						{
							cx.check(!isInQuote, loc, 'Quote interpolation cannot contain newline');
							cx.check(prev() !== _char.Space, loc, 'Line ends in a space');

							// Skip any blank lines.
							skipNewlines();
							const oldIndent = indent;
							indent = skipWhileEquals(_char.Tab);
							cx.check(peek() !== _char.Space, pos, 'Line begins in a space');
							if (indent <= oldIndent) {
								for (let i = indent; i < oldIndent; i = i + 1) gp(_GroupPre.GP_CloseBlock);
								gp(_GroupPre.GP_Line);
							} else {
								cx.check(indent === oldIndent + 1, loc, 'Line is indented more than once');
								gp(_GroupPre.GP_OpenBlock);
							}
							break;
						}
					case _char.Tab:
						cx.fail(loc(), 'Tab may only be used to indent');
						break;
					case _char.Quote:
						lexQuote(indent);
						break;
					case _char.Hyphen:
						if (_char.isDigit(peek())) {
							o(eatNumber());
							break;
						}
					// Else fallthrough
					default:
						{
							cx.check(!_char.isReservedCharacter(ch), loc, function () {
								return 'Reserved character ' + _char.showChar(ch);
							});
							// All other characters should be handled in a case above.
							const name = takeWhileWithPrev(_char.isNameCharacter);
							switch (name) {
								case 'region':
									// Rest of line is a comment.
									skipRestOfLine();
									o(keyword('region'));
									break;
								default:
									if (tryEat(_char.Underscore)) o(_Token.CallOnFocus(loc(), name));else if (_Lang.AllKeywords.has(name)) o(keyword(name));else if (_Lang.ReservedWords.has(name)) cx.fail(loc, 'Reserved word ' + _CompileError.code(name));else o(_Token.Name(loc(), name));
							}
						}
				}
			}
		};

		const lexQuote = function (indent) {
			const isIndented = peek() === _char.Newline;
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

			o(_GroupPre2(loc(), _GroupPre.GP_OpenQuote));

			eatChars: while (true) {
				const chPos = pos();
				const ch = eat();
				switch (ch) {
					case _char.Backslash:
						{
							read = read + quoteEscape(eat());
							break;
						}
					case _char.OpBrace:
						{
							yieldRead();
							// We can't create a Group now because there may be other GroupPre_s inside.
							o(_GroupPre2(_esastDistLoc.singleCharLoc(chPos), _GroupPre.GP_OpenParen));
							ungrouped(true);
							o(_GroupPre2(loc(), _GroupPre.GP_CloseParen));
							break;
						}
					case _char.Newline:
						{
							cx.check(prev !== _char.Space, chPos, 'Line ends in a space');
							cx.check(isIndented, chPos, 'Unclosed quote.');
							let newIndent = skipWhileEquals(_char.Tab);

							let extraNewlines = '';
							// Allow blank lines.
							if (newIndent === 0) {
								extraNewlines = '\n'.repeat(skipNewlines());
								newIndent = skipWhileEquals(_char.Tab);
							}

							if (newIndent < quoteIndent) {
								// Indented quote section is over.
								// Undo reading the tabs and newline.
								stepBackMany(chPos, newIndent + 1);
								_UUtil.assert(peek() === _char.Newline);
								break eatChars;
							} else read = read + extraNewlines + '\n' + '\t'.repeat(newIndent - quoteIndent);
							break;
						}
					case _char.Quote:
						if (!isIndented) break eatChars;
					// Else fallthrough
					default:
						read = read + String.fromCharCode(ch);
				}
			}

			yieldRead();
			o(_GroupPre2(loc(), _GroupPre.GP_CloseQuote));
		};

		const quoteEscape = function (ch) {
			switch (ch) {
				case _char.OpBrace:
					return '{';
				case _char.LetterN:
					return '\n';
				case _char.LetterT:
					return '\t';
				case _char.Quote:
					return '"';
				case _char.Backslash:
					return '\\';
				default:
					cx.fail(pos, 'No need to escape ' + _char.showChar(ch));
			}
		};

		ungrouped(false);
		return res;
	};
});
//# sourceMappingURL=../../../../meta/compile/private/lex/ungrouped.js.map