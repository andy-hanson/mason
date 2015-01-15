\ Also see ..maps.Dict-as-Map

use
	.assert -> !
	.@.Seq -> seq=?
	.Comparable -> =?
	.maps.Map -> keys
	.methods -> empty type-of
	.private.bootstrap -> Dict extend!
	.show
	.types.Method -> impl!
	.types.util -> self-type

extend! Dict
	doc. "
		An unordered collection of name-value bindings.
		Every Dict is a Map whose keys are strings.

	test. |
		d:Dict =
			a. 1
			b. 2
		! seq=? (keys d) [ "a" "b" "displayName" ]
		! =? d["a"] 1

empty-Dict = Dict.apply [ ]

impl! empty (self-type Dict) |
	empty-Dict

impl! type-of Dict |
	Dict

\ TODO: Don't use Map#inspect.
impl! show Dict show.default

Dict

