use
	.compare _ =?
	.js id=?
	.Type.Kind
	.Type.Method impl!
	.Type.Pred-Type
use~
	.@.@ count

String-Test. new Kind
	| Something we can compare a String to.
	name.
	implementors. [String RegExp]

Char. new Pred-Type
	| Any String with only one character.
	name.
	predicate. |_
		and :String (=? count_ 1)

indent.
	| Adds a `\\t` to all `\\n` in `str`.
	| Does *not* do anything to the first line.
	test. |
		s = "
			a
			b
		s-indented = "
			a
				b
		[s] -> s-indented
		["a"] -> "a"
	|_:String
		_.replace (new RegExp "\n" "g") "\n\t"

impl! =? String .|other
	id=? this other
impl! compare String .|other
	.localeCompare other
