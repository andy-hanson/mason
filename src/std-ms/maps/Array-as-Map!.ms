use
	..bags.Array
	..bags.Bag -> empty?
	..Fun -> TODO
	.Map -> ?get has-key? keys
	.Map! -> clear! delete! set!
	..Num -> Nat
	..Opt -> Opt->?
	..pred-types -> Any
	..types.Interface -> implementor!
	..types.Method -> impl!

impl! ?get Array |_ key
	Opt->? `_[key]`

impl! has-key? Array |arr index:Nat
	_ = `arr[key]`
	:Any

impl! keys Array TODO

impl! clear! Array |_
	loop!
		case!
			empty?_
				end-loop!
			else
				\ TODO pop! _
				_.pop ()

impl! delete! Array |_ index:Nat val
	`_[index] = undefined`

impl! set! Array |_ index:Nat val:Any
	`_[index] = val`

implementor! Array Map!

