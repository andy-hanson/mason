use
	..Comparable -> =?
	..Comparable! -> <!
	.Method -> impl!
	..methods -> + contains? sub
	..private.bootstrap -> Str
	.Record-Type
	.Type
use~
	..! -> !not
	..Fun -> apply

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

\ TODO impl-delegate!
impl! contains? Alias-Type |_ value
	contains? _.alias-of value

impl! sub Alias-Type |_ ...args
	\ TODO:SYNTAX Splat call
	apply sub (+ [ _.alias-of ]  args)

Alias-Type
