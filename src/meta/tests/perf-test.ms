use
	...@.@ _ each!
	...$ _ $after
	...io.console log!
	...io.time current-time-ms
	...Fun _ Act
	...private.js-impl timeStar
	...math.Num _ Nat
	...math.methods -
	...Str

time!.
	doc. "Logs the time taken to run time-me once."
	|name:Str time-me:Act
		val time-taken = time time-me
		log! "{name}: {time-taken}"
		val

time*!.
	doc. "Logs the time to run time-me `times` times."
	|name:Str times:Nat time-me:Act
		timeStar times time-me
		time! name |
			timeStar times time-me

race*!.
	doc. "Logs the time of to run each of time-us `times` times."
	|times:Nat time-us:@[Act]
		each! time-us time*!["." times]

time.
	doc. "Time taken to run time-me (milliseconds), and its result."
	|time-me:Fun
		start = current-time-ms()
		val. time-me()
		end = current-time-ms()
		time-taken. - end start

$time.
	doc. "
		The difference in time (milliseconds) between when $time is called and when $time-me resolves.
		For accuracy you should generally start $time-ing a $ as soon as you create it.
		Returned value in ms.
	|:$[Num] $time-me:$
		start = current-time-ms()
		$after $time-me |
			end = current-time-ms()
			- end start

$time!.
	doc. "Logs `$time $time-me` and returns $time-me's result."
	|:$ name:Str $time-me:$
		$after ($time $time-me) |time:Num
			log! "{name}: {time}"
			$time-me
