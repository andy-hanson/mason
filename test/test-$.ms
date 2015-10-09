import
	msl.$ $done $ing $fail-after-time $after $resolved $rejected $delay $all $map $flat-map $keep
	msl.io.time $after-time
	msl.Try $try
	.tests

todo SYNTAX async functions

tests "$"
	$fail-after-time -> !|
		$done ($ing ~!|
			$x = $after-time 100 |
				1
			a <~ $try ($fail-after-time $x 1)
			assert! =? a.message "Took longer than 1 milliseconds."
			assert! =? 1 (<~ $fail-after-time $x 200)

	$after -> ~!|
		$done ($ing ~!|
			assert! =? 2 (<~ $after ($resolved 1) +[1])

	$resolved -> !|
		$done ($ing ~!|
			assert! =? 1 (<~ $resolved 1)

	$rejected -> !|
		$done ($ing ~!|
			r = $rejected "a"
			assert! =? "a" (<~ $try r)
			|| $after will be ignored
			assert! =? "a" (<~ $try ($after r !|
				throw! "b"

	$delay -> !|
		$done ($ing ~!|
			assert! =? 1 (<~ $delay |
				1

	$all -> !|
		$done ($ing ~!|
			assert! =? [1 2] (<~ ($all [($resolved 1) ($resolved 2)]))
			all-rejected = $all [($rejected "a") ($rejected "b")]
			assert! =? "a" (<~ $try all-rejected)

	$map -> !|
		$done ($ing ~!|
			assert! =? [2 3 4] (<~ $map [1 2 3] |_
				$delay |
					+ _ 1

	$flat-map -> !|
		$done ($ing ~!|
			assert! =? [1 1 2 2 3 3] (<~ ($flat-map [1 2 3] |_
				$delay |
					[_ _]

	$keep -> !|
		$done ($ing ~!|
			assert! =? [2 4] (<~ ($keep [1 2 3 4] |_
				$delay |
					divisible? _ 2

	$ing -> !|
		$done ($ing ~!|
			assert! =? "res" (<~ $ing ~|
				promised <~ $resolved "promised"
				assert! =? "promised" promised
				"res"
			$whoops <~ $try ($ing ~!|
				<~ $rejected "whoops"
				throw! "It's been rejected, so the rest is never called."
			assert! =? "whoops" $whoops
