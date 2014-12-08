use
	..Comparable! -> <!
	..Fun -> Pred
	.Method -> impl!
	.Record-Type
	..Str
	.Type -> contains?

Pred-Type = Record-Type
	doc. "Arbitrary predicates can be made into types using Pred-Type."
	members.
		displayName. Str
		predicate. Pred

<! Pred-Type Type
impl! contains? Pred-Type |_ value
	_.predicate value

Pred-Type
