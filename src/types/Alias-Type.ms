use
	..assert -> ! !not
	..Comparable -> =?
	.Interface -> implementor!
	.Method -> impl!
	.Record-Type
	.Type -> subsumes?

Str = `global.String`

Alias-Type. Record-Type
	doc. "Subsumes the same instances as another type (officially), but has its own meaning and identity."
	test. |
		A = Alias-Type
			alias-of. Str
		! subsumes? A "0"
		!not =? A Str
	members.
		displayName. Str
		alias-of. Type

implementor! Alias-Type Type

impl! subsumes? Alias-Type |_ subsumed
	subsumes? _.alias-of subsumed

Alias-Type
