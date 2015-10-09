import
	.@.? ?some ?None
	.$ _ $after
	.compare =?
	.Function Action
	.Type.Pred-Type Any Union
	.Type.Type

Success. class
	| Attempt that did not fail. _.val is the result of the attempted code.
	construct! .val
		pass

try-result. |tried:Action
	| If `tried` throws an error, returns it; else returns Success of its result.
	| If you don't care about the value of the error, use `?try` instead.
	except
		try
			new Success tried()
		catch
			_

todo kill? Not a good idea to just throw away errors.
?try. |tried:Function[Any]
	| `?` containing any successes.
	| This can be thought of as translating an Error-throwing Function to an ?-returning one.
	| The opposite of this is `@.?.un-?`.
	except
		try
			?some tried()
		catch
			ignore _
			?None

fails?. |tried:Action
	| Whether the Function throws some error.
	except
		try
			tried()
			false
		catch
			ignore _
			true

fails-with?. |expected-error:Union[String Type] tried:Action
	| Whether the Function throws an error of the given type or with the given message.
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

annotate-errors. |~annotation:String tried:Action
	| If there are thrown errors, prepends `annotation` to their stack and message.
	except
		try
			tried()
		catch
			_.stack := "{annotation}{_.stack}"
			_.message := "{annotation}{_.message}"
			throw! _

region $
	todo These should not be needed once we have async functions.

	$try. |_:$
		| Success if the $ is resolved, Error if rejected.
		|| =>[Error] because it's possible for a Promise to reject with a non-Error.
		success = $after _ |val
			new Success val
		success.catch |err
			err

	$catch. |:$ promise:$ catcher:Function
		| If `$` succeeds, acts like `identity`.
		| Else returns a `$` for the result of running `catcher` on the Error.
		| Like for `$after`, `catcher` can also return another `$`.
		promise.catch catcher

	$annotate-errors. |~annotation:String $tried:$
		| Like `annotate-errors` but works on errors thrown in a `$`.
		$catch $tried |_
			if! :Error
				_.stack := "{annotation}{_.stack}"
				_.message := "{annotation}{_.message}"
			throw! _
