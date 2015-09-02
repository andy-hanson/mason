use!
	# TODO: Needed?
	..String-as-Seq # => Str
use
	global console
	..Type.Type =>

doc. "Functions that write to the console (also known as shell, command prompt, stdout/stderr)."

log!.
	doc. "
		Prints its arguments to the console, separated by spaces.
		Always adds a newline at the end.
	# TODO:ES6 ...args; log ...args
	!|a
		console.log a

warn!.
	doc. "Like `log!`, but prints to stderr."
	!|...args
		console.warn ...args

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
			console.trace (=> String args " ")
