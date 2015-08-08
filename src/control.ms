use
	.js defined?
	.methods freeze
	.Type.Pred-Type Opt
use~
	.@.Seq.Seq _ ++>!
use-debug
	.compare =?

opr.
	doc. "Fills in an Opt with a default value."
	test. |
		[ undefined 1 ] -> 1
		[ 1 2 ] -> 1
	|_:Opt ~default
		case
			defined?_
				_
			else
				default

build.
	doc. "
		Passes in a `yield` Function to `calls-yield`.
		Returns a Seq of what `calls-yield` called `yield` with.
	test. !|
		assert! =? [ 0 1 ] (build |yield
			yield 0
			yield 1
	|:Seq calls-yield:Function
		yielded = [ ]
		yield = |_
			++>! yielded [ _ ]
		calls-yield yield
		freeze yielded

unreachable!.
	doc. "Call this to mark code as unreachable."
	!|
		throw! "This should not be reachable."

TODO.
	doc. "Placeholder for something which you really ought to implement one of these days."
	!|
		throw! "This function has not yet been implemented."
