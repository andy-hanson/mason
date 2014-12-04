\ Also see ..maps.Dict-as-Map

use
	.assert -> !
	.bags.Array
	.bags.Seq -> seq=?
	.basic-methods -> type-of
	.Comparable -> =?
	.maps.Map -> keys
	.Object
	.show -> inspect-impl
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

\ Don't use Map#inspect.
impl! inspect-impl Dict |_
	inspect-impl.default _

Dict

