use
	.private.bootstrap Obj msDef
	.Type.Method

region Basics
	sub. Method
		doc. "Implementing this allows the use of the special syntax `a[b]`."
	msDef "sub" sub

region Unsorted
	# TODO: Move these?
	freeze. Method
		doc. "
			Returns a compacted and immutable version of it.
			Does not have to return the same value, but often does.
		# TODO: Lazy default?
		default. |_
			Obj.freeze _
	# TODO: Lazy export?
	frozen?. |_
		Obj.isFrozen _

