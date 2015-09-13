| Functions that write to the console (also known as shell, command prompt, stdout/stderr).

use
	global console
	..Type.Type =>

log!.
	| Prints its arguments to the console, separated by spaces.
	| Always adds a newline at the end.
	todo ES6 ...args; log ...args
	!|a
		console.log a

warn!.
	| Like `log!`, but prints to stderr.
	!|...args
		console.warn ...args

region Debugging
	dbg!.
		| Show something for debugging.
		!|...args
			warn! "-->"
			for! args
				warn! _
			warn! "<--"

	trace!.
		| Logs the current stacktrace.
		!|...args
			console.trace (=> String args " ")
