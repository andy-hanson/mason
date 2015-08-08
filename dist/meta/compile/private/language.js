if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	// TODO: Allow Opts to specify additional globals.
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const JsGlobals = new Set(['Array', 'Boolean', 'Buffer', 'console', 'Date', 'Error', 'EvalError', 'Function', 'global', 'JSON', 'Math', 'Number', 'Object', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'URIError',

	// Web ones
	// TODO: web only
	'document', 'window'

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xhbmd1YWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDTyxPQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUNoQyxPQUFPLEVBQ1AsU0FBUyxFQUNULFFBQVEsRUFDUixTQUFTLEVBQ1QsTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEVBQ1gsVUFBVSxFQUNWLFFBQVEsRUFDUixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixhQUFhLEVBQ2IsV0FBVyxFQUNYLFVBQVU7Ozs7QUFJVixXQUFVLEVBQ1YsUUFBUTs7Ozs7OztFQU9SLENBQUMsQ0FBQTs7Ozs7QUFJRixPQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FBQTtBQUMvQixPQUFNLGlCQUFpQixHQUFHLGtCQUFrQixHQUFHLGtCQUFrQixDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL2xhbmd1YWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogQWxsb3cgT3B0cyB0byBzcGVjaWZ5IGFkZGl0aW9uYWwgZ2xvYmFscy5cbmV4cG9ydCBjb25zdCBKc0dsb2JhbHMgPSBuZXcgU2V0KFtcblx0J0FycmF5Jyxcblx0J0Jvb2xlYW4nLFxuXHQnQnVmZmVyJyxcblx0J2NvbnNvbGUnLFxuXHQnRGF0ZScsXG5cdCdFcnJvcicsXG5cdCdFdmFsRXJyb3InLFxuXHQnRnVuY3Rpb24nLFxuXHQnZ2xvYmFsJyxcblx0J0pTT04nLFxuXHQnTWF0aCcsXG5cdCdOdW1iZXInLFxuXHQnT2JqZWN0Jyxcblx0J1JhbmdlRXJyb3InLFxuXHQnUmVmZXJlbmNlRXJyb3InLFxuXHQnUmVnRXhwJyxcblx0J1N0cmluZycsXG5cdCdTeW1ib2wnLFxuXHQnU3ludGF4RXJyb3InLFxuXHQnVHlwZUVycm9yJyxcblx0J1VSSUVycm9yJyxcblxuXHQvLyBXZWIgb25lc1xuXHQvLyBUT0RPOiB3ZWIgb25seVxuXHQnZG9jdW1lbnQnLFxuXHQnd2luZG93J1xuXG5cdC8vICdTZXQnIGFuZCAnTWFwJyBjb25mbGljdCB3aXRoIG1hc29uJ3MgdmVyc2lvbnMuXG5cdC8vICdQcm9taXNlJzogVXNlICckJyBpbnN0ZWFkLlxuXHQvLyBGb3IgZm9sbG93aW5nLCBqdXN0IHVzZSBgZ2xvYmFsLnh4eGAuXG5cdC8vICdjbGVhckludGVydmFsJywgJ2NsZWFyVGltZW91dCcsICdjb25zb2xlJywgJ2RlY29kZVVSSScsICdkZWNvZGVVUklDb21wb25lbnQnLFxuXHQvLyAnZW5jb2RlVVJJJywgJ2VuY29kZVVSSUNvbXBvbmVudCcsICdldmFsJywgJ3NldEludGVydmFsJywgJ3NldFRpbWVvdXQnXG5dKVxuXG4vLyBBbnl0aGluZyBub3QgZXhwbGljaXRseSByZXNlcnZlZCBpcyBhIHZhbGlkIG5hbWUgY2hhcmFjdGVyLlxuLy8gQSBgfmAgbWF5IGFwcGVhciBpbiBhIG5hbWUsIGJ1dCBub3QgYXQgdGhlIGJlZ2lubmluZy5cbmNvbnN0IFJlc2VydmVkQ2hhcmFjdGVycyA9ICdgIyVeJlxcXFw7LCdcbmV4cG9ydCBjb25zdCBOb25OYW1lQ2hhcmFjdGVycyA9ICcoKVtde30uOnxfIFxcblxcdFwiJyArIFJlc2VydmVkQ2hhcmFjdGVyc1xuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=