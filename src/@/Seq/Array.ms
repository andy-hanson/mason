| Also see .Map.Array-as-Map

import
	...compare =? <=? <?
	...js js-set js-sub
	...math.methods +
	...methods set-sub!
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Type =>
	..@ _ -! --! count empty! empty?
	..@-Type _ empty from-stream
	..Set.Set
	.Seq _ <++! ++>! @indexes ?nth ?<pop! ?pop>!
import~
	...math.Number Nat

self-kind! Array @-Type
self-impl! empty Array |
	[]
self-impl! from-stream Array |stream
	arr = []
	for! stream
		arr.push _
	arr


kind! Array Seq

impl! count Array .|
	.length

impl! ?nth Array .|n
	if <? n (count this)
		js-sub this n

impl! <++! Array .|added:@
	.unshift ...added

impl! ++>! Array .|added:@
	.push ...added

impl! ?<pop! Array .|
	unless empty? this
		.shift()

impl! ?pop>! Array .|
	unless empty? this
		.pop()

impl! empty! Array .!|
	| http://jsperf.com/empty-javascript-array/15
	todo  Test it myself...
	for!
		if! empty? this
			break!
		.pop()

impl! set-sub! Array .!|n:Nat val
	js-set this n val

impl! -! Array .!|em
	for! @indexes this
		if! =? this[_] em
			.splice _ 1
			break!

impl! --! Array .!|@deleted
	@deleted := => Set @deleted
	filter! this |em
		with em:@deleted
			if! _
				todo  -!
				--! @deleted [em]

todo  impl! filter!
filter!. !|arr keep-if?
	read-idx ::= 0
	write-idx ::= 0

	for!
		if! <=? arr.length read-idx
			break!

		here = arr[read-idx]
		if! keep-if? here
			arr[write-idx] := here
			write-idx := + 1 write-idx

		read-idx := + 1 read-idx

	arr.length := write-idx

todo rename?
fill. |count:Number filler:Function
	| Creates a new Array by calling `filler` on each number from zero to `count`.
	with new Array count
		for! i of @indexes_
			_[i] = filler i
