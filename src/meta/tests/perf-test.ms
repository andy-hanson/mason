use
	...@.@
	...$ _ $after
	...io.console log!
	...io.time current-time-ms
	...Function Action
	...private.js-impl timeStar
	...math.Number Nat
	...math.methods -

time!.
	doc. "Logs the time taken to run time-me once."
	|name:String time-me:Action
		val time-taken = time time-me
		log! "{name}: {time-taken}"
		val

time*!.
	doc. "Logs the time to run time-me `times` times."
	|name:String times:Nat time-me:Action
		timeStar times time-me
		time! name |
			timeStar times time-me

race*!.
	doc. "Logs the time of to run each of time-us `times` times."
	|times:Nat time-us:@[Action]
		for! time-us
			time*! "." times _

time.
	doc. "Time taken to run time-me (milliseconds), and its result."
	|time-me:Function
		start = current-time-ms()
		val. time-me()
		end = current-time-ms()
		time-taken. - end start

$time.
	doc. "
		The difference in time (milliseconds) between when $time is called and when $time-me resolves.
		For accuracy you should generally start $time-ing a $ as soon as you create it.
		Returned value in ms.
	|:$[Number] $time-me:Action[$]
		start = current-time-ms()
		$after $time-me() |
			end = current-time-ms()
			- end start

$time!.
	doc. "Logs `$time $time-me` and returns $time-me's result."
	|:$ name:String $time-me:Action[$]
		$after ($time $time-me) |time:Number
			log! "{name}: {time}"
