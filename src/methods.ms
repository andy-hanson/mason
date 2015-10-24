import
	.private.bootstrap msDef
	.Type.Method

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
