\ TODO: Every Bag is a Map, every Bag! is a Map!

use
	..bags.? -> Opt->?
	..bags.Array
	..bags.Bag -> count
	..bags.Range -> range
	..Comparable! -> <!
	..Fun -> ignore
	.Map -> ?get has-key? keys
	.Map! -> delete! set!
	..math.Num -> Nat
	..pred-types -> Any
	..types.Type -> contains?

unsafe-get = |_ key
	ignore _ key \ TODO:Ignored vars
	`_[key]`

<! Array Map!
	\ empty and empty! already done in Array!.ms
	?get -> |_ key:Nat
		Opt->? (unsafe-get _ key)
	has-key? -> |_ key:Nat
		contains? Any unsafe-get _ key
	keys -> |_
		range 0 count_
	delete! -> |_ key:Nat
		ignore _ key \ TODO:Ignored vars
		`delete _[key]`
	set! -> |_ key:Nat val:Any
		ignore _ key val \ TODO:Ignored vars
		`_[key] = val`
		()

()
