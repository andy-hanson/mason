if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../CompileError', '../Lang'], function (exports, _CompileError, _Lang) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const showChar = function (ch) {
		return (0, _CompileError.code)(String.fromCharCode(ch));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC9jaGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdPLE9BQ04sUUFBUSxHQUFHLFVBQUEsRUFBRTtTQUFJLGtCQUpULElBQUksRUFJVSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQUEsQ0FBQTs7U0FBOUMsUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUNDLFFBQVEsR0FBRyxVQUFDLEtBQUssRUFBRSxPQUFPLEVBQUs7QUFDOUIsTUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUE7QUFDMUIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQzFDLEdBQUcsUUFBTSxHQUFHLGFBQVEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBSSxDQUFBO0FBQzVDLFFBQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFBO0FBQ3BCLEtBQUcsUUFBTSxHQUFHLGdCQUFXLEdBQUcsMEJBQXFCLENBQUMsR0FBRyxRQUFLLENBQUE7QUFDeEQsU0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0VBQzFCLENBQUE7QUFDSyxPQUNOLE9BQU8sR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO09BQ2hDLGVBQWUsR0FBRyxRQUFRLE9BaEJsQixpQkFBaUIsRUFnQnFCLElBQUksQ0FBQztPQUNuRCxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUE7U0FGNUMsT0FBTyxHQUFQLE9BQU87U0FDUCxlQUFlLEdBQWYsZUFBZTtTQUNmLGlCQUFpQixHQUFqQixpQkFBaUIiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvbGV4L2NoYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgTm9uTmFtZUNoYXJhY3RlcnMgfSBmcm9tICcuLi9MYW5nJ1xuXG5leHBvcnQgY29uc3Rcblx0c2hvd0NoYXIgPSBjaCA9PiBjb2RlKFN0cmluZy5mcm9tQ2hhckNvZGUoY2gpKVxuXG5jb25zdFxuXHRjaGFyUHJlZCA9IChjaGFycywgcmV2ZXJzZSkgPT4ge1xuXHRcdGxldCBzcmMgPSAnc3dpdGNoKGNoKSB7XFxuJ1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpID0gaSArIDEpXG5cdFx0XHRzcmMgPSBgJHtzcmN9Y2FzZSAke2NoYXJzLmNoYXJDb2RlQXQoaSl9OiBgXG5cdFx0Y29uc3QgcmVzID0gIXJldmVyc2Vcblx0XHRzcmMgPSBgJHtzcmN9IHJldHVybiAke3Jlc31cXG5kZWZhdWx0OiByZXR1cm4gJHshcmVzfVxcbn1gXG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdjaCcsIHNyYylcblx0fVxuZXhwb3J0IGNvbnN0XG5cdGlzRGlnaXQgPSBjaGFyUHJlZCgnMDEyMzQ1Njc4OScpLFxuXHRpc05hbWVDaGFyYWN0ZXIgPSBjaGFyUHJlZChOb25OYW1lQ2hhcmFjdGVycywgdHJ1ZSksXG5cdGlzTnVtYmVyQ2hhcmFjdGVyID0gY2hhclByZWQoJzAxMjM0NTY3ODkuZScpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==