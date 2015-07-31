use!
	# TODO: Needed?
	..String-as-Seq # => Str
use
	..Type.Type =>

doc. "Functions that write to the console (also known as shell, command prompt, stdout/stderr)."

js-console = global.console

log!.
	doc. "
		Prints its arguments to the console, separated by spaces.
		Always adds a newline at the end.
	!|...args
		js-console.log ...args

warn!.
	doc. "Like `log!`, but prints to stderr."
	!|...args
		js-console.warn ...args

region Debugging
	dbg!.
		doc. "Show something for debugging."
		!|...args
			warn! "-->"
			for! args
				warn! _
			warn! "<--"

	trace!.
		doc. "Logs the current stacktrace."
		!|...args
			js-console.trace (=> String args " "
