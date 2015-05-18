use
	.Boolean and
	.compare _ =?
	.js id=?
	.Type.Kind
	.Type.Method impl!
	.Type.Pred-Type
use~
	.@.@ count

String-Test. Kind
	doc. "Something we can compare a String to."
	implementors. [ String RegExp ]

->upper.
	doc. "Converts a-z to A-Z."
	test. |
		[ "hi" ] -> "HI"
	|_:String
		_.toUpperCase()

Char. Pred-Type
	doc. "Any String with only one character."
	predicate. |_
		and :String ~(=? count_ 1

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
	|_:String
		"{_.replace (RegExp "\n" "g") "\n\t"}"

split-str.
	doc. "Like `@.split` but using a String-Test instead of a predicate."
	test. |
		[ " " "I am a String" ] -> [ "I" "am" "a" "String" ]
		[ (RegExp ".") "abc" ] -> [ "" "" "" "" ]
	|:Array[String] splitter:String-Test _:String
		_.split splitter

impl! =? String id=?
impl! compare String |a b
	a.localeCompare b
