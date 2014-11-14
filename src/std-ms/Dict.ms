\ Also see ..maps.Dict-as-Map

use
	.bags.Array
	.bags.Seq -> seq=?
	.assert -> ! !=
	.maps.Map -> keys

Dict =
	doc. "
		An unordered collection of name-value bindings.
		Every Dict is a Map whose keys are strings.

	test. |
		d:Dict =
			a. 1
			b. 2
		! (seq=? (keys d) (Array.of "a" "b" "displayName"))
		!= d["a"] 1

	\ TODO: `empty` method
	empty. `_ms.Dict()`
	`_ms`.Dict

Dict

