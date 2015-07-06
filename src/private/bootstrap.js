export const pAdd = (object, key, value) =>
	Object.defineProperty(object, key, {
		value,
		writable: false,
		enumerable: false,
		configurable: false
	})

// region Builtin Functions for use by the compiler
export const
	// This object contains functions called upon by compiled code.
	ms = { },
	msDef = (name, fun) =>
		pAdd(ms, name, fun),
	msCall = (name, ...args) =>
		ms[name](...args)

pAdd(global, '_ms', ms)

const msDefs = {
	// TODO: use +! method
	add(bag, value) {
		bag.push(value)
	},

	addMany(bag, values) {
		// TODO:ES6 Shouldn't need [Symbol.iterator]()
		for (let value of values[Symbol.iterator]())
			ms.add(bag, value)
	},

	// TODO: use assoc! method
	assoc(map, key, val) {
		map.set(key, val)
	},

	lazyGetModule(module) {
		if (module === undefined)
			throw new Error('Module undefined.')
		return module._get instanceof ms.Lazy ? module._get : ms.lazy(() => module)
	},

	getModule(module) {
		if (module === undefined)
			throw new Error('Module undefined.')
		return module._get instanceof ms.Lazy ? module._get.get() : module
	},

	getDefaultExport: module => {
		if (module === undefined)
			throw new Error('Module undefined.')
		const mod = ms.getModule(module)
		return mod.default === undefined ? mod : mod.default
	},

	lazyProp(lazyObject, key) {
		if (!(lazyObject instanceof ms.Lazy))
			throw new Error(`Expected a Lazy, got: ${lazyObject}`)
		return ms.lazy(() => lazyObject.get()[key])
	},

	get(object, key) {
		const _ = object[key]
		if (_ === undefined)
			throw new Error(`Module ${object.name} does not have ${key}`)
		return _
	},

	bool(b) {
		if (typeof b !== 'boolean')
			throw new Error(`Expected Boolean, got ${b}`)
		return b
	},

	// Used for splat calls.
	// TODO:ES6 Shouldn't need. `fun(...arg)` should work for any iterable.
	arr(_) {
		if (_ instanceof Array)
			return _
		const out = [ ]
		// TODO:ES6 Shouldn't need [Symbol.iterator]()
		for (let em of _[Symbol.iterator]())
			out.push(em)
		return out
	},

	error(err) {
		if (err instanceof Error)
			return err
		else if (typeof err === 'string')
			return new Error(err)
		else if (err instanceof _ms.Lazy)
			return _ms.error(err.get())
		else
			throw new Error('Thrown value must be Error or String')
	},

	// For use by Obj-Type.ms generated code.
	checkNoExtras(_this, _, rtName) {
		// If there was some key in `_` that we didn't copy:
		if (Object.keys(_).length > Object.keys(_this).length)
			Object.getOwnPropertyNames(_).forEach(function(name) {
				// TODO:DISPLAYNAME
				if (name !== 'name')
					if (!Object.prototype.hasOwnProperty.call(_this, name))
						throw new Error('Extra prop ' + name + ' for ' + rtName)
			})
	},

	Lazy: function Lazy(get) {
		this.get = () => {
			this.get = () => {
				throw new Error(`Lazy value depends on itself. Thunk: ${get}`)
			}
			const _ = get()
			this.get = () => _
			return _
		}
	},
	lazy: _ => new ms.Lazy(_),
	unlazy: _ => _ instanceof ms.Lazy ? _.get() : _,

	// Unlike Object.assign, does *not* invoke getters.
	set(value, propertiesObject, opName) {
		Object.keys(propertiesObject).forEach(key =>
			Object.defineProperty(value, key,
				Object.getOwnPropertyDescriptor(propertiesObject, key)))
		if (!(value instanceof Function))
			if (opName !== undefined)
				ms.setName(value, opName)
		return value
	},
	setName(value, name) {
		value.name = name
		return value
	},
	setLazy(value, name, lazy) {
		Object.defineProperty(value, name, { get: lazy.get, enumerable: true })
	}
}
Object.keys(msDefs).forEach(_ => msDef(_, msDefs[_]))

const msDefTemp = (name, fun) =>
	ms[name] = fun

// Overridden by show.ms.
msDefTemp('show', _ => {
	if (typeof _ !== 'string' && typeof _ !== 'number')
		throw new Error(
			`Only use Strings or Numbers here until this is overridden by show.ms. Got:\n${_}`)
	return _.toString()
})

// region Contains
// Some Types want to implement contains? before it is officially defined.
export const containsImplSymbol = 'impl-contains?'
export const implContains = (type, impl) =>
	pAdd(type.prototype, containsImplSymbol, impl)

// Overwritten by Type/index.ms to actually do type checking.
msDefTemp('checkContains', (_type, val) => val)

// An object is a Function if its typeof is `function`.
// This helps us catch any callabe Obj-Type.
// TODO: Separate Function from Callable
// Since these are primitives, we can't use `instanceof`.
; [ Function, Boolean, String, Symbol, Number ].forEach(type => {
	// Generated code is faster than using a closure.
	const src = 'return typeof _ === "' + type.name.toLowerCase() + '"'
	pAdd(type, containsImplSymbol, Function('ignore', '_', src))
})

// Functions are Objects, so we do this one differently.
// TODO: This treats Object.create(null) as an object. Do we want that?
pAdd(Object, containsImplSymbol, function(_ignore, _) {
	if (_ === null)
		return false
	switch (typeof _) {
		case 'function':
		case 'object':
			return true
		default:
			return false
	}
})
