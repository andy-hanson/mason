doc. "TODO"

use
	..Comparable! <!
	..js any? defined?
	..private.bootstrap Obj
	.Impl-Type
	.Record-Type

\getters.
\	doc. "TODO"
\	\ TODO: This should return a dict, not a list.
\	|rt:Record-Type
\		map rt.members |_
\			k v = _
\			key. k
\			val. |_:rt
\				p _ v

Self-Type. Record-Type
	doc. "TODO"
	members.
		prototype. Obj

<! Self-Type Impl-Type

self-type. |x:Obj
	Self-Type
		prototype. x

type-of.
	doc. "TODO"
	test. |
		[ () ] -> Obj
	|obj
		case
			any? obj
				case obj.constructor
					defined?_
						_
					else
						Obj
			else
				Obj
