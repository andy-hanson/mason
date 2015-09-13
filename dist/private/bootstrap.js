if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	if (typeof window !== 'undefined') window.global = window;else global.window = global;

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
	      msCall = function (name) {
		// TODO:ES6 Splat
		const args = Array.prototype.slice.call(arguments, 1);
		return ms[name].apply(ms, _toConsumableArray(args));
	};

	exports.ms = ms;
	exports.msDef = msDef;
	exports.msCall = msCall;
	pAdd(global, '_ms', ms);

	const indent = str => str.replace(/\n/g, '\n\t');

	const assertErrorMessage = (lead, args) => {
		const showArgs = args.map(_ms.inspect).join('\n');
		return `${ lead }\n\t${ indent(showArgs) }`;
	};

	const msDefs = {
		// TODO: use +! method
		add(bag, value) {
			bag.push(value);
		},

		addMany(bag, values) {
			for (let value of values) ms.add(bag, value);
		},

		assert(fun) {
			// TODO:ES6 Splat
			const args = Array.prototype.slice.call(arguments, 1);
			if (!fun.apply(undefined, _toConsumableArray(args))) throw new Error(assertErrorMessage(`assert! ${ fun.name }`, args));
		},

		assertNot(fun) {
			// TODO:ES6 Splat
			const args = Array.prototype.slice.call(arguments, 1);
			if (fun.apply(undefined, _toConsumableArray(args))) throw new Error(assertErrorMessage(`forbid! ${ fun.name }`, args));
		},

		assertMember(obj, member) {
			// TODO:ES6 Splat
			const args = Array.prototype.slice.call(arguments, 2);
			if (!obj[member].apply(obj, _toConsumableArray(args))) throw new Error(assertErrorMessage(`assert! ${ _ms.inspect(obj) }.${ member }`, args));
		},

		assertNotMember(obj, member) {
			const args = Array.prototype.slice.call(arguments, 2);
			if (obj[member].apply(obj, _toConsumableArray(args))) throw new Error(assertErrorMessage(`assert! ${ _ms.inspect(obj) }.${ member }`, args));
		},

		lazyGetModule(module) {
			if (module === undefined) throw new Error('Module undefined.');
			return module._get instanceof ms.Lazy ? module._get : ms.lazy(() => module);
		},

		getModule(module) {
			if (module == null) return null;
			//if (module === undefined)
			//	throw new Error('Module undefined.')
			return module._get instanceof ms.Lazy ? module._get.get() : module;
		},

		getDefaultExport(module) {
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

	implContains(Function, function (_) {
		return _ instanceof this;
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyIsInByaXZhdGUvYm9vdHN0cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQSxLQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUEsS0FFdEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7O0FBRWhCLE9BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEtBQ3RDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUNsQyxPQUFLO0FBQ0wsVUFBUSxFQUFFLEtBQUs7QUFDZixZQUFVLEVBQUUsS0FBSztBQUNqQixjQUFZLEVBQUUsS0FBSztFQUNuQixDQUFDLENBQUE7Ozs7QUFHSTs7QUFFTixHQUFFLEdBQUcsRUFBRztPQUNSLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQ2pCLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztPQUNwQixNQUFNLEdBQUcsVUFBUyxJQUFJLEVBQUU7O0FBRXZCLFFBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDckQsU0FBTyxFQUFFLENBQUMsSUFBSSxPQUFDLENBQVIsRUFBRSxxQkFBVSxJQUFJLEVBQUMsQ0FBQTtFQUN4QixDQUFBOzs7OztBQUVGLEtBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBOztBQUV2QixPQUFNLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRWhELE9BQU0sa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUFLO0FBQzFDLFFBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxH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LElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQTs7OztBQUlSLE9BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBOztBQUM5QyxPQUFNLFlBQVksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEtBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFBOzs7O0FBRy9DLFVBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFBOzs7QUFHL0MsTUFBSyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFOztBQUVyRCxRQUFNLEdBQUcsR0FBRyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNuRSxNQUFJLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtFQUNsRDs7OztBQUlELEtBQUksQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDNUMsTUFBSSxDQUFDLEtBQUssSUFBSSxFQUNiLE9BQU8sS0FBSyxDQUFBO0FBQ2IsVUFBUSxPQUFPLENBQUM7QUFDZixRQUFLLFVBQVUsQ0FBQztBQUNoQixRQUFLLFFBQVE7QUFDWixXQUFPLElBQUksQ0FBQTtBQUFBLEFBQ1o7QUFDQyxXQUFPLEtBQUssQ0FBQTtBQUFBLEdBQ2I7RUFDRCxDQUFDLENBQUE7O0FBRUYsYUFBWSxDQUFDLFFBQVEsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUFFLFNBQU8sQ0FBQyxZQUFZLElBQUksQ0FBQTtFQUFFLENBQUMsQ0FBQSIsImZpbGUiOiJwcml2YXRlL2Jvb3RzdHJhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbCwiaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHR3aW5kb3cuZ2xvYmFsID0gd2luZG93XG5lbHNlXG5cdGdsb2JhbC53aW5kb3cgPSBnbG9iYWxcblxuZXhwb3J0IGNvbnN0IHBBZGQgPSAob2JqZWN0LCBrZXksIHZhbHVlKSA9PlxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHR2YWx1ZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZVxuXHR9KVxuXG4vLyByZWdpb24gQnVpbHRpbiBGdW5jdGlvbnMgZm9yIHVzZSBieSB0aGUgY29tcGlsZXJcbmV4cG9ydCBjb25zdFxuXHQvLyBUaGlzIG9iamVjdCBjb250YWlucyBmdW5jdGlvbnMgY2FsbGVkIHVwb24gYnkgY29tcGlsZWQgY29kZS5cblx0bXMgPSB7IH0sXG5cdG1zRGVmID0gKG5hbWUsIGZ1bikgPT5cblx0XHRwQWRkKG1zLCBuYW1lLCBmdW4pLFxuXHRtc0NhbGwgPSBmdW5jdGlvbihuYW1lKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdHJldHVybiBtc1tuYW1lXSguLi5hcmdzKVxuXHR9XG5cbnBBZGQoZ2xvYmFsLCAnX21zJywgbXMpXG5cbmNvbnN0IGluZGVudCA9IHN0ciA9PiBzdHIucmVwbGFjZSgvXFxuL2csICdcXG5cXHQnKVxuXG5jb25zdCBhc3NlcnRFcnJvck1lc3NhZ2UgPSAobGVhZCwgYXJncykgPT4ge1xuXHRjb25zdCBzaG93QXJncyA9IGFyZ3MubWFwKF9tcy5pbnNwZWN0KS5qb2luKCdcXG4nKVxuXHRyZXR1cm4gYCR7bGVhZH1cXG5cXHQke2luZGVudChzaG93QXJncyl9YFxufVxuXG5jb25zdCBtc0RlZnMgPSB7XG5cdC8vIFRPRE86IHVzZSArISBtZXRob2Rcblx0YWRkKGJhZywgdmFsdWUpIHtcblx0XHRiYWcucHVzaCh2YWx1ZSlcblx0fSxcblxuXHRhZGRNYW55KGJhZywgdmFsdWVzKSB7XG5cdFx0Zm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKVxuXHRcdFx0bXMuYWRkKGJhZywgdmFsdWUpXG5cdH0sXG5cblx0YXNzZXJ0KGZ1bikge1xuXHRcdC8vIFRPRE86RVM2IFNwbGF0XG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcblx0XHRpZiAoIWZ1biguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGFzc2VydCEgJHtmdW4ubmFtZX1gLCBhcmdzKSlcblx0fSxcblxuXHRhc3NlcnROb3QoZnVuKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdGlmIChmdW4oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBmb3JiaWQhICR7ZnVuLm5hbWV9YCwgYXJncykpXG5cdH0sXG5cblx0YXNzZXJ0TWVtYmVyKG9iaiwgbWVtYmVyKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuXHRcdGlmICghb2JqW21lbWJlcl0oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBhc3NlcnQhICR7X21zLmluc3BlY3Qob2JqKX0uJHttZW1iZXJ9YCwgYXJncykpXG5cdH0sXG5cblx0YXNzZXJ0Tm90TWVtYmVyKG9iaiwgbWVtYmVyKSB7XG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMilcblx0XHRpZiAob2JqW21lbWJlcl0oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBhc3NlcnQhICR7X21zLmluc3BlY3Qob2JqKX0uJHttZW1iZXJ9YCwgYXJncykpXG5cdH0sXG5cblx0bGF6eUdldE1vZHVsZShtb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRyZXR1cm4gbW9kdWxlLl9nZXQgaW5zdGFuY2VvZiBtcy5MYXp5ID8gbW9kdWxlLl9nZXQgOiBtcy5sYXp5KCgpID0+IG1vZHVsZSlcblx0fSxcblxuXHRnZXRNb2R1bGUobW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZSA9PSBudWxsKSByZXR1cm4gbnVsbFxuXHRcdC8vaWYgKG1vZHVsZSA9PT0gdW5kZWZpbmVkKVxuXHRcdC8vXHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRyZXR1cm4gbW9kdWxlLl9nZXQgaW5zdGFuY2VvZiBtcy5MYXp5ID8gbW9kdWxlLl9nZXQuZ2V0KCkgOiBtb2R1bGVcblx0fSxcblxuXHRnZXREZWZhdWx0RXhwb3J0KG1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUgPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdGNvbnN0IG1vZCA9IG1zLmdldE1vZHVsZShtb2R1bGUpXG5cdFx0cmV0dXJuIG1vZC5kZWZhdWx0ID09PSB1bmRlZmluZWQgPyBtb2QgOiBtb2QuZGVmYXVsdFxuXHR9LFxuXG5cdGxhenlQcm9wKGxhenlPYmplY3QsIGtleSkge1xuXHRcdGlmICghKGxhenlPYmplY3QgaW5zdGFuY2VvZiBtcy5MYXp5KSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYSBMYXp5LCBnb3Q6ICR7bGF6eU9iamVjdH1gKVxuXHRcdHJldHVybiBtcy5sYXp5KCgpID0+IGxhenlPYmplY3QuZ2V0KClba2V5XSlcblx0fSxcblxuXHRnZXQob2JqZWN0LCBrZXkpIHtcblx0XHRjb25zdCBfID0gb2JqZWN0W2tleV1cblx0XHRpZiAoXyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBNb2R1bGUgJHtvYmplY3QubmFtZX0gZG9lcyBub3QgaGF2ZSAke2tleX1gKVxuXHRcdHJldHVybiBfXG5cdH0sXG5cblx0TGF6eTogZnVuY3Rpb24gTGF6eShnZXQpIHtcblx0XHR0aGlzLmdldCA9ICgpID0+IHtcblx0XHRcdHRoaXMuZ2V0ID0gKCkgPT4ge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYExhenkgdmFsdWUgZGVwZW5kcyBvbiBpdHNlbGYuIFRodW5rOiAke2dldH1gKVxuXHRcdFx0fVxuXHRcdFx0Y29uc3QgXyA9IGdldCgpXG5cdFx0XHR0aGlzLmdldCA9ICgpID0+IF9cblx0XHRcdHJldHVybiBfXG5cdFx0fVxuXHR9LFxuXHRsYXp5OiBfID0+IG5ldyBtcy5MYXp5KF8pLFxuXHR1bmxhenk6IF8gPT4gXyBpbnN0YW5jZW9mIG1zLkxhenkgPyBfLmdldCgpIDogXyxcblxuXHQvLyBVbmxpa2UgT2JqZWN0LmFzc2lnbiwgZG9lcyAqbm90KiBpbnZva2UgZ2V0dGVycy5cblx0c2V0KHZhbHVlLCBwcm9wZXJ0aWVzT2JqZWN0LCBvcE5hbWUpIHtcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBwcm9wZXJ0aWVzT2JqZWN0KVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHVlLCBrZXksXG5cdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvcGVydGllc09iamVjdCwga2V5KSlcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSlcblx0XHRcdGlmIChvcE5hbWUgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0bXMuc2V0TmFtZSh2YWx1ZSwgb3BOYW1lKVxuXHRcdHJldHVybiB2YWx1ZVxuXHR9LFxuXHRzZXROYW1lKHZhbHVlLCBuYW1lKSB7XG5cdFx0dmFsdWUubmFtZSA9IG5hbWVcblx0XHRyZXR1cm4gdmFsdWVcblx0fSxcblx0c2V0TGF6eSh2YWx1ZSwgbmFtZSwgbGF6eSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgbmFtZSwgeyBnZXQ6IGxhenkuZ2V0LCBlbnVtZXJhYmxlOiB0cnVlIH0pXG5cdH0sXG5cblx0c3ltYm9sKHZhbHVlKSB7XG5cdFx0Y29uc3Qgc3ltYm9sID0gdmFsdWVbJ2ltcGwtc3ltYm9sJ11cblx0XHRyZXR1cm4gc3ltYm9sID09PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHN5bWJvbFxuXHR9LFxuXG5cdG5ld1Byb3BlcnR5KG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgbmFtZSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFByb3BlcnR5ICR7bmFtZX0gYWxyZWFkeSBleGlzdHMuYClcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWVcblx0XHR9KVxuXHR9LFxuXHRuZXdNdXRhYmxlUHJvcGVydHkob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBuYW1lKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgJHtuYW1lfSBhbHJlYWR5IGV4aXN0cy5gKVxuXHRcdG9iamVjdFtuYW1lXSA9IHZhbHVlXG5cdH1cbn1cbmZvciAoY29uc3QgZGVmIGluIG1zRGVmcylcblx0bXNEZWYoZGVmLCBtc0RlZnNbZGVmXSlcblxuY29uc3QgbXNEZWZUZW1wID0gKG5hbWUsIGZ1bikgPT5cblx0bXNbbmFtZV0gPSBmdW5cblxuLy8gcmVnaW9uIENvbnRhaW5zXG4vLyBTb21lIFR5cGVzIHdhbnQgdG8gaW1wbGVtZW50IGNvbnRhaW5zPyBiZWZvcmUgaXQgaXMgb2ZmaWNpYWxseSBkZWZpbmVkLlxuZXhwb3J0IGNvbnN0IGNvbnRhaW5zSW1wbFN5bWJvbCA9IFN5bWJvbCgnY29udGFpbnM/JylcbmV4cG9ydCBjb25zdCBpbXBsQ29udGFpbnMgPSAodHlwZSwgaW1wbCkgPT5cblx0cEFkZCh0eXBlLnByb3RvdHlwZSwgY29udGFpbnNJbXBsU3ltYm9sLCBpbXBsKVxuXG4vLyBPdmVyd3JpdHRlbiBieSBUeXBlL2luZGV4Lm1zIHRvIGFjdHVhbGx5IGRvIHR5cGUgY2hlY2tpbmcuXG5tc0RlZlRlbXAoJ2NoZWNrQ29udGFpbnMnLCAoX3R5cGUsIHZhbCkgPT4gdmFsKVxuXG4vLyBTaW5jZSB0aGVzZSBhcmUgcHJpbWl0aXZlcywgd2UgY2FuJ3QgdXNlIGBpbnN0YW5jZW9mYC5cbmZvciAoY29uc3QgdHlwZSBvZiBbQm9vbGVhbiwgU3RyaW5nLCBTeW1ib2wsIE51bWJlcl0pIHtcblx0Ly8gR2VuZXJhdGVkIGNvZGUgaXMgZmFzdGVyIHRoYW4gdXNpbmcgYSBjbG9zdXJlLlxuXHRjb25zdCBzcmMgPSAncmV0dXJuIHR5cGVvZiBfID09PSBcIicgKyB0eXBlLm5hbWUudG9Mb3dlckNhc2UoKSArICdcIidcblx0cEFkZCh0eXBlLCBjb250YWluc0ltcGxTeW1ib2wsIEZ1bmN0aW9uKCdfJywgc3JjKSlcbn1cblxuLy8gRnVuY3Rpb25zIGFyZSBPYmplY3RzLCBzbyB3ZSBkbyB0aGlzIG9uZSBkaWZmZXJlbnRseS5cbi8vIFRPRE86IFRoaXMgdHJlYXRzIE9iamVjdC5jcmVhdGUobnVsbCkgYXMgYW4gb2JqZWN0LiBEbyB3ZSB3YW50IHRoYXQ/XG5wQWRkKE9iamVjdCwgY29udGFpbnNJbXBsU3ltYm9sLCBmdW5jdGlvbihfKSB7XG5cdGlmIChfID09PSBudWxsKVxuXHRcdHJldHVybiBmYWxzZVxuXHRzd2l0Y2ggKHR5cGVvZiBfKSB7XG5cdFx0Y2FzZSAnZnVuY3Rpb24nOlxuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0fVxufSlcblxuaW1wbENvbnRhaW5zKEZ1bmN0aW9uLCBmdW5jdGlvbihfKSB7IHJldHVybiBfIGluc3RhbmNlb2YgdGhpcyB9KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=