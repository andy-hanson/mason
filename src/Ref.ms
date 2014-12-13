use
	.Fun
	.Object! -> change-property!
	.types.Record-Type


Ref = Record-Type
	members.
		value!.

set!.
	doc. "TODO"
	|ref:Ref new-value
		change-property! ref "value!" new-value

ref. |initial-value
	Ref
		value!. initial-value

\ TODO: `mod!` method
mod!. |_ f:Fun
	set! _ (f get_)

\ TODO: `get` method
get. |_
	_.value!
