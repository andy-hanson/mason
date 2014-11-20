use
	..Bool -> true
	..Error -> oh-no!
	..Fun -> Pred
	.Interface -> implementor!
	.Method -> impl!
	.Record-Type
	..show
	..Str
	.Type -> subsumes?
	.util -> self-type

Pred-Type = Record-Type
	doc. "Arbitrary predicates can be made into types using Pred-Type."
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

\ Can't use map syntax because that requires this.
implementor! Pred-Type Type

impl! subsumes? Pred-Type |_ subsumed
	_.predicate subsumed

impl! show Pred-Type |_
	_.displayName

Pred-Type
