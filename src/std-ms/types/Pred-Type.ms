use
	..Bool -> true
	..Error -> oh-no!
	..Fun -> Pred
	.Interface -> implementor!
	.Method -> impl!
	.Record-Type
<<<<<<< HEAD
	..Str -> ->Str
=======
	..Str
>>>>>>> 9ddb097... Added missing files
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

<<<<<<< HEAD

\ TODO: Map syntax
=======
>>>>>>> 9ddb097... Added missing files
implementor! Pred-Type Type

impl! subsumes? Pred-Type |_ subsumed
	_.predicate subsumed

<<<<<<< HEAD
impl! ->Str Pred-Type |_
	_.displayName

=======
>>>>>>> 9ddb097... Added missing files
Pred-Type
