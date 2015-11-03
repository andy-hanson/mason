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
			if (!fun(...args)) throw new Error(assertErrorMessage(`assert ${ fun.name }`, args));
		},

		assertNot(fun) {
			const args = Array.prototype.slice.call(arguments, 1);
			if (fun(...args)) throw new Error(assertErrorMessage(`forbid ${ fun.name }`, args));
		},

		assertMember(obj, member) {
			const args = Array.prototype.slice.call(arguments, 2);
			if (!obj[member](...args)) throw new Error(assertErrorMessage(`assert ${ _ms.inspect(obj) }.${ member }`, args));
		},

		assertNotMember(obj, member) {
			const args = Array.prototype.slice.call(arguments, 2);
			if (obj[member](...args)) throw new Error(assertErrorMessage(`assert ${ _ms.inspect(obj) }.${ member }`, args));
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
			return function (object) {
				return object[name](Array.prototype.slice.call(arguments, 1));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQVFhLElBQUksV0FBSixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssS0FDdEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ2xDLE9BQUs7QUFDTCxVQUFRLEVBQUUsS0FBSztBQUNmLFlBQVUsRUFBRSxLQUFLO0FBQ2pCLGNBQVksRUFBRSxLQUFLO0VBQ25CLENBQUM7O09BS0YsRUFBRSxXQUFGLEVBQUUsR0FBRyxFQUFHO09BQ1IsS0FBSyxXQUFMLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQ2pCLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztPQUNwQixNQUFNLFdBQU4sTUFBTSxHQUFHLFVBQVMsSUFBSSxFQUFFOztBQUV2QixRQUFNLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3JELFNBQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7RUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Slcsa0JBQWtCLFdBQWxCLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7O09BQ3hDLFlBQVksV0FBWixZQUFZLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMiLCJmaWxlIjoicHJpdmF0ZS9ib290c3RyYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mIGdsb2JhbCA9PT0gJ3VuZGVmaW5lZCcpXG5cdHdpbmRvdy5nbG9iYWwgPSB3aW5kb3dcblxuaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUgPT09IHVuZGVmaW5lZClcblx0Z2xvYmFsLnNldEltbWVkaWF0ZSA9IGFjdGlvbiA9PiB7XG5cdFx0c2V0VGltZW91dChhY3Rpb24sIDApXG5cdH1cblxuZXhwb3J0IGNvbnN0IHBBZGQgPSAob2JqZWN0LCBrZXksIHZhbHVlKSA9PlxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHR2YWx1ZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZVxuXHR9KVxuXG4vLyByZWdpb24gQnVpbHRpbiBGdW5jdGlvbnMgZm9yIHVzZSBieSB0aGUgY29tcGlsZXJcbmV4cG9ydCBjb25zdFxuXHQvLyBUaGlzIG9iamVjdCBjb250YWlucyBmdW5jdGlvbnMgY2FsbGVkIHVwb24gYnkgY29tcGlsZWQgY29kZS5cblx0bXMgPSB7IH0sXG5cdG1zRGVmID0gKG5hbWUsIGZ1bikgPT5cblx0XHRwQWRkKG1zLCBuYW1lLCBmdW4pLFxuXHRtc0NhbGwgPSBmdW5jdGlvbihuYW1lKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdHJldHVybiBtc1tuYW1lXSguLi5hcmdzKVxuXHR9XG5cbnBBZGQoZ2xvYmFsLCAnX21zJywgbXMpXG5cbmNvbnN0IGluZGVudCA9IHN0ciA9PiBzdHIucmVwbGFjZSgvXFxuL2csICdcXG5cXHQnKVxuXG5jb25zdCBhc3NlcnRFcnJvck1lc3NhZ2UgPSAobGVhZCwgYXJncykgPT4ge1xuXHRjb25zdCBzaG93QXJncyA9IGFyZ3MubWFwKF9tcy5pbnNwZWN0KS5qb2luKCdcXG4nKVxuXHRyZXR1cm4gYCR7bGVhZH1cXG5cXHQke2luZGVudChzaG93QXJncyl9YFxufVxuXG5jb25zdCBtc0RlZnMgPSB7XG5cdC8vIFRPRE86IHVzZSArISBtZXRob2Rcblx0YWRkKGJhZywgdmFsdWUpIHtcblx0XHRiYWcucHVzaCh2YWx1ZSlcblx0fSxcblxuXHRhZGRNYW55KGJhZywgdmFsdWVzKSB7XG5cdFx0Zm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKVxuXHRcdFx0bXMuYWRkKGJhZywgdmFsdWUpXG5cdH0sXG5cblx0YXNzZXJ0KGZ1bikge1xuXHRcdC8vIFRPRE86RVM2IFNwbGF0XG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcblx0XHRpZiAoIWZ1biguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGFzc2VydCAke2Z1bi5uYW1lfWAsIGFyZ3MpKVxuXHR9LFxuXG5cdGFzc2VydE5vdChmdW4pIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cdFx0aWYgKGZ1biguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGZvcmJpZCAke2Z1bi5uYW1lfWAsIGFyZ3MpKVxuXHR9LFxuXG5cdGFzc2VydE1lbWJlcihvYmosIG1lbWJlcikge1xuXHRcdC8vIFRPRE86RVM2IFNwbGF0XG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMilcblx0XHRpZiAoIW9ialttZW1iZXJdKC4uLmFyZ3MpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGFzc2VydEVycm9yTWVzc2FnZShgYXNzZXJ0ICR7X21zLmluc3BlY3Qob2JqKX0uJHttZW1iZXJ9YCwgYXJncykpXG5cdH0sXG5cblx0YXNzZXJ0Tm90TWVtYmVyKG9iaiwgbWVtYmVyKSB7XG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMilcblx0XHRpZiAob2JqW21lbWJlcl0oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBhc3NlcnQgJHtfbXMuaW5zcGVjdChvYmopfS4ke21lbWJlcn1gLCBhcmdzKSlcblx0fSxcblxuXHQvLyBUT0RPOkVTNyBKdXN0IHVzZSBuYXRpdmUgYXN5bmMgZnVuY3Rpb25zXG5cdGFzeW5jKGdlbmVyYXRvckZ1bmN0aW9uKSB7XG5cdFx0Y29uc3QgY29udGludWVyID0gdmVyYiA9PiBhcmcgPT4ge1xuXHRcdFx0bGV0IHJlc3VsdFxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKGFyZylcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHJlc3VsdC52YWx1ZSwgZG9uZSA9IHJlc3VsdC5kb25lXG5cdFx0XHRpZiAoZG9uZSlcblx0XHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG5cdFx0fVxuXHRcdGNvbnN0IGdlbmVyYXRvciA9IGdlbmVyYXRvckZ1bmN0aW9uKClcblx0XHRjb25zdCBvbkZ1bGZpbGxlZCA9IGNvbnRpbnVlcignbmV4dCcpXG5cdFx0Y29uc3Qgb25SZWplY3RlZCA9IGNvbnRpbnVlcigndGhyb3cnKVxuXHRcdHJldHVybiBvbkZ1bGZpbGxlZCgpXG5cdH0sXG5cblx0bGF6eUdldE1vZHVsZShtb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRyZXR1cm4gbW9kdWxlLl9nZXQgaW5zdGFuY2VvZiBtcy5MYXp5ID8gbW9kdWxlLl9nZXQgOiBtcy5sYXp5KCgpID0+IG1vZHVsZSlcblx0fSxcblxuXHRnZXRNb2R1bGUobW9kdWxlKSB7XG5cdFx0Ly9raWxsP1xuXHRcdGlmIChtb2R1bGUgPT0gbnVsbCkgcmV0dXJuIG51bGxcblx0XHQvL2lmIChtb2R1bGUgPT09IHVuZGVmaW5lZClcblx0XHQvL1x0dGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgdW5kZWZpbmVkLicpXG5cdFx0cmV0dXJuIG1vZHVsZS5fZ2V0IGluc3RhbmNlb2YgbXMuTGF6eSA/IG1vZHVsZS5fZ2V0LmdldCgpIDogbW9kdWxlXG5cdH0sXG5cblx0Z2V0RGVmYXVsdEV4cG9ydChtb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRjb25zdCBtb2QgPSBtcy5nZXRNb2R1bGUobW9kdWxlKVxuXHRcdHJldHVybiBtb2QuZGVmYXVsdCA9PT0gdW5kZWZpbmVkID8gbW9kIDogbW9kLmRlZmF1bHRcblx0fSxcblxuXHRsYXp5UHJvcChsYXp5T2JqZWN0LCBrZXkpIHtcblx0XHRpZiAoIShsYXp5T2JqZWN0IGluc3RhbmNlb2YgbXMuTGF6eSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGEgTGF6eSwgZ290OiAke2xhenlPYmplY3R9YClcblx0XHRyZXR1cm4gbXMubGF6eSgoKSA9PiBsYXp5T2JqZWN0LmdldCgpW2tleV0pXG5cdH0sXG5cblx0Z2V0KG9iamVjdCwga2V5KSB7XG5cdFx0Y29uc3QgXyA9IG9iamVjdFtrZXldXG5cdFx0aWYgKF8gPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihgTW9kdWxlICR7b2JqZWN0Lm5hbWV9IGRvZXMgbm90IGhhdmUgJHtrZXl9YClcblx0XHRyZXR1cm4gX1xuXHR9LFxuXG5cdExhenk6IGZ1bmN0aW9uIExhenkoZ2V0KSB7XG5cdFx0dGhpcy5nZXQgPSAoKSA9PiB7XG5cdFx0XHR0aGlzLmdldCA9ICgpID0+IHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBMYXp5IHZhbHVlIGRlcGVuZHMgb24gaXRzZWxmLiBUaHVuazogJHtnZXR9YClcblx0XHRcdH1cblx0XHRcdGNvbnN0IF8gPSBnZXQoKVxuXHRcdFx0dGhpcy5nZXQgPSAoKSA9PiBfXG5cdFx0XHRyZXR1cm4gX1xuXHRcdH1cblx0fSxcblx0bGF6eTogXyA9PiBuZXcgbXMuTGF6eShfKSxcblx0dW5sYXp5OiBfID0+IF8gaW5zdGFuY2VvZiBtcy5MYXp5ID8gXy5nZXQoKSA6IF8sXG5cblx0bWV0aG9kQm91bmQob2JqZWN0LCBuYW1lKSB7XG5cdFx0cmV0dXJuIG9iamVjdFtuYW1lXS5iaW5kKG9iamVjdClcblx0fSxcblxuXHRtZXRob2RVbmJvdW5kKG5hbWUpIHtcblx0XHQvLyBUT0RPOkVTNiAob2JqZWN0LCAuLi5hcmdzKSA9PiBvYmplY3RbbmFtZV0oLi4uYXJncylcblx0XHRyZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7IHJldHVybiBvYmplY3RbbmFtZV0oQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkgfVxuXHR9LFxuXG5cdHNldExhenkodmFsdWUsIG5hbWUsIGxhenkpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsdWUsIG5hbWUsIHsgZ2V0OiBsYXp5LmdldCwgZW51bWVyYWJsZTogdHJ1ZSB9KVxuXHR9LFxuXG5cdHN5bWJvbCh2YWx1ZSkge1xuXHRcdGNvbnN0IHN5bWJvbCA9IHZhbHVlWydpbXBsLXN5bWJvbCddXG5cdFx0cmV0dXJuIHN5bWJvbCA9PT0gdW5kZWZpbmVkID8gdmFsdWUgOiBzeW1ib2xcblx0fSxcblxuXHRuZXdQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIG5hbWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSAke25hbWV9IGFscmVhZHkgZXhpc3RzLmApXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlXG5cdFx0fSlcblx0fSxcblx0bmV3TXV0YWJsZVByb3BlcnR5KG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgbmFtZSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFByb3BlcnR5ICR7bmFtZX0gYWxyZWFkeSBleGlzdHMuYClcblx0XHRvYmplY3RbbmFtZV0gPSB2YWx1ZVxuXHR9XG59XG5mb3IgKGNvbnN0IGRlZiBpbiBtc0RlZnMpXG5cdG1zRGVmKGRlZiwgbXNEZWZzW2RlZl0pXG5cbi8vIHJlZ2lvbiBDb250YWluc1xuLy8gU29tZSBUeXBlcyB3YW50IHRvIGltcGxlbWVudCBjb250YWlucz8gYmVmb3JlIGl0IGlzIG9mZmljaWFsbHkgZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBjb250YWluc0ltcGxTeW1ib2wgPSBTeW1ib2woJ2NvbnRhaW5zPycpXG5leHBvcnQgY29uc3QgaW1wbENvbnRhaW5zID0gKHR5cGUsIGltcGwpID0+XG5cdHBBZGQodHlwZS5wcm90b3R5cGUsIGNvbnRhaW5zSW1wbFN5bWJvbCwgaW1wbClcblxuLy8gT3ZlcndyaXR0ZW4gYnkgVHlwZS9pbmRleC5tcyB0byBhY3R1YWxseSBkbyB0eXBlIGNoZWNraW5nLlxubXMuY2hlY2tDb250YWlucyA9IChfdHlwZSwgdmFsKSA9PiB2YWxcblxuLy8gU2luY2UgdGhlc2UgYXJlIHByaW1pdGl2ZXMsIHdlIGNhbid0IHVzZSBgaW5zdGFuY2VvZmAuXG5mb3IgKGNvbnN0IHR5cGUgb2YgW0Jvb2xlYW4sIFN0cmluZywgU3ltYm9sLCBOdW1iZXJdKSB7XG5cdC8vIEdlbmVyYXRlZCBjb2RlIGlzIGZhc3RlciB0aGFuIHVzaW5nIGEgY2xvc3VyZS5cblx0Y29uc3Qgc3JjID0gJ3JldHVybiB0eXBlb2YgXyA9PT0gXCInICsgdHlwZS5uYW1lLnRvTG93ZXJDYXNlKCkgKyAnXCInXG5cdHBBZGQodHlwZSwgY29udGFpbnNJbXBsU3ltYm9sLCBGdW5jdGlvbignXycsIHNyYykpXG59XG5cbi8vIEZ1bmN0aW9ucyBhcmUgT2JqZWN0cywgc28gd2UgZG8gdGhpcyBvbmUgZGlmZmVyZW50bHkuXG4vLyBUT0RPOiBUaGlzIHRyZWF0cyBPYmplY3QuY3JlYXRlKG51bGwpIGFzIGFuIG9iamVjdC4gRG8gd2Ugd2FudCB0aGF0P1xucEFkZChPYmplY3QsIGNvbnRhaW5zSW1wbFN5bWJvbCwgZnVuY3Rpb24oXykge1xuXHRpZiAoXyA9PT0gbnVsbClcblx0XHRyZXR1cm4gZmFsc2Vcblx0c3dpdGNoICh0eXBlb2YgXykge1xuXHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn0pXG5cbmltcGxDb250YWlucyhGdW5jdGlvbiwgZnVuY3Rpb24oXykge1xuXHRyZXR1cm4gXyBpbnN0YW5jZW9mIHRoaXNcbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==
