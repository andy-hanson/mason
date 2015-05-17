if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', './private/util'], function (exports, _esastDistLoc, _tuplDistTupl, _privateUtil) {
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
		(0, _privateUtil.type)(warning, Warning);
		this.warning = warning;
		// In case it's not caught and formatted:
		this.message = warning.message;
		this.stack = new Error(warning.message).stack;
	}

	CompileError.prototype = Object.create(Error.prototype);

	const Warning = (0, _tupl)('Warning', Object, 'doc', ['loc', _Loc, 'message', String]),
	      code = function (str) {
		return '{{' + str + '}}';
	},
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9Db21waWxlRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O21CQUl3QixZQUFZOzs7Ozs7OztBQUFyQixVQUFTLFlBQVksQ0FBQyxPQUFPLEVBQUU7QUFDN0MsTUFBSSxFQUFFLElBQUksWUFBWSxZQUFZLENBQUEsQUFBQyxFQUNsQyxPQUFPLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ2pDLG1CQUxRLElBQUksRUFLUCxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdEIsTUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7O0FBRXRCLE1BQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtBQUM5QixNQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUE7RUFDN0M7O0FBQ0QsYUFBWSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFaEQsT0FDTixPQUFPLEdBQUcsV0FBSyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFFLEtBQUssUUFBTyxTQUFTLEVBQUUsTUFBTSxDQUFFLENBQUM7T0FDM0UsSUFBSSxHQUFHLFVBQUEsR0FBRztnQkFBUyxHQUFHO0VBQUk7T0FDMUIsVUFBVSxHQUFHLFdBQVUsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUN0QyxRQUFNLEdBQUcsR0FBRyxZQUFZLENBQUE7QUFDeEIsTUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO0FBQ2YsU0FBTyxJQUFJLEVBQUU7QUFDWixTQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzNCLE9BQUksS0FBSyxLQUFLLElBQUksRUFBRTtBQUNuQixVQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNwQyxVQUFLO0lBQ0wsTUFBTTtBQUNOLFVBQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3JDLFVBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3pCLFdBQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFBO0lBQ3ZCO0dBQ0Q7RUFDRCxDQUFBO1NBaEJELE9BQU8sR0FBUCxPQUFPO1NBQ1AsSUFBSSxHQUFKLElBQUk7U0FDSixVQUFVLEdBQVYsVUFBVSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvQ29tcGlsZUVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuaW1wb3J0IHsgdHlwZSB9IGZyb20gJy4vcHJpdmF0ZS91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21waWxlRXJyb3Iod2FybmluZykge1xuXHRpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tcGlsZUVycm9yKSlcblx0XHRyZXR1cm4gbmV3IENvbXBpbGVFcnJvcih3YXJuaW5nKVxuXHR0eXBlKHdhcm5pbmcsIFdhcm5pbmcpXG5cdHRoaXMud2FybmluZyA9IHdhcm5pbmdcblx0Ly8gSW4gY2FzZSBpdCdzIG5vdCBjYXVnaHQgYW5kIGZvcm1hdHRlZDpcblx0dGhpcy5tZXNzYWdlID0gd2FybmluZy5tZXNzYWdlXG5cdHRoaXMuc3RhY2sgPSBuZXcgRXJyb3Iod2FybmluZy5tZXNzYWdlKS5zdGFja1xufVxuQ29tcGlsZUVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKVxuXG5leHBvcnQgY29uc3Rcblx0V2FybmluZyA9IHR1cGwoJ1dhcm5pbmcnLCBPYmplY3QsICdkb2MnLCBbICdsb2MnLCBMb2MsICdtZXNzYWdlJywgU3RyaW5nIF0pLFxuXHRjb2RlID0gc3RyID0+IGB7eyR7c3RyfX19YCxcblx0Zm9ybWF0Q29kZSA9IGZ1bmN0aW9uKihzdHIsIGZvcm1hdHRlcikge1xuXHRcdGNvbnN0IHJneCA9IC97eyguKj8pfX0vZ1xuXHRcdGxldCBwcmV2SWR4ID0gMFxuXHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRjb25zdCBtYXRjaCA9IHJneC5leGVjKHN0cilcblx0XHRcdGlmIChtYXRjaCA9PT0gbnVsbCkge1xuXHRcdFx0XHR5aWVsZCBzdHIuc2xpY2UocHJldklkeCwgc3RyLmxlbmd0aClcblx0XHRcdFx0YnJlYWtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHlpZWxkIHN0ci5zbGljZShwcmV2SWR4LCBtYXRjaC5pbmRleClcblx0XHRcdFx0eWllbGQgZm9ybWF0dGVyKG1hdGNoWzFdKVxuXHRcdFx0XHRwcmV2SWR4ID0gcmd4Lmxhc3RJbmRleFxuXHRcdFx0fVxuXHRcdH1cblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=