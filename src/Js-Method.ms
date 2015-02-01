use
	.Fun
	.Str
	.Type.Record-Type
debug use~
	.!
	.Comparable =?

Js-Method = Record-Type
	doc. "
		A Js-Method allows you to call a JavaScript-style method as a function.
		Unlike a Mason Method, for a Js-Method,
		the first argument becomes `this` within the implementation's body.
	test. |
		toString = Js-Method
			impl-name. "toString"
		! =? (toString 1) "1"
	members.
		displayName. Str
		impl-name. Str
	extensible.
	make-callable. |_
		impl = "a[\"{_.impl-name}\"]"
		\ TODO:ES6 "return target.name(...args)"
		Fun "a" "b" "c" "d" "
			switch (arguments.length) \{
				case 0: throw new Error("Js-Methods always need at least one argument.")
				case 1: return {impl}()
				case 2: return {impl}(b)
				case 3: return {impl}(b, c)
				case 4: return {impl}(b, c, d)
				case 5: throw new Error("Does not support this many arguments.")
			}

\ TODO: Make impl!-able.

Js-Method
