doc. "For mutating Objs."

use
	.Bool false
	.js js-delete js-set
	.Obj _ Obj-Key
	.Type.Alias-Type
debug use~
	.! _ !not
	.compare =?
	.Obj p?
	.Try fails?

Obj! = Alias-Type
	doc. "Obj which is at least partially mutable."
	alias-of. Obj

empty-Obj!.
	doc. "TODO"
	test. |
		"TODO"
	|
		Obj.create Obj.prototype

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
			writable. false \ TODO:ES6 Shouldn't need to be explicit
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

\ TODO: Don't bother, just `spread p+!`
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
