if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	// TODO: Allow Opts to specify additional globals.
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const JsGlobals = new Set(['Array', 'Boolean', 'Buffer', 'console', 'Date', 'Error', 'EvalError', 'Function', 'global', 'JSON', 'Math', 'Number', 'Object', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'URIError'
	// 'Set' and 'Map' conflict with mason's versions.
	// 'Promise': Use '$' instead.
	// For following, just use `global.xxx`.
	// 'clearInterval', 'clearTimeout', 'console', 'decodeURI', 'decodeURIComponent',
	// 'encodeURI', 'encodeURIComponent', 'eval', 'setInterval', 'setTimeout'
	]);

	exports.JsGlobals = JsGlobals;
	// Anything not explicitly reserved is a valid name character.
	// A `~` may appear in a name, but not at the beginning.
	const ReservedCharacters = '`#%^&\\;,';
	const NonNameCharacters = '()[]{}.:|_ \n\t"' + ReservedCharacters;
	exports.NonNameCharacters = NonNameCharacters;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xhbmd1YWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDTyxPQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUNoQyxPQUFPLEVBQ1AsU0FBUyxFQUNULFFBQVEsRUFDUixTQUFTLEVBQ1QsTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEVBQ1gsVUFBVSxFQUNWLFFBQVEsRUFDUixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixhQUFhLEVBQ2IsV0FBVyxFQUNYLFVBQVU7Ozs7OztFQU1WLENBQUMsQ0FBQTs7Ozs7QUFJRixPQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FBQTtBQUMvQixPQUFNLGlCQUFpQixHQUFHLGtCQUFrQixHQUFHLGtCQUFrQixDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL2xhbmd1YWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogQWxsb3cgT3B0cyB0byBzcGVjaWZ5IGFkZGl0aW9uYWwgZ2xvYmFscy5cbmV4cG9ydCBjb25zdCBKc0dsb2JhbHMgPSBuZXcgU2V0KFtcblx0J0FycmF5Jyxcblx0J0Jvb2xlYW4nLFxuXHQnQnVmZmVyJyxcblx0J2NvbnNvbGUnLFxuXHQnRGF0ZScsXG5cdCdFcnJvcicsXG5cdCdFdmFsRXJyb3InLFxuXHQnRnVuY3Rpb24nLFxuXHQnZ2xvYmFsJyxcblx0J0pTT04nLFxuXHQnTWF0aCcsXG5cdCdOdW1iZXInLFxuXHQnT2JqZWN0Jyxcblx0J1JhbmdlRXJyb3InLFxuXHQnUmVmZXJlbmNlRXJyb3InLFxuXHQnUmVnRXhwJyxcblx0J1N0cmluZycsXG5cdCdTeW1ib2wnLFxuXHQnU3ludGF4RXJyb3InLFxuXHQnVHlwZUVycm9yJyxcblx0J1VSSUVycm9yJ1xuXHQvLyAnU2V0JyBhbmQgJ01hcCcgY29uZmxpY3Qgd2l0aCBtYXNvbidzIHZlcnNpb25zLlxuXHQvLyAnUHJvbWlzZSc6IFVzZSAnJCcgaW5zdGVhZC5cblx0Ly8gRm9yIGZvbGxvd2luZywganVzdCB1c2UgYGdsb2JhbC54eHhgLlxuXHQvLyAnY2xlYXJJbnRlcnZhbCcsICdjbGVhclRpbWVvdXQnLCAnY29uc29sZScsICdkZWNvZGVVUkknLCAnZGVjb2RlVVJJQ29tcG9uZW50Jyxcblx0Ly8gJ2VuY29kZVVSSScsICdlbmNvZGVVUklDb21wb25lbnQnLCAnZXZhbCcsICdzZXRJbnRlcnZhbCcsICdzZXRUaW1lb3V0J1xuXSlcblxuLy8gQW55dGhpbmcgbm90IGV4cGxpY2l0bHkgcmVzZXJ2ZWQgaXMgYSB2YWxpZCBuYW1lIGNoYXJhY3Rlci5cbi8vIEEgYH5gIG1heSBhcHBlYXIgaW4gYSBuYW1lLCBidXQgbm90IGF0IHRoZSBiZWdpbm5pbmcuXG5jb25zdCBSZXNlcnZlZENoYXJhY3RlcnMgPSAnYCMlXiZcXFxcOywnXG5leHBvcnQgY29uc3QgTm9uTmFtZUNoYXJhY3RlcnMgPSAnKClbXXt9Ljp8XyBcXG5cXHRcIicgKyBSZXNlcnZlZENoYXJhY3RlcnNcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9