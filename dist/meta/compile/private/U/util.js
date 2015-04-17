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
	      setUnion = function () {
		const s = new Set();
		for (let i = 0; i < arguments.length; i = i + 1) for (let x of arguments[i].values()) s.add(x);
		return s;
	};
	exports.assert = assert;
	exports.log = log;
	exports.lazy = lazy;
	exports.isPositive = isPositive;
	exports.implementMany = implementMany;
	exports.implementMany2 = implementMany2;
	exports.setUnion = setUnion;
});
//# sourceMappingURL=../../../../meta/compile/private/U/util.js.map