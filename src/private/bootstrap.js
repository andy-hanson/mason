import 'es6-shim'
import assert from 'assert'

const pAdd = (object, key, value) =>
	Object.defineProperty(object, key, {
		value,
		enumerable: true,
		// TODO:ES6 `writable` shouldn't need to be explicit
		writable: false
	})

// region Builtin Funs for use by the compiler
// This object contains functions called upon by compiled code.
const ms = exports.ms = {}
pAdd(global, '_ms', ms)

const msDef = exports.msDef = (name, fun) =>
	pAdd(ms, name, fun)
const msDefTemp = (name, fun) =>
	ms[name] = fun
exports.msCall = (name, ...args) =>
	ms[name](...args)

msDef('lazyGetModule', module => {
	if (module === undefined)
		throw new Error('Module undefined.')
	return module._get instanceof Lazy ? module._get : ms.lazy(() => module)
})

msDef('getModule', module => {
	if (module === undefined)
		throw new Error('Module undefined.')
	return module._get instanceof Lazy ? ms.unlazy(module._get) : module
})

msDef('lazyProp', (lazyObject, key) => {
	assert(lazyObject instanceof Lazy)
	return ms.lazy(() => lazyObject.get()[key])
})

// TODO: Shouldn't need if we statically check.
msDef('get', (object, key) => {
	const _ = object[key]
	if (_ === undefined)
		throw new Error('Module ' + object.displayName + ' does not have ' + key)
	return _
})

msDef('bool', b => {
	if (typeof b !== 'boolean')
		throw new Error(`Expected Bool, got ${b}`)
	return b
})

// TODO:ES6 fun(...arg) should do this for me.
msDef('arr', a => {
	if (a instanceof Array)
		return a
	const out = []
	// ms.iterator created by @/index.ms
	const iter = ms.iterator(a)
	while (true) {
		const _ = iter.next()
		if (_.done)
			break
		else
			out.push(_.value)
	}
	return out
})

// For use by Obj-Type.ms
msDef('checkNoExtras', (_this, _, rtName) => {
	// If there was some key in `_` that we didn't copy:
	if (Object.keys(_).length > Object.keys(_this).length)
		Object.getOwnPropertyNames(_).forEach(function(name) {
			if (name !== 'displayName')
				if (!Object.prototype.hasOwnProperty.call(_this, name))
					throw new Error('Extra prop ' + name + ' for ' + rtName)
		})
})

function Lazy(make) {
	this.get = function() {
		const _ = make()
		this.get = function() { return _ }
		return _
	}
}
msDef('lazy', _ => new Lazy(_))
msDef('unlazy', _ => _ instanceof Lazy ? _.get() : _)

msDef('set', (_, k0, v0, k1, v1, k2, v2, k3) => {
	_[k0] = v0
	if (k1 === undefined)
		return _
	_[k1] = v1
	if (k2 === undefined)
		return _
	_[k2] = v2
	assert(k3 === undefined)
	return _
})

const setOrLazy = function(_, k, v) {
	if (v instanceof Lazy)
		Object.setProperty(_, k, { get: function() { return ms.unlazy(v) } })
	else
		pAdd(_, k, v)
}

msDef('lset', (_, k0, v0, k1, v1, k2, v2, k3) => {
	setOrLazy(_, k0, v0)
	if (k1 === undefined)
		return _
	setOrLazy(_, k1, v1)
	if (k2 === undefined)
		return _
	setOrLazy(_, k2, v2)
	assert(k3 === undefined)
	return _
})

// Overwritten by show.ms
msDefTemp('show', _ => {
	if (typeof _ !== 'string' && typeof _ !== 'number')
		throw new Error(
			'Should only be using Strs or Nums here until this is defined for real in show.ms.')
	return _.toString()
})

// region Funs used by bootstrapping code
exports.Fun = Function
exports.Obj = Object
exports.Str = String
exports['p+!'] = pAdd


// region Contains
// Some Types want to implement contains? before it is officially defined.
const containsImplSymbol = exports['contains?-impl-symbol'] = 'impl-contains?'
exports['impl-contains?!'] = function(type, impl) {
	Object.defineProperty(type.prototype, exports['contains?-impl-symbol'], {
		value: impl,
		enumerable: false
	})
};
// Overwritten by Type/index.ms to actually do type checking.
msDefTemp('checkContains', (type, val) => val)

Object[containsImplSymbol] = function(ignore, _) {
	if (_ == null)
		return false
	switch (typeof _) {
		case 'boolean':
		case 'undefined':
		case 'number':
		case 'string':
		case 'symbol':
			return false
		default:
			return true
	}
};

// An object is a Function if its typeof is `function`.
// This helps us catch any callabe Obj-Type.
// TODO: Separate Fun from Callable
// Since these are primitives, we can't use `instanceof`.
[ Function, Boolean, String, Symbol, Number ].forEach(function(type) {
	const typeOf = type.name.toLowerCase()
	type[containsImplSymbol] = function(ignore, _) {
		return typeof _ === typeOf
	}
})
