use
	...Type.Kind _ kind!
	...Type.Method _ self-impl!
	..@
	..@-Type empty
	..?
use~
	.Heap-Priority-Queue
use-debug
	...compare =?
	..@ ++! empty?
	..? ?None ?some

Priority-Queue. new Kind
	doc. "
		@ whose first item will always be the smallest.
		Iteration order has no other guaranees,
		but repeatedly calling ?pop! will give the values from least to greatest.

	implmentor-test. !|type
		_ = empty type
		++! _ [ 3 1 2 ]
		assert! =? (?some 1) ?pop!_
		assert! =? (?some 2) ?pop!_
		assert! =? (?some 3) ?pop!_
		assert! empty? _
		assert! =? ?None ?pop!_

kind! Priority-Queue @

self-impl! empty Priority-Queue |
	empty Heap-Priority-Queue

# TODO: Move?
?pop!. new Method
	doc. "Takes a value from the front of the queue, unless empty?."
	args. 1
	returns. ?
