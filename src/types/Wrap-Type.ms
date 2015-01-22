use
	..Comparable -> =?
	..control -> if!
	..Fun
	.Interface -> unchecked-implementor!
	.Impl-Type
	..js -> defined? js-instanceof
	..js-impl -> build-str
	.Method -> impl!
	..methods -> contains?
	..Obj
	\ TODO: Try non-bootstrap versions...
	..private.bootstrap -> set!
	.Record-Type
	..Str
	.Type
use~
	..!
	..math.Num
	..Try -> !debug-fails?

Wrap-Type = Record-Type
	doc. "TODO"
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
		set! _.prototype "constructor" _
	make-callable. |_
		src = build-str |add!
			add! "
				return function ctr(_) \{
					if (!(this instanceof ctr)) return new ctr(_)
					this.val = _
			if! (defined? _.wrapped-type) |
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
		!debug-fails? |
			W "three"

\ TODO: This is same as for Record-Type. Are all Impl-Type_s like this?
impl! contains? Wrap-Type |wt _
	js-instanceof _ wt

unchecked-implementor! Wrap-Type Impl-Type

Wrap-Type
