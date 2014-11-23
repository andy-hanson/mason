use
	.? -> ?none ?some
	..arithmetic-methods -> + - *
	..assert -> ! !not
	.Array \ TODO: Array!
	.Bag -> builder Builder build-next! build-result count each! empty? iterator reverse seq=?
	.Bag-Type -> empty
	.Bag! -> <+! +>! ?<pop! ?pop>! clear! bag!-test
	..Bool -> not
	..Comparable -> =?
	..control -> if
	..Fun -> identity
	..maps.Map! -> set!
	..math.Num -> modulo Nat
	..Object -> change-property!
	..pred-types -> Any
	.Range -> range
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.Record-Type
	..types.util -> self-type

Deque! = Record-Type
	doc.
		"TODO"
	members.
		data!. Array
		start-index!. Nat \ Inclusive (unless =? end-index)
		end-index!. Nat \ Exclusive

implementor! (self-type Deque!) Bag-Type
	empty -> |
		Deque!
			data!. Array 8
			start-index!. 0
			end-index!. 0

\ TODO: Define it this way for all Bag!s
impl! builder Deque! |
	empty Deque!
implementor! Deque! Builder
	build-next! -> |_ em
		+>! _ [ em ]
	build-result -> identity

region Helpers
	capacity = |_
		count _.data!

	expand! = |_
		old-data = _.data!
		old-capacity = capacity_
		new-capacity = * 2 old-capacity
		\ TODO: empty Array! new-capacity
		new-data = Array new-capacity
		each! (range 0 old-capacity) |index
			set! new-data index old-data[index]
		change-property! _ "data!" new-data

	next-index = |_ index:Nat
		modulo (+ 1 index) capacity_

	prev-index = |_ index:Nat
		modulo (- index 1) capacity_

implementor! Deque! Bag!
	iterator -> ~|_
		i ::= _.start-index!
		loop!
			case!
				=? i _.end-index!
					end-loop!
				=? i _.data!.length
					i := 0
				else
					<~ _.data![i]
					i := + 1 i

	<+! -> |_ ems:Bag
		each! (reverse ems) |em
			new-start = prev-index _ _.start-index!
			case!
				=? new-start _.end-index!
					expand!_
					<+! _ em
				else
					change-property! _ "start-index!" new-start
					set! _.data! _.start-index! em

	+>! -> |_ ems:Bag
		each! ems |em
			new-end = next-index _ _.end-index!
			case!
				=? new-end _.start-index!
					expand!_
					+>! _ em
				else
					set! _.data! _.end-index! em
					change-property! _ "end-index!" new-end

	\ TODO: Shrink on occasion

	?<pop! -> |_
		if (not empty?_) |
			x = _.data![_.start-index!]
			change-property! _ "start-index!" (next-index _ _.start-index!)
			x

	?pop>! -> |_
		if (not empty?_) |
			new-end = prev-index _ _.end-index!
			change-property! _ "end-index!" new-end
			_.data![new-end]

	clear! -> |_
		clear! _.data!
		\ TODO: change-properties!
		change-property! _ "start-index!" 0
		change-property! _ "end-index!" 0

Deque!
