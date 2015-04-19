if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
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
//# sourceMappingURL=../../../../meta/compile/private/U/util.js.map