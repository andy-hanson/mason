use
	.? -> get-or Opt->?
	.Array
	.Bag
	.Bag-Type
	..Bool -> and not
	..Comparable! -> <!
	..control -> if
	..Fun -> ignore
	..methods -> => empty empty? empty!
	..Object -> frozen?
	.Seq! -> <+! +>! ?<pop! ?pop>!
	..types.Pred-Type
	..types.util -> self-type

Array! = Pred-Type
	doc. "
		TODO:MORE
		Unlike Deque!, pushing and popping elements from the left side is expensive.
	predicate. |_
		and :Array ~(not frozen?_)

<! (self-type Array!) Bag-Type
	empty -> |array! initial-size
		ignore array! \ TODO:Ignored vars
		\ TODO:SYNTAX Optional arguments
		Array (get-or (Opt->? initial-size) 0

\ We're defining these on Arrays, but they will only work for Array!s because Arrays are frozen
<! Array Seq!
	<+! -> |_ added:Bag
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

Array!
