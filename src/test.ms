doc. "The program starts running here."

use
	.console -> log!
	.modules -> $all-modules get-module
	.tests.test -> test-all test-module

\ TODO: Mason for "if this is the main module"
p = ($all-modules "./js").then |
	(test-all "./js").then |
		log! "All tests complete."
	\test-module (get-module "js/demo/zeckendorf")
p.done ()
