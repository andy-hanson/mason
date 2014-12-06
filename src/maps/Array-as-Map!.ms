\ TODO: Every Bag is a Map, every Bag! is a Map!

use
	..bags.? -> Opt->?
	..bags.Array
	..bags.Bag -> count empty?
	..bags.Range -> range
	..Comparable! -> <!
	.Map -> ?get has-key? keys
	.Map! -> empty! delete! set!
	..math.Num -> Nat
	..pred-types -> Any
	..types.Type -> contains?

unsafe-get = |_ key
	_ \ TODO:Ignored vars
	key \ TODO:Ignored vars
	`_[key]`

<! Array Map!
	?get -> |_ key:Nat
		Opt->? (unsafe-get _ key)
	has-key? -> |_ key:Nat
		contains? Any unsafe-get _ key
	keys -> |_
		range 0 count_
	empty! -> |_
		loop!
			case!
				empty?_
					end-loop!
				else
					\ TODO pop! _
					_.pop ()
	delete! -> |_ key:Nat
		_ \ TODO:Ignored vars
		key \ TODO:Ignored vars
		`delete _[key]`
	set! -> |_ key:Nat val:Any
		_ \ TODO:Ignored vars
		key \ TODO:Ignored vars
		val \ TODO:Ignored vars
		`_[key] = val`
		()

()