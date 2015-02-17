use
	.js global
use~
	.@.? get-or Opt->?
	.Str

\ TODO: Probably use xregexp

Regex. global.RegExp

regex. |pattern:Str ?flags
	\ TODO:SYNTAX Optional args
	flags = get-or (Opt->? ?flags) ""
	Regex pattern flags



