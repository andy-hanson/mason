doc. "For making assertions."

use
	.private.bootstrap Fun
use~ \ TODO: Move as many up as possible
	.@ _ map
	.@.Array
	.@.Map _ each-pair!
	.Bool _ not
	.compare =?
	.control if!
	.math.Num _ near?
	.show repr
	.Str _ indent
	.Try oh-no!
	.Type =>
debug use~
	.Bool false true
	.math.methods +
	.Try fails-with?

\ TODO: !-Error type?
! =
	doc. "
		Pronounced 'assert'.
		It may be called as:
			! fun arg arg arg ...
				Calls fun on the arguments.
				fun must return a Bool
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
				case!
					_ ...args
						()
					else
						oh-no! "
							Expected {a}
								{indent (=> Str (map args repr) "\n")}
			:Bool
				! =? 1 args.length
				case!
					_
						()
					else
						oh-no! args[0]
			else
				oh-no! "First argument to `!` must be Fun or Bool. Got {_}."

!not.
	doc. "Like `!`, but inverts the condition."
	test. |
		!not false "a"
		!not =? 1 2
	|a ...args
		case! a
			:Fun
				case!
					_ ...args
						oh-no! "
							Unexpected {a}
								{indent ((map args repr).join "\n")}
					else
						()
			:Bool
				! =? 1 args.length
				case!
					_
						oh-no! args[0]
					else
						()
			else
				oh-no! "First argument to `!not` must be Fun or Bool. Got {_}."

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
		each-pair! args->result |args:@ expected-res
			actual = fun ...args
			if! (not (=? actual expected-res)) |
				oh-no! ~"
					Calling {fun} on:
						{indent ((=> Array (map args repr)).join "\n")}
					Should be:
						{indent (repr expected-res)}
					Got:
						{indent (repr actual)}

!call-near.
	doc. "TODO"
	test. |
		"TODO"
	|fun:Fun args->result:Map \ TODO: Map[Array Any]
		each-pair! args->result |args:@ expected-res:Num
			actual:Num = fun ...args
			if! (not (near? actual expected-res)) |
				oh-no! ~"
					Calling {fun} on:
						{indent ((=> Array (map args repr)).join "\n")}
					Should be near:
						{indent (repr expected-res)}
					Got:
						{indent (repr actual)}

!