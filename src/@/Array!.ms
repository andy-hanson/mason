use
	..Bool and not
	..control if opr
	..Fun ignore
	..js js-set
	..math.Num Nat
	..methods <! frozen?
	..Type =>
	..Type.Impl-Type self-type
	..Type.Pred-Type
	..@ _ each! empty?
	.@! empty!
	.@-Type _ empty from-stream
	.Array
	.Seq! _ <++! ++>! ?<pop! ?pop>! set-nth!

Array! = Pred-Type
	doc. "
		TODO:MORE
		Unlike Deque!, pushing and popping elements from the left side is expensive.
	predicate. |_
		and :Array ~(not frozen?_)

<! (self-type Array!) @-Type
	empty -> |array! ?initial-size
		initial-size = opr ?initial-size 0
		ignore array! \ TODO:Ignored vars
		Array initial-size

	from-stream -> |array! stream
		ignore array! \ TODO:Ignored vars
		it = Array 0
		each! stream |em
			it.push em
		it

\ We're defining these on Arrays, but they will only work for Array!s because Arrays are frozen
<! Array Seq!
	<++! -> |_ added:@
		\ TODO:SYNTAX _.unshift ...added
		Array.prototype.unshift.apply _ (=> Array added
	++>! -> |_ added
		\ TODO:SYNTAX _.push ...added
		Array.prototype.push.apply _ (=> Array added
	?<pop! -> |_
		if (not empty?_) |
			_.shift ()
	?pop>! -> |_
		if (not empty?_) |
			_.pop ()
	empty! -> |_
		\ http://jsperf.com/empty-javascript-array/15
		loop!
			case!
				empty?_
					end-loop!
				else
					_.pop ()
	set-nth! -> |_ n:Nat val
		js-set _ n val

Array!
