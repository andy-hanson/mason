import
	msl.io.time $after-time
	..tests

tests "time"
	$after-time -> $!|
		assert! =? 1 (<~ $after-time 1 |
			1
