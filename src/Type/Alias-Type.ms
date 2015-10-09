import
	..methods sub
	.Kind kind!
	.Type _ contains?

Alias-Type. class
	| Contains the same instances as another type (officially), but has its own meaning and identity.

	do!
		kind! _ Type

	construct! params
		Object.assign this params
		assert! .name:String
		assert! .alias-of:Type

	contains? |value
		value:.alias-of

	sub |...args
		sub .alias-of ...args
