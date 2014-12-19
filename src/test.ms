doc. "TODO"

use
	.console -> log!
	.tests.test -> test-all

use
	.modules -> promise-all-modules

\ TODO: Mason for "if this is the main module"
p = (promise-all-modules "./js").then |
	\use
	\	.Promise -> resolved-promise
	\p = (resolved-promise.test  ())
	\p.then |x
	\	log! "HOO"
	\	log! x
	\p.catch |
	\	log! "HUU"
	\3489

	(test-all "./js").then |
		log! "All tests complete."
p.done ()



