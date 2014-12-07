doc. "TODO"

`require("./private/bootstrap")`

use
	.console -> log!
	.private.boot-order
	.tests.test -> test-all
boot-order

p = (test-all "./js").then
	log! "All tests complete."
p.done ()

