\ Also see ..Map.Array-as-Map

use
	..Comparable <?
	..Comparable! <!
	..control if
	..Fun ignore thunk
	..js global js-sub
	..js-impl array-iterator
	..methods empty freeze
	..Type.Impl-Type self-type
	..Type.Method impl!
	..@ count iterator
	.@-Type _ from-stream
	.Seq _ ?nth
use~
	..math.Num Nat
	.Array!

Array =
	doc. "Javascript's native mutable Array type. TODO: `Array` vs `Array!`"
	global.Array

<! Array Seq

impl! count Array |_
	_.length
\ TODO:ES6 This should be implemented for me
impl! iterator Array array-iterator

<! (self-type Array) @-Type
impl! empty (self-type Array) (thunk [])

impl! from-stream (self-type Array) |_ stream
	ignore _ \ TODO:Ignored vars
	freeze (from-stream Array! stream)

impl! ?nth Array |_ n:Nat
	if (<? n count_) |
		js-sub _ n

Array
