import
	msl.js regex js-typeof
	.tests

tests 'js
	regex -> !|
		assert! =? regex"a{1}b" (RegExp 'a1b)

	defined? ->
		[undefined] -> false
		[null] -> true

	id=? ->
		['a 'a] -> true
		[['a] ['a]] -> false

	js-typeof ->
		[undefined] -> 'undefined
		[null] -> 'object
		[true] -> 'boolean
		[0] -> 'number
		['a] -> 'string
		[(Symbol 's)] -> 'symbol
		[js-typeof] -> 'function
		[(a. 1)] -> 'object
