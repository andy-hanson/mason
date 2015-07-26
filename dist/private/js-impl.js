if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const
	// Kind.ms
	KindContains = function (_) {
		return _ != null && _[this['symbol-for-isa']] !== undefined;
	},
	      isEmpty = array => array.length === 0,
	     

	// show.ms
	newSet = () => new Set(),
	     

	// Method.ms
	buildStr = builder => {
		let s = '';
		builder(str => {
			s = s + str + '\n';
		});
		return s;
	},
	     

	// perf-test.ms
	timeStar = (times, timeMe) => {
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
	};

	exports.KindContains = KindContains;
	exports.isEmpty = isEmpty;
	exports.newSet = newSet;
	exports.buildStr = buildStr;
	exports.timeStar = timeStar;
	exports.iCurry = iCurry;
	// hash-code.ms
	const hashes = new WeakMap();
	const hashCodeDefault = (_, hashCode) => {
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
	      hashCodeString = function () {
		let hash = 13;
		for (let i = 0; i < this.length; i = i + 1) hash = (hash + this.charCodeAt(i) | 0) * 31;
		return hash;
	};
	exports.hashCodeDefault = hashCodeDefault;
	exports.hashCodeString = hashCodeString;
});
//# sourceMappingURL=data:application/json;base64,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O0VBQ1gsQ0FBQTtTQTFCRCxlQUFlLEdBQWYsZUFBZTtTQXFCZixjQUFjLEdBQWQsY0FBYyIsImZpbGUiOiJwcml2YXRlL2pzLWltcGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRcdGNvbnN0XG5cdC8vIEtpbmQubXNcblx0S2luZENvbnRhaW5zID0gZnVuY3Rpb24oXykge1xuXHRcdHJldHVybiBfICE9IG51bGwgJiYgX1t0aGlzWydzeW1ib2wtZm9yLWlzYSddXSAhPT0gdW5kZWZpbmVkXG5cdH0sXG5cdGlzRW1wdHkgPSBhcnJheSA9PiBhcnJheS5sZW5ndGggPT09IDAsXG5cblx0Ly8gc2hvdy5tc1xuXHRuZXdTZXQgPSAoKSA9PiBuZXcgU2V0KCksXG5cblx0Ly8gTWV0aG9kLm1zXG5cdGJ1aWxkU3RyID0gYnVpbGRlciA9PiB7XG5cdFx0bGV0IHMgPSAnJ1xuXHRcdGJ1aWxkZXIoc3RyID0+IHsgcyA9IHMgKyBzdHIgKyAnXFxuJyB9KVxuXHRcdHJldHVybiBzXG5cdH0sXG5cblx0Ly8gcGVyZi10ZXN0Lm1zXG5cdHRpbWVTdGFyID0gKHRpbWVzLCB0aW1lTWUpID0+IHtcblx0XHRsZXQgaSA9IHRpbWVzXG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHR3aGlsZSAoaSA+IDApIHtcblx0XHRcdGkgPSBpIC0gMVxuXHRcdFx0b3V0LnB1c2godGltZU1lKGkpKVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0XG5cdH0sXG5cblx0Ly8gRnVuY3Rpb24ubXNcblx0Ly8gVE9ETzpFUzYgKGYsIC4uLmFyZ3MpID0+IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoZiwgbnVsbCwgLi4uYXJncylcblx0aUN1cnJ5ID0gZnVuY3Rpb24oZikge1xuXHRcdHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShmLCBhcmd1bWVudHMpXG5cdH1cblxuLy8gaGFzaC1jb2RlLm1zXG5jb25zdCBoYXNoZXMgPSBuZXcgV2Vha01hcCgpXG5leHBvcnQgY29uc3Rcblx0aGFzaENvZGVEZWZhdWx0ID0gKF8sIGhhc2hDb2RlKSA9PiB7XG5cdFx0aWYgKF8gPT09IG51bGwpXG5cdFx0XHRyZXR1cm4gMTA4XG5cdFx0aWYgKF8gPT09IHVuZGVmaW5lZClcblx0XHRcdHJldHVybiAxMDlcblxuXHRcdGxldCBoYXNoID0gaGFzaGVzLmdldChfKVxuXHRcdGlmIChoYXNoICE9PSB1bmRlZmluZWQpXG5cdFx0XHRyZXR1cm4gaGFzaFxuXG5cdFx0Ly8gRG9uJ3QgcmVjdXJzZSBpbmZpbml0ZWx5LlxuXHRcdGhhc2hlcy5zZXQoXywgMTcpXG5cblx0XHRoYXNoID0gMTdcblx0XHRmb3IgKGxldCBrZXkgaW4gXylcblx0XHRcdGhhc2ggPSAoaGFzaENvZGUoX1trZXldKSArICgoaGFzaCAqIDIzKSB8IDApKSB8IDBcblxuXHRcdGhhc2hlcy5zZXQoXywgaGFzaClcblx0XHRyZXR1cm4gaGFzaFxuXHR9LFxuXG5cdGhhc2hDb2RlU3RyaW5nID0gZnVuY3Rpb24oKSB7XG5cdFx0bGV0IGhhc2ggPSAxM1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgPSBpICsgMSlcblx0XHRcdGhhc2ggPSAoKGhhc2ggKyB0aGlzLmNoYXJDb2RlQXQoaSkpIHwgMCkgKiAzMVxuXHRcdHJldHVybiBoYXNoXG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9