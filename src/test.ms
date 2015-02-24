doc. "The program starts running here."
use!
	.private.bootstrap
	.private.boot-order
use
	.$ $done $ing
	.io.console log!
	.modules $@module-in-dir get-module
	.tests.test $test-all $test-module
	.tests.perf-test time $time! time*! race*!

\ TODO: Mason for "if this is the main module"
$done ($ing ~|
	<~ $time! "load" ($@module-in-dir "./js"
	<~ $time! "test" ($test-all "./js"
	\use
	\	.math.methods +
	\	.show
	\log! (show +)
	\$test-module (get-module "{this-module-directory}/demo/sieve-of-eratosthenes"
