if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './U/util'], function (exports, _UUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const isReservedName = function (name) {
		return name === 'for' || name === 'return';
	};

	exports.isReservedName = isReservedName;
	// TODO: Allow Opts to specify additional globals.
	const JsGlobals = _UUtil.newSet(['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function', 'JSON', 'Math', 'Number', 'Object', 'Promise', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'URIError', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'eval', 'undefined', 'Buffer', 'clearInterval', 'clearTimeout', 'console', 'global', 'setInterval', 'setTimeout']);

	exports.JsGlobals = JsGlobals;
	// Anything not explicitly reserved is a valid name character.
	// A `~` may appear in a name, but not at the beginning.
	const NonNameCharacters = '()[]{}.:|_ \n\t"`#;,';

	exports.NonNameCharacters = NonNameCharacters;
	const defaultLoopName = 'anon-loop';
	exports.defaultLoopName = defaultLoopName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0xhbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRU8sT0FBTSxjQUFjLEdBQUcsVUFBQSxJQUFJO1NBQ2pDLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLFFBQVE7RUFBQSxDQUFBOztTQUR2QixjQUFjLEdBQWQsY0FBYzs7QUFJcEIsT0FBTSxTQUFTLEdBQUcsT0FOaEIsTUFBTSxDQU1pQixDQUMvQixPQUFPLEVBQ1AsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxFQUNYLFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsU0FBUyxFQUNULFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsYUFBYSxFQUNiLFdBQVcsRUFDWCxVQUFVLEVBQ1YsV0FBVyxFQUNYLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixXQUFXLEVBQ1gsUUFBUSxFQUNSLGVBQWUsRUFDZixjQUFjLEVBQ2QsU0FBUyxFQUNULFFBQVEsRUFDUixhQUFhLEVBQ2IsWUFBWSxDQUNaLENBQUMsQ0FBQTs7U0FqQ1csU0FBUyxHQUFULFNBQVM7OztBQXFDZixPQUFNLGlCQUFpQixHQUFHLHNCQUFzQixDQUFBOztTQUExQyxpQkFBaUIsR0FBakIsaUJBQWlCO0FBRXZCLE9BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQTtTQUE3QixlQUFlLEdBQWYsZUFBZSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9MYW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmV3U2V0IH0gZnJvbSAnLi9VL3V0aWwnXG5cbmV4cG9ydCBjb25zdCBpc1Jlc2VydmVkTmFtZSA9IG5hbWUgPT5cblx0bmFtZSA9PT0gJ2ZvcicgfHwgbmFtZSA9PT0gJ3JldHVybidcblxuLy8gVE9ETzogQWxsb3cgT3B0cyB0byBzcGVjaWZ5IGFkZGl0aW9uYWwgZ2xvYmFscy5cbmV4cG9ydCBjb25zdCBKc0dsb2JhbHMgPSBuZXdTZXQoW1xuXHQnQXJyYXknLFxuXHQnQm9vbGVhbicsXG5cdCdEYXRlJyxcblx0J0Vycm9yJyxcblx0J0V2YWxFcnJvcicsXG5cdCdGdW5jdGlvbicsXG5cdCdKU09OJyxcblx0J01hdGgnLFxuXHQnTnVtYmVyJyxcblx0J09iamVjdCcsXG5cdCdQcm9taXNlJyxcblx0J1JhbmdlRXJyb3InLFxuXHQnUmVmZXJlbmNlRXJyb3InLFxuXHQnUmVnRXhwJyxcblx0J1N0cmluZycsXG5cdCdTeW1ib2wnLFxuXHQnU3ludGF4RXJyb3InLFxuXHQnVHlwZUVycm9yJyxcblx0J1VSSUVycm9yJyxcblx0J2RlY29kZVVSSScsXG5cdCdkZWNvZGVVUklDb21wb25lbnQnLFxuXHQnZW5jb2RlVVJJJyxcblx0J2VuY29kZVVSSUNvbXBvbmVudCcsXG5cdCdldmFsJyxcblx0J3VuZGVmaW5lZCcsXG5cdCdCdWZmZXInLFxuXHQnY2xlYXJJbnRlcnZhbCcsXG5cdCdjbGVhclRpbWVvdXQnLFxuXHQnY29uc29sZScsXG5cdCdnbG9iYWwnLFxuXHQnc2V0SW50ZXJ2YWwnLFxuXHQnc2V0VGltZW91dCdcbl0pXG5cbi8vIEFueXRoaW5nIG5vdCBleHBsaWNpdGx5IHJlc2VydmVkIGlzIGEgdmFsaWQgbmFtZSBjaGFyYWN0ZXIuXG4vLyBBIGB+YCBtYXkgYXBwZWFyIGluIGEgbmFtZSwgYnV0IG5vdCBhdCB0aGUgYmVnaW5uaW5nLlxuZXhwb3J0IGNvbnN0IE5vbk5hbWVDaGFyYWN0ZXJzID0gJygpW117fS46fF8gXFxuXFx0XCJgIzssJ1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdExvb3BOYW1lID0gJ2Fub24tbG9vcCdcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9