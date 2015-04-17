if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../../CompileError', '../Lang', '../Token', '../U/type', '../U/util', './GroupPre', './Stream'], function (exports, module, _esastDistLoc, _CompileError, _Lang, _Token, _UType, _UUtil, _GroupPre, _Stream) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = ungrouped;

	var _Loc = _interopRequire(_esastDistLoc);

	var _type = _interopRequire(_UType);

	var _GroupPre2 = _interopRequire(_GroupPre);

	var _Stream2 = _interopRequire(_Stream);

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
	      Backtick = cc('`'),
	      Quote = cc('"'),
	      Tab = cc('\t'),
	      Hyphen = cc('-');

	function* ungrouped(lx, stream, isInQuote) {
		_type(stream, _Stream2, isInQuote, Boolean);

		let indent = 0;

		while (stream.hasNext()) {
			const startPos = stream.pos;
			const loc = function () {
				return _Loc(startPos, stream.pos);
			};
			const keyword = function (k) {
				return _Token.Keyword(loc(), k);
			};
			const gp = function (k) {
				return _GroupPre2(loc(), k);
			};

			const eatNumber = function () {
				let msLit = _ + stream.takeWhile(/[0-9\.e_]/);
				if (msLit.endsWith('.')) {
					msLit = msLit.slice(0, msLit.length - 1);
					stream.stepBack();
				}
				const jsLit = msLit.replace(/_/g, '');
				lx.check(!Number.isNaN(Number(jsLit)), stream.pos, function () {
					return 'Invalid number literal ' + _CompileError.code(msLit);
				});
				return _Token.Literal(loc(), jsLit, Number);
			};

			const _ = stream.eat();
			switch (cc(_)) {
				case N0:case N1:case N2:case N3:case N4:
				case N5:case N6:case N7:case N8:case N9:
					yield eatNumber(_, stream);
					break;
				case OpParen:case OpBracket:case OpBrace:case ClParen:case ClBracket:
					yield gp(_);
					break;
				case ClBrace:
					if (isInQuote) return;
					yield gp(_);
					break;
				case Space:
					lx.warnIf(stream.peek() === ' ', loc, 'Multiple spaces in a row');
					yield gp('sp');
					break;
				case Dot:
					if (stream.peek() === ' ' || stream.peek() === '\n') {
						// ObjLit assign in its own spaced group
						yield gp('sp');
						yield keyword('. ');
						yield gp('sp');
						break;
					} else {
						yield _Token.DotName(loc(),
						// +1 for the dot we just skipped.
						stream.takeWhile('.').length + 1, stream.takeWhile(_Lang.isNameCharacter));
						break;
					}
				case Colon:
					yield keyword(':');
					break;
				case Tilde:
					if (stream.tryEat('|')) {
						yield keyword('~|');
						yield gp('sp');
						break;
					} else {
						yield keyword('~');
						break;
					}
					break;
				case Bar:
					// First arg in its own spaced group
					yield keyword('|');
					yield gp('sp');
					break;
				case Underscore:
					yield keyword('_');
					break;
				case Hash:
					stream.takeUpTo('\n');
					break;
				case Newline:
					{
						lx.check(!isInQuote, loc, 'Quote interpolation cannot contain newline');
						lx.check(stream.prev() !== ' ', loc, 'Line ends in a space');
						// Skip any blank lines.
						stream.takeWhile('\n');
						const oldIndent = indent;
						indent = stream.takeWhile('\t').length;
						lx.check(stream.peek() !== ' ', stream.pos, 'Line begins in a space');
						if (indent <= oldIndent) {
							for (let i = indent; i < oldIndent; i = i + 1) yield gp('<-');
							yield gp('ln');
						} else {
							lx.check(indent === oldIndent + 1, loc, 'Line is indented more than once');
							yield gp('->');
						}
						break;
					}
				case Backtick:
					{
						const js = stream.takeUpTo(/[`\n]/);
						lx.check(stream.eat() === '`', loc, function () {
							return 'Unclosed ' + _CompileError.code('`');
						});
						yield _Token.Literal(loc(), js, 'js');
						break;
					}
				case Quote:
					yield* lexQuote(lx, stream, indent);
					break;
				case Tab:
					lx.fail(loc(), 'Tab may only be used to indent');
				case Hyphen:
					if (/[0-9]/.test(stream.peek())) {
						yield eatNumber();
						break;
					}
				// Else fallthrough
				default:
					{
						lx.check(!_Lang.ReservedCharacters.has(_), loc, function () {
							return 'Reserved character ' + _CompileError.code(_);
						});
						// All other characters should be handled in a case above.
						_UUtil.assert(_Lang.isNameCharacter(_));
						const name = _ + stream.takeWhile(_Lang.isNameCharacter);
						switch (name) {
							case 'region':
								// Rest of line is a comment.
								stream.takeUpTo('\n');
								yield keyword('region');
								break;
							default:
								if (stream.tryEat('_')) yield _Token.CallOnFocus(loc(), name);else if (_Lang.AllKeywords.has(name)) yield keyword(name);else if (_Lang.ReservedWords.has(name)) lx.fail(loc, 'Reserved word ' + _CompileError.code(name));else yield _Token.Name(loc(), name);
						}
					}
			}
		}
	}

	function* lexQuote(lx, stream, indent) {
		_type(stream, _Stream2, indent, Number);

		const isIndented = stream.peek() === '\n';
		const quoteIndent = indent + 1;

		let first = true;
		let read = '';
		let startOfRead = stream.pos;

		function* yieldRead() {
			if (read !== '') {
				yield _Token.Literal(_Loc(startOfRead, stream.pos),
				// Don't include leading newline of indented block
				first && isIndented ? read.slice(1) : read, String);
				first = false;
			}
			read = '';
			startOfRead = stream.pos;
		}

		yield _GroupPre2(_esastDistLoc.singleCharLoc(stream.pos), '"');

		eatChars: while (true) {
			const chPos = stream.pos;
			const ch = stream.eat();
			switch (cc(ch)) {
				case Backslash:
					{
						const escaped = stream.eat();
						lx.check(quoteEscape.has(escaped), stream.pos, function () {
							return 'No need to escape ' + _CompileError.code(escaped);
						});
						read = read + quoteEscape.get(escaped);
						break;
					}
				case OpBrace:
					{
						yield* yieldRead();
						// We can't just create a Group now because there may be other GroupPre_s inside.
						yield _GroupPre2(_esastDistLoc.singleCharLoc(chPos), '(');
						yield* ungrouped(lx, stream, true);
						yield _GroupPre2(_esastDistLoc.singleCharLoc(stream.pos), ')');
						break;
					}
				case Newline:
					{
						lx.check(stream.prev() !== ' ', chPos, 'Line ends in a space');
						lx.check(isIndented, chPos, 'Unclosed quote.');
						let newIndent = stream.takeWhile('\t').length;

						let s = '';

						// Allow blank lines.
						if (newIndent === 0) {
							while (stream.tryEat('\n')) s = s + '\n';
							newIndent = stream.takeWhile('\t').length;
						}

						if (newIndent < quoteIndent) {
							// Indented quote section is over.
							// Undo reading the tabs and newline.
							stream.stepBackMany(chPos, newIndent + 1);
							_UUtil.assert(stream.peek() === '\n');
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

		yield* yieldRead();
		yield _GroupPre2(_esastDistLoc.singleCharLoc(stream.pos), 'close"');
	}

	const quoteEscape = _UUtil.newMap([['{', '{'], ['n', '\n'], ['t', '\t'], ['"', '"'], ['\\', '\\']]);
});
//# sourceMappingURL=../../../../meta/compile/private/lex/ungrouped.js.map