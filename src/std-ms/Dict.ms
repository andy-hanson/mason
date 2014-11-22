\ Also see ..maps.Dict-as-Map

use
	.assert -> !
	.bags.Array
	.bags.Bag -> seq=?
	.basic-methods -> type-of
	.Comparable -> =?
	.maps.Map -> keys
	.show -> inspect
	.types.Method -> impl!

Dict =
	doc. "
		An unordered collection of name-value bindings.
		Every Dict is a Map whose keys are strings.

	test. |
		d:Dict =
			a. 1
			b. 2
		! seq=? (keys d) [ "a" "b" "displayName" ]
		! =? d["a"] 1

	\ TODO: `empty` method
	empty. `_ms.Dict()`
	`_ms`.Dict

impl! type-of Dict |
	Dict

impl! inspect Dict |d
	inspect.default d

Dict

