doc. "TODO"

use
	..Comparable! -> <!
	.Impl-Type
	..js -> any? defined?
	..private.bootstrap -> Object
	.Record-Type

\getters.
\	doc. "TODO"
\	\ TODO: This should return a dict, not a list.
\	|rt:Record-Type
\		map rt.members |_
\			k v = _
\			key. k
\			val. |_:rt
\				get-property _ v

Self-Type. Record-Type
	doc. "TODO"
	members.
		prototype. Object

<! Self-Type Impl-Type

self-type. |x:Object
	Self-Type
		prototype. x

type-of.
	doc. "
		Returns the most specific Impl-Type associated with some value.
		This method won't always work for JavaScript objects,
		but every Record-Type and Enum should implement this automatically.
	test. |
		[ () ] -> Object
	|obj
		case
			any? obj
				case obj.constructor
					defined?_
						_
					else
						Object
			else
				Object
