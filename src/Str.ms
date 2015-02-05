use
	.Bool and
	.js global reference=?
	.methods =? compare
	.Type.Method impl!
	.Type.Pred-Type
use~
	.@ count
	.@.Array
	.Regex regex

Str =
	doc. "JavaScript's native String type."
	global.String

->upper.
	doc. "Converts a-z to A-Z."
	test. |
		[ "hi" ] -> "HI"
	|s:Str
		s.toUpperCase()

Char. Pred-Type
	doc. "Any String with only one character."
	predicate. |_
		and :Str ~(=? count_ 1

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

		[ s ] -> s-indented
		[ "a" ] -> "a"
	|str:Str
		"{str.replace (regex "\n" "g") "\n\t"}"

lines.
	doc. "\n-separated lines."
	test. |
		s = "
			a
				b
			c
		[ s ] -> [ "a" "\tb" "c" ]
	|:Array[Str] str:Str
		str.split "\n"

impl! =? Str reference=?
impl! compare Str |a b
	a.localeCompare b

Str
