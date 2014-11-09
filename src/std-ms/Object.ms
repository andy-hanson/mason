doc. "TODO"

use
	.? -> ?none ?some
	.arithmetic-methods -> +
	.Array
	.assert -> ! != !fails
	.Bag -> each!
	.Bool -> if not true
	.Dict
	.js -> global identical?
	.pred-types -> Any Union
	.Symbol

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
		!= "1.00" (send 1 "toFixed" 2)
	|a:Any name:Str/Sym \ TODO:ES6 ...args
		(get a name).apply a (Array.prototype.slice.call `arguments` 2)

send!. send

\ TODO: Convert to iterator
own-properties.
	doc. "TODO"
	test. |
		"TODO"
	|_:Object
		+ (Object.getOwnPropertyNames _) (Object.getOwnPropertySymbols _)

own-property-names.
	doc. "TODO"
	test. |
		x =
			a. 1
			b. 2
		!= (own-property-names x) (Array "a" "b" "displayName")
	|object:Object
		Object.getOwnPropertyNames object

get-property.
	doc. "TODO"
	test. |
		x =
			a. 1
		!= (get-property x "a") 1
		!fails |
			get-property x "b"

	|_:Object name:Str/Sym
		in
			! (has-property? _ name) ~"{_} has no property {name}"

		(get _ name)

?get-property.
	doc. "TODO"
	test. |
		x =
			a. 1
		!= (?get-property x "a") (?some 1)
		!= (?get-property x "b") ?none
	|_:Object name:Str/Sym
		if (has-property? _ name) |
			get-property _ name

get-property-or-in-prototype.
	doc. "TODO"
	test. |
		x = Dict.empty
		!= (get-property-or-in-prototype x "toString") Object.prototype.toString
		!fails |
			get-property-or-in-prototype x "All toasters toast toast!"

	|object:Object name:Str/Sym
		in
			! (has-property-or-in-prototype? object name)

		get object name

add-property!.
	doc. "TODO"
	test. |
		x = Object.create ()
		add-property! x "a" 1
		!= x.a 1
		!fails |
			add-property! x "a" 2
		\ Use `add-property-to-anY!
		!fails |
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
		! (has-property? x "a")
		! (not (has-property? x "b"))
		! (not (has-property? x "toString")) \ use has-property-or-in-prototype? for that.
	|object:Object name:Str/Sym
		Object.prototype.hasOwnProperty.call object name

has-property-or-in-prototype?.
	doc. "TODO"
	test. |
		! (has-property-or-in-prototype? Dict.empty "toString")
	|object:Object name:Str/Sym
		not (identical? (get object name) `undefined`)

extend!.
	doc. "TODO"
	test. |
		x = |
			0
		extend! x
			a. 1
		!= x.a 1
	|object:Object extender:Dict
		each! (own-property-names extender) |name
			add-property! object name (get-property extender name)

change-property!.
	doc. "TODO"
	test. |
		"TODO: Mutable add-property so I can test this."
	|object:Object name:Str/Sym new-val
		in
			has-property? object name

		set object name new-val

Object
