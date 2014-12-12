doc. "TODO"

use
	.console -> log!
	.tests.test -> test-all

use
	.modules -> promise-all-modules

\ TODO: Mason for "if this is the main module"
p = (promise-all-modules "./js").then |
	(test-all "./js").then |
		log! "All tests complete."
p.done ()



