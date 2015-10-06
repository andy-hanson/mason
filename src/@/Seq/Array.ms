| Also see .Map.Array-as-Map

import
	...compare =? <=? <?
	...js js-set js-sub
	...math.methods +
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Type =>
	..@ _ -! --! count empty! empty?
	..@-Type _ empty from-stream
	..Set.Set
	.Seq _ <++! ++>! indexes ?nth ?<pop! ?pop>! set-nth!
import~
	...math.Number Nat
import-debug
	...Function identity
	...math.Number divisible?

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
	todo SYNTAX _.unshift ...added
	Array.prototype.unshift.apply this (=> Array added)

impl! ++>! Array .|added:@
	todo SYNTAX _.push ...added
	Array.prototype.push.apply this (=> Array added)

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

impl! set-nth! Array .!|n:Nat val
	js-set this n val

impl! -! Array .!|em
	for! i in indexes this
		if! =? this[i] em
			.splice i 1
			break!

impl! --! Array .!|@deleted
	@deleted := => Set @deleted
	filter! this |em
		with em:@deleted
			if! _
				todo  -!
				--! @deleted [em]

todo  impl! filter!
filter!.
	test. !|
		arr = [1 2 3 4 5]
		filter! arr |_
			divisible? _ 2
		assert! =? arr [2 4]

	!|arr keep-if?
		read-idx ::= 0
		write-idx ::= 0

		for!
			if! <=? arr.length read-idx
				break!

			here = arr[read-idx]
			if! keep-if? here
				todo this[write-idx] = here
				set-nth! arr write-idx here
				write-idx := + 1 write-idx

			read-idx := + 1 read-idx

		arr.length := write-idx

fill.
	| Creates a new Array by calling `filler` on each number from zero to `count`.
	test. |
		[3 identity] -> [0 1 2]
	|count:Number filler:Function
		with new Array count
			for! i in indexes_
				todo SYNTAX _[i] = filler i
				set-nth! _ i (filler i)
