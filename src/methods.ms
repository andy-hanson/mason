use
	.private.bootstrap msDef
	.Type.Method

region Basics
	sub. new Method
		doc. "Implementing this allows the use of the special syntax `a[b]`."
	msDef "sub" sub

region Unsorted
	# TODO: Move these?
	freeze. new Method
		doc. "
			Returns a compacted and immutable version of it.
			Does not have to return the same value, but often does.
		args. 1
		default. .|
			Object.freeze this

	frozen?. Object.isFrozen
