use
	...js id=?
	...Type.Kind kind! self-kind!
	..@ _ ++ empty? iterator
	..@-Type _ empty from-stream
	.Seq _ <++' tail

LList. class
	do!
		self-kind! _ @-Type
		kind! _ Seq
	static
		empty |
			empty-LList
		from-stream |_
			<++' empty-LList _

	# TODO: class attributes
	# doc. "
	# 	Singly-linked list.

	# TODO: `data head tail`
	construct! head tail
		.head = head
		.tail = tail

	iterator ~!|
		cur ::= this
		for!
			if! empty? cur
				break!
			<~ cur.head
			cur := cur.tail

	empty? |
		id=? this empty-LList

	tail |
		.tail

	<++' |left-added:@
		iter = iterator left-added
		f = |
			value done = iter.next()
			case
				done
					this
				else
					new LList value f()
		f()

	# For the concatenation of two LLists, we can just use the second as a tail.
	++ |other
		case other
			:LList
				<++' other this
			else
				++.default.call this other

empty-LList = new LList undefined undefined
Object.defineProperty empty-LList "tail"
	value. empty-LList
