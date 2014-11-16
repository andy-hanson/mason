use
	.assert -> !=
	.bags.? -> ?none ?some
	.Bool -> false not true
	.Error -> oh-no!
	.Fun -> Act call thunk
	.maps.Map
	.pred-types -> Any

switch.
	doc. "Calls the Fun that `cases` associates with `val`."
	test. |
		two = switch 1
			1 -> |
				2
			2 -> |
				3
		!= two 2
	|val:Any cases:Map[Any Fun]
		cases[val] ()

if.
	doc. "Iff `condition`, evaluates `result` and puts it in `?some`."
	test. |
		!= (if true (thunk 0)) (?some 0)
		!= (if false (thunk 0)) ?none
	|:? condition:Bool result:Fun
		case
			condition
				?some (call result)
			else
				?none

\unless.
\	doc. "Iff `condition` is false, evaluates `result` and puts it in `?some`."
\	test. |
\		!= (unless true (thunk 0)) ?none
\		!= (unless false (thunk 0)) (?some 0)
\	|:? condition:Bool result:Fun
\		if (not condition) result

if!.
	doc. "Runs `result` iff `condition`."
	test. |
		a ::= 0
		if! true |
			a := 1
		!= a 1
		if! false oh-no!
	|condition:Bool result:Act
		case!
			condition
				call result
			else
				()

\unless!.
\	doc. "Runs `result` iff `condition` is false."
\	test. |
\		unless! true oh-no!
\	|condition:Bool result:Act
\		if! (not condition) result
