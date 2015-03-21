doc. "For making assertions."

use
	.Bool _ not
	.compare =?
	.private.bootstrap Fun
use~
	.@ _ each! map
	.@.Array
	.@.Map
	.control if!
	.Fun Pred
	.show repr
	.Str _ indent
	.Try oh-no!
	.Type =>
	.Type.Pred-Type Any
debug use~
	.Bool false true
	.compare same?
	.math.methods +
	.show
	.Try fails-with?

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
				case!
					not (=? 1 args.length)
						oh-no! "Use `! fun args...` or `! bool explanation`, never just `! bool`."
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
			+ of:
				1
				1
			Should =?:
				3
			Got:
				2
		! fails-with? nope |
			!call +
				[ 1 1 ] -> 3
	|fun:Fun args->result:Map[Array Any]
		!call-with =? fun args->result

!call-with.
	doc. "Like !call but allows any equality predicate."
	test. |
		!call-with same?[show] +
			[ 1 2 ] -> "3"
	|equal?:Pred fun:Fun args->result:Map[Array Any]
		each! args->result |pair
			args:@ = pair.key
			expected-res = pair.val
			actual = fun ...args
			if! (not (equal? actual expected-res)) |
				oh-no! ~"
					{fun} of:
						{indent (=> Str (map args repr) "\n")}
					Should {equal?}:
						{indent (repr expected-res)}
					Got:
						{indent (repr actual)}

!