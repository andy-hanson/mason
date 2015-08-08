use
	.private.util-inspect
	.js id=?
	.private.bootstrap msDef
	.Type.Method

to-string. new Method
	impl-symbol. "toString"
	default. .|
		case this
			id=? _ null
				"null"
			id=? _ undefined
				"undefined"
			else
				"<object with no toString defined>"

inspect. new Method
	impl-symbol. "inspect"
	default. .|
		util-inspect this
	test. |
		[ 2 ] -> "2"
		[ (a. 1 b. 2) ] -> "\{ a: 1, b: 2 }"

msDef "inspect" inspect

