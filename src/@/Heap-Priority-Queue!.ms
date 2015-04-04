use
	..Bool and not
	..compare <?
	..control if! returning
	..math.Num int/
	..math.methods + - *
	.Priority-Queue! _ ?pop!
	..Type.Kind kind! self-kind!
	..Type.Wrap-Type
	.@ count each! empty? iterator map'
	.@! ++! empty!
	.@-Type _ empty
	.? un-?
	.Array!
	.Seq ?first
	.Seq! ?pop>! set-nth!

Heap-Priority-Queue!. Wrap-Type
	doc. "Default implementation for Priority-Queue!."
	wrapped-type. Array!

self-kind! Heap-Priority-Queue! @-Type
	empty -> |
		Heap-Priority-Queue! (empty Array!

kind! Heap-Priority-Queue! Priority-Queue!
	++! -> |_ added
		each! added add![_.val]
	?pop! -> |_
		heap = _.val
		map' (?first heap) |first
			returning first |
				last-leaf = un-? (?pop>! heap
				if! (not empty?_) |
					fix-down! heap last-leaf
	empty? -> |_
		empty? _.val
	empty! -> |_
		empty! _.val
	iterator -> |_
		iterator _.val

region Implementation
	# We use a min-heap.
	idx-left = |idx
		+ 1 (* 2 idx
	idx-right = |idx
		+ 2 (* 2 idx
	idx-parent = |idx
		- (int/ (+ 1 idx) 2) 1

	add! = |heap em
		heap.push em
		fix-up! heap em

	# Smallest items should go at the top, so keep moving `val` up while it's smaller than its parent.
	fix-up! = |heap val
		rec! = |idx
			~ip = idx-parent idx
			~parent = heap[ip]
			case!
				and (<? 0 idx) ~(<? val parent)
					set-nth! heap idx parent
					rec! ip
				else
					set-nth! heap idx val
		rec! (- (count heap) 1

	# Keep moving `val` down while it's larger than either child.
	# Prefer moving to the left child because this is a left-leaning heap.
	fix-down! = |heap val
		size = count heap
		rec! = |idx
			il = idx-left idx
			~left = heap[il]
			l< = and (<? il size) ~(<? left val
			ir = idx-right idx
			~right = heap[ir]
			r< = and (<? ir size) ~(<? right val

			fill! = |val
				set-nth! heap idx val
			rec-left! = |
				fill! left
				rec! il
			rec-right! = |
				fill! right
				rec! ir
			case!
				l<
					case!
						and r< ~(<? right left)
							rec-right!()
						else
							rec-left!()
				r<
					rec-right! ()
				else
					fill! val
		rec! 0
