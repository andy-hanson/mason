use
	..bags.Array
	..bags.Bag -> count empty?
	..bags.Range -> range
	..Fun -> TODO
	.Map -> ?get has-key? keys
	.Map! -> clear! delete! set!
	..math.Num -> Nat
	..Opt -> Opt->?
	..pred-types -> Any
	..types.Interface -> implementor!
	..types.Method -> impl!

implementor! Array Map!
	?get -> |_ key
		Opt->? `_[key]`
	has-key? -> |arr index:Nat
		_ = `arr[key]`
		:Any
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

	delete! -> |_ index:Nat val
		`_[index] = undefined`

	set! -> |_ index:Nat val:Any
		`_[index] = val`
