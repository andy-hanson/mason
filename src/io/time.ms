todo kill this module

import
	global Date setTimeout
	..$

current-time-ms.
	| Milliseconds since 1 January 1970 00:00:00 UTC.
	|
		todo ES6 global.performance.now() (then kill this function)
		(new Date).getTime()

$after-time. |time-ms:Number _:Function
	| Does something after a certain time has passed.
	new $ !|resolve
		f = !|
			resolve _()
		setTimeout f time-ms
