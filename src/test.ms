doc. "The program starts running here."

use
	.$ -> $done $after
	.console -> log!
	.modules -> $all-modules get-module
	.tests.test -> $test-all $test-module

\ TODO: Mason for "if this is the main module"
$done ($after ($all-modules "./js") |
	($test-all "./js").then |
		log! "All tests complete."
		()

\	\$test-module (get-module "js/demo/zeckendorf")
