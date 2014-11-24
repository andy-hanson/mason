use
	..Bool -> true
	..Fun -> Pred
	.Interface -> implementor!
	.Method -> impl!
	.Record-Type
	..Str
	..Try -> oh-no!
	.Type -> subsumes?

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
					oh-no! "Need displayName for Pred-Type. Got {_}."
	extensible. true

\ Can't use map syntax because that requires this.
implementor! Pred-Type Type

impl! subsumes? Pred-Type |_ subsumed
	_.predicate subsumed

Pred-Type
