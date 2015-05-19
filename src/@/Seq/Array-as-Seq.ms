# Also see .Map.Array-as-Map

use
	...compare <?
	...control if
	...Function thunk
	...js js-sub
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	..@ count
	..@-Type _ empty from-stream
	.Seq _ ?nth
use~
	...math.Number Nat

doc. "Javascript's native mutable Array type. TODO: `Array` vs `Array!`"

kind! Array Seq

impl! count Array |_
	_.length

self-kind! Array @-Type
self-impl! empty Array (thunk []
# TODO: Identical code in Array!.ms
self-impl! from-stream Array |stream
	arr = Array 0
	for! stream
		arr.push _
	arr

impl! ?nth Array |_ n:Nat
	if (<? n count_) ~(js-sub _ n

Array
