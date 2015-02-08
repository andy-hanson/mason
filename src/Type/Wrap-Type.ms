use
	..Fun
	..js js-instanceof
	..private.js-impl build-str
	..methods <! contains?
	..Obj
	..Obj! p+!
	..Str
	.Impl-Type
	.Method impl!
	.Obj-Type
	..Type
debug use~
	..!
	..control if!
	..js defined?
	..math.Num
	..methods =?
	..Try fails?

Wrap-Type = Obj-Type
	doc. "
		Obj with only one member (always called `val`).
		These are useful for wrapping a value with a new type.
	members.
		displayName. Str
		prototype. Obj
	optional-members.
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

\ TODO: This is same as for Obj-Type. Are all Impl-Type_s like this?
impl! contains? Wrap-Type |wt _
	js-instanceof _ wt

<! Wrap-Type Impl-Type

Wrap-Type
