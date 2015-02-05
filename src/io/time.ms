use
	..js global new

current-time-ms.
	doc. "Milliseconds since 1 January 1970 00:00:00 UTC."
	|
		(new global.Date).getTime() \ TODO:ES6 global.performance.now()
