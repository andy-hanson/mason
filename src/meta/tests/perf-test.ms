import
	...@.@
	...$ _ $after
	...compare <?
	...io.console log!
	...io.time current-time-ms
	...Function Action
	...math.Number Nat
	...math.methods -

time!.
	| Logs the time taken to run time-me once.
	|test-name:String time-me:Action
		val time-taken = time time-me
		log! "{test-name}: {time-taken}"
		val

time*!.
	| Logs the time to run time-me `times` times.
	|test-name:String times:Nat time-me:Action
		time! test-name |
			i ::= times
			arr = []
			for!
				unless! <? 0 i
					break!
				i := - i 1
				arr.push (time-me i)
			arr

race*!.
	| Logs the time of to run each of time-us `times` times.
	!|times:Nat time-us:@[Action]
		for! time-us
			time*! "." times _

time.
	| Time taken to run time-me (milliseconds), and its result.
	|time-me:Function
		start = current-time-ms()
		val. time-me()
		end = current-time-ms()
		time-taken. - end start

$time.
	| The difference in time (milliseconds) between when $time is called and when $time-me resolves.
	| For accuracy you should generally start $time-ing a $ as soon as you create it.
	| Returned value in ms.
	|:$[Number] $time-me:Action[$]
		start = current-time-ms()
		$after $time-me() |
			end = current-time-ms()
			- end start

$time!.
	| Logs `$time $time-me` and returns $time-me's result.
	|:$ test-name:String $time-me:Action[$]
		$after ($time $time-me) !|time:Number
			log! "{test-name}: {time}"
