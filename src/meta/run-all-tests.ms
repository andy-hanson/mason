use!
	..private.boot-order
use
	require
	..$ $done $ing
	# ..io.console log!
	.modules $@all-modules # $get-module
	.tests.test $test-all # $test-module
	.tests.perf-test $time! # time time*! race*!

|
	$done ($ing ~|
		# Load now so that module loading time is not counted as part of testing time.
		<~ $@all-modules require "../modules-list"
		<~ $time! "test" ($test-all require "../modules-list"
		# $test-module (<~ $get-module require "./demo/sieve-of-eratosthenes"
