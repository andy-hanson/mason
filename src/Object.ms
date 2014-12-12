use
	.assert -> ! !not
	.bags.? -> Opt->?
	.bags.Bag -> all? count keep
	.bags.Identity-Set!
	.bags.Seq -> seq=?
	.bags.Stream
	.Bool -> and false not nor true xor
	.Comparable -> =?
	.Dict
	.js -> global js-typeof reference=? js-sub
	.methods -> => + empty empty?
	.Object! -> add-property!
	.pred-types -> Any Union
	.Symbol
	.Try -> fails?
	.types.Method -> impl!
	.types.Type -> contains?
	.types.util -> self-type

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
	|a:Any name:Object-Key ...args
		(js-sub a name).apply a args

send!. send

\ TODO: Use a Mason set
~forbidden-fun-props = => Identity-Set! [ "arguments" "caller" ]
own-properties.
	doc. "
		Every property name directly stored in an object.
		Includes non-enumerable properties and symbols.

	test. |
		obj = empty Object!
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
		obj = empty Object!
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
		\ TODO
		\ [ x "b" ] -> ()
		! fails? |
			get-property x "c"
	|_:Object name:Object-Key
		in
			! has-property? _ name
			\ TODO: decide
			\ ! (contains? Any (js-sub _ name)) ~"{_}.{name} is missing"
		js-sub _ name

?get-property-or-in-prototype.
	doc. "Like `get-property`, but also looks through the prototype chain."
	test. |
		x = empty Dict
		[ x "toString" ] -> => ? [ Object.prototype.toString ]
		[ x "asdfghjkl" ] -> empty ?
	|object:Object name:Object-Key
		Opt->? (js-sub object name)

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
		! has-property-or-in-prototype? (empty Object) "toString"
	|object:Object name:Object-Key
		not (reference=? (js-sub object name) undefined)

inspect=?.
	doc. "
		For Objects, whether they are of the same type and have `=?` members.
		For primitives, whether they are `=?`.
	test. |
		a =
			a. 1
		b =
			\ TODO:DISPLAYNAME
			displayName. "a"
			a. 1
		c =
			x. 3
		[ a b ] -> true
		[ a c ] -> false
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
						and same-type ~
							ak = Object.getOwnPropertyNames a
							bk = Object.getOwnPropertyNames b
							and (=? (count ak) (count bk)) ~
								all? ak |k
									=? (js-sub a k) (js-sub b k)

frozen?. |_
	Object.isFrozen _

\ TODO: Move elsewhere in this file
\ TODO: Test these
impl! empty (self-type Object) |
	Object.freeze (Object.create Object.prototype)
\ TODO: Shouldn't do this because everything is an Object... `empty-Object?` ?
\impl! empty? Object |_
\	empty? own-properties _
\impl! empty! Object |_
\	each! own-properties_ |prop
\		delete! _ prop

Object
