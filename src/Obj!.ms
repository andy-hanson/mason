use
	.Bool false
	.js js-delete js-set
	.methods empty
	.Obj
	.Str
	.Symbol
	.Type.Impl-Type self-type
	.Type.Method impl!
	.Type.Pred-Type Any Union
debug use~
	.! _ !not
	.methods =?
	.Obj p?
	.Try fails?

\ TODO: Alias-Type
Obj! =
	doc. "TODO"

\ TODO: Duplicate definition in Obj.ms
~Obj-Key = Union[Str Symbol]

impl! empty (self-type Obj!) |
	Obj.create Obj.prototype

p+!.
	doc. "Adds a new immutable property."
	test. |
		x = empty Obj!
		p+! x "a" 1
		! =? x.a 1
		! fails? |
			p+! x "a" 2
		! fails? |
			p+! "string" "a" 1
	|_:Obj name:Obj-Key val
		Obj.defineProperty _ name
			enumerable.
			writable. false
			value. val
		()

p+mut!.
	doc. "Adds a new mutable property."
	test. "See `p!`"
	|_:Obj name:Obj-Key val:Any
		Obj.defineProperty _ name
			enumerable.
			writable.
			value. val
			configurable.
		()

p!.
	doc. "Modifies an already-existing property."
	test. |
		x = empty Obj!
		p+mut! x "a" 1
		p! x "a" 2
		! =? x.a 2
	|_:Obj name:Obj-Key new-val
		in
			p? _ name

		js-set _ name new-val

p-!.
	test. |
		a = empty Obj!
		p+mut! a "a" 1
		p-! a "a"
		!not p? a "a"
	|_:Obj name:Obj-Key
		in
			! p? _ name

		js-delete _ name

\ TODO: Don't bother, just `spread p+!`
extend!.
	doc. "Adds all the properties in `extender` to `_`."
	test. |
		x = empty Obj!
		extend! x
			a. 1
		! =? x.a 1
	|_:Obj extender:Obj
		Obj.assign _ extender

Obj!
