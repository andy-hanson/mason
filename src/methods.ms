use
	.js -> js-instanceof
	.private.bootstrap -> sym-contains? sym-type-of set! ms
	.types.Method -> impl!
use~
	.@.? -> get-or
	.Bool
	.Fun
	.Object -> ?get-property-or-in-prototype
	.Try -> oh-no!
	.types.Type

region Arithmetic operators
	+. Method
		doc. |a b
			"Combines two values of the same type into a greater value of that type."

	-. Method
		doc. |a b
			"Inverse of `+`. Takes `b` away from `a`. `+ b res` should be `a`."

	*. Method
		doc. |a b
			"`b` copies of `a`."

	/. Method
		doc. |a b
			"Inverse of `*`. `* b res` should be `a`."

	+!. Method
		doc. |a b
			"Generally makes `a` the result of `+ a b`, without mutating `b`."

	-!. Method
		doc. |a b
			"Generally makes `a` the result of `- a b`, without mutating `b`.."

region Basics
	sub. Method
		doc. "Implementing this allows the use of the special syntax `a[b]`."
	set! ms "sub" sub

	=>. Method
		doc. |convert-to:Type convert-me
			"Converts a value to a given type."
		wrap. |impl args
			type = args[0]
			converted = args[1]
			case converted
				:type
					_
				else
					\ TODO:SYNTAX Splat call
					Fun.prototype.apply.call impl () args

region Collection
	empty. Method
		doc. "
			Given a type, makes an instance which is `empty?`.
			Should always return the same thing iff immutable.

	empty?. Method
		doc. "Whether this collections has no elements."

	empty!. Method
		doc. "Mutates this collection so that it will be `empty?`."

region Unsorted
	freeze. Method
		doc. "
			Returns a compacted and immutable version of an object.
			Does not have to return the same value, but often does.
		default. |_
			Object.freeze _

	\ TODO: Move to types.util
	type-of. Method
		doc. "
			Returns the most specific Impl-Type associated with some value.
			This method won't always work for JavaScript objects,
			but every Record-Type and Enum should implement this automatically.
		test. |
			[ () ] -> Object
		\ TODO: Should be able to just make it here. No need for syms.
		impl-symbol. sym-type-of
		default. |_
			get-or (?get-property-or-in-prototype _ "constructor") Object

	length. Method
		doc. "TODO"

	contains?. Method
		doc. |:Bool collection value
			"Whether some collection of things as as an element `value`."
		impl-symbol. sym-contains?

	set! ms "contains" contains?

	impl! contains? Fun |fun _
		js-instanceof _ fun

	set! ms "checkContains" |type value name
		case!
			contains? type value
				()
			else
				oh-no! "{name} is no {type}, is {value}"
