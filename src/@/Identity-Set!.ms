use
	..js global new
	..methods <!
	..Type contains?
	..Type.Impl-Type self-type
	..@ count each! iterator
	.@! ++! --! empty!
	.@-Type _ empty
	.Set!

Identity-Set! = global.Set

<! Identity-Set! Set!
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
		\ TODO:ES6 Should be done by default
		_.keys ()
	contains? -> |_ val
		_.has val

<! (self-type Identity-Set!) @-Type
	empty -> new

Identity-Set!
