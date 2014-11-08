doc. "TODO"

use
	.assert -> ! != !fails
	.Bool -> not
	.Num -> Int
	.Str

binary.
	doc. "Makes an Int out of a string of 0s and 1s."
	test. |
		!= (binary "101") 5
		!fails |
			binary "0a"
	|:Int bin-str:Str
		in
			\ TODO: Regex.ms
			! (not (`/[^01]/`.test bin-str)) ~"Not a valid binary number: {bin-str}"
		out
			! (not (Num.isNaN res))

		Num.parseInt bin-str 2

hexidecimal.
	doc. "Max an Int out of a string of hex codes (0-f). Capitalization ignored."
	test. |
		!= (hexidecimal "7f") 127
		!fails |
			hexidecimal "asdfghjkl"
	|:Int hex-str:Str
		in
			\ TODO: Regex.ms
			! (not (`/[^0-9a-fA-F]/`.test hex-str)) ~"Not a valid hexidecimal number: {hex-str}"
		out
			! (not (Num.isNaN res))

		Num.parseInt hex-str 16

bit-or.
	doc. "JavaScript's `|` operator."
	test. |
		!= (bit-or (binary "0101") (binary "0011")) (binary "0111")
	|a:Int b:Int
		`a | b`

bit-and.
	doc. "JavaScript's `&` operator."
	test. |
		!= (bit-and (binary "0101") (binary "0011")) (binary "0001")
	|a:Int b:Int
		`a & b`

bit-xor.
	doc. "Javascript's `^` operator."
	test. |
		!= (bit-xor (binary "0101") (binary "0011")) (binary "0110")
	|a:Int b:Int
		`a ^ b`

bit-not.
	doc. "Javascript's `~` operator."
	test. |
		!= (bit-not 0) -1
	|a:Int
		`~a`

bit-shift-left.
	doc. "Javascript's `<<` operator."
	test. |
		!= (bit-shift-left (binary "01") 1) (binary "10")
	|a:Int b:Int
		`a << b`

bit-shift-right-signed.
	doc. "Javascript's `>>` operator."
	test. |
		!= (bit-shift-right-signed 1 1) 0
		!= (bit-shift-right-signed -1 1) -1
		!= (bit-shift-right-signed -2 1) -1
	|a:Int b:Int
		`a >> b`

bit-shift-right-unsigned.
	doc. "Javascript's `>>>` operator."
	test. |
		!= (bit-shift-right-unsigned 1 1) 0
		!= (bit-shift-right-unsigned -1 1) (binary ("1".repeat 31))
		!= (bit-shift-right-unsigned -2 1) (binary ("1".repeat 31))
	|a:Int b:Int
		`a >>> b`
