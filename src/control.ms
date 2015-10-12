import
	.js defined? js- js<=
	.methods freeze
	.Type.Pred-Type Opt
import~
	.@.Seq.Seq ++>!

do-times!. !|n-times action
	| Performs `action` `n-times` times.
	assert! js<= 0 n-times
	n ::= n-times
	for!
		unless! n
			break!
		action()
		n := js- n 1

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
	freeze yielded

todo kill
unreachable!. !|
	| Call this to mark code as unreachable.
	throw! "This should not be reachable."

todo kill
TODO. !|
	| Placeholder for something which you really ought to implement one of these days.
	throw! "This function has not yet been implemented."
