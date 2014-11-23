use
	.js -> global
	.show -> inspect-impl
	.types.Method -> impl!

Symbol = global.Symbol

impl! inspect-impl Symbol
	test. |
		\ TODO:ES6
		\ [ (Symbol "name") ] -> "<Symbol name>"
		[ (Symbol "name") ] -> "<Symbol>"
	|_
		\ TODO:ES6 _.name
		"<Symbol>"

Symbol

