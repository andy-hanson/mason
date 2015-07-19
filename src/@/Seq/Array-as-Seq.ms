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

impl! count Array |_
	_.length

impl! ?nth Array |_ n:Nat
	if <? n count_
		js-sub _ n

impl! <++! Array |_ added:@
	# TODO:SYNTAX _.unshift ...added
	Array.prototype.unshift.apply _ (=> Array added

impl! ++>! Array |_ added:@
	# TODO:SYNTAX _.push ...added
	Array.prototype.push.apply _ (=> Array added

impl! ?<pop! Array |_
	unless empty?_
		_.shift()

impl! ?pop>! Array |_
	unless empty?_
		_.pop()

impl! empty! Array !|_
	# http://jsperf.com/empty-javascript-array/15
	# TODO: Test it myself...
	for!
		if! empty?_
			break!
		_.pop()

impl! set-nth! Array !|_ n:Nat val
	js-set _ n val
