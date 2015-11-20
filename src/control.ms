import
	todo compare =?, math.methods -
	.js defined? id=? js- js<=
	.Type.Pred-Type Opt
import~
	.@.Seq.Seq ++>!

do-times!. !|n-times action
	| Performs `action` `n-times` times.
	todo n-times:Nat
	assert js<= 0 n-times
	for
		if id=? n-times 0
			break
		action()
		n-times := js- n-times 1

opr. |_:Opt ~default
	| Fills in an Opt with a default value.
	cond defined?_ _ default

todo SYNTAX build keyword
build. |calls-yield:Function
	| Passes in a `yield` Function to `calls-yield`.
	| Returns a Seq of what `calls-yield` called `yield` with.
	yielded = []
	yield = |_
		++>! yielded [_]
	calls-yield yield
	yielded
