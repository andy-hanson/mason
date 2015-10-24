import
	global console Promise setImmediate setTimeout
	.@.@ _ @flatten
	.Function Action
	.methods sub
	.Type.Method self-impl!
	.Type.Pred-Type Any
	.Type.Type =>

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
	_.catch !|err
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
		_.then resolve
		timeout = |
			reject new Error "Took longer than {time-ms} milliseconds."
		setTimeout timeout time-ms

todo doc
->$.
	| If not already a $, returns a $ that is already resolved.
	$.resolve

$delay. |delayed:Action
	| Schedules a computation to happen later.
	| Does *not* run it in parallel.
	| It should go without saying,
	| but if you needlessly $delay things all the time your program will take longer.
	todo Better way?
	new $ |resolve reject
		setImmediate !|
			except!
				try!
					resolve delayed()
				catch! error
					reject error

$all. |:$[Array] _:@[$]
	| $ that resolves when the last $ in the input does, with every value in the original iteration order.
	| If any one of them fails, fails with the first such failure.
	$.all (=> Array _)

$map. |:$[Array] mapped:@ mapper:Function[Any $]
	| Asynchronously runs mapper for every element of mapped and returns a $ joining them.
	| Unlike @map, this always returns an Array.
	$.all @for mapped
		mapper_

$flat-map. $|:@ mapped:@ mapper:Function[Any $[@]]
	| Like $map but flattens the result.
	@flatten (<~ $map mapped mapper)

$keep. $|:Array keep-some:@ keep-if?:Function[Any $[Boolean]]
	| Asynchronously runs keep-if? on each element and creates an Array of those that match.
	| Maintains the original order.
	@for keep-some
		if! <~ keep-if?_
			. _
