import
	msl.$ $done $ing
	msl.io.time $after-time
	..tests

tests "time"
	$after-time -> !|
		todo SYNTAX async functions
		$done ($ing ~!|
			assert! =? 1 (<~ $after-time 1 |
				1
