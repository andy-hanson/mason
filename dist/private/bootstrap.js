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
	exports.addProperty = addProperty;
	exports.msDef = msDef;
	exports.implContains = implContains;
	if (typeof global === 'undefined') window.global = window;

	function addProperty(object, key, value) {
		Object.defineProperty(object, key, {
			value,
			writable: false,
			enumerable: false,
			configurable: false
		});
	}

	function msDef(name, fun) {
		addProperty(ms, name, fun);
	}

	const ms = {};
	addProperty(global, '_ms', ms);
	const msDefs = {
		add(bag, value) {
			bag.push(value);
		},

		addMany(bag, values) {
			for (const _ of values) ms.add(bag, _);
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
			if (!obj[member](...args)) throw new Error(assertErrorMessage(`assert ${ ms.inspect(obj) }.${ member }`, args));
		},

		assertNotMember(obj, member) {
			const args = Array.prototype.slice.call(arguments, 2);
			if (obj[member](...args)) throw new Error(assertErrorMessage(`assert ${ ms.inspect(obj) }.${ member }`, args));
		},

		async(generatorFunction) {
			const generator = generatorFunction();

			const continuer = verb => arg => {
				let result;

				try {
					result = generator[verb](arg);
				} catch (error) {
					return Promise.reject(error);
				}

				const value = result.value,
				      done = result.done;
				return done ? value : Promise.resolve(value).then(onFulfilled, onRejected);
			};

			const onFulfilled = continuer('next');
			const onRejected = continuer('throw');
			return onFulfilled();
		},

		$for(collection, generatorFunc) {
			const promises = [];

			for (const elem of collection) promises.push(ms.async(() => generatorFunc(elem)));

			return Promise.all(promises);
		},

		get(object, key) {
			const _ = object[key];
			if (_ === undefined) throw new Error(`Module ${ object.name } does not have ${ key }`);
			return _;
		},

		getModule(module) {
			return module._get instanceof Lazy ? module._get.get() : module;
		},

		getDefaultExport(module) {
			if (module === undefined) throw new Error('Module undefined.');
			const mod = ms.getModule(module);
			return mod.default === undefined ? mod : mod.default;
		},

		lazy(_) {
			return new Lazy(_);
		},

		lazyGetModule(module) {
			if (module === undefined) throw new Error('Module undefined.');
			return module._get instanceof Lazy ? module._get : new Lazy(() => module);
		},

		lazyProp(lazyObject, key) {
			if (!(lazyObject instanceof Lazy)) throw new Error(`Expected a Lazy, got: ${ lazyObject }`);
			return new Lazy(() => lazyObject.get()[key]);
		},

		methodBound(object, name) {
			return object[name].bind(object);
		},

		methodUnbound(name) {
			return function (object) {
				return object[name](...Array.prototype.slice.call(arguments, 1));
			};
		},

		newProperty(object, name, value) {
			if (Object.prototype.hasOwnProperty.call(object, name)) throw new Error(`Property ${ name } already exists.`);
			object[name] = value;
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

		unlazy(_) {
			return _ instanceof Lazy ? _.get() : _;
		}

	};

	for (const def in msDefs) msDef(def, msDefs[def]);

	function assertErrorMessage(lead, args) {
		const showArgs = args.map(ms.inspect).join('\n');
		return `${ lead }\n\t${ indent(showArgs) }`;
	}

	function indent(str) {
		return str.replace(/\n/g, '\n\t');
	}

	class Lazy {
		constructor(get) {
			this.get = () => {
				this.get = () => {
					throw new Error(`Lazy value depends on itself. Thunk: ${ get }`);
				};

				const _ = get();

				this.get = () => _;

				return _;
			};
		}

	}

	const containsImplSymbol = exports.containsImplSymbol = Symbol('contains?');

	function implContains(type, impl) {
		addProperty(type.prototype, containsImplSymbol, impl);
	}

	ms.contains = (type, val) => type[containsImplSymbol](val);

	ms.checkContains = (_type, val) => val;

	for (const type of [Boolean, String, Symbol, Number]) {
		const src = `return typeof _ === "${ type.name.toLowerCase() }"`;
		addProperty(type, containsImplSymbol, Function('_', src));
	}

	implContains(Function, function (_) {
		return _ instanceof this;
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXZhdGUvYm9vdHN0cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUdnQixXQUFXLEdBQVgsV0FBVztTQVNYLEtBQUssR0FBTCxLQUFLO1NBcUtMLFlBQVksR0FBWixZQUFZOzs7VUE5S1osV0FBVzs7Ozs7Ozs7O1VBU1gsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0tSLGtCQUFrQixXQUFsQixrQkFBa0IsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDOztVQUNyQyxZQUFZIiwiZmlsZSI6InByaXZhdGUvYm9vdHN0cmFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKHR5cGVvZiBnbG9iYWwgPT09ICd1bmRlZmluZWQnKVxuXHR3aW5kb3cuZ2xvYmFsID0gd2luZG93XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRQcm9wZXJ0eShvYmplY3QsIGtleSwgdmFsdWUpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG5cdFx0dmFsdWUsXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2Vcblx0fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1zRGVmKG5hbWUsIGZ1bikge1xuXHRhZGRQcm9wZXJ0eShtcywgbmFtZSwgZnVuKVxufVxuXG4vLyBUaGlzIG9iamVjdCBjb250YWlucyBmdW5jdGlvbnMgY2FsbGVkIHVwb24gYnkgY29tcGlsZWQgY29kZS5cbmNvbnN0IG1zID0geyB9XG5hZGRQcm9wZXJ0eShnbG9iYWwsICdfbXMnLCBtcylcblxuY29uc3QgbXNEZWZzID0ge1xuXHQvLyBUT0RPOiB1c2UgKyEgbWV0aG9kXG5cdGFkZChiYWcsIHZhbHVlKSB7XG5cdFx0YmFnLnB1c2godmFsdWUpXG5cdH0sXG5cblx0YWRkTWFueShiYWcsIHZhbHVlcykge1xuXHRcdGZvciAoY29uc3QgXyBvZiB2YWx1ZXMpXG5cdFx0XHRtcy5hZGQoYmFnLCBfKVxuXHR9LFxuXG5cdGFzc2VydChmdW4pIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cdFx0aWYgKCFmdW4oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBhc3NlcnQgJHtmdW4ubmFtZX1gLCBhcmdzKSlcblx0fSxcblxuXHRhc3NlcnROb3QoZnVuKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdGlmIChmdW4oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBmb3JiaWQgJHtmdW4ubmFtZX1gLCBhcmdzKSlcblx0fSxcblxuXHRhc3NlcnRNZW1iZXIob2JqLCBtZW1iZXIpIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG5cdFx0aWYgKCFvYmpbbWVtYmVyXSguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGFzc2VydCAke21zLmluc3BlY3Qob2JqKX0uJHttZW1iZXJ9YCwgYXJncykpXG5cdH0sXG5cblx0YXNzZXJ0Tm90TWVtYmVyKG9iaiwgbWVtYmVyKSB7XG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMilcblx0XHRpZiAob2JqW21lbWJlcl0oLi4uYXJncykpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYXNzZXJ0RXJyb3JNZXNzYWdlKGBhc3NlcnQgJHttcy5pbnNwZWN0KG9iail9LiR7bWVtYmVyfWAsIGFyZ3MpKVxuXHR9LFxuXG5cdGFzeW5jKGdlbmVyYXRvckZ1bmN0aW9uKSB7XG5cdFx0Y29uc3QgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yRnVuY3Rpb24oKVxuXHRcdC8vIFRPRE86RVM3IEp1c3QgdXNlIG5hdGl2ZSBhc3luYyBmdW5jdGlvbnNcblx0XHRjb25zdCBjb250aW51ZXIgPSB2ZXJiID0+IGFyZyA9PiB7XG5cdFx0XHRsZXQgcmVzdWx0XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0oYXJnKVxuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUT0RPOkVTNiBjb25zdCB7dmFsdWUsIGRvbmV9ID0gcmVzdWx0XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHJlc3VsdC52YWx1ZSwgZG9uZSA9IHJlc3VsdC5kb25lXG5cdFx0XHRyZXR1cm4gZG9uZSA/IHZhbHVlIDogUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuXHRcdH1cblx0XHRjb25zdCBvbkZ1bGZpbGxlZCA9IGNvbnRpbnVlcignbmV4dCcpXG5cdFx0Y29uc3Qgb25SZWplY3RlZCA9IGNvbnRpbnVlcigndGhyb3cnKVxuXHRcdHJldHVybiBvbkZ1bGZpbGxlZCgpXG5cdH0sXG5cblx0JGZvcihjb2xsZWN0aW9uLCBnZW5lcmF0b3JGdW5jKSB7XG5cdFx0Y29uc3QgcHJvbWlzZXMgPSBbXVxuXHRcdGZvciAoY29uc3QgZWxlbSBvZiBjb2xsZWN0aW9uKVxuXHRcdFx0cHJvbWlzZXMucHVzaChtcy5hc3luYygoKSA9PiBnZW5lcmF0b3JGdW5jKGVsZW0pKSlcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXG5cdH0sXG5cblx0Z2V0KG9iamVjdCwga2V5KSB7XG5cdFx0Ly8gVE9ETzpFUzYganVzdCB1c2UgYGltcG9ydGAgc3RhdGVtZW5qdFxuXHRcdGNvbnN0IF8gPSBvYmplY3Rba2V5XVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE1vZHVsZSAke29iamVjdC5uYW1lfSBkb2VzIG5vdCBoYXZlICR7a2V5fWApXG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHRnZXRNb2R1bGUobW9kdWxlKSB7XG5cdFx0Ly8gVE9ETzpFUzYganVzdCB1c2UgYGltcG9ydGAgc3RhdGVtZW5qdFxuXHRcdHJldHVybiBtb2R1bGUuX2dldCBpbnN0YW5jZW9mIExhenkgPyBtb2R1bGUuX2dldC5nZXQoKSA6IG1vZHVsZVxuXHR9LFxuXG5cdGdldERlZmF1bHRFeHBvcnQobW9kdWxlKSB7XG5cdFx0Ly8gVE9ETzpFUzYganVzdCB1c2UgYGltcG9ydGAgc3RhdGVtZW5qdFxuXHRcdGlmIChtb2R1bGUgPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdGNvbnN0IG1vZCA9IG1zLmdldE1vZHVsZShtb2R1bGUpXG5cdFx0cmV0dXJuIG1vZC5kZWZhdWx0ID09PSB1bmRlZmluZWQgPyBtb2QgOiBtb2QuZGVmYXVsdFxuXHR9LFxuXG5cdGxhenkoXykge1xuXHRcdHJldHVybiBuZXcgTGF6eShfKVxuXHR9LFxuXG5cdGxhenlHZXRNb2R1bGUobW9kdWxlKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU2hvdWxkbid0IG5lZWRcblx0XHRpZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRyZXR1cm4gbW9kdWxlLl9nZXQgaW5zdGFuY2VvZiBMYXp5ID8gbW9kdWxlLl9nZXQgOiBuZXcgTGF6eSgoKSA9PiBtb2R1bGUpXG5cdH0sXG5cblx0bGF6eVByb3AobGF6eU9iamVjdCwga2V5KSB7XG5cdFx0aWYgKCEobGF6eU9iamVjdCBpbnN0YW5jZW9mIExhenkpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhIExhenksIGdvdDogJHtsYXp5T2JqZWN0fWApXG5cdFx0cmV0dXJuIG5ldyBMYXp5KCgpID0+IGxhenlPYmplY3QuZ2V0KClba2V5XSlcblx0fSxcblxuXHRtZXRob2RCb3VuZChvYmplY3QsIG5hbWUpIHtcblx0XHRyZXR1cm4gb2JqZWN0W25hbWVdLmJpbmQob2JqZWN0KVxuXHR9LFxuXG5cdG1ldGhvZFVuYm91bmQobmFtZSkge1xuXHRcdC8vIFRPRE86RVM2IChvYmplY3QsIC4uLmFyZ3MpID0+IG9iamVjdFtuYW1lXSguLi5hcmdzKVxuXHRcdHJldHVybiBmdW5jdGlvbihvYmplY3QpIHsgcmV0dXJuIG9iamVjdFtuYW1lXSguLi5BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSB9XG5cdH0sXG5cblx0bmV3UHJvcGVydHkob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBuYW1lKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgJHtuYW1lfSBhbHJlYWR5IGV4aXN0cy5gKVxuXHRcdG9iamVjdFtuYW1lXSA9IHZhbHVlXG5cdH0sXG5cblx0c2V0TGF6eSh2YWx1ZSwgbmFtZSwgbGF6eSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgbmFtZSwge2dldDogbGF6eS5nZXQsIGVudW1lcmFibGU6IHRydWV9KVxuXHR9LFxuXG5cdHN5bWJvbCh2YWx1ZSkge1xuXHRcdGNvbnN0IHN5bWJvbCA9IHZhbHVlWydpbXBsLXN5bWJvbCddXG5cdFx0cmV0dXJuIHN5bWJvbCA9PT0gdW5kZWZpbmVkID8gdmFsdWUgOiBzeW1ib2xcblx0fSxcblxuXHR1bmxhenkoXykge1xuXHRcdHJldHVybiBfIGluc3RhbmNlb2YgTGF6eSA/IF8uZ2V0KCkgOiBfXG5cdH1cbn1cbmZvciAoY29uc3QgZGVmIGluIG1zRGVmcylcblx0bXNEZWYoZGVmLCBtc0RlZnNbZGVmXSlcblxuZnVuY3Rpb24gYXNzZXJ0RXJyb3JNZXNzYWdlKGxlYWQsIGFyZ3MpIHtcblx0Y29uc3Qgc2hvd0FyZ3MgPSBhcmdzLm1hcChtcy5pbnNwZWN0KS5qb2luKCdcXG4nKVxuXHRyZXR1cm4gYCR7bGVhZH1cXG5cXHQke2luZGVudChzaG93QXJncyl9YFxufVxuZnVuY3Rpb24gaW5kZW50KHN0cikge1xuXHRyZXR1cm4gc3RyLnJlcGxhY2UoL1xcbi9nLCAnXFxuXFx0Jylcbn1cblxuY2xhc3MgTGF6eSB7XG5cdGNvbnN0cnVjdG9yKGdldCkge1xuXHRcdHRoaXMuZ2V0ID0gKCkgPT4ge1xuXHRcdFx0dGhpcy5nZXQgPSAoKSA9PiB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgTGF6eSB2YWx1ZSBkZXBlbmRzIG9uIGl0c2VsZi4gVGh1bms6ICR7Z2V0fWApXG5cdFx0XHR9XG5cdFx0XHRjb25zdCBfID0gZ2V0KClcblx0XHRcdHRoaXMuZ2V0ID0gKCkgPT4gX1xuXHRcdFx0cmV0dXJuIF9cblx0XHR9XG5cdH1cbn1cblxuLy8gU29tZSBUeXBlcyB3YW50IHRvIGltcGxlbWVudCBjb250YWlucz8gYmVmb3JlIGl0IGlzIG9mZmljaWFsbHkgZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBjb250YWluc0ltcGxTeW1ib2wgPSBTeW1ib2woJ2NvbnRhaW5zPycpXG5leHBvcnQgZnVuY3Rpb24gaW1wbENvbnRhaW5zKHR5cGUsIGltcGwpIHtcblx0YWRkUHJvcGVydHkodHlwZS5wcm90b3R5cGUsIGNvbnRhaW5zSW1wbFN5bWJvbCwgaW1wbClcbn1cblxuLy8gVGhlc2UgYXJlIG92ZXJ3cml0dGVuIGJ5IFR5cGUubXMuXG5tcy5jb250YWlucyA9ICh0eXBlLCB2YWwpID0+IHR5cGVbY29udGFpbnNJbXBsU3ltYm9sXSh2YWwpXG5tcy5jaGVja0NvbnRhaW5zID0gKF90eXBlLCB2YWwpID0+IHZhbFxuXG4vLyBTaW5jZSB0aGVzZSBhcmUgcHJpbWl0aXZlcywgd2UgY2FuJ3QgdXNlIGBpbnN0YW5jZW9mYC5cbmZvciAoY29uc3QgdHlwZSBvZiBbQm9vbGVhbiwgU3RyaW5nLCBTeW1ib2wsIE51bWJlcl0pIHtcblx0Ly8gR2VuZXJhdGVkIGNvZGUgaXMgZmFzdGVyIHRoYW4gdXNpbmcgYSBjbG9zdXJlLlxuXHRjb25zdCBzcmMgPSBgcmV0dXJuIHR5cGVvZiBfID09PSBcIiR7dHlwZS5uYW1lLnRvTG93ZXJDYXNlKCl9XCJgXG5cdGFkZFByb3BlcnR5KHR5cGUsIGNvbnRhaW5zSW1wbFN5bWJvbCwgRnVuY3Rpb24oJ18nLCBzcmMpKVxufVxuXG5pbXBsQ29udGFpbnMoRnVuY3Rpb24sIGZ1bmN0aW9uKF8pIHtcblx0cmV0dXJuIF8gaW5zdGFuY2VvZiB0aGlzXG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=
