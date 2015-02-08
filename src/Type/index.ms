use
	..js any? defined? js-instanceof
	..methods <! contains?
	..private.bootstrap Fun ms p+!
	.Impl-Type
	.Kind
	.Method _ impl!
use~
	..Obj
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
		case
			any? obj
				case obj.constructor
					defined?_
						_
					else
						Obj
			else
				Obj

p+! ms "checkContains" |type value name
	case!
		contains? type value
			()
		else
			oh-no! "{name} is no {type}, is {value}"

Type
