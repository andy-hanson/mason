\ Also see .Map.Array-as-Map

use
	..control if
	..Fun ignore thunk
	..js global js-sub
	..private.js-impl array-iterator
	..methods <? freeze
	..Type.Impl-Type self-type
	..Type.Kind kind!
	..Type.Method impl!
	..@ count iterator
	.@-Type _ empty from-stream
	.Seq _ ?nth
use~
	..math.Num Nat
	.Array!

Array =
	doc. "Javascript's native mutable Array type. TODO: `Array` vs `Array!`"
	global.Array

kind! Array Seq

impl! count Array |_
	_.length
\ TODO:ES6 This should be implemented for me
impl! iterator Array array-iterator

kind! (self-type Array) @-Type
impl! empty (self-type Array) (thunk [])

impl! from-stream (self-type Array) |_ stream
	ignore _ \ TODO:Ignored vars
	freeze (from-stream Array! stream)

impl! ?nth Array |_ n:Nat
	if (<? n count_) |
		js-sub _ n

Array
