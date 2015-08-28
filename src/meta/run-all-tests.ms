use!
	..private.boot-order
use
	require
	..$ $done $ing
	# ..io.console log!
	.modules $@all-modules # $get-module
	.tests.run-tests $test-all # $test-module $test-single
	.tests.perf-test $time! # time time*! race*!

	..to-string inspect

!|
	$done ($ing ~|
		# Load now so that module loading time is not counted as part of testing time.
		@all <~ $@all-modules require "../modules-list"
		<~ $time! "test" |
			$test-all @all
		# demo = <~ $get-module require "./demo/sieve-of-eratosthenes"
		# $time! "demo" |
		#	$test-module demo
