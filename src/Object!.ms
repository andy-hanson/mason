use
	.js js-delete js-set
	.Object Object-Key
	.Type.Alias-Type
	.Type.Pred-Type Opt
use~
	.control opr
use-debug
	.! _ !not
	.compare =?
	.Object empty-Object? p? prototype
	.Try fails?

doc. "For mutating Objects."

Object! = Alias-Type
	doc. "Object which is at least partially mutable."
	alias-of. Object

empty-Object!.
	doc. "Creates a new Object! with no properties and the given prototype."
	test. |
		_ = empty-Object!()
		! empty-Object? _
		child = empty-Object! _
		! =? _ (prototype child
	|?prototype:Opt[Object]
		prototype = opr ?prototype Object.prototype
		Object.create prototype

p+!.
	doc. "Adds a new immutable property."
	test. |
		_ = empty-Object!()
		p+! _ "a" 1
		! =? _.a 1
		! fails? |
			p+! _ "a" 2
		! fails? |
			p+! "string" "a" 1
	|_:Object! name:Object-Key val
		Object.defineProperty _ name
			enumerable. true
			writable. false # TODO:ES6 Shouldn't need to be explicit
			value. val
		pass

p+mut!.
	doc. "Adds a new mutable property."
	test. "See `p!`"
	|_:Object! name:Object-Key val
		Object.defineProperty _ name
			enumerable. true
			writable. true
			value. val
			configurable. true
		pass

p!.
	doc. "Modifies an already-existing property."
	test. |
		_ = empty-Object!()
		p+mut! _ "a" 1
		p! _ "a" 2
		! =? _.a 2
	|_:Object! name:Object-Key new-val
		in
			! p? _ name

		js-set _ name new-val

p-!.
	test. |
		_ = empty-Object!()
		p+mut! _ "a" 1
		p-! _ "a"
		!not p? _ "a"
	|_:Object! name:Object-Key
		in
			! p? _ name

		js-delete _ name

# TODO: Don't bother, just `spread p+!`
extend!.
	doc. "Adds all the properties in `extender` to `_`."
	test. |
		_ = empty-Object!()
		extend! _
			a. 1
		! =? _.a 1
	|_:Object! extender:Object
		Object.assign _ extender

Object!
