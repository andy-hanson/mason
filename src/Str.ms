use
	.bags.Bag -> count
	.Bool -> and
	.Comparable -> =?
	.js -> global
	.Regex -> regex
	.types.Pred-Type

Str =
	doc. "TODO"
	global.String

->upper.
	doc. "TODO"
	test. |
		[ "hi" ] -> "HI"
	|s:Str
		s.toUpperCase ()

Char. Pred-Type
	doc. "TODO"
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

Str
