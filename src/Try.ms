use
	.assert -> ! !not
	.bags.?
	.Bool -> and true
	.Comparable -> =?
	.Comparable! -> <!
	.control -> build unreachable!
	.Fun -> Act ignore thunk
	.js -> global
	.methods -> => empty
	.Object
	.Object! -> change-property! set-property!
	.pred-types -> Any
	.Str
	.types.Interface
	.types.Record-Type
	.types.Type -> contains?

Try = Interface
	doc. "Result of running failable code."

Success. Record-Type
	doc. "Attempt that did not fail. _.val is the result of the attempted code."
	members.
		val.
Error.
	doc. "TODO"
	global.Error
<! Success Try
<! Error Try
\ TODO: Closed interfaces?

\ TODO: public?
make-Error = |error
	Err = Error \ un-lazy Error
	ignore error Err \ TODO:Ignored vars
	`try { const err = _ms.unlazy(error); if (err instanceof Err) return err; if (typeof err === "string") return new Err(err); if (err == null) return new Err("Oh no!"); throw new Error("Argument to oh-no! must be Error or String") } catch (e) { return new Err("Error making error: " + e.message) }`
	oh-no! "Error making error about error making error. You really messed that one up."

oh-no!.
	doc. "
		Throws an Error.
		If `error` is a Str, it will be put into a new Error.
		If it is possible for the creation of `error` to fail, make it lazy.
	test. |
		\ TODO: ! fails-with? type | oh-no! type
		! fails-with? "a" |
			oh-no! "a"
	|~error
		\ TODO: Optional arguments
		`if (error === undefined) error = "oh-no!"`
		err = make-Error ~error
		ignore err \ TODO:Ignored vars
		`throw err`
		()

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
		ignore tried s \ TODO:Ignored vars
		`try { return s(tried()) } catch (e) { return e }`
		unreachable! ()

?try.
	doc. "`?` containing any successes."
	test. |
		[ (thunk 1) ] -> => ? [ 1 ]
		[ oh-no! ] -> empty ?
	|tried:Fun[Any]
		case try tried
			:Success
				=> ? [ _.val ]
			else
				empty ?

fails?.
	doc. "TODO"
	test. |
		! fails? |
			oh-no! ()
		!not fails? |
			()
	|_:Act
		contains? Error try_

fails-with?.
	doc. "TODO"
	test. |
		"TODO"
	|with act:Act
		result = try act
		and (contains? Error result) ~
			case with
				:Type
					contains? _ result
				:Str
					=? result.message _

\ TODO: Just make it a Record-Type with message/stack properties whose default if `new Error(msg)`.stack
error-type.
	doc. "Makes a new custom error types."
	test. |
		() \ Relies on below TODO
		\ET = error-type
		\	doc. "ET"
		\x = ET "message"
		\! contains? Error x
		\! =? x.message "message"
	|opts
		\ TODO: Use Object! functions instead of js's builtin Object helpers
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

always-do-after.
	doc. "Executes `finally-do`, even if there are errors."
	test. |
		! =? [ 0 ] (build |yield
			try |
				always-do-after oh-no! yield[0]
	|tried:Fun[Any] finally-do:Act
		fd = finally-do
		ignore tried fd \ TODO:Ignored vars
		`try { return tried() } finally { fd() }`
		()

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

Try
