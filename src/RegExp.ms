use~
	.control opr
	.Str

# TODO: Probably use xregexp

# TODO: regexp literals?
regexp. |pattern:Str ?flags
	flags = opr ?flags ""
	RegExp pattern flags

