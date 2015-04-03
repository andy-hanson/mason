use!
	..private.boot-order
use
	..$ $done $ing
	..io.console log!
	.modules $@module-in-dir $get-module
	.tests.test $test-all $test-module
	.tests.perf-test time $time! time*! race*!

doc. "The program starts running here."

|
	$done ($ing ~|
		# TODO: Loading time inaccurate because they are loaded eagerly.
		# <~ $time! "load" ($@module-in-dir "./js"
		<~ $time! "test" ($test-all "./js"
		#$test-module (<~ $get-module "{this-module-directory}/demo/sieve-of-eratosthenes"
