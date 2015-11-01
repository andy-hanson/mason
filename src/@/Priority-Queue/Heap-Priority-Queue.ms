import
	...compare =? <?
	...math.Number int/
	...math.methods + - *
	...Type.Kind self-kind!
	..@ ++! count empty! empty? iterator
	..@-Type _ empty
	.Priority-Queue _ ?pop!

Heap-Priority-Queue. class kind Priority-Queue
	| Default implementation for Priority-Queue.

	do!
		self-kind! _ @-Type

	static
		todo @-Type default
		empty |
			new this

	construct!
		.array = []

	iterator |
		iterator .array

	++! !|added
		for! added
			add! .array _

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
				heap[0] := val
				break!
			i-parent = index-parent i-cur
			parent = heap[i-parent]
			unless! <? val parent
				heap[i-cur] := val
				break!
			heap[i-cur] := parent
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
				heap[i-cur] := heap[goto-idx]
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
			heap[i-cur] := val
