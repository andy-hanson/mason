import
	.private.bootstrap msDef
	.Type.Method

region Basics
	sub. new Method
		| Implementing this allows the use of the special syntax `a[b]`.
		name.
	msDef "sub" sub

	set-sub!. new Method
		todo doc
		name.
	msDef "setSub" set-sub!

	del-sub!. new Method
		todo doc
		name.
	msDef "delSub" del-sub!

region Unsorted
	todo kill
	freeze. new Method
		| Returns a compacted and immutable version of it.
		| Does not have to return the same value, but often does.
		name.
		args. 1
		default. .|
			Object.freeze this

	frozen?. Object.isFrozen
