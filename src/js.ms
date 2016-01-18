| Functions implementing behavior native to JavaScript.

op = |op-name
	Function 'a 'b "return a #op-name b"
unary-op = |op-name
	Function '_ "return #op-name _"

js-and. op "&"
js-caret. op "^"
js<<. op '<<
js>>. op '>>
js>>>. op '>>>
js===. op '===
js==. op '==
js<. op '<
js>. op '>
js<=. op '<=
js>=. op '>=
js+. op '+
js-. op '-
js*. op '*
js/. op '/
js-mod. op "%"
js-bar. op "|"
js~. unary-op "~"
js!. unary-op '!
js-delete. Function 'obj 'prop "delete obj[prop]"
js-in. op 'in
js-instanceof. op 'instanceof
js-typeof. unary-op 'typeof

defined?. |_
	| False for `undefined`.
	not id=? _ undefined

null?. |_
	| True only for `null`.
	js=== _ null

exists?. |_
	| False for `null` or `undefined`.
	not js== _ null

id=?.
	| For Objects, whether they are the same place in memory.
	| For primitive types, whether they have the same data.
	todo Explain (and test) difference between this and js===
	Object.is
