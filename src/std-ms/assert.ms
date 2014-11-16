doc. "TODO"

use
	.bags.? -> get-or Opt->?
	.bags.Bag -> empty?
	.Bool -> false not true
	.Comparable -> =?
	.control -> if!
	.Error -> oh-no! try
	.Fun -> Act
	.js -> global
	.pred-types -> Any
	.types.Type -> !subsumes

!.
	doc. "Fails with `message` when `cond` is false."
	test. |
		! true
		!fail-message "a" |
			! false ~"a"
	|cond:Bool ~error
		if! (not cond) |
			\ TODO: Optional arguments
			err ~= get-or (Opt->? error) "Assertion failed."
			oh-no! ~err

!=.
	doc. "Equivalent to `! (=? a b)`, but with a better message."
	test. |
		!= 0 0
		!fails |
			!= 0 1
	|a b
		! (=? a b) ~"{a} ≠ {b}"

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
		!= _.message expected-message
