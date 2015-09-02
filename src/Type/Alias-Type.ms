use
	..methods sub
	.Kind kind!
	.Type _ contains?
use~ # TODO: use-debug
	..compare =?

Alias-Type. class
	# TODO: class attributes
	# doc. "Contains the same instances as another type (officially), but has its own meaning and identity."

	do!
		kind! _ Type

	# TODO: data-extensible name:String alias-of:Type
	construct! params
		Object.assign this params
		assert! .name:String
		assert! .alias-of:Type

	contains? |value
		value:.alias-of

	sub |...args
		# TODO
		# test. |
		#	?2 = Alias-Type
		#		alias-of. ?
		#	[ ?2 String ] -> ?[String]
		sub .alias-of ...args

# TODO: class attributes
Alias-Type.test = !|
	A = new Alias-Type
		name.
		alias-of. String
	assert! "0":A
	forbid! =? A String
