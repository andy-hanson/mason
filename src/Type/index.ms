use
	..js js-instanceof
	..methods <! contains?
	..private.bootstrap Fun ms p+!
	.Impl-Type
	.Kind
	.Method _ impl!
use~
	..@.? get-or
	..Obj _ ?p-with-proto
	..Try oh-no!

Type. Kind
	doc. "
		Anything implementing contains?.
		Types are generally used to succinctly make assertions about values.

<! Impl-Type Type
<! Method Type

\ TODO: Move?
<! Fun Impl-Type
impl! contains? Fun |fun _
	js-instanceof _ fun

type-of.
	doc. "
		Most specific Impl-Type for a value.
	test. |
		[ Type ] -> Kind
		[ () ] -> Obj
	|:Impl-Type obj
		get-or (?p-with-proto obj "constructor") Obj

p+! ms "checkContains" |type value name
	case!
		contains? type value
			()
		else
			\`throw new Error(name + " is no " + type + ", is ")`
			oh-no! "{name} is no {type}, is {value}"

Type
