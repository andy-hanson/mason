use
	...Bool and not or
	...compare =? <?
	...control if
	...math.Num modulo Nat
	...math.methods + - *
	...methods sub
	...Obj! p!
	...Type.Kind kind! self-kind!
	...Type.Pred-Type Any
	...Type.Obj-Type
	..@ _ ++ count each! empty? iterator map map'
	..@! empty!
	..@-Type _ empty
	..? un-?
	.Array!
	.Range range
	.Seq ?nth reverse
	.Seq! _ <++! ++>! ?<pop! ?pop>! set-nth!

Deque! = Obj-Type
	doc. "Seq! that can efficiently add values on either side."
	props.
		data!. Array!
		start-index!. Nat # Inclusive (unless =? end-index)
		end-index!. Nat # Exclusive

self-kind! Deque! @-Type
	empty -> |
		Deque!
			data!. empty Array! 8
			start-index!. 0
			end-index!. 0

region Helpers
	capacity = |_
		count _.data!

	expand! = |_
		old-data = _.data!
		old-capacity = capacity_
		new-capacity = * 2 old-capacity
		new-data = empty Array! new-capacity
		each! (range 0 old-capacity) |index
			set-nth! new-data index old-data[index]
		p! _ "data!" new-data

	wrap-index = |_ index
		modulo index capacity_

	next-index = |_ index:Nat
		wrap-index _ (+ index 1

	prev-index = |_ index:Nat
		wrap-index _ (- index 1

	?data-index = |_ index:Nat
		a = + _.start-index! index
		case
			<? a capacity_
				if (or (<? _.end-index! _.start-index!) ~(<? a _.end-index!)) a
			else
				b = wrap-index _ a
				if (and (<? _.end-index! _.start-index!) ~(<? b _.end-index!)) b

kind! Deque! Seq!
	iterator -> |_
		indices = case
			<? _.end-index! _.start-index!
				++ (range _.start-index! (count _.data!)) (range 0 _.end-index!
			else
				range _.start-index! _.end-index!
		iterator (map indices sub[_.data!]

	<++! -> |_ ems:@
		each! (reverse ems) |em
			new-start = prev-index _ _.start-index!
			case!
				=? new-start _.end-index!
					expand!_
					<++! _ [ em ]
				else
					p! _ "start-index!" new-start
					set-nth! _.data! _.start-index! em

	++>! -> |_ ems:@
		each! ems |em
			new-end = next-index _ _.end-index!
			case!
				=? new-end _.start-index!
					expand!_
					++>! _ [ em ]
				else
					set-nth! _.data! _.end-index! em
					p! _ "end-index!" new-end

	# TODO: Shrink on occasion

	?<pop! -> |_
		if (not empty?_) ~
			x = _.data![_.start-index!]
			p! _ "start-index!" (next-index _ _.start-index!)
			x

	?pop>! -> |_
		if (not empty?_) ~
			new-end = prev-index _ _.end-index!
			p! _ "end-index!" new-end
			_.data![new-end]

	?nth -> |_ index:Nat
		map' (?data-index _ index) sub[_.data!]

	set-nth! -> |_ index:Nat set-to:Any
		data-index = un-? (?data-index _ index) ~"Can't set at index {index}; count is {count_}"
		set-nth! _.data! data-index set-to

	empty! -> |_
		empty! _.data!
		# TODO: change-properties!
		p! _ "start-index!" 0
		p! _ "end-index!" 0

Deque!
