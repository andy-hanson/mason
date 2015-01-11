use
	.js -> global
	.show
	.types.Method -> impl!

Symbol = global.Symbol

impl! show Symbol
	test. |
		\ TODO:ES6
		\ [ (Symbol "name") ] -> "<Symbol name>"
		[ (Symbol "name") ] -> "<Symbol>"
	|
		\ TODO:ES6 _.name
		"<Symbol>"

Symbol

