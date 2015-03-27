use!
	.private.bootstrap
	.private.boot-order
use
	.$ $done $ing
	.io.console log!
	.modules $@module-in-dir get-module
	.tests.test $test-all $test-module
	.tests.perf-test time $time! time*! race*!

doc. "The program starts running here."

# TODO: Mason for "if this is the main module"
$done ($ing ~|
	<~ $time! "load" ($@module-in-dir "./js"
	<~ $time! "test" ($test-all "./js"
	# $test-module (get-module "{this-module-directory}/demo/sieve-of-eratosthenes"
