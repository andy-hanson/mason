use
	..js js-bar js-and js-caret js~ js<< js>> js>>>
	.Number Int
use-debug
	..! _ !not
	..Try fails?

doc. "For dealing with Ints qua sequences of bits."

binary.
	doc. "Makes an Int out of a string of 0s and 1s."
	test. |
		[ "101" ] -> 5
		debug ! fails? !|
			binary "0a"
	|:Int bin-str:String
		in
			!not ((RegExp "[^01]").test bin-str) ~"Not a valid binary number: {bin-str}"
		out
			!not Number.isNaN res

		Number.parseInt bin-str 2

hexidecimal.
	doc. "Max an Int out of a string of hex codes (0-f). Capitalization ignored."
	test. |
		[ "7f" ] -> 127
		debug ! fails? !|
			hexidecimal "asdfghjkl"
	|:Int hex-str:String
		in
			!not ((RegExp "[^0-9a-fA-F]").test hex-str) ~"Not a valid hexidecimal number: {hex-str}"
		out
			!not Number.isNaN res

		Number.parseInt hex-str 16

bit-or.
	doc. "JavaScript's `|` operator."
	test. |
		[ (binary "0101") (binary "0011") ] -> binary "0111"
	|a:Int b:Int
		js-bar a b

bit-and.
	doc. "JavaScript's `&` operator."
	test. |
		[ (binary "0101") (binary "0011") ] -> binary "0001"
	|a:Int b:Int
		js-and a b

bit-xor.
	doc. "Javascript's `^` operator."
	test. |
		[ (binary "0101") (binary "0011") ] -> binary "0110"
	|a:Int b:Int
		js-caret a b

bit-not.
	doc. "Javascript's `~` operator."
	test. |
		[ 0 ] -> -1
		[ -1 ] -> 0
	|_:Int
		js~_

bit-shift-left.
	doc. "Javascript's `<<` operator."
	test. |
		[ (binary "01") 1 ] -> binary "10"
	|a:Int b:Int
		js<< a b

bit-shift-right-signed.
	doc. "Javascript's `>>` operator."
	test. |
		[ 1 1 ] -> 0
		[ -1 1 ] -> -1
		[ -2 1 ] -> -1
	|a:Int b:Int
		js>> a b

bit-shift-right-unsigned.
	doc. "Javascript's `>>>` operator."
	test. |
		[ 1 1 ] -> 0
		[ -1 1 ] -> (binary ("1".repeat 31))
		[ -2 1 ] -> (binary ("1".repeat 31))
	|a:Int b:Int
		js>>> a b
