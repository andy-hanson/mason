use
	..compare =?
	..js id=?
	..private.bootstrap ms msDef
	..to-string
	# Don't want to depend on Try because that can cause circular dependency problems.
	.Impl-Type
	.Kind _ kind!
	.Method _ impl!
use~
	..@.? ?-or
	..Object ?p-with-proto
	..to-string inspect
use-debug
	.Method self-impl!

Type. new Kind
	name.
	doc. "
		Anything implementing contains?.
		Types are generally used to succinctly make assertions about values.

impl! to-string Type .|
	.name
# TODO: Should not be necessary, Kind < Impl-Type < Type
impl! to-string Kind .|
	.name

impl! =? Type .|other
	id=? this other

# Made by Method.ms.
contains?. ms.contains

extract. new Method
	name.
	doc. "
		Given a type and arbitrary value:
			If the value is of the type, return an array of sub-values.
			Otherwise, return `null`.
		The array of values are taken into local variables.
		For example:
	test. !|
		# TODO: syntax-test.ms
		My-Type =
			doc. "Example type"
		self-impl! extract My-Type |case
			=? _ "extractable"
				[ 1 2 ]
			else
				null

		f = |case
			:My-Type a b
				"{a}{b}"
			else
				"not extractable"

		assert! =? "12" (f "extractable"
		assert! =? "not extractable" f()
	args.
		. "type"
		. "candidate"
		. [ "num-extracteds" Number ] # Nat

msDef "extract" extract

msDef "checkContains" |type value value-name
	assert! value:type throw! "{value-name} is no {type.name}, is a {(type-of value).name}: {inspect value}"
	value

=>. new Method
	name.
	doc. "
		TODO: Don't take additional args...
		|convert-to:Type convert-me (may take additional args)
		Converts a value to a given type.
	wrap. |impl type converted opts
		case converted
			:type
				_
			else
				impl.call type converted opts

type-of.
	doc. "
		Most specific Impl-Type for a value.
	test. |
		[ Type ] -> Kind
		[ null ] -> Object
	|:Impl-Type _
		?-or (?p-with-proto _ "constructor") Object

region We make some things Types here due to bootstrapping order issues.
	kind! Impl-Type Type
