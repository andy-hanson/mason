use
	...Type.Kind _ kind!
	...Type.Method
	..@!
	..?
use-debug
	...!
	...compare =?
	..@ empty?
	..@! ++!
	..@-Type empty

Priority-Queue! = Kind
	doc. "
		@ whose first item will always be the smallest.
		Iteration order has no other guaranees,
		but repeatedly calling ?pop! will give the values from least to greatest.
	implementor-test. !|type
		_ = empty type
		++! _ [ 3 1 2 ]
		! =? (? 1) ?pop!_
		! =? (? 2) ?pop!_
		! =? (? 3) ?pop!_
		! empty? _

kind! Priority-Queue! @!

# TODO: Move?
?pop!. Method
	doc. "Takes a value from the front of the queue, unless empty?."
	args. 1
	returns. ?

Priority-Queue!
