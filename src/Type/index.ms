use
	..compare =?
	..js id=? js-instanceof
	..private.bootstrap Fun impl-contains?! ms p+!
	.Impl-Type
	.Kind _ kind!
	.Method _ impl!
use~
	..@.? ?-or
	..Obj _ ?p-with-proto
	..Try oh-no!

Type. Kind
	doc. "
		Anything implementing contains?.
		Types are generally used to succinctly make assertions about values.

impl! =? Type id=?

contains?. ms.contains

p+! ms "checkContains" |type value name
	case!
		contains? type value
			()
		else
			`throw new Error(name + " is no " + type + ", is ")`
			oh-no! "{name} is no {type}, is {value}"

=>. Method
	doc. |convert-to:Type convert-me
		"Converts a value to a given type."
	wrap. |impl type converted opts
		case converted
			:type
				_
			else
				impl type converted opts

type-of.
	doc. "
		Most specific Impl-Type for a value.
	test. |
		[ Type ] -> Kind
		[ () ] -> Obj
	|:Impl-Type obj
		?-or (?p-with-proto obj "constructor") Obj

region We make some things Types here due to bootstrapping order issues.
	kind! Impl-Type Type
	kind! Method Type

	\ TODO: Move?
	impl-contains?! Fun |fun _
		js-instanceof _ fun

Type
