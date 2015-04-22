if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../CompileError', '../Lang'], function (exports, _CompileError, _Lang) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const showChar = function (ch) {
		return _CompileError.code(String.fromCharCode(ch));
	};

	exports.showChar = showChar;
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
	      Hyphen = cc('-'),
	      LetterN = cc('n'),
	      LetterT = cc('t');

	exports.N0 = N0;
	exports.N1 = N1;
	exports.N2 = N2;
	exports.N3 = N3;
	exports.N4 = N4;
	exports.N5 = N5;
	exports.N6 = N6;
	exports.N7 = N7;
	exports.N8 = N8;
	exports.N9 = N9;
	exports.OpParen = OpParen;
	exports.OpBracket = OpBracket;
	exports.OpBrace = OpBrace;
	exports.ClParen = ClParen;
	exports.ClBracket = ClBracket;
	exports.ClBrace = ClBrace;
	exports.Space = Space;
	exports.Dot = Dot;
	exports.Colon = Colon;
	exports.Tilde = Tilde;
	exports.Bar = Bar;
	exports.Underscore = Underscore;
	exports.Backslash = Backslash;
	exports.Hash = Hash;
	exports.Newline = Newline;
	exports.Quote = Quote;
	exports.Tab = Tab;
	exports.Hyphen = Hyphen;
	exports.LetterN = LetterN;
	exports.LetterT = LetterT;
	const charPred = function (chars, reverse) {
		let src = 'switch(ch) {\n';
		for (let i = 0; i < chars.length; i = i + 1) src = '' + src + 'case ' + chars.charCodeAt(i) + ': ';
		const res = !reverse;
		src = '' + src + ' return ' + res + '\ndefault: return ' + !res + '\n}';
		return Function('ch', src);
	};
	const isDigit = charPred('0123456789'),
	      isNameCharacter = charPred(_Lang.NonNameCharacters, true),
	      isNumberCharacter = charPred('0123456789.e'),
	      isReservedCharacter = charPred(_Lang.ReservedCharacters);
	exports.isDigit = isDigit;
	exports.isNameCharacter = isNameCharacter;
	exports.isNumberCharacter = isNumberCharacter;
	exports.isReservedCharacter = isReservedCharacter;
});
//# sourceMappingURL=../../../../meta/compile/private/lex/char.js.map