use
	.assert -> ! !call
	.bags.? -> ?none ?some get-or
	.bags.Array!
	.bags.Seq
	.bags.Seq! -> +>!
	.bags.Bag-Type -> empty
	.basic-methods -> freeze
	.Bool -> false true
	.Comparable -> =?
	.Fun -> Act call ignore thunk
	.maps.Map -> ?get
	.pred-types -> Any
	.Try -> oh-no!
	.types.singleton

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
		dispatch = get-or (?get cases val) ~cases[switch-else]
		call dispatch

switch-else. singleton
	doc. "TODO"

if.
	doc. "Iff `condition`, evaluates `result` and puts it in `?some`."
	test. |
		[ true (thunk 0) ] -> ?some 0
		[ false (thunk 0) ] -> ?none
	|:? condition:Bool result:Fun
		case
			condition
				?some (call result)
			else
				?none

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
	doc. "TODO"
	|
		oh-no! "This should not be reachable."

TODO.
	doc. "TODO"
	|
		oh-no! "This function has not yet been implemented."
