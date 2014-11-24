use
	.Fun
	.maps.Map! -> set!
	.Object -> change-property!
	.types.Method -> impl!
	.types.Record-Type


Ref = Record-Type
	members.
		value!.

impl! set! Ref |_ new-value
	change-property! _ "value!" new-value

ref. |initial-value
	Ref
		value!. initial-value

\ TODO: `mod!` method
mod!. |_ f:Fun
	set! _ (f get_)

\ TODO: `get` method
get. |_
	_.value!
