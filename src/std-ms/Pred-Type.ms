use
	.Bool -> true
	.Fun -> Pred
	.Interface -> implementor!
	.Method -> impl!
	.Record-Type
	.Str
	.Type -> subsumes?

Pred-Type = Record-Type
	doc. "TODO"
	members.
		displayName. Str
		predicate. Pred
	extensible. true

implementor! Pred-Type Type

impl! subsumes? Pred-Type |_ subsumed
	_.predicate subsumed

Pred-Type
