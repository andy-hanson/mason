if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', './private/util'], function (exports, _esastDistLoc, _tuplDistTupl, _privateUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.default = CompileError;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Loc = _interopRequireDefault(_esastDistLoc);

	var _tupl = _interopRequireDefault(_tuplDistTupl);

	function CompileError(warning) {
		if (!(this instanceof CompileError)) return new CompileError(warning);
		(0, _privateUtil.type)(warning, Warning);
		this.warning = warning;
		// In case it's not caught and formatted:
		this.message = warning.message;
		this.stack = new Error(warning.message).stack;
	}

	CompileError.prototype = Object.create(Error.prototype);

	const Warning = (0, _tupl.default)('Warning', Object, 'doc', ['loc', _Loc.default, 'message', String]),
	      code = str => `{{${ str }}}`,
	      formatCode = function* (str, formatter) {
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
	exports.Warning = Warning;
	exports.code = code;
	exports.formatCode = formatCode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9Db21waWxlRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O21CQUl3QixZQUFZOzs7Ozs7OztBQUFyQixVQUFTLFlBQVksQ0FBQyxPQUFPLEVBQUU7QUFDN0MsTUFBSSxFQUFFLElBQUksWUFBWSxZQUFZLENBQUEsQUFBQyxFQUNsQyxPQUFPLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ2pDLG1CQUxRLElBQUksRUFLUCxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdEIsTUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7O0FBRXRCLE1BQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtBQUM5QixNQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUE7RUFDN0M7O0FBQ0QsYUFBWSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFaEQsT0FDTixPQUFPLEdBQUcsbUJBQUssU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBRSxLQUFLLGdCQUFPLFNBQVMsRUFBRSxNQUFNLENBQUUsQ0FBQztPQUMzRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFFLEdBQUcsRUFBQyxFQUFFLENBQUM7T0FDMUIsVUFBVSxHQUFHLFdBQVUsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUN0QyxRQUFNLEdBQUcsR0FBRyxZQUFZLENBQUE7QUFDeEIsTUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO0FBQ2YsU0FBTyxJQUFJLEVBQUU7QUFDWixTQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzNCLE9BQUksS0FBSyxLQUFLLElBQUksRUFBRTtBQUNuQixVQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNwQyxVQUFLO0lBQ0wsTUFBTTtBQUNOLFVBQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3JDLFVBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3pCLFdBQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFBO0lBQ3ZCO0dBQ0Q7RUFDRCxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9Db21waWxlRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnLi9wcml2YXRlL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbXBpbGVFcnJvcih3YXJuaW5nKSB7XG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb21waWxlRXJyb3IpKVxuXHRcdHJldHVybiBuZXcgQ29tcGlsZUVycm9yKHdhcm5pbmcpXG5cdHR5cGUod2FybmluZywgV2FybmluZylcblx0dGhpcy53YXJuaW5nID0gd2FybmluZ1xuXHQvLyBJbiBjYXNlIGl0J3Mgbm90IGNhdWdodCBhbmQgZm9ybWF0dGVkOlxuXHR0aGlzLm1lc3NhZ2UgPSB3YXJuaW5nLm1lc3NhZ2Vcblx0dGhpcy5zdGFjayA9IG5ldyBFcnJvcih3YXJuaW5nLm1lc3NhZ2UpLnN0YWNrXG59XG5Db21waWxlRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpXG5cbmV4cG9ydCBjb25zdFxuXHRXYXJuaW5nID0gdHVwbCgnV2FybmluZycsIE9iamVjdCwgJ2RvYycsIFsgJ2xvYycsIExvYywgJ21lc3NhZ2UnLCBTdHJpbmcgXSksXG5cdGNvZGUgPSBzdHIgPT4gYHt7JHtzdHJ9fX1gLFxuXHRmb3JtYXRDb2RlID0gZnVuY3Rpb24qKHN0ciwgZm9ybWF0dGVyKSB7XG5cdFx0Y29uc3Qgcmd4ID0gL3t7KC4qPyl9fS9nXG5cdFx0bGV0IHByZXZJZHggPSAwXG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdGNvbnN0IG1hdGNoID0gcmd4LmV4ZWMoc3RyKVxuXHRcdFx0aWYgKG1hdGNoID09PSBudWxsKSB7XG5cdFx0XHRcdHlpZWxkIHN0ci5zbGljZShwcmV2SWR4LCBzdHIubGVuZ3RoKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0eWllbGQgc3RyLnNsaWNlKHByZXZJZHgsIG1hdGNoLmluZGV4KVxuXHRcdFx0XHR5aWVsZCBmb3JtYXR0ZXIobWF0Y2hbMV0pXG5cdFx0XHRcdHByZXZJZHggPSByZ3gubGFzdEluZGV4XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==