if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../CompileError', '../private/util'], function (exports, _CompileError, _privateUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _CompileError2 = _interopRequire(_CompileError);

	exports.default = function (error, modulePath) {
		(0, _privateUtil.type)(error, _CompileError2);
		return format(error.warning, modulePath, 'error');
	};

	const formatWarningForHtml = function (warning, modulePath) {
		(0, _privateUtil.type)(warning, _CompileError.Warning, modulePath, String);
		// Extra space to match up with 'error'
		return format(warning, modulePath, 'warning');
	};

	exports.formatWarningForHtml = formatWarningForHtml;
	const format = function (warning, modulePath, kind) {
		const locSpan = document.createElement('span');
		locSpan.className = 'loc';
		locSpan.textContent = warning.loc + ' ';

		const messageSpan = document.createElement('message');
		messageSpan.className = 'message';
		const messageParts = (0, _CompileError.formatCode)(warning.message, function (code) {
			const _ = document.createElement('span');
			_.className = 'code';
			_.textContent = code;
			return _;
		});
		for (let part of messageParts) messageSpan.appendChild(typeof part === 'string' ? document.createTextNode(part) : part);

		const allSpan = document.createElement('span');
		allSpan.className = kind;
		allSpan.appendChild(locSpan);
		allSpan.appendChild(messageSpan);
		return allSpan;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9icm93c2VyLW9ubHkvY29tcGlsZUVycm9yVG9Eb21TcGFuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O21CQUdlLFVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBSztBQUNyQyxtQkFIUSxJQUFJLEVBR1AsS0FBSyxpQkFBZSxDQUFBO0FBQ3pCLFNBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0VBQ2pEOztBQUVNLE9BQU0sb0JBQW9CLEdBQUcsVUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFLO0FBQzVELG1CQVJRLElBQUksRUFRUCxPQUFPLGdCQVRVLE9BQU8sRUFTTixVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRTFDLFNBQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUE7RUFDN0MsQ0FBQTs7U0FKWSxvQkFBb0IsR0FBcEIsb0JBQW9CO0FBTWpDLE9BQU0sTUFBTSxHQUFHLFVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUs7QUFDN0MsUUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM5QyxTQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQTtBQUN6QixTQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBOztBQUV2QyxRQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ3JELGFBQVcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0FBQ2pDLFFBQU0sWUFBWSxHQUFHLGtCQXJCVSxVQUFVLEVBcUJULE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDeEQsU0FBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUN4QyxJQUFDLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQTtBQUNwQixJQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtBQUNwQixVQUFPLENBQUMsQ0FBQTtHQUNSLENBQUMsQ0FBQTtBQUNGLE9BQUssSUFBSSxJQUFJLElBQUksWUFBWSxFQUM1QixXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBOztBQUV6RixRQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzlDLFNBQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO0FBQ3hCLFNBQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDNUIsU0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUNoQyxTQUFPLE9BQU8sQ0FBQTtFQUNkLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL2Jyb3dzZXItb25seS9jb21waWxlRXJyb3JUb0RvbVNwYW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcGlsZUVycm9yLCB7IFdhcm5pbmcsIGZvcm1hdENvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnLi4vcHJpdmF0ZS91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCAoZXJyb3IsIG1vZHVsZVBhdGgpID0+IHtcblx0dHlwZShlcnJvciwgQ29tcGlsZUVycm9yKVxuXHRyZXR1cm4gZm9ybWF0KGVycm9yLndhcm5pbmcsIG1vZHVsZVBhdGgsICdlcnJvcicpXG59XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRXYXJuaW5nRm9ySHRtbCA9ICh3YXJuaW5nLCBtb2R1bGVQYXRoKSA9PiB7XG5cdHR5cGUod2FybmluZywgV2FybmluZywgbW9kdWxlUGF0aCwgU3RyaW5nKVxuXHQvLyBFeHRyYSBzcGFjZSB0byBtYXRjaCB1cCB3aXRoICdlcnJvcidcblx0cmV0dXJuIGZvcm1hdCh3YXJuaW5nLCBtb2R1bGVQYXRoLCAnd2FybmluZycpXG59XG5cbmNvbnN0IGZvcm1hdCA9ICh3YXJuaW5nLCBtb2R1bGVQYXRoLCBraW5kKSA9PiB7XG5cdGNvbnN0IGxvY1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcblx0bG9jU3Bhbi5jbGFzc05hbWUgPSAnbG9jJ1xuXHRsb2NTcGFuLnRleHRDb250ZW50ID0gd2FybmluZy5sb2MgKyAnICdcblxuXHRjb25zdCBtZXNzYWdlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21lc3NhZ2UnKVxuXHRtZXNzYWdlU3Bhbi5jbGFzc05hbWUgPSAnbWVzc2FnZSdcblx0Y29uc3QgbWVzc2FnZVBhcnRzID0gZm9ybWF0Q29kZSh3YXJuaW5nLm1lc3NhZ2UsIGNvZGUgPT4ge1xuXHRcdGNvbnN0IF8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcblx0XHRfLmNsYXNzTmFtZSA9ICdjb2RlJ1xuXHRcdF8udGV4dENvbnRlbnQgPSBjb2RlXG5cdFx0cmV0dXJuIF9cblx0fSlcblx0Zm9yIChsZXQgcGFydCBvZiBtZXNzYWdlUGFydHMpXG5cdFx0bWVzc2FnZVNwYW4uYXBwZW5kQ2hpbGQodHlwZW9mIHBhcnQgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGFydCkgOiBwYXJ0KVxuXG5cdGNvbnN0IGFsbFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcblx0YWxsU3Bhbi5jbGFzc05hbWUgPSBraW5kXG5cdGFsbFNwYW4uYXBwZW5kQ2hpbGQobG9jU3Bhbilcblx0YWxsU3Bhbi5hcHBlbmRDaGlsZChtZXNzYWdlU3Bhbilcblx0cmV0dXJuIGFsbFNwYW5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9