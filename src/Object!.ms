use
	.assert -> ! !not
	.bags.Bag -> each!
	.Bool -> false
	.Comparable -> =?
	.Dict
	.js -> js-delete js-set
	.maps.Map -> keys
	.methods -> empty
	.Object -> has-property?
	.pred-types -> Any Union
	.Str
	.Symbol
	.Try -> fails?
	.types.Method -> impl!
	.types.util -> self-type

Object! =
	doc. "TODO"

\ TODO: Duplicate definition in Object.ms
~Object-Key = Union[Str Symbol]

impl! empty (self-type Object!) |
	Object.create Object.prototype

add-property!.
	doc. "Adds a new immutable property to a mutable object."
	test. |
		x = empty Object!
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
			configurable.

change-property!.
	doc. "Modifies an already-existing property."
	test. |
		x = empty Object!
		add-mutable-property! x "a" 1
		change-property! x "a" 2
		! =? x.a 2
	|object:Object name:Object-Key new-val
		in
			has-property? object name

		js-set object name new-val

delete-property!.
	test. |
		a = empty Object!
		add-mutable-property! a "a" 1
		delete-property! a "a"
		!not has-property? a "a"
	|object:Object name:Object-Key
		in
			! has-property? object name
		js-delete object name

\ TODO: Don't bother, just `spread add-property!`
extend!.
	doc. "Adds all the properties in `extender` to `object`."
	test. |
		x = empty Object!
		extend! x
			a. 1
		! =? x.a 1
	|object:Object extender:Dict
		each! (keys extender) |name
			add-property! object name extender[name]

Object!
