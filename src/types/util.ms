doc. "TODO"

use
	..Comparable! -> <!
	.Impl-Type
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
