if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './util'], function (exports, _util) {
	'use strict';

	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const head = function (arr) {
		_util.assert(!isEmpty(arr));
		return arr[0];
	},
	      last = function (arr) {
		_util.assert(!isEmpty(arr));
		return arr[arr.length - 1];
	},
	      tail = function (arr) {
		_util.assert(!isEmpty(arr));
		return arr.slice(1);
	},
	      rtail = function (arr) {
		_util.assert(!isEmpty(arr));
		return arr.slice(0, arr.length - 1);
	},
	      toArray = function (iter) {
		const out = [];
		for (let em of iter) out.push(em);
		return out;
	},
	      repeat = function (em, n) {
		_util.assert(n >= 0);
		const out = [];
		for (let i = n; i > 0; i = i - 1) out.push(em);
		return out;
	},
	      isEmpty = function (arr) {
		return arr.length === 0;
	},
	      range = function (min, max) {
		_util.assert(min < max);
		const out = [];
		for (let i = min; i < max; i = i + 1) out.push(i);
		return out;
	},
	      flatMap = function (mapped, mapper) {
		const out = [];
		mapped.forEach(function (_, i) {
			return out.push.apply(out, _toConsumableArray(mapper(_, i)));
		});
		return out;
	},
	     

	// These are mutators for slight performance gain
	unshift = function (em, mutArr) {
		mutArr.unshift(em);
		return mutArr;
	},
	      push = function (mutArr, em) {
		mutArr.push(em);
		return mutArr;
	},
	      cat = function (mutArr, ems) {
		mutArr.push.apply(mutArr, _toConsumableArray(ems));
		return mutArr;
	};
	exports.head = head;
	exports.last = last;
	exports.tail = tail;
	exports.rtail = rtail;
	exports.toArray = toArray;
	exports.repeat = repeat;
	exports.isEmpty = isEmpty;
	exports.range = range;
	exports.flatMap = flatMap;
	exports.unshift = unshift;
	exports.push = push;
	exports.cat = cat;
});
//# sourceMappingURL=../../../../meta/compile/private/U/Bag.js.map