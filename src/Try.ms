use
	.@.?
	.$ _ $after
	.Bool and true
	.Fun _ Act ignore
	.js global
	.private.js-impl make-Error i-always-do-after i-oh-no! i-try
	.methods => =? <! contains? empty
	.Obj
	.Obj! p!
	.Str
	.Type
	.Type.Impl-Type self-type
	.Type.Method impl!
	.Type.Kind
	.Type.Pred-Type Any Union
	.Type.Wrap-Type
debug use~
	.! _ !not
	.control build
	.Fun thunk
	.$ $delay $rejected $resolved

Try = Kind
	doc. "Result of running failable code. Success or Error."

Success. Wrap-Type
	doc. "Attempt that did not fail. _.val is the result of the attempted code."

Error.
	doc. "
		Represents the failure of an operation.
		These are expensive to create as they contain a stacktrace.
		Error subtypes must be created with `error-type`.
	global.Error

Eval-Error. global.EvalError
Internal-Error. global.InternalError
Range-Error. global.RangeError
Reference-Error. global.ReferenceError
Syntax-Error. global.SyntaxError
Type-Error. global.TypeError
URI-Error. global.URIError

<! Success Try
<! Error Try
\ TODO: Closed Kinds?

impl! => (self-type Error) |e _
	ignore e \ TODO:SYNTAX Optional args
	make-Error _

oh-no!.
	doc. "
		Throws an Error.
		If `error` is a Str, it will be put into a new Error.
		If it is possible for the creation of `error` to fail, make it lazy.
	test. |
		\ TODO: ! fails-with? type | oh-no! type
		! fails-with? "a" |
			oh-no! "a"
	\ TODO: ~error
	|error
		i-oh-no! error

try.
	doc. "
		If `tried` throws an error, returns it; else returns Success of its result.
		If you don't care about the value of the error, use `?try` instead.
	test. |
		[ (thunk 1) ] -> Success 1
		! fails-with? "Oh no!" oh-no!
	|tried:Fun[Any]
		i-try Success tried

?try.
	doc. "
		`?` containing any successes.
		This can be thought of as translating an Error-throwing Fun to an ?-returning one.
		The opposite of this is `@.?.un-?`.
	test. |
		[ (thunk 1) ] -> ? 1
		[ oh-no! ] -> empty ?
	|tried:Fun[Any]
		case try tried
			:Success
				? _.val
			else
				empty ?

fails?.
	doc. "Whether the Fun throws some error."
	test. |
		! fails? |
			oh-no!()
		!not fails? |
			()
	|_:Act
		contains? Error try_

fails-with?.
	doc. "Whether the Fun throws an error of the given type or with the given message."
	test. |
		! fails-with? "message" |
			oh-no! "message"
		! fails-with? Type-Error |
			().missing-property
	|with:Union[Str Type] act:Act
		result = try act
		and (contains? Error result) ~
			case with
				:Type
					contains? _ result
				:Str
					=? result.message _

\ TODO: Just make it a Obj-Type with message/stack properties whose default is `new Error(msg)`.stack
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
		\ TODO: Use Obj! functions instead of js's builtin Obj helpers
		it =
			displayName. undefined \ TODO: Ability to not have displayName
			|message:Str
				msg = message
				Obj.defineProperties this
					message.
						value. msg
						enumerable. true
						writable. true
					stack.
						value. (=> Error msg).stack
						enumerable. true
						writable. true
		Obj.assign it opts
		p! it "prototype" (Obj.create Error.prototype)
		it

always-do-after.
	doc. "Executes `finally-do`, even if there are errors."
	test. |
		! =? [ 0 ] (build |yield
			try |
				always-do-after oh-no! yield[0]
	|tried:Fun[Any] finally-do:Act
		i-always-do-after tried finally-do

annotate-errors.
	doc. "If there are thrown errors, prepends `annotation` to their stack and message."
	test. |
		! fails-with? "ab" |
			annotate-errors "a" |
				oh-no! "b"
	|~annotation:Str tried:Act
		case try tried
			:Success
				_.val
			else
				p! _ "stack" "{annotation}{_.stack}"
				p! _ "message" "{annotation}{_.message}"
				oh-no! _

region Error handling
	$try.
		doc. "Success if the $ is resolved, Error if rejected."
		$test. ~|
			\ TODO:SYNTAX (<~ ..)
			a <~ $try ($resolved 1
			! =? a (Success 1
			b <~ ($try ($rejected "a"
			! =? "a" b.message
			c <~ ($try ($.reject "a"
			! =? "a" c.message
		|:$[Try] _:$
			\ =>[Error] because technically possible for a Promise to reject with a non-Error.
			$catch ($after _ Success) =>[Error]

	$catch.
		doc. "
			If `$` succeeds, acts like `identity`.
			Else returns a `$` for the result of running `catcher` on the Error.
			Like for `$after`, `catcher` can also return another `$`.
		$test. ~|
			\ TODO:SYNTAX (<~ ..)
			a <~ ($catch ($rejected "a") |_
				_.message
			! =? "a" a
		|:$ promise:$ catcher:Fun
			promise.catch catcher

	$annotate-errors.
		doc. "Like `annotate-errors` but works on errors thrown in a `$`."
		$test. ~|
			\ TODO:SYNTAX (<~ ..)
			a <~ $try ($annotate-errors "a" ($delay |
				oh-no! "b"
			! =? "ab" a.message
		|~annotation:Str $tried:$
			$catch $tried |_
				p! _ "stack" "{annotation}{_.stack}"
				p! _ "message" "{annotation}{_.message}"
				oh-no! _

Try
