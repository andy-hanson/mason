# Also see .Map.Array-as-Map

use
	...compare <?
	...control if
	...Fun thunk
	...js js-sub
	...private.js-impl arrayIterator
	...methods freeze
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	..@ count iterator
	..@-Type _ empty from-stream
	.Seq _ ?nth
use~
	...math.Num Nat
	.Array!

doc. "Javascript's native mutable Array type. TODO: `Array` vs `Array!`"

kind! Array Seq

impl! count Array |_
	_.length
# TODO:ES6 This should be implemented for me
impl! iterator Array arrayIterator

self-kind! Array @-Type
self-impl! empty Array (thunk []
self-impl! from-stream Array |stream
	freeze (from-stream Array! stream

impl! ?nth Array |_ n:Nat
	if (<? n count_) ~(js-sub _ n

Array
