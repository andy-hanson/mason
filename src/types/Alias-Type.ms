use
	..Comparable! <!
	..methods contains? sub
	..private.bootstrap Str
	.Method impl!
	.Record-Type
	.Type
debug use~
	..! _ !not
	..@.?
	..Comparable =?

Alias-Type. Record-Type
	doc. "Contains the same instances as another type (officially), but has its own meaning and identity."
	test. |
		A = Alias-Type
			alias-of. Str
		! contains? A "0"
		!not =? A Str
	members.
		displayName. Str
		alias-of. Type
	extensible.

<! Alias-Type Type

\ TODO: impl-delegate!
impl! contains? Alias-Type |_ value
	contains? _.alias-of value

\ TODO: impl-delegate!
impl! sub Alias-Type
	test. |
		?2 = Alias-Type
			alias-of. ?
		[ ?2 Str ] -> ?[Str]
	|_ ...args
		sub _.alias-of ...args

Alias-Type
