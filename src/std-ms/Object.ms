doc. "TODO"

use
	.arithmetic-methods -> +
	.assert -> ! !not
	.bags.? -> ?none ?some Opt->?
	.bags.Array
	.bags.Bag -> each! empty? seq=?
	.bags.Stream -> ->Stream
	.Bool -> and false not nor true xor
	.Comparable -> =?
	.control -> if
	.Dict
	.Error -> fails?
	.js -> global identical? js-typeof
	.maps.Map -> keys
	.pred-types -> Any Union
	.Symbol
	.types.Type -> subsumes?

Str/Sym ~= Union[Str Symbol]

Object = global.Object
Str = global.String \ Can't have dependency on Str.ms

get = |object name
	`object[name]`
set = |object name value
	`object[name] = value`

send.
	doc. "Calls `a`'s js-method `name` with the given arguments."
	test. |
		[ 1 "toFixed" 2 ] -> "1.00"
	|a:Any name:Str/Sym \ TODO:ES6 ...args
		(get a name).apply a (Array.prototype.slice.call `arguments` 2)

send!. send

\ TODO: Convert to iterator
own-properties.
	doc. "
		Every property name directly stored in an object.
		Includes non-enumerable properties and symbols.

	test. |
		obj = `{}`
		add-property! obj "a" 0
		sym = Symbol "s"
		Object.defineProperty obj sym
			value. 0
			enumerable. false
		! seq=? (own-properties obj) [ "a" sym ]
	|:Bag[Str/Sym] _:Object
		+ (->Stream (Object.getOwnPropertyNames _)) (Object.getOwnPropertySymbols _)

own-enumerable-properties.
	doc. "Like own-properties, but excludes non-enumerable properties and symbols."
	test. |
		obj = `{}` \ TODO: new Object
		Object.defineProperty obj "a"
			value. 0
			enumerable. false
		sym = Symbol "s"
		Object.defineProperty obj sym
			value. 0
			enumerable. true
		! empty? (own-enumerable-properties obj)
	|:Bag[Str] _:Object
		Object.keys _

?get-property.
	doc. "TODO"
	test. |
		x =
			a. 1
			b.
		[ x "a" ] -> ?some 1
		[ x "b" ] -> ?none
		\ Does not inherit from prototype.
		[ x "toString" ] -> ?none
	|_:Object name:Str/Sym
		case
			has-property? _ name
				Opt->? (get _ name)
			else
				?none

?get-property-or-in-prototype.
	doc. "TODO"
	test. |
		\ TODO: empty Dict
		x = Dict.empty
		[ x "toString" ] -> ?some Object.prototype.toString
		[ x "asdfghjkl" ] -> ?none
	|object:Object name:Str/Sym
		Opt->? (get object name)

add-property!.
	doc. "TODO"
	test. |
		x = Object.create ()
		add-property! x "a" 1
		! =? x.a 1
		! fails? |
			add-property! x "a" 2
		! fails? |
			add-property! "string" "a" 1
	|object:Object name:Str/Sym val
		Object.defineProperty object name
			enumerable. true
			value. val

has-property?.
	doc. "TODO"
	test. |
		x =
			a. 1
		! has-property? x "a"
		!not has-property? x "b"
		!not has-property? x "toString" \ use has-property-or-in-prototype? for that.
	|object:Object name:Str/Sym
		Object.prototype.hasOwnProperty.call object name

has-property-or-in-prototype?.
	doc. "TODO"
	test. |
		! has-property-or-in-prototype? Dict.empty "toString"
	|object:Object name:Str/Sym
		not (identical? (get object name) `undefined`)

extend!.
	doc. "TODO"
	test. |
		x = |
			0
		extend! x
			a. 1
		! =? x.a 1
	|object:Object extender:Dict
		each! (keys extender) |name
			add-property! object name extender[name]

change-property!.
	doc. "TODO"
	test. |
		"TODO: Mutable add-property so I can test this."
	|object:Object name:Str/Sym new-val:Any
		in
			has-property? object name

		set object name new-val

inspect=?.
	doc. "TODO"
	test. |
		a =
			a. 1
		b =
			a. 1
		[ a b ] -> true
		[ 1 1 ] -> true
		\ For functions, is identity
		[ inspect=? inspect=? ] -> true
	|:Bool a b
		any-a = subsumes? Any a
		any-b = subsumes? Any b
		case
			nor any-a any-b
				true
			xor any-a any-b
				false
			else
				obj-a = identical? (js-typeof a) "object"
				obj-b = identical? (js-typeof b) "object"
				case
					nor obj-a obj-b
						identical? a b
					xor obj-a obj-b
						false
					else
						same-type = identical? (Object.getPrototypeOf a) (Object.getPrototypeOf b)
						same-members ~=
							ak = Object.getOwnPropertyNames a
							bk = Object.getOwnPropertyNames b
							case
								\ TODO: For non-extensible Record-Types we can skip this check
								=? ak bk
									eq = =? \ Pronounced "equals equals equals"
									`for (let i = 0; i < ak.length; i++) { const key = ak[i]; if (!eq(a[ak], b[ak])) return false }`
									true
								else
									false
						and same-type ~same-members

Object
