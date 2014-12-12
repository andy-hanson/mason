use
	.Bag -> Builder builder build-next! build-result count each! iterator
	.Bag-Type
	..Comparable! -> <!
	..Fun -> identity
	..js -> global new
	..methods -> +! -! empty empty!
	.Set!
	..types.Type -> contains?
	..types.util -> self-type

Identity-Set! = global.Set

<! Identity-Set! Set!
	count -> |_
		_.size
	+! -> |_ addeds
		each! addeds |added
			_.add added
	empty! -> |_
		_.clear ()
	-! -> |_  deleteds
		each! deleteds |deleted
			_.delete deleted
	iterator -> |_
		\ TODO:ES6 Should be done by default
		_.keys ()
	contains? -> |_ val
		_.has val

	builder -> |
		empty Identity-Set!

<! Identity-Set! Builder
	build-next! -> |_ next
		_.add next
	build-result -> identity

<! (self-type Identity-Set!) Bag-Type
	empty -> new

Identity-Set!
