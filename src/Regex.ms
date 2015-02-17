use
	.js global
use~
	.control opr
	.Str

\ TODO: Probably use xregexp

Regex. global.RegExp

regex. |pattern:Str ?flags
	flags = opr ?flags ""
	Regex pattern flags
