doc. "TODO"

\ TODO: Can this whole file be written as a block following `ms = `?
\ TODO: document as necessary (especially Dict!)

ms = `{}`
global = `global`
global.Object.defineProperty global "_ms" `{ value: ms }`

Fun = global.Function

\ TODO: Use JS literal so we don't get <anonymous> stacktrace
make-stuff = Fun "" "
	"use strict"
	function assignMany(target, keysVals) \{
		const nkv = keysVals.length
		let i = 0
		while (i < nkv) \{
			const key = keysVals[i++], val = keysVals[i++]
			Object.defineProperty(target, key, (val instanceof Lazy) ?
				\{ get: val.get, enumerable: true } :
				\{ value: val, enumerable: true })
		}
	}
	function Lazy(make) \{
		const baby = Object.create(Lazy.prototype)
		let cached = undefined
		Object.defineProperty(baby, "get", \{ value: function() \{
			if (cached === undefined) \{
				cached = make()
				if (cached === undefined)
					throw new Error("Lazy value can't be undefined. Made by:\\n" + make)
			}
			return cached
		}})
		return baby
	}
	return \{ "assign-many": assignMany, Lazy: Lazy }

assign-many Lazy = make-stuff ()

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
	set! ms "symStr" (global.Symbol "str")
	set! ms "symSub" (global.Symbol "sub")
	set! ms "symSubsumes" (global.Symbol "subsumes?")
	set! ms "symCheckSubsumes" (global.Symbol "!subsumes")

region Block Creators
	set! ms "mkArray" |
		as-Array = global.Array.apply () `arguments`
		global.Object.freeze as-Array

	Dict = |
		baby = global.Object.create Dict.prototype
		assign-many baby `arguments`\(global.Array.prototype.slice.call `arguments`)
		global.Object.freeze baby

	set! ms "Dict" Dict
	set! ms "dictify" dictify

region MS Methods
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

	set-temporary! ms "str" |x
		`if (x === undefined) return "undefined"` \ TODO: Remove
		`if (x === null) return "null"` \ TODO: Remove
		`(x.toString == null) ? "<wierd thing with bad toString>" : x.toString()`

	set! ms "mkStr" |
		s ::= ""
		i ::= 0
		args = `arguments`
		len = args.length
		loop!
			case! i
				`_ === len`
					end-loop!
				else
					arg = `args[i]`
					str = ms.str arg
					s := `s + str`
					i := `i + 1`
		s

ms