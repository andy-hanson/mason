use
	...compare =?
	...Type.Js-Method js-impl!
	...Type.Kind kind! self-kind!
	...Type.Method impl! impl-for
	...Type.Wrap-Type
	..@ iterator
	..@! ++! --! empty!
	..@-Type _ empty
	..Map.Map keys
	..Map.Hash-Map!
	..Map.Map! assoc! un-assoc!
	.Set
	.Set!

Hash-Set!. Wrap-Type
	doc. "
		Set that considers elements equal using =?.
		Relies on an efficient hash-code implementation.
	wrapped-type. Hash-Map!

self-kind! Hash-Set! @-Type
	empty -> |
		Hash-Set! (empty Hash-Map!

js-impl! iterator Hash-Set! |
	iterator (keys this.val

kind! Hash-Set! Set!
	# TODO: Make default falling back to +!
	++! -> !|_ @added
		for! em in @added
			assoc! _.val em true

	# TODO: Make default falling back to -!
	--! -> !|_ @deleted
		for! em in @deleted
			un-assoc! _.val em

	empty! -> !|_
		empty! _.val

# TODO: This should not be necessary!
impl! =? Hash-Set! (impl-for =? Set)
