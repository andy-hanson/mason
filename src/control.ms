use
	.Bool
	.Fun _ Act call
	.methods empty freeze
	.Obj! p!
	.Type.Pred-Type Any
	.Type.Wrap-Type
use~
	.@.? _ get-or
	.@.Array!
	.@.Seq
	.@.Seq! ++>!
	.Map _ ?get
	.Try oh-no!
debug use~
	.! _ !call
	.Bool false true
	.math.methods +
	.methods =?
	.Fun ignore thunk

build.
	doc. "
		Passes in a `yield` function to `calls-yield`.
		Returns a Seq of what `calls-yield` called `yield` with.
	test. |
		! =? [ ] (build ignore)
		! =? [ 0 1 ] (build |yield
			yield 0
			yield 1
	|:Seq calls-yield:Fun
		yielded = empty Array!
		yield = |_
			++>! yielded [ _ ]
		calls-yield yield
		freeze yielded

region Conditional execution
	switch.
		doc. "Calls the Fun that `cases` associates with `val`."
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
		|val:Any cases:Map[Any Fun]
			dispatch:Fun = get-or (?get cases val) ~cases[switch-else]
			call dispatch
	switch-else.
		doc. "Special object used as default for `switch` statements."

	if.
		doc. "Iff `condition`, evaluates `result` and puts it in a `?`."
		test. |
			[ true (thunk 0) ] -> ? 0
			[ false (thunk 0) ] -> empty ?
		|:? condition:Bool result:Fun
			case
				condition
					? result()
				else
					empty ?

	if!.
		doc. "Runs `result` iff `condition`."
		test. |
			! =? [ 0 ] (build |yield
				if! true yield[0]
			if! false oh-no!
		|condition:Bool result:Act
			case!
				condition
					result()
				else
					()

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
			! =? 1 (returning 1 yield[0])
	|returned:Any do-after:Fun
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

		|init-state transform-state:Fun
			state = Ref! init-state
			output = Ref! ()
			loop!
				case! transform-state (get state)
					:End-Loop
						set! output _.val
						end-loop!
					else
						set! state _
			get output

	End-Loop. Wrap-Type
		doc. "Wrap a value in this to indicate that you want this to be the return value of the loop."

region Ref!
	Ref!. Wrap-Type
		doc. "
			Mutable holder of some value.
			Create a Ref! by passing in the initial value.
			Change this at any time with `set!`.
			Use `get` at any time to get the current value.

	set!.
		doc. "Change the current value."
		test. |
			_ = Ref! ()
			set! _ 0
			! =? get_ 0
		|_:Ref! new-value
			p! _ "val" new-value

	\ TODO: Just override `map!`
	mod!.
		doc. "Shorthand for `set! ref (f (get ref))"
		test. |
			_ = Ref! 0
			mod! _ +[1]
			! =? get_ 1
		|_:Ref! f:Fun
			set! _ (f get_)

	get.
		doc. "Current value."
		test. |
			[ (Ref! 0) ] -> 0
		|_:Ref!
			_.val

