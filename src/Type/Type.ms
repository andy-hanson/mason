import
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

Type. new Kind
	| Anything implementing contains?.
	| Types are generally used to succinctly make assertions about values.
	name.

impl! to-string Type .|
	.name
todo  Should not be necessary, Kind < Impl-Type < Type
impl! to-string Kind .|
	.name

impl! =? Type .|other
	id=? this other

|| Made by Method.ms.
contains?. ms.contains

extract. new Method
	| Given a type and arbitrary value:
	| If the value is of the type, return an array of sub-values.
	| Otherwise, return `null`.
	| The array of values are taken into local variables.
	| For example:
	todo examples
	name.
	args.
		. 'type
		. 'candidate
		todo Nat
		. ['num-extracteds Number]

msDef 'extract extract

msDef 'checkContains |type value value-name
	assert! value:type throw! "{value-name} is no {type.name}, is a {(type-of value).name}: {inspect value}"
	value

=>. new Method
	todo Don't take additional args (get rid of `=> String` joining nonsense)
	todo args: convert-to:Type convert-me (may take additional args)
	| Converts a value to a given type.
	name.
	wrap. |impl type converted opts
		case converted
			:type
				_
			else
				impl.call type _ opts

todo rename
type-of. |:Impl-Type _
	| Most specific Impl-Type for a value.
	?-or (?property-with-proto _ 'constructor) Object

region We make some things Types here due to bootstrapping order issues.
	kind! Impl-Type Type
