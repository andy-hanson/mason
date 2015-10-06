todo kill this module

import
	global Date setTimeout
	..$
import-debug
	..compare =?

current-time-ms.
	| Milliseconds since 1 January 1970 00:00:00 UTC.
	|
		todo ES6 global.performance.now() (then kill this function)
		(new Date).getTime()

$after-time.
	| Does something after a certain time has passed.
	$test. ~!|
		assert! =? 1 (<~ $after-time 1 |
			1
	|time-ms:Number _:Function
		new $ !|resolve
			f = !|
				resolve _()
			setTimeout f time-ms
