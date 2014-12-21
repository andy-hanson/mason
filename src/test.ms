doc. "TODO"

use
	.console -> log!
	.modules -> promise-all-modules
	.tests.test -> test-all

\ TODO: Mason for "if this is the main module"
p = (promise-all-modules "./js").then |
	(test-all "./js").then |
		log! "All tests complete."
p.done ()



