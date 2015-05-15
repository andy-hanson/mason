use
	.@.@ _ flatten map
	.control if
	.Function apply
	.Generator!
	.js new
	.methods sub
	.Type.Method self-impl!
	.Type.Pred-Type Any
	.Type.Type =>
use~
	.Try $catch oh-no!
use-debug
	.!
	.compare =?
	.io.time $after-time
	.math.Number divisible?
	.math.methods +
	.Try $try

$ =
	doc. "
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
		Called `$` because you "cash in" on it after some time.
	global.Promise

self-impl! sub $ |
	$

# See also $ section in Try.ms.

$done.
	doc. "
		Don't forget $done!
		Logs any errors that happen inside a promise.
		It would be great if we could make these errors happen top-level...
		This is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.
	|_:$
		$catch _ |err
			# Don't use log! because there if errors happen in there, the error disappears!
			global.console.log "
				=== error ===
				{err.message}
				{err.stack}
				=== error ===
			# We're already $done so this shouldn't matter, but just in case...
			oh-no! err

$fail-after-time.
	doc. "Fails if it takes too long."
	$test. ~|
		$x = $after-time 100 |
			1
		a <~ $try ($fail-after-time $x 1
		! =? a.message "Took longer than 1 milliseconds."
		! =? 1 (<~ $fail-after-time $x 200
	|:$ _:$ time-ms:Number
		# TODO:ES6 Shouldn't need `new`
		new $ |resolve reject
			$after _ resolve
			timeout = |
				reject (=> Error "Took longer than {time-ms} milliseconds."
			global.setTimeout timeout time-ms

$after.
	doc. "
		Applies `then` to the result whenever it is ready.
		If `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.
	$test. ~|
		! =? 2 (<~ $after ($resolved 1) +[1]
	|:$ _:$ then:Function
		_.then then

$resolved.
	doc. "$ that is already resolved."
	$test. ~|
		! =? 1 (<~ $resolved 1
	|:$ value
		$.resolve value

$rejected.
	doc. "$ that is already rejected."
	test. |
		$ing ~|
			r = $rejected "a"
			! =? "a" (<~ $try r).message
			# $after will be ignored
			b <~ $try ($after r |
				oh-no! "b"
			! =? "a" b.message
	|_
		$.reject (=> Error _

$delay.
	doc. "
		Schedules a computation to happen later.
		Does *not* run it in parallel.
		It should go without saying,
		but if you needlessly $delay things all the time your program will take longer.
	$test. ~|
		! =? 1 (<~ $delay |
			1
	|delayed:Function[0]
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
	|:$[Array] mapped:@ mapper:Function[Any $]
		$all (map mapped mapper

$flat-map.
	doc. "Like $map but flattens the result."
	$test. ~|
		! =? [ 1 1 2 2 3 3 ] (<~ ($flat-map [ 1 2 3 ] |_
			$delay |
				[ _ _ ]
	|:$[@] mapped:@ mapper:Function[Any $[@]]
		$after ($map mapped mapper) flatten

$keep.
	doc. "
		Asynchronously runs keep-if? on each element and creates an Array of those that match.
		Maintains the original order.
	$test. ~|
		! =? [ 2 4 ] (<~ ($keep [ 1 2 3 4 ] |_
			$delay |
				divisible? _ 2
	|:$[Array] keep-some:@ keep-if?:Function[Any $[Boolean]]
		$flat-map keep-some |_
			$after keep-if?_ |keep
				if keep _

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
	|:$ code:Function[Generator!]
		gen = code()
		do-next = |last-value
			value done = gen.next last-value
			case
				done
					value
				else
					$after value do-next
		do-next()

$
