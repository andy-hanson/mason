if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../CompileError', '../Lang'], function (exports, _CompileError, _Lang) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const showChar = function (ch) {
		return _CompileError.code(String.fromCharCode(ch));
	};

	exports.showChar = showChar;
	const charPred = function (chars, reverse) {
		let src = 'switch(ch) {\n';
		for (let i = 0; i < chars.length; i = i + 1) src = '' + src + 'case ' + chars.charCodeAt(i) + ': ';
		const res = !reverse;
		src = '' + src + ' return ' + res + '\ndefault: return ' + !res + '\n}';
		return Function('ch', src);
	};
	const isDigit = charPred('0123456789'),
	      isNameCharacter = charPred(_Lang.NonNameCharacters, true),
	      isNumberCharacter = charPred('0123456789.e');
	exports.isDigit = isDigit;
	exports.isNameCharacter = isNameCharacter;
	exports.isNumberCharacter = isNumberCharacter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC9jaGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdPLE9BQ04sUUFBUSxHQUFHLFVBQUEsRUFBRTtTQUFJLGNBSlQsSUFBSSxDQUlVLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7RUFBQSxDQUFBOztTQUE5QyxRQUFRLEdBQVIsUUFBUTtBQUVULE9BQ0MsUUFBUSxHQUFHLFVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBSztBQUM5QixNQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQTtBQUMxQixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDMUMsR0FBRyxRQUFNLEdBQUcsYUFBUSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFJLENBQUE7QUFDNUMsUUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUE7QUFDcEIsS0FBRyxRQUFNLEdBQUcsZ0JBQVcsR0FBRywwQkFBcUIsQ0FBQyxHQUFHLFFBQUssQ0FBQTtBQUN4RCxTQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7RUFDMUIsQ0FBQTtBQUNLLE9BQ04sT0FBTyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7T0FDaEMsZUFBZSxHQUFHLFFBQVEsT0FoQmxCLGlCQUFpQixFQWdCcUIsSUFBSSxDQUFDO09BQ25ELGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQTtTQUY1QyxPQUFPLEdBQVAsT0FBTztTQUNQLGVBQWUsR0FBZixlQUFlO1NBQ2YsaUJBQWlCLEdBQWpCLGlCQUFpQiIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9sZXgvY2hhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi8uLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBOb25OYW1lQ2hhcmFjdGVycyB9IGZyb20gJy4uL0xhbmcnXG5cbmV4cG9ydCBjb25zdFxuXHRzaG93Q2hhciA9IGNoID0+IGNvZGUoU3RyaW5nLmZyb21DaGFyQ29kZShjaCkpXG5cbmNvbnN0XG5cdGNoYXJQcmVkID0gKGNoYXJzLCByZXZlcnNlKSA9PiB7XG5cdFx0bGV0IHNyYyA9ICdzd2l0Y2goY2gpIHtcXG4nXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkgPSBpICsgMSlcblx0XHRcdHNyYyA9IGAke3NyY31jYXNlICR7Y2hhcnMuY2hhckNvZGVBdChpKX06IGBcblx0XHRjb25zdCByZXMgPSAhcmV2ZXJzZVxuXHRcdHNyYyA9IGAke3NyY30gcmV0dXJuICR7cmVzfVxcbmRlZmF1bHQ6IHJldHVybiAkeyFyZXN9XFxufWBcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ2NoJywgc3JjKVxuXHR9XG5leHBvcnQgY29uc3Rcblx0aXNEaWdpdCA9IGNoYXJQcmVkKCcwMTIzNDU2Nzg5JyksXG5cdGlzTmFtZUNoYXJhY3RlciA9IGNoYXJQcmVkKE5vbk5hbWVDaGFyYWN0ZXJzLCB0cnVlKSxcblx0aXNOdW1iZXJDaGFyYWN0ZXIgPSBjaGFyUHJlZCgnMDEyMzQ1Njc4OS5lJylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9