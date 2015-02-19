use
	..Fun
	..js js-instanceof
	..private.js-impl build-str
	..Obj
	..Obj! p+!
	..Str
	.Impl-Type
	.Kind kind!
	.Method impl!
	.Obj-Type
	..Type _ contains?
debug use~
	..!
	..compare =?
	..control if!
	..js defined?
	..math.Num
	..Try fails?

Wrap-Type = Obj-Type
	doc. "
		Obj with only one prop (always called `val`).
		These are useful for wrapping a value with a new type.
	props.
		displayName. Str
		prototype. Obj
	opt-props.
		wrapped-type. Type
	extensible.
	defaults.
		prototype. |
			Obj.create Obj.prototype
	post-construct. |_
		p+! _.prototype "constructor" _
	make-callable. |_
		src = build-str |add!
			add! "
				return function ctr(_) \{
					if (!(this instanceof ctr)) return new ctr(_)
					this.val = _
			debug if! (defined? _.wrapped-type) |
				add! "_ms.checkContains(wrappedType, _, \"val\")"
			add! "}"
		f = Fun "wrappedType" src
		f _.wrapped-type
	test. |
		W = Wrap-Type
			doc. "W"
			wrapped-type. Num
		w = W 3
		! =? w.val 3
		debug ! fails? |
			W "three"

kind! Wrap-Type Impl-Type
impl! contains? Wrap-Type |wt _
	js-instanceof _ wt

Wrap-Type
