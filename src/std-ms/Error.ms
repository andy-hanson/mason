doc. "TODO"

use
	.assert -> ! !fail-message
	.bags.? -> ?none ?some
	.Bool -> true
	.Comparable -> =?
	.Fun -> Act delegate-to ignore thunk
	.js -> global
	.Object -> change-property! set-property!
	.pred-types -> Any
	.Str
	.types.Interface -> implementor!
	.types.Record-Type
	.types.Type -> !subsumes

Error = global.Error

\ TODO: public?
make-Error = |error
	Err = Error \ un-lazy Error
	`try { const err = _ms.unlazy(error); if (err instanceof Err) return err; if (typeof err === "string") return new Err(err); throw new Error("Argument to oh-no! must be Error or String") } catch (e) { return new Err("Error making error: " + e.message) }`
	oh-no! "Error making error about error making error. You really messed that one up."

\ TODO: Move next to TODO (the function)
unreachable!. |
	oh-no! "This should not be reachable."

oh-no!.
	doc. "
		Throws an Error.
		If `error` is a Str, it will be put into a new Error.
		If it is possible for the creation of `error` to fail, make it lazy.

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
	doc. "Result of running failable code."
Success. Record-Type
	doc. "Attempt that did not fail. _.val is the result of the attempted code."
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
		! =? a 1
	|tried:Fun[Any] finally-do:Act
		fd = finally-do
		`try { return tried() } finally { fd() }`
		unreachable! ()

try.
	doc. "
		If `tried` throws an error, returns it; else returns Success of its result.
		If you don't care about the value of the error, use `?try` instead.

	test. |
		[ (thunk 1) ] -> Success
			val. 1
		[ oh-no! ] -> make-Error "Too bad"
	|tried:Fun[Any]
		s = |x
			Success
				val. x
		`try { return s(tried()) } catch (e) { return e }`
		unreachable! ()

?try.
	doc. "If it works, ?some of the result, otherwise ?none."
	test. |
		[ (thunk 1) ] -> ?some 1
		[ oh-no! ] -> ?none
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

\ TODO: Just make it a Record-Type with message/stack properties whose default if `new Error(msg)`.stack
error-type.
	doc. "Makes a new custom error types."
	test. |
		() \ Relies on below TODO
		\ET = error-type
		\	doc. "ET"
		\x = ET "message"
		\! subsumes? Error x
		\! =? x.message "message"
	|opts
		it =
			displayName. `undefined` \ TODO: Ability to not have displayName
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
