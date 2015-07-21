use
	...compare =? <?
	...math.Number modulo Nat
	...math.methods + - *
	...methods sub
	...Object p!
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Pred-Type Any
	...Type.Tuple
	..@ _ ++' count empty! empty? iterator map
	..@-Type _ empty
	..? un-?
	.Range range
	.Seq _ <++! ++>! ?nth ?<pop! ?pop>! reverse set-nth!

Deque = Tuple
	doc. "Seq that can efficiently add values on either side."
	props.
		. [ "data!" Array
		. [ "start-index!" Nat # Inclusive (unless =? end-index)
		. [ "end-index!" Nat # Exclusive

self-kind! Deque @-Type
self-impl! empty Deque |
	Deque (Array 8) 0 0

region Helpers
	capacity = |_
		count _.data!

	expand! = !|_
		old-data = _.data!
		old-capacity = capacity_
		new-capacity = * 2 old-capacity
		new-data = Array new-capacity
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
				if or (<? _.end-index! _.start-index!) (<? a _.end-index!)
					a
			else
				b = wrap-index _ a
				if and (<? _.end-index! _.start-index!) (<? b _.end-index!)
					b

impl! iterator Deque .~!|
	indices = case
		<? .end-index! .start-index!
			++' (range .start-index! (count .data!)) (range 0 .end-index!)
		else
			range .start-index! .end-index!
	for! indices
		<~ .data![_]

kind! Deque Seq
impl! <++! Deque .!|ems:@
	for! em in reverse ems
		new-start = prev-index this .start-index!
		case!
			=? new-start .end-index!
				expand! this
				<++! this [ em ]
			else
				p! this "start-index!" new-start
				set-nth! .data! .start-index! em

impl! ++>! Deque .!|ems:@
	for! em in ems
		new-end = next-index this .end-index!
		case!
			=? new-end .start-index!
				expand! this
				++>! this [ em ]
			else
				set-nth! .data! .end-index! em
				p! this "end-index!" new-end

	# TODO: Shrink on occasion

impl! ?<pop! Deque .|
	unless empty? this
		# TODO: returning
		x = .data![.start-index!]
		p! this "start-index!" (next-index this .start-index!)
		x

impl! ?pop>! Deque .|
	unless empty? this
		new-end = prev-index this .end-index!
		p! this "end-index!" new-end
		.data![new-end]

impl! ?nth Deque .|index:Nat
	map (?data-index this index) sub[.data!]

impl! set-nth! Deque .!|index:Nat set-to:Any
	data-index = un-? (?data-index this index) ~"Can't set at index {index}; count is {count this}"
	set-nth! .data! data-index set-to

impl! empty! Deque .!|
	empty! .data!
	# TODO: change-properties!
	p! this "start-index!" 0
	p! this "end-index!" 0

Deque
