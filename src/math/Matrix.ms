use
	..@.? un-?
	..@.Range range
	..@.Seq! set-nth!
	..Bool and
	..control if
	..methods sub
	..Type.Method impl!
	..Type.Obj-Type
	..Type.Type contains?
	.methods * +
	.Num Int Nat
use-debug
	..!
	..@.?
	..@.@-Type empty

Matrix = Obj-Type
	props.
		width. Nat
		height. Nat
		data. Array
	defaults.
		data. |_
			Array (* _.width _.height)

data-idx = |_ ix iy
	+ ix (* iy _.width

has-entry?.
	doc. "TODO"
	test. |
		_ = Matrix (width. 3 height. 3
		[ _ 0 1 ] -> true
		[ _ 2 3 ] -> false
	|_:Matrix ix:Int iy:Int
		and (contains? (range 0 _.width) ix) ~(contains? (range 0 _.height) iy

?get-mat.
	doc. "TODO"
	test. |
		_ = Matrix (width. 3 height. 3
		set-mat! _ 0 1 "a"
		[ _ 0 1 ] -> ? "a"
		[ _ 2 3 ] -> empty ?
	|_:Matrix ix:Int iy:Int
		if (has-entry? _ ix iy) ~_.data[(data-idx _ ix iy)]

impl! sub Matrix
	doc. "TODO"
	test. "See ?get-mat"
	|_:Matrix ix:Nat iy:Nat
		un-? (?get-mat _ ix iy)
			"Could not get data at {ix}, {iy} from {_.width} * {_.height} Matrix."

set-mat!.
	doc. "TODO"
	test. "See ?get-mat"
	|_:Matrix ix:Nat iy:Nat val
		in
			! has-entry? _ ix iy
		set-nth! _.data (data-idx _ ix iy) val

Matrix

