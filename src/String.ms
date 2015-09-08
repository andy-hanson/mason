use
	.compare _ =?
	.js id=?
	.Type.Kind
	.Type.Method impl!
	.Type.Pred-Type
use~
	.@.@ count

String-Test. new Kind
	name.
	doc. "Something we can compare a String to."
	implementors. [String RegExp]

Char. new Pred-Type
	name.
	doc. "Any String with only one character."
	predicate. |_
		and :String (=? count_ 1)

indent.
	doc. "
		Adds a `\\t` to all `\\n` in `str`.
		Does *not* do anything to the first line.
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
