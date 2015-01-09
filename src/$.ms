use
	.assert -> !
	.bags.Array
	.bags.Bag -> concat=> map
	.Bool
	.Comparable -> =?
	.console -> log!
	.control -> if unreachable!
	es6-promise -> Promise
	.Fun -> apply fun-copy identity ignore
	.Generator! -> gen-next!
	.js -> new
	.methods -> => + sub type-of
	.pred-types -> Any
	.Str -> indent
	.Try -> oh-no!
	.types.Method -> impl!
	.types.util -> self-type

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

impl! sub (self-type $) identity

$!=? = |$a expected
	$done ($after $a |_
		! =? expected _

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
		$done ($!=? ($resolved 3) 3
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
		$done ($!=? _ 1)
	|delayed:Fun[Any]
		new $ |resolve reject
			ignore reject \ TODO:Ignored vars
			resolve (delayed ()

$all.
	doc. "
		TODO
		Regardless of the input type, the output promise will be for an Array.
	test. |
		"TODO"
	|:$[Array] _:Bag
		$.all (=> Array _

$map.
	doc. "
		TODO
		Unlike `map`, this always returns an Array regardless of the bag's type.
	test. |
		$incr = |a
			$delay |
				+ a 1
		$done ($!=? ($map [ 1 2 3 ] $incr) [ 2 3 4 ]
	|:$[Array] mapped:Bag mapper:Fun[Any $]
		$all (map mapped mapper

$flat-map.
	doc. "TODO"
	test. |
		$dup = |a
			$delay |
				[ a a ]
		$done ($!=? ($flat-map [ 1 2 3 ] $dup) [ 1 1 2 2 3 3 ]

	|:$[Bag] mapped:Bag mapper:Fun[Any $[Bag]]
		$after ($map mapped mapper) concat=>[(type-of mapped)]

$each!.
	doc. "TODO"
	fun-copy $map

$keep.
	doc. "TODO"
	test. |
		$even = |a
			$delay |
				=? a 2
		$done ($!=? ($keep [ 1 2 3 ] $even) [ 2 ]

	|:$[Array] keep-some:Bag keep-if?:Fun[Any $[Bool]]
		$flat-map keep-some |_
			$after keep-if?_ |keep
				if keep |
					_

$call.
	doc. "
		Allows you to cal a function on $s as if they were the arguments.
		So for any place you would write `f x` where `x` is an actualized value,
		you may write `$call f $x` where `$x` is a promise.
	test. |
		$one = $delay |
			1
		$done ($!=? ($call + $one $one) 2

	|:$ f ...$args
		$after ($all $args) |args
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
		$done ($!=? p "res"

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
					$after value eval
		eval ()

$
