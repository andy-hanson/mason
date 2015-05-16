use
	..methods sub
	.Kind kind!
	.Method impl!
	.Obj-Type
	.Type _ contains?
use-debug
	..! _ !not
	..@.?
	..compare =?

Alias-Type = Obj-Type
	doc. "Contains the same instances as another type (officially), but has its own meaning and identity."
	test. |
		A = Alias-Type
			alias-of. String
		! contains? A "0"
		!not =? A String
	props.
		name. String
		alias-of. Type
	extensible. true

kind! Alias-Type Type

# TODO: impl-delegate!
impl! contains? Alias-Type |_ value
	contains? _.alias-of value

# TODO: impl-delegate!
impl! sub Alias-Type
	test. |
		?2 = Alias-Type
			alias-of. ?
		[ ?2 String ] -> ?[String]
	|_ ...args
		sub _.alias-of ...args

Alias-Type
