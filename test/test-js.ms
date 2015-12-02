import
	msl.js js-typeof
	.tests

tests 'js
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
