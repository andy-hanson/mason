doc. "TODO"

use
	.assert -> ! !=
	.Bool -> not
	.Num -> Int
	.Str

binary.
	doc. "Makes a binary number out of a string of 0s and 1s."
	test. |
		!= (binary "101") 5
	|:Int str:Str
		out
			! (not (Num.isNaN res)) "Not a valid binary number: {str}"

		Num.parseInt str 2

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
