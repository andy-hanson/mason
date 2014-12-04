\ Also see ..maps.Array-as-Map

use
	..assert -> !
	.Bag -> builder build-next! build-result count iterator
	.Bag-Type -> empty
	..basic-methods -> freeze type-of
	..Bool -> and
	..Comparable -> =?
	..Fun -> thunk
	..js -> global
	.Seq -> seq=?
	..show
	..types.Interface -> implementor!
	..types.Method ->  impl!
	..types.Type -> contains?
	..types.util -> self-type

Array =
	doc. "Javascript's native mutable Array type. TODO: `Array` vs `Array!`"
	global.Array

implementor! Array Seq

impl! count Array |_
	_.length
\ TODO:ES6 This should be implemented for me
impl! iterator Array ~|_
	len = count_
	len \ TODO:Ignored vars
	`for (let i = 0; i < len; i++) yield _[i]`
	()

impl! =? Array
	test. |
		! =? [ 1 ] [ 1 ]
	|a b
		and (contains? Array b) ~(and (=? a.length b.length) ~(seq=? a b))

implementor! (self-type Array) Bag-Type
impl! empty (self-type Array) (thunk [])

impl! builder Array |
	`[]`
impl! build-next! Array |_ em
	_.push em
impl! build-result Array freeze

impl! type-of Array |
	Array

Array
