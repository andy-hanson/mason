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

$.
	|| https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
	|| Called `$` because you "cash in" on it after some time.
	Promise

self-impl! sub $ |
	$

|| See also $ section in Try.ms.

$done. |_:$
	| Don't forget `$done`!
	| Logs any errors that happen inside a promise.
	| It would be great if we could make these errors happen top-level...
	| This is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.
	$catch _ !|err
		|| Don't use log! because there if errors happen in there, the error disappears!
		console.log "
			=== error ===
			{err.message}
			{err.stack}
			=== error ===
		|| We're already $done so this shouldn't matter, but just in case...
		throw! err

$fail-after-time. |:$ _:$ time-ms:Number
	| Fails if it takes too long.
	new $ |resolve reject
		$after _ resolve
		timeout = |
			reject new Error "Took longer than {time-ms} milliseconds."
		setTimeout timeout time-ms

$after. |:$ _:$ then:Function
	| Applies `then` to the result whenever it is ready.
	| If `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.
	_.then then

$resolved. |:$ value
	| $ that is already resolved.
	$.resolve value

todo doc
->$. $resolved

$rejected. |_
	| $ that is already rejected.
	$.reject _

$delay. |delayed:Action
	| Schedules a computation to happen later.
	| Does *not* run it in parallel.
	| It should go without saying,
	| but if you needlessly $delay things all the time your program will take longer.
	todo Better way?
	$after-time 0 delayed

$all. |:$[Array] _:@[$]
	| $ that resolves when the last $ in the input does, with every value in the original iteration order.
	| If any one of them fails, fails with the first such failure.
	$.all (=> Array _)

$map. |:$[Array] mapped:@ mapper:Function[Any $]
	| Asynchronously runs mapper for every element of mapped and returns a $ joining them.
	| Unlike @map, this always returns an Array.
	$.all @for mapped
		mapper_

$flat-map. |:$[@] mapped:@ mapper:Function[Any $[@]]
	| Like $map but flattens the result.
	$after ($map mapped mapper) @flatten

$keep. |:$[Array] keep-some:@ keep-if?:Function[Any $[Boolean]]
	| Asynchronously runs keep-if? on each element and creates an Array of those that match.
	| Maintains the original order.
	$flat-map keep-some |_
		$after keep-if?_ |keep
			if keep
				_

$ing. |:$ code:Function[Generator]
	| Within the generator, you may write:
	|	a <~ $get-a
	| The code after the assignment will become an $after of it.
	| Note that $ing returns a $; it does *not* call $done at the end.
	$-generator = code()
	do-next = |last-value
		value done = $-generator.next last-value
		cond done value ($after value do-next)
	do-next()
