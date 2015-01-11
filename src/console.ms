doc. "TODO"

use
	.bags.Bag -> each!
	chalk -> blue
	.js -> global
	.methods -> =>
	.show
	.Str

js-console = global.console

log!.
	doc. "
		Prints its arguments to the console, separated by spaces.
		Always adds a new line at the end.

	|...args
		js-console.log (=> Str args " ")

warn!.
	doc. "Like `log!`, but prints to stderr."
	|...args
		\ TODO:SYNTAX Splat
		js-console.warn (=> Str args " ")

region Debugging
	dbg!.
		doc. "Show something for debugging."
		|...args
			warn! (blue "-->"
			each! args |_
				warn! (show _
					repr. \ TODO:SYNTAX [ repr. ]
			warn! (blue "<--"

	trace!.
		doc. "Logs the current stacktrace."
		|...args
			js-console.trace (=> Str args " ")
