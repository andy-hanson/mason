use
	..bags.Array
	..bags.Bag -> count empty?
	..bags.Range -> range
	.Map -> ?get has-key? keys
	.Map! -> clear! delete! set!
	..math.Num -> Nat
	..Opt -> Opt->?
	..pred-types -> Any
	..types.Interface -> implementor!
	..types.Type -> subsumes?

unsafe-get = |_ key
	_ \ TODO:Ignored vars
	key \ TODO:Ignored vars
	`_[key]`

implementor! Array Map!
	?get -> |_ key:Nat
		Opt->? (unsafe-get _ key)
	has-key? -> |_ key:Nat
		subsumes? Any unsafe-get _ key
	keys -> |_
		range 0 count_
	clear! -> |_
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
