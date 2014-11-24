doc. "TODO"

use
	.arithmetic-methods -> +
	.bags.? -> get-or Opt->?
	.bags.Array
	.bags.Bag -> each! map
	.Bool -> false not true
	.Comparable -> =?
	.control -> if!
	.Fun -> Act apply
	.js -> global
	.maps.Map -> keys
	.pred-types -> Any
	.show -> inspect
	.Str -> indent
	.Try -> fails-with? oh-no!
	.types.Type -> !subsumes

!.
	doc. "TODO"
	test. |
		! =? 1 1
		! (=? 1 1) "a"
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
					all-args = + [ _ ] rest-args
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
	doc. "TODO"
	test. |
		"TODO"
	\ TODO: Re-use code
	|a b
		case! a
			:Fun
				rest-args = Array.prototype.slice.call `arguments` 1
				if! (Fun.prototype.apply.call _ () rest-args) |
					all-args = + [ _ ] rest-args
					oh-no! "!not {(map all-args show).join " "}"
			:Bool
				if! _ |
					oh-no! b
			else
				oh-no! "First argument to `!` must be Fun or Bool. Got {_}."

!call.
	doc. "TODO"
	test. |
		"TODO"
	|fun:Fun args->result:Map \ TODO: [Array Any]
		each! (keys args->result) |args
			expected = args->result[args]
			actual = apply fun args
			if! (not (=? actual expected)) |
				oh-no! ~"
					Calling {fun} on:
						{indent ((map args inspect).join "\n")}`
					Should be:
						{indent (inspect expected)}
					Got:
						{indent (inspect actual)}
