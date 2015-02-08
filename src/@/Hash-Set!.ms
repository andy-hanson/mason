use
	..@ each! iterator
	..Bool true
	..control returning
	..Map keys
	..Map.Hash-Map!
	..Map.Map! assoc! un-assoc!
	..methods =? <! empty empty!
	..Type.Impl-Type self-type
	..Type.Method impl! impl-for
	..Type.Obj-Type
	.@! ++! --!
	.@-Type _ from-stream
	.Set
	.Set!

Hash-Set! = Obj-Type
	doc. "
		Set that considers members equal using =?.
		Relies on an efficient hash-code implementation.
	members.
		data. Hash-Map!

<! Hash-Set! Set!
	iterator -> |_
		iterator (keys _.data

	++! -> |_ addeds
		each! addeds |added
			assoc! _.data added true

	--! -> |_ deleteds
		each! deleteds |deleted
			un-assoc! _.data deleted

	empty! -> |_
		empty! _.data

<! (self-type Hash-Set!) @-Type
	empty -> |
		Hash-Set!
			data. empty Hash-Map!

	\ TODO: Define it this way for all @!-Types
	from-stream -> |type stream
		returning (empty type) |_
			each! stream |em
				++! _ [ em ]

\ TODO: This should not be necessary!
impl! =? Hash-Set! (impl-for =? Set)

Hash-Set!
