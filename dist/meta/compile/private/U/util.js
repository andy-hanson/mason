if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	const assert = function (cond) {
		if (!cond) throw new Error('Assertion failed.');
	},
	      log = function (_) {
		return console.log(_ === null ? 'null' : _ === undefined ? 'undefined' : _.toString());
	},
	      lazy = function (get) {
		let cached;
		return function () {
			if (cached === undefined) {
				cached = get();
				assert(cached !== undefined);
			}
			return cached;
		};
	},
	     

	// -0 is negative
	isPositive = function (n) {
		return n >= 0 && 1 / n !== -Infinity;
	},
	      implementMany = function (holder, methodName, nameToImpl) {
		Object.keys(nameToImpl).forEach(function (name) {
			holder[name].prototype[methodName] = nameToImpl[name];
		});
		return function (target) {
			return target[methodName].apply(null, arguments);
		};
	},
	      implementMany2 = function (methodName, pairs) {
		pairs.forEach(function (_ref) {
			var _ref2 = _slicedToArray(_ref, 2);

			let type = _ref2[0];
			let impl = _ref2[1];
			type.prototype[methodName] = impl;
		});
		// TODO:ES6 spread
		return function () {
			var _arguments$0;

			return (_arguments$0 = arguments[0])[methodName].apply(_arguments$0, arguments);
		};
	},
	     

	// TODO:ES6 Just use `new Set`
	newSet = function () {
		const set = new Set();
		for (let i = 0; i < arguments.length; i = i + 1) arguments[i].forEach(function (_) {
			return set.add(_);
		});
		return set;
	},
	     

	// TODO:ES6 Just use `new Map`
	newMap = function (mapMembers) {
		const map = new Map();
		mapMembers.forEach(function (_ref3) {
			var _ref32 = _slicedToArray(_ref3, 2);

			let key = _ref32[0];
			let val = _ref32[1];
			return map.set(key, val);
		});
		return map;
	},
	     

	// TODO:ES6 map.keys()
	mapKeys = function (map) {
		const res = [];
		map.forEach(function (value, key) {
			return res.push(key);
		});
		return res;
	};
	exports.assert = assert;
	exports.log = log;
	exports.lazy = lazy;
	exports.isPositive = isPositive;
	exports.implementMany = implementMany;
	exports.implementMany2 = implementMany2;
	exports.newSet = newSet;
	exports.newMap = newMap;
	exports.mapKeys = mapKeys;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1UvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBTyxPQUNOLE1BQU0sR0FBRyxVQUFBLElBQUksRUFBSTtBQUNoQixNQUFJLENBQUMsSUFBSSxFQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtFQUNyQztPQUVELEdBQUcsR0FBRyxVQUFBLENBQUM7U0FBSSxPQUFPLENBQUMsR0FBRyxDQUNyQixDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sR0FDbkIsQ0FBQyxLQUFLLFNBQVMsR0FBRyxXQUFXLEdBQzdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztFQUFBO09BRWQsSUFBSSxHQUFHLFVBQUEsR0FBRyxFQUFJO0FBQ2IsTUFBSSxNQUFNLENBQUE7QUFDVixTQUFPLFlBQU07QUFDWixPQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFDekIsVUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2QsVUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQTtJQUM1QjtBQUNELFVBQU8sTUFBTSxDQUFBO0dBQ2IsQ0FBQTtFQUNEOzs7O0FBR0QsV0FBVSxHQUFHLFVBQUEsQ0FBQztTQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVE7RUFBQTtPQUUvQyxhQUFhLEdBQUcsVUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBSztBQUNuRCxRQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUN2QyxTQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUNyRCxDQUFDLENBQUE7QUFDRixTQUFPLFVBQVMsTUFBTSxFQUFFO0FBQUUsVUFBTyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtHQUFFLENBQUE7RUFDNUU7T0FFRCxjQUFjLEdBQUcsVUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFLO0FBQ3ZDLE9BQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFjLEVBQUs7OEJBQW5CLElBQWM7O09BQVosSUFBSTtPQUFFLElBQUk7QUFBUyxPQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQTtHQUFFLENBQUMsQ0FBQTs7QUFFeEUsU0FBTyxZQUFXOzs7QUFBRSxVQUFPLGdCQUFBLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFVLE9BQUMsZUFBSSxTQUFTLENBQUMsQ0FBQTtHQUFFLENBQUE7RUFDbkU7Ozs7QUFHRCxPQUFNLEdBQUcsWUFBVztBQUNuQixRQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3JCLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUM5QyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztVQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0dBQUEsQ0FBQyxDQUFBO0FBQ3RDLFNBQU8sR0FBRyxDQUFBO0VBQ1Y7Ozs7QUFHRCxPQUFNLEdBQUcsVUFBQSxVQUFVLEVBQUk7QUFDdEIsUUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNyQixZQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBWTsrQkFBWixLQUFZOztPQUFWLEdBQUc7T0FBRSxHQUFHO1VBQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO0dBQUEsQ0FBQyxDQUFBO0FBQ3ZELFNBQU8sR0FBRyxDQUFBO0VBQ1Y7Ozs7QUFHRCxRQUFPLEdBQUcsVUFBQSxHQUFHLEVBQUk7QUFDaEIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsS0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO1VBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7R0FBQSxDQUFDLENBQUE7QUFDMUMsU0FBTyxHQUFHLENBQUE7RUFDVixDQUFBO1NBekRELE1BQU0sR0FBTixNQUFNO1NBS04sR0FBRyxHQUFILEdBQUc7U0FLSCxJQUFJLEdBQUosSUFBSTtTQVlKLFVBQVUsR0FBVixVQUFVO1NBRVYsYUFBYSxHQUFiLGFBQWE7U0FPYixjQUFjLEdBQWQsY0FBYztTQU9kLE1BQU0sR0FBTixNQUFNO1NBUU4sTUFBTSxHQUFOLE1BQU07U0FPTixPQUFPLEdBQVAsT0FBTyIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9VL3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Rcblx0YXNzZXJ0ID0gY29uZCA9PiB7XG5cdFx0aWYgKCFjb25kKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdBc3NlcnRpb24gZmFpbGVkLicpXG5cdH0sXG5cblx0bG9nID0gXyA9PiBjb25zb2xlLmxvZyhcblx0XHRfID09PSBudWxsID8gJ251bGwnIDpcblx0XHRfID09PSB1bmRlZmluZWQgPyAndW5kZWZpbmVkJyA6XG5cdFx0Xy50b1N0cmluZygpKSxcblxuXHRsYXp5ID0gZ2V0ID0+IHtcblx0XHRsZXQgY2FjaGVkXG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdGlmIChjYWNoZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjYWNoZWQgPSBnZXQoKVxuXHRcdFx0XHRhc3NlcnQoY2FjaGVkICE9PSB1bmRlZmluZWQpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY2FjaGVkXG5cdFx0fVxuXHR9LFxuXG5cdC8vIC0wIGlzIG5lZ2F0aXZlXG5cdGlzUG9zaXRpdmUgPSBuID0+IG4gPj0gMCAmJiAxIC8gbiAhPT0gLUluZmluaXR5LFxuXG5cdGltcGxlbWVudE1hbnkgPSAoaG9sZGVyLCBtZXRob2ROYW1lLCBuYW1lVG9JbXBsKSA9PiB7XG5cdFx0T2JqZWN0LmtleXMobmFtZVRvSW1wbCkuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGhvbGRlcltuYW1lXS5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBuYW1lVG9JbXBsW25hbWVdXG5cdFx0fSlcblx0XHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXRbbWV0aG9kTmFtZV0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB9XG5cdH0sXG5cblx0aW1wbGVtZW50TWFueTIgPSAobWV0aG9kTmFtZSwgcGFpcnMpID0+IHtcblx0XHRwYWlycy5mb3JFYWNoKChbIHR5cGUsIGltcGwgXSkgPT4geyB0eXBlLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGltcGwgfSlcblx0XHQvLyBUT0RPOkVTNiBzcHJlYWRcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHNbMF1bbWV0aG9kTmFtZV0oLi4uYXJndW1lbnRzKSB9XG5cdH0sXG5cblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgYG5ldyBTZXRgXG5cdG5ld1NldCA9IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0IHNldCA9IG5ldyBTZXQoKVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSA9IGkgKyAxKVxuXHRcdFx0YXJndW1lbnRzW2ldLmZvckVhY2goXyA9PiBzZXQuYWRkKF8pKVxuXHRcdHJldHVybiBzZXRcblx0fSxcblxuXHQvLyBUT0RPOkVTNiBKdXN0IHVzZSBgbmV3IE1hcGBcblx0bmV3TWFwID0gbWFwTWVtYmVycyA9PiB7XG5cdFx0Y29uc3QgbWFwID0gbmV3IE1hcCgpXG5cdFx0bWFwTWVtYmVycy5mb3JFYWNoKChbIGtleSwgdmFsIF0pID0+IG1hcC5zZXQoa2V5LCB2YWwpKVxuXHRcdHJldHVybiBtYXBcblx0fSxcblxuXHQvLyBUT0RPOkVTNiBtYXAua2V5cygpXG5cdG1hcEtleXMgPSBtYXAgPT4ge1xuXHRcdGNvbnN0IHJlcyA9IFsgXVxuXHRcdG1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiByZXMucHVzaChrZXkpKVxuXHRcdHJldHVybiByZXNcblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=