use
	.assert -> !
	.Comparable -> =?
	.console -> log!
	es6-promise -> Promise
	.Fun
	.Generator!
	.pred-types -> Any
	.Str -> indent
	.Try -> oh-no!

$ =
	doc. "
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
		Called `$` because you "cash in" on it after some time.
	Promise

$done.
	doc. "
		Don't forget $done!
		Logs any errors that happen inside a promise.
		It would be great if we could make these errors happen top-level...
		This is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.
	test. |
		\ TODO: How to test console output?
		()
	|promise:$
		promise.catch |err
			log! "
				Error occurred in a promise:
					{indent err.stack}
				===

$after.
	|:$ promise:$ then:Fun
		promise.then then

$catch.
	|:$ promise:$ catcher:Fun
		promise.catch catcher

$resolved.
	doc. "$ that is already resolved."
	test. |
		$done ($after ($resolved 3) |_
			! =? _ 3
	|:$ value
		Promise.resolve value

$rejected.
	Doc. "$ that is already rejected."
	test. |
		p = $rejected "rejected"
		$done ($catch p |_
			! =? _ "rejected"
		\ .then is ignored
		$done ($catch ($after p oh-no!) |_
			! =? _ "rejected"
	|rejection-reason:Any
		Promise.reject rejection-reason

$ing.
	doc. "
		Within the generator, you may write:
			a <~ $get-a
		The code after the assignment will become an $after of it.
		Note that $ing returns does *not* call $done at the end.
	test. |
		p = $ing ~|
			promised <~ $resolved "promised"
			! =? promised "promised"
			"res"
		$done ($after p |_
			! =? _ "res"

		p2 = $ing ~|
			<~ $rejected "whoops"
			oh-no! "It's been rejected, so the rest is never called."
		$done ($catch p2 |_
			! =? _ "whoops"

	|:$ code:Fun[Generator!]
		gen = code ()
		eval = |last-value
			value done = gen.next last-value
			case
				done
					$resolved value
				else
					promise:$ = value
					promise.then eval
		eval ()

$
