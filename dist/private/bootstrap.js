if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const pAdd = (object, key, value) => Object.defineProperty(object, key, {
		value,
		writable: false,
		enumerable: false,
		configurable: false
	});

	exports.pAdd = pAdd;
	// region Builtin Functions for use by the compiler
	const
	// This object contains functions called upon by compiled code.
	ms = {},
	      msDef = (name, fun) => pAdd(ms, name, fun),
	      msCall = (name, ...args) => ms[name](...args);

	exports.ms = ms;
	exports.msDef = msDef;
	exports.msCall = msCall;
	pAdd(global, '_ms', ms);

	const indent = str => str.replace(/\n/g, '\n\t');

	const msDefs = {
		// TODO: use +! method
		add(bag, value) {
			bag.push(value);
		},

		addMany(bag, values) {
			for (let value of values) ms.add(bag, value);
		},

		assert(fun, ...args) {
			if (!Function.prototype.apply.call(fun, null, args)) {
				const showArgs = args.map(_ms.repr).join('\n');
				throw new Error(`assert! ${ _ms.show(fun) }\n\t${ indent(showArgs) }`);
			}
		},

		assertNot(fun, ...args) {
			if (Function.prototype.apply.call(fun, null, args)) {
				const showArgs = args.map(_ms.repr).join('\n');
				throw new Error(`forbid! ${ _ms.show(fun) }\n\t${ indent(showArgs) }`);
			}
		},

		lazyGetModule(module) {
			if (module === undefined) throw new Error('Module undefined.');
			return module._get instanceof ms.Lazy ? module._get : ms.lazy(() => module);
		},

		getModule(module) {
			if (module === undefined) throw new Error('Module undefined.');
			return module._get instanceof ms.Lazy ? module._get.get() : module;
		},

		getDefaultExport: module => {
			if (module === undefined) throw new Error('Module undefined.');
			const mod = ms.getModule(module);
			return mod.default === undefined ? mod : mod.default;
		},

		lazyProp(lazyObject, key) {
			if (!(lazyObject instanceof ms.Lazy)) throw new Error(`Expected a Lazy, got: ${ lazyObject }`);
			return ms.lazy(() => lazyObject.get()[key]);
		},

		get(object, key) {
			const _ = object[key];
			if (_ === undefined) throw new Error(`Module ${ object.name } does not have ${ key }`);
			return _;
		},

		bool(b) {
			if (typeof b !== 'boolean') {
				console.log(b);
				throw new Error(`Expected Boolean, got ${ b }`);
			}
			return b;
		},

		// Used for splat calls.
		// TODO:ES6 Shouldn't need. `fun(...arg)` should work for any iterable.
		arr(_) {
			if (_ instanceof Array) return _;
			const out = [];
			for (let em of _) out.push(em);
			return out;
		},

		error(err) {
			if (err instanceof Error) return err;else if (typeof err === 'string') return new Error(err);else if (err instanceof _ms.Lazy) return _ms.error(err.get());else throw new Error('Thrown value must be Error or String');
		},

		Lazy: function Lazy(get) {
			this.get = () => {
				this.get = () => {
					throw new Error(`Lazy value depends on itself. Thunk: ${ get }`);
				};
				const _ = get();
				this.get = () => _;
				return _;
			};
		},
		lazy: _ => new ms.Lazy(_),
		unlazy: _ => _ instanceof ms.Lazy ? _.get() : _,

		// Unlike Object.assign, does *not* invoke getters.
		set(value, propertiesObject, opName) {
			for (const key in propertiesObject) Object.defineProperty(value, key, Object.getOwnPropertyDescriptor(propertiesObject, key));
			if (!(value instanceof Function)) if (opName !== undefined) ms.setName(value, opName);
			return value;
		},
		setName(value, name) {
			value.name = name;
			return value;
		},
		setLazy(value, name, lazy) {
			Object.defineProperty(value, name, { get: lazy.get, enumerable: true });
		},

		symbol(value) {
			const symbol = value['impl-symbol'];
			return symbol === undefined ? value : symbol;
		},

		newProperty(object, name, value) {
			if (Object.prototype.hasOwnProperty.call(object, name)) throw new Error(`Property ${ name } already exists.`);
			Object.defineProperty(object, name, {
				configurable: true,
				enumerable: true,
				writable: false,
				value
			});
		},
		newMutableProperty(object, name, value) {
			if (Object.prototype.hasOwnProperty.call(object, name)) throw new Error(`Property ${ name } already exists.`);
			object[name] = value;
		}
	};
	for (const def in msDefs) msDef(def, msDefs[def]);

	const msDefTemp = (name, fun) => ms[name] = fun;

	// Overridden by show.ms.
	msDefTemp('show', _ => {
		if (typeof _ !== 'string' && typeof _ !== 'number') throw new Error(`Only use Strings or Numbers here until this is overridden by show.ms. Got:\n${ _ }`);
		return _.toString();
	});

	// region Contains
	// Some Types want to implement contains? before it is officially defined.
	const containsImplSymbol = Symbol('contains?');
	exports.containsImplSymbol = containsImplSymbol;
	const implContains = (type, impl) => pAdd(type.prototype, containsImplSymbol, impl);

	exports.implContains = implContains;
	// Overwritten by Type/index.ms to actually do type checking.
	msDefTemp('checkContains', (_type, val) => val);

	// Since these are primitives, we can't use `instanceof`.
	for (const type of [Boolean, String, Symbol, Number]) {
		// Generated code is faster than using a closure.
		const src = 'return typeof _ === "' + type.name.toLowerCase() + '"';
		pAdd(type, containsImplSymbol, Function('_', src));
	}

	// Functions are Objects, so we do this one differently.
	// TODO: This treats Object.create(null) as an object. Do we want that?
	pAdd(Object, containsImplSymbol, function (_) {
		if (_ === null) return false;
		switch (typeof _) {
			case 'function':
			case 'object':
				return true;
			default:
				return false;
		}
	});

	//TODO: this should accomplish nothing
	pAdd(Function, containsImplSymbol, function (_) {
		return _ instanceof this;
	});

	implContains(Function, function (_) {
		return _ instanceof this;
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXZhdGUvYm9vdHN0cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFPLE9BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEtBQ3RDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUNsQyxPQUFLO0FBQ0wsVUFBUSxFQUFFLEtBQUs7QUFDZixZQUFVLEVBQUUsS0FBSztBQUNqQixjQUFZLEVBQUUsS0FBSztFQUNuQixDQUFDLENBQUE7O1NBTlUsSUFBSSxHQUFKLElBQUk7O0FBU1Y7O0FBRU4sR0FBRSxHQUFHLEVBQUc7T0FDUixLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxLQUNqQixJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUM7T0FDcEIsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxLQUN0QixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTs7U0FKbEIsRUFBRSxHQUFGLEVBQUU7U0FDRixLQUFLLEdBQUwsS0FBSztTQUVMLE1BQU0sR0FBTixNQUFNO0FBR1AsS0FBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7O0FBRXZCLE9BQU0sTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQTs7QUFFaEQsT0FBTSxNQUFNLEdBQUc7O0FBRWQsS0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDZixNQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0dBQ2Y7O0FBRUQsU0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDcEIsUUFBSyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQ3ZCLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO0dBQ25COztBQUVELFFBQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUU7QUFDcEIsT0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ3BELFVBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUM5QyxVQUFNLElBQUksS0FBSyxDQUFDLENBQUMsUUFBUSxHQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxHQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtJQUNsRTtHQUNEOztBQUVELFdBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUU7QUFDdkIsT0FBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtBQUNuRCxVQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDOUMsVUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLFFBQVEsR0FBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksR0FBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEU7R0FDRDs7QUFFRCxlQUFhLENBQUMsTUFBTSxFQUFFO0FBQ3JCLE9BQUksTUFBTSxLQUFLLFNBQVMsRUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3JDLFVBQU8sTUFBTSxDQUFDLElBQUksWUFBWSxFQUFFLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxN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QixFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQUUsU0FBTyxDQUFDLFlBQVksSUFBSSxDQUFBO0VBQUUsQ0FBQyxDQUFBOztBQUU1RSxhQUFZLENBQUMsUUFBUSxFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQUUsU0FBTyxDQUFDLFlBQVksSUFBSSxDQUFBO0VBQUUsQ0FBQyxDQUFBIiwiZmlsZSI6InByaXZhdGUvYm9vdHN0cmFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHBBZGQgPSAob2JqZWN0LCBrZXksIHZhbHVlKSA9PlxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHR2YWx1ZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZVxuXHR9KVxuXG4vLyByZWdpb24gQnVpbHRpbiBGdW5jdGlvbnMgZm9yIHVzZSBieSB0aGUgY29tcGlsZXJcbmV4cG9ydCBjb25zdFxuXHQvLyBUaGlzIG9iamVjdCBjb250YWlucyBmdW5jdGlvbnMgY2FsbGVkIHVwb24gYnkgY29tcGlsZWQgY29kZS5cblx0bXMgPSB7IH0sXG5cdG1zRGVmID0gKG5hbWUsIGZ1bikgPT5cblx0XHRwQWRkKG1zLCBuYW1lLCBmdW4pLFxuXHRtc0NhbGwgPSAobmFtZSwgLi4uYXJncykgPT5cblx0XHRtc1tuYW1lXSguLi5hcmdzKVxuXG5wQWRkKGdsb2JhbCwgJ19tcycsIG1zKVxuXG5jb25zdCBpbmRlbnQgPSBzdHIgPT4gc3RyLnJlcGxhY2UoL1xcbi9nLCAnXFxuXFx0JylcblxuY29uc3QgbXNEZWZzID0ge1xuXHQvLyBUT0RPOiB1c2UgKyEgbWV0aG9kXG5cdGFkZChiYWcsIHZhbHVlKSB7XG5cdFx0YmFnLnB1c2godmFsdWUpXG5cdH0sXG5cblx0YWRkTWFueShiYWcsIHZhbHVlcykge1xuXHRcdGZvciAobGV0IHZhbHVlIG9mIHZhbHVlcylcblx0XHRcdG1zLmFkZChiYWcsIHZhbHVlKVxuXHR9LFxuXG5cdGFzc2VydChmdW4sIC4uLmFyZ3MpIHtcblx0XHRpZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGZ1biwgbnVsbCwgYXJncykpIHtcblx0XHRcdGNvbnN0IHNob3dBcmdzID0gYXJncy5tYXAoX21zLnJlcHIpLmpvaW4oJ1xcbicpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYGFzc2VydCEgJHtfbXMuc2hvdyhmdW4pfVxcblxcdCR7aW5kZW50KHNob3dBcmdzKX1gKVxuXHRcdH1cblx0fSxcblxuXHRhc3NlcnROb3QoZnVuLCAuLi5hcmdzKSB7XG5cdFx0aWYgKEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGZ1biwgbnVsbCwgYXJncykpIHtcblx0XHRcdGNvbnN0IHNob3dBcmdzID0gYXJncy5tYXAoX21zLnJlcHIpLmpvaW4oJ1xcbicpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYGZvcmJpZCEgJHtfbXMuc2hvdyhmdW4pfVxcblxcdCR7aW5kZW50KHNob3dBcmdzKX1gKVxuXHRcdH1cblx0fSxcblxuXHRsYXp5R2V0TW9kdWxlKG1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUgPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdHJldHVybiBtb2R1bGUuX2dldCBpbnN0YW5jZW9mIG1zLkxhenkgPyBtb2R1bGUuX2dldCA6IG1zLmxhenkoKCkgPT4gbW9kdWxlKVxuXHR9LFxuXG5cdGdldE1vZHVsZShtb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRyZXR1cm4gbW9kdWxlLl9nZXQgaW5zdGFuY2VvZiBtcy5MYXp5ID8gbW9kdWxlLl9nZXQuZ2V0KCkgOiBtb2R1bGVcblx0fSxcblxuXHRnZXREZWZhdWx0RXhwb3J0OiBtb2R1bGUgPT4ge1xuXHRcdGlmIChtb2R1bGUgPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdGNvbnN0IG1vZCA9IG1zLmdldE1vZHVsZShtb2R1bGUpXG5cdFx0cmV0dXJuIG1vZC5kZWZhdWx0ID09PSB1bmRlZmluZWQgPyBtb2QgOiBtb2QuZGVmYXVsdFxuXHR9LFxuXG5cdGxhenlQcm9wKGxhenlPYmplY3QsIGtleSkge1xuXHRcdGlmICghKGxhenlPYmplY3QgaW5zdGFuY2VvZiBtcy5MYXp5KSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYSBMYXp5LCBnb3Q6ICR7bGF6eU9iamVjdH1gKVxuXHRcdHJldHVybiBtcy5sYXp5KCgpID0+IGxhenlPYmplY3QuZ2V0KClba2V5XSlcblx0fSxcblxuXHRnZXQob2JqZWN0LCBrZXkpIHtcblx0XHRjb25zdCBfID0gb2JqZWN0W2tleV1cblx0XHRpZiAoXyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBNb2R1bGUgJHtvYmplY3QubmFtZX0gZG9lcyBub3QgaGF2ZSAke2tleX1gKVxuXHRcdHJldHVybiBfXG5cdH0sXG5cblx0Ym9vbChiKSB7XG5cdFx0aWYgKHR5cGVvZiBiICE9PSAnYm9vbGVhbicpIHtcblx0XHRcdGNvbnNvbGUubG9nKGIpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIEJvb2xlYW4sIGdvdCAke2J9YClcblx0XHR9XG5cdFx0cmV0dXJuIGJcblx0fSxcblxuXHQvLyBVc2VkIGZvciBzcGxhdCBjYWxscy5cblx0Ly8gVE9ETzpFUzYgU2hvdWxkbid0IG5lZWQuIGBmdW4oLi4uYXJnKWAgc2hvdWxkIHdvcmsgZm9yIGFueSBpdGVyYWJsZS5cblx0YXJyKF8pIHtcblx0XHRpZiAoXyBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0cmV0dXJuIF9cblx0XHRjb25zdCBvdXQgPSBbIF1cblx0XHRmb3IgKGxldCBlbSBvZiBfKVxuXHRcdFx0b3V0LnB1c2goZW0pXG5cdFx0cmV0dXJuIG91dFxuXHR9LFxuXG5cdGVycm9yKGVycikge1xuXHRcdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcilcblx0XHRcdHJldHVybiBlcnJcblx0XHRlbHNlIGlmICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJylcblx0XHRcdHJldHVybiBuZXcgRXJyb3IoZXJyKVxuXHRcdGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIF9tcy5MYXp5KVxuXHRcdFx0cmV0dXJuIF9tcy5lcnJvcihlcnIuZ2V0KCkpXG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUaHJvd24gdmFsdWUgbXVzdCBiZSBFcnJvciBvciBTdHJpbmcnKVxuXHR9LFxuXG5cdExhenk6IGZ1bmN0aW9uIExhenkoZ2V0KSB7XG5cdFx0dGhpcy5nZXQgPSAoKSA9PiB7XG5cdFx0XHR0aGlzLmdldCA9ICgpID0+IHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBMYXp5IHZhbHVlIGRlcGVuZHMgb24gaXRzZWxmLiBUaHVuazogJHtnZXR9YClcblx0XHRcdH1cblx0XHRcdGNvbnN0IF8gPSBnZXQoKVxuXHRcdFx0dGhpcy5nZXQgPSAoKSA9PiBfXG5cdFx0XHRyZXR1cm4gX1xuXHRcdH1cblx0fSxcblx0bGF6eTogXyA9PiBuZXcgbXMuTGF6eShfKSxcblx0dW5sYXp5OiBfID0+IF8gaW5zdGFuY2VvZiBtcy5MYXp5ID8gXy5nZXQoKSA6IF8sXG5cblx0Ly8gVW5saWtlIE9iamVjdC5hc3NpZ24sIGRvZXMgKm5vdCogaW52b2tlIGdldHRlcnMuXG5cdHNldCh2YWx1ZSwgcHJvcGVydGllc09iamVjdCwgb3BOYW1lKSB7XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllc09iamVjdClcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWx1ZSwga2V5LFxuXHRcdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3BlcnRpZXNPYmplY3QsIGtleSkpXG5cdFx0aWYgKCEodmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikpXG5cdFx0XHRpZiAob3BOYW1lICE9PSB1bmRlZmluZWQpXG5cdFx0XHRcdG1zLnNldE5hbWUodmFsdWUsIG9wTmFtZSlcblx0XHRyZXR1cm4gdmFsdWVcblx0fSxcblx0c2V0TmFtZSh2YWx1ZSwgbmFtZSkge1xuXHRcdHZhbHVlLm5hbWUgPSBuYW1lXG5cdFx0cmV0dXJuIHZhbHVlXG5cdH0sXG5cdHNldExhenkodmFsdWUsIG5hbWUsIGxhenkpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsdWUsIG5hbWUsIHsgZ2V0OiBsYXp5LmdldCwgZW51bWVyYWJsZTogdHJ1ZSB9KVxuXHR9LFxuXG5cdHN5bWJvbCh2YWx1ZSkge1xuXHRcdGNvbnN0IHN5bWJvbCA9IHZhbHVlWydpbXBsLXN5bWJvbCddXG5cdFx0cmV0dXJuIHN5bWJvbCA9PT0gdW5kZWZpbmVkID8gdmFsdWUgOiBzeW1ib2xcblx0fSxcblxuXHRuZXdQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIG5hbWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSAke25hbWV9IGFscmVhZHkgZXhpc3RzLmApXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlXG5cdFx0fSlcblx0fSxcblx0bmV3TXV0YWJsZVByb3BlcnR5KG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgbmFtZSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFByb3BlcnR5ICR7bmFtZX0gYWxyZWFkeSBleGlzdHMuYClcblx0XHRvYmplY3RbbmFtZV0gPSB2YWx1ZVxuXHR9XG59XG5mb3IgKGNvbnN0IGRlZiBpbiBtc0RlZnMpXG5cdG1zRGVmKGRlZiwgbXNEZWZzW2RlZl0pXG5cbmNvbnN0IG1zRGVmVGVtcCA9IChuYW1lLCBmdW4pID0+XG5cdG1zW25hbWVdID0gZnVuXG5cbi8vIE92ZXJyaWRkZW4gYnkgc2hvdy5tcy5cbm1zRGVmVGVtcCgnc2hvdycsIF8gPT4ge1xuXHRpZiAodHlwZW9mIF8gIT09ICdzdHJpbmcnICYmIHR5cGVvZiBfICE9PSAnbnVtYmVyJylcblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRgT25seSB1c2UgU3RyaW5ncyBvciBOdW1iZXJzIGhlcmUgdW50aWwgdGhpcyBpcyBvdmVycmlkZGVuIGJ5IHNob3cubXMuIEdvdDpcXG4ke199YClcblx0cmV0dXJuIF8udG9TdHJpbmcoKVxufSlcblxuLy8gcmVnaW9uIENvbnRhaW5zXG4vLyBTb21lIFR5cGVzIHdhbnQgdG8gaW1wbGVtZW50IGNvbnRhaW5zPyBiZWZvcmUgaXQgaXMgb2ZmaWNpYWxseSBkZWZpbmVkLlxuZXhwb3J0IGNvbnN0IGNvbnRhaW5zSW1wbFN5bWJvbCA9IFN5bWJvbCgnY29udGFpbnM/JylcbmV4cG9ydCBjb25zdCBpbXBsQ29udGFpbnMgPSAodHlwZSwgaW1wbCkgPT5cblx0cEFkZCh0eXBlLnByb3RvdHlwZSwgY29udGFpbnNJbXBsU3ltYm9sLCBpbXBsKVxuXG4vLyBPdmVyd3JpdHRlbiBieSBUeXBlL2luZGV4Lm1zIHRvIGFjdHVhbGx5IGRvIHR5cGUgY2hlY2tpbmcuXG5tc0RlZlRlbXAoJ2NoZWNrQ29udGFpbnMnLCAoX3R5cGUsIHZhbCkgPT4gdmFsKVxuXG4vLyBTaW5jZSB0aGVzZSBhcmUgcHJpbWl0aXZlcywgd2UgY2FuJ3QgdXNlIGBpbnN0YW5jZW9mYC5cbmZvciAoY29uc3QgdHlwZSBvZiBbIEJvb2xlYW4sIFN0cmluZywgU3ltYm9sLCBOdW1iZXIgXSkge1xuXHQvLyBHZW5lcmF0ZWQgY29kZSBpcyBmYXN0ZXIgdGhhbiB1c2luZyBhIGNsb3N1cmUuXG5cdGNvbnN0IHNyYyA9ICdyZXR1cm4gdHlwZW9mIF8gPT09IFwiJyArIHR5cGUubmFtZS50b0xvd2VyQ2FzZSgpICsgJ1wiJ1xuXHRwQWRkKHR5cGUsIGNvbnRhaW5zSW1wbFN5bWJvbCwgRnVuY3Rpb24oJ18nLCBzcmMpKVxufVxuXG4vLyBGdW5jdGlvbnMgYXJlIE9iamVjdHMsIHNvIHdlIGRvIHRoaXMgb25lIGRpZmZlcmVudGx5LlxuLy8gVE9ETzogVGhpcyB0cmVhdHMgT2JqZWN0LmNyZWF0ZShudWxsKSBhcyBhbiBvYmplY3QuIERvIHdlIHdhbnQgdGhhdD9cbnBBZGQoT2JqZWN0LCBjb250YWluc0ltcGxTeW1ib2wsIGZ1bmN0aW9uKF8pIHtcblx0aWYgKF8gPT09IG51bGwpXG5cdFx0cmV0dXJuIGZhbHNlXG5cdHN3aXRjaCAodHlwZW9mIF8pIHtcblx0XHRjYXNlICdmdW5jdGlvbic6XG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBmYWxzZVxuXHR9XG59KVxuXG4vL1RPRE86IHRoaXMgc2hvdWxkIGFjY29tcGxpc2ggbm90aGluZ1xucEFkZChGdW5jdGlvbiwgY29udGFpbnNJbXBsU3ltYm9sLCBmdW5jdGlvbihfKSB7IHJldHVybiBfIGluc3RhbmNlb2YgdGhpcyB9KVxuXG5pbXBsQ29udGFpbnMoRnVuY3Rpb24sIGZ1bmN0aW9uKF8pIHsgcmV0dXJuIF8gaW5zdGFuY2VvZiB0aGlzIH0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==