use
	.assert -> ! !call
	.bags.? -> ?none ?some get-or
	.Bool -> false true
	.Comparable -> =?
	.Fun -> Act call thunk
	.maps.Map -> ?get
	.maps.Map! -> set!
	.pred-types -> Any
	.Ref -> get ref
	.Try -> oh-no!
	.types.singleton

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
		set-me = ref 0
		if! true |
			set! set-me 1
		! =? (get set-me) 1
		if! false oh-no!
	|condition:Bool result:Act
		case!
			condition
				call result
			else
				()

unreachable!. |
	oh-no! "This should not be reachable."

TODO. |
	oh-no! "This function has not yet been implemented."
