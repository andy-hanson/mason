if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const pAdd = function (object, key, value) {
		return Object.defineProperty(object, key, {
			value: value,
			writable: false,
			enumerable: false,
			configurable: false
		});
	};

	exports.pAdd = pAdd;
	// region Builtin Functions for use by the compiler
	const
	// This object contains functions called upon by compiled code.
	ms = {},
	      msDef = function (name, fun) {
		return pAdd(ms, name, fun);
	},
	      msCall = function (name) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return ms[name].apply(ms, args);
	};

	exports.ms = ms;
	exports.msDef = msDef;
	exports.msCall = msCall;
	pAdd(global, '_ms', ms);

	const msDefs = {
		// TODO: use +! method
		add: function (bag, value) {
			bag.push(value);
		},

		addMany: function (bag, values) {
			for (let value of values) ms.add(bag, value);
		},

		// TODO: use assoc! method
		assoc: function (map, key, val) {
			map.set(key, val);
		},

		lazyGetModule: function (module) {
			if (module === undefined) throw new Error('Module undefined.');
			return module._get instanceof ms.Lazy ? module._get : ms.lazy(function () {
				return module;
			});
		},

		getModule: function (module) {
			if (module === undefined) throw new Error('Module undefined.');
			return module._get instanceof ms.Lazy ? module._get.get() : module;
		},

		getDefaultExport: function (module) {
			if (module === undefined) throw new Error('Module undefined.');
			const mod = ms.getModule(module);
			return mod.default === undefined ? mod : mod.default;
		},

		lazyProp: function (lazyObject, key) {
			if (!(lazyObject instanceof ms.Lazy)) throw new Error('Expected a Lazy, got: ' + lazyObject);
			return ms.lazy(function () {
				return lazyObject.get()[key];
			});
		},

		get: function (object, key) {
			const _ = object[key];
			if (_ === undefined) throw new Error('Module ' + object.name + ' does not have ' + key);
			return _;
		},

		bool: function (b) {
			if (typeof b !== 'boolean') {
				console.log(b);
				throw new Error('Expected Boolean, got ' + b);
			}
			return b;
		},

		// Used for splat calls.
		// TODO:ES6 Shouldn't need. `fun(...arg)` should work for any iterable.
		arr: function (_) {
			if (_ instanceof Array) return _;
			const out = [];
			for (let em of _) out.push(em);
			return out;
		},

		error: function (err) {
			if (err instanceof Error) return err;else if (typeof err === 'string') return new Error(err);else if (err instanceof _ms.Lazy) return _ms.error(err.get());else throw new Error('Thrown value must be Error or String');
		},

		// For use by Obj-Type.ms generated code.
		checkNoExtras: function (_this, _, rtName) {
			// If there was some key in `_` that we didn't copy:
			if (Object.keys(_).length > Object.keys(_this).length) for (const name of Object.getOwnPropertyNames(_))
			// TODO:DISPLAYNAME
			if (name !== 'name') if (!Object.prototype.hasOwnProperty.call(_this, name)) throw new Error('Extra prop ' + name + ' for ' + rtName);
		},

		Lazy: function Lazy(get) {
			var _this2 = this;

			this.get = function () {
				_this2.get = function () {
					throw new Error('Lazy value depends on itself. Thunk: ' + get);
				};
				const _ = get();
				_this2.get = function () {
					return _;
				};
				return _;
			};
		},
		lazy: function (_) {
			return new ms.Lazy(_);
		},
		unlazy: function (_) {
			return _ instanceof ms.Lazy ? _.get() : _;
		},

		// Unlike Object.assign, does *not* invoke getters.
		set: function (value, propertiesObject, opName) {
			for (const key in propertiesObject) Object.defineProperty(value, key, Object.getOwnPropertyDescriptor(propertiesObject, key));
			if (!(value instanceof Function)) if (opName !== undefined) ms.setName(value, opName);
			return value;
		},
		setName: function (value, name) {
			value.name = name;
			return value;
		},
		setLazy: function (value, name, lazy) {
			Object.defineProperty(value, name, { get: lazy.get, enumerable: true });
		}
	};
	for (const def in msDefs) msDef(def, msDefs[def]);

	const msDefTemp = function (name, fun) {
		return ms[name] = fun;
	};

	// Overridden by show.ms.
	msDefTemp('show', function (_) {
		if (typeof _ !== 'string' && typeof _ !== 'number') throw new Error('Only use Strings or Numbers here until this is overridden by show.ms. Got:\n' + _);
		return _.toString();
	});

	// region Contains
	// Some Types want to implement contains? before it is officially defined.
	const containsImplSymbol = 'impl-contains?';
	exports.containsImplSymbol = containsImplSymbol;
	const implContains = function (type, impl) {
		return pAdd(type.prototype, containsImplSymbol, impl);
	};

	exports.implContains = implContains;
	// Overwritten by Type/index.ms to actually do type checking.
	msDefTemp('checkContains', function (_type, val) {
		return val;
	});

	// An object is a Function if its typeof is `function`.
	// This helps us catch any callabe Obj-Type.
	// TODO: Separate Function from Callable
	// Since these are primitives, we can't use `instanceof`.
	for (const type of [Function, Boolean, String, Symbol, Number]) {
		// Generated code is faster than using a closure.
		const src = 'return typeof _ === "' + type.name.toLowerCase() + '"';
		pAdd(type, containsImplSymbol, Function('ignore', '_', src));
	}

	// Functions are Objects, so we do this one differently.
	// TODO: This treats Object.create(null) as an object. Do we want that?
	pAdd(Object, containsImplSymbol, function (_ignore, _) {
		if (_ === null) return false;
		switch (typeof _) {
			case 'function':
			case 'object':
				return true;
			default:
				return false;
		}
	});
});
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0VBQ25CLENBQUMsQ0FBQTs7OztBQUlLLE9BQU0sa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUE7U0FBckMsa0JBQWtCLEdBQWxCLGtCQUFrQjtBQUN4QixPQUFNLFlBQVksR0FBRyxVQUFDLElBQUksRUFBRSxJQUFJO1NBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQztFQUFBLENBQUE7O1NBRGxDLFlBQVksR0FBWixZQUFZOztBQUl6QixVQUFTLENBQUMsZUFBZSxFQUFFLFVBQUMsS0FBSyxFQUFFLEdBQUc7U0FBSyxHQUFHO0VBQUEsQ0FBQyxDQUFBOzs7Ozs7QUFNL0MsTUFBSyxNQUFNLElBQUksSUFBSSxDQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsRUFBRTs7QUFFakUsUUFBTSxHQUFHLEdBQUcsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUE7QUFDbkUsTUFBSSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0VBQzVEOzs7O0FBSUQsS0FBSSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxVQUFTLE9BQU8sRUFBRSxDQUFDLEVBQUU7QUFDckQsTUFBSSxDQUFDLEtBQUssSUFBSSxFQUNiLE9BQU8sS0FBSyxDQUFBO0FBQ2IsVUFBUSxPQUFPLENBQUM7QUFDZixRQUFLLFVBQVUsQ0FBQztBQUNoQixRQUFLLFFBQVE7QUFDWixXQUFPLElBQUksQ0FBQTtBQUFBLEFBQ1o7QUFDQyxXQUFPLEtBQUssQ0FBQTtBQUFBLEdBQ2I7RUFDRCxDQUFDLENBQUEiLCJmaWxlIjoicHJpdmF0ZS9ib290c3RyYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcEFkZCA9IChvYmplY3QsIGtleSwgdmFsdWUpID0+XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuXHRcdHZhbHVlLFxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRjb25maWd1cmFibGU6IGZhbHNlXG5cdH0pXG5cbi8vIHJlZ2lvbiBCdWlsdGluIEZ1bmN0aW9ucyBmb3IgdXNlIGJ5IHRoZSBjb21waWxlclxuZXhwb3J0IGNvbnN0XG5cdC8vIFRoaXMgb2JqZWN0IGNvbnRhaW5zIGZ1bmN0aW9ucyBjYWxsZWQgdXBvbiBieSBjb21waWxlZCBjb2RlLlxuXHRtcyA9IHsgfSxcblx0bXNEZWYgPSAobmFtZSwgZnVuKSA9PlxuXHRcdHBBZGQobXMsIG5hbWUsIGZ1biksXG5cdG1zQ2FsbCA9IChuYW1lLCAuLi5hcmdzKSA9PlxuXHRcdG1zW25hbWVdKC4uLmFyZ3MpXG5cbnBBZGQoZ2xvYmFsLCAnX21zJywgbXMpXG5cbmNvbnN0IG1zRGVmcyA9IHtcblx0Ly8gVE9ETzogdXNlICshIG1ldGhvZFxuXHRhZGQoYmFnLCB2YWx1ZSkge1xuXHRcdGJhZy5wdXNoKHZhbHVlKVxuXHR9LFxuXG5cdGFkZE1hbnkoYmFnLCB2YWx1ZXMpIHtcblx0XHRmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpXG5cdFx0XHRtcy5hZGQoYmFnLCB2YWx1ZSlcblx0fSxcblxuXHQvLyBUT0RPOiB1c2UgYXNzb2MhIG1ldGhvZFxuXHRhc3NvYyhtYXAsIGtleSwgdmFsKSB7XG5cdFx0bWFwLnNldChrZXksIHZhbClcblx0fSxcblxuXHRsYXp5R2V0TW9kdWxlKG1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUgPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdHJldHVybiBtb2R1bGUuX2dldCBpbnN0YW5jZW9mIG1zLkxhenkgPyBtb2R1bGUuX2dldCA6IG1zLmxhenkoKCkgPT4gbW9kdWxlKVxuXHR9LFxuXG5cdGdldE1vZHVsZShtb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRyZXR1cm4gbW9kdWxlLl9nZXQgaW5zdGFuY2VvZiBtcy5MYXp5ID8gbW9kdWxlLl9nZXQuZ2V0KCkgOiBtb2R1bGVcblx0fSxcblxuXHRnZXREZWZhdWx0RXhwb3J0OiBtb2R1bGUgPT4ge1xuXHRcdGlmIChtb2R1bGUgPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdGNvbnN0IG1vZCA9IG1zLmdldE1vZHVsZShtb2R1bGUpXG5cdFx0cmV0dXJuIG1vZC5kZWZhdWx0ID09PSB1bmRlZmluZWQgPyBtb2QgOiBtb2QuZGVmYXVsdFxuXHR9LFxuXG5cdGxhenlQcm9wKGxhenlPYmplY3QsIGtleSkge1xuXHRcdGlmICghKGxhenlPYmplY3QgaW5zdGFuY2VvZiBtcy5MYXp5KSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYSBMYXp5LCBnb3Q6ICR7bGF6eU9iamVjdH1gKVxuXHRcdHJldHVybiBtcy5sYXp5KCgpID0+IGxhenlPYmplY3QuZ2V0KClba2V5XSlcblx0fSxcblxuXHRnZXQob2JqZWN0LCBrZXkpIHtcblx0XHRjb25zdCBfID0gb2JqZWN0W2tleV1cblx0XHRpZiAoXyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBNb2R1bGUgJHtvYmplY3QubmFtZX0gZG9lcyBub3QgaGF2ZSAke2tleX1gKVxuXHRcdHJldHVybiBfXG5cdH0sXG5cblx0Ym9vbChiKSB7XG5cdFx0aWYgKHR5cGVvZiBiICE9PSAnYm9vbGVhbicpIHtcblx0XHRcdGNvbnNvbGUubG9nKGIpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIEJvb2xlYW4sIGdvdCAke2J9YClcblx0XHR9XG5cdFx0cmV0dXJuIGJcblx0fSxcblxuXHQvLyBVc2VkIGZvciBzcGxhdCBjYWxscy5cblx0Ly8gVE9ETzpFUzYgU2hvdWxkbid0IG5lZWQuIGBmdW4oLi4uYXJnKWAgc2hvdWxkIHdvcmsgZm9yIGFueSBpdGVyYWJsZS5cblx0YXJyKF8pIHtcblx0XHRpZiAoXyBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0cmV0dXJuIF9cblx0XHRjb25zdCBvdXQgPSBbIF1cblx0XHRmb3IgKGxldCBlbSBvZiBfKVxuXHRcdFx0b3V0LnB1c2goZW0pXG5cdFx0cmV0dXJuIG91dFxuXHR9LFxuXG5cdGVycm9yKGVycikge1xuXHRcdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcilcblx0XHRcdHJldHVybiBlcnJcblx0XHRlbHNlIGlmICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJylcblx0XHRcdHJldHVybiBuZXcgRXJyb3IoZXJyKVxuXHRcdGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIF9tcy5MYXp5KVxuXHRcdFx0cmV0dXJuIF9tcy5lcnJvcihlcnIuZ2V0KCkpXG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUaHJvd24gdmFsdWUgbXVzdCBiZSBFcnJvciBvciBTdHJpbmcnKVxuXHR9LFxuXG5cdC8vIEZvciB1c2UgYnkgT2JqLVR5cGUubXMgZ2VuZXJhdGVkIGNvZGUuXG5cdGNoZWNrTm9FeHRyYXMoX3RoaXMsIF8sIHJ0TmFtZSkge1xuXHRcdC8vIElmIHRoZXJlIHdhcyBzb21lIGtleSBpbiBgX2AgdGhhdCB3ZSBkaWRuJ3QgY29weTpcblx0XHRpZiAoT2JqZWN0LmtleXMoXykubGVuZ3RoID4gT2JqZWN0LmtleXMoX3RoaXMpLmxlbmd0aClcblx0XHRcdGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhfKSlcblx0XHRcdFx0Ly8gVE9ETzpESVNQTEFZTkFNRVxuXHRcdFx0XHRpZiAobmFtZSAhPT0gJ25hbWUnKVxuXHRcdFx0XHRcdGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF90aGlzLCBuYW1lKSlcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignRXh0cmEgcHJvcCAnICsgbmFtZSArICcgZm9yICcgKyBydE5hbWUpXG5cdH0sXG5cblx0TGF6eTogZnVuY3Rpb24gTGF6eShnZXQpIHtcblx0XHR0aGlzLmdldCA9ICgpID0+IHtcblx0XHRcdHRoaXMuZ2V0ID0gKCkgPT4ge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYExhenkgdmFsdWUgZGVwZW5kcyBvbiBpdHNlbGYuIFRodW5rOiAke2dldH1gKVxuXHRcdFx0fVxuXHRcdFx0Y29uc3QgXyA9IGdldCgpXG5cdFx0XHR0aGlzLmdldCA9ICgpID0+IF9cblx0XHRcdHJldHVybiBfXG5cdFx0fVxuXHR9LFxuXHRsYXp5OiBfID0+IG5ldyBtcy5MYXp5KF8pLFxuXHR1bmxhenk6IF8gPT4gXyBpbnN0YW5jZW9mIG1zLkxhenkgPyBfLmdldCgpIDogXyxcblxuXHQvLyBVbmxpa2UgT2JqZWN0LmFzc2lnbiwgZG9lcyAqbm90KiBpbnZva2UgZ2V0dGVycy5cblx0c2V0KHZhbHVlLCBwcm9wZXJ0aWVzT2JqZWN0LCBvcE5hbWUpIHtcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBwcm9wZXJ0aWVzT2JqZWN0KVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHVlLCBrZXksXG5cdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvcGVydGllc09iamVjdCwga2V5KSlcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSlcblx0XHRcdGlmIChvcE5hbWUgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0bXMuc2V0TmFtZSh2YWx1ZSwgb3BOYW1lKVxuXHRcdHJldHVybiB2YWx1ZVxuXHR9LFxuXHRzZXROYW1lKHZhbHVlLCBuYW1lKSB7XG5cdFx0dmFsdWUubmFtZSA9IG5hbWVcblx0XHRyZXR1cm4gdmFsdWVcblx0fSxcblx0c2V0TGF6eSh2YWx1ZSwgbmFtZSwgbGF6eSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgbmFtZSwgeyBnZXQ6IGxhenkuZ2V0LCBlbnVtZXJhYmxlOiB0cnVlIH0pXG5cdH1cbn1cbmZvciAoY29uc3QgZGVmIGluIG1zRGVmcylcblx0bXNEZWYoZGVmLCBtc0RlZnNbZGVmXSlcblxuY29uc3QgbXNEZWZUZW1wID0gKG5hbWUsIGZ1bikgPT5cblx0bXNbbmFtZV0gPSBmdW5cblxuLy8gT3ZlcnJpZGRlbiBieSBzaG93Lm1zLlxubXNEZWZUZW1wKCdzaG93JywgXyA9PiB7XG5cdGlmICh0eXBlb2YgXyAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIF8gIT09ICdudW1iZXInKVxuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdGBPbmx5IHVzZSBTdHJpbmdzIG9yIE51bWJlcnMgaGVyZSB1bnRpbCB0aGlzIGlzIG92ZXJyaWRkZW4gYnkgc2hvdy5tcy4gR290OlxcbiR7X31gKVxuXHRyZXR1cm4gXy50b1N0cmluZygpXG59KVxuXG4vLyByZWdpb24gQ29udGFpbnNcbi8vIFNvbWUgVHlwZXMgd2FudCB0byBpbXBsZW1lbnQgY29udGFpbnM/IGJlZm9yZSBpdCBpcyBvZmZpY2lhbGx5IGRlZmluZWQuXG5leHBvcnQgY29uc3QgY29udGFpbnNJbXBsU3ltYm9sID0gJ2ltcGwtY29udGFpbnM/J1xuZXhwb3J0IGNvbnN0IGltcGxDb250YWlucyA9ICh0eXBlLCBpbXBsKSA9PlxuXHRwQWRkKHR5cGUucHJvdG90eXBlLCBjb250YWluc0ltcGxTeW1ib2wsIGltcGwpXG5cbi8vIE92ZXJ3cml0dGVuIGJ5IFR5cGUvaW5kZXgubXMgdG8gYWN0dWFsbHkgZG8gdHlwZSBjaGVja2luZy5cbm1zRGVmVGVtcCgnY2hlY2tDb250YWlucycsIChfdHlwZSwgdmFsKSA9PiB2YWwpXG5cbi8vIEFuIG9iamVjdCBpcyBhIEZ1bmN0aW9uIGlmIGl0cyB0eXBlb2YgaXMgYGZ1bmN0aW9uYC5cbi8vIFRoaXMgaGVscHMgdXMgY2F0Y2ggYW55IGNhbGxhYmUgT2JqLVR5cGUuXG4vLyBUT0RPOiBTZXBhcmF0ZSBGdW5jdGlvbiBmcm9tIENhbGxhYmxlXG4vLyBTaW5jZSB0aGVzZSBhcmUgcHJpbWl0aXZlcywgd2UgY2FuJ3QgdXNlIGBpbnN0YW5jZW9mYC5cbmZvciAoY29uc3QgdHlwZSBvZiBbIEZ1bmN0aW9uLCBCb29sZWFuLCBTdHJpbmcsIFN5bWJvbCwgTnVtYmVyIF0pIHtcblx0Ly8gR2VuZXJhdGVkIGNvZGUgaXMgZmFzdGVyIHRoYW4gdXNpbmcgYSBjbG9zdXJlLlxuXHRjb25zdCBzcmMgPSAncmV0dXJuIHR5cGVvZiBfID09PSBcIicgKyB0eXBlLm5hbWUudG9Mb3dlckNhc2UoKSArICdcIidcblx0cEFkZCh0eXBlLCBjb250YWluc0ltcGxTeW1ib2wsIEZ1bmN0aW9uKCdpZ25vcmUnLCAnXycsIHNyYykpXG59XG5cbi8vIEZ1bmN0aW9ucyBhcmUgT2JqZWN0cywgc28gd2UgZG8gdGhpcyBvbmUgZGlmZmVyZW50bHkuXG4vLyBUT0RPOiBUaGlzIHRyZWF0cyBPYmplY3QuY3JlYXRlKG51bGwpIGFzIGFuIG9iamVjdC4gRG8gd2Ugd2FudCB0aGF0P1xucEFkZChPYmplY3QsIGNvbnRhaW5zSW1wbFN5bWJvbCwgZnVuY3Rpb24oX2lnbm9yZSwgXykge1xuXHRpZiAoXyA9PT0gbnVsbClcblx0XHRyZXR1cm4gZmFsc2Vcblx0c3dpdGNoICh0eXBlb2YgXykge1xuXHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==