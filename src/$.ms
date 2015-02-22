use
	chalk red
	es6-promise Promise
	.@ _ flatten map
	.@.Array
	.Bool
	.control if
	.Fun _ apply identity
	.Generator!
	.js global new
	.methods sub
	.Type =>
	.Type.Impl-Type self-type
	.Type.Method impl!
	.Type.Pred-Type Any
use~
	.Try $catch Error
debug use~
	.@.Stream
	.!
	.compare =?
	.math.Num divisible?
	.math.methods +
	.Try oh-no! $try

$ =
	doc. "
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
		Called `$` because you "cash in" on it after some time.
	Promise

impl! sub (self-type $) identity

\ See also $ section in Try.ms.

$done.
	doc. "
		Don't forget $done!
		Logs any errors that happen inside a promise.
		It would be great if we could make these errors happen top-level...
		This is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.
	|_:$
		$catch _ |err
			\ Don't use log! because there if errors happen in there, the error disappears!
			global.console.log "
				{err.stack}
				{red "==="}

$after.
	doc. "
		Applies `then` to the result whenever it is ready.
		If `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.
	$test. ~|
		! =? 2 (<~ $after ($resolved 1) +[1]
	|:$ _:$ then:Fun
		_.then then

$resolved.
	doc. "$ that is already resolved."
	$test. ~|
		! =? 1 (<~ $resolved 1
	|:$ value
		Promise.resolve value

$rejected.
	doc. "$ that is already rejected."
	test. |
		$ing ~|
			r = $rejected "a"
			! =? "a" (<~ $try r).message
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
		! =? 1 (<~ $delay |
			1
	|delayed:Fun[0]
		new $ |resolve
			resolve delayed()

$all.
	doc. "
		$ that resolves when the last $ in the input does, with every value in the original iteration order.
		If any one of them fails, fails with the first such failure.
	$test. ~|
		! =? [ 1 2 ] (<~ ($all [ ($resolved 1) ($resolved 2
		all-rejected = $all [ ($rejected "a") ($rejected "b") ]
		! =? "a" (<~ $try all-rejected).message
	|:$[Array] _:@[$]
		$.all (=> Array _

$map.
	doc. "
		Asynchronously runs mapper for every element of mapped and returns a $ joining them.
		Unlike map, this always returns an Array.
	$test. ~|
		! =? [ 2 3 4 ] (<~ $map [ 1 2 3 ] |_
			$delay |
				+ _ 1
	|:$[Array] mapped:@ mapper:Fun[Any $]
		$all (map mapped mapper

$flat-map.
	doc. "Like $map but flattens the result."
	$test. ~|
		! =? (=> Stream [ 1 1 2 2 3 3 ]) (<~ ($flat-map [ 1 2 3 ] |_
			$delay |
				[ _ _ ]
	|:$[@] mapped:@ mapper:Fun[Any $[@]]
		$after ($map mapped mapper) flatten

$keep.
	doc. "
		Asynchronously runs keep-if? on each element and creates an Array of those that match.
		Maintains the original order.
	$test. ~|
		! =? (=> Stream [ 2 4 ]) (<~ ($keep [ 1 2 3 4 ] |_
			$delay |
				divisible? _ 2
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
		! =? 3 (<~ $call + ($resolved 1) ($resolved 2)
	|:$ f ...$args
		$after ($all $args) apply[f]

$ing.
	doc. "
		Within the generator, you may write:
			a <~ $get-a
		The code after the assignment will become an $after of it.
		Note that $ing returns a $; it does *not* call $done at the end.
	$test. ~|
		! =? "res" (<~ $ing ~|
			promised <~ $resolved "promised"
			! =? "promised" promised
			"res"
		$whoops <~ $try ($ing ~|
			<~ $rejected "whoops"
			oh-no! "It's been rejected, so the rest is never called."
		! =? "whoops" $whoops.message
	|:$ code:Fun[Generator!]
		gen = code()
		eval = |last-value
			value done = gen.next last-value
			case
				done
					value
				else
					$after value eval
		eval()

$
