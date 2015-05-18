use
	.Boolean not
	.compare =?
use~
	.@.@ _ each! map
	.@.Map.Map
	.Function Pred
	.show repr
	.String indent
	.Try oh-no!
	.Type.Pred-Type Any
	.Type.Type =>
use-debug
	.compare same?
	.math.methods +
	.show
	.Try fails-with?

doc. "For making assertions."

! =
	doc. "
		Pronounced 'assert'.
		It may be called as:
			! fun arg arg arg ...
				Calls fun on the arguments.
				fun must return a Boolean.
				If it returns false, an error will be thrown.
				The error will contain information about fun and its arguments.
			! bool ~message
				Same as:
					if! (not bool)
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
			:Function
				if! not (_ ...args)
					oh-no! "
						Expected {a}
							{indent (=> String (map args repr) "\n")}
			:Boolean
				if! not (=? 1 args.length)
					oh-no! "Use `! fun args...` or `! bool explanation`, never just `! bool`."
				if! not _
					oh-no! args[0]
			else
				oh-no! "First argument to `!` must be Function or Boolean. Got {_}."

!not.
	doc. "Like `!`, but inverts the condition."
	test. |
		!not false "a"
		!not =? 1 2
	|a ...args
		case! a
			:Function
				case!
					_ ...args
						oh-no! "
							Unexpected {a}
								{indent ((map args repr).join "\n")}
					else
						pass
			:Boolean
				! =? 1 args.length
				case!
					_
						oh-no! args[0]
					else
						pass
			else
				oh-no! "First argument to `!not` must be Function or Boolean. Got {_}."

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
	|fun:Function args->result:Map[Array Any]
		!call-with =? fun args->result

!call-with.
	doc. "Like !call but allows any equality predicate."
	test. |
		!call-with same?[show] +
			[ 1 2 ] -> "3"
	|equal?:Pred fun:Function args->result:Map[Array Any]
		each! args->result |pair
			args:@ = pair.key
			expected-res = pair.val
			actual = fun ...args
			if! (not (equal? actual expected-res))
				oh-no! ~"
					{fun} of:
						{indent (=> String (map args repr) "\n")}
					Should {equal?}:
						{indent (repr expected-res)}
					Got:
						{indent (repr actual)}

!
