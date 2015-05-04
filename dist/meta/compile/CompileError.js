if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', './private/U/type'], function (exports, _esastDistLoc, _tuplDistTupl, _privateUType) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.default = CompileError;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	var _type = _interopRequire(_privateUType);

	function CompileError(warning) {
		if (!(this instanceof CompileError)) return new CompileError(warning);
		_type(warning, Warning);
		this.warning = warning;
		// In case it's not caught and formatted:
		this.message = warning.message;
		this.stack = new Error(warning.message).stack;
	}

	CompileError.prototype = Object.create(Error.prototype);

	const Warning = _tupl('Warning', Object, 'doc', ['loc', _Loc, 'message', String]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9Db21waWxlRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O21CQUl3QixZQUFZOzs7Ozs7Ozs7O0FBQXJCLFVBQVMsWUFBWSxDQUFDLE9BQU8sRUFBRTtBQUM3QyxNQUFJLEVBQUUsSUFBSSxZQUFZLFlBQVksQ0FBQSxBQUFDLEVBQ2xDLE9BQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDakMsUUFBSyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdEIsTUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7O0FBRXRCLE1BQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtBQUM5QixNQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUE7RUFDN0M7O0FBQ0QsYUFBWSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFaEQsT0FBTSxPQUFPLEdBQUcsTUFBSyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFFLEtBQUssUUFBTyxTQUFTLEVBQUUsTUFBTSxDQUFFLENBQUMsQ0FBQTs7U0FBM0UsT0FBTyxHQUFQLE9BQU87QUFFYixPQUFNLElBQUksR0FBRyxVQUFBLEdBQUc7Z0JBQVMsR0FBRztFQUFJLENBQUE7O1NBQTFCLElBQUksR0FBSixJQUFJO0FBRVYsT0FBTSxVQUFVLEdBQUcsV0FBVSxHQUFHLEVBQUUsU0FBUyxFQUFFO0FBQ25ELFFBQU0sR0FBRyxHQUFHLFlBQVksQ0FBQTtBQUN4QixNQUFJLE9BQU8sR0FBRyxDQUFDLENBQUE7QUFDZixTQUFPLElBQUksRUFBRTtBQUNaLFNBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDM0IsT0FBSSxLQUFLLEtBQUssSUFBSSxFQUFFO0FBQ25CLFVBQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3BDLFVBQUs7SUFDTCxNQUFNO0FBQ04sVUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDckMsVUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDekIsV0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUE7SUFDdkI7R0FDRDtFQUNELENBQUE7U0FkWSxVQUFVLEdBQVYsVUFBVSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvQ29tcGlsZUVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuaW1wb3J0IHR5cGUgZnJvbSAnLi9wcml2YXRlL1UvdHlwZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tcGlsZUVycm9yKHdhcm5pbmcpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbXBpbGVFcnJvcikpXG5cdFx0cmV0dXJuIG5ldyBDb21waWxlRXJyb3Iod2FybmluZylcblx0dHlwZSh3YXJuaW5nLCBXYXJuaW5nKVxuXHR0aGlzLndhcm5pbmcgPSB3YXJuaW5nXG5cdC8vIEluIGNhc2UgaXQncyBub3QgY2F1Z2h0IGFuZCBmb3JtYXR0ZWQ6XG5cdHRoaXMubWVzc2FnZSA9IHdhcm5pbmcubWVzc2FnZVxuXHR0aGlzLnN0YWNrID0gbmV3IEVycm9yKHdhcm5pbmcubWVzc2FnZSkuc3RhY2tcbn1cbkNvbXBpbGVFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSlcblxuZXhwb3J0IGNvbnN0IFdhcm5pbmcgPSB0dXBsKCdXYXJuaW5nJywgT2JqZWN0LCAnZG9jJywgWyAnbG9jJywgTG9jLCAnbWVzc2FnZScsIFN0cmluZyBdKVxuXG5leHBvcnQgY29uc3QgY29kZSA9IHN0ciA9PiBge3ske3N0cn19fWBcblxuZXhwb3J0IGNvbnN0IGZvcm1hdENvZGUgPSBmdW5jdGlvbiooc3RyLCBmb3JtYXR0ZXIpIHtcblx0Y29uc3Qgcmd4ID0gL3t7KC4qPyl9fS9nXG5cdGxldCBwcmV2SWR4ID0gMFxuXHR3aGlsZSAodHJ1ZSkge1xuXHRcdGNvbnN0IG1hdGNoID0gcmd4LmV4ZWMoc3RyKVxuXHRcdGlmIChtYXRjaCA9PT0gbnVsbCkge1xuXHRcdFx0eWllbGQgc3RyLnNsaWNlKHByZXZJZHgsIHN0ci5sZW5ndGgpXG5cdFx0XHRicmVha1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR5aWVsZCBzdHIuc2xpY2UocHJldklkeCwgbWF0Y2guaW5kZXgpXG5cdFx0XHR5aWVsZCBmb3JtYXR0ZXIobWF0Y2hbMV0pXG5cdFx0XHRwcmV2SWR4ID0gcmd4Lmxhc3RJbmRleFxuXHRcdH1cblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=