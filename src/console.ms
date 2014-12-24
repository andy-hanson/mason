doc. "TODO"

use
	.js -> global
	.methods -> =>
	.Str

log!.
	doc. "
		Prints its arguments to the console, separated by spaces.
		Always adds a new line at the end.

	|...args
		global.console.log (=> Str args " ")

warn!.
	doc. "Like `log!`, but prints to stderr."
	|...args
		\ TODO:SYNTAX Splat
		log!.apply () args

