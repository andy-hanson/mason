use
	.arithmetic-methods -> +
	.assert -> ! !not
	.bags.? -> Opt->?
	.bags.Array
	.bags.Bag -> each! empty? keep
	.bags.Bag-Type -> empty
	.bags.Seq -> seq=?
	.bags.Stream
	.basic-methods -> =>
	.Bool -> and false not nor true xor
	.Comparable -> =?
	.Dict
	.Fun -> ignore
	.js -> global js-typeof reference=? js-sub js-set
	.maps.Map -> keys
	.pred-types -> Any Union
	.Symbol
	.Try -> fails?
	.types.Type -> contains?

Object =
	doc. "
		Contains anything that can store keys.
		Everything shares Object.prototype.
	global.Object

Str = global.String \ Can't have dependency on Str.ms
~Object-Key = Union[Str Symbol]

send.
	doc. "Calls `a`'s js-method `name` with the given arguments."
	test. |
		[ 1 "toFixed" 2 ] -> "1.00"
	|a:Any name:Object-Key \ TODO:ES6 ...args
		(js-sub a name).apply a (Array.prototype.slice.call `arguments` 2)

send!. send

\ TODO: Use a Mason set
forbidden-fun-props = `new global.Set([ "arguments", "caller" ])`
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
	|:Bag[Object-Key] _:Object
		\ TODO: Only forbidden if is a Fun
		own-names = keep (=> Stream (Object.getOwnPropertyNames _)) |name
			not (forbidden-fun-props.has name)
		+ own-names (Object.getOwnPropertySymbols _)

own-enumerable-properties.
	doc. "
		Like own-properties, but excludes non-enumerable properties and symbols.
		?get-property can still be empty if the property is null/undefined.
	test. |
		obj = `{}` \ TODO: empty Object
		Object.defineProperty obj "a"
			value. 0
			enumerable. false
		sym = Symbol "s"
		Object.defineProperty obj sym
			value. 0
			enumerable.
		! empty? (own-enumerable-properties obj)
	|:Bag[Str] object:Object
		Object.keys object

?get-property.
	doc. "`?` containing the value of the property, if it exists."
	test. |
		x =
			a. 1
			b. ()
		[ x "a" ] -> => ? [ 1 ]
		[ x "b" ] -> empty ?
		\ Does not inherit from prototype.
		[ x "toString" ] -> empty ?
	|_:Object name:Object-Key
		case
			has-property? _ name
				\ Could still be null/undefined.
				Opt->? (js-sub _ name)
			else
				empty ?

get-property.
	doc. "TODO"
	test. |
		x =
			a. 1
			b. ()
		[ x "a" ] -> 1
		\ [ x "b" ] -> ()
		! fails? |
			get-property x "c"
	|_:Object name:Object-Key
		in
			! has-property? _ name
			! (contains? Any (js-sub _ name)) ~"{_}.{name} is missing"
		js-sub _ name

?get-property-or-in-prototype.
	doc. "Like `get-property`, but also looks through the prototype chain."
	test. |
		\ TODO: empty Dict
		x = Dict.empty
		[ x "toString" ] -> => ? [ Object.prototype.toString ]
		[ x "asdfghjkl" ] -> empty ?
	|object:Object name:Object-Key
		Opt->? (js-sub object name)

add-property!.
	doc. "Adds a new immutable property to a mutable object."
	test. |
		x = `{}` \ TODO: empty Object
		add-property! x "a" 1
		! =? x.a 1
		! fails? |
			add-property! x "a" 2
		! fails? |
			add-property! "string" "a" 1
	|object:Object name:Object-Key val
		Object.defineProperty object name
			enumerable.
			writable. false
			value. val

add-mutable-property!.
	doc. "Adds a new mutable property to a mutable object."
	test. "See `change-property!`"
	|object:Object name:Object-Key val:Any
		Object.defineProperty object name
			enumerable.
			writable.
			value. val

change-property!.
	doc. "Modifies an already-existing property."
	test. |
		x = `{}` \ TODO: empty Object
		add-mutable-property! x "a" 1
		change-property! x "a" 2
		! =? x.a 2
	|object:Object name:Object-Key new-val
		in
			has-property? object name

		js-set object name new-val

has-property?.
	doc. "
		Whether there is a property by that name.
		It may be null/undefined.
	test. |
		x =
			a. 1
		! has-property? x "a"
		!not has-property? x "b"
		!not has-property? x "toString" \ use has-property-or-in-prototype? for that.
	|object:Object name:Object-Key
		Object.prototype.hasOwnProperty.call object name

has-property-or-in-prototype?.
	doc. "Like `has-property?` but looks through the prototype."
	test. |
		\ TODO: empty Object
		! has-property-or-in-prototype? `{}` "toString"
	|object:Object name:Object-Key
		not (reference=? (js-sub object name) `undefined`)

extend!.
	doc. "Adds all the properties in `extender` to `object`."
	test. |
		x = `{}` \ TODO: empty Object
		extend! x
			a. 1
		! =? x.a 1
	|object:Object extender:Dict
		each! (keys extender) |name
			add-property! object name extender[name]

inspect=?.
	doc. "
		For Objects, whether they are of the same type and have `=?` members.
		For primitives, whether they are `=?`.
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
		any-a = contains? Any a
		any-b = contains? Any b
		case
			nor any-a any-b
				true
			xor any-a any-b
				false
			else
				\ Not :Object because that currently also includes Funs
				obj-a = reference=? (js-typeof a) "object"
				obj-b = reference=? (js-typeof b) "object"
				case
					nor obj-a obj-b
						reference=? a b
					xor obj-a obj-b
						false
					else
						same-type = reference=? (Object.getPrototypeOf a) (Object.getPrototypeOf b)
						~same-members =
							ak = Object.getOwnPropertyNames a
							bk = Object.getOwnPropertyNames b
							case
								\ TODO: For non-extensible Record-Types we can skip this check
								=? ak bk
									eq = =?
									ignore eq \ TODO:Ignored vars
									`for (let i = 0; i < ak.length; i++) { const key = ak[i]; if (!eq(a[ak], b[ak])) return false }`
									true
								else
									false
						and same-type ~same-members

frozen?. |_
	Object.isFrozen _

Object
