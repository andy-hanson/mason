use
	...js id=?
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Tuple
	..@ _ ++ empty? iterator
	..@-Type _ empty from-stream
	.Seq _ <++' tail

LList. Tuple
	doc. "
		Singly-linked list.
	props. [ "head" "tail"

empty-LList = LList undefined undefined
empty-LList.tail := empty-LList

self-kind! LList @-Type
self-impl! empty LList |
	empty-LList
self-impl! from-stream LList |_
	<++' empty-LList _

impl! iterator LList .~!|
	cur ::= this
	for!
		if! empty? cur
			break!
		<~ cur.head
		cur := cur.tail

kind! LList Seq
impl! empty? LList .|
	id=? this empty-LList

impl! tail LList |_
	_.tail

impl! <++' LList |_ left-added:@
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
impl! ++ LList .|other
	case other
		:LList
			<++' other this
		else
			++.default.call this other
