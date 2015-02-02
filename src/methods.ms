use
	.Bool _ or
	.js js-instanceof reference=?
	.private.bootstrap sym-contains? set! ms
	.Type.Method _ impl!
use~
	.Fun
	.Obj _ inspect=?
	.Try oh-no!
	.Type.Type

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
		wrap. |impl type converted opts
			case converted
				:type
					_
				else
					impl type converted opts

region Collection
	empty. Method
		doc. "
			Given a type, makes an instance which is `empty?`.
			Should always return the same thing iff immutable.

	empty?. Method
		doc. "Whether this collections has no elements."

	empty!. Method
		doc. "Mutates this collection so that it will be `empty?`."

region Comparison
	<!. Method
		doc. |a b
			"Cause `<? a b`."

	compare. Method
		doc. "
			A Num < 0 if a < b, > 0 if a > b, and = 0 if a = b.
			It could be implemented as:
				case
					<? a b
						-1
					>? a b
						1
					else
						0
			But instead, other comparison operators are defined in terms of this.
			`compare a b` should always be `neg (compare b a)`.

	=?. Method
		doc. "
			Whether two objects are considered equivalent.
			Generally, if two values are `=?`, then most functions called on them should return the same results.
			`=?` defaults to `inspect=?`.
			Values can be `=?` but not `inspect=?` if they are conceptually the same, but have different representations.
			For example, two Sets with the same values might internally have different ordering.

			Values of different types should generally not be =?.
			For example, [ 1 2 3 ] is not `=?` (=> Stream [ 1 2 3 ]), but it is `seq=?`.
			Unlike other comparison methods, `=?` should not make assertions about type.

		default. |:Bool a b
			or (reference=? a b) ~(inspect=? a b)

	<?. Method
		doc. "
			Whether `lesser` comes before `greater` in these values' ordering.
			Same as `not  (>=? lesser greater)`.
		default. |:Bool lesser greater
			<? (compare lesser greater) 0

	<=?. Method
		doc. "
			Same as `or (<? a b) ~(=? a b)`.
		default. |:Bool lesser greater
			<=? (compare lesser greater) 0
	>?. Method
		doc. "
			Whether `greater` comes after `lesser` in these values' ordering.
			Same as `not (<=? greater lesser)`.
		default. |:Bool greater lesser
			>? (compare greater lesser) 0
	>=?. Method
		doc. "
			Same as `or (>? a b) ~(=? a b)`.
		default. |:Bool greater lesser
			>=? (compare greater lesser) 0

region Unsorted
	freeze. Method
		doc. "
			Returns a compacted and immutable version of it.
			Does not have to return the same value, but often does.
		default. |_
			Obj.freeze _

	contains?. Method
		doc. |:Bool collection value
			"Whether some collection of things as as an element `value`."
		impl-symbol. sym-contains?

	length. Method
		doc. "TODO: Does this need to exist?"

	set! ms "contains" contains?

	impl! contains? Fun |fun _
		js-instanceof _ fun

	set! ms "checkContains" |type value name
		case!
			contains? type value
				()
			else
				oh-no! "{name} is no {type}, is {value}"
