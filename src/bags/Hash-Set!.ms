use
	.Bag -> Builder builder build-next! build-result each! iterator
	.Bag-Type
	..Bool -> true
	.Set!
	..Comparable! -> <!
	..Fun -> identity
	..maps.Map -> keys
	..maps.Map! -> assoc! un-assoc!
	..maps.Hash-Map!
	..methods -> +! -! empty empty!
	..types.Record-Type
	..types.util -> self-type

Hash-Set! = Record-Type
	doc. "TODO"
	members.
		data. Hash-Map!

<! Hash-Set! Set!
	iterator -> |_
		iterator (keys _.data

	+! -> |_ addeds
		each! addeds build-next![_]

	-! -> |_ deleteds
		each! deleteds |deleted
			un-assoc! _.data deleted

	empty! -> |_
		empty! _.data

	builder -> |
		empty Hash-Set!

<! Hash-Set! Builder
	build-next! -> |_ next
		assoc! _.data next true

	build-result -> identity

<! (self-type Hash-Set!) Bag-Type
	empty -> |
		Hash-Set!
			data. empty Hash-Map!
