import
	...Type.Kind _ kind!
	...Type.Method _ self-impl!
	..@
	..@-Type empty
	..?
import~
	.Heap-Priority-Queue
import-debug
	...compare =?
	..@ ++! empty?
	..? ?None ?some

Priority-Queue. new Kind
	| @ whose first item will always be the smallest.
	| Iteration order has no other guaranees,
	| but repeatedly calling ?pop! will give the values from least to greatest.
	name.
	implmentor-test. !|type
		_ = empty type
		++! _ [3 1 2]
		assert! =? (?some 1) ?pop!_
		assert! =? (?some 2) ?pop!_
		assert! =? (?some 3) ?pop!_
		assert! empty? _
		assert! =? ?None ?pop!_

kind! Priority-Queue @

self-impl! empty Priority-Queue |
	empty Heap-Priority-Queue

todo Move
?pop!. new Method
	| Takes a value from the front of the queue, unless empty?.
	name.
	args. 1
	returns. ?
