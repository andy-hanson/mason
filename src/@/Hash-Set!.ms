use
	..@ each! iterator
	..Bool true
	..methods =?
	..Type.Impl-Type self-type
	..Type.Kind kind!
	..Type.Method impl! impl-for
	..Type.Obj-Type
	.@! ++! --! empty!
	.@-Type _ empty
	.Map keys
	.Map.Hash-Map!
	.Map.Map! assoc! un-assoc!
	.Set
	.Set!

Hash-Set! = Obj-Type
	doc. "
		Set that considers elements equal using =?.
		Relies on an efficient hash-code implementation.
	props.
		data. Hash-Map!

kind! (self-type Hash-Set!) @-Type
	empty -> |
		Hash-Set!
			data. empty Hash-Map!

kind! Hash-Set! Set!
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

\ TODO: This should not be necessary!
impl! =? Hash-Set! (impl-for =? Set)

Hash-Set!
