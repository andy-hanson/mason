if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './util'], function (exports, _util) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xhbmd1YWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVPLE9BQU0sY0FBYyxHQUFHLFVBQUEsSUFBSSxFQUFJO0FBQ3JDLFVBQVEsSUFBSTtBQUNYLFFBQUssS0FBSyxDQUFDLEFBQUMsS0FBSyxRQUFRLENBQUMsQUFBQyxLQUFLLE1BQU07QUFBRSxXQUFPLElBQUksQ0FBQTtBQUFBLEFBQ25EO0FBQVMsV0FBTyxLQUFLLENBQUE7QUFBQSxHQUNyQjtFQUNELENBQUE7O1NBTFksY0FBYyxHQUFkLGNBQWM7O0FBUXBCLE9BQU0sU0FBUyxHQUFHLFVBVmhCLE1BQU0sRUFVaUIsQ0FDL0IsT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEVBQ1IsTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEVBQ1gsVUFBVSxFQUNWLFFBQVEsRUFDUixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixhQUFhLEVBQ2IsV0FBVyxFQUNYLFVBQVU7Ozs7OztFQU1WLENBQUMsQ0FBQTs7U0ExQlcsU0FBUyxHQUFULFNBQVM7OztBQThCZixPQUFNLGlCQUFpQixHQUFHLHNCQUFzQixDQUFBOztTQUExQyxpQkFBaUIsR0FBakIsaUJBQWlCO0FBRXZCLE9BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQTtTQUE3QixlQUFlLEdBQWYsZUFBZSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9sYW5ndWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5ld1NldCB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGNvbnN0IGlzUmVzZXJ2ZWROYW1lID0gbmFtZSA9PiB7XG5cdHN3aXRjaCAobmFtZSkge1xuXHRcdGNhc2UgJ2Zvcic6IGNhc2UgJ3JldHVybic6IGNhc2UgJ3dpdGgnOiByZXR1cm4gdHJ1ZVxuXHRcdGRlZmF1bHQ6IHJldHVybiBmYWxzZVxuXHR9XG59XG5cbi8vIFRPRE86IEFsbG93IE9wdHMgdG8gc3BlY2lmeSBhZGRpdGlvbmFsIGdsb2JhbHMuXG5leHBvcnQgY29uc3QgSnNHbG9iYWxzID0gbmV3U2V0KFtcblx0J0FycmF5Jyxcblx0J0Jvb2xlYW4nLFxuXHQnQnVmZmVyJyxcblx0J0RhdGUnLFxuXHQnRXJyb3InLFxuXHQnRXZhbEVycm9yJyxcblx0J0Z1bmN0aW9uJyxcblx0J2dsb2JhbCcsXG5cdCdKU09OJyxcblx0J01hdGgnLFxuXHQnTnVtYmVyJyxcblx0J09iamVjdCcsXG5cdCdSYW5nZUVycm9yJyxcblx0J1JlZmVyZW5jZUVycm9yJyxcblx0J1JlZ0V4cCcsXG5cdCdTdHJpbmcnLFxuXHQnU3ltYm9sJyxcblx0J1N5bnRheEVycm9yJyxcblx0J1R5cGVFcnJvcicsXG5cdCdVUklFcnJvcidcblx0Ly8gJ1NldCcgYW5kICdNYXAnIGNvbmZsaWN0IHdpdGggbWFzb24ncyB2ZXJzaW9ucy5cblx0Ly8gJ1Byb21pc2UnOiBVc2UgJyQnIGluc3RlYWQuXG5cdC8vIEZvciBmb2xsb3dpbmcsIGp1c3QgdXNlIGBnbG9iYWwueHh4YC5cblx0Ly8gJ2NsZWFySW50ZXJ2YWwnLCAnY2xlYXJUaW1lb3V0JywgJ2NvbnNvbGUnLCAnZGVjb2RlVVJJJywgJ2RlY29kZVVSSUNvbXBvbmVudCcsXG5cdC8vICdlbmNvZGVVUkknLCAnZW5jb2RlVVJJQ29tcG9uZW50JywgJ2V2YWwnLCAnc2V0SW50ZXJ2YWwnLCAnc2V0VGltZW91dCdcbl0pXG5cbi8vIEFueXRoaW5nIG5vdCBleHBsaWNpdGx5IHJlc2VydmVkIGlzIGEgdmFsaWQgbmFtZSBjaGFyYWN0ZXIuXG4vLyBBIGB+YCBtYXkgYXBwZWFyIGluIGEgbmFtZSwgYnV0IG5vdCBhdCB0aGUgYmVnaW5uaW5nLlxuZXhwb3J0IGNvbnN0IE5vbk5hbWVDaGFyYWN0ZXJzID0gJygpW117fS46fF8gXFxuXFx0XCJgIzssJ1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdExvb3BOYW1lID0gJ2Fub24tbG9vcCdcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9