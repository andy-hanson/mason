import
	...Type.Kind _ kind!
	...Type.Method _ self-impl!
	..@
	..@-Type empty
	..?
import~
	.Heap-Priority-Queue

Priority-Queue. new Kind
	| @ whose first item will always be the smallest.
	| Iteration order has no other guaranees,
	| but repeatedly calling ?pop! will give the values from least to greatest.
	name.

kind! Priority-Queue @

self-impl! empty Priority-Queue |
	empty Heap-Priority-Queue

todo Move
?pop!. new Method
	| Takes a value from the front of the queue, unless empty?.
	name.
	args. 1
	returns. ?
