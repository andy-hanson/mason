use
	..Comparable! -> <!
	..Fun -> Pred
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
			\ TODO:SYNTAX
			cased = _.predicate.displayName
			case cased
				:Str
					_
				else
					oh-no! "Need displayName for Pred-Type. Got {_}."

<! Pred-Type Type
impl! contains? Pred-Type |_ value
	_.predicate value

Pred-Type
