use
	.Bag -> each! iterator
	.Bag-Type -> from-stream
	..Bool -> true
	.Set!
	..Comparable! -> <!
	..control -> returning
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
		each! addeds |added
			assoc! _.data added true

	-! -> |_ deleteds
		each! deleteds |deleted
			un-assoc! _.data deleted

	empty! -> |_
		empty! _.data

<! (self-type Hash-Set!) Bag-Type
	empty -> |
		Hash-Set!
			data. empty Hash-Map!

	\ TODO: Define it this way for all Bag!-Types
	from-stream -> |type stream
		returning (empty type) |_
			each! stream |em
				+! _ [ em ]

Hash-Set!
