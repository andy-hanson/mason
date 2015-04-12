if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports"], function (exports) {
	"use strict";

	const pAdd = function (object, key, value) {
		return Object.defineProperty(object, key, {
			value: value,
			enumerable: true,
			// TODO:ES6 `writable` shouldn't need to be explicit
			writable: false
		});
	};

	// region Builtin Funs for use by the compiler
	// This object contains functions called upon by compiled code.
	const ms = exports.ms = {};
	pAdd(global, "_ms", ms);

	const msDef = exports.msDef = function (name, fun) {
		return pAdd(ms, name, fun);
	};
	const msDefTemp = function (name, fun) {
		return ms[name] = fun;
	};
	exports.msCall = function (name) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return ms[name].apply(ms, args);
	};

	const msDefs = {
		lazyGetModule: function (module) {
			if (module === undefined) throw new Error("Module undefined.");
			return module._get instanceof Lazy ? module._get : ms.lazy(function () {
				return module;
			});
		},

		getModule: function (module) {
			if (module === undefined) throw new Error("Module undefined.");
			return module._get instanceof Lazy ? module._get.get() : module;
		},

		getDefaultExport: function (module) {
			if (module === undefined) throw new Error("Module undefined.");
			const mod = ms.getModule(module);
			return mod.default === undefined ? mod : mod.default;
		},

		lazyProp: function (lazyObject, key) {
			if (!(lazyObject instanceof Lazy)) throw new Error("Expected a Lazy, got: " + lazyObject);
			return ms.lazy(function () {
				return lazyObject.get()[key];
			});
		},

		get: function (object, key) {
			const _ = object[key];
			if (_ === undefined) throw new Error("Module " + object.displayName + " does not have " + key);
			return _;
		},

		bool: function (b) {
			if (typeof b !== "boolean") throw new Error("Expected Bool, got " + b);
			return b;
		},

		// Used for splat calls.
		// TODO:ES6 Shouldn't need fun(...arg) should work for any iterable.
		arr: function (a) {
			if (a instanceof Array) return a;
			const out = [];
			for (let em of ms.iterator(a)) out.push(em);
			return out;
		},

		// For use by Obj-Type.ms generated code.
		checkNoExtras: function (_this, _, rtName) {
			// If there was some key in `_` that we didn't copy:
			if (Object.keys(_).length > Object.keys(_this).length) Object.getOwnPropertyNames(_).forEach(function (name) {
				if (name !== "displayName") if (!Object.prototype.hasOwnProperty.call(_this, name)) throw new Error("Extra prop " + name + " for " + rtName);
			});
		},

		lazy: function (_) {
			return new Lazy(_);
		},
		unlazy: function (_) {
			return _ instanceof Lazy ? _.get() : _;
		},

		set: function (_, k0, v0, k1, v1, k2, v2, k3) {
			_[k0] = v0;
			if (k1 === undefined) return _;
			_[k1] = v1;
			if (k2 === undefined) return _;
			_[k2] = v2;
			if (k3 === undefined) return _;
			for (let i = 7; i < arguments.length; i = i + 2) _[arguments[i]] = arguments[i + 1];
			return _;
		},

		lset: function (_, k0, v0, k1, v1, k2, v2, k3) {
			setOrLazy(_, k0, v0);
			if (k1 === undefined) return _;
			setOrLazy(_, k1, v1);
			if (k2 === undefined) return _;
			setOrLazy(_, k2, v2);
			if (k3 === undefined) return _;
			for (let i = 7; i < arguments.length; i = i + 2) setOrLazy(_, arguments[i], arguments[i + 1]);
			return _;
		}
	};
	Object.keys(msDefs).forEach(function (key) {
		return msDef(key, msDefs[key]);
	});

	const setOrLazy = function (_, k, v) {
		if (v instanceof Lazy) Object.setProperty(_, k, { get: function () {
				return ms.unlazy(v);
			} });else pAdd(_, k, v);
	};

	function Lazy(get) {
		var _this = this;

		this.get = function () {
			_this.get = function () {
				throw new Error("Lazy value depends on itself. Thunk: " + get);
			};
			const _ = get();
			_this.get = function () {
				return _;
			};
			return _;
		};
	}

	// Overwritten by show.ms
	msDefTemp("show", function (_) {
		if (typeof _ !== "string" && typeof _ !== "number") throw new Error("Should only be using Strs or Nums here until this is defined for real in show.ms.");
		return _.toString();
	});

	// region Funs used by bootstrapping code
	exports.Fun = Function;
	exports.Obj = Object;
	exports.Str = String;
	exports["p+!"] = pAdd;

	// region Contains
	// Some Types want to implement contains? before it is officially defined.
	const containsImplSymbol = exports["contains?-impl-symbol"] = "impl-contains?";
	exports["impl-contains?!"] = function (type, impl) {
		Object.defineProperty(type.prototype, exports["contains?-impl-symbol"], {
			value: impl,
			enumerable: false
		});
	};

	// Overwritten by Type/index.ms to actually do type checking.
	msDefTemp("checkContains", function (type, val) {
		return val;
	});

	Object[containsImplSymbol] = function (ignore, _) {
		if (_ == null) return false;
		switch (typeof _) {
			case "boolean":
			case "undefined":
			case "number":
			case "string":
			case "symbol":
				return false;
			default:
				return true;
		}
	};

	// An object is a Function if its typeof is `function`.
	// This helps us catch any callabe Obj-Type.
	// TODO: Separate Fun from Callable
	// Since these are primitives, we can't use `instanceof`.
	[Function, Boolean, String, Symbol, Number].forEach(function (type) {
		const typeOf = type.name.toLowerCase();
		type[containsImplSymbol] = function (ignore, _) {
			return typeof _ === typeOf;
		};
	});
});
//# sourceMappingURL=../private/bootstrap.js.map