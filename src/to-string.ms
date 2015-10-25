import
	global Set
	.js id=?
	.private.bootstrap msDef
	.Type.Method

to-string. new Method
	name.
	allow-null?. true
	impl-symbol. 'toString
	default. .|
		case this
			id=? _ null
				'null
			id=? _ undefined
				'undefined
			else
				inspect-object this

inspect-seen = new Set

inspect. new Method
	name.
	allow-null?. true
	wrap. |impl arg opts
		case
			inspect-seen.has arg
				'<recursive>
			else
				inspect-seen.add arg
				with impl.call arg opts
					inspect-seen.delete arg
	default. to-string.default
|| See also private/impl-inspect.ms

inspect-object = |
	"<object with no prototype>"

msDef 'inspect inspect
