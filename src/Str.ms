use
	.bags.Bag -> count
	.Bool -> and
	.Comparable -> =? compare
	.Comparable! -> <!
	.js -> global reference=?
	.Regex -> regex
	.types.Method -> impl!
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

lines.
	doc. "TODO"
	test. |
		"TODO"
	|str:Str
		str.split "\n"

<! Str Comparable

impl! =? Str reference=?
impl! compare Str |a b
	a.localeCompare b

Str
