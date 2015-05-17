if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../CompileError', '../language'], function (exports, _CompileError, _language) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const showChar = function (ch) {
		return (0, _CompileError.code)(String.fromCharCode(ch));
	};

	exports.showChar = showChar;
	const charPred = function (chars, negate) {
		let src = 'switch(ch) {\n';
		for (let i = 0; i < chars.length; i = i + 1) src = '' + src + 'case ' + chars.charCodeAt(i) + ': ';
		src = '' + src + ' return ' + !negate + '\ndefault: return ' + negate + '\n}';
		return Function('ch', src);
	};
	const isDigit = charPred('0123456789'),
	      isNameCharacter = charPred(_language.NonNameCharacters, true),
	      isNumberCharacter = charPred('0123456789.e');
	exports.isDigit = isDigit;
	exports.isNameCharacter = isNameCharacter;
	exports.isNumberCharacter = isNumberCharacter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC9jaGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdPLE9BQ04sUUFBUSxHQUFHLFVBQUEsRUFBRTtTQUFJLGtCQUpULElBQUksRUFJVSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQUEsQ0FBQTs7U0FBOUMsUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUNDLFFBQVEsR0FBRyxVQUFDLEtBQUssRUFBRSxNQUFNLEVBQUs7QUFDN0IsTUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUE7QUFDMUIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQzFDLEdBQUcsUUFBTSxHQUFHLGFBQVEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBSSxDQUFBO0FBQzVDLEtBQUcsUUFBTSxHQUFHLGdCQUFXLENBQUMsTUFBTSwwQkFBcUIsTUFBTSxRQUFLLENBQUE7QUFDOUQsU0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0VBQzFCLENBQUE7QUFDSyxPQUNOLE9BQU8sR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO09BQ2hDLGVBQWUsR0FBRyxRQUFRLFdBZmxCLGlCQUFpQixFQWVxQixJQUFJLENBQUM7T0FDbkQsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1NBRjVDLE9BQU8sR0FBUCxPQUFPO1NBQ1AsZUFBZSxHQUFmLGVBQWU7U0FDZixpQkFBaUIsR0FBakIsaUJBQWlCIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL2xleC9jaGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uLy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IE5vbk5hbWVDaGFyYWN0ZXJzIH0gZnJvbSAnLi4vbGFuZ3VhZ2UnXG5cbmV4cG9ydCBjb25zdFxuXHRzaG93Q2hhciA9IGNoID0+IGNvZGUoU3RyaW5nLmZyb21DaGFyQ29kZShjaCkpXG5cbmNvbnN0XG5cdGNoYXJQcmVkID0gKGNoYXJzLCBuZWdhdGUpID0+IHtcblx0XHRsZXQgc3JjID0gJ3N3aXRjaChjaCkge1xcbidcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSA9IGkgKyAxKVxuXHRcdFx0c3JjID0gYCR7c3JjfWNhc2UgJHtjaGFycy5jaGFyQ29kZUF0KGkpfTogYFxuXHRcdHNyYyA9IGAke3NyY30gcmV0dXJuICR7IW5lZ2F0ZX1cXG5kZWZhdWx0OiByZXR1cm4gJHtuZWdhdGV9XFxufWBcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ2NoJywgc3JjKVxuXHR9XG5leHBvcnQgY29uc3Rcblx0aXNEaWdpdCA9IGNoYXJQcmVkKCcwMTIzNDU2Nzg5JyksXG5cdGlzTmFtZUNoYXJhY3RlciA9IGNoYXJQcmVkKE5vbk5hbWVDaGFyYWN0ZXJzLCB0cnVlKSxcblx0aXNOdW1iZXJDaGFyYWN0ZXIgPSBjaGFyUHJlZCgnMDEyMzQ1Njc4OS5lJylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9