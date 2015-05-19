use
	...js id=?
	...Object! p!
	...Type.Js-Method js-impl!
	...Type.Kind kind! self-kind!
	...Type.Tuple
	..@ _ ++ empty? iterator
	..@-Type _ empty from-stream
	.Seq _ <++' tail

LList = Tuple
	doc. "
		Singly-linked list.
	props. [ "head" "tail"

empty-LList = LList undefined undefined
p! empty-LList "tail" empty-LList

self-kind! LList @-Type
	empty -> |
		empty-LList
	from-stream -> |_
		<++' empty-LList _

js-impl! iterator LList ~|
	cur ::= this
	for!
		if! empty? cur
			break!
		<~ cur.head
		cur := cur.tail

kind! LList Seq
	empty? -> |_
		id=? _ empty-LList

	tail -> |_
		_.tail

	<++' -> |_ left-added:@
		iter = iterator left-added
		f = |
			value done = iter.next()
			case
				done
					_
				else
					LList value f()
		f()

	# For the concatenation of two LLists, we can just use the second as a tail.
	++ -> |a b
		case b
			:LList
				<++' b a
			else
				++.default a b

LList
