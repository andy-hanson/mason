use
	esast.dist.mangle-identifier
	..js js-sub
	..Object Object-Key
	..Object! p+!
	.Impl-Type
	.Obj-Type
	.Pred-Type Any
use-debug
	..!
	..compare =?
	.Type contains?

Js-Method = Obj-Type
	doc. "
		A Js-Method allows you to call a JavaScript-style method as a function.
		Unlike a Mason Method, for a Js-Method,
		the first argument becomes `this` within the implementation's body.
	test. !|
		toString = Js-Method
			impl-symbol. "toString"
		! =? (toString 1) "1"
	props.
		name. String
		impl-symbol. Object-Key
	extensible. true
	make-callable. |jsm
		impl = case jsm.impl-symbol
			:String
				"a[\"{_}\"]"
			:Symbol
				"a[symbol]"

		# TODO:ES6 "return target.name(...args)"
		src = "
			return function {mangle-identifier jsm.name}(a, b, c, d) \{
				switch (arguments.length) \{
					case 0: throw new Error("Js-Methods always need at least one argument.")
					case 1: return {impl}()
					case 2: return {impl}(b)
					case 3: return {impl}(b, c)
					case 4: return {impl}(b, c, d)
					case 5: throw new Error("Does not support this many arguments.")
				}
			}
		make-method = Function "symbol" src
		make-method jsm.impl-symbol

send.
	doc. "Calls `target`'s js-method `name` with the given arguments."
	test. |
		[ 1 "toFixed" 2 ] -> "1.00"
	|target:Any name:Object-Key ...args
		impl = js-sub target name
		debug ! (contains? Function impl) ~"Js-Method {name} not implemented by {target}."
		impl.apply target args

send!. send

js-impl!. !|method:Js-Method type:Impl-Type implementation:Function
	p+! type.prototype method.impl-symbol implementation

Js-Method
