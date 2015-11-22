import
	...compare =? <?
	...math.Number modulo Nat
	...math.methods + - *
	...methods set-sub!
	...Type.Kind self-kind!
	...Type.Pred-Type Any
	..@ _ ++~ count empty! empty? iterator @map
	..@-Type _ empty
	..? un-?
	.Seq _ <++! ++>! ?nth ?<pop! ?pop>! @reverse

Deque. class kind Seq
	| Seq that can efficiently add values on either side.

	do
		self-kind! _ @-Type

	static
		todo Most have this implementation of empty...
		empty |
			new this

	construct
		.data! = Array 8
		.start-index! = 0 || Inclusive (unless =? end-index)
		.end-index! = 0 || Exclusive

	iterator *!|
		indices = case
			<? .end-index! .start-index!
				++~ .start-index!...(count .data!) 0...(.end-index!)
			else
				.start-index!...(.end-index!)
		for indices
			yield .data![_]

	<++! !|ems:@
		for @reverse ems
			new-start = prev-index this .start-index!
			case
				=? new-start .end-index!
					expand! this
					<++! this [_]
				else
					.start-index! := new-start
					.data![.start-index!] := _

	++>! !|ems:@
		for ems
			new-end = next-index this .end-index!
			case
				=? new-end .start-index!
					expand! this
					++>! this [_]
				else
					.data![.end-index!] := _
					.end-index! := new-end

		todo  Shrink on occasion

	?<pop! |
		unless empty? this
			with .data![.start-index!]
				.start-index! := next-index this .start-index!

	?pop>! |
		unless empty? this
			new-end = prev-index this .end-index!
			.end-index! := new-end
			.data![new-end]

	?nth |index:Nat
		todo @for
		@map (?data-index this index) |_
			.data![_]

	set-sub! !|index:Nat set-to:Any
		data-index = un-? (?data-index this index) ~"Can't set at index {index}; count is {count this}."
		.data![data-index] := set-to

	empty! !|
		empty! .data!
		.start-index! := 0
		.end-index! := 0

region Private
	capacity = |_
		count _.data!

	expand! = !|_
		old-data = _.data!
		old-capacity = capacity_
		new-capacity = * 2 old-capacity
		new-data = Array new-capacity
		for index of 0...old-capacity
			new-data[index] = old-data[index]
		_.data! := new-data

	wrap-index = |_ index
		modulo index capacity_

	next-index = |_ index:Nat
		wrap-index _ (+ index 1)

	prev-index = |_ index:Nat
		wrap-index _ (- index 1)

	?data-index = |_ index:Nat
		a = + _.start-index! index
		case
			<? a capacity_
				if or (<? _.end-index! _.start-index!) (<? a _.end-index!)
					a
			else
				b = wrap-index _ a
				if and (<? _.end-index! _.start-index!) (<? b _.end-index!)
					b
