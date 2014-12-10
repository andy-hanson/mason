doc. "TODO"

`require("./private/bootstrap")`

use
	.console -> log!
	.private.boot-order
	.tests.test -> test-all

\ TODO: use! boot-order
load = |x
	x
load boot-order


use
	.modules -> promise-all-modules

\ TODO: Mason for "if this is the main module"
p = (promise-all-modules "./js").then |
	(test-all "./js").then |
		log! "All tests complete."
p.done ()



