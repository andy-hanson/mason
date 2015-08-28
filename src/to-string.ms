use
	.js id=?
	.private.bootstrap msDef
	.Type.Method

to-string. new Method
	test. |
		[ null ] -> "null"
		[ undefined ] -> "undefined"
		[ (Object.create null) ] -> "<object with no prototype>"
	allow-null?. true
	impl-symbol. "toString"
	default. .|
		case this
			id=? _ null
				"null"
			id=? _ undefined
				"undefined"
			else
				inspect-object this

inspect-seen = new global.Set

inspect. new Method
	allow-null?. true
	wrap. |impl arg opts
		case
			arg:inspect-seen
				"<recursive>"
			else
				inspect-seen.add arg
				with impl.call arg opts
					inspect-seen.delete arg
	default. to-string.default
# See also private/impl-inspect.ms

inspect-object = |
	"<object with no prototype>"

msDef "inspect" inspect
