use
	.Fun
	.js js-sub
	.Obj Obj-Key
	.Str
	.Type.Obj-Type
	.Type.Pred-Type Any
use-debug
	.!
	.compare =?
	.Type.Type contains?

Js-Method = Obj-Type
	doc. "
		A Js-Method allows you to call a JavaScript-style method as a function.
		Unlike a Mason Method, for a Js-Method,
		the first argument becomes `this` within the implementation's body.
	test. |
		toString = Js-Method
			impl-name. "toString"
		! =? (toString 1) "1"
	props.
		displayName. Str
		impl-name. Str
	extensible.
	make-callable. |_
		impl = "a[\"{_.impl-name}\"]"
		# TODO:ES6 "return target.name(...args)"
		Fun "a" "b" "c" "d" "
			switch (arguments.length) \{
				case 0: throw new Error("Js-Methods always need at least one argument.")
				case 1: return {impl}()
				case 2: return {impl}(b)
				case 3: return {impl}(b, c)
				case 4: return {impl}(b, c, d)
				case 5: throw new Error("Does not support this many arguments.")
			}

send.
	doc. "Calls `target`'s js-method `name` with the given arguments."
	test. |
		[ 1 "toFixed" 2 ] -> "1.00"
	|target:Any name:Obj-Key ...args
		impl = js-sub target name
		debug ! (contains? Fun impl) ~"Js-Method {name} not implemented by {target}."
		impl.apply target args

send!. send

# TODO: Make impl!-able.

Js-Method
