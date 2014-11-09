use
	.Array
	.Bag -> empty?
	.Fun -> TODO
	.Interface -> implementor!
	.Map -> ?get has-key? keys
	.Map! -> clear! delete! set!
	.Method -> impl!
	.Num -> Nat
	.Opt -> Opt->?
	.pred-types -> Any

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

