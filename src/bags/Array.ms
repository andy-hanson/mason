\ Also see ..maps.Array-as-Map

use
	.? -> Opt->?
	.Bag -> count each! iterator
	.Bag-Type -> from-stream
	..Comparable! -> <!
	..Fun -> ignore thunk
	..js -> global js-sub
	..js-impl -> array-iterator
	..math.Num -> Nat
	..methods -> empty freeze type-of
	.Seq -> ?nth
	..types.Method ->  impl!
	..types.util -> self-type

Array =
	doc. "Javascript's native mutable Array type. TODO: `Array` vs `Array!`"
	global.Array

<! Array Seq

impl! count Array |_
	_.length
\ TODO:ES6 This should be implemented for me
impl! iterator Array array-iterator

<! (self-type Array) Bag-Type
impl! empty (self-type Array) (thunk [])

impl! from-stream (self-type Array) |_ stream
	ignore _ \ TODO:Ignored vars
	\ TODO: freeze (from-stream array! ...
	it = Array 0
	each! stream |em
		it.push em
	freeze it

\ TODO:REMOVE
impl! type-of Array |
	Array

impl! ?nth Array |_ n:Nat
	Opt->? (js-sub _ n

Array
