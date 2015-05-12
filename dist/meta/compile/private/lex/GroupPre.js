if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', '../Token'], function (exports, _esastDistLoc, _tuplDistTupl, _Token) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	exports.default = _tupl('GroupPre', Object, 'doc', ['loc', _Loc, 'kind', Number]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC9Hcm91cFByZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O21CQUllLE1BQUssVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBRSxLQUFLLFFBQU8sTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDO0FBRXZFLE9BQU0sZ0JBQWdCLEdBQUcsVUFBQSxDQUFDO1NBQ2hDLEFBQUMsQ0FBQyxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssUUFBUSxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFBQSxDQUFBOztTQUQ5QixnQkFBZ0IsR0FBaEIsZ0JBQWdCO0FBR3RCLE9BQ04sWUFBWSxVQVJKLE9BQU8sQUFRTztPQUN0QixjQUFjLFVBVEcsU0FBUyxBQVNBO09BQzFCLFlBQVksVUFWZ0IsT0FBTyxBQVViO09BQ3RCLFlBQVksVUFYeUIsT0FBTyxBQVd0QjtPQUN0QixPQUFPLFVBWnVDLE1BQU0sQUFZcEM7T0FDaEIsUUFBUSxVQWI4QyxPQUFPLEFBYTNDO09BQ2xCLGFBQWEsR0FBRyxRQWRSLE9BQU8sQUFjUztPQUN4QixlQUFlLEdBQUcsUUFmRCxTQUFTLEFBZUU7T0FDNUIsYUFBYSxHQUFHLFFBaEJZLE9BQU8sQUFnQlg7T0FDeEIsYUFBYSxHQUFHLFFBakJxQixPQUFPLEFBaUJwQixDQUFBO1NBVHhCLFlBQVksR0FBWixZQUFZO1NBQ1osY0FBYyxHQUFkLGNBQWM7U0FDZCxZQUFZLEdBQVosWUFBWTtTQUNaLFlBQVksR0FBWixZQUFZO1NBQ1osT0FBTyxHQUFQLE9BQU87U0FDUCxRQUFRLEdBQVIsUUFBUTtTQUNSLGFBQWEsR0FBYixhQUFhO1NBQ2IsZUFBZSxHQUFmLGVBQWU7U0FDZixhQUFhLEdBQWIsYUFBYTtTQUNiLGFBQWEsR0FBYixhQUFhIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL2xleC9Hcm91cFByZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgdHVwbCBmcm9tICd0dXBsL2Rpc3QvdHVwbCdcbmltcG9ydCB7IEdfUGFyZW4sIEdfQnJhY2tldCwgR19CbG9jaywgR19RdW90ZSwgR19MaW5lLCBHX1NwYWNlIH0gZnJvbSAnLi4vVG9rZW4nXG5cbmV4cG9ydCBkZWZhdWx0IHR1cGwoJ0dyb3VwUHJlJywgT2JqZWN0LCAnZG9jJywgWyAnbG9jJywgTG9jLCAna2luZCcsIE51bWJlciBdKVxuXG5leHBvcnQgY29uc3QgZ3JvdXBPcGVuVG9DbG9zZSA9IGsgPT5cblx0KGsgPT09IEdQX0xpbmUgfHwgayA9PT0gR1BfU3BhY2UpID8gayA6IC1rXG5cbmV4cG9ydCBjb25zdFxuXHRHUF9PcGVuUGFyZW4gPSBHX1BhcmVuLFxuXHRHUF9PcGVuQnJhY2tldCA9IEdfQnJhY2tldCxcblx0R1BfT3BlbkJsb2NrID0gR19CbG9jayxcblx0R1BfT3BlblF1b3RlID0gR19RdW90ZSxcblx0R1BfTGluZSA9IEdfTGluZSxcblx0R1BfU3BhY2UgPSBHX1NwYWNlLFxuXHRHUF9DbG9zZVBhcmVuID0gLUdfUGFyZW4sXG5cdEdQX0Nsb3NlQnJhY2tldCA9IC1HX0JyYWNrZXQsXG5cdEdQX0Nsb3NlQmxvY2sgPSAtR19CbG9jayxcblx0R1BfQ2xvc2VRdW90ZSA9IC1HX1F1b3RlXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==