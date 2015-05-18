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
	const ReservedCharacters = '`#%^&\\;,';
	const NonNameCharacters = '()[]{}.:|_ \n\t"' + ReservedCharacters;

	exports.NonNameCharacters = NonNameCharacters;
	const defaultLoopName = 'anon-loop';
	exports.defaultLoopName = defaultLoopName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xhbmd1YWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVPLE9BQU0sY0FBYyxHQUFHLFVBQUEsSUFBSSxFQUFJO0FBQ3JDLFVBQVEsSUFBSTtBQUNYLFFBQUssS0FBSyxDQUFDLEFBQUMsS0FBSyxJQUFJLENBQUMsQUFBQyxLQUFLLFFBQVEsQ0FBQyxBQUFDLEtBQUssTUFBTTtBQUFFLFdBQU8sSUFBSSxDQUFBO0FBQUEsQUFDOUQ7QUFBUyxXQUFPLEtBQUssQ0FBQTtBQUFBLEdBQ3JCO0VBQ0QsQ0FBQTs7U0FMWSxjQUFjLEdBQWQsY0FBYzs7QUFRcEIsT0FBTSxTQUFTLEdBQUcsVUFWaEIsTUFBTSxFQVVpQixDQUMvQixPQUFPLEVBQ1AsU0FBUyxFQUNULFFBQVEsRUFDUixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsRUFDWCxVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFFBQVEsRUFDUixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLGFBQWEsRUFDYixXQUFXLEVBQ1gsVUFBVTs7Ozs7O0VBTVYsQ0FBQyxDQUFBOztTQTFCVyxTQUFTLEdBQVQsU0FBUzs7O0FBOEJ0QixPQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FBQTtBQUMvQixPQUFNLGlCQUFpQixHQUFHLGtCQUFrQixHQUFHLGtCQUFrQixDQUFBOztTQUEzRCxpQkFBaUIsR0FBakIsaUJBQWlCO0FBRXZCLE9BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQTtTQUE3QixlQUFlLEdBQWYsZUFBZSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9sYW5ndWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5ld1NldCB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGNvbnN0IGlzUmVzZXJ2ZWROYW1lID0gbmFtZSA9PiB7XG5cdHN3aXRjaCAobmFtZSkge1xuXHRcdGNhc2UgJ2Zvcic6IGNhc2UgJ29mJzogY2FzZSAncmV0dXJuJzogY2FzZSAnd2l0aCc6IHJldHVybiB0cnVlXG5cdFx0ZGVmYXVsdDogcmV0dXJuIGZhbHNlXG5cdH1cbn1cblxuLy8gVE9ETzogQWxsb3cgT3B0cyB0byBzcGVjaWZ5IGFkZGl0aW9uYWwgZ2xvYmFscy5cbmV4cG9ydCBjb25zdCBKc0dsb2JhbHMgPSBuZXdTZXQoW1xuXHQnQXJyYXknLFxuXHQnQm9vbGVhbicsXG5cdCdCdWZmZXInLFxuXHQnRGF0ZScsXG5cdCdFcnJvcicsXG5cdCdFdmFsRXJyb3InLFxuXHQnRnVuY3Rpb24nLFxuXHQnZ2xvYmFsJyxcblx0J0pTT04nLFxuXHQnTWF0aCcsXG5cdCdOdW1iZXInLFxuXHQnT2JqZWN0Jyxcblx0J1JhbmdlRXJyb3InLFxuXHQnUmVmZXJlbmNlRXJyb3InLFxuXHQnUmVnRXhwJyxcblx0J1N0cmluZycsXG5cdCdTeW1ib2wnLFxuXHQnU3ludGF4RXJyb3InLFxuXHQnVHlwZUVycm9yJyxcblx0J1VSSUVycm9yJ1xuXHQvLyAnU2V0JyBhbmQgJ01hcCcgY29uZmxpY3Qgd2l0aCBtYXNvbidzIHZlcnNpb25zLlxuXHQvLyAnUHJvbWlzZSc6IFVzZSAnJCcgaW5zdGVhZC5cblx0Ly8gRm9yIGZvbGxvd2luZywganVzdCB1c2UgYGdsb2JhbC54eHhgLlxuXHQvLyAnY2xlYXJJbnRlcnZhbCcsICdjbGVhclRpbWVvdXQnLCAnY29uc29sZScsICdkZWNvZGVVUkknLCAnZGVjb2RlVVJJQ29tcG9uZW50Jyxcblx0Ly8gJ2VuY29kZVVSSScsICdlbmNvZGVVUklDb21wb25lbnQnLCAnZXZhbCcsICdzZXRJbnRlcnZhbCcsICdzZXRUaW1lb3V0J1xuXSlcblxuLy8gQW55dGhpbmcgbm90IGV4cGxpY2l0bHkgcmVzZXJ2ZWQgaXMgYSB2YWxpZCBuYW1lIGNoYXJhY3Rlci5cbi8vIEEgYH5gIG1heSBhcHBlYXIgaW4gYSBuYW1lLCBidXQgbm90IGF0IHRoZSBiZWdpbm5pbmcuXG5jb25zdCBSZXNlcnZlZENoYXJhY3RlcnMgPSAnYCMlXiZcXFxcOywnXG5leHBvcnQgY29uc3QgTm9uTmFtZUNoYXJhY3RlcnMgPSAnKClbXXt9Ljp8XyBcXG5cXHRcIicgKyBSZXNlcnZlZENoYXJhY3RlcnNcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMb29wTmFtZSA9ICdhbm9uLWxvb3AnXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==