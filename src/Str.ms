use
	.Bool and
	.compare _ =?
	.js global id=?
	.Regex _ regex
	.Type.Kind
	.Type.Method impl!
	.Type.Pred-Type
use~
	.@ count
	.@.Array

Str =
	doc. "JavaScript's native String type."
	global.String

Str-Test. Kind
	doc. "Something we can compare a Str to."
	implementors. [ Str Regex ]

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

split-str.
	doc. "Like `@.split` but using a Str-Test instead of a predicate."
	test. |
		[ " " "I am a Str" ] -> [ "I" "am" "a" "Str" ]
		[ (regex ".") "abc" ] -> [ "" "" "" "" ]
	|:Array[Str] splitter:Str-Test _:Str
		_.split splitter

impl! =? Str id=?
impl! compare Str |a b
	a.localeCompare b

Str
