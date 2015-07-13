use~
	.@.@
	.Type.Type =>
use-debug
	.! _ !not
	.compare =?
	.math.methods +

doc. "Functions implementing behavior native to JavaScript."

op = |op-name
	Function "a" "b" "return a {op-name} b"
unary-op = |op-name
	Function "_" "return {op-name} _"

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
js-sub. Function "obj" "prop" "return obj[prop]"
js-set. Function "obj" "prop" "val" "obj[prop] = val"
js-delete. Function "obj" "prop" "delete obj[prop]"
js-instanceof. op "instanceof"

# TODO:ES6 `undefined` constant.
defined?.
	doc. "True for any value except `undefined`."
	test. |
		[ undefined ] -> false
		[ 0 ] -> true
	|_
		not id=? _ undefined

id=?.
	doc. "
		For Objects, whether they are the same place in memory.
		For primitive types, whether they have the same data.
		TODO: Explain (and test) difference between this and js===
	test. |
		[ "a" "a" ] -> true
		[ [ "a" ] [ "a" ] ] -> false
	Object.is

truthy?.
	doc. "Whether javascript's `if` statement would consider the value to be true."
	test. !|
		for! [ null undefined 0 Number.NaN "" false ]
			!not truthy? _
		! truthy? [ ]
		! truthy? true
	|_
		js! js!_

js-typeof.
	doc. "JavaScript's `typeof` operator."
	test. |
		[ undefined ] -> "undefined"
		[ null ] -> "object"
		[ true ] -> "boolean"
		[ 0 ] -> "number"
		[ "a" ] -> "string"
		[ (Symbol "s") ] -> "symbol"
		[ js-typeof ] -> "function"
		[ @ ] -> "object"
	unary-op "typeof"

# TODO: Move to Function.ms?
apply-with-this.
	doc. "
		Like `apply`, and also makes the hidden parameter `this` to be `new-this`.
		Acts like `new-this.f ...arguments` if `f` were in the prototype chain of `new-this`.
	test. |
		f = |a
			+ this a
		[ f 1 [ 2 ] ] -> 3
	|f:Function new-this arguments:@
		# TODO:ES6 ...args
		Function.prototype.apply.call f new-this (=> Array arguments)

call-with-this.
	doc. "Like `apply-with-this` but does not take a list."
	test. !|
		f = |a
			+ this a
		! =? (call-with-this f 1 2) 3
	|_:Function new-this ...args
		apply-with-this _ new-this args
