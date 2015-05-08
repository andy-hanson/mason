use
	...compare =?
	...Type.Kind kind! self-kind!
	...Type.Method impl! impl-for
	...Type.Wrap-Type
	..@ each! iterator
	..@! ++! --! empty!
	..@-Type _ empty
	..Map.Map keys
	..Map.Hash-Map!
	..Map.Map! assoc! un-assoc!
	.Set
	.Set!

Hash-Set! = Wrap-Type
	doc. "
		Set that considers elements equal using =?.
		Relies on an efficient hash-code implementation.
	wrapped-type. Hash-Map!

self-kind! Hash-Set! @-Type
	empty -> |
		Hash-Set! (empty Hash-Map!

kind! Hash-Set! Set!
	iterator -> |_
		iterator (keys _.val

	++! -> |_ addeds
		each! addeds |added
			assoc! _.val added true

	--! -> |_ deleteds
		each! deleteds |deleted
			un-assoc! _.val deleted

	empty! -> |_
		empty! _.val

# TODO: This should not be necessary!
impl! =? Hash-Set! (impl-for =? Set)

Hash-Set!
