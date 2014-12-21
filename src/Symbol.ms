use
	.js -> global
	.show -> inspect
	.types.Method -> impl!

Symbol = global.Symbol

impl! inspect Symbol
	test. |
		\ TODO:ES6
		\ [ (Symbol "name") ] -> "<Symbol name>"
		[ (Symbol "name") ] -> "<Symbol>"
	|
		\ TODO:ES6 _.name
		"<Symbol>"

Symbol

