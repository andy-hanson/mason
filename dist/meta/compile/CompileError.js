if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', './private/U/util'], function (exports, _esastDistLoc, _tuplDistTupl, _privateUUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.default = CompileError;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	function CompileError(warning) {
		if (!(this instanceof CompileError)) return new CompileError(warning);
		(0, _privateUUtil.type)(warning, Warning);
		this.warning = warning;
		// In case it's not caught and formatted:
		this.message = warning.message;
		this.stack = new Error(warning.message).stack;
	}

	CompileError.prototype = Object.create(Error.prototype);

	const Warning = (0, _tupl)('Warning', Object, 'doc', ['loc', _Loc, 'message', String]);

	exports.Warning = Warning;
	const code = function (str) {
		return '{{' + str + '}}';
	};

	exports.code = code;
	const formatCode = function* (str, formatter) {
		const rgx = /{{(.*?)}}/g;
		let prevIdx = 0;
		while (true) {
			const match = rgx.exec(str);
			if (match === null) {
				yield str.slice(prevIdx, str.length);
				break;
			} else {
				yield str.slice(prevIdx, match.index);
				yield formatter(match[1]);
				prevIdx = rgx.lastIndex;
			}
		}
	};
	exports.formatCode = formatCode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9Db21waWxlRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O21CQUl3QixZQUFZOzs7Ozs7OztBQUFyQixVQUFTLFlBQVksQ0FBQyxPQUFPLEVBQUU7QUFDN0MsTUFBSSxFQUFFLElBQUksWUFBWSxZQUFZLENBQUEsQUFBQyxFQUNsQyxPQUFPLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ2pDLG9CQUxRLElBQUksRUFLUCxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdEIsTUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7O0FBRXRCLE1BQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtBQUM5QixNQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUE7RUFDN0M7O0FBQ0QsYUFBWSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFaEQsT0FBTSxPQUFPLEdBQUcsV0FBSyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFFLEtBQUssUUFBTyxTQUFTLEVBQUUsTUFBTSxDQUFFLENBQUMsQ0FBQTs7U0FBM0UsT0FBTyxHQUFQLE9BQU87QUFFYixPQUFNLElBQUksR0FBRyxVQUFBLEdBQUc7Z0JBQVMsR0FBRztFQUFJLENBQUE7O1NBQTFCLElBQUksR0FBSixJQUFJO0FBRVYsT0FBTSxVQUFVLEdBQUcsV0FBVSxHQUFHLEVBQUUsU0FBUyxFQUFFO0FBQ25ELFFBQU0sR0FBRyxHQUFHLFlBQVksQ0FBQTtBQUN4QixNQUFJLE9BQU8sR0FBRyxDQUFDLENBQUE7QUFDZixTQUFPLElBQUksRUFBRTtBQUNaLFNBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDM0IsT0FBSSxLQUFLLEtBQUssSUFBSSxFQUFFO0FBQ25CLFVBQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3BDLFVBQUs7SUFDTCxNQUFNO0FBQ04sVUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDckMsVUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDekIsV0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUE7SUFDdkI7R0FDRDtFQUNELENBQUE7U0FkWSxVQUFVLEdBQVYsVUFBVSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvQ29tcGlsZUVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuaW1wb3J0IHsgdHlwZSB9IGZyb20gJy4vcHJpdmF0ZS9VL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbXBpbGVFcnJvcih3YXJuaW5nKSB7XG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb21waWxlRXJyb3IpKVxuXHRcdHJldHVybiBuZXcgQ29tcGlsZUVycm9yKHdhcm5pbmcpXG5cdHR5cGUod2FybmluZywgV2FybmluZylcblx0dGhpcy53YXJuaW5nID0gd2FybmluZ1xuXHQvLyBJbiBjYXNlIGl0J3Mgbm90IGNhdWdodCBhbmQgZm9ybWF0dGVkOlxuXHR0aGlzLm1lc3NhZ2UgPSB3YXJuaW5nLm1lc3NhZ2Vcblx0dGhpcy5zdGFjayA9IG5ldyBFcnJvcih3YXJuaW5nLm1lc3NhZ2UpLnN0YWNrXG59XG5Db21waWxlRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpXG5cbmV4cG9ydCBjb25zdCBXYXJuaW5nID0gdHVwbCgnV2FybmluZycsIE9iamVjdCwgJ2RvYycsIFsgJ2xvYycsIExvYywgJ21lc3NhZ2UnLCBTdHJpbmcgXSlcblxuZXhwb3J0IGNvbnN0IGNvZGUgPSBzdHIgPT4gYHt7JHtzdHJ9fX1gXG5cbmV4cG9ydCBjb25zdCBmb3JtYXRDb2RlID0gZnVuY3Rpb24qKHN0ciwgZm9ybWF0dGVyKSB7XG5cdGNvbnN0IHJneCA9IC97eyguKj8pfX0vZ1xuXHRsZXQgcHJldklkeCA9IDBcblx0d2hpbGUgKHRydWUpIHtcblx0XHRjb25zdCBtYXRjaCA9IHJneC5leGVjKHN0cilcblx0XHRpZiAobWF0Y2ggPT09IG51bGwpIHtcblx0XHRcdHlpZWxkIHN0ci5zbGljZShwcmV2SWR4LCBzdHIubGVuZ3RoKVxuXHRcdFx0YnJlYWtcblx0XHR9IGVsc2Uge1xuXHRcdFx0eWllbGQgc3RyLnNsaWNlKHByZXZJZHgsIG1hdGNoLmluZGV4KVxuXHRcdFx0eWllbGQgZm9ybWF0dGVyKG1hdGNoWzFdKVxuXHRcdFx0cHJldklkeCA9IHJneC5sYXN0SW5kZXhcblx0XHR9XG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9