use!
	# TODO: Needed?
	..String-as-Seq # => Str
use
	..Type.Type =>

doc. "Functions that write to the console (also known as shell, command prompt, stdout/stderr)."

log!.
	doc. "
		Prints its arguments to the console, separated by spaces.
		Always adds a newline at the end.
	# TODO:ES6 ...args; log ...args
	!|a
		global.console.log a

warn!.
	doc. "Like `log!`, but prints to stderr."
	!|...args
		global.console.warn ...args

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
			global.console.trace (=> String args " "
