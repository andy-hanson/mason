doc. "TODO"

use
	.assert -> !
	.object-util -> get-property
	.Record-Type
	.Sq -> map

getters.
	doc. "TODO"
	\ TODO: This should return a dict, not a list.
	|rt:Record-Type
		map rt.members |_
			k v = _
			key. k
			val. |_:rt
				get-property _ v
