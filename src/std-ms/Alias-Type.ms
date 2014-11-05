use
	.assert -> !
	.Bool -> not true
	.Comparable -> =?
	.Interface -> implementor!
	.Method -> impl!
	.Record-Type
	.Type -> subsumes?

\ TODO:ES6 Should be able to use .Str
Str = `global.String`

Alias-Type. Record-Type
	doc. "Subsumes the same instances as another type, but has its own meaning and identity."
	test. |
		A = Alias-Type
			alias-of. Str
		! (subsumes? A "0")
		! (not (=? A Str))
	members.
		displayName. Str
		alias-of. Type
	extensible. true

implementor! Alias-Type Type

impl! subsumes? Alias-Type |_ subsumed
	subsumes? _.alias-of subsumed

Alias-Type
