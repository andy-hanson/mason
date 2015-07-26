use
	..$
use-debug
	..compare =?

current-time-ms.
	doc. "Milliseconds since 1 January 1970 00:00:00 UTC."
	|
		(new Date).getTime() # TODO:ES6 global.performance.now()

$after-time.
	doc. "Does something after a certain time has passed."
	$test. ~!|
		assert! =? 1 (<~ $after-time 1 |
			1
	|time-ms:Number _:Function
		new $ !|resolve
			f = !|
				resolve _()
			global.setTimeout f time-ms
