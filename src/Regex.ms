use
	.@.? get-or Opt->?
	.js global
	.Str

\ TODO: Probably use xregexp

regex. |pattern:Str ?flags
	\ TODO:SYNTAX Optional args
	flags = get-or (Opt->? ?flags) ""
	global.RegExp pattern flags



