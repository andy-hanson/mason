use
	.? get-or Opt->?
	.Array
	..@ _ each!
	.@-Type _ from-stream
	..Bool and not
	..Comparable! <!
	..control if
	..Fun ignore
	..js js-set
	..math.Num Nat
	..methods => empty empty? empty!
	..Obj frozen?
	.Seq! _ <+! +>! ?<pop! ?pop>! set-nth!
	..types.Pred-Type
	..types.util self-type

Array! = Pred-Type
	doc. "
		TODO:MORE
		Unlike Deque!, pushing and popping elements from the left side is expensive.
	predicate. |_
		and :Array ~(not frozen?_)

<! (self-type Array!) @-Type
	empty -> |array! initial-size
		ignore array! \ TODO:Ignored vars
		\ TODO:SYNTAX Optional arguments
		Array (get-or (Opt->? initial-size) 0

	from-stream -> |array! stream
		ignore array! \ TODO:Ignored vars
		it = Array 0
		each! stream |em
			it.push em
		it

\ We're defining these on Arrays, but they will only work for Array!s because Arrays are frozen
<! Array Seq!
	<+! -> |_ added:@
		Array.prototype.unshift.apply _ (=> Array added)
	+>! -> |_ added
		Array.prototype.push.apply _ (=> Array added)
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
