use
	..js new
	..Type contains?
	..Type.Kind kind! self-kind!
	..@ count each! iterator
	.@! ++! --! empty!
	.@-Type _ empty
	.Set!

Id-Set! = global.Set

self-kind! Id-Set! @-Type
	empty -> |
		new Id-Set!

kind! Id-Set! Set!
	count -> |_
		_.size
	++! -> |_ addeds
		each! addeds |added
			_.add added
	empty! -> |_
		_.clear ()
	--! -> |_ deleteds
		each! deleteds |deleted
			_.delete deleted
	iterator -> |_
		# TODO:ES6 Should be done by default
		_.keys ()
	contains? -> |_ val
		_.has val

Id-Set!
