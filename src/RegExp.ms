use~
	.control opr

# TODO:ES6 Template regexes: regexp"a"
regexp. |pattern:String ?flags
	flags = opr ?flags ""
	RegExp pattern flags

