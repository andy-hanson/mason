use
	.js defined?
	.methods freeze
	.Type.Pred-Type Any Opt
use~
	.@.@-Type empty
	.@.? ?-or
	.@.Map.Map _ ?get
	.@.Seq.Array!
	.@.Seq.Seq
	.@.Seq.Seq! ++>!
use-debug
	.! _ !call
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
	test. |
		! =? [ 0 1 ] (build |yield
			yield 0
			yield 1
	|:Seq calls-yield:Function
		yielded = empty Array!
		yield = |_
			++>! yielded [ _ ]
		calls-yield yield
		freeze yielded

region Conditional execution
	# TODO:SYNTAX
	switch.
		doc. "Calls the Function that `cases` associates with `val`."
		test. |
			n = |x
				switch x
					1 -> |
						"one"
					2 -> |
						"two"
					switch-else -> |
						"three"
			!call n
				[ 1 ] -> "one"
				[ 2 ] -> "two"
				[ 3 ] -> "three"
		|val:Any cases:Map[Any Function]
			(?-or (?get cases val) ~cases[switch-else])()
	switch-else.
		doc. "Special object used as default for `switch` statements."

unreachable!.
	doc. "Call this to mark code as unreachable."
	!|
		oh-no! "This should not be reachable."

TODO.
	doc. "Placeholder for something which you really ought to implement one of these days."
	!|
		oh-no! "This function has not yet been implemented."

returning.
	doc. "Calls `do-after` and returns `returned`."
	test. |
		! =? [ 0 ] (build |yield
			! =? 1 (returning 1 |
				yield 0
	|returned:Any do-after:Function
		do-after returned
		returned
