use
	.private.bootstrap Fun
	.private.js-impl iNew
use~
	.@.@
	.Bool _ not
	.Type.Type =>
use-debug
	.! _ !not
	.@.@ each!
	.compare =?
	.math.methods +
	.math.Num
	.Obj! p+!

doc. "Functions implementing behavior native to JavaScript."

op = |op-name
	Fun "a" "b" "return a {op-name} b"
unary-op = |op-name
	Fun "_" "return {op-name} _"

js-and. op "&"
js-caret. op "^"
js<<. op "<<"
js>>. op ">>"
js>>>. op ">>>"
js===. op "==="
js==. op "=="
js<. op "<"
js>. op ">"
js<=. op "<="
js>=. op ">="
js+. op "+"
js-. op "-"
js*. op "*"
js/. op "/"
js-mod. op "%"
js-bar. op "|"
js~. unary-op "~"
js!. unary-op "!"
js-sub. Fun "obj" "prop" "return obj[prop]"
js-set. Fun "obj" "prop" "val" "obj[prop] = val"
js-delete. Fun "obj" "prop" "delete obj[prop]"
js-instanceof. op "instanceof"

# TODO:ES6 `undefined` constant.
defined?.
	doc. "True for any value except `undefined`."
	test. |
		[ undefined ] -> false
		[ 0 ] -> true
	|_
		not (id=? _ undefined

id=?.
	doc. "
		For Objs, whether they are the same place in memory.
		For primitive types, whether they have the same data.
		TODO: Explain (and test) difference between this and js===
	test. |
		[ "a" "a" ] -> true
		[ [ "a" ] [ "a" ] ] -> false
	global.Object.is

truthy?.
	doc. "Whether javascript's `if` statement would consider the value to be true."
	test. |
		falsy =
			. ()
			. undefined
			. 0
			. Num.NaN
			. ""
			. false
		each! falsy |_
			!not truthy? _
		! truthy? []
		! truthy? true

	|:Bool a
		js! (js! a

new.
	doc. "
		Emulates JavaScript's `new` keyword.
		Creates a new Obj whose prototype is `constructor.prototype` and calls the constructor on it.
		Wierd things may happen if you try to create a new Error this way.
	test. |
		My-Fun-Type = |a
			p+! this "a" a
		x:My-Fun-Type = new My-Fun-Type 1
		! =? x.a 1
		y:Error = new Error "Oh no!"
		! =? y.message "Oh no!"
	iNew

js-typeof.
	doc. "JavaScript's `typeof` operator."
	test. |
		[ undefined ] -> "undefined"
		[ () ] -> "object"
		[ true ] -> "boolean"
		[ 0 ] -> "number"
		[ "a" ] -> "string"
		[ (Symbol "s") ] -> "symbol"
		[ js-typeof ] -> "function"
		[ @ ] -> "object"
	unary-op "typeof"

apply-with-this.
	doc. "
		Like `apply`, and also makes the hidden parameter `this` to be `new-this`.
		Acts like `new-this.f ...arguments` if `f` were in the prototype chain of `new-this`.
	test. |
		f = |a
			+ this a
		[ f 1 [ 2 ] ] -> 3
	|f:Fun new-this arguments:@
		# TODO:ES6 ...args
		Fun.prototype.apply.call f new-this (=> Array arguments)

call-with-this.
	doc. "Like `apply-with-this` but does not take a list."
	test. |
		f = |a
			+ this a
		! =? (call-with-this f 1 2) 3
	|f:Fun new-this ...args
		apply-with-this f new-this args
