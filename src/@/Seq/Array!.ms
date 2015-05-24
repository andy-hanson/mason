use
	...Boolean and not
	...control if opr
	...js js-set
	...math.Number Nat
	...methods frozen?
	...Type.Kind kind! self-kind!
	...Type.Pred-Type
	...Type.Type =>
	..@ _ empty?
	..@! empty!
	..@-Type _ empty from-stream
	.Seq! _ <++! ++>! ?<pop! ?pop>! set-nth!

Array! = Pred-Type
	doc. "
		TODO:MORE
		Unlike Deque!, pushing and popping elements from the left side is expensive.
	predicate. |_
		and :Array ~(not frozen?_)

self-kind! Array! @-Type
	empty -> |initial-size
		Array (opr initial-size 0
	# TODO: Identical code in Array-as-Seq.ms
	from-stream -> |stream
		arr = Array 0
		for! stream
			arr.push _
		arr

# We're defining these on Arrays, but they will only work for Array!s because Arrays are frozen
kind! Array Seq!
	<++! -> !|_ added:@
		# TODO:SYNTAX _.unshift ...added
		Array.prototype.unshift.apply _ (=> Array added
	++>! -> !|_ added
		# TODO:SYNTAX _.push ...added
		Array.prototype.push.apply _ (=> Array added
	?<pop! -> |_
		if (not empty?_) ~_.shift()
	?pop>! -> |_
		if (not empty?_) ~_.pop()
	empty! -> !|_
		# http://jsperf.com/empty-javascript-array/15
		# TODO: Test it myself...
		for!
			if! empty?_
				break!
			_.pop()
	set-nth! -> !|_ n:Nat val
		js-set _ n val

Array!
