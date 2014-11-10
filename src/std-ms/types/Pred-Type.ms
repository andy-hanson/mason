use
	..Bool -> true
	..Error -> oh-no!
	..Fun -> Pred
	.Interface -> implementor!
	.Method -> impl!
	.Record-Type
	..Str -> ->Str
	.Type -> subsumes?

Pred-Type = Record-Type
	doc. "TODO"
	members.
		displayName. Str
		predicate. Pred
	defaults.
		displayName. |_
			case _.predicate.displayName
				:Str
					_
				else
					oh-no! "Need displayName for Pred-Type"

	extensible. true


\ TODO: Map syntax
implementor! Pred-Type Type

impl! subsumes? Pred-Type |_ subsumed
	_.predicate subsumed

impl! ->Str Pred-Type |_
	_.displayName

Pred-Type
