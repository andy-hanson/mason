use
	chalk red
	es6-promise Promise
	.@ _ concat=> map
	.@.Array
	.Bool
	.console log!
	.control if
	.Fun _ apply fun-copy identity ignore
	.Generator!
	.js new
	.methods => sub
	.pred-types Any
	.types.Method impl!
	.types.util self-type type-of
debug use~
	.!
	.Comparable =?
	.control unreachable!
	.methods +
	.Try oh-no!

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

debug
	$!=? = |expected $actual
		$after $actual |_
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
		\ TODO: Use $catch
		promise.catch |err
			log! "
				{err.stack}
				{red "==="}

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
		$!=? 3 ($resolved 3
	|:$ value
		Promise.resolve value

$rejected.
	doc. "$ that is already rejected."
	test. |
		p = $rejected "rejected"
		. $!=? "rejected" ($catch p identity
		\$after should be ignored.
		. $!=? "rejected" ($after p oh-no!
	|rejection-reason:Any
		Promise.reject rejection-reason

$delay.
	doc. "
		Schedules a computation to happen later.
		Does *not* run it in parallel.
		It should go without saying,
		but if you needlessly $delay things all the time your program will take longer.
	test. |
		$!=? 1 ($delay |
			1
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
	|:$[Array] _:@[$]
		$.all (=> Array _

$map.
	doc. "
		TODO
		Unlike `map`, this always returns an Array regardless of the @'s type.
	test. |
		$!=? [ 2 3 4 ] ($map [ 1 2 3 ] |_
			$delay |
				+ _ 1
	|:$[Array] mapped:@ mapper:Fun[Any $]
		$all (map mapped mapper

$flat-map.
	doc. "TODO"
	test. |
		$!=? [ 1 1 2 2 3 3 ] ($flat-map [ 1 2 3 ] |_
			$delay |
				[ _ _ ]

	|:$[@] mapped:@ mapper:Fun[Any $[@]]
		$after ($map mapped mapper) concat=>[(type-of mapped)]

$each!.
	doc. "TODO"
	fun-copy $map

$keep.
	doc. "TODO"
	test. |
		$!=? [ 2 ] ($keep [ 1 2 3 ] |_
			$delay |
				=? _ 2

	|:$[Array] keep-some:@ keep-if?:Fun[Any $[Bool]]
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
		$!=? 2 ($call + $one $one

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
		. $!=? "res" ($ing ~|
			promised <~ $resolved "promised"
			! =? promised "promised"
			"res"

		_ = $ing ~|
			<~ $rejected "whoops"
			oh-no! "It's been rejected, so the rest is never called."
		. $!=? "whoops" ($catch _ identity

	|:$ code:Fun[Generator!]
		gen = code ()
		eval = |last-value
			value done = gen.next last-value
			case
				done
					$resolved value
				else
					$after value eval
		eval ()

$
