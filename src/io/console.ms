use!
	..Str-as-Seq # => Str
use
	chalk blue
	..@.@ each!
	..show
	..Str
	..Type.Type =>

doc. "Funs that write to the console (also known as shell, command prompt, stdout/stderr)."

js-console = global.console

log!.
	doc. "
		Prints its arguments to the console, separated by spaces.
		Always adds a newline at the end.
	|...args
		js-console.log (=> Str args " "

warn!.
	doc. "Like `log!`, but prints to stderr."
	|...args
		js-console.warn (=> Str args " "

region Debugging
	dbg!.
		doc. "Show something for debugging."
		|...args
			warn! (blue "-->"
			each! args |_
				warn! (show _
					repr. # TODO:SYNTAX [ repr. ]
			warn! (blue "<--"

	trace!.
		doc. "Logs the current stacktrace."
		|...args
			js-console.trace (=> Str args " "
