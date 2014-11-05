doc. "TODO"

use
	.Bag -> empty?
	.Bool -> false true unless!
	.Comparable -> =?
	.Error -> ?catch oh-no!
	.Fun -> Act
	.js -> global
	.pred-types -> Any
	.Type -> !subsumes

!.
	doc. "Fails with `message` when `cond` is false."
	test. |
		! true
		!fails |
			! false
	|cond:Bool ~message
		unless! cond |
			oh-no! case message
				:Any
					_
				else
					"!"

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
		case! ?catch act
			empty?_
				oh-no! "Failed to fail."
			else
				()

!fails-with.
	doc. "Asserts that an error is thrown by `act` and is of type `Error-Type`."
	test. |
		!fails-with global.TypeError |
			1.undefined-method ()
	|Error-Type act:Act
		case! ?catch act
			empty?_
				oh-no! "Failed to fail."
			else
				!subsumes Error-Type _.val

