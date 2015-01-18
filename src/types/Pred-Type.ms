use
	..Comparable! -> <!
	..Fun -> Pred
	.Method -> impl!
	..methods -> contains?
	..private.bootstrap -> Str
	.Record-Type
	.Type

Pred-Type = Record-Type
	doc. "Arbitrary predicates can be made into types using Pred-Type."
	members.
		displayName. Str
		predicate. Pred
	extensible.

<! Pred-Type Type
impl! contains? Pred-Type |_ value
	_.predicate value

Pred-Type
