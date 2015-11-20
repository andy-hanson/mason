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

		$for(collection, generatorFunc) {
			const promises = [];

			for (const elem of collection) promises.push(_ms.async(() => generatorFunc(elem)));

			return Promise.all(promises);
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
				return object[name](...Array.prototype.slice.call(arguments, 1));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQVFhLElBQUksV0FBSixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssS0FDdEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ2xDLE9BQUs7QUFDTCxVQUFRLEVBQUUsS0FBSztBQUNmLFlBQVUsRUFBRSxLQUFLO0FBQ2pCLGNBQVksRUFBRSxLQUFLO0VBQ25CLENBQUM7O09BS0YsRUFBRSxXQUFGLEVBQUUsR0FBRyxFQUFHO09BQ1IsS0FBSyxXQUFMLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQ2pCLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztPQUNwQixNQUFNLFdBQU4sTUFBTSxHQUFHLFVBQVMsSUFBSSxFQUFFOztBQUV2QixRQUFNLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3JELFNBQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7RUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEpXLGtCQUFrQixXQUFsQixrQkFBa0IsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDOztPQUN4QyxZQUFZLFdBQVosWUFBWSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksS0FDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDIiwiZmlsZSI6InByaXZhdGUvYm9vdHN0cmFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKHR5cGVvZiBnbG9iYWwgPT09ICd1bmRlZmluZWQnKVxuXHR3aW5kb3cuZ2xvYmFsID0gd2luZG93XG5cbmlmIChnbG9iYWwuc2V0SW1tZWRpYXRlID09PSB1bmRlZmluZWQpXG5cdGdsb2JhbC5zZXRJbW1lZGlhdGUgPSBhY3Rpb24gPT4ge1xuXHRcdHNldFRpbWVvdXQoYWN0aW9uLCAwKVxuXHR9XG5cbmV4cG9ydCBjb25zdCBwQWRkID0gKG9iamVjdCwga2V5LCB2YWx1ZSkgPT5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG5cdFx0dmFsdWUsXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2Vcblx0fSlcblxuLy8gcmVnaW9uIEJ1aWx0aW4gRnVuY3Rpb25zIGZvciB1c2UgYnkgdGhlIGNvbXBpbGVyXG5leHBvcnQgY29uc3Rcblx0Ly8gVGhpcyBvYmplY3QgY29udGFpbnMgZnVuY3Rpb25zIGNhbGxlZCB1cG9uIGJ5IGNvbXBpbGVkIGNvZGUuXG5cdG1zID0geyB9LFxuXHRtc0RlZiA9IChuYW1lLCBmdW4pID0+XG5cdFx0cEFkZChtcywgbmFtZSwgZnVuKSxcblx0bXNDYWxsID0gZnVuY3Rpb24obmFtZSkge1xuXHRcdC8vIFRPRE86RVM2IFNwbGF0XG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcblx0XHRyZXR1cm4gbXNbbmFtZV0oLi4uYXJncylcblx0fVxuXG5wQWRkKGdsb2JhbCwgJ19tcycsIG1zKVxuXG5jb25zdCBpbmRlbnQgPSBzdHIgPT4gc3RyLnJlcGxhY2UoL1xcbi9nLCAnXFxuXFx0JylcblxuY29uc3QgYXNzZXJ0RXJyb3JNZXNzYWdlID0gKGxlYWQsIGFyZ3MpID0+IHtcblx0Y29uc3Qgc2hvd0FyZ3MgPSBhcmdzLm1hcChfbXMuaW5zcGVjdCkuam9pbignXFxuJylcblx0cmV0dXJuIGAke2xlYWR9XFxuXFx0JHtpbmRlbnQoc2hvd0FyZ3MpfWBcbn1cblxuY29uc3QgbXNEZWZzID0ge1xuXHQvLyBUT0RPOiB1c2UgKyEgbWV0aG9kXG5cdGFkZChiYWcsIHZhbHVlKSB7XG5cdFx0YmFnLnB1c2godmFsdWUpXG5cdH0sXG5cblx0YWRkTWFueShiYWcsIHZhbHVlcykge1xuXHRcdGZvciAobGV0IHZhbHVlIG9mIHZhbHVlcylcblx0XHRcdG1zLmFkZChiYWcsIHZhbHVlKVxuXHR9LFxuXG5cdGFzc2VydChmdW4pIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cdFx0aWYgKCFmdW4oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBhc3NlcnQgJHtmdW4ubmFtZX1gLCBhcmdzKSlcblx0fSxcblxuXHRhc3NlcnROb3QoZnVuKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdGlmIChmdW4oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBmb3JiaWQgJHtmdW4ubmFtZX1gLCBhcmdzKSlcblx0fSxcblxuXHRhc3NlcnRNZW1iZXIob2JqLCBtZW1iZXIpIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG5cdFx0aWYgKCFvYmpbbWVtYmVyXSguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGFzc2VydCAke19tcy5pbnNwZWN0KG9iail9LiR7bWVtYmVyfWAsIGFyZ3MpKVxuXHR9LFxuXG5cdGFzc2VydE5vdE1lbWJlcihvYmosIG1lbWJlcikge1xuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG5cdFx0aWYgKG9ialttZW1iZXJdKC4uLmFyZ3MpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGFzc2VydEVycm9yTWVzc2FnZShgYXNzZXJ0ICR7X21zLmluc3BlY3Qob2JqKX0uJHttZW1iZXJ9YCwgYXJncykpXG5cdH0sXG5cblx0Ly8gVE9ETzpFUzcgSnVzdCB1c2UgbmF0aXZlIGFzeW5jIGZ1bmN0aW9uc1xuXHRhc3luYyhnZW5lcmF0b3JGdW5jdGlvbikge1xuXHRcdGNvbnN0IGNvbnRpbnVlciA9IHZlcmIgPT4gYXJnID0+IHtcblx0XHRcdGxldCByZXN1bHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXShhcmcpXG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdmFsdWUgPSByZXN1bHQudmFsdWUsIGRvbmUgPSByZXN1bHQuZG9uZVxuXHRcdFx0aWYgKGRvbmUpXG5cdFx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuXHRcdH1cblx0XHRjb25zdCBnZW5lcmF0b3IgPSBnZW5lcmF0b3JGdW5jdGlvbigpXG5cdFx0Y29uc3Qgb25GdWxmaWxsZWQgPSBjb250aW51ZXIoJ25leHQnKVxuXHRcdGNvbnN0IG9uUmVqZWN0ZWQgPSBjb250aW51ZXIoJ3Rocm93Jylcblx0XHRyZXR1cm4gb25GdWxmaWxsZWQoKVxuXHR9LFxuXG5cdGxhenlHZXRNb2R1bGUobW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgdW5kZWZpbmVkLicpXG5cdFx0cmV0dXJuIG1vZHVsZS5fZ2V0IGluc3RhbmNlb2YgbXMuTGF6eSA/IG1vZHVsZS5fZ2V0IDogbXMubGF6eSgoKSA9PiBtb2R1bGUpXG5cdH0sXG5cblx0JGZvcihjb2xsZWN0aW9uLCBnZW5lcmF0b3JGdW5jKSB7XG5cdFx0Y29uc3QgcHJvbWlzZXMgPSBbXVxuXHRcdGZvciAoY29uc3QgZWxlbSBvZiBjb2xsZWN0aW9uKVxuXHRcdFx0cHJvbWlzZXMucHVzaChfbXMuYXN5bmMoKCkgPT4gZ2VuZXJhdG9yRnVuYyhlbGVtKSkpXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuXHR9LFxuXG5cdGdldE1vZHVsZShtb2R1bGUpIHtcblx0XHQvL2tpbGw/XG5cdFx0aWYgKG1vZHVsZSA9PSBudWxsKSByZXR1cm4gbnVsbFxuXHRcdC8vaWYgKG1vZHVsZSA9PT0gdW5kZWZpbmVkKVxuXHRcdC8vXHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRyZXR1cm4gbW9kdWxlLl9nZXQgaW5zdGFuY2VvZiBtcy5MYXp5ID8gbW9kdWxlLl9nZXQuZ2V0KCkgOiBtb2R1bGVcblx0fSxcblxuXHRnZXREZWZhdWx0RXhwb3J0KG1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUgPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdGNvbnN0IG1vZCA9IG1zLmdldE1vZHVsZShtb2R1bGUpXG5cdFx0cmV0dXJuIG1vZC5kZWZhdWx0ID09PSB1bmRlZmluZWQgPyBtb2QgOiBtb2QuZGVmYXVsdFxuXHR9LFxuXG5cdGxhenlQcm9wKGxhenlPYmplY3QsIGtleSkge1xuXHRcdGlmICghKGxhenlPYmplY3QgaW5zdGFuY2VvZiBtcy5MYXp5KSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYSBMYXp5LCBnb3Q6ICR7bGF6eU9iamVjdH1gKVxuXHRcdHJldHVybiBtcy5sYXp5KCgpID0+IGxhenlPYmplY3QuZ2V0KClba2V5XSlcblx0fSxcblxuXHRnZXQob2JqZWN0LCBrZXkpIHtcblx0XHRjb25zdCBfID0gb2JqZWN0W2tleV1cblx0XHRpZiAoXyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBNb2R1bGUgJHtvYmplY3QubmFtZX0gZG9lcyBub3QgaGF2ZSAke2tleX1gKVxuXHRcdHJldHVybiBfXG5cdH0sXG5cblx0TGF6eTogZnVuY3Rpb24gTGF6eShnZXQpIHtcblx0XHR0aGlzLmdldCA9ICgpID0+IHtcblx0XHRcdHRoaXMuZ2V0ID0gKCkgPT4ge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYExhenkgdmFsdWUgZGVwZW5kcyBvbiBpdHNlbGYuIFRodW5rOiAke2dldH1gKVxuXHRcdFx0fVxuXHRcdFx0Y29uc3QgXyA9IGdldCgpXG5cdFx0XHR0aGlzLmdldCA9ICgpID0+IF9cblx0XHRcdHJldHVybiBfXG5cdFx0fVxuXHR9LFxuXHRsYXp5OiBfID0+IG5ldyBtcy5MYXp5KF8pLFxuXHR1bmxhenk6IF8gPT4gXyBpbnN0YW5jZW9mIG1zLkxhenkgPyBfLmdldCgpIDogXyxcblxuXHRtZXRob2RCb3VuZChvYmplY3QsIG5hbWUpIHtcblx0XHRyZXR1cm4gb2JqZWN0W25hbWVdLmJpbmQob2JqZWN0KVxuXHR9LFxuXG5cdG1ldGhvZFVuYm91bmQobmFtZSkge1xuXHRcdC8vIFRPRE86RVM2IChvYmplY3QsIC4uLmFyZ3MpID0+IG9iamVjdFtuYW1lXSguLi5hcmdzKVxuXHRcdHJldHVybiBmdW5jdGlvbihvYmplY3QpIHsgcmV0dXJuIG9iamVjdFtuYW1lXSguLi5BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSB9XG5cdH0sXG5cblx0c2V0TGF6eSh2YWx1ZSwgbmFtZSwgbGF6eSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgbmFtZSwgeyBnZXQ6IGxhenkuZ2V0LCBlbnVtZXJhYmxlOiB0cnVlIH0pXG5cdH0sXG5cblx0c3ltYm9sKHZhbHVlKSB7XG5cdFx0Y29uc3Qgc3ltYm9sID0gdmFsdWVbJ2ltcGwtc3ltYm9sJ11cblx0XHRyZXR1cm4gc3ltYm9sID09PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHN5bWJvbFxuXHR9LFxuXG5cdG5ld1Byb3BlcnR5KG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgbmFtZSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFByb3BlcnR5ICR7bmFtZX0gYWxyZWFkeSBleGlzdHMuYClcblx0XHRvYmplY3RbbmFtZV0gPSB2YWx1ZVxuXHR9XG59XG5mb3IgKGNvbnN0IGRlZiBpbiBtc0RlZnMpXG5cdG1zRGVmKGRlZiwgbXNEZWZzW2RlZl0pXG5cbi8vIHJlZ2lvbiBDb250YWluc1xuLy8gU29tZSBUeXBlcyB3YW50IHRvIGltcGxlbWVudCBjb250YWlucz8gYmVmb3JlIGl0IGlzIG9mZmljaWFsbHkgZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBjb250YWluc0ltcGxTeW1ib2wgPSBTeW1ib2woJ2NvbnRhaW5zPycpXG5leHBvcnQgY29uc3QgaW1wbENvbnRhaW5zID0gKHR5cGUsIGltcGwpID0+XG5cdHBBZGQodHlwZS5wcm90b3R5cGUsIGNvbnRhaW5zSW1wbFN5bWJvbCwgaW1wbClcblxuLy8gT3ZlcndyaXR0ZW4gYnkgVHlwZS9pbmRleC5tcyB0byBhY3R1YWxseSBkbyB0eXBlIGNoZWNraW5nLlxubXMuY2hlY2tDb250YWlucyA9IChfdHlwZSwgdmFsKSA9PiB2YWxcblxuLy8gU2luY2UgdGhlc2UgYXJlIHByaW1pdGl2ZXMsIHdlIGNhbid0IHVzZSBgaW5zdGFuY2VvZmAuXG5mb3IgKGNvbnN0IHR5cGUgb2YgW0Jvb2xlYW4sIFN0cmluZywgU3ltYm9sLCBOdW1iZXJdKSB7XG5cdC8vIEdlbmVyYXRlZCBjb2RlIGlzIGZhc3RlciB0aGFuIHVzaW5nIGEgY2xvc3VyZS5cblx0Y29uc3Qgc3JjID0gJ3JldHVybiB0eXBlb2YgXyA9PT0gXCInICsgdHlwZS5uYW1lLnRvTG93ZXJDYXNlKCkgKyAnXCInXG5cdHBBZGQodHlwZSwgY29udGFpbnNJbXBsU3ltYm9sLCBGdW5jdGlvbignXycsIHNyYykpXG59XG5cbi8vIEZ1bmN0aW9ucyBhcmUgT2JqZWN0cywgc28gd2UgZG8gdGhpcyBvbmUgZGlmZmVyZW50bHkuXG4vLyBUT0RPOiBUaGlzIHRyZWF0cyBPYmplY3QuY3JlYXRlKG51bGwpIGFzIGFuIG9iamVjdC4gRG8gd2Ugd2FudCB0aGF0P1xucEFkZChPYmplY3QsIGNvbnRhaW5zSW1wbFN5bWJvbCwgZnVuY3Rpb24oXykge1xuXHRpZiAoXyA9PT0gbnVsbClcblx0XHRyZXR1cm4gZmFsc2Vcblx0c3dpdGNoICh0eXBlb2YgXykge1xuXHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn0pXG5cbmltcGxDb250YWlucyhGdW5jdGlvbiwgZnVuY3Rpb24oXykge1xuXHRyZXR1cm4gXyBpbnN0YW5jZW9mIHRoaXNcbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==
