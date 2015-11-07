import
	global TypeError
	..compare =?
	..js id=?
	..private.bootstrap ms msDef
	..to-string
	.Impl-Type
	.Kind _ kind!
	.Method _ impl!
import~
	..@.? ?-or
	..Object ?property-with-proto
	..to-string inspect

Type. kind
	| Anything implementing contains?.
	| Types are generally used to succinctly make assertions about values.

	=? |other
		id=? this other

	to-string |
		.name

todo  Should not be necessary, Kind < Impl-Type < Type
impl! to-string Kind .|
	.name

|| Made by Method.ms.
contains?. ms.contains

todo num-extracteds:Nat
extract. method |candidate num-extracteds:Number
	| Given a type and arbitrary value:
	| If the value is of the type, return an array of sub-values.
	| Otherwise, return `null`.
	| The array of values are taken into local variables.
	| For example:
	todo examples
	abstract

msDef 'extract extract

msDef 'checkContains |expected-type value value-name
	assert value:expected-type throw new TypeError
		"{value-name} is no {expected-type.name}, is a {(type-of value).name}: {inspect value}"
	value

=>. new Method
	todo Don't take additional args (get rid of `=> String` joining nonsense)
	todo args: convert-to:Type convert-me (may take additional args)
	| Converts a value to a given type.
	name.
	wrap. |impl convert-to-type converted opts
		case converted
			:convert-to-type
				_
			else
				impl.call convert-to-type _ opts

todo rename
type-of. |:Impl-Type _
	| Most specific Impl-Type for a value.
	?-or (?property-with-proto _ 'constructor) Object

todo needed?
|| Make Impl-Type a Type here due to bootstrapping order issues.
kind! Impl-Type Type
