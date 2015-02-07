use
	chalk red
	es6-promise Promise
	.@ _ flatten map
	.@.Array
	.Bool
	.control if
	.Fun _ apply fun-copy identity ignore
	.Generator!
	.js global new
	.methods => sub
	.Type.Impl-Type self-type
	.Type.Method impl!
	.Type.Pred-Type Any
use~
	.Try Error
debug use~
	.@.Stream
	.!
	.control unreachable!
	.math.Num divisible?
	.methods + =?
	.Try $catch oh-no! $try

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
			\ Don't use log! because there if errors happen in there, the error disappears!
			global.console.log "
				{err.stack}
				{red "==="}

$after.
	doc. "
		Applies `then` to the result whenever it is ready.
		If `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.
	$test. ~|
		\ TODO:SYNTAX (<~ ..)
		a <~ $after ($resolved 1) +[1]
		! =? 2 a
	|:$ _:$ then:Fun
		_.then then

$resolved.
	doc. "$ that is already resolved."
	$test. ~|
		\ TODO:SYNTAX (<~ ..)
		a <~ ($resolved 1
		! =? 1 a
	|:$ value
		Promise.resolve value

$rejected.
	doc. "$ that is already rejected."
	test. |
		$ing ~|
			r = $rejected "a"
			\ TODO:SYNTAX (<~ ..)
			a <~ $try r
			! =? "a" a.message
			\ $after will be ignored
			b <~ $try ($after r |
				oh-no! "b"
			! =? "a" b.message
	|_
		Promise.reject (=> Error _

$delay.
	doc. "
		Schedules a computation to happen later.
		Does *not* run it in parallel.
		It should go without saying,
		but if you needlessly $delay things all the time your program will take longer.
	$test. ~|
		\ TODO:SYNTAX (<~ ..)
		a <~ $delay |
			1
		! =? 1 a
	|delayed:Fun[0]
		new $ |resolve reject
			ignore reject \ TODO:Ignored vars
			resolve (delayed ()

$all.
	doc. "
		$ that resolves when the last $ in the input does, with every value in the original iteration order.
		If any one of them fails, fails with the first such failure.
	$test. ~|
		\ TODO:SYNTAX (<~ ..)
		a <~ ($all [ ($resolved 1) ($resolved 2
		! =? [ 1 2 ] a
		b <~ $try ($all [ ($rejected "a") ($rejected "b") ]
		! =? "a" b.message
	|:$[Array] _:@[$]
		$.all (=> Array _

$map.
	doc. "
		Asynchronously runs mapper for every element of mapped and returns a $ joining them.
		Unlike map, this always returns an Array.
	$test. ~|
		\ TODO:SYNTAX (<~ ..)
		a <~ $map [ 1 2 3 ] |_
			$delay |
				+ _ 1
		! =? [ 2 3 4 ] a
	|:$[Array] mapped:@ mapper:Fun[Any $]
		$all (map mapped mapper

$flat-map.
	doc. "Like $map but flattens the result."
	$test. ~|
		\ TODO:SYNTAX (<~ ..)
		a <~ ($flat-map [ 1 2 3 ] |_
			$delay |
				[ _ _ ]
		! =? (=> Stream [ 1 1 2 2 3 3 ]) a
	|:$[@] mapped:@ mapper:Fun[Any $[@]]
		$after ($map mapped mapper) flatten

$each!.
	doc. "Asynchronously runs a Fun on each element in a @."
	fun-copy $map

$keep.
	doc. "
		Asynchronously runs keep-if? on each element and creates an Array of those that match.
		Maintains the original order.
	$test. ~|
		\ TODO:SYNTAX (<~ ..)
		a <~ ($keep [ 1 2 3 4 ] |_
			$delay |
				divisible? _ 2
		! =? (=> Stream [ 2 4 ]) a
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
	$test. ~|
		$one = $delay |
			1
		\ TODO:SYNTAX (<~ ..)
		a <~ $call + $one $one
		! =? 2 a
	|:$ f ...$args
		$after ($all $args) apply[f]

$ing.
	doc. "
		Within the generator, you may write:
			a <~ $get-a
		The code after the assignment will become an $after of it.
		Note that $ing returns a $; it does *not* call $done at the end.
	$test. ~|
		\ TODO:SYNTAX (<~ ..)
		a <~ $ing ~|
			promised <~ $resolved "promised"
			! =? "promised" promised
			"res"
		! =? "res" a
		\ TODO:SYNTAX (<~ ..)
		b <~ $try ($ing ~|
			<~ $rejected "whoops"
			oh-no! "It's been rejected, so the rest is never called."
		! =? "whoops" b.message
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
