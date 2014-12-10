use
	..assert -> ! !not
	..Comparable -> =?
	..Comparable! -> <!
	.Method -> impl!
	..private.bootstrap -> Str
	.Record-Type
	.Type -> contains?

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

<! Alias-Type Type

impl! contains? Alias-Type |_ value
	contains? _.alias-of value

Alias-Type
