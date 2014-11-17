use
	.? -> ?none ?some
	..arithmetic-methods -> + - *
	..assert -> ! !not
	.Array \ TODO: Array!
	.Bag -> Bag-Type count each! empty empty? iterator seq=?
	.Bag! -> <+! +>! ?<pop! ?pop>!
	..Bool -> not
	..Comparable -> =?
	..control -> if
	..maps.Map! -> set!
	..math.Num -> Nat remainder
	..Object -> change-property! set-property!
	..pred-types -> Any
	.Range -> range
	..types.Interface -> implementor! implementor-direct!
	..types.Record-Type

Deque! = Record-Type
	doc.
		"TODO"
	test. |
		_ = empty Deque!
		+>! _ [ 1 2 ]
		! seq=? _ [ 1 2 ]
		!not empty?_
		! =? ?pop>!_ (?some 2)
		! =? ?pop>!_ (?some 1)
		! =? ?pop>!_ ?none

	members.
		data!. Array
		start-index!. Nat \ Inclusive (unless =? end-index)
		end-index!. Nat \ Exclusive

implementor-direct! Deque! Bag-Type
	empty -> |
		Deque!
			data!. Array 8
			start-index!. 0
			end-index!. 0

region Helpers
	expand! = |_
		old-data = _.data!
		old-capacity = count old-data
		new-capacity = * 2 old-capacity
		\ TODO: empty Array! new-capacity
		new-data = Array new-capacity
		each! (range 0 old-capacity) |index
			set! new-data index old-data[index]
		set-property! _ "data!" new-data

	next-index = |_ index:Nat
		remainder (+ 1 index) (count _.data!)

	prev-index = |_ index:Nat
		remainder (- index 1) (count _.data!)

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

Deque!
