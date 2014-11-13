doc. "TODO"

use
	.bags.? -> ?none ?some
	.assert -> ! != !fail-message
	.Bool -> true
	.Fun -> Act delegate-to ignore thunk
	.js -> global
	.Object -> change-property! set-property!
	.pred-types -> Any
	.Str
	.types.Interface -> implementor!
	.types.Record-Type

Error = global.Error

\ TODO: public?
make-Error = |error
	Err = Error \ un-lazy Error
	`try { const err = _ms.unlazy(error); if (err instanceof Err) return err; if (typeof err === "string") return new Err(err); throw new Error("Argument to oh-no! must be Error or String") } catch (e) { return new Err("Error making error: " + e.message) }`
	oh-no! "Error making error about error making error. You really messed that one up."

\ TODO: Move next to TODO (the function)
unreachable!. ~(oh-no! "This should not be reachable")

oh-no!.
	doc. "TODO"
	test. |
		\ !fails-with ... \ TODO
		!fail-message "a" |
			oh-no! "a"
	|~error
		\ TODO: Optional arguments
		`if (error === undefined) error = "oh-no!"`
		err = make-Error ~error
		`throw err`
		()

Attempt. Interface
	doc. "TODO"
Success. Record-Type
	doc. "TODO"
	members.
		val.
implementor! Success Attempt
implementor! Error Attempt
\ TODO: Closed interfaces?

try-finally.
	doc. "Executes `finally-do`, even if there are errors."
	test. |
		a ::= 0
		try |
			try-finally oh-no! |
				a := 1
		!= a 1
	|tried:Fun[Any] finally-do:Act
		fd = finally-do
		`try { return tried() } finally { fd() }`
		unreachable!

try.
	doc. "If `tried` throws an error returns it; else returns Success of its result."
	test. |
		succ = |x
			Success
				val. x
		!= (try (thunk 1)) (succ 1)
		on = try |
			oh-no! "Too bad"
		!= (try oh-no!) (make-Error "Too bad")
	|tried:Fun[Any]
		s = |x
			Success
				val. x
		`try { return s(tried()) } catch (e) { return e }`
		unreachable!

?try.
	doc. "If it works, ?some of the result, otherwise ?none."
	test. |
		!= (?try oh-no!) ?none
		!= (?try (thunk 1)) (?some 1)
	|tried:Fun[Any]
		case try tried
			:Success
				?some _.val
			else
				?none

annotate-errors.
	doc. "TODO"
	test. |
		"TODO"
	|~annotation:Str tried:Act
		case try tried
			:Success
				_.val
			else
				change-property! _ "stack" "{annotation}{_.stack}"
				change-property! _ "message" "{annotation}{_.message}"
				oh-no! _

error-type.
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

Error
