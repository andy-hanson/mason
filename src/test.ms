doc. "The program starts running here."

use
	.$ -> $done $ing
	.console -> log!
	.modules -> $@module-in-dir get-module
	.tests.test -> $@test-all $@test-module
	.time -> $time! time*! race*!

\ TODO: Mason for "if this is the main module"
$done ($ing ~|
	<~ $time! "load" ($@module-in-dir "./js"
	<~ $time! "test" ($@test-all "./js"
	\<~ $time! "ana" ($@test-module (get-module "js/demo/anagrams"
	\log! "Bye!"

