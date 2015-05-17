use
	.Function Action
	.js defined?
	.methods freeze
	.Type.Pred-Type Any Opt
	.Type.Wrap-Type
use~
	.@.@-Type empty
	.@.? _ ?-or
	.@.Map.Map _ ?get
	.@.Seq.Array!
	.@.Seq.Seq
	.@.Seq.Seq! ++>!
	.Try oh-no!
use-debug
	.! _ !call
	.compare =?
	.math.methods +

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

	if.
		doc. "Iff `condition`, evaluates `result` and puts it in a `?`."
		test. |
			[ true 1 ] -> ? 1
			[ false 1 ] -> empty ?
		|:? condition:Boolean ~result
			case
				condition
					? result
				else
					empty ?

	if!.
		doc. "Runs `result` iff `condition`."
		test. |
			! =? [ 0 ] (build |yield
				if! true |
					yield 0
			if! false oh-no!
		|condition:Boolean result:Action
			case!
				condition
					result()
				else
					pass

unreachable!.
	doc. "Call this to mark code as unreachable."
	|
		oh-no! "This should not be reachable."

TODO.
	doc. "Placeholder for something which you really ought to implement one of these days."
	|
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

region Loops
	loop.
		doc. "
			Maintains a value representing state, and continually applies `transform-state` to it until that returns an End-Loop.
			Returns the value inside that End-Loop.
		test. |
			f = |case
				=? _ 10
					End-Loop "end"
				else
					+ _ 1
			[ 0 f ] -> "end"

		|init-state transform-state:Function
			state ::= init-state
			output ::= null
			loop!
				case! transform-state state
					:End-Loop
						output := _.val
						end-loop!
					else
						state := _
			output

	End-Loop. Wrap-Type
		doc. "Wrap a value in this to indicate that you want this to be the return value of the loop."
