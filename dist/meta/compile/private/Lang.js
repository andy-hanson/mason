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
	const JsGlobals = _UUtil.newSet(['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function', 'JSON', 'Math', 'Number', 'Object', 'Promise', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'URIError', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'eval', 'undefined', 'Buffer', 'clearInterval', 'clearTimeout', 'console', 'global', 'setInterval', 'setTimeout',
	// Not really globals, but it works out that way.
	'false', 'true', 'null']);

	exports.JsGlobals = JsGlobals;
	// Anything not explicitly reserved is a valid name character.
	// A `~` may appear in a name, but not at the beginning.
	const NonNameCharacters = '()[]{}.:|_ \n\t"`#;,';

	exports.NonNameCharacters = NonNameCharacters;
	const defaultLoopName = 'anon-loop';
	exports.defaultLoopName = defaultLoopName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0xhbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRU8sT0FBTSxjQUFjLEdBQUcsVUFBQSxJQUFJO1NBQ2pDLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLFFBQVE7RUFBQSxDQUFBOztTQUR2QixjQUFjLEdBQWQsY0FBYzs7QUFJcEIsT0FBTSxTQUFTLEdBQUcsT0FOaEIsTUFBTSxDQU1pQixDQUMvQixPQUFPLEVBQ1AsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxFQUNYLFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsU0FBUyxFQUNULFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsYUFBYSxFQUNiLFdBQVcsRUFDWCxVQUFVLEVBQ1YsV0FBVyxFQUNYLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixXQUFXLEVBQ1gsUUFBUSxFQUNSLGVBQWUsRUFDZixjQUFjLEVBQ2QsU0FBUyxFQUNULFFBQVEsRUFDUixhQUFhLEVBQ2IsWUFBWTs7QUFFWixRQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FDdkIsQ0FBQyxDQUFBOztTQW5DVyxTQUFTLEdBQVQsU0FBUzs7O0FBdUNmLE9BQU0saUJBQWlCLEdBQUcsc0JBQXNCLENBQUE7O1NBQTFDLGlCQUFpQixHQUFqQixpQkFBaUI7QUFFdkIsT0FBTSxlQUFlLEdBQUcsV0FBVyxDQUFBO1NBQTdCLGVBQWUsR0FBZixlQUFlIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL0xhbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBuZXdTZXQgfSBmcm9tICcuL1UvdXRpbCdcblxuZXhwb3J0IGNvbnN0IGlzUmVzZXJ2ZWROYW1lID0gbmFtZSA9PlxuXHRuYW1lID09PSAnZm9yJyB8fCBuYW1lID09PSAncmV0dXJuJ1xuXG4vLyBUT0RPOiBBbGxvdyBPcHRzIHRvIHNwZWNpZnkgYWRkaXRpb25hbCBnbG9iYWxzLlxuZXhwb3J0IGNvbnN0IEpzR2xvYmFscyA9IG5ld1NldChbXG5cdCdBcnJheScsXG5cdCdCb29sZWFuJyxcblx0J0RhdGUnLFxuXHQnRXJyb3InLFxuXHQnRXZhbEVycm9yJyxcblx0J0Z1bmN0aW9uJyxcblx0J0pTT04nLFxuXHQnTWF0aCcsXG5cdCdOdW1iZXInLFxuXHQnT2JqZWN0Jyxcblx0J1Byb21pc2UnLFxuXHQnUmFuZ2VFcnJvcicsXG5cdCdSZWZlcmVuY2VFcnJvcicsXG5cdCdSZWdFeHAnLFxuXHQnU3RyaW5nJyxcblx0J1N5bWJvbCcsXG5cdCdTeW50YXhFcnJvcicsXG5cdCdUeXBlRXJyb3InLFxuXHQnVVJJRXJyb3InLFxuXHQnZGVjb2RlVVJJJyxcblx0J2RlY29kZVVSSUNvbXBvbmVudCcsXG5cdCdlbmNvZGVVUkknLFxuXHQnZW5jb2RlVVJJQ29tcG9uZW50Jyxcblx0J2V2YWwnLFxuXHQndW5kZWZpbmVkJyxcblx0J0J1ZmZlcicsXG5cdCdjbGVhckludGVydmFsJyxcblx0J2NsZWFyVGltZW91dCcsXG5cdCdjb25zb2xlJyxcblx0J2dsb2JhbCcsXG5cdCdzZXRJbnRlcnZhbCcsXG5cdCdzZXRUaW1lb3V0Jyxcblx0Ly8gTm90IHJlYWxseSBnbG9iYWxzLCBidXQgaXQgd29ya3Mgb3V0IHRoYXQgd2F5LlxuXHQnZmFsc2UnLCAndHJ1ZScsICdudWxsJ1xuXSlcblxuLy8gQW55dGhpbmcgbm90IGV4cGxpY2l0bHkgcmVzZXJ2ZWQgaXMgYSB2YWxpZCBuYW1lIGNoYXJhY3Rlci5cbi8vIEEgYH5gIG1heSBhcHBlYXIgaW4gYSBuYW1lLCBidXQgbm90IGF0IHRoZSBiZWdpbm5pbmcuXG5leHBvcnQgY29uc3QgTm9uTmFtZUNoYXJhY3RlcnMgPSAnKClbXXt9Ljp8XyBcXG5cXHRcImAjOywnXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0TG9vcE5hbWUgPSAnYW5vbi1sb29wJ1xuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=