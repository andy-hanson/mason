import
	global TypeError
	msl.$ $done $ing $rejected $resolved
	msl.Function thunk
	msl.Try annotate-errors $annotate-errors $catch fails? fails-with? Success ?try $try try-result
	.tests

fail! = !|
	throw!

tests "Try"
	try-result -> |
		[(thunk 1)] -> new Success 1
		assert! =? (try-result fail!).message "An error occurred."


	?try ->
		[(thunk 1)] -> ?some 1
		[fail!] -> ?None

	fails? -> !|
		assert! fails? !|
			throw!
		forbid! fails? !|
			pass

	fails-with? -> !|
		assert! fails-with? "message" !|
			throw! "message"
		assert! fails-with? TypeError |
			null.missing-property

	annotate-errors -> !|
		assert! fails-with? "ab" !|
			annotate-errors "a" !|
				throw! "b"

	$try -> !|
		$done ($ing ~!|
			assert! =? (new Success 1) (<~ $try ($resolved 1))
			assert! =? "a" (<~ ($try ($rejected "a")))
			|| $rejected but with non-error:
			assert! =? "a" (<~ ($try ($.reject "a")))

	$catch -> !|
		$done ($ing ~!|
			assert! =? "a" (<~ ($.reject "a").catch |_
				_

	todo SYNTAX async functions
	$annotate-errors -> !|
		$done ($ing ~!|
			assert! =? "ab" (<~ $try ($annotate-errors "a" ($rejected (new Error "b")))).message

