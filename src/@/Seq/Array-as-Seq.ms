# Also see .Map.Array-as-Map

use
	...compare <?
	...js js-set js-sub
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Type =>
	..@ _ count empty! empty?
	..@-Type _ empty from-stream
	.Seq _ <++! ++>! ?nth ?<pop! ?pop>! set-nth!
use~
	...math.Number Nat

self-kind! Array @-Type
self-impl! empty Array |
	[ ]
self-impl! from-stream Array |stream
	arr = [ ]
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
	# TODO:SYNTAX _.unshift ...added
	Array.prototype.unshift.apply this (=> Array added)

impl! ++>! Array .|added:@
	# TODO:SYNTAX _.push ...added
	Array.prototype.push.apply this (=> Array added)

impl! ?<pop! Array .|
	unless empty? this
		.shift()

impl! ?pop>! Array .|
	unless empty? this
		.pop()

impl! empty! Array .!|
	# http://jsperf.com/empty-javascript-array/15
	# TODO: Test it myself...
	for!
		if! empty? this
			break!
		.pop()

impl! set-nth! Array .!|n:Nat val
	js-set this n val
