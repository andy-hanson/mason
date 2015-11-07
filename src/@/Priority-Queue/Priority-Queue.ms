import
	..@
	..@-Type empty
	..?
import~
	.Heap-Priority-Queue

Priority-Queue. kind @
	| @ whose first item will always be the smallest.
	| Iteration order has no other guaranees,
	| but repeatedly calling ?pop! will give the values from least to greatest.

	static
		empty |
			empty Heap-Priority-Queue

todo Move
?pop!. method |:?
	| Takes a value from the front of the queue, unless empty?.
	abstract
