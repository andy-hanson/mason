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
	test. |
		[ 2 ] -> "2"
		[ (a. 1 b. 2) ] -> "\{ a: 1, b: 2 }"
		[ null ] -> "null"
		[ undefined ] -> "undefined"
	impl-symbol. "inspect"
	allow-null?. true
	default. .|
		util-inspect this

msDef "inspect" inspect

