| Advanced assertions.
| Generally you should just use `assert!`.

import
	.compare =?
import~
	.@.@ _ @map
	.@.Map.Map
	.@.Seq.Seq tail
	.Function Pred
	.to-string inspect
	.String indent
	.Type.Type =>
import-debug
	.compare same?
	.math.methods +
	.to-string
	.Try fails-with?

assert-call!.
	test. !|
		assert-call! +
			[1 1] -> 2
		nope = "
			+ of:
				1
				1
			Should =?:
				3
			Got:
				2
		assert! fails-with? nope !|
			assert-call! +
				[1 1] -> 3
	!|fun:Function args->result:Map
		todo args->result:Map[Array Any]
		| For each entry in args->result, asserts that calling `fun` with arguments of key will `=?` the value.
		assert-call-with! =? fun args->result

assert-this-call!.
	todo doc
	test. !|
		todo
		pass
	!|fun:Function args->result:Map
		todo args->result:Map[Array Any]
		for! args->result
			todo SYNTAX Array destructure
			args:@ = _[0]
			expected-res = _[1]
			actual = fun.apply args[0] (tail args)
			assert! =? actual expected-res throw! "
				{fun} of:
					{indent (=> String (@map args inspect) "\n")}
				Should {=?}:
					{indent (inspect expected-res)}
				Got:
					{indent (inspect actual)}

assert-call-with!.
	| Like !call but allows any equality predicate.
	test. !|
		assert-call-with! same?[to-string] +
			[1 2] -> "3"
	!|equal?:Pred fun:Function args->result:Map
		todo args->result:Map[Array Any]
		for! args->result
			todo SYNTAX Array destructure
			args:@ = _[0]
			expected-res = _[1]
			actual = fun ...args
			assert! equal? actual expected-res throw! "
				{fun} of:
					{indent (=> String (@map args inspect) "\n")}
				Should {equal?}:
					{indent (inspect expected-res)}
				Got:
					{indent (inspect actual)}
