use
	global TypeError
	.@.? ?some ?None
	.$ _ $after
	.compare =?
	.Function Action
	.Type.Pred-Type Any Union
	.Type.Type
use-debug
	.$ $rejected $resolved
	.Function thunk

# TODO:SYNTAX One-line fun
debug fail! = !|
	throw!

Success. class
	construct! .val
		pass

Success.doc = "Attempt that did not fail. _.val is the result of the attempted code."

try-result.
	doc. "
		If `tried` throws an error, returns it; else returns Success of its result.
		If you don't care about the value of the error, use `?try` instead.
	test. |
		[(thunk 1)] -> new Success 1
		assert! =? (try-result fail!).message "An error occurred."
	|tried:Action
		except
			try
				new Success tried()
			catch
				_

?try.
	doc. "
		`?` containing any successes.
		This can be thought of as translating an Error-throwing Function to an ?-returning one.
		The opposite of this is `@.?.un-?`.
	test. |
		[(thunk 1)] -> ?some 1
		[fail!] -> ?None
	|tried:Function[Any]
		except
			try
				?some tried()
			catch
				ignore _
				?None

fails?.
	doc. "Whether the Function throws some error."
	test. !|
		assert! fails? !|
			throw!
		forbid! fails? !|
			pass
	|tried:Action
		except
			try
				tried()
				false
			catch
				ignore _
				true

fails-with?.
	doc. "Whether the Function throws an error of the given type or with the given message."
	test. !|
		assert! fails-with? "message" !|
			throw! "message"
		assert! fails-with? TypeError |
			null.missing-property
	|expected-error:Union[String Type] tried:Action
		except
			try
				tried()
				false
			catch error
				case expected-error
					:Type
						error:_
					:String
						=? error.message _

annotate-errors.
	doc. "If there are thrown errors, prepends `annotation` to their stack and message."
	test. !|
		assert! fails-with? "ab" !|
			annotate-errors "a" !|
				throw! "b"
	|~annotation:String tried:Action
		except
			try
				tried()
			catch
				_.stack := "{annotation}{_.stack}"
				_.message := "{annotation}{_.message}"
				throw! _

region $
	$try.
		doc. "Success if the $ is resolved, Error if rejected."
		$test. ~!|
			assert! =? (new Success 1) (<~ $try ($resolved 1))
			assert! =? "a" (<~ ($try ($rejected "a")))
			# $rejected but with non-error:
			assert! =? "a" (<~ ($try ($.reject "a")))
		|_:$
			# =>[Error] because it's possible for a Promise to reject with a non-Error.
			success = $after _ |val
				new Success val
			success.catch |err
				err

	$catch.
		doc. "
			If `$` succeeds, acts like `identity`.
			Else returns a `$` for the result of running `catcher` on the Error.
			Like for `$after`, `catcher` can also return another `$`.
		$test. ~!|
			assert! =? "a" (<~ ($.reject "a").catch |_
				_
		|:$ promise:$ catcher:Function
			promise.catch catcher

	$annotate-errors.
		doc. "Like `annotate-errors` but works on errors thrown in a `$`."
		$test. ~!|
			assert! =? "ab" (<~ $try ($annotate-errors "a" ($rejected (new Error "b")))).message
		|~annotation:String $tried:$
			$catch $tried |_
				if! :Error
					_.stack := "{annotation}{_.stack}"
					_.message := "{annotation}{_.message}"
				throw! _
