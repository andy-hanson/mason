import
	global setTimeout

$sleep. |time-ms:Number
	new Promise !|resolve
		setTimeout resolve time-ms
