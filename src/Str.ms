use
	.js -> global

Str =
	doc. "TODO"
	global.String

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
		"{str.replace `/\n/g` "\n\t"}"

Str
