use
	.@.?
	.$ _ $after
	.Bool and
	.Fun _ Act ignore spread!
	.js global new
	.private.js-impl make-Error i-always-do-after i-oh-no! i-try
	.methods =? empty
	.Obj
	.Obj! p! p+!
	.Str
	.Type _ contains? =>
	.Type.Impl-Type self-type
	.Type.Method impl!
	.Type.Obj-Type
	.Type.Kind
	.Type.Pred-Type Any Union
	.Type.Wrap-Type
debug use~
	.! _ !not
	.control build
	.Fun thunk
	.$ $rejected $resolved

Success. Wrap-Type
	doc. "Attempt that did not fail. _.val is the result of the attempted code."

Error.
	doc. "
		Represents the failure of an operation.
		These are expensive to create as they contain a stacktrace.
		Error subtypes must be created with `error-type`.
	global.Error

Try = Kind
	doc. "Result of running failable code. Success or Error."
	implementors. [ Success Error ]

Eval-Error. global.EvalError
Internal-Error. global.InternalError
Range-Error. global.RangeError
Reference-Error. global.ReferenceError
Syntax-Error. global.SyntaxError
Type-Error. global.TypeError
URI-Error. global.URIError

impl! => (self-type Error) |e _
	ignore e \ TODO:SYNTAX Optional args
	make-Error _

oh-no!.
	doc. "
		Throws an Error.
		If `error` is a Str, it will be put into a new Error.
		If it is possible for the creation of `error` to fail, make it lazy.
	test. |
		! fails-with? "a" |
			oh-no! "a"
		! fails-with? Type-Error |
			oh-no! Type-Error()
	\ TODO: mark both as ~error and have the compiler figure out that it doesn't need to wrap.
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

error-type.
	doc. "
		Makes an Obj-Type with a `message` property, and a `stack` property automatically filled in on construction.
	test. |
		ET = error-type
			doc. "ET"
		! =? ET.doc "ET"
		x = ET (message. "mess"
		! contains? Error x
		! =? "mess" x.message
		! fails-with? "mess" |
			oh-no! x
	|opts
		_ = Obj-Type
			props.
				message. Str
				stack.
			defaults.
				stack. |_
					message:Str = _.message
					(new Error message).stack
			prototype. Obj.create Error.prototype
		spread! p+! _ opts
		_

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

region $
	$try.
		doc. "Success if the $ is resolved, Error if rejected."
		$test. ~|
			! =? (Success 1) (<~ $try ($resolved 1
			! =? "a" (<~ ($try ($rejected "a"))).message
			\ $rejected but with non-error:
			! =? "a" (<~ ($try ($.reject "a"))).message
		|:$[Try] _:$
			\ =>[Error] because it's possible for a Promise to reject with a non-Error.
			$catch ($after _ Success) =>[Error]

	$catch.
		doc. "
			If `$` succeeds, acts like `identity`.
			Else returns a `$` for the result of running `catcher` on the Error.
			Like for `$after`, `catcher` can also return another `$`.
		$test. ~|
			! =? "a" (<~ ($catch ($rejected "a") |_
				_.message
		|:$ promise:$ catcher:Fun
			promise.catch catcher

	$annotate-errors.
		doc. "Like `annotate-errors` but works on errors thrown in a `$`."
		$test. ~|
			! =? "ab" (<~ $try ($annotate-errors "a" ($rejected "b"))).message
		|~annotation:Str $tried:$
			$catch $tried |_
				p! _ "stack" "{annotation}{_.stack}"
				p! _ "message" "{annotation}{_.message}"
				oh-no! _

Try
