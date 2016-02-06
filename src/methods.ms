import
	.private.bootstrap msDef

sub. method \...args
	| Implementing this allows the use of the special syntax `a[b]`.
	abstract
msDef 'sub sub

set-sub!. method \...args
	| Implementing this allows the use of the special syntax `a[b] = c`.
	abstract
msDef 'setSub set-sub!

del-sub!. method \...args
	| Implementing this allows the use of the special syntax `del a[b]`.
	abstract
msDef 'del del-sub!
