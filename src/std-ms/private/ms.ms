doc. "TODO"

\ TODO: Can this whole file be written as a block following `ms = `?
\ TODO: document as necessary (especially Dict!)

ms = `{}`
global = `global`
global.Object.defineProperty global "_ms" `{ value: ms }`

Fun = global.Function


assign-many = `function(target, kvs) { const nkv = kvs.length; let i = 0; while (i < nkv) { const k = kvs[i++], v = kvs[i++]; Object.defineProperty(target, k, (v instanceof Lazy) ? { get: v.get, enumerable: true } : { value: v, enumerable: true }) } }`
Lazy = `function(make) { const baby = Object.create(Lazy.prototype); let cached; Object.defineProperty(baby, "get", { value: function() { if (cached == undefined) { cached = make(); if (cached === undefined) throw new Error("Lazy value can't be undefined. Made by:\n" + make) } return cached }}); return baby }`
am = assign-many
dictify = `function(target) { am(Object(target), global.Array.prototype.slice.call(arguments, 1)); return target }`
global.Object.defineProperty ms "dictify" `{ value: dictify, enumerable: true }`

\ Now it's safe to use dictify - any named function requires this

region Helpers
	set! = |x y z
		global.Object.defineProperty x y `{ value: z, enumerable: true }`

	set-temporary! = |x y z
		global.Object.defineProperty x y `{ value: z, enumerable: true, writable: true }`

region More Lazy
	set! ms "Lazy" Lazy

	set! ms "unlazy" |a
		`(a instanceof Lazy) ? a.get() : a`


region Symbols
	set! ms "symSub" (global.Symbol "sub")
	set! ms "symSubsumes" (global.Symbol "subsumes?")
	set! ms "symCheckSubsumes" (global.Symbol "!subsumes")

region Block Creators
	set! ms "mkArray" |
		global.Object.freeze (global.Array.prototype.slice.call `arguments`)

	Dict = |
		baby = global.Object.create Dict.prototype
		assign-many baby `arguments`
		global.Object.freeze baby

	set! ms "Dict" Dict
	set! ms "dictify" dictify

region MS Methods
	\ TODO: maybe move to Type bootstrap
	set! ms "subsumes" |type value
		`if (type == null) throw new Error("Type does not exist")`
		test = `type[ms.symSubsumes]`
		`if (test==null) throw new Error(ms.str(type) + " does not implement 'subsumes?'");`
		`test(type, value)`

	set! ms "checkSubsumes" |type value name
		`if (type == null) throw new Error("Type is null")`
		test = `type[ms.symCheckSubsumes]`
		`if (test == null) throw new Error(ms.str(type) + " does not implement '!subsumes'")`
		`test(type, value, name)`

	\ TODO: Maybe define this later.
	set! ms "sub" |subbed \...args
		`if (subbed == null) throw new Error("Tried to sub nothing")`
		sub = `subbed[ms.symSub]`
		`if (sub == null) throw new Error(ms.str(subbed) + " does not implement 'sub'")`
		`sub.apply(null, arguments)`

	set! global.Array.prototype ms.symSub `function(arr, key) { return arr[key]; }`

	set! ms "KLUDGE_defaultExport" |module default
		`if (_default == null) return`
		td = `typeof` default
		`if (td !== "object" && td !== "function") throw new Error("Non-object default export not supported")`
		exports = module.exports
		set! module "exports" default
		(global.Object.getOwnPropertyNames exports).forEach |name
			set! default name `exports[name]`

	set-temporary! ms "show" |x
		`if (typeof x !== "string") throw new Error("Should only be using Strs here before show is defined in show.ms")`
		x

	set! ms "mkStr" |
		args = global.Array.prototype.slice.call `arguments`
		strs = args.map ms.show
		strs.join ""

ms
