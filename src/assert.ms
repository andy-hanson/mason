doc. "Functions that should be use to debug and test code."

use
	.arithmetic-methods -> +
	.bags.Array
	.bags.Bag -> each! empty? map
	.Bool -> false not true
	.Comparable -> =?
	.control -> if!
	.Fun -> apply Pred
	.maps.Map -> keys
	.show -> inspect
	.Str -> indent
	.Try -> fails-with? oh-no!

\ TODO: !-Error type?
!.
	doc. "
		Pronounced 'assert'.
		It may be called as:
			! fun arg arg arg ...
				Calls fun on the arguments.
				fun must return a Bool.
				If it returns false, an error will be thrown.
				The error will contain information about fun and its arguments.
			! bool message
				Same as:
					if! (not bool) |
						oh-no! message
	test. |
		! =? 1 1
		! true "a"
		one-not-two = "
			Expected =?
				1
				2
		! fails-with? one-not-two |
			! =? 1 2
		! fails-with? "a" |
			! (=? 1 2) "a"
	|a b
		case! a
			:Fun
				rest-args = Array.prototype.slice.call `arguments` 1
				if! (not (Fun.prototype.apply.call _ () rest-args)) |
					\ TODO: .join -> make-string
					oh-no! "
						Expected {a}
							{indent ((map rest-args inspect).join "\n")}
			:Bool
				if! not_ |
					oh-no! b
			else
				oh-no! "First argument to `!` must be Fun or Bool. Got {_}."

!not.
	doc. "Like `!`, but inverts the condition."
	test. |
		!not false
		!not =? 1 2
	|a b
		case! a
			:Fun
				rest-args = Array.prototype.slice.call `arguments` 1
				if! (Fun.prototype.apply.call _ () rest-args) |
					oh-no! "
						Unexpected {a}
							{indent ((map rest-args inspect).join "\n")}
			:Bool
				if! _ |
					oh-no! b
			else
				oh-no! "First argument to `!` must be Fun or Bool. Got {_}."

!call.
	doc. "
		For each entry in args->result, asserts that calling `fun` with arguments of key will `=?` the value.
	test. |
		!call +
			[ 1 1 ] -> 2
		nope = "
			Calling + on:
				1
				1
			Should be:
				3
			Got:
				2
		! fails-with? nope |
			!call +
				[ 1 1 ] -> 3
	|fun:Fun args->result:Map \ TODO: Map[Array Any]
		each! (keys args->result) |args
			expected = args->result[args]
			actual = apply fun args
			if! (not (=? actual expected)) |
				oh-no! ~"
					Calling {fun} on:
						{indent ((map args inspect).join "\n")}
					Should be:
						{indent (inspect expected)}
					Got:
						{indent (inspect actual)}

!call?.
	doc. "TODO"
	test. |
		!call? empty?
			. [ ]
		! fails-with? "Expected empty? (Array)[ 0 ]" |
			!call? empty?
				. [ 0 ]
	|pred:Pred accept-args:Map
		each! accept-args |accept-me
			if! (not (pred accept-me)) |
				oh-no! ~"
					Expected {pred} {inspect accept-me}

!not-call?.
	doc. "TODO"
	test. |
		!not-call? empty?
			. [ 0 ]
		! fails-with? "Unexpected empty? (Array)[ ]" |
			!not-call? empty?
				. [ ]
	|pred:Pred reject-args:Map
		each! reject-args |reject-me
			if! (pred reject-me) |
				oh-no! ~"
					Unexpected {pred} {inspect reject-me}