use
	.Bool -> false
	.Comparable -> =?
	.js -> js-delete js-set
	.methods -> empty
	.Object -> p?
	.pred-types -> Any Union
	.Str
	.Symbol
	.types.Method -> impl!
	.types.util -> self-type
use~
	.! -> !not
	.Try -> fails?

Object! =
	doc. "TODO"

\ TODO: Duplicate definition in Object.ms
~Object-Key = Union[Str Symbol]

impl! empty (self-type Object!) |
	Object.create Object.prototype

p+!.
	doc. "Adds a new immutable property to a mutable object."
	test. |
		x = empty Object!
		p+! x "a" 1
		! =? x.a 1
		! fails? |
			p+! x "a" 2
		! fails? |
			p+! "string" "a" 1
	|object:Object name:Object-Key val
		Object.defineProperty object name
			enumerable.
			writable. false
			value. val
		()

p+mut!.
	doc. "Adds a new mutable property to a mutable object."
	test. "See `p!`"
	|object:Object name:Object-Key val:Any
		Object.defineProperty object name
			enumerable.
			writable.
			value. val
			configurable.
		()

p!.
	doc. "Modifies an already-existing property."
	test. |
		x = empty Object!
		p+mut! x "a" 1
		p! x "a" 2
		! =? x.a 2
	|object:Object name:Object-Key new-val
		in
			p? object name

		js-set object name new-val

p-!.
	test. |
		a = empty Object!
		p+mut! a "a" 1
		p-! a "a"
		!not p? a "a"
	|object:Object name:Object-Key
		in
			! p? object name
		js-delete object name

\ TODO: Don't bother, just `spread p+!`
extend!.
	doc. "Adds all the properties in `extender` to `object`."
	test. |
		x = empty Object!
		extend! x
			a. 1
		! =? x.a 1
	|object:Object extender:Object
		Object.assign object extender

Object!
