use
	.@.@-Type empty
	.@.?
	.$ _ $after
	.Bool and
	.compare =?
	.Fun _ Act spread!
	.js new
	.private.js-impl makeError alwaysDoAfter ohNo iTry
	.Obj
	.Obj! p! p+!
	.Str
	.Type.Method self-impl!
	.Type.Obj-Type
	.Type.Kind
	.Type.Pred-Type Any Union
	.Type.Type _ contains? =>
	.Type.Wrap-Type
use-debug
	.! _ !not
	.control build
	.Fun thunk
	.$ $rejected $resolved

Success. Wrap-Type
	doc. "Attempt that did not fail. _.val is the result of the attempted code."

Try = Kind
	doc. "Result of running failable code. Success or Error."
	implementors. [ Success Error ]

self-impl! => Error makeError

oh-no!.
	doc. "
		Throws an Error.
		If `error` is a Str, it will be put into a new Error.
		If it is possible for the creation of `error` to fail, make it lazy.
	test. |
		! fails-with? "a" |
			oh-no! "a"
		! fails-with? TypeError |
			oh-no! TypeError()
	ohNo

try.
	doc. "
		If `tried` throws an error, returns it; else returns Success of its result.
		If you don't care about the value of the error, use `?try` instead.
	test. |
		[ (thunk 1) ] -> Success 1
		! fails-with? "Oh no!" oh-no!
	|tried:Fun[Any]
		iTry Success tried

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
		! fails-with? TypeError |
			().missing-property
	|expected-error:Union[Str Type] act:Act
		result = try act
		and (contains? Error result) ~
			case expected-error
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
		alwaysDoAfter tried finally-do

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
			# $rejected but with non-error:
			! =? "a" (<~ ($try ($.reject "a"))).message
		|:$[Try] _:$
			# =>[Error] because it's possible for a Promise to reject with a non-Error.
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
