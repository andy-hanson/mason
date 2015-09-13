use
	..methods sub
	.Kind kind!
	.Type _ contains?
use~ todo  use-debug
	..compare =?

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
		todo test. |
		todo	?2 = Alias-Type
		todo		alias-of. ?
		todo	[?2 String] -> ?[String]
		sub .alias-of ...args

todo  class attributes
Alias-Type.test = !|
	A = new Alias-Type
		name.
		alias-of. String
	assert! "0":A
	forbid! =? A String
