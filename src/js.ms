use~
	.@.Range
use-debug
	.compare =?

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

regex.
	doc. "TODO"
	test. !|
		assert! =? regex"a{1}b" (RegExp "a1b")

	|strings ...values
		_ ::= ""
		for! i in new Range 0 values.length
			_ := "{_}{strings[i]}{values[i]}"
		_ := "{_}{strings[values.length]}"
		RegExp _

defined?.
	doc. "True for any value except `undefined`."
	test. |
		[undefined] -> false
		[0] -> true
	|_
		not id=? _ undefined

id=?.
	doc. "
		For Objects, whether they are the same place in memory.
		For primitive types, whether they have the same data.
		TODO: Explain (and test) difference between this and js===
	test. |
		["a" "a"] -> true
		[["a"] ["a"]] -> false
	Object.is

truthy?.
	doc. "Whether javascript's `if` statement would consider the value to be true."
	test. !|
		for! [null undefined 0 Number.NaN "" false]
			forbid! truthy? _
		assert! truthy? []
		assert! truthy? true
	|_
		not js!_

js-typeof.
	doc. "JavaScript's `typeof` operator."
	test. |
		[undefined] -> "undefined"
		[null] -> "object"
		[true] -> "boolean"
		[0] -> "number"
		["a"] -> "string"
		[(Symbol "s")] -> "symbol"
		[js-typeof] -> "function"
		[(a. 1)] -> "object"
	unary-op "typeof"
