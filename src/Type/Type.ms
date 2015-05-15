use
	..compare =?
	..js id=? js-instanceof
	..private.bootstrap Fun impl-contains?! msDef
	# Don't want to depend on Try because that can cause circular dependency problems.
	..private.js-impl ohNo
	.Impl-Type
	.Kind _ kind!
	.Method _ --contains? impl!
use~
	..@.? ?-or
	..Obj _ ?p-with-proto
use-debug
	..!
	.Method self-impl!

Type = Kind
	doc. "
		Anything implementing contains?.
		Types are generally used to succinctly make assertions about values.

impl! =? Type id=?

contains?. --contains?

extract. Method
	doc. "
		Given a type and arbitrary value:
			If the value is of the type, return an array of sub-values.
			Otherwise, return `null`.
		The array of values are taken into local variables.
		For example:
	test. |
		My-Type =
			doc. "Example type"
		self-impl! extract My-Type |case
			=? _ "extractable"
				[ 1 2 ]
			else
				()

		f = |case
			:My-Type a b
				"{a}{b}"
			else
				"not extractable"

		! =? "12" (f "extractable"
		! =? "not extractable" f()

msDef "extract" extract

msDef "checkContains" |type value name
	case!
		contains? type value
			pass
		else
			ohNo "{name} is no {type}, is a {type-of value}: {value}"
	value

=>. Method
	doc. "
		|convert-to:Type convert-me
		Converts a value to a given type.
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

	# TODO: Move?
	impl-contains?! Fun |fun _
		js-instanceof _ fun

Type
