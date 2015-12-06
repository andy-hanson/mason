import
	..methods sub
	.primitive Str
	.Type _ contains?

Alias-Type. class kind Type
	| Contains the same instances as another type (officially), but has its own meaning and identity.

	construct params
		Object.assign this params
		assert .name:Str
		assert .alias-of:Type

	contains? |value
		value:.alias-of

	sub |...args
		sub .alias-of ...args
