use
	..$
	..Fun
	..js new
	..math.Num
use-debug
	..!
	..compare =? <?
	..meta.tests.perf-test $time


current-time-ms.
	doc. "Milliseconds since 1 January 1970 00:00:00 UTC."
	|
		(new global.Date).getTime() # TODO:ES6 global.performance.now()

$after-time.
	doc. "Does something after a certain time has passed."
	$test. ~|
		_ = $after-time 100 |
			1
		! <? 100 (<~ $time_
		! =? 1 (<~ _
	|time-ms:Num _:Fun
		# TODO:ES6 Shouldn't need `new`
		new $ |resolve
			f = |
				resolve _()
			global.setTimeout f time-ms
