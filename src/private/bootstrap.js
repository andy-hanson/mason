if (typeof global === 'undefined')
	window.global = window

if (global.setImmediate === undefined)
	global.setImmediate = action => {
		setTimeout(action, 0)
	}

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
	msCall = function(name) {
		// TODO:ES6 Splat
		const args = Array.prototype.slice.call(arguments, 1)
		return ms[name](...args)
	}

pAdd(global, '_ms', ms)

const indent = str => str.replace(/\n/g, '\n\t')

const assertErrorMessage = (lead, args) => {
	const showArgs = args.map(_ms.inspect).join('\n')
	return `${lead}\n\t${indent(showArgs)}`
}

const msDefs = {
	// TODO: use +! method
	add(bag, value) {
		bag.push(value)
	},

	addMany(bag, values) {
		for (let value of values)
			ms.add(bag, value)
	},

	assert(fun) {
		// TODO:ES6 Splat
		const args = Array.prototype.slice.call(arguments, 1)
		if (!fun(...args))
			throw new Error(assertErrorMessage(`assert ${fun.name}`, args))
	},

	assertNot(fun) {
		// TODO:ES6 Splat
		const args = Array.prototype.slice.call(arguments, 1)
		if (fun(...args))
			throw new Error(assertErrorMessage(`forbid ${fun.name}`, args))
	},

	assertMember(obj, member) {
		// TODO:ES6 Splat
		const args = Array.prototype.slice.call(arguments, 2)
		if (!obj[member](...args))
			throw new Error(assertErrorMessage(`assert ${_ms.inspect(obj)}.${member}`, args))
	},

	assertNotMember(obj, member) {
		const args = Array.prototype.slice.call(arguments, 2)
		if (obj[member](...args))
			throw new Error(assertErrorMessage(`assert ${_ms.inspect(obj)}.${member}`, args))
	},

	// TODO:ES7 Just use native async functions
	async(generatorFunction) {
		const continuer = verb => arg => {
			let result
			try {
				result = generator[verb](arg)
			} catch (err) {
				return Promise.reject(err)
			}

			const value = result.value, done = result.done
			if (done)
				return value
			else
				return Promise.resolve(value).then(onFulfilled, onRejected)
		}
		const generator = generatorFunction()
		const onFulfilled = continuer('next')
		const onRejected = continuer('throw')
		return onFulfilled()
	},

	lazyGetModule(module) {
		if (module === undefined)
			throw new Error('Module undefined.')
		return module._get instanceof ms.Lazy ? module._get : ms.lazy(() => module)
	},

	$for(collection, generatorFunc) {
		const promises = []
		for (const elem of collection)
			promises.push(_ms.async(() => generatorFunc(elem)))
		return Promise.all(promises)
	},

	getModule(module) {
		//kill?
		if (module == null) return null
		//if (module === undefined)
		//	throw new Error('Module undefined.')
		return module._get instanceof ms.Lazy ? module._get.get() : module
	},

	getDefaultExport(module) {
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

	methodBound(object, name) {
		return object[name].bind(object)
	},

	methodUnbound(name) {
		// TODO:ES6 (object, ...args) => object[name](...args)
		return function(object) { return object[name](...Array.prototype.slice.call(arguments, 1)) }
	},

	setLazy(value, name, lazy) {
		Object.defineProperty(value, name, { get: lazy.get, enumerable: true })
	},

	symbol(value) {
		const symbol = value['impl-symbol']
		return symbol === undefined ? value : symbol
	},

	newProperty(object, name, value) {
		if (Object.prototype.hasOwnProperty.call(object, name))
			throw new Error(`Property ${name} already exists.`)
		object[name] = value
	}
}
for (const def in msDefs)
	msDef(def, msDefs[def])

// region Contains
// Some Types want to implement contains? before it is officially defined.
export const containsImplSymbol = Symbol('contains?')
export const implContains = (type, impl) =>
	pAdd(type.prototype, containsImplSymbol, impl)

// Overwritten by Type/index.ms to actually do type checking.
ms.checkContains = (_type, val) => val

// Since these are primitives, we can't use `instanceof`.
for (const type of [Boolean, String, Symbol, Number]) {
	// Generated code is faster than using a closure.
	const src = 'return typeof _ === "' + type.name.toLowerCase() + '"'
	pAdd(type, containsImplSymbol, Function('_', src))
}

// Functions are Objects, so we do this one differently.
// TODO: This treats Object.create(null) as an object. Do we want that?
pAdd(Object, containsImplSymbol, function(_) {
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

implContains(Function, function(_) {
	return _ instanceof this
})
