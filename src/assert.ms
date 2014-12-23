doc. "Functions that should be use to debug and test code."

use
	.bags.Bag -> count each! map
	.Bool -> false not true
	.Comparable -> =?
	.control -> if!
	.Fun -> apply Pred
	.maps.Map -> each-pair!
	.methods -> => + empty?
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
			! bool ~message
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
	|a ...args
		case! a
			:Fun
				if! (not (Fun.prototype.apply.call _ () args)) |
					oh-no! "
						Expected {a}
							{indent (=> Str (map args inspect) "\n")}
			:Bool
				! =? (count args) 1
				if! not_ |
					oh-no! args[0]
			else
				oh-no! "First argument to `!` must be Fun or Bool. Got {_}."

!not.
	doc. "Like `!`, but inverts the condition."
	test. |
		!not false
		!not =? 1 2
	|a ...args
		case! a
			:Fun
				if! (Fun.prototype.apply.call _ () args) |
					oh-no! "
						Unexpected {a}
							{indent ((map args inspect).join "\n")}
			:Bool
				if! _ |
					oh-no! args[0]
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
		each-pair! args->result |args expected-res
			actual = apply fun args
			if! (not (=? actual expected-res)) |
				oh-no! ~"
					Calling {fun} on:
						{indent ((map args inspect).join "\n")}
					Should be:
						{indent (inspect expected-res)}
					Got:
						{indent (inspect actual)}

!call?.
	doc. "TODO"
	test. |
		!call? empty?
			. [ ]
		fw = "
			Expected empty? (=> Array
				. 0
		! fails-with? fw |
			!call? empty?
				. [ 0 ]
	|pred:Pred accept-args:Bag
		each! accept-args |accept-me
			if! (not (pred accept-me)) |
				oh-no! ~"
					Expected {pred} ({inspect accept-me}

!not-call?.
	doc. "TODO"
	test. |
		!not-call? empty?
			. [ 0 ]
		! fails-with? "Unexpected empty? (empty Array" |
			!not-call? empty?
				. [ ]
	|pred:Pred reject-args:Bag
		each! reject-args |reject-me
			if! (pred reject-me) |
				oh-no! ~"
					Unexpected {pred} ({inspect reject-me}
