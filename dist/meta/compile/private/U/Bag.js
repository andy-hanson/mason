if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "./util", "./Op", "./type"], function (exports, _util, _Op, _type) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var assert = _util.assert;
	var None = _Op.None;
	var some = _Op.some;

	var type = _interopRequire(_type);

	const head = function (arr) {
		assert(!isEmpty(arr));
		return arr[0];
	},
	      last = function (arr) {
		assert(!isEmpty(arr));
		return arr[arr.length - 1];
	},
	      tail = function (arr) {
		assert(!isEmpty(arr));
		return arr.slice(1);
	},
	      rtail = function (arr) {
		assert(!isEmpty(arr));
		return arr.slice(0, arr.length - 1);
	},
	      toArray = function (iter) {
		const out = [];
		for (let em of iter) out.push(em);
		return out;
	},
	      repeat = function (em, n) {
		type(em, Object, n, Number);
		assert(n >= 0);
		const out = [];
		for (let i = n; i > 0; i = i - 1) out.push(em);
		return out;
	},
	      isEmpty = function (arr) {
		type(arr, Array);
		return arr.length === 0;
	},
	      range = function (min, max) {
		type(min, Number, max, Number);
		assert(min < max);
		const out = [];
		for (let i = min; i < max; i = i + 1) out.push(i);
		return out;
	},
	      flatMap = function (mapped, mapper) {
		type(mapped, Array, mapper, Function);
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