use
	.js js-delete js-set
	.Obj _ Obj-Key
	.Type.Alias-Type
	.Type.Pred-Type Opt
use~
	.control opr
use-debug
	.! _ !not
	.compare =?
	.Obj empty-Obj? p? prototype
	.Try fails?

doc. "For mutating Objs."

Obj! = Alias-Type
	doc. "Obj which is at least partially mutable."
	alias-of. Obj

empty-Obj!.
	doc. "Creates a new Obj! with no properties and the given prototype."
	test. |
		_ = empty-Obj!()
		! empty-Obj? _
		child = empty-Obj! _
		! =? _ (prototype child
	|?prototype:Opt[Obj]
		prototype = opr ?prototype Obj.prototype
		Obj.create prototype

p+!.
	doc. "Adds a new immutable property."
	test. |
		_ = empty-Obj!()
		p+! _ "a" 1
		! =? _.a 1
		! fails? |
			p+! _ "a" 2
		! fails? |
			p+! "string" "a" 1
	|_:Obj! name:Obj-Key val
		Obj.defineProperty _ name
			enumerable.
			writable. false # TODO:ES6 Shouldn't need to be explicit
			value. val
		()

p+mut!.
	doc. "Adds a new mutable property."
	test. "See `p!`"
	|_:Obj! name:Obj-Key val
		Obj.defineProperty _ name
			enumerable.
			writable.
			value. val
			configurable.
		()

p!.
	doc. "Modifies an already-existing property."
	test. |
		_ = empty-Obj!()
		p+mut! _ "a" 1
		p! _ "a" 2
		! =? _.a 2
	|_:Obj! name:Obj-Key new-val
		in
			! p? _ name

		js-set _ name new-val

p-!.
	test. |
		_ = empty-Obj!()
		p+mut! _ "a" 1
		p-! _ "a"
		!not p? _ "a"
	|_:Obj! name:Obj-Key
		in
			! p? _ name

		js-delete _ name

# TODO: Don't bother, just `spread p+!`
extend!.
	doc. "Adds all the properties in `extender` to `_`."
	test. |
		_ = empty-Obj!()
		extend! _
			a. 1
		! =? _.a 1
	|_:Obj! extender:Obj
		Obj.assign _ extender

Obj!
