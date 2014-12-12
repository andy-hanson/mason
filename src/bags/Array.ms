\ Also see ..maps.Array-as-Map

use
	.? -> Opt->?
	..assert -> !
	.Bag -> builder build-next! build-result count iterator
	.Bag-Type
	..Bool -> and
	..Comparable -> =?
	..Comparable! -> <!
	..Fun -> thunk
	..js -> global js-sub
	..js-impl -> array-iterator
	..math.Num -> Nat
	..methods -> empty freeze type-of
	.Seq -> ?nth seq=?
	..types.Method ->  impl!
	..types.Type -> contains?
	..types.util -> self-type

Array =
	doc. "Javascript's native mutable Array type. TODO: `Array` vs `Array!`"
	global.Array

<! Array Seq

impl! count Array |_
	_.length
\ TODO:ES6 This should be implemented for me
impl! iterator Array array-iterator

impl! =? Array
	test. |
		! =? [ 1 ] [ 1 ]
	|a b
		and (contains? Array b) ~(and (=? a.length b.length) ~(seq=? a b))

<! (self-type Array) Bag-Type
impl! empty (self-type Array) (thunk [])

impl! builder Array |
	Array 0
impl! build-next! Array |_ em
	_.push em
impl! build-result Array freeze

impl! type-of Array |
	Array

impl! ?nth Array |_ n:Nat
	Opt->? (js-sub _ n

Array
