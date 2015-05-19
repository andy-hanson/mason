use
	...js new
	...Type.Kind kind! self-kind!
	...Type.Type contains?
	..@ count iterator
	..@! ++! --! empty!
	..@-Type _ empty
	.Set!

Id-Set! = global.Set

self-kind! Id-Set! @-Type
	empty -> |
		new Id-Set!

kind! Id-Set! Set!
	count -> |_
		_.size
	# TODO: Make default falling back to +!
	++! -> |_ @added
		for! em in @added
			_.add em
	empty! -> |_
		_.clear()
	# TODO: Make default falling back to -!
	--! -> |_ @deleted
		for! em in @deleted
			_.delete em
	iterator -> |_
		# TODO:ES6 Should be done by default
		_.keys()
	contains? -> |_ val
		_.has val

Id-Set!
