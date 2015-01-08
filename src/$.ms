use
	.assert -> !
	.Comparable -> =?
	.console -> log!
	.control -> unreachable!
	es6-promise -> Promise
	.Fun -> apply ignore
	.Generator! -> gen-next!
	.js -> new
	.methods -> +
	.pred-types -> Any
	.Str -> indent
	.Try -> oh-no!

$ =
	doc. "
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
		Called `$` because you "cash in" on it after some time.
	test. |
		\ TODO: Shouldn't need `new`
		resolved = new $ |resolve reject
			ignore reject \ TODO:Ignored vars
			resolve 1
		$done ($after resolved |resolved-with
			! =? resolved-with 1

		rejected = new $ |resolve reject
			ignore resolve \ TODO:Ignored vars
			reject 1
		$done ($catch ($after rejected unreachable!) ![=?[1

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
	doc. "TODO"
	|:$ promise:$ then:Fun
		promise.then then

$catch.
	doc. "TODO"
	|:$ promise:$ catcher:Fun
		promise.catch catcher

$resolved.
	doc. "$ that is already resolved."
	test. |
		$done ($after ($resolved 3) ![=?[3
	|:$ value
		Promise.resolve value

$rejected.
	doc. "$ that is already rejected."
	test. |
		p = $rejected "rejected"
		$done ($catch p ![=?["rejected"
		\$after should be ignored.
		$done ($catch ($after p oh-no!) ![=?["rejected"
	|rejection-reason:Any
		Promise.reject rejection-reason

$delay.
	doc. "
		Schedules a computation to happen later.
		Does *not* run it in parallel.
	test. |
		_ = $delay |
			1
		$done ($after _ ![=?[1
	|delayed:Fun[Any]
		new $ |resolve reject
			ignore reject \ TODO:Ignored vars
			resolve (delayed ()

$call.
	doc. "
		Allows you to cal a function on $s as if they were the arguments.
		So for any place you would write `f x` where `x` is an actualized value,
		you may write `$call f $x` where `$x` is a promise.
	test. |
		$one = $delay |
			1
		$two = $delay |
			2
		$three = $call + $one $two
		$done ($after $three ![=?[3

	|:$ f ...$args
		$after ($.all $args) |args
			apply f args

$ing.
	doc. "
		Within the generator, you may write:
			a <~ $get-a
		The code after the assignment will become an $after of it.
		Note that $ing returns a $; it does *not* call $done at the end.
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
			value done = gen-next! gen last-value
			case
				done
					$resolved value
				else
					promise:$ = value
					promise.then eval
		eval ()

$
