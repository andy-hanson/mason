if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', '../CompileError', './Lang', './U/util'], function (exports, _esastDistLoc, _tuplDistTupl, _CompileError, _Lang, _UUtil) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	let Token = function Token() {
		_classCallCheck(this, Token);
	};

	exports.default = Token;

	const tt = function (name) {
		for (var _len = arguments.length, namesTypes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			namesTypes[_key - 1] = arguments[_key];
		}

		return _tupl(name, Token, 'doc', ['loc', _Loc].concat(namesTypes));
	};

	const gIs = function (k) {
		return function (t) {
			return t instanceof Group && t.k === k;
		};
	};
	const kwIs = function (k) {
		return k instanceof Set ? function (t) {
			return t instanceof Keyword && k.has(t.k);
		} : function (t) {
			return t instanceof Keyword && t.k === k;
		};
	};

	const G_Paren = 1,
	      G_Bracket = 2,
	      G_Block = 3,
	      G_Quote = 4,
	      G_Line = 5,
	      G_Space = 6;

	exports.G_Paren = G_Paren;
	exports.G_Bracket = G_Bracket;
	exports.G_Block = G_Block;
	exports.G_Quote = G_Quote;
	exports.G_Line = G_Line;
	exports.G_Space = G_Space;
	const Name = tt('Name', 'name', String),
	      Group = Object.assign(tt('Group', 'tokens', [Token], 'k', Number), {
		isBlock: gIs(G_Block),
		isLine: gIs(G_Line),
		isSpaced: gIs(G_Space)
	}),
	      Keyword = Object.assign(tt('Keyword', 'k', _Lang.AllKeywords), {
		is: kwIs,
		isBar: kwIs('|'),
		isCaseOrCaseDo: kwIs(_Lang.CaseKeywords),
		isColon: kwIs(':'),
		isFocus: kwIs('_'),
		isElse: kwIs('else'),
		isLineSplit: kwIs(_Lang.LineSplitKeywords),
		isTilde: kwIs('~'),
		isObjAssign: kwIs('. ')
	}),
	      TokenNumberLiteral = tt('TokenNumberLiteral', 'value', Number),
	      CallOnFocus = tt('CallOnFocus', 'name', String),
	      DotName = tt('DotName', 'nDots', Number, 'name', String);

	exports.Name = Name;
	exports.Group = Group;
	exports.Keyword = Keyword;
	exports.TokenNumberLiteral = TokenNumberLiteral;
	exports.CallOnFocus = CallOnFocus;
	exports.DotName = DotName;
	// toString is used by some parsing errors. Use U.inspect for a more detailed view.
	const show = _UUtil.implementMany2('show', [[CallOnFocus, function () {
		return '_';
	}], [DotName, function (_) {
		return '.'.repeat(_.nDots) + _.name;
	}], [Group, function (_) {
		return '' + _.k + '...' + _Lang.GroupOpenToClose.get(_.k);
	}], [Keyword, function (_) {
		return _.k;
	}], [TokenNumberLiteral, function (_) {
		return _.value;
	}], [Name, function (_) {
		return _.name;
	}]]);
	Object.assign(Token.prototype, {
		toString: function () {
			return _CompileError.code(show(this));
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztLQU1xQixLQUFLLFlBQUwsS0FBSzt3QkFBTCxLQUFLOzs7bUJBQUwsS0FBSzs7QUFFMUIsT0FBTSxFQUFFLEdBQUcsVUFBQyxJQUFJO29DQUFLLFVBQVU7QUFBVixhQUFVOzs7U0FBSyxNQUFLLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUUsS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQUEsQ0FBQTs7QUFFL0YsT0FBTSxHQUFHLEdBQUcsVUFBQSxDQUFDO1NBQUksVUFBQSxDQUFDO1VBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7R0FBQTtFQUFBLENBQUE7QUFDckQsT0FBTSxJQUFJLEdBQUcsVUFBQSxDQUFDO1NBQ2IsQUFBQyxDQUFDLFlBQVksR0FBRyxHQUNoQixVQUFBLENBQUM7VUFBSSxDQUFDLFlBQVksT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUFBLEdBQ3ZDLFVBQUEsQ0FBQztVQUFJLENBQUMsWUFBWSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0dBQUE7RUFBQSxDQUFBOztBQUVqQyxPQUNOLE9BQU8sR0FBRyxDQUFDO09BQ1gsU0FBUyxHQUFHLENBQUM7T0FDYixPQUFPLEdBQUcsQ0FBQztPQUNYLE9BQU8sR0FBRyxDQUFDO09BQ1gsTUFBTSxHQUFHLENBQUM7T0FDVixPQUFPLEdBQUcsQ0FBQyxDQUFBOztTQUxYLE9BQU8sR0FBUCxPQUFPO1NBQ1AsU0FBUyxHQUFULFNBQVM7U0FDVCxPQUFPLEdBQVAsT0FBTztTQUNQLE9BQU8sR0FBUCxPQUFPO1NBQ1AsTUFBTSxHQUFOLE1BQU07U0FDTixPQUFPLEdBQVAsT0FBTztBQUVELE9BQ04sSUFBSSxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztPQUNqQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDcEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQzNDO0FBQ0MsU0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDckIsUUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDbkIsVUFBUSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUM7RUFDdEIsQ0FBQztPQUNILE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN0QixFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsUUEvQlYsV0FBVyxDQStCYSxFQUMvQjtBQUNDLElBQUUsRUFBRSxJQUFJO0FBQ1IsT0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDaEIsZ0JBQWMsRUFBRSxJQUFJLE9BbkNELFlBQVksQ0FtQ0c7QUFDbEMsU0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbEIsU0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbEIsUUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDcEIsYUFBVyxFQUFFLElBQUksT0F2Q2tDLGlCQUFpQixDQXVDaEM7QUFDcEMsU0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbEIsYUFBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDdkIsQ0FBQztPQUNILGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO09BQzlELFdBQVcsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7T0FDL0MsT0FBTyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O1NBdkJ4RCxJQUFJLEdBQUosSUFBSTtTQUNKLEtBQUssR0FBTCxLQUFLO1NBT0wsT0FBTyxHQUFQLE9BQU87U0FhUCxrQkFBa0IsR0FBbEIsa0JBQWtCO1NBQ2xCLFdBQVcsR0FBWCxXQUFXO1NBQ1gsT0FBTyxHQUFQLE9BQU87O0FBR1IsT0FBTSxJQUFJLEdBQUcsT0EvQ0osY0FBYyxDQStDSyxNQUFNLEVBQUUsQ0FDbkMsQ0FBQyxXQUFXLEVBQUU7U0FBTSxHQUFHO0VBQUEsQ0FBQyxFQUN4QixDQUFDLE9BQU8sRUFBRSxVQUFBLENBQUM7U0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTtFQUFBLENBQUMsRUFDNUMsQ0FBQyxLQUFLLEVBQUUsVUFBQSxDQUFDO2NBQU8sQ0FBQyxDQUFDLENBQUMsV0FBTSxNQW5EVSxnQkFBZ0IsQ0FtRFQsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFBRSxDQUFDLEVBQ3JELENBQUMsT0FBTyxFQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQUUsU0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQUUsQ0FBRSxFQUMvQixDQUFDLGtCQUFrQixFQUFFLFVBQUEsQ0FBQztTQUFJLENBQUMsQ0FBQyxLQUFLO0VBQUEsQ0FBQyxFQUNsQyxDQUFDLElBQUksRUFBRSxVQUFBLENBQUM7U0FBSSxDQUFDLENBQUMsSUFBSTtFQUFBLENBQUMsQ0FDbkIsQ0FBQyxDQUFBO0FBQ0YsT0FBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQzlCLFVBQVEsRUFBQSxZQUFHO0FBQUUsVUFBTyxjQTFEWixJQUFJLENBMERhLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0dBQUU7RUFDdEMsQ0FBQyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IEFsbEtleXdvcmRzLCBDYXNlS2V5d29yZHMsIEdyb3VwT3BlblRvQ2xvc2UsIExpbmVTcGxpdEtleXdvcmRzIH0gZnJvbSAnLi9MYW5nJ1xuaW1wb3J0IHsgaW1wbGVtZW50TWFueTIgfSBmcm9tICcuL1UvdXRpbCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9rZW4geyB9XG5cbmNvbnN0IHR0ID0gKG5hbWUsIC4uLm5hbWVzVHlwZXMpID0+IHR1cGwobmFtZSwgVG9rZW4sICdkb2MnLCBbICdsb2MnLCBMb2MgXS5jb25jYXQobmFtZXNUeXBlcykpXG5cbmNvbnN0IGdJcyA9IGsgPT4gdCA9PiB0IGluc3RhbmNlb2YgR3JvdXAgJiYgdC5rID09PSBrXG5jb25zdCBrd0lzID0gayA9PlxuXHQoayBpbnN0YW5jZW9mIFNldCkgP1xuXHRcdHQgPT4gdCBpbnN0YW5jZW9mIEtleXdvcmQgJiYgay5oYXModC5rKSA6XG5cdFx0dCA9PiB0IGluc3RhbmNlb2YgS2V5d29yZCAmJiB0LmsgPT09IGtcblxuZXhwb3J0IGNvbnN0XG5cdEdfUGFyZW4gPSAxLFxuXHRHX0JyYWNrZXQgPSAyLFxuXHRHX0Jsb2NrID0gMyxcblx0R19RdW90ZSA9IDQsXG5cdEdfTGluZSA9IDUsXG5cdEdfU3BhY2UgPSA2XG5cbmV4cG9ydCBjb25zdFxuXHROYW1lID0gdHQoJ05hbWUnLCAnbmFtZScsIFN0cmluZyksXG5cdEdyb3VwID0gT2JqZWN0LmFzc2lnbihcblx0XHR0dCgnR3JvdXAnLCAndG9rZW5zJywgW1Rva2VuXSwgJ2snLCBOdW1iZXIpLFxuXHRcdHtcblx0XHRcdGlzQmxvY2s6IGdJcyhHX0Jsb2NrKSxcblx0XHRcdGlzTGluZTogZ0lzKEdfTGluZSksXG5cdFx0XHRpc1NwYWNlZDogZ0lzKEdfU3BhY2UpXG5cdFx0fSksXG5cdEtleXdvcmQgPSBPYmplY3QuYXNzaWduKFxuXHRcdHR0KCdLZXl3b3JkJywgJ2snLCBBbGxLZXl3b3JkcyksXG5cdFx0e1xuXHRcdFx0aXM6IGt3SXMsXG5cdFx0XHRpc0Jhcjoga3dJcygnfCcpLFxuXHRcdFx0aXNDYXNlT3JDYXNlRG86IGt3SXMoQ2FzZUtleXdvcmRzKSxcblx0XHRcdGlzQ29sb246IGt3SXMoJzonKSxcblx0XHRcdGlzRm9jdXM6IGt3SXMoJ18nKSxcblx0XHRcdGlzRWxzZToga3dJcygnZWxzZScpLFxuXHRcdFx0aXNMaW5lU3BsaXQ6IGt3SXMoTGluZVNwbGl0S2V5d29yZHMpLFxuXHRcdFx0aXNUaWxkZToga3dJcygnficpLFxuXHRcdFx0aXNPYmpBc3NpZ246IGt3SXMoJy4gJylcblx0XHR9KSxcblx0VG9rZW5OdW1iZXJMaXRlcmFsID0gdHQoJ1Rva2VuTnVtYmVyTGl0ZXJhbCcsICd2YWx1ZScsIE51bWJlciksXG5cdENhbGxPbkZvY3VzID0gdHQoJ0NhbGxPbkZvY3VzJywgJ25hbWUnLCBTdHJpbmcpLFxuXHREb3ROYW1lID0gdHQoJ0RvdE5hbWUnLCAnbkRvdHMnLCBOdW1iZXIsICduYW1lJywgU3RyaW5nKVxuXG4vLyB0b1N0cmluZyBpcyB1c2VkIGJ5IHNvbWUgcGFyc2luZyBlcnJvcnMuIFVzZSBVLmluc3BlY3QgZm9yIGEgbW9yZSBkZXRhaWxlZCB2aWV3LlxuY29uc3Qgc2hvdyA9IGltcGxlbWVudE1hbnkyKCdzaG93JywgW1xuXHRbQ2FsbE9uRm9jdXMsICgpID0+ICdfJ10sXG5cdFtEb3ROYW1lLCBfID0+ICcuJy5yZXBlYXQoXy5uRG90cykgKyBfLm5hbWVdLFxuXHRbR3JvdXAsIF8gPT4gYCR7Xy5rfS4uLiR7R3JvdXBPcGVuVG9DbG9zZS5nZXQoXy5rKX1gXSxcblx0W0tleXdvcmQsIF8gPT4geyByZXR1cm4gXy5rIH0gXSxcblx0W1Rva2VuTnVtYmVyTGl0ZXJhbCwgXyA9PiBfLnZhbHVlXSxcblx0W05hbWUsIF8gPT4gXy5uYW1lXVxuXSlcbk9iamVjdC5hc3NpZ24oVG9rZW4ucHJvdG90eXBlLCB7XG5cdHRvU3RyaW5nKCkgeyByZXR1cm4gY29kZShzaG93KHRoaXMpKSB9XG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=