use
	..@ _ each!
	..$ _ $after
	..console log!
	..Fun _ Act
	..js-impl i-time*
	..math.Num _ Nat
	..methods -
	..Str
	..time current-time-ms

$time!.
	doc. "TODO"
	|:$ name:Str $time-me:$
		$after ($time $time-me) |time:Num
			log! "{name}: {time}"
			$time-me

time!.
	doc. "TODO"
	|name:Str time-me:Act
		val time-taken = time time-me
		log! "{name}: {time-taken}"
		val

time*!.
	doc. "TODO"
	|name:Str times:Nat time-me:Act
		i-time* times time-me
		time! name |
			i-time* times time-me

race*!.
	doc. "TODO"
	|times:Nat time-us:@[Act]
		each! time-us i-time*[times]
		each! time-us time*!["." times]

time.
	doc. "
		TODO:REST
		Returned value in ms.
	|time-me:Fun
		start = current-time-ms()
		val. time-me()
		end = current-time-ms()
		time-taken. - end start

$time.
	doc. "
		TODO:REST
		Returned value in ms.
	|:$[Num] $time-me:$
		start = current-time-ms()
		$after $time-me |
			end = current-time-ms()
			- end start
