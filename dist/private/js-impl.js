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

	// hash-code.ms
	exports.KindContains = KindContains;
	exports.isEmpty = isEmpty;
	exports.newSet = newSet;
	exports.buildStr = buildStr;
	exports.timeStar = timeStar;
	exports.iCurry = iCurry;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXZhdGUvanMtaW1wbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTzs7QUFFTixhQUFZLEdBQUcsVUFBUyxDQUFDLEVBQUU7QUFDMUIsU0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQTtFQUMzRDtPQUNELE9BQU8sR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDOzs7O0FBR3JDLE9BQU0sR0FBRyxNQUFNLElBQUksR0FBRyxFQUFFOzs7O0FBR3hCLFNBQVEsR0FBRyxPQUFPLElBQUk7QUFDckIsTUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ1YsU0FBTyxDQUFDLEdBQUcsSUFBSTtBQUFFLElBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQTtHQUFFLENBQUMsQ0FBQTtBQUN0QyxTQUFPLENBQUMsQ0FBQTtFQUNSOzs7O0FBR0QsU0FBUSxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sS0FBSztBQUM3QixNQUFJLENBQUMsR0FBRyxLQUFLLENBQUE7QUFDYixRQUFNLEdBQUcsR0FBRyxFQUFFLENBQUE7QUFDZCxTQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDYixJQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNULE1BQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FDbkI7QUFDRCxTQUFPLEdBQUcsQ0FBQTtFQUNWOzs7OztBQUlELE9BQU0sR0FBRyxVQUFTLENBQUMsRUFBRTtBQUNwQixTQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7RUFDbEQsQ0FBQTs7Ozs7Ozs7O0FBR0YsT0FBTSxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQTtBQUNyQixPQUNOLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLEtBQUs7QUFDbEMsTUFBSSxDQUFDLEtBQUssSUFBSSxFQUNiLE9BQU8sR0FBRyxDQUFBO0FBQ1gsTUFBSSxDQUFDLEtBQUssU0FBUyxFQUNsQixPQUFPLEdBQUcsQ0FBQTs7QUFFWCxNQUFJLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3hCLE1BQUksSUFBSSxLQUFLLFNBQVMsRUFDckIsT0FBTyxJQUFJLENBQUE7OztBQUdaLFFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBOztBQUVqQixNQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ1QsT0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQ2hCLElBQUksR0FBRyxBQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxBQUFDLElBQUksR0FBRyxFQUFFLEdBQUksQ0FBQyxDQUFBLEFBQUMsR0FBSSxDQUFDLENBQUE7O0FBRWxELFFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ25CLFNBQU8sSUFBSSxDQUFBO0VBQ1g7T0FFRCxjQUFjLEdBQUcsWUFBVztBQUMzQixNQUFJLElBQUksR0FBRyxFQUFFLENBQUE7QUFDYixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDekMsSUFBSSxHQUFHLENBQUMsQUFBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBSSxDQUFDLENBQUEsR0FBSSxFQUFFLENBQUE7QUFDOUMsU0FBTyxJQUFJLENBQUE7RUFDWCxDQUFBIiwiZmlsZSI6InByaXZhdGUvanMtaW1wbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydFx0Y29uc3Rcblx0Ly8gS2luZC5tc1xuXHRLaW5kQ29udGFpbnMgPSBmdW5jdGlvbihfKSB7XG5cdFx0cmV0dXJuIF8gIT0gbnVsbCAmJiBfW3RoaXNbJ3N5bWJvbC1mb3ItaXNhJ11dICE9PSB1bmRlZmluZWRcblx0fSxcblx0aXNFbXB0eSA9IGFycmF5ID0+IGFycmF5Lmxlbmd0aCA9PT0gMCxcblxuXHQvLyBzaG93Lm1zXG5cdG5ld1NldCA9ICgpID0+IG5ldyBTZXQoKSxcblxuXHQvLyBNZXRob2QubXNcblx0YnVpbGRTdHIgPSBidWlsZGVyID0+IHtcblx0XHRsZXQgcyA9ICcnXG5cdFx0YnVpbGRlcihzdHIgPT4geyBzID0gcyArIHN0ciArICdcXG4nIH0pXG5cdFx0cmV0dXJuIHNcblx0fSxcblxuXHQvLyBwZXJmLXRlc3QubXNcblx0dGltZVN0YXIgPSAodGltZXMsIHRpbWVNZSkgPT4ge1xuXHRcdGxldCBpID0gdGltZXNcblx0XHRjb25zdCBvdXQgPSBbXVxuXHRcdHdoaWxlIChpID4gMCkge1xuXHRcdFx0aSA9IGkgLSAxXG5cdFx0XHRvdXQucHVzaCh0aW1lTWUoaSkpXG5cdFx0fVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHQvLyBGdW5jdGlvbi5tc1xuXHQvLyBUT0RPOkVTNiAoZiwgLi4uYXJncykgPT4gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChmLCBudWxsLCAuLi5hcmdzKVxuXHRpQ3VycnkgPSBmdW5jdGlvbihmKSB7XG5cdFx0cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KGYsIGFyZ3VtZW50cylcblx0fVxuXG4vLyBoYXNoLWNvZGUubXNcbmNvbnN0IGhhc2hlcyA9IG5ldyBXZWFrTWFwKClcbmV4cG9ydCBjb25zdFxuXHRoYXNoQ29kZURlZmF1bHQgPSAoXywgaGFzaENvZGUpID0+IHtcblx0XHRpZiAoXyA9PT0gbnVsbClcblx0XHRcdHJldHVybiAxMDhcblx0XHRpZiAoXyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0cmV0dXJuIDEwOVxuXG5cdFx0bGV0IGhhc2ggPSBoYXNoZXMuZ2V0KF8pXG5cdFx0aWYgKGhhc2ggIT09IHVuZGVmaW5lZClcblx0XHRcdHJldHVybiBoYXNoXG5cblx0XHQvLyBEb24ndCByZWN1cnNlIGluZmluaXRlbHkuXG5cdFx0aGFzaGVzLnNldChfLCAxNylcblxuXHRcdGhhc2ggPSAxN1xuXHRcdGZvciAobGV0IGtleSBpbiBfKVxuXHRcdFx0aGFzaCA9IChoYXNoQ29kZShfW2tleV0pICsgKChoYXNoICogMjMpIHwgMCkpIHwgMFxuXG5cdFx0aGFzaGVzLnNldChfLCBoYXNoKVxuXHRcdHJldHVybiBoYXNoXG5cdH0sXG5cblx0aGFzaENvZGVTdHJpbmcgPSBmdW5jdGlvbigpIHtcblx0XHRsZXQgaGFzaCA9IDEzXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSA9IGkgKyAxKVxuXHRcdFx0aGFzaCA9ICgoaGFzaCArIHRoaXMuY2hhckNvZGVBdChpKSkgfCAwKSAqIDMxXG5cdFx0cmV0dXJuIGhhc2hcblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=