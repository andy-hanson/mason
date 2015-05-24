use
	esast.dist.mangle-identifier
	..js js-instanceof
	..private.js-impl buildStr
	..Object! p+!
	.Impl-Type
	.Kind kind!
	.Method impl!
	.Obj-Type
	.Type _ contains? extract
use-debug
	..!
	..compare =?
	..js defined?
	..Try fails?

Wrap-Type = Obj-Type
	doc. "
		Object with only one prop (always called `val`).
		These are useful for wrapping a value with a new type.
	props.
		name. String
		prototype. Object
	opt-props.
		wrapped-type. Type
	extensible. true
	defaults.
		prototype. |
			Object.create Object.prototype
	post-construct. |_
		p+! _.prototype "constructor" _
	make-callable. |_
		src = buildStr |add!
			name = mangle-identifier _.name
			add! "
				return function {name}(_) \{
					if (!(this instanceof {name})) return new {name}(_)
					this.val = _
			debug if! defined? _.wrapped-type
				add! "_ms.checkContains(wrappedType, _, \"val\")"
			add! "}"
		f = Function "wrappedType" src
		f _.wrapped-type
	test. !|
		W = Wrap-Type
			doc. "W"
			wrapped-type. Number
		w = W 3
		! =? w.val 3
		debug ! fails? |
			W "three"

kind! Wrap-Type Impl-Type
impl! contains? Wrap-Type |wt _
	js-instanceof _ wt
impl! extract Wrap-Type |wt _
	case
		js-instanceof _ wt
			[ _.val ]
		else
			null

Wrap-Type
