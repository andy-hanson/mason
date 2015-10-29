import
	msl.$ $fail-after-time $delay $all $map $flat-map $keep
	msl.io.time $sleep
	msl.Try $try
	.tests

tests '$
	$fail-after-time -> $!|
		$x = ($sleep 100).then |
			1
		a <~ $try ($fail-after-time $x 1)
		assert! =? a.message "Took longer than 1 milliseconds."
		assert! =? 1 (<~ $fail-after-time $x 200)

	$delay -> $!|
		assert! =? 1 (<~ $delay |
			1

	$all -> $!|
		assert! =? [1 2] (<~ ($all [($.resolve 1) ($.resolve 2)]))
		all-rejected = $all [($.reject 'a) ($.reject 'b)]
		assert! =? 'a (<~ $try all-rejected)

	$map -> $!|
		assert! =? [2 3 4] (<~ $map [1 2 3] |_
			$delay |
				+ _ 1

	$flat-map -> $!|
		assert! =? [1 1 2 2 3 3] (<~ ($flat-map [1 2 3] |_
			$delay |
				[_ _]

	$keep -> $!|
		assert! =? [2 4] (<~ ($keep [1 2 3 4] |_
			$delay |
				divisible? _ 2
