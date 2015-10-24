import
	global setTimeout
	..$

todo Replace with just $sleep
$after-time. |time-ms:Number _:Function
	| Does something after a certain time has passed.
	new $ !|resolve
		f = !|
			resolve _()
		setTimeout f time-ms
