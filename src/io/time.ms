import
	global setTimeout
	..$

$sleep. |time-ms:Number
	new $ !|resolve
		setTimeout resolve time-ms
