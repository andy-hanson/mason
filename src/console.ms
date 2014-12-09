doc. "TODO"

use
	.bags.Array
	.js -> global
	.methods -> =>
	.Str

log!.
	doc. "
		Prints its arguments to the console, separated by spaces.
		Always adds a new line at the end.

	|
		args = Array.prototype.slice.call `arguments`
		global.console.log (=> Str args " ")
