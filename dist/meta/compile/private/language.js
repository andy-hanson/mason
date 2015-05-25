if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './util'], function (exports, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xhbmd1YWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR08sT0FBTSxTQUFTLEdBQUcsVUFIaEIsTUFBTSxFQUdpQixDQUMvQixPQUFPLEVBQ1AsU0FBUyxFQUNULFFBQVEsRUFDUixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsRUFDWCxVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFFBQVEsRUFDUixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLGFBQWEsRUFDYixXQUFXLEVBQ1gsVUFBVTs7Ozs7O0VBTVYsQ0FBQyxDQUFBOztTQTFCVyxTQUFTLEdBQVQsU0FBUzs7O0FBOEJ0QixPQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FBQTtBQUMvQixPQUFNLGlCQUFpQixHQUFHLGtCQUFrQixHQUFHLGtCQUFrQixDQUFBO1NBQTNELGlCQUFpQixHQUFqQixpQkFBaUIiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvbGFuZ3VhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBuZXdTZXQgfSBmcm9tICcuL3V0aWwnXG5cbi8vIFRPRE86IEFsbG93IE9wdHMgdG8gc3BlY2lmeSBhZGRpdGlvbmFsIGdsb2JhbHMuXG5leHBvcnQgY29uc3QgSnNHbG9iYWxzID0gbmV3U2V0KFtcblx0J0FycmF5Jyxcblx0J0Jvb2xlYW4nLFxuXHQnQnVmZmVyJyxcblx0J0RhdGUnLFxuXHQnRXJyb3InLFxuXHQnRXZhbEVycm9yJyxcblx0J0Z1bmN0aW9uJyxcblx0J2dsb2JhbCcsXG5cdCdKU09OJyxcblx0J01hdGgnLFxuXHQnTnVtYmVyJyxcblx0J09iamVjdCcsXG5cdCdSYW5nZUVycm9yJyxcblx0J1JlZmVyZW5jZUVycm9yJyxcblx0J1JlZ0V4cCcsXG5cdCdTdHJpbmcnLFxuXHQnU3ltYm9sJyxcblx0J1N5bnRheEVycm9yJyxcblx0J1R5cGVFcnJvcicsXG5cdCdVUklFcnJvcidcblx0Ly8gJ1NldCcgYW5kICdNYXAnIGNvbmZsaWN0IHdpdGggbWFzb24ncyB2ZXJzaW9ucy5cblx0Ly8gJ1Byb21pc2UnOiBVc2UgJyQnIGluc3RlYWQuXG5cdC8vIEZvciBmb2xsb3dpbmcsIGp1c3QgdXNlIGBnbG9iYWwueHh4YC5cblx0Ly8gJ2NsZWFySW50ZXJ2YWwnLCAnY2xlYXJUaW1lb3V0JywgJ2NvbnNvbGUnLCAnZGVjb2RlVVJJJywgJ2RlY29kZVVSSUNvbXBvbmVudCcsXG5cdC8vICdlbmNvZGVVUkknLCAnZW5jb2RlVVJJQ29tcG9uZW50JywgJ2V2YWwnLCAnc2V0SW50ZXJ2YWwnLCAnc2V0VGltZW91dCdcbl0pXG5cbi8vIEFueXRoaW5nIG5vdCBleHBsaWNpdGx5IHJlc2VydmVkIGlzIGEgdmFsaWQgbmFtZSBjaGFyYWN0ZXIuXG4vLyBBIGB+YCBtYXkgYXBwZWFyIGluIGEgbmFtZSwgYnV0IG5vdCBhdCB0aGUgYmVnaW5uaW5nLlxuY29uc3QgUmVzZXJ2ZWRDaGFyYWN0ZXJzID0gJ2AjJV4mXFxcXDssJ1xuZXhwb3J0IGNvbnN0IE5vbk5hbWVDaGFyYWN0ZXJzID0gJygpW117fS46fF8gXFxuXFx0XCInICsgUmVzZXJ2ZWRDaGFyYWN0ZXJzXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==