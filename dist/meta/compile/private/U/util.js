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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1UvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBTyxPQUNOLE1BQU0sR0FBRyxVQUFBLElBQUksRUFBSTtBQUNoQixNQUFJLENBQUMsSUFBSSxFQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtFQUNyQztPQUVELEdBQUcsR0FBRyxVQUFBLENBQUM7U0FBSSxPQUFPLENBQUMsR0FBRyxDQUNyQixDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sR0FDbkIsQ0FBQyxLQUFLLFNBQVMsR0FBRyxXQUFXLEdBQzdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztFQUFBO09BRWQsSUFBSSxHQUFHLFVBQUEsR0FBRyxFQUFJO0FBQ2IsTUFBSSxNQUFNLENBQUE7QUFDVixTQUFPLFlBQU07QUFDWixPQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFDekIsVUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2QsVUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQTtJQUM1QjtBQUNELFVBQU8sTUFBTSxDQUFBO0dBQ2IsQ0FBQTtFQUNEOzs7O0FBR0QsV0FBVSxHQUFHLFVBQUEsQ0FBQztTQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVE7RUFBQTtPQUUvQyxhQUFhLEdBQUcsVUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBSztBQUNuRCxRQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUN2QyxTQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUNyRCxDQUFDLENBQUE7QUFDRixTQUFPLFVBQVMsTUFBTSxFQUFFO0FBQUUsVUFBTyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtHQUFFLENBQUE7RUFDNUU7T0FFRCxjQUFjLEdBQUcsVUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFLO0FBQ3ZDLE9BQUssQ0FBQyxPQUFPLENBQUMsZ0JBQW9COzs7T0FBakIsSUFBSTtPQUFFLElBQUk7QUFBUyxPQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQTtHQUFFLENBQUMsQ0FBQTs7QUFFeEUsU0FBTyxZQUFXOzs7QUFBRSxVQUFPLGdCQUFBLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFVLE9BQUMsZUFBSSxTQUFTLENBQUMsQ0FBQTtHQUFFLENBQUE7RUFDbkU7Ozs7QUFHRCxPQUFNLEdBQUcsWUFBVztBQUNuQixRQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3JCLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUM5QyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztVQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0dBQUEsQ0FBQyxDQUFBO0FBQ3RDLFNBQU8sR0FBRyxDQUFBO0VBQ1Y7Ozs7QUFHRCxPQUFNLEdBQUcsVUFBQSxVQUFVLEVBQUk7QUFDdEIsUUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNyQixZQUFVLENBQUMsT0FBTyxDQUFDOzs7T0FBRyxHQUFHO09BQUUsR0FBRztVQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztHQUFBLENBQUMsQ0FBQTtBQUN2RCxTQUFPLEdBQUcsQ0FBQTtFQUNWOzs7O0FBR0QsUUFBTyxHQUFHLFVBQUEsR0FBRyxFQUFJO0FBQ2hCLFFBQU0sR0FBRyxHQUFHLEVBQUcsQ0FBQTtBQUNmLEtBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztVQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0dBQUEsQ0FBQyxDQUFBO0FBQzFDLFNBQU8sR0FBRyxDQUFBO0VBQ1YsQ0FBQTtTQXpERCxNQUFNLEdBQU4sTUFBTTtTQUtOLEdBQUcsR0FBSCxHQUFHO1NBS0gsSUFBSSxHQUFKLElBQUk7U0FZSixVQUFVLEdBQVYsVUFBVTtTQUVWLGFBQWEsR0FBYixhQUFhO1NBT2IsY0FBYyxHQUFkLGNBQWM7U0FPZCxNQUFNLEdBQU4sTUFBTTtTQVFOLE1BQU0sR0FBTixNQUFNO1NBT04sT0FBTyxHQUFQLE9BQU8iLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVS91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0XG5cdGFzc2VydCA9IGNvbmQgPT4ge1xuXHRcdGlmICghY29uZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignQXNzZXJ0aW9uIGZhaWxlZC4nKVxuXHR9LFxuXG5cdGxvZyA9IF8gPT4gY29uc29sZS5sb2coXG5cdFx0XyA9PT0gbnVsbCA/ICdudWxsJyA6XG5cdFx0XyA9PT0gdW5kZWZpbmVkID8gJ3VuZGVmaW5lZCcgOlxuXHRcdF8udG9TdHJpbmcoKSksXG5cblx0bGF6eSA9IGdldCA9PiB7XG5cdFx0bGV0IGNhY2hlZFxuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRpZiAoY2FjaGVkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y2FjaGVkID0gZ2V0KClcblx0XHRcdFx0YXNzZXJ0KGNhY2hlZCAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNhY2hlZFxuXHRcdH1cblx0fSxcblxuXHQvLyAtMCBpcyBuZWdhdGl2ZVxuXHRpc1Bvc2l0aXZlID0gbiA9PiBuID49IDAgJiYgMSAvIG4gIT09IC1JbmZpbml0eSxcblxuXHRpbXBsZW1lbnRNYW55ID0gKGhvbGRlciwgbWV0aG9kTmFtZSwgbmFtZVRvSW1wbCkgPT4ge1xuXHRcdE9iamVjdC5rZXlzKG5hbWVUb0ltcGwpLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRob2xkZXJbbmFtZV0ucHJvdG90eXBlW21ldGhvZE5hbWVdID0gbmFtZVRvSW1wbFtuYW1lXVxuXHRcdH0pXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0W21ldGhvZE5hbWVdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfVxuXHR9LFxuXG5cdGltcGxlbWVudE1hbnkyID0gKG1ldGhvZE5hbWUsIHBhaXJzKSA9PiB7XG5cdFx0cGFpcnMuZm9yRWFjaCgoWyB0eXBlLCBpbXBsIF0pID0+IHsgdHlwZS5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBpbXBsIH0pXG5cdFx0Ly8gVE9ETzpFUzYgc3ByZWFkXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzWzBdW21ldGhvZE5hbWVdKC4uLmFyZ3VtZW50cykgfVxuXHR9LFxuXG5cdC8vIFRPRE86RVM2IEp1c3QgdXNlIGBuZXcgU2V0YFxuXHRuZXdTZXQgPSBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBzZXQgPSBuZXcgU2V0KClcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgPSBpICsgMSlcblx0XHRcdGFyZ3VtZW50c1tpXS5mb3JFYWNoKF8gPT4gc2V0LmFkZChfKSlcblx0XHRyZXR1cm4gc2V0XG5cdH0sXG5cblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgYG5ldyBNYXBgXG5cdG5ld01hcCA9IG1hcE1lbWJlcnMgPT4ge1xuXHRcdGNvbnN0IG1hcCA9IG5ldyBNYXAoKVxuXHRcdG1hcE1lbWJlcnMuZm9yRWFjaCgoWyBrZXksIHZhbCBdKSA9PiBtYXAuc2V0KGtleSwgdmFsKSlcblx0XHRyZXR1cm4gbWFwXG5cdH0sXG5cblx0Ly8gVE9ETzpFUzYgbWFwLmtleXMoKVxuXHRtYXBLZXlzID0gbWFwID0+IHtcblx0XHRjb25zdCByZXMgPSBbIF1cblx0XHRtYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4gcmVzLnB1c2goa2V5KSlcblx0XHRyZXR1cm4gcmVzXG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9