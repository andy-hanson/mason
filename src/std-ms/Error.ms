doc. "TODO"

use
	.? -> ?none ?some
	.assert -> ! !=
	.Bool -> true
	.Fun -> Act delegate-to ignore thunk
	.js -> global
	.Object -> change-property! set-property!
	.pred-types -> Any
	.Str

Error = global.Error

\ TODO: Rethink this API.
\ TODO: Try-Result type.

oh-no!.
	doc. "TODO"
	|~message
		Err = Error \ un-lazy Error
		msg = message
		err ::= ()
		`try { err =  new Err(msg) } catch (e) { err = new Err("Error producing error message: " + e.message) }`
		`throw err`
		()

throw!.
	doc. "TODO"
	|error:Error
		`throw error`
		()

re-throw!. throw!

?try.
	doc. "TODO"
	test. |
		!= (?try oh-no!) ?none
		!= (?try (thunk 1)) (?some 1)
	|try:Act
		try-some = |
			?some (try ())
		try-catch try-some |
			?none

?catch.
	doc. "TODO"
	|try:Act
		try-none = |
			try ()
			?none
		try-catch try-none ?some

try-catch.
	doc. "TODO"
	|try:Act catch:Fun[Error Any]
		try-catch-finally try catch ignore

try-catch-finally.
	doc. "TODO"
	test. |
		!= (try-catch-finally oh-no! (thunk 1) ignore) 1
	|try:Act catch:Fun[Error Any] finally:Act
		res ::= ()
		`try{res=_try()}catch(error){res=_catch(error)}finally{_finally()}`
		res

annotate-errors.
	doc. "TODO"
	|~annotation:Str try:Act
		try-catch try |error
			change-property! error "stack" "{annotation}{error.stack}"
			change-property! error "message" "{annotation}{error.message}"
			re-throw! error

custom-error-type =
	doc. "TODO"
	test. |
		"TODO"
	|opts
		it =
			displayName. `undefined`
			|message
				msg = message
				Object.defineProperties this
					message.
						value. msg
						enumerable. true
						writable. true
					stack.
						value. `new Error(msg)`.stack
						enumerable. true
						writable. true
		Object.assign it opts
		set-property! it "prototype" (Object.create Error.prototype)
		it
