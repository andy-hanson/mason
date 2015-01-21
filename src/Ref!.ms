use
	.Fun
	.Object! -> p!
	.types.Record-Type

Ref! = Record-Type
	members.
		value!.

set!.
	doc. "TODO"
	|ref:Ref! new-value
		p! ref "value!" new-value

\ TODO: Make Ref! a mutable wrapper type and kill this.
ref. |initial-value
	Ref!
		value!. initial-value

\ TODO: `mod!` method
mod!. |_ f:Fun
	set! _ (f get_)

\ TODO: `get` method
get. |_
	_.value!

Ref!
