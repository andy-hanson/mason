use
	.Comparable -> =?
	.Fun
	.js -> js-sub
	.methods -> contains?
	.Str
	.types.Record-Type
use~
	.!

Js-Method = Record-Type
	doc. "
		A Js-Method allows you to call a JavaScript-style method as a function.
		Unlike a Mason Method, for a Js-Method,
		the first argument becomes `this` within the implementation's body.
	test. |
		toString = Js-Method
			impl-name. "toString"
		! =? (toString 1)  "1"
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
