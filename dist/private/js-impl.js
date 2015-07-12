if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	var _ms2 = _ms;
	const bool = _ms2.bool;
	const unlazy = _ms2.unlazy;
	const
	// js.ms
	iNew = function (ctr, a, b, c) {
		// TODO:ES6 return new ctr(...args)
		switch (arguments.length) {
			case 0:
				throw new Error('`new` needs a constructor.');
			case 1:
				return new ctr();
			case 2:
				return new ctr(a);
			case 3:
				return new ctr(a, b);
			case 4:
				return new ctr(a, b, c);
			default:
				throw new Error('This many arguments not supported.');
		}
	},
	     

	// Boolean.ms
	// TODO:ES6 ...args
	iAnd = function () {
		const args = arguments;
		switch (args.length) {
			case 0:
				return true;
			case 1:
				return bool(args[0]);
			case 2:
				return bool(args[0]) && bool(unlazy(args[1]));
			case 3:
				return bool(args[0]) && bool(unlazy(args[1])) && bool(unlazy(args[2]));
			default:
				if (!bool(args[0])) return false;
				for (let i = 1; i < args.length; i = i + 1) if (!bool(unlazy(args[i]))) return false;
				return true;
		}
	},
	     

	// TODO:ES6 (...args) => {
	iOr = function () {
		const args = arguments;
		switch (args.length) {
			case 0:
				return false;
			case 1:
				return bool(args[0]);
			case 2:
				return bool(args[0]) || bool(unlazy(args[1]));
			case 3:
				return bool(args[0]) || bool(unlazy(args[1])) || bool(unlazy(args[2]));
			default:
				if (bool(args[0])) return true;
				for (let i = 1; i < args.length; i = i + 1) if (bool(unlazy(args[i]))) return true;
				return true;
		}
	},
	     

	// Kind.ms
	KindContains = function (kind, _) {
		return _ != null && _[kind['symbol-for-isa']] !== undefined;
	},
	      isEmpty = function (array) {
		return array.length === 0;
	},
	     

	// show.ms
	newSet = function () {
		return new Set();
	},
	     

	// Obj-Type.ms and Method.ms and Wrap-Type.ms
	buildStr = function (builder) {
		let s = '';
		builder(function (str) {
			s = s + str + '\n';
		});
		return s;
	},
	     
	// Obj-Type.ms
	addOne = function (_) {
		return _ + 1;
	},
	     

	// perf-test.ms
	timeStar = function (times, timeMe) {
		let i = times;
		const out = [];
		while (i > 0) {
			i = i - 1;
			out.push(timeMe(i));
		}
		return out;
	},
	     

	// Function.ms
	// TODO:ES6 (f, ...args) => Function.prototype.bind.call(f, null, ...args)
	iCurry = function (f) {
		return Function.prototype.bind.apply(f, arguments);
	},
	     

	// Method.js
	// TODO: Should be doable in Mason...
	methodArgNames = function (nArgs) {
		const res = [];
		const a = 'a'.charCodeAt(0);
		for (let i = 0; i < nArgs; i = i + 1) res.push(String.fromCharCode(a + i));
		return res.join(',');
	};

	exports.iNew = iNew;
	exports.iAnd = iAnd;
	exports.iOr = iOr;
	exports.KindContains = KindContains;
	exports.isEmpty = isEmpty;
	exports.newSet = newSet;
	exports.buildStr = buildStr;
	exports.addOne = addOne;
	exports.timeStar = timeStar;
	exports.iCurry = iCurry;
	exports.methodArgNames = methodArgNames;
	// hash-code.ms
	const hashes = new WeakMap();
	const hashCodeDefault = function (_, hashCode) {
		if (_ === null) return 108;
		if (_ === undefined) return 109;

		let hash = hashes.get(_);
		if (hash !== undefined) return hash;

		// Don't recurse infinitely.
		hashes.set(_, 17);

		hash = 17;
		for (let key in _) hash = hashCode(_[key]) + (hash * 23 | 0) | 0;

		hashes.set(_, hash);
		return hash;
	},
	      hashCodeString = function (_) {
		let hash = 13;
		for (let i = 0; i < _.length; i = i + 1) hash = (hash + _.charCodeAt(i) | 0) * 31;
		return hash;
	};
	exports.hashCodeDefault = hashCodeDefault;
	exports.hashCodeString = hashCodeString;
});
//# sourceMappingURL=data:application/json;base64,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cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBib29sLCB1bmxhenkgfSA9IF9tc1xuXG5leHBvcnRcdGNvbnN0XG5cdC8vIGpzLm1zXG5cdGlOZXcgPSBmdW5jdGlvbihjdHIsIGEsIGIsIGMpIHtcblx0XHQvLyBUT0RPOkVTNiByZXR1cm4gbmV3IGN0ciguLi5hcmdzKVxuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0Y2FzZSAwOiB0aHJvdyBuZXcgRXJyb3IoJ2BuZXdgIG5lZWRzIGEgY29uc3RydWN0b3IuJylcblx0XHRcdGNhc2UgMTogcmV0dXJuIG5ldyBjdHIoKVxuXHRcdFx0Y2FzZSAyOiByZXR1cm4gbmV3IGN0cihhKVxuXHRcdFx0Y2FzZSAzOiByZXR1cm4gbmV3IGN0cihhLCBiKVxuXHRcdFx0Y2FzZSA0OiByZXR1cm4gbmV3IGN0cihhLCBiLCBjKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1hbnkgYXJndW1lbnRzIG5vdCBzdXBwb3J0ZWQuJylcblx0XHR9XG5cdH0sXG5cblx0Ly8gQm9vbGVhbi5tc1xuXHQvLyBUT0RPOkVTNiAuLi5hcmdzXG5cdGlBbmQgPSBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzXG5cdFx0c3dpdGNoIChhcmdzLmxlbmd0aCkge1xuXHRcdFx0Y2FzZSAwOiByZXR1cm4gdHJ1ZVxuXHRcdFx0Y2FzZSAxOiByZXR1cm4gYm9vbChhcmdzWzBdKVxuXHRcdFx0Y2FzZSAyOiByZXR1cm4gYm9vbChhcmdzWzBdKSAmJiBib29sKHVubGF6eShhcmdzWzFdKSlcblx0XHRcdGNhc2UgMzogcmV0dXJuIGJvb2woYXJnc1swXSkgJiYgYm9vbCh1bmxhenkoYXJnc1sxXSkpICYmIGJvb2wodW5sYXp5KGFyZ3NbMl0pKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYgKCFib29sKGFyZ3NbMF0pKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyBpID0gaSArIDEpXG5cdFx0XHRcdFx0aWYgKCFib29sKHVubGF6eShhcmdzW2ldKSkpXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdH0sXG5cblx0Ly8gVE9ETzpFUzYgKC4uLmFyZ3MpID0+IHtcblx0aU9yID0gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50c1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDogcmV0dXJuIGZhbHNlXG5cdFx0XHRjYXNlIDE6IHJldHVybiBib29sKGFyZ3NbMF0pXG5cdFx0XHRjYXNlIDI6IHJldHVybiBib29sKGFyZ3NbMF0pIHx8IGJvb2wodW5sYXp5KGFyZ3NbMV0pKVxuXHRcdFx0Y2FzZSAzOiByZXR1cm4gYm9vbChhcmdzWzBdKSB8fCBib29sKHVubGF6eShhcmdzWzFdKSkgfHwgYm9vbCh1bmxhenkoYXJnc1syXSkpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZiAoYm9vbChhcmdzWzBdKSlcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyBpID0gaSArIDEpXG5cdFx0XHRcdFx0aWYgKGJvb2wodW5sYXp5KGFyZ3NbaV0pKSlcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHR9LFxuXG5cdC8vIEtpbmQubXNcblx0S2luZENvbnRhaW5zID0gKGtpbmQsIF8pID0+XG5cdFx0XyAhPSBudWxsICYmIF9ba2luZFsnc3ltYm9sLWZvci1pc2EnXV0gIT09IHVuZGVmaW5lZCxcblx0aXNFbXB0eSA9IGFycmF5ID0+IGFycmF5Lmxlbmd0aCA9PT0gMCxcblxuXHQvLyBzaG93Lm1zXG5cdG5ld1NldCA9ICgpID0+IG5ldyBTZXQoKSxcblxuXHQvLyBPYmotVHlwZS5tcyBhbmQgTWV0aG9kLm1zIGFuZCBXcmFwLVR5cGUubXNcblx0YnVpbGRTdHIgPSBidWlsZGVyID0+IHtcblx0XHRsZXQgcyA9ICcnXG5cdFx0YnVpbGRlcihzdHIgPT4geyBzID0gcyArIHN0ciArICdcXG4nIH0pXG5cdFx0cmV0dXJuIHNcblx0fSxcblx0Ly8gT2JqLVR5cGUubXNcblx0YWRkT25lID0gXyA9PiBfICsgMSxcblxuXHQvLyBwZXJmLXRlc3QubXNcblx0dGltZVN0YXIgPSAodGltZXMsIHRpbWVNZSkgPT4ge1xuXHRcdGxldCBpID0gdGltZXNcblx0XHRjb25zdCBvdXQgPSBbXVxuXHRcdHdoaWxlIChpID4gMCkge1xuXHRcdFx0aSA9IGkgLSAxXG5cdFx0XHRvdXQucHVzaCh0aW1lTWUoaSkpXG5cdFx0fVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHQvLyBGdW5jdGlvbi5tc1xuXHQvLyBUT0RPOkVTNiAoZiwgLi4uYXJncykgPT4gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChmLCBudWxsLCAuLi5hcmdzKVxuXHRpQ3VycnkgPSBmdW5jdGlvbihmKSB7XG5cdFx0cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KGYsIGFyZ3VtZW50cylcblx0fSxcblxuXHQvLyBNZXRob2QuanNcblx0Ly8gVE9ETzogU2hvdWxkIGJlIGRvYWJsZSBpbiBNYXNvbi4uLlxuXHRtZXRob2RBcmdOYW1lcyA9IG5BcmdzID0+IHtcblx0XHRjb25zdCByZXMgPSBbIF1cblx0XHRjb25zdCBhID0gJ2EnLmNoYXJDb2RlQXQoMClcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5BcmdzOyBpID0gaSArIDEpXG5cdFx0XHRyZXMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGEgKyBpKSlcblx0XHRyZXR1cm4gcmVzLmpvaW4oJywnKVxuXHR9XG5cbi8vIGhhc2gtY29kZS5tc1xuY29uc3QgaGFzaGVzID0gbmV3IFdlYWtNYXAoKVxuZXhwb3J0IGNvbnN0XG5cdGhhc2hDb2RlRGVmYXVsdCA9IChfLCBoYXNoQ29kZSkgPT4ge1xuXHRcdGlmIChfID09PSBudWxsKVxuXHRcdFx0cmV0dXJuIDEwOFxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpXG5cdFx0XHRyZXR1cm4gMTA5XG5cblx0XHRsZXQgaGFzaCA9IGhhc2hlcy5nZXQoXylcblx0XHRpZiAoaGFzaCAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0cmV0dXJuIGhhc2hcblxuXHRcdC8vIERvbid0IHJlY3Vyc2UgaW5maW5pdGVseS5cblx0XHRoYXNoZXMuc2V0KF8sIDE3KVxuXG5cdFx0aGFzaCA9IDE3XG5cdFx0Zm9yIChsZXQga2V5IGluIF8pXG5cdFx0XHRoYXNoID0gKGhhc2hDb2RlKF9ba2V5XSkgKyAoKGhhc2ggKiAyMykgfCAwKSkgfCAwXG5cblx0XHRoYXNoZXMuc2V0KF8sIGhhc2gpXG5cdFx0cmV0dXJuIGhhc2hcblx0fSxcblxuXHRoYXNoQ29kZVN0cmluZyA9IF8gPT4ge1xuXHRcdGxldCBoYXNoID0gMTNcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IF8ubGVuZ3RoOyBpID0gaSArIDEpXG5cdFx0XHRoYXNoID0gKChoYXNoICsgXy5jaGFyQ29kZUF0KGkpKSB8IDApICogMzFcblx0XHRyZXR1cm4gaGFzaFxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==