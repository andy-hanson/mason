if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	const
	// flatMap where opMapper returns optionals instead of arrays.
	flatOpMap = function (arr, opMapper) {
		const out = [];
		arr.forEach(function (em) {
			return opEach(opMapper(em), function (_) {
				return out.push(_);
			});
		});
		return out;
	},
	      ifElse = function (op, ifSome, ifNone) {
		return op === null ? ifNone() : ifSome(op);
	},
	      opIf = function (cond, makeOp) {
		return cond ? makeOp() : null;
	},
	      opMap = function (op, mapper) {
		return op === null ? null : mapper(op);
	},
	      opEach = opMap;
	exports.flatOpMap = flatOpMap;
	exports.ifElse = ifElse;
	exports.opIf = opIf;
	exports.opMap = opMap;
	exports.opEach = opEach;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Uvb3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU87O0FBRU4sVUFBUyxHQUFHLFVBQUMsR0FBRyxFQUFFLFFBQVEsRUFBSztBQUM5QixRQUFNLEdBQUcsR0FBRyxFQUFHLENBQUE7QUFDZixLQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRTtVQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBQSxDQUFDO1dBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFBQSxDQUFDO0dBQUEsQ0FBQyxDQUFBO0FBQ3pELFNBQU8sR0FBRyxDQUFBO0VBQ1Y7T0FFRCxNQUFNLEdBQUcsVUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU07U0FDM0IsRUFBRSxLQUFLLElBQUksR0FBRyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0VBQUE7T0FFcEMsSUFBSSxHQUFHLFVBQUMsSUFBSSxFQUFFLE1BQU07U0FDbkIsSUFBSSxHQUFHLE1BQU0sRUFBRSxHQUFHLElBQUk7RUFBQTtPQUV2QixLQUFLLEdBQUcsVUFBQyxFQUFFLEVBQUUsTUFBTTtTQUNsQixFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0VBQUE7T0FFaEMsTUFBTSxHQUFHLEtBQUssQ0FBQTtTQWZkLFNBQVMsR0FBVCxTQUFTO1NBTVQsTUFBTSxHQUFOLE1BQU07U0FHTixJQUFJLEdBQUosSUFBSTtTQUdKLEtBQUssR0FBTCxLQUFLO1NBR0wsTUFBTSxHQUFOLE1BQU0iLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVS9vcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdFxuXHQvLyBmbGF0TWFwIHdoZXJlIG9wTWFwcGVyIHJldHVybnMgb3B0aW9uYWxzIGluc3RlYWQgb2YgYXJyYXlzLlxuXHRmbGF0T3BNYXAgPSAoYXJyLCBvcE1hcHBlcikgPT4ge1xuXHRcdGNvbnN0IG91dCA9IFsgXVxuXHRcdGFyci5mb3JFYWNoKGVtID0+IG9wRWFjaChvcE1hcHBlcihlbSksIF8gPT4gb3V0LnB1c2goXykpKVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHRpZkVsc2UgPSAob3AsIGlmU29tZSwgaWZOb25lKSA9PlxuXHRcdG9wID09PSBudWxsID8gaWZOb25lKCkgOiBpZlNvbWUob3ApLFxuXG5cdG9wSWYgPSAoY29uZCwgbWFrZU9wKSA9PlxuXHRcdGNvbmQgPyBtYWtlT3AoKSA6IG51bGwsXG5cblx0b3BNYXAgPSAob3AsIG1hcHBlcikgPT5cblx0XHRvcCA9PT0gbnVsbCA/IG51bGwgOiBtYXBwZXIob3ApLFxuXG5cdG9wRWFjaCA9IG9wTWFwXG5cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9