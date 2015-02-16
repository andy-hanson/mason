use
	..Fun call
	..Generator!
	..js reference=?
	..methods <! empty empty?
	..Obj! p!
	..Type.Impl-Type self-type
	..Type.Obj-Type
	..@ _ ++' iterator
	.@-Type _ from-stream
	.Seq _ <++' tail

LList. Obj-Type
	doc. "
		Singly-linked list.
	props.
		head.
		tail.

empty-LList = LList head. undefined tail. undefined
p! empty-LList "tail" empty-LList

<! (self-type LList) @-Type
	empty -> |
		empty-LList

	from-stream -> |_
		<++' empty-LList _

<! LList Seq
	empty? -> |_
		reference=? _ empty-LList

	iterator -> ~|case!
		empty?_
			()
		else
			<~ _.head
			<~~ iterator _.tail

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
					LList
						head. value
						tail. f()
		f()

	\ For the concatenation of two LLists, we can just use the second as a tail.
	++' -> |a b
		case b
			:LList
				<++' b a
			else
				++'.default a b
