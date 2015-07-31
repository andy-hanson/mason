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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXZhdGUvanMtaW1wbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTzs7QUFFTixhQUFZLEdBQUcsVUFBUyxDQUFDLEVBQUU7QUFDMUIsU0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQTtFQUMzRDtPQUNELE9BQU8sR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDOzs7O0FBR3JDLFNBQVEsR0FBRyxPQUFPLElBQUk7QUFDckIsTUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ1YsU0FBTyxDQUFDLEdBQUcsSUFBSTtBQUFFLElBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQTtHQUFFLENBQUMsQ0FBQTtBQUN0QyxTQUFPLENBQUMsQ0FBQTtFQUNSOzs7O0FBR0QsU0FBUSxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sS0FBSztBQUM3QixNQUFJLENBQUMsR0FBRyxLQUFLLENBQUE7QUFDYixRQUFNLEdBQUcsR0FBRyxFQUFFLENBQUE7QUFDZCxTQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDYixJQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNULE1BQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FDbkI7QUFDRCxTQUFPLEdBQUcsQ0FBQTtFQUNWOzs7OztBQUlELE9BQU0sR0FBRyxVQUFTLENBQUMsRUFBRTtBQUNwQixTQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7RUFDbEQsQ0FBQTs7Ozs7Ozs7QUFHRixPQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO0FBQ3JCLE9BQ04sZUFBZSxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsS0FBSztBQUNsQyxNQUFJLENBQUMsS0FBSyxJQUFJLEVBQ2IsT0FBTyxHQUFHLENBQUE7QUFDWCxNQUFJLENBQUMsS0FBSyxTQUFTLEVBQ2xCLE9BQU8sR0FBRyxDQUFBOztBQUVYLE1BQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDeEIsTUFBSSxJQUFJLEtBQUssU0FBUyxFQUNyQixPQUFPLElBQUksQ0FBQTs7O0FBR1osUUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7O0FBRWpCLE1BQUksR0FBRyxFQUFFLENBQUE7QUFDVCxPQUFLLElBQUksR0FBRyxJQUFJLENBQUMsRUFDaEIsSUFBSSxHQUFHLEFBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEFBQUMsSUFBSSxHQUFHLEVBQUUsR0FBSSxDQUFDLENBQUEsQUFBQyxHQUFJLENBQUMsQ0FBQTs7QUFFbEQsUUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDbkIsU0FBTyxJQUFJLENBQUE7RUFDWDtPQUVELGNBQWMsR0FBRyxZQUFXO0FBQzNCLE1BQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNiLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUN6QyxJQUFJLEdBQUcsQ0FBQyxBQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFJLENBQUMsQ0FBQSxHQUFJLEVBQUUsQ0FBQTtBQUM5QyxTQUFPLElBQUksQ0FBQTtFQUNYLENBQUEiLCJmaWxlIjoicHJpdmF0ZS9qcy1pbXBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0XHRjb25zdFxuXHQvLyBLaW5kLm1zXG5cdEtpbmRDb250YWlucyA9IGZ1bmN0aW9uKF8pIHtcblx0XHRyZXR1cm4gXyAhPSBudWxsICYmIF9bdGhpc1snc3ltYm9sLWZvci1pc2EnXV0gIT09IHVuZGVmaW5lZFxuXHR9LFxuXHRpc0VtcHR5ID0gYXJyYXkgPT4gYXJyYXkubGVuZ3RoID09PSAwLFxuXG5cdC8vIE1ldGhvZC5tc1xuXHRidWlsZFN0ciA9IGJ1aWxkZXIgPT4ge1xuXHRcdGxldCBzID0gJydcblx0XHRidWlsZGVyKHN0ciA9PiB7IHMgPSBzICsgc3RyICsgJ1xcbicgfSlcblx0XHRyZXR1cm4gc1xuXHR9LFxuXG5cdC8vIHBlcmYtdGVzdC5tc1xuXHR0aW1lU3RhciA9ICh0aW1lcywgdGltZU1lKSA9PiB7XG5cdFx0bGV0IGkgPSB0aW1lc1xuXHRcdGNvbnN0IG91dCA9IFtdXG5cdFx0d2hpbGUgKGkgPiAwKSB7XG5cdFx0XHRpID0gaSAtIDFcblx0XHRcdG91dC5wdXNoKHRpbWVNZShpKSlcblx0XHR9XG5cdFx0cmV0dXJuIG91dFxuXHR9LFxuXG5cdC8vIEZ1bmN0aW9uLm1zXG5cdC8vIFRPRE86RVM2IChmLCAuLi5hcmdzKSA9PiBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5jYWxsKGYsIG51bGwsIC4uLmFyZ3MpXG5cdGlDdXJyeSA9IGZ1bmN0aW9uKGYpIHtcblx0XHRyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoZiwgYXJndW1lbnRzKVxuXHR9XG5cbi8vIGhhc2gtY29kZS5tc1xuY29uc3QgaGFzaGVzID0gbmV3IFdlYWtNYXAoKVxuZXhwb3J0IGNvbnN0XG5cdGhhc2hDb2RlRGVmYXVsdCA9IChfLCBoYXNoQ29kZSkgPT4ge1xuXHRcdGlmIChfID09PSBudWxsKVxuXHRcdFx0cmV0dXJuIDEwOFxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpXG5cdFx0XHRyZXR1cm4gMTA5XG5cblx0XHRsZXQgaGFzaCA9IGhhc2hlcy5nZXQoXylcblx0XHRpZiAoaGFzaCAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0cmV0dXJuIGhhc2hcblxuXHRcdC8vIERvbid0IHJlY3Vyc2UgaW5maW5pdGVseS5cblx0XHRoYXNoZXMuc2V0KF8sIDE3KVxuXG5cdFx0aGFzaCA9IDE3XG5cdFx0Zm9yIChsZXQga2V5IGluIF8pXG5cdFx0XHRoYXNoID0gKGhhc2hDb2RlKF9ba2V5XSkgKyAoKGhhc2ggKiAyMykgfCAwKSkgfCAwXG5cblx0XHRoYXNoZXMuc2V0KF8sIGhhc2gpXG5cdFx0cmV0dXJuIGhhc2hcblx0fSxcblxuXHRoYXNoQ29kZVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBoYXNoID0gMTNcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpID0gaSArIDEpXG5cdFx0XHRoYXNoID0gKChoYXNoICsgdGhpcy5jaGFyQ29kZUF0KGkpKSB8IDApICogMzFcblx0XHRyZXR1cm4gaGFzaFxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==