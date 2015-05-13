if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const assert = function (cond) {
		if (!cond) throw new Error('Assertion failed.');
	},
	     

	// -0 is negative
	isPositive = function (n) {
		return n >= 0 && 1 / n !== -Infinity;
	},
	      implementMany = function (holder, methodName, nameToImpl) {
		return Object.keys(nameToImpl).forEach(function (name) {
			return holder[name].prototype[methodName] = nameToImpl[name];
		});
	},
	     

	// TODO:ES6 Just use `new Set`
	newSet = function () {
		const set = new Set();
		for (let i = 0; i < arguments.length; i = i + 1) arguments[i].forEach(function (_) {
			return set.add(_);
		});
		return set;
	},
	     

	// TODO:ES6 map.keys()
	mapKeys = function (map) {
		const res = [];
		map.forEach(function (value, key) {
			return res.push(key);
		});
		return res;
	},
	      type = function () {
		for (var _len = arguments.length, valsTypes = Array(_len), _key = 0; _key < _len; _key++) {
			valsTypes[_key] = arguments[_key];
		}

		for (let i = 0; i < valsTypes.length; i = i + 2) {
			const instance = valsTypes[i],
			      itsType = valsTypes[i + 1];
			if (!(Object(instance) instanceof itsType)) throw new Error('' + instance + ' is not a ' + itsType.name);
		}
	};
	exports.assert = assert;
	exports.isPositive = isPositive;
	exports.implementMany = implementMany;
	exports.newSet = newSet;
	exports.mapKeys = mapKeys;
	exports.type = type;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1UvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTyxPQUNOLE1BQU0sR0FBRyxVQUFBLElBQUksRUFBSTtBQUNoQixNQUFJLENBQUMsSUFBSSxFQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtFQUNyQzs7OztBQUdELFdBQVUsR0FBRyxVQUFBLENBQUM7U0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRO0VBQUE7T0FFL0MsYUFBYSxHQUFHLFVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVO1NBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtVQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7R0FBQSxDQUFDO0VBQUE7Ozs7QUFHeEQsT0FBTSxHQUFHLFlBQVc7QUFDbkIsUUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNyQixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDOUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7VUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztHQUFBLENBQUMsQ0FBQTtBQUN0QyxTQUFPLEdBQUcsQ0FBQTtFQUNWOzs7O0FBR0QsUUFBTyxHQUFHLFVBQUEsR0FBRyxFQUFJO0FBQ2hCLFFBQU0sR0FBRyxHQUFHLEVBQUcsQ0FBQTtBQUNmLEtBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztVQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0dBQUEsQ0FBQyxDQUFBO0FBQzFDLFNBQU8sR0FBRyxDQUFBO0VBQ1Y7T0FFRCxJQUFJLEdBQUcsWUFBa0I7b0NBQWQsU0FBUztBQUFULFlBQVM7OztBQUNuQixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNoRCxTQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQUUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDekQsT0FBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxPQUFPLENBQUEsQUFBQyxFQUN6QyxNQUFNLElBQUksS0FBSyxNQUFJLFFBQVEsa0JBQWEsT0FBTyxDQUFDLElBQUksQ0FBRyxDQUFBO0dBQ3hEO0VBQ0QsQ0FBQTtTQWpDRCxNQUFNLEdBQU4sTUFBTTtTQU1OLFVBQVUsR0FBVixVQUFVO1NBRVYsYUFBYSxHQUFiLGFBQWE7U0FLYixNQUFNLEdBQU4sTUFBTTtTQVFOLE9BQU8sR0FBUCxPQUFPO1NBTVAsSUFBSSxHQUFKLElBQUkiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVS91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0XG5cdGFzc2VydCA9IGNvbmQgPT4ge1xuXHRcdGlmICghY29uZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignQXNzZXJ0aW9uIGZhaWxlZC4nKVxuXHR9LFxuXG5cdC8vIC0wIGlzIG5lZ2F0aXZlXG5cdGlzUG9zaXRpdmUgPSBuID0+IG4gPj0gMCAmJiAxIC8gbiAhPT0gLUluZmluaXR5LFxuXG5cdGltcGxlbWVudE1hbnkgPSAoaG9sZGVyLCBtZXRob2ROYW1lLCBuYW1lVG9JbXBsKSA9PlxuXHRcdE9iamVjdC5rZXlzKG5hbWVUb0ltcGwpLmZvckVhY2gobmFtZSA9PlxuXHRcdFx0aG9sZGVyW25hbWVdLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG5hbWVUb0ltcGxbbmFtZV0pLFxuXG5cdC8vIFRPRE86RVM2IEp1c3QgdXNlIGBuZXcgU2V0YFxuXHRuZXdTZXQgPSBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBzZXQgPSBuZXcgU2V0KClcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgPSBpICsgMSlcblx0XHRcdGFyZ3VtZW50c1tpXS5mb3JFYWNoKF8gPT4gc2V0LmFkZChfKSlcblx0XHRyZXR1cm4gc2V0XG5cdH0sXG5cblx0Ly8gVE9ETzpFUzYgbWFwLmtleXMoKVxuXHRtYXBLZXlzID0gbWFwID0+IHtcblx0XHRjb25zdCByZXMgPSBbIF1cblx0XHRtYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4gcmVzLnB1c2goa2V5KSlcblx0XHRyZXR1cm4gcmVzXG5cdH0sXG5cblx0dHlwZSA9ICguLi52YWxzVHlwZXMpID0+IHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHZhbHNUeXBlcy5sZW5ndGg7IGkgPSBpICsgMikge1xuXHRcdFx0Y29uc3QgaW5zdGFuY2UgPSB2YWxzVHlwZXNbaV0sIGl0c1R5cGUgPSB2YWxzVHlwZXNbaSArIDFdXG5cdFx0XHRpZiAoIShPYmplY3QoaW5zdGFuY2UpIGluc3RhbmNlb2YgaXRzVHlwZSkpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgJHtpbnN0YW5jZX0gaXMgbm90IGEgJHtpdHNUeXBlLm5hbWV9YClcblx0XHR9XG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9