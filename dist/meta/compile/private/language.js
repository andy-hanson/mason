if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './util'], function (exports, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const isReservedName = function (name) {
		switch (name) {
			case 'for':case 'of':case 'return':case 'with':
				return true;
			default:
				return false;
		}
	};

	exports.isReservedName = isReservedName;
	// TODO: Allow Opts to specify additional globals.
	const JsGlobals = (0, _util.newSet)(['Array', 'Boolean', 'Buffer', 'Date', 'Error', 'EvalError', 'Function', 'global', 'JSON', 'Math', 'Number', 'Object', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'URIError'
	// 'Set' and 'Map' conflict with mason's versions.
	// 'Promise': Use '$' instead.
	// For following, just use `global.xxx`.
	// 'clearInterval', 'clearTimeout', 'console', 'decodeURI', 'decodeURIComponent',
	// 'encodeURI', 'encodeURIComponent', 'eval', 'setInterval', 'setTimeout'
	]);

	exports.JsGlobals = JsGlobals;
	// Anything not explicitly reserved is a valid name character.
	// A `~` may appear in a name, but not at the beginning.
	const NonNameCharacters = '()[]{}.:|_ \n\t"`#;,';

	exports.NonNameCharacters = NonNameCharacters;
	const defaultLoopName = 'anon-loop';
	exports.defaultLoopName = defaultLoopName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xhbmd1YWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVPLE9BQU0sY0FBYyxHQUFHLFVBQUEsSUFBSSxFQUFJO0FBQ3JDLFVBQVEsSUFBSTtBQUNYLFFBQUssS0FBSyxDQUFDLEFBQUMsS0FBSyxJQUFJLENBQUMsQUFBQyxLQUFLLFFBQVEsQ0FBQyxBQUFDLEtBQUssTUFBTTtBQUFFLFdBQU8sSUFBSSxDQUFBO0FBQUEsQUFDOUQ7QUFBUyxXQUFPLEtBQUssQ0FBQTtBQUFBLEdBQ3JCO0VBQ0QsQ0FBQTs7U0FMWSxjQUFjLEdBQWQsY0FBYzs7QUFRcEIsT0FBTSxTQUFTLEdBQUcsVUFWaEIsTUFBTSxFQVVpQixDQUMvQixPQUFPLEVBQ1AsU0FBUyxFQUNULFFBQVEsRUFDUixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsRUFDWCxVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFFBQVEsRUFDUixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLGFBQWEsRUFDYixXQUFXLEVBQ1gsVUFBVTs7Ozs7O0VBTVYsQ0FBQyxDQUFBOztTQTFCVyxTQUFTLEdBQVQsU0FBUzs7O0FBOEJmLE9BQU0saUJBQWlCLEdBQUcsc0JBQXNCLENBQUE7O1NBQTFDLGlCQUFpQixHQUFqQixpQkFBaUI7QUFFdkIsT0FBTSxlQUFlLEdBQUcsV0FBVyxDQUFBO1NBQTdCLGVBQWUsR0FBZixlQUFlIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL2xhbmd1YWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmV3U2V0IH0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgY29uc3QgaXNSZXNlcnZlZE5hbWUgPSBuYW1lID0+IHtcblx0c3dpdGNoIChuYW1lKSB7XG5cdFx0Y2FzZSAnZm9yJzogY2FzZSAnb2YnOiBjYXNlICdyZXR1cm4nOiBjYXNlICd3aXRoJzogcmV0dXJuIHRydWVcblx0XHRkZWZhdWx0OiByZXR1cm4gZmFsc2Vcblx0fVxufVxuXG4vLyBUT0RPOiBBbGxvdyBPcHRzIHRvIHNwZWNpZnkgYWRkaXRpb25hbCBnbG9iYWxzLlxuZXhwb3J0IGNvbnN0IEpzR2xvYmFscyA9IG5ld1NldChbXG5cdCdBcnJheScsXG5cdCdCb29sZWFuJyxcblx0J0J1ZmZlcicsXG5cdCdEYXRlJyxcblx0J0Vycm9yJyxcblx0J0V2YWxFcnJvcicsXG5cdCdGdW5jdGlvbicsXG5cdCdnbG9iYWwnLFxuXHQnSlNPTicsXG5cdCdNYXRoJyxcblx0J051bWJlcicsXG5cdCdPYmplY3QnLFxuXHQnUmFuZ2VFcnJvcicsXG5cdCdSZWZlcmVuY2VFcnJvcicsXG5cdCdSZWdFeHAnLFxuXHQnU3RyaW5nJyxcblx0J1N5bWJvbCcsXG5cdCdTeW50YXhFcnJvcicsXG5cdCdUeXBlRXJyb3InLFxuXHQnVVJJRXJyb3InXG5cdC8vICdTZXQnIGFuZCAnTWFwJyBjb25mbGljdCB3aXRoIG1hc29uJ3MgdmVyc2lvbnMuXG5cdC8vICdQcm9taXNlJzogVXNlICckJyBpbnN0ZWFkLlxuXHQvLyBGb3IgZm9sbG93aW5nLCBqdXN0IHVzZSBgZ2xvYmFsLnh4eGAuXG5cdC8vICdjbGVhckludGVydmFsJywgJ2NsZWFyVGltZW91dCcsICdjb25zb2xlJywgJ2RlY29kZVVSSScsICdkZWNvZGVVUklDb21wb25lbnQnLFxuXHQvLyAnZW5jb2RlVVJJJywgJ2VuY29kZVVSSUNvbXBvbmVudCcsICdldmFsJywgJ3NldEludGVydmFsJywgJ3NldFRpbWVvdXQnXG5dKVxuXG4vLyBBbnl0aGluZyBub3QgZXhwbGljaXRseSByZXNlcnZlZCBpcyBhIHZhbGlkIG5hbWUgY2hhcmFjdGVyLlxuLy8gQSBgfmAgbWF5IGFwcGVhciBpbiBhIG5hbWUsIGJ1dCBub3QgYXQgdGhlIGJlZ2lubmluZy5cbmV4cG9ydCBjb25zdCBOb25OYW1lQ2hhcmFjdGVycyA9ICcoKVtde30uOnxfIFxcblxcdFwiYCM7LCdcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMb29wTmFtZSA9ICdhbm9uLWxvb3AnXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==