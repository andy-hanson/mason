'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.bootstrap = mod.exports;
	}
})(this, function (exports) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	if (typeof global === 'undefined') window.global = window;
	if (global.setImmediate === undefined) global.setImmediate = action => {
		setTimeout(action, 0);
	};

	const pAdd = exports.pAdd = (object, key, value) => Object.defineProperty(object, key, {
		value,
		writable: false,
		enumerable: false,
		configurable: false
	});

	const ms = exports.ms = {},
	      msDef = exports.msDef = (name, fun) => pAdd(ms, name, fun),
	      msCall = exports.msCall = function (name) {
		// TODO:ES6 Splat
		const args = Array.prototype.slice.call(arguments, 1);
		return ms[name](...args);
	};

	pAdd(global, '_ms', ms);

	const indent = str => str.replace(/\n/g, '\n\t');

	const assertErrorMessage = (lead, args) => {
		const showArgs = args.map(_ms.inspect).join('\n');
		return `${ lead }\n\t${ indent(showArgs) }`;
	};

	const msDefs = {
		add(bag, value) {
			bag.push(value);
		},

		addMany(bag, values) {
			for (let value of values) ms.add(bag, value);
		},

		assert(fun) {
			const args = Array.prototype.slice.call(arguments, 1);
			if (!fun(...args)) throw new Error(assertErrorMessage(`assert! ${ fun.name }`, args));
		},

		assertNot(fun) {
			const args = Array.prototype.slice.call(arguments, 1);
			if (fun(...args)) throw new Error(assertErrorMessage(`forbid! ${ fun.name }`, args));
		},

		assertMember(obj, member) {
			const args = Array.prototype.slice.call(arguments, 2);
			if (!obj[member](...args)) throw new Error(assertErrorMessage(`assert! ${ _ms.inspect(obj) }.${ member }`, args));
		},

		assertNotMember(obj, member) {
			const args = Array.prototype.slice.call(arguments, 2);
			if (obj[member](...args)) throw new Error(assertErrorMessage(`assert! ${ _ms.inspect(obj) }.${ member }`, args));
		},

		async(generatorFunction) {
			const continuer = verb => arg => {
				let result;

				try {
					result = generator[verb](arg);
				} catch (err) {
					return Promise.reject(err);
				}

				const value = result.value,
				      done = result.done;
				if (done) return value;else return Promise.resolve(value).then(onFulfilled, onRejected);
			};

			const generator = generatorFunction();
			const onFulfilled = continuer('next');
			const onRejected = continuer('throw');
			return onFulfilled();
		},

		lazyGetModule(module) {
			if (module === undefined) throw new Error('Module undefined.');
			return module._get instanceof ms.Lazy ? module._get : ms.lazy(() => module);
		},

		getModule(module) {
			if (module == null) return null;
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

		methodBound(object, name) {
			return object[name].bind(object);
		},

		methodUnbound(name) {
			return function (object, ...args) {
				return object[name](...args);
			};
		},

		setLazy(value, name, lazy) {
			Object.defineProperty(value, name, {
				get: lazy.get,
				enumerable: true
			});
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

	const containsImplSymbol = exports.containsImplSymbol = Symbol('contains?');

	const implContains = exports.implContains = (type, impl) => pAdd(type.prototype, containsImplSymbol, impl);

	ms.checkContains = (_type, val) => val;

	for (const type of [Boolean, String, Symbol, Number]) {
		const src = 'return typeof _ === "' + type.name.toLowerCase() + '"';
		pAdd(type, containsImplSymbol, Function('_', src));
	}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQVFhLElBQUksV0FBSixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssS0FDdEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ2xDLE9BQUs7QUFDTCxVQUFRLEVBQUUsS0FBSztBQUNmLFlBQVUsRUFBRSxLQUFLO0FBQ2pCLGNBQVksRUFBRSxLQUFLO0VBQ25CLENBQUM7O09BS0YsRUFBRSxXQUFGLEVBQUUsR0FBRyxFQUFHO09BQ1IsS0FBSyxXQUFMLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQ2pCLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztPQUNwQixNQUFNLFdBQU4sTUFBTSxHQUFHLFVBQVMsSUFBSSxFQUFFOztBQUV2QixRQUFNLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3JELFNBQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7RUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Slcsa0JBQWtCLFdBQWxCLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7O09BQ3hDLFlBQVksV0FBWixZQUFZLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMiLCJmaWxlIjoicHJpdmF0ZS9ib290c3RyYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mIGdsb2JhbCA9PT0gJ3VuZGVmaW5lZCcpXG5cdHdpbmRvdy5nbG9iYWwgPSB3aW5kb3dcblxuaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUgPT09IHVuZGVmaW5lZClcblx0Z2xvYmFsLnNldEltbWVkaWF0ZSA9IGFjdGlvbiA9PiB7XG5cdFx0c2V0VGltZW91dChhY3Rpb24sIDApXG5cdH1cblxuZXhwb3J0IGNvbnN0IHBBZGQgPSAob2JqZWN0LCBrZXksIHZhbHVlKSA9PlxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHR2YWx1ZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZVxuXHR9KVxuXG4vLyByZWdpb24gQnVpbHRpbiBGdW5jdGlvbnMgZm9yIHVzZSBieSB0aGUgY29tcGlsZXJcbmV4cG9ydCBjb25zdFxuXHQvLyBUaGlzIG9iamVjdCBjb250YWlucyBmdW5jdGlvbnMgY2FsbGVkIHVwb24gYnkgY29tcGlsZWQgY29kZS5cblx0bXMgPSB7IH0sXG5cdG1zRGVmID0gKG5hbWUsIGZ1bikgPT5cblx0XHRwQWRkKG1zLCBuYW1lLCBmdW4pLFxuXHRtc0NhbGwgPSBmdW5jdGlvbihuYW1lKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdHJldHVybiBtc1tuYW1lXSguLi5hcmdzKVxuXHR9XG5cbnBBZGQoZ2xvYmFsLCAnX21zJywgbXMpXG5cbmNvbnN0IGluZGVudCA9IHN0ciA9PiBzdHIucmVwbGFjZSgvXFxuL2csICdcXG5cXHQnKVxuXG5jb25zdCBhc3NlcnRFcnJvck1lc3NhZ2UgPSAobGVhZCwgYXJncykgPT4ge1xuXHRjb25zdCBzaG93QXJncyA9IGFyZ3MubWFwKF9tcy5pbnNwZWN0KS5qb2luKCdcXG4nKVxuXHRyZXR1cm4gYCR7bGVhZH1cXG5cXHQke2luZGVudChzaG93QXJncyl9YFxufVxuXG5jb25zdCBtc0RlZnMgPSB7XG5cdC8vIFRPRE86IHVzZSArISBtZXRob2Rcblx0YWRkKGJhZywgdmFsdWUpIHtcblx0XHRiYWcucHVzaCh2YWx1ZSlcblx0fSxcblxuXHRhZGRNYW55KGJhZywgdmFsdWVzKSB7XG5cdFx0Zm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKVxuXHRcdFx0bXMuYWRkKGJhZywgdmFsdWUpXG5cdH0sXG5cblx0YXNzZXJ0KGZ1bikge1xuXHRcdC8vIFRPRE86RVM2IFNwbGF0XG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcblx0XHRpZiAoIWZ1biguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGFzc2VydCEgJHtmdW4ubmFtZX1gLCBhcmdzKSlcblx0fSxcblxuXHRhc3NlcnROb3QoZnVuKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdGlmIChmdW4oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBmb3JiaWQhICR7ZnVuLm5hbWV9YCwgYXJncykpXG5cdH0sXG5cblx0YXNzZXJ0TWVtYmVyKG9iaiwgbWVtYmVyKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuXHRcdGlmICghb2JqW21lbWJlcl0oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBhc3NlcnQhICR7X21zLmluc3BlY3Qob2JqKX0uJHttZW1iZXJ9YCwgYXJncykpXG5cdH0sXG5cblx0YXNzZXJ0Tm90TWVtYmVyKG9iaiwgbWVtYmVyKSB7XG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMilcblx0XHRpZiAob2JqW21lbWJlcl0oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBhc3NlcnQhICR7X21zLmluc3BlY3Qob2JqKX0uJHttZW1iZXJ9YCwgYXJncykpXG5cdH0sXG5cblx0Ly8gVE9ETzpFUzcgSnVzdCB1c2UgbmF0aXZlIGFzeW5jIGZ1bmN0aW9uc1xuXHRhc3luYyhnZW5lcmF0b3JGdW5jdGlvbikge1xuXHRcdGNvbnN0IGNvbnRpbnVlciA9IHZlcmIgPT4gYXJnID0+IHtcblx0XHRcdGxldCByZXN1bHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXShhcmcpXG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdmFsdWUgPSByZXN1bHQudmFsdWUsIGRvbmUgPSByZXN1bHQuZG9uZVxuXHRcdFx0aWYgKGRvbmUpXG5cdFx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuXHRcdH1cblx0XHRjb25zdCBnZW5lcmF0b3IgPSBnZW5lcmF0b3JGdW5jdGlvbigpXG5cdFx0Y29uc3Qgb25GdWxmaWxsZWQgPSBjb250aW51ZXIoJ25leHQnKVxuXHRcdGNvbnN0IG9uUmVqZWN0ZWQgPSBjb250aW51ZXIoJ3Rocm93Jylcblx0XHRyZXR1cm4gb25GdWxmaWxsZWQoKVxuXHR9LFxuXG5cdGxhenlHZXRNb2R1bGUobW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgdW5kZWZpbmVkLicpXG5cdFx0cmV0dXJuIG1vZHVsZS5fZ2V0IGluc3RhbmNlb2YgbXMuTGF6eSA/IG1vZHVsZS5fZ2V0IDogbXMubGF6eSgoKSA9PiBtb2R1bGUpXG5cdH0sXG5cblx0Z2V0TW9kdWxlKG1vZHVsZSkge1xuXHRcdC8va2lsbD9cblx0XHRpZiAobW9kdWxlID09IG51bGwpIHJldHVybiBudWxsXG5cdFx0Ly9pZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0Ly9cdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdHJldHVybiBtb2R1bGUuX2dldCBpbnN0YW5jZW9mIG1zLkxhenkgPyBtb2R1bGUuX2dldC5nZXQoKSA6IG1vZHVsZVxuXHR9LFxuXG5cdGdldERlZmF1bHRFeHBvcnQobW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgdW5kZWZpbmVkLicpXG5cdFx0Y29uc3QgbW9kID0gbXMuZ2V0TW9kdWxlKG1vZHVsZSlcblx0XHRyZXR1cm4gbW9kLmRlZmF1bHQgPT09IHVuZGVmaW5lZCA/IG1vZCA6IG1vZC5kZWZhdWx0XG5cdH0sXG5cblx0bGF6eVByb3AobGF6eU9iamVjdCwga2V5KSB7XG5cdFx0aWYgKCEobGF6eU9iamVjdCBpbnN0YW5jZW9mIG1zLkxhenkpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhIExhenksIGdvdDogJHtsYXp5T2JqZWN0fWApXG5cdFx0cmV0dXJuIG1zLmxhenkoKCkgPT4gbGF6eU9iamVjdC5nZXQoKVtrZXldKVxuXHR9LFxuXG5cdGdldChvYmplY3QsIGtleSkge1xuXHRcdGNvbnN0IF8gPSBvYmplY3Rba2V5XVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE1vZHVsZSAke29iamVjdC5uYW1lfSBkb2VzIG5vdCBoYXZlICR7a2V5fWApXG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHRMYXp5OiBmdW5jdGlvbiBMYXp5KGdldCkge1xuXHRcdHRoaXMuZ2V0ID0gKCkgPT4ge1xuXHRcdFx0dGhpcy5nZXQgPSAoKSA9PiB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgTGF6eSB2YWx1ZSBkZXBlbmRzIG9uIGl0c2VsZi4gVGh1bms6ICR7Z2V0fWApXG5cdFx0XHR9XG5cdFx0XHRjb25zdCBfID0gZ2V0KClcblx0XHRcdHRoaXMuZ2V0ID0gKCkgPT4gX1xuXHRcdFx0cmV0dXJuIF9cblx0XHR9XG5cdH0sXG5cdGxhenk6IF8gPT4gbmV3IG1zLkxhenkoXyksXG5cdHVubGF6eTogXyA9PiBfIGluc3RhbmNlb2YgbXMuTGF6eSA/IF8uZ2V0KCkgOiBfLFxuXG5cdG1ldGhvZEJvdW5kKG9iamVjdCwgbmFtZSkge1xuXHRcdHJldHVybiBvYmplY3RbbmFtZV0uYmluZChvYmplY3QpXG5cdH0sXG5cblx0bWV0aG9kVW5ib3VuZChuYW1lKSB7XG5cdFx0Ly8gVE9ETzpFUzYgKG9iamVjdCwgLi4uYXJncykgPT4gb2JqZWN0W25hbWVdKC4uLmFyZ3MpXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgLi4uYXJncykgeyByZXR1cm4gb2JqZWN0W25hbWVdKC4uLmFyZ3MpIH1cblx0fSxcblxuXHRzZXRMYXp5KHZhbHVlLCBuYW1lLCBsYXp5KSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHVlLCBuYW1lLCB7IGdldDogbGF6eS5nZXQsIGVudW1lcmFibGU6IHRydWUgfSlcblx0fSxcblxuXHRzeW1ib2wodmFsdWUpIHtcblx0XHRjb25zdCBzeW1ib2wgPSB2YWx1ZVsnaW1wbC1zeW1ib2wnXVxuXHRcdHJldHVybiBzeW1ib2wgPT09IHVuZGVmaW5lZCA/IHZhbHVlIDogc3ltYm9sXG5cdH0sXG5cblx0bmV3UHJvcGVydHkob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBuYW1lKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgJHtuYW1lfSBhbHJlYWR5IGV4aXN0cy5gKVxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZVxuXHRcdH0pXG5cdH0sXG5cdG5ld011dGFibGVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIG5hbWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSAke25hbWV9IGFscmVhZHkgZXhpc3RzLmApXG5cdFx0b2JqZWN0W25hbWVdID0gdmFsdWVcblx0fVxufVxuZm9yIChjb25zdCBkZWYgaW4gbXNEZWZzKVxuXHRtc0RlZihkZWYsIG1zRGVmc1tkZWZdKVxuXG4vLyByZWdpb24gQ29udGFpbnNcbi8vIFNvbWUgVHlwZXMgd2FudCB0byBpbXBsZW1lbnQgY29udGFpbnM/IGJlZm9yZSBpdCBpcyBvZmZpY2lhbGx5IGRlZmluZWQuXG5leHBvcnQgY29uc3QgY29udGFpbnNJbXBsU3ltYm9sID0gU3ltYm9sKCdjb250YWlucz8nKVxuZXhwb3J0IGNvbnN0IGltcGxDb250YWlucyA9ICh0eXBlLCBpbXBsKSA9PlxuXHRwQWRkKHR5cGUucHJvdG90eXBlLCBjb250YWluc0ltcGxTeW1ib2wsIGltcGwpXG5cbi8vIE92ZXJ3cml0dGVuIGJ5IFR5cGUvaW5kZXgubXMgdG8gYWN0dWFsbHkgZG8gdHlwZSBjaGVja2luZy5cbm1zLmNoZWNrQ29udGFpbnMgPSAoX3R5cGUsIHZhbCkgPT4gdmFsXG5cbi8vIFNpbmNlIHRoZXNlIGFyZSBwcmltaXRpdmVzLCB3ZSBjYW4ndCB1c2UgYGluc3RhbmNlb2ZgLlxuZm9yIChjb25zdCB0eXBlIG9mIFtCb29sZWFuLCBTdHJpbmcsIFN5bWJvbCwgTnVtYmVyXSkge1xuXHQvLyBHZW5lcmF0ZWQgY29kZSBpcyBmYXN0ZXIgdGhhbiB1c2luZyBhIGNsb3N1cmUuXG5cdGNvbnN0IHNyYyA9ICdyZXR1cm4gdHlwZW9mIF8gPT09IFwiJyArIHR5cGUubmFtZS50b0xvd2VyQ2FzZSgpICsgJ1wiJ1xuXHRwQWRkKHR5cGUsIGNvbnRhaW5zSW1wbFN5bWJvbCwgRnVuY3Rpb24oJ18nLCBzcmMpKVxufVxuXG4vLyBGdW5jdGlvbnMgYXJlIE9iamVjdHMsIHNvIHdlIGRvIHRoaXMgb25lIGRpZmZlcmVudGx5LlxuLy8gVE9ETzogVGhpcyB0cmVhdHMgT2JqZWN0LmNyZWF0ZShudWxsKSBhcyBhbiBvYmplY3QuIERvIHdlIHdhbnQgdGhhdD9cbnBBZGQoT2JqZWN0LCBjb250YWluc0ltcGxTeW1ib2wsIGZ1bmN0aW9uKF8pIHtcblx0aWYgKF8gPT09IG51bGwpXG5cdFx0cmV0dXJuIGZhbHNlXG5cdHN3aXRjaCAodHlwZW9mIF8pIHtcblx0XHRjYXNlICdmdW5jdGlvbic6XG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBmYWxzZVxuXHR9XG59KVxuXG5pbXBsQ29udGFpbnMoRnVuY3Rpb24sIGZ1bmN0aW9uKF8pIHtcblx0cmV0dXJuIF8gaW5zdGFuY2VvZiB0aGlzXG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=
