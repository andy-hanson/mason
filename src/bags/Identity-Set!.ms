use
	.Bag -> count each! from-stream iterator
	.Bag-Type
	..Comparable! -> <!
	..control -> returning
	..Fun -> ignore
	..js -> global new
	..methods -> +! -! contains? empty empty!
	.Set!
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
	\ TODO: Define it this way for all Bag!s
	from-stream -> |_ stream
		ignore _ \ TODO:Ignored vars
		returning (empty Identity-Set!) |_
			each! stream |em
				_.add em

<! (self-type Identity-Set!) Bag-Type
	empty -> new

Identity-Set!
