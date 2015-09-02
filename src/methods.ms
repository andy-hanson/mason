use
	.private.bootstrap msDef
	.Type.Method

region Basics
	sub. new Method
		name.
		doc. "Implementing this allows the use of the special syntax `a[b]`."
	msDef "sub" sub

region Unsorted
	# TODO: Move these?
	freeze. new Method
		name.
		doc. "
			Returns a compacted and immutable version of it.
			Does not have to return the same value, but often does.
		args. 1
		default. .|
			Object.freeze this

	frozen?. Object.isFrozen
