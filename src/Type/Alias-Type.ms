import
	..methods sub
	.Type _ contains?

Alias-Type. class kind Type
	| Contains the same instances as another type (officially), but has its own meaning and identity.

	construct! params
		Object.assign this params
		assert! .name:String
		assert! .alias-of:Type

	contains? |value
		value:.alias-of

	sub |...args
		sub .alias-of ...args
