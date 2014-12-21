use
	.Bag -> each! from-stream iterator
	.Bag-Type
	..Bool -> true
	.Set!
	..Comparable! -> <!
	..control -> returning
	..Fun -> ignore
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

	\ TODO: Define it this way for all Bag!s
	from-stream -> |_ stream
		ignore _ \ TODO:Ignored vars
		returning (empty Hash-Set!) |_
			each! stream |em
				+! _ [ em ]

<! (self-type Hash-Set!) Bag-Type
	empty -> |
		Hash-Set!
			data. empty Hash-Map!

Hash-Set!
