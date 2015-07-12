use
	.@.@-Type empty
	.@.?
	.$ _ $after
	.compare =?
	.Function Action noop
	.private.bootstrap ms
	.Object p
	.Object! p!
	.Type.Method self-impl!
	.Type.Obj-Type
	.Type.Kind
	.Type.Pred-Type Any Union
	.Type.Type _ contains? =>
	.Type.Wrap-Type
use-debug
	.! _ !not
	.Function thunk
	.$ $rejected $resolved

# TODO:SYNTAX One-line fun
debug fail! = !|
	oh-no!

Success. Wrap-Type
	doc. "Attempt that did not fail. _.val is the result of the attempted code."

Try. Kind
	doc. "Result of running failable code. Success or Error."
	implementors. [ Success Error

self-impl! => Error (p ms "error"

try-result.
	doc. "
		If `tried` throws an error, returns it; else returns Success of its result.
		If you don't care about the value of the error, use `?try` instead.
	test. |
		[ (thunk 1) ] -> Success 1
		! =? (try-result fail!).message "Oh no!"
	|tried:Action
		except
			try
				Success tried()
			catch
				_

?try.
	doc. "
		`?` containing any successes.
		This can be thought of as translating an Error-throwing Function to an ?-returning one.
		The opposite of this is `@.?.un-?`.
	test. |
		[ (thunk 1) ] -> ? 1
		[ fail! ] -> empty ?
	|tried:Function[Any]
		except
			try
				? tried()
			catch
				noop_
				empty ?

fails?.
	doc. "Whether the Function throws some error."
	test. !|
		! fails? fail!
		!not fails? noop
	|tried:Action
		except
			try
				tried()
				false
			catch
				noop_
				true

fails-with?.
	doc. "Whether the Function throws an error of the given type or with the given message."
	test. !|
		! fails-with? "message" !|
			oh-no! "message"
		! fails-with? TypeError |
			null.missing-property
	|expected-error:Union[String Type] tried:Action
		except
			try
				tried()
				false
			catch error
				case expected-error
					:Type
						contains? _ error
					:String
						=? error.message _

error-type.
	doc. "
		Makes an Obj-Type with a `message` property,
		and a `stack` property automatically filled in on construction.
		Very slow to create, so use only for legitimate errors!
	test. !|
		ET = error-type
			doc. "ET"
		! =? ET.doc "ET"
		x = ET (message. "mess"
		! contains? Error x
		! =? "mess" x.message
		! fails-with? "mess" !|
			oh-no! x
	|opts
		default-args =
			props.
				message. String
				stack.
			defaults.
				stack. |_
					(new Error _.message).stack
			prototype. Object.create Error.prototype
		args = Object.assign default-args opts
		Obj-Type args

annotate-errors.
	doc. "If there are thrown errors, prepends `annotation` to their stack and message."
	test. |
		! fails-with? "ab" !|
			annotate-errors "a" !|
				oh-no! "b"
	|~annotation:String tried:Action
		except
			try
				tried()
			catch
				p! _ "stack" "{annotation}{_.stack}"
				p! _ "message" "{annotation}{_.message}"
				oh-no! _

region $
	$try.
		doc. "Success if the $ is resolved, Error if rejected."
		$test. ~!|
			! =? (Success 1) (<~ $try ($resolved 1
			! =? "a" (<~ ($try ($rejected "a"))).message
			# $rejected but with non-error:
			! =? "a" (<~ ($try ($.reject "a"))).message
		|_:$
			# =>[Error] because it's possible for a Promise to reject with a non-Error.
			$catch ($after _ Success) =>[Error]

	$catch.
		doc. "
			If `$` succeeds, acts like `identity`.
			Else returns a `$` for the result of running `catcher` on the Error.
			Like for `$after`, `catcher` can also return another `$`.
		$test. ~!|
			! =? "a" (<~ ($catch ($rejected "a") |_
				_.message
		|:$ promise:$ catcher:Function
			promise.catch catcher

	$annotate-errors.
		doc. "Like `annotate-errors` but works on errors thrown in a `$`."
		$test. ~!|
			! =? "ab" (<~ $try ($annotate-errors "a" ($rejected "b"))).message
		|~annotation:String $tried:$
			$catch $tried |_
				p! _ "stack" "{annotation}{_.stack}"
				p! _ "message" "{annotation}{_.message}"
				oh-no! _
