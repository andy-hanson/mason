use
	...compare =? <?
	...math.Number int/
	...math.methods + - *
	...Type.Kind kind! self-kind!
	..@ ++! count empty! empty? iterator
	..@-Type _ empty
	..Seq.Seq set-nth!
	.Priority-Queue _ ?pop!

Heap-Priority-Queue. class
	| Default implementation for Priority-Queue.

	do!
		self-kind! _ @-Type
		kind! _ Priority-Queue

	static
		todo @-Type default
		empty |
			new this

	construct!
		.array = []

	iterator |
		iterator .array

	++! !|added
		for! em in added
			add! .array em

	?pop! |
		unless empty? this
			with .array[0]
				fix-down! .array

	empty? |
		empty? .array

	empty! !|
		empty! .array


region Private
	|| We use a min-heap.
	index-left-child = |idx
		+ 1 (* 2 idx)
	index-parent = |idx
		- (int/ (+ 1 idx) 2) 1

	add! = !|heap val
		| We move this 'hole' up the heap, swapping with its parent,
		| until we find a place where `val` is greater than its parent.
		heap.push()
		i-cur ::= count heap
		for!
			if! =? i-cur 0
				set-nth! heap 0 val
				break!
			i-parent = index-parent i-cur
			parent = heap[i-parent]
			unless! <? val parent
				set-nth! heap i-cur val
				break!
			set-nth! heap i-cur parent
			i-cur := i-parent

	fix-down! = !|heap
		val = heap.pop()
		size = count heap
		unless! =? size 0
			|| There is a 'hole' at the first element.
			|| Move the hole down while it's larger than either child.
			|| (Prefer moving to the left child.)
			|| When it can move no further, put `val` in there.
			i-cur ::= 0
			go! = !|goto-idx
				set-nth! heap i-cur heap[goto-idx]
				i-cur := goto-idx
			ok-index? = |_
				<? _ size
			for!
				i-left-child = index-left-child i-cur
				unless! ok-index? i-left-child
					break!
				left = heap[i-left-child]
				i-right-child = + i-left-child 1
				unless! ok-index? i-right-child
					if! <? left val
						go! i-left-child
					break!
				right = heap[i-right-child]
				case!
					<? left val
						go! cond (<? right left) i-right-child i-left-child
					<? right val
						go! i-right-child
					else
						break!
			set-nth! heap i-cur val
