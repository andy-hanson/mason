import
	msl.js regex truthy? js-typeof
	.tests

tests "js"
	regex -> !|
		assert! =? regex"a{1}b" (RegExp "a1b")

	defined? ->
		[undefined] -> false
		[null] -> true

	id=? ->
		["a" "a"] -> true
		[["a"] ["a"]] -> false

	truthy? -> !|
		for! [null undefined 0 Number.NaN "" false]
			forbid! truthy? _
		assert! truthy? []
		assert! truthy? true

	js-typeof ->
		[undefined] -> "undefined"
		[null] -> "object"
		[true] -> "boolean"
		[0] -> "number"
		["a"] -> "string"
		[(Symbol "s")] -> "symbol"
		[js-typeof] -> "function"
		[(a. 1)] -> "object"
