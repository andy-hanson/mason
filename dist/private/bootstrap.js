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

	const indent = function (str) {
		return str.replace(/\n/g, '\n\t');
	};

	const msDefs = {
		// TODO: use +! method
		add: function (bag, value) {
			bag.push(value);
		},

		addMany: function (bag, values) {
			for (let value of values) ms.add(bag, value);
		},

		assert: function (fun) {
			for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				args[_key2 - 1] = arguments[_key2];
			}

			if (!Function.prototype.apply.call(fun, null, args)) {
				const showArgs = args.map(_ms.repr).join('\n');
				throw new Error('assert! ' + _ms.show(fun) + '\n\t' + indent(showArgs));
			}
		},

		assertNot: function (fun) {
			for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				args[_key3 - 1] = arguments[_key3];
			}

			if (Function.prototype.apply.call(fun, null, args)) {
				const showArgs = args.map(_ms.repr).join('\n');
				throw new Error('forbid! ' + _ms.show(fun) + '\n\t' + indent(showArgs));
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXZhdGUvYm9vdHN0cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFPLE9BQU0sSUFBSSxHQUFHLFVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLO1NBQ3RDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUNsQyxRQUFLLEVBQUwsS0FBSztBQUNMLFdBQVEsRUFBRSxLQUFLO0FBQ2YsYUFBVSxFQUFFLEtBQUs7QUFDakIsZUFBWSxFQUFFLEtBQUs7R0FDbkIsQ0FBQztFQUFBLENBQUE7O1NBTlUsSUFBSSxHQUFKLElBQUk7O0FBU1Y7O0FBRU4sR0FBRSxHQUFHLEVBQUc7T0FDUixLQUFLLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUNqQixJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUM7RUFBQTtPQUNwQixNQUFNLEdBQUcsVUFBQyxJQUFJO29DQUFLLElBQUk7QUFBSixPQUFJOzs7U0FDdEIsRUFBRSxDQUFDLElBQUksT0FBQyxDQUFSLEVBQUUsRUFBVSxJQUFJLENBQUM7RUFBQSxDQUFBOztTQUpsQixFQUFFLEdBQUYsRUFBRTtTQUNGLEtBQUssR0FBTCxLQUFLO1NBRUwsTUFBTSxHQUFOLE1BQU07QUFHUCxLQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTs7QUFFdkIsT0FBTSxNQUFNLEdBQUcsVUFBQSxHQUFHO1NBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO0VBQUEsQ0FBQTs7QUFFaEQsT0FBTSxNQUFNLEdBQUc7O0FBRWQsS0FBRyxFQUFBLFVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUNmLE1BQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7R0FDZjs7QUFFRCxTQUFPLEVBQUEsVUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLFFBQUssSUFBSSxLQUFLLElBQUksTUFBTSxFQUN2QixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTtHQUNuQjs7QUFFRCxRQUFNLEVBQUEsVUFBQyxHQUFHLEVBQVc7c0NBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUNsQixPQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDcEQsVUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzlDLFVBQU0sSUFBSSxLQUFLLGNBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBTyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUcsQ0FBQTtJQUNsRTtHQUNEOztBQUVELFdBQVMsRUFBQSxVQUFDLEdBQUcsRUFBVztzQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ3JCLE9BQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDbkQsVUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzlDLFVBQU0sSUFBSSxLQUFLLGNBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBTyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUcsQ0FBQTtJQUNsRTtHQUNEOzs7QUFHRCxPQUFLLEVBQUEsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNwQixNQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtHQUNqQjs7QUFFRCxlQUFhLEVBQUEsVUFBQyxNQUFNLEVBQUU7QUFDckIsT0FBSSxNQUFNLEtBQUssU0FBUyxFQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDckMsVUFBTyxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1dBQU0sTUFBTTtJQUFBLENBQUMsQ0FBQTtHQUMzRTs7QUFFRCxXQUFTLEVBQUEsVUFBQyxNQUFNLEVBQUU7QUFDakIsT0FBSSxNQUFNLEtBQUssU0FBUyxFQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDckMsVUFBTyxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUE7R0FDbEU7O0FBRUQsa0JBQWdCLEVBQUUsVUFBQSxNQUFNLEVBQUk7QUFDM0IsT0FBSSxNQUFNLEtBQUssU0FBUyxFQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDckMsU0FBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNoQyxVQUFPLEdBQUcsQ0FBQyxPQUFPLEtBQUssU0FBUyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFBO0dBQ3BEOztBQUVELFVBQVEsRUFBQSxVQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7QUFDekIsT0FBSSxFQUFFLFVBQVUsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFBLEFBQUMsRUFDbkMsTUFBTSxJQUFJLEtBQUssNEJBQTBCLFVBQVUsQ0FBRyxDQUFBO0FBQ3ZELFVBQU8sRUFBRSxDQUFDLElBQUksQ0FBQztXQUFNLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFBQSxDQUFDLENBQUE7R0FDM0M7O0FBRUQsS0FBRyxFQUFBLFVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUNoQixTQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDckIsT0FBSSxDQUFDLEtBQUssU0FBUyxFQUNsQixNQUFNLElBQUksS0FBSyxhQUFXLE1BQU0sQ0FBQyxJQUFJLHVCQUFrQixHQUFHLENBQUcsQ0FBQTtBQUM5RCxVQUFPLENBQUMsQ0FBQTtHQUNSOztBQUVELE1BQUksRUFBQSxVQUFDLENBQUMsRUFBRTtBQUNQLE9BQUksT0FBTyxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQzNCLFdBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDZCxVQUFNLElBQUksS0FBSyw0QkFBMEIsQ0FBQyxDQUFHLENBQUE7SUFDN0M7QUFDRCxVQUFPLENBQUMsQ0FBQTtHQUNSOzs7O0FBSUQsS0FBRyxFQUFBLFVBQUMsQ0FBQyxFQUFFO0FBQ04sT0FBSSxDQUFDLFlBQVksS0FBSyxFQUNyQixPQUFPLENBQUMsQ0FBQTtBQUNULFNBQU0sR0FBRyxHQUFHLEVBQUcsQ0FBQTtBQUNmLFFBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxFQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDYixVQUFPLEdBQUcsQ0FBQTtHQUNWOztBQUVELE9BQUssRUFBQSxVQUFDLEdBQUcsRUFBRTtBQUNWLE9BQUksR0FBRyxZQUFZLEtBQUssRUFDdkIsT0FBTyxHQUFHLENBQUEsS0FDTixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFDL0IsT0FBTyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSxLQUNqQixJQUFJLEdBQUcsWUFBWSxHQUFHLENBQUMsSUFBSSxFQUMvQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUEsS0FFM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO0dBQ3hEOzs7QUFHRCxlQUFhLEVBQUEsVUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTs7QUFFL0IsT0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFDcEQsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDOztBQUUvQyxPQUFJLElBQUksS0FBSyxNQUFNLEVBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUNyRCxNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFBO0dBQzVEOztBQUVELE1BQUksRUFBRSxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUU7OztBQUN4QixPQUFJLENBQUMsR0FBRyxHQUFHLFlBQU07QUFDaEIsV0FBSyxHQUFHLEdBQUcsWUFBTTtBQUNoQixXQUFNLElBQUksS0FBSywyQ0FBeUMsR0FBRyxDQUFHLENBQUE7S0FDOUQsQ0FBQTtBQUNELFVBQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2YsV0FBSyxHQUFHLEdBQUc7WUFBTSxDQUFDO0tBQUEsQ0FBQTtBQUNsQixXQUFPLENBQUMsQ0FBQTtJQUNSLENBQUE7R0FDRDtBQUNELE1BQUksRUFBRSxVQUFBLENBQUM7VUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0dBQUE7QUFDekIsUUFBTSxFQUFFLFVBQUEsQ0FBQztVQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO0dBQUE7OztBQUcvQyxLQUFHLEVBQUEsVUFBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFO0FBQ3BDLFFBQUssTUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQ2pDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFDL0IsTUFBTSxDQUFDLHdCQUF3QixDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDekQsT0FBSSxFQUFFLEtBQUssWUFBWSxRQUFRLENBQUEsQUFBQyxFQUMvQixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQ3ZCLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQzNCLFVBQU8sS0FBSyxDQUFBO0dBQ1o7QUFDRCxTQUFPLEVBQUEsVUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO0FBQ3BCLFFBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2pCLFVBQU8sS0FBSyxDQUFBO0dBQ1o7QUFDRCxTQUFPLEVBQUEsVUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUMxQixTQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtHQUN2RTtFQUNELENBQUE7QUFDRCxNQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFDdkIsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTs7QUFFeEIsT0FBTSxTQUFTLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUMzQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRztFQUFBLENBQUE7OztBQUdmLFVBQVMsQ0FBQyxNQUFNLEVBQUUsVUFBQSxDQUFDLEVBQUk7QUFDdEIsTUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUNqRCxNQUFNLElBQUksS0FBSyxrRkFDaUUsQ0FBQyxDQUFHLENBQUE7QUFDckYsU0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7RUFDbkIsQ0FBQyxDQUFBOzs7O0FBSUssT0FBTSxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQTtTQUFyQyxrQkFBa0IsR0FBbEIsa0JBQWtCO0FBQ3hCLE9BQU0sWUFBWSxHQUFHLFVBQUMsSUFBSSxFQUFFLElBQUk7U0FDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDO0VBQUEsQ0FBQTs7U0FEbEMsWUFBWSxHQUFaLFlBQVk7O0FBSXpCLFVBQVMsQ0FBQyxlQUFlLEVBQUUsVUFBQyxLQUFLLEVBQUUsR0FBRztTQUFLLEdBQUc7RUFBQSxDQUFDLENBQUE7Ozs7OztBQU0vQyxNQUFLLE1BQU0sSUFBSSxJQUFJLENBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxFQUFFOztBQUVqRSxRQUFNLEdBQUcsR0FBRyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNuRSxNQUFJLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7RUFDNUQ7Ozs7QUFJRCxLQUFJLENBQUMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLFVBQVMsT0FBTyxFQUFFLENBQUMsRUFBRTtBQUNyRCxNQUFJLENBQUMsS0FBSyxJQUFJLEVBQ2IsT0FBTyxLQUFLLENBQUE7QUFDYixVQUFRLE9BQU8sQ0FBQztBQUNmLFFBQUssVUFBVSxDQUFDO0FBQ2hCLFFBQUssUUFBUTtBQUNaLFdBQU8sSUFBSSxDQUFBO0FBQUEsQUFDWjtBQUNDLFdBQU8sS0FBSyxDQUFBO0FBQUEsR0FDYjtFQUNELENBQUMsQ0FBQSIsImZpbGUiOiJwcml2YXRlL2Jvb3RzdHJhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBwQWRkID0gKG9iamVjdCwga2V5LCB2YWx1ZSkgPT5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG5cdFx0dmFsdWUsXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2Vcblx0fSlcblxuLy8gcmVnaW9uIEJ1aWx0aW4gRnVuY3Rpb25zIGZvciB1c2UgYnkgdGhlIGNvbXBpbGVyXG5leHBvcnQgY29uc3Rcblx0Ly8gVGhpcyBvYmplY3QgY29udGFpbnMgZnVuY3Rpb25zIGNhbGxlZCB1cG9uIGJ5IGNvbXBpbGVkIGNvZGUuXG5cdG1zID0geyB9LFxuXHRtc0RlZiA9IChuYW1lLCBmdW4pID0+XG5cdFx0cEFkZChtcywgbmFtZSwgZnVuKSxcblx0bXNDYWxsID0gKG5hbWUsIC4uLmFyZ3MpID0+XG5cdFx0bXNbbmFtZV0oLi4uYXJncylcblxucEFkZChnbG9iYWwsICdfbXMnLCBtcylcblxuY29uc3QgaW5kZW50ID0gc3RyID0+IHN0ci5yZXBsYWNlKC9cXG4vZywgJ1xcblxcdCcpXG5cbmNvbnN0IG1zRGVmcyA9IHtcblx0Ly8gVE9ETzogdXNlICshIG1ldGhvZFxuXHRhZGQoYmFnLCB2YWx1ZSkge1xuXHRcdGJhZy5wdXNoKHZhbHVlKVxuXHR9LFxuXG5cdGFkZE1hbnkoYmFnLCB2YWx1ZXMpIHtcblx0XHRmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpXG5cdFx0XHRtcy5hZGQoYmFnLCB2YWx1ZSlcblx0fSxcblxuXHRhc3NlcnQoZnVuLCAuLi5hcmdzKSB7XG5cdFx0aWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChmdW4sIG51bGwsIGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBzaG93QXJncyA9IGFyZ3MubWFwKF9tcy5yZXByKS5qb2luKCdcXG4nKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBhc3NlcnQhICR7X21zLnNob3coZnVuKX1cXG5cXHQke2luZGVudChzaG93QXJncyl9YClcblx0XHR9XG5cdH0sXG5cblx0YXNzZXJ0Tm90KGZ1biwgLi4uYXJncykge1xuXHRcdGlmIChGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChmdW4sIG51bGwsIGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBzaG93QXJncyA9IGFyZ3MubWFwKF9tcy5yZXByKS5qb2luKCdcXG4nKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBmb3JiaWQhICR7X21zLnNob3coZnVuKX1cXG5cXHQke2luZGVudChzaG93QXJncyl9YClcblx0XHR9XG5cdH0sXG5cblx0Ly8gVE9ETzogdXNlIGFzc29jISBtZXRob2Rcblx0YXNzb2MobWFwLCBrZXksIHZhbCkge1xuXHRcdG1hcC5zZXQoa2V5LCB2YWwpXG5cdH0sXG5cblx0bGF6eUdldE1vZHVsZShtb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRyZXR1cm4gbW9kdWxlLl9nZXQgaW5zdGFuY2VvZiBtcy5MYXp5ID8gbW9kdWxlLl9nZXQgOiBtcy5sYXp5KCgpID0+IG1vZHVsZSlcblx0fSxcblxuXHRnZXRNb2R1bGUobW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgdW5kZWZpbmVkLicpXG5cdFx0cmV0dXJuIG1vZHVsZS5fZ2V0IGluc3RhbmNlb2YgbXMuTGF6eSA/IG1vZHVsZS5fZ2V0LmdldCgpIDogbW9kdWxlXG5cdH0sXG5cblx0Z2V0RGVmYXVsdEV4cG9ydDogbW9kdWxlID0+IHtcblx0XHRpZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRjb25zdCBtb2QgPSBtcy5nZXRNb2R1bGUobW9kdWxlKVxuXHRcdHJldHVybiBtb2QuZGVmYXVsdCA9PT0gdW5kZWZpbmVkID8gbW9kIDogbW9kLmRlZmF1bHRcblx0fSxcblxuXHRsYXp5UHJvcChsYXp5T2JqZWN0LCBrZXkpIHtcblx0XHRpZiAoIShsYXp5T2JqZWN0IGluc3RhbmNlb2YgbXMuTGF6eSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGEgTGF6eSwgZ290OiAke2xhenlPYmplY3R9YClcblx0XHRyZXR1cm4gbXMubGF6eSgoKSA9PiBsYXp5T2JqZWN0LmdldCgpW2tleV0pXG5cdH0sXG5cblx0Z2V0KG9iamVjdCwga2V5KSB7XG5cdFx0Y29uc3QgXyA9IG9iamVjdFtrZXldXG5cdFx0aWYgKF8gPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihgTW9kdWxlICR7b2JqZWN0Lm5hbWV9IGRvZXMgbm90IGhhdmUgJHtrZXl9YClcblx0XHRyZXR1cm4gX1xuXHR9LFxuXG5cdGJvb2woYikge1xuXHRcdGlmICh0eXBlb2YgYiAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhiKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBCb29sZWFuLCBnb3QgJHtifWApXG5cdFx0fVxuXHRcdHJldHVybiBiXG5cdH0sXG5cblx0Ly8gVXNlZCBmb3Igc3BsYXQgY2FsbHMuXG5cdC8vIFRPRE86RVM2IFNob3VsZG4ndCBuZWVkLiBgZnVuKC4uLmFyZylgIHNob3VsZCB3b3JrIGZvciBhbnkgaXRlcmFibGUuXG5cdGFycihfKSB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdHJldHVybiBfXG5cdFx0Y29uc3Qgb3V0ID0gWyBdXG5cdFx0Zm9yIChsZXQgZW0gb2YgXylcblx0XHRcdG91dC5wdXNoKGVtKVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHRlcnJvcihlcnIpIHtcblx0XHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpXG5cdFx0XHRyZXR1cm4gZXJyXG5cdFx0ZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gJ3N0cmluZycpXG5cdFx0XHRyZXR1cm4gbmV3IEVycm9yKGVycilcblx0XHRlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBfbXMuTGF6eSlcblx0XHRcdHJldHVybiBfbXMuZXJyb3IoZXJyLmdldCgpKVxuXHRcdGVsc2Vcblx0XHRcdHRocm93IG5ldyBFcnJvcignVGhyb3duIHZhbHVlIG11c3QgYmUgRXJyb3Igb3IgU3RyaW5nJylcblx0fSxcblxuXHQvLyBGb3IgdXNlIGJ5IE9iai1UeXBlLm1zIGdlbmVyYXRlZCBjb2RlLlxuXHRjaGVja05vRXh0cmFzKF90aGlzLCBfLCBydE5hbWUpIHtcblx0XHQvLyBJZiB0aGVyZSB3YXMgc29tZSBrZXkgaW4gYF9gIHRoYXQgd2UgZGlkbid0IGNvcHk6XG5cdFx0aWYgKE9iamVjdC5rZXlzKF8pLmxlbmd0aCA+IE9iamVjdC5rZXlzKF90aGlzKS5sZW5ndGgpXG5cdFx0XHRmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoXykpXG5cdFx0XHRcdC8vIFRPRE86RElTUExBWU5BTUVcblx0XHRcdFx0aWYgKG5hbWUgIT09ICduYW1lJylcblx0XHRcdFx0XHRpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfdGhpcywgbmFtZSkpXG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4dHJhIHByb3AgJyArIG5hbWUgKyAnIGZvciAnICsgcnROYW1lKVxuXHR9LFxuXG5cdExhenk6IGZ1bmN0aW9uIExhenkoZ2V0KSB7XG5cdFx0dGhpcy5nZXQgPSAoKSA9PiB7XG5cdFx0XHR0aGlzLmdldCA9ICgpID0+IHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBMYXp5IHZhbHVlIGRlcGVuZHMgb24gaXRzZWxmLiBUaHVuazogJHtnZXR9YClcblx0XHRcdH1cblx0XHRcdGNvbnN0IF8gPSBnZXQoKVxuXHRcdFx0dGhpcy5nZXQgPSAoKSA9PiBfXG5cdFx0XHRyZXR1cm4gX1xuXHRcdH1cblx0fSxcblx0bGF6eTogXyA9PiBuZXcgbXMuTGF6eShfKSxcblx0dW5sYXp5OiBfID0+IF8gaW5zdGFuY2VvZiBtcy5MYXp5ID8gXy5nZXQoKSA6IF8sXG5cblx0Ly8gVW5saWtlIE9iamVjdC5hc3NpZ24sIGRvZXMgKm5vdCogaW52b2tlIGdldHRlcnMuXG5cdHNldCh2YWx1ZSwgcHJvcGVydGllc09iamVjdCwgb3BOYW1lKSB7XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllc09iamVjdClcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWx1ZSwga2V5LFxuXHRcdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3BlcnRpZXNPYmplY3QsIGtleSkpXG5cdFx0aWYgKCEodmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikpXG5cdFx0XHRpZiAob3BOYW1lICE9PSB1bmRlZmluZWQpXG5cdFx0XHRcdG1zLnNldE5hbWUodmFsdWUsIG9wTmFtZSlcblx0XHRyZXR1cm4gdmFsdWVcblx0fSxcblx0c2V0TmFtZSh2YWx1ZSwgbmFtZSkge1xuXHRcdHZhbHVlLm5hbWUgPSBuYW1lXG5cdFx0cmV0dXJuIHZhbHVlXG5cdH0sXG5cdHNldExhenkodmFsdWUsIG5hbWUsIGxhenkpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsdWUsIG5hbWUsIHsgZ2V0OiBsYXp5LmdldCwgZW51bWVyYWJsZTogdHJ1ZSB9KVxuXHR9XG59XG5mb3IgKGNvbnN0IGRlZiBpbiBtc0RlZnMpXG5cdG1zRGVmKGRlZiwgbXNEZWZzW2RlZl0pXG5cbmNvbnN0IG1zRGVmVGVtcCA9IChuYW1lLCBmdW4pID0+XG5cdG1zW25hbWVdID0gZnVuXG5cbi8vIE92ZXJyaWRkZW4gYnkgc2hvdy5tcy5cbm1zRGVmVGVtcCgnc2hvdycsIF8gPT4ge1xuXHRpZiAodHlwZW9mIF8gIT09ICdzdHJpbmcnICYmIHR5cGVvZiBfICE9PSAnbnVtYmVyJylcblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRgT25seSB1c2UgU3RyaW5ncyBvciBOdW1iZXJzIGhlcmUgdW50aWwgdGhpcyBpcyBvdmVycmlkZGVuIGJ5IHNob3cubXMuIEdvdDpcXG4ke199YClcblx0cmV0dXJuIF8udG9TdHJpbmcoKVxufSlcblxuLy8gcmVnaW9uIENvbnRhaW5zXG4vLyBTb21lIFR5cGVzIHdhbnQgdG8gaW1wbGVtZW50IGNvbnRhaW5zPyBiZWZvcmUgaXQgaXMgb2ZmaWNpYWxseSBkZWZpbmVkLlxuZXhwb3J0IGNvbnN0IGNvbnRhaW5zSW1wbFN5bWJvbCA9ICdpbXBsLWNvbnRhaW5zPydcbmV4cG9ydCBjb25zdCBpbXBsQ29udGFpbnMgPSAodHlwZSwgaW1wbCkgPT5cblx0cEFkZCh0eXBlLnByb3RvdHlwZSwgY29udGFpbnNJbXBsU3ltYm9sLCBpbXBsKVxuXG4vLyBPdmVyd3JpdHRlbiBieSBUeXBlL2luZGV4Lm1zIHRvIGFjdHVhbGx5IGRvIHR5cGUgY2hlY2tpbmcuXG5tc0RlZlRlbXAoJ2NoZWNrQ29udGFpbnMnLCAoX3R5cGUsIHZhbCkgPT4gdmFsKVxuXG4vLyBBbiBvYmplY3QgaXMgYSBGdW5jdGlvbiBpZiBpdHMgdHlwZW9mIGlzIGBmdW5jdGlvbmAuXG4vLyBUaGlzIGhlbHBzIHVzIGNhdGNoIGFueSBjYWxsYWJlIE9iai1UeXBlLlxuLy8gVE9ETzogU2VwYXJhdGUgRnVuY3Rpb24gZnJvbSBDYWxsYWJsZVxuLy8gU2luY2UgdGhlc2UgYXJlIHByaW1pdGl2ZXMsIHdlIGNhbid0IHVzZSBgaW5zdGFuY2VvZmAuXG5mb3IgKGNvbnN0IHR5cGUgb2YgWyBGdW5jdGlvbiwgQm9vbGVhbiwgU3RyaW5nLCBTeW1ib2wsIE51bWJlciBdKSB7XG5cdC8vIEdlbmVyYXRlZCBjb2RlIGlzIGZhc3RlciB0aGFuIHVzaW5nIGEgY2xvc3VyZS5cblx0Y29uc3Qgc3JjID0gJ3JldHVybiB0eXBlb2YgXyA9PT0gXCInICsgdHlwZS5uYW1lLnRvTG93ZXJDYXNlKCkgKyAnXCInXG5cdHBBZGQodHlwZSwgY29udGFpbnNJbXBsU3ltYm9sLCBGdW5jdGlvbignaWdub3JlJywgJ18nLCBzcmMpKVxufVxuXG4vLyBGdW5jdGlvbnMgYXJlIE9iamVjdHMsIHNvIHdlIGRvIHRoaXMgb25lIGRpZmZlcmVudGx5LlxuLy8gVE9ETzogVGhpcyB0cmVhdHMgT2JqZWN0LmNyZWF0ZShudWxsKSBhcyBhbiBvYmplY3QuIERvIHdlIHdhbnQgdGhhdD9cbnBBZGQoT2JqZWN0LCBjb250YWluc0ltcGxTeW1ib2wsIGZ1bmN0aW9uKF9pZ25vcmUsIF8pIHtcblx0aWYgKF8gPT09IG51bGwpXG5cdFx0cmV0dXJuIGZhbHNlXG5cdHN3aXRjaCAodHlwZW9mIF8pIHtcblx0XHRjYXNlICdmdW5jdGlvbic6XG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBmYWxzZVxuXHR9XG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=