if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './U/util'], function (exports, _UUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const isReservedName = function (name) {
		switch (name) {
			case 'for':case 'return':case 'with':
				return true;
			default:
				return false;
		}
	};

	exports.isReservedName = isReservedName;
	// TODO: Allow Opts to specify additional globals.
	const JsGlobals = (0, _UUtil.newSet)(['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function', 'JSON', 'Math', 'Number', 'Object', 'Promise', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'URIError', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'eval', 'undefined', 'Buffer', 'clearInterval', 'clearTimeout', 'console', 'global', 'setInterval', 'setTimeout']);

	exports.JsGlobals = JsGlobals;
	// Anything not explicitly reserved is a valid name character.
	// A `~` may appear in a name, but not at the beginning.
	const NonNameCharacters = '()[]{}.:|_ \n\t"`#;,';

	exports.NonNameCharacters = NonNameCharacters;
	const defaultLoopName = 'anon-loop';
	exports.defaultLoopName = defaultLoopName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0xhbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRU8sT0FBTSxjQUFjLEdBQUcsVUFBQSxJQUFJLEVBQUk7QUFDckMsVUFBUSxJQUFJO0FBQ1gsUUFBSyxLQUFLLENBQUMsQUFBQyxLQUFLLFFBQVEsQ0FBQyxBQUFDLEtBQUssTUFBTTtBQUFFLFdBQU8sSUFBSSxDQUFBO0FBQUEsQUFDbkQ7QUFBUyxXQUFPLEtBQUssQ0FBQTtBQUFBLEdBQ3JCO0VBQ0QsQ0FBQTs7U0FMWSxjQUFjLEdBQWQsY0FBYzs7QUFRcEIsT0FBTSxTQUFTLEdBQUcsV0FWaEIsTUFBTSxFQVVpQixDQUMvQixPQUFPLEVBQ1AsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxFQUNYLFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsU0FBUyxFQUNULFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsYUFBYSxFQUNiLFdBQVcsRUFDWCxVQUFVLEVBQ1YsV0FBVyxFQUNYLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixXQUFXLEVBQ1gsUUFBUSxFQUNSLGVBQWUsRUFDZixjQUFjLEVBQ2QsU0FBUyxFQUNULFFBQVEsRUFDUixhQUFhLEVBQ2IsWUFBWSxDQUNaLENBQUMsQ0FBQTs7U0FqQ1csU0FBUyxHQUFULFNBQVM7OztBQXFDZixPQUFNLGlCQUFpQixHQUFHLHNCQUFzQixDQUFBOztTQUExQyxpQkFBaUIsR0FBakIsaUJBQWlCO0FBRXZCLE9BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQTtTQUE3QixlQUFlLEdBQWYsZUFBZSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9MYW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmV3U2V0IH0gZnJvbSAnLi9VL3V0aWwnXG5cbmV4cG9ydCBjb25zdCBpc1Jlc2VydmVkTmFtZSA9IG5hbWUgPT4ge1xuXHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRjYXNlICdmb3InOiBjYXNlICdyZXR1cm4nOiBjYXNlICd3aXRoJzogcmV0dXJuIHRydWVcblx0XHRkZWZhdWx0OiByZXR1cm4gZmFsc2Vcblx0fVxufVxuXG4vLyBUT0RPOiBBbGxvdyBPcHRzIHRvIHNwZWNpZnkgYWRkaXRpb25hbCBnbG9iYWxzLlxuZXhwb3J0IGNvbnN0IEpzR2xvYmFscyA9IG5ld1NldChbXG5cdCdBcnJheScsXG5cdCdCb29sZWFuJyxcblx0J0RhdGUnLFxuXHQnRXJyb3InLFxuXHQnRXZhbEVycm9yJyxcblx0J0Z1bmN0aW9uJyxcblx0J0pTT04nLFxuXHQnTWF0aCcsXG5cdCdOdW1iZXInLFxuXHQnT2JqZWN0Jyxcblx0J1Byb21pc2UnLFxuXHQnUmFuZ2VFcnJvcicsXG5cdCdSZWZlcmVuY2VFcnJvcicsXG5cdCdSZWdFeHAnLFxuXHQnU3RyaW5nJyxcblx0J1N5bWJvbCcsXG5cdCdTeW50YXhFcnJvcicsXG5cdCdUeXBlRXJyb3InLFxuXHQnVVJJRXJyb3InLFxuXHQnZGVjb2RlVVJJJyxcblx0J2RlY29kZVVSSUNvbXBvbmVudCcsXG5cdCdlbmNvZGVVUkknLFxuXHQnZW5jb2RlVVJJQ29tcG9uZW50Jyxcblx0J2V2YWwnLFxuXHQndW5kZWZpbmVkJyxcblx0J0J1ZmZlcicsXG5cdCdjbGVhckludGVydmFsJyxcblx0J2NsZWFyVGltZW91dCcsXG5cdCdjb25zb2xlJyxcblx0J2dsb2JhbCcsXG5cdCdzZXRJbnRlcnZhbCcsXG5cdCdzZXRUaW1lb3V0J1xuXSlcblxuLy8gQW55dGhpbmcgbm90IGV4cGxpY2l0bHkgcmVzZXJ2ZWQgaXMgYSB2YWxpZCBuYW1lIGNoYXJhY3Rlci5cbi8vIEEgYH5gIG1heSBhcHBlYXIgaW4gYSBuYW1lLCBidXQgbm90IGF0IHRoZSBiZWdpbm5pbmcuXG5leHBvcnQgY29uc3QgTm9uTmFtZUNoYXJhY3RlcnMgPSAnKClbXXt9Ljp8XyBcXG5cXHRcImAjOywnXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0TG9vcE5hbWUgPSAnYW5vbi1sb29wJ1xuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=