if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'esast/dist/private/tuple', '../Token'], function (exports, _esastDistLoc, _esastDistPrivateTuple, _Token) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _Loc = _interopRequire(_esastDistLoc);

	var _tuple = _interopRequire(_esastDistPrivateTuple);

	exports.default = _tuple('GroupPre', Object, 'doc', ['loc', _Loc, 'k', Number]);
	const groupOpenToClose = function (k) {
		return k === GP_Line || k === GP_Space ? k : -k;
	};

	exports.groupOpenToClose = groupOpenToClose;
	const GP_OpenParen = _Token.G_Paren,
	      GP_OpenBracket = _Token.G_Bracket,
	      GP_OpenBlock = _Token.G_Block,
	      GP_OpenQuote = _Token.G_Quote,
	      GP_Line = _Token.G_Line,
	      GP_Space = _Token.G_Space,
	      GP_CloseParen = -_Token.G_Paren,
	      GP_CloseBracket = -_Token.G_Bracket,
	      GP_CloseBlock = -_Token.G_Block,
	      GP_CloseQuote = -_Token.G_Quote;
	exports.GP_OpenParen = GP_OpenParen;
	exports.GP_OpenBracket = GP_OpenBracket;
	exports.GP_OpenBlock = GP_OpenBlock;
	exports.GP_OpenQuote = GP_OpenQuote;
	exports.GP_Line = GP_Line;
	exports.GP_Space = GP_Space;
	exports.GP_CloseParen = GP_CloseParen;
	exports.GP_CloseBracket = GP_CloseBracket;
	exports.GP_CloseBlock = GP_CloseBlock;
	exports.GP_CloseQuote = GP_CloseQuote;
});
//# sourceMappingURL=../../../../meta/compile/private/lex/GroupPre.js.map