use
	.assert -> !
	.Comparable -> =?
	.Fun
	.js -> js-sub
	.methods -> contains?
	.Str
	.types.Record-Type

Js-Method = Record-Type
	doc. "TODO"
	test. |
		tos = Js-Method
			impl-name. "toString"
		! =? (tos 1)  "1"
	members.
		displayName. Str
		impl-name. Str
	make-callable. |_
		|target ...args
			impl = js-sub target _.impl-name
			! (contains? Fun impl) ~"{_} not implemented by {target}."
			\ TODO:SYNTAX Splat call
			Fun.prototype.apply.call impl target args

\ TODO: Make impl!-able.

Js-Method
