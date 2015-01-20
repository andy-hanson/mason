use
	.Bool -> false true
	.Comparable -> =?
	.Fun -> Act call ignore thunk
	.methods -> => empty freeze
	.pred-types -> Any
use~
	.! -> !call
	.@.? -> get-or full-?
	.@.Array!
	.@.Seq
	.@.Seq! -> +>!
	.maps.Map -> ?get
	.Ref! -> get ref set!
	.Try -> oh-no!

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
			+>! yielded [ _ ]
		calls-yield yield
		freeze yielded

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
		[ true (thunk 0) ] -> => ? [ 0 ]
		[ false (thunk 0) ] -> empty ?
	|:? condition:Bool result:Fun
		case
			condition
				full-? (result ()
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
				call result
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
		doc. "TODO"
		test. |
			"TODO"
		|init-state transform-state:Fun
			state = ref init-state
			output = ref ()
			loop!
				case! transform-state (get state)
					_.is-end-loop
						set! output _.ret
						end-loop!
					else
						set! state _
			get output

	\ TODO: Make this a Wrapper-Type
	end-loop. |r
		is-end-loop.
		ret. r

