use
	..Fun -> Pred
	.Interface -> implementor!
	.Method -> impl!
	.Record-Type
	..Str
	..Try -> oh-no!
	.Type -> contains?

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

\ Can't use map syntax because that requires this.
implementor! Pred-Type Type

impl! contains? Pred-Type |_ value
	_.predicate value

Pred-Type
