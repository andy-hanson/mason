import
	global console Promise setTimeout
	.@.@ _ @flatten
	.Function Action
	.Generator
	.methods sub
	.Type.Method self-impl!
	.Type.Pred-Type Any
	.Type.Type =>
import~
	.io.time $after-time
	.Try $catch
import-debug
	.compare =?
	.math.Number divisible?
	.math.methods +
	.Try $try

$.
	|| https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
	|| Called `$` because you "cash in" on it after some time.
	Promise

self-impl! sub $ |
	$

|| See also $ section in Try.ms.

$done.
	| Don't forget `$done`!
	| Logs any errors that happen inside a promise.
	| It would be great if we could make these errors happen top-level...
	| This is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.
	|_:$
		$catch _ !|err
			|| Don't use log! because there if errors happen in there, the error disappears!
			console.log "
				=== error ===
				{err.message}
				{err.stack}
				=== error ===
			|| We're already $done so this shouldn't matter, but just in case...
			throw! err

$fail-after-time.
	| Fails if it takes too long.
	$test. ~!|
		$x = $after-time 100 |
			1
		a <~ $try ($fail-after-time $x 1)
		assert! =? a.message "Took longer than 1 milliseconds."
		assert! =? 1 (<~ $fail-after-time $x 200)
	|:$ _:$ time-ms:Number
		new $ |resolve reject
			$after _ resolve
			timeout = |
				reject new Error "Took longer than {time-ms} milliseconds."
			setTimeout timeout time-ms

$after.
	| Applies `then` to the result whenever it is ready.
	| If `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.
	$test. ~!|
		assert! =? 2 (<~ $after ($resolved 1) +[1])
	|:$ _:$ then:Function
		_.then then

$resolved.
	| $ that is already resolved.
	$test. ~!|
		assert! =? 1 (<~ $resolved 1)
	|:$ value
		$.resolve value

$rejected.
	| $ that is already rejected.
	test. |
		$ing ~!|
			r = $rejected "a"
			assert! =? "a" (<~ $try r)
			|| $after will be ignored
			assert! =? "a" (<~ $try ($after r !|
				throw! "b"
	|_
		$.reject _

$delay.
	| Schedules a computation to happen later.
	| Does *not* run it in parallel.
	| It should go without saying,
	| but if you needlessly $delay things all the time your program will take longer.
	$test. ~!|
		assert! =? 1 (<~ $delay |
			1
	|delayed:Action
		todo Better way?
		$after-time 0 delayed

$all.
	| $ that resolves when the last $ in the input does, with every value in the original iteration order.
	| If any one of them fails, fails with the first such failure.
	$test. ~!|
		assert! =? [1 2] (<~ ($all [($resolved 1) ($resolved 2)]))
		all-rejected = $all [($rejected "a") ($rejected "b")]
		assert! =? "a" (<~ $try all-rejected)
	|:$[Array] _:@[$]
		$.all (=> Array _)

$map.
	| Asynchronously runs mapper for every element of mapped and returns a $ joining them.
	| Unlike map, this always returns an Array.
	$test. ~!|
		assert! =? [2 3 4] (<~ $map [1 2 3] |_
			$delay |
				+ _ 1
	|:$[Array] mapped:@ mapper:Function[Any $]
		$.all @for mapped
			mapper_

$flat-map.
	| Like $map but flattens the result.
	$test. ~!|
		assert! =? [1 1 2 2 3 3] (<~ ($flat-map [1 2 3] |_
			$delay |
				[_ _]
	|:$[@] mapped:@ mapper:Function[Any $[@]]
		$after ($map mapped mapper) @flatten

$keep.
	| Asynchronously runs keep-if? on each element and creates an Array of those that match.
	| Maintains the original order.
	$test. ~!|
		assert! =? [2 4] (<~ ($keep [1 2 3 4] |_
			$delay |
				divisible? _ 2
	|:$[Array] keep-some:@ keep-if?:Function[Any $[Boolean]]
		$flat-map keep-some |_
			$after keep-if?_ |keep
				if keep
					_

$ing.
	| Within the generator, you may write:
	|	a <~ $get-a
	| The code after the assignment will become an $after of it.
	| Note that $ing returns a $; it does *not* call $done at the end.
	$test. ~!|
		assert! =? "res" (<~ $ing ~|
			promised <~ $resolved "promised"
			assert! =? "promised" promised
			"res"
		$whoops <~ $try ($ing ~!|
			<~ $rejected "whoops"
			throw! "It's been rejected, so the rest is never called."
		assert! =? "whoops" $whoops
	|:$ code:Function[Generator]
		$-generator = code()
		do-next = |last-value
			value done = $-generator.next last-value
			cond done value ($after value do-next)
		do-next()
