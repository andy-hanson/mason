doc. "TODO"

use
	.arithmetic-methods -> +
	.bags.? -> get-or Opt->?
	.bags.Array
	.bags.Bag -> each! map
	.Bool -> false not true
	.Comparable -> =?
	.control -> if!
	.Error -> oh-no! try
	.Fun -> Act apply
	.js -> global
	.maps.Map -> keys
	.pred-types -> Any
	.Str -> ->Str
	.types.Type -> !subsumes

!.
	doc. "TODO"
	test. |
		! =? 1 1
		! (=? 1 1) "a"
		!fail-message "! =? 1 2" |
			! =? 1 2
		!fail-message "a" |
			! (=? 1 2) "a"
	|a b
		case! a
			:Fun
				rest-args = Array.prototype.slice.call `arguments` 1
				if! (not (apply _ rest-args)) |
					all-args = + [ _ ] rest-args
					oh-no! "! {(map all-args ->Str).join " "}"
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
				if! (apply _ rest-args) |
					all-args = + [ _ ] rest-args
					oh-no! "!not {(map all-args ->Str).join " "}"
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
				oh-no! "`{fun} {(map args ->Str).join " "}` should be `{expected}`, but got `{actual}`."

region TODO: Get rid of us!
	!fails.
		doc. "Asserts that an error is thrown by `act`."
		test. |
			!fails |
				oh-no! ()
			!fails |
				!fails |
					()
		|act:Act
			_ = try act
			! :Error "Failed to fail."

	!fails-with.
		doc. "Asserts that an error is thrown by `act` and is of type `Error-Type`."
		test. |
			!fails-with global.TypeError |
				1.undefined-method ()
		|Error-Type:Type act:Act
			_ = try act
			! :Error "Failed to fail."
			!subsumes Error-Type _ "error thrown by fails-with#act"

	!fail-message.
		doc. "TODO"
		test. |
			!fail-message "msg" |
				oh-no! "msg"
		|expected-message act:Act
			_ = try act
			! :Error "Failed to fail."
			use
				.Bool -> not
			! (not (=? _.message "[object Object]")) _.message \ TODO: REMOVE
			! =? _.message expected-message

