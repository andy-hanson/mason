use
	.Fun
	.Obj! p!
	.Type.Wrap-Type
debug use~
	.!
	.Comparable =?
	.methods +

Ref! = Wrap-Type
	doc. "
		Mutable holder of some value.
		Create a Ref! by passing in the initial value.
		Change this at any time with `set!`.
		Use `get` at any time to get the current value.

set!.
	doc. "Change the current value."
	test. |
		_ = Ref! ()
		set! _ 0
		! =? get_ 0
	|_:Ref! new-value
		p! _ "val" new-value

\ TODO: Just override `map!`
mod!.
	doc. "Shorthand for `set! ref (f (get ref))"
	test. |
		_ = Ref! 0
		mod! _ +[1]
		! =? get_ 1
	|_:Ref! f:Fun
		set! _ (f get_)

get.
	doc. "Current value."
	test. |
		[ (Ref! 0) ] -> 0
	|_:Ref!
		_.val

Ref!
