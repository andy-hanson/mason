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

todo SYNTAX One-line fun
debug fail! = !|
	throw!

Success. class
	| Attempt that did not fail. _.val is the result of the attempted code.
	construct! .val
		pass

try-result.
	| If `tried` throws an error, returns it; else returns Success of its result.
	| If you don't care about the value of the error, use `?try` instead.
	test. |
		[(thunk 1)] -> new Success 1
		assert! =? (try-result fail!).message "An error occurred."
	|tried:Action
		except
			try
				new Success tried()
			catch
				_

todo kill? Not a good idea to just throw away errors.
?try.
	| `?` containing any successes.
	| This can be thought of as translating an Error-throwing Function to an ?-returning one.
	| The opposite of this is `@.?.un-?`.
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
	| Whether the Function throws some error.
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
	| Whether the Function throws an error of the given type or with the given message.
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
	| If there are thrown errors, prepends `annotation` to their stack and message.
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
		| Success if the $ is resolved, Error if rejected.
		$test. ~!|
			assert! =? (new Success 1) (<~ $try ($resolved 1))
			assert! =? "a" (<~ ($try ($rejected "a")))
			|| $rejected but with non-error:
			assert! =? "a" (<~ ($try ($.reject "a")))
		|_:$
			|| =>[Error] because it's possible for a Promise to reject with a non-Error.
			success = $after _ |val
				new Success val
			success.catch |err
				err

	$catch.
		| If `$` succeeds, acts like `identity`.
		| Else returns a `$` for the result of running `catcher` on the Error.
		| Like for `$after`, `catcher` can also return another `$`.
		$test. ~!|
			assert! =? "a" (<~ ($.reject "a").catch |_
				_
		|:$ promise:$ catcher:Function
			promise.catch catcher

	$annotate-errors.
		| Like `annotate-errors` but works on errors thrown in a `$`.
		$test. ~!|
			assert! =? "ab" (<~ $try ($annotate-errors "a" ($rejected (new Error "b")))).message
		|~annotation:String $tried:$
			$catch $tried |_
				if! :Error
					_.stack := "{annotation}{_.stack}"
					_.message := "{annotation}{_.message}"
				throw! _
