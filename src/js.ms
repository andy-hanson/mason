doc. "TODO"

use
	.js-impl -> i& i^ i<< i>> i>>> i=== i== i< i> i<= i>= i+ i- i* i/ i% i-bar i~ i! i-sub i-set i-global i-new i-typeof i-delete i-instanceof
use~
	.@ -> each!
	.@.Array
	.! -> !not
	.Bool -> false not true
	.Comparable -> =?
	.Fun -> ignore
	.math.Num
	.methods -> => + contains?
	.Object! -> add-property!
	.pred-types -> Any Union
	.Str
	.Symbol
	.Try -> Error

global. i-global

js&. i&
js^. i^
js<<. i<<
js>>. i>>
js>>>. i>>>
js===. i===
js==. i==
js<. i<
js>. i>
js<=. i<=
js>=. i>=
js+. i+
js-. i-
js*. i*
js/. i/
js%. i%
js-bar. i-bar
js~. i~
js!. i!
js-sub. i-sub
js-set. i-set
js-delete. i-delete
js-instanceof. i-instanceof

region Null/Undefined
	\ TODO:ES6 `undefined` constant.

	defined?.
		doc. "TODO"
		test. |
			[ undefined ] -> false
			[ 0 ] -> true
		|_
			not (reference=? _ undefined
	any?. |_
		not (js== _ ()

\ TODO: Exact same appears in Object.ms
~Object-Key = Union[Str Symbol]

\ TODO: Kill and just use Js-Method_s?
send.
	doc. "Calls `target`'s js-method `name` with the given arguments."
	test. |
		[ 1 "toFixed" 2 ] -> "1.00"
	|target:Any name:Object-Key ...args
		impl = js-sub target name
		! (contains? Fun impl) ~"Js-Method {name} not implemented by {target}."
		impl.apply target args

send!. send

eval.
	doc. "TODO"
	test. |
		! =? (eval "1 + 2") 3
	|str
		(Fun "" "return {str}") ()

reference=?.
	doc. "
		For objects, whether they are the same place in memory.
		For primitive types, whether they have the same data.

	test. |
		! reference=? "a" "a"
		!not reference=? [ "a" ] [ "a" ]

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
		ignore a \ TODO:Ignored vars
		i! (i! a)

new.
	doc. "
		Emulates JavaScript's `new` keyword.
		Creates a new object whose prototype is `constructor.prototype` and calls the constructor on it.
		Wierd things may happen if you try to create a new Error this way.

	test. |
		My-Fun-Type = |a
			add-property! this "a" a
		x:My-Fun-Type = new My-Fun-Type 1
		! =? x.a 1

	|constructor ...args
		in
			!not reference=? constructor Error
		\ TODO:SYNTAX splat call
		i-new constructor args

js-typeof.
	doc. "JavaScript's `typeof` operator."
	test. |
		\ [ undefined ] -> "undefined" \ TODO
		\ [ () ] -> "object" \ TODO
		[ true ] -> "boolean"
		[ 0 ] -> "number"
		[ "a" ] -> "string"
		[ (Symbol "s") ] -> "symbol"
		[ js-typeof ] -> "function"
		[ @ ] -> "object"

	i-typeof

apply-with-this.
	doc. "
		Like `apply`, and also makes the hidden parameter `this` to be `new-this`.
		Acts like `new-this.f ...arguments` if `f` were in the prototype chain of `new-this`.
	test. |
		f = |a
			+ this a
		[ f 1 [ 2 ] ] -> 3
	|f:Fun new-this arguments:@
		\ TODO:ES6 ...args
		Fun.prototype.apply.call f new-this (=> Array arguments)

call-with-this.
	doc. "Like `apply-with-this` but does not take a list."
	test. |
		f = |a
			+ this a
		! =? (call-with-this f 1 2) 3
	|f:Fun new-this ...args
		apply-with-this f new-this args
