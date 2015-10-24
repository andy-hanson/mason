| Functions implementing behavior native to JavaScript.
import~
	.@.Range

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
js-in. op "in"
js-instanceof. op "instanceof"

regex. |strings ...values
	todo doc
	_ ::= ""
	for! i of new Range 0 values.length
		_ := "{_}{strings[i]}{values[i]}"
	_ := "{_}{strings[values.length]}"
	RegExp _

defined?. |_
	| True for any value except `undefined`.
	not id=? _ undefined

exists?. |_
	todo doc, test
	not js== _ null

id=?.
	| For Objects, whether they are the same place in memory.
	| For primitive types, whether they have the same data.
	todo Explain (and test) difference between this and js===
	Object.is

js-typeof.
	| JavaScript's `typeof` operator.
	unary-op "typeof"
