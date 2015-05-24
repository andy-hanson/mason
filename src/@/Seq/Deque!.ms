use
	...Boolean and not or
	...compare =? <?
	...control if
	...math.Number modulo Nat
	...math.methods + - *
	...methods sub
	...Object! p!
	...Type.Js-Method js-impl!
	...Type.Kind kind! self-kind!
	...Type.Pred-Type Any
	...Type.Tuple
	..@ _ ++' count empty? iterator map
	..@! empty!
	..@-Type _ empty
	..? un-?
	.Array!
	.Range range
	.Seq ?nth reverse
	.Seq! _ <++! ++>! ?<pop! ?pop>! set-nth!

Deque! = Tuple
	doc. "Seq! that can efficiently add values on either side."
	props.
		. [ "data!" Array!
		. [ "start-index!" Nat # Inclusive (unless =? end-index)
		. [ "end-index!" Nat # Exclusive

self-kind! Deque! @-Type
	empty -> |
		Deque! (empty Array! 8) 0 0

region Helpers
	capacity = |_
		count _.data!

	expand! = !|_
		old-data = _.data!
		old-capacity = capacity_
		new-capacity = * 2 old-capacity
		new-data = empty Array! new-capacity
		for! index in range 0 old-capacity
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

js-impl! iterator Deque! ~!|
	# TODO:ES6 case should preserve `this`
	self = this
	indices = case
		<? self.end-index! self.start-index!
			++' (range self.start-index! (count self.data!)) (range 0 self.end-index!
		else
			range self.start-index! self.end-index!
	for! indices
		<~ this.data![_]

kind! Deque! Seq!
	<++! -> !|_ ems:@
		for! em in reverse ems
			new-start = prev-index _ _.start-index!
			case!
				=? new-start _.end-index!
					expand!_
					<++! _ [ em ]
				else
					p! _ "start-index!" new-start
					set-nth! _.data! _.start-index! em

	++>! -> !|_ ems:@
		for! em in ems
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
		map (?data-index _ index) sub[_.data!]

	set-nth! -> !|_ index:Nat set-to:Any
		data-index = un-? (?data-index _ index) ~"Can't set at index {index}; count is {count_}"
		set-nth! _.data! data-index set-to

	empty! -> !|_
		empty! _.data!
		# TODO: change-properties!
		p! _ "start-index!" 0
		p! _ "end-index!" 0

Deque!
