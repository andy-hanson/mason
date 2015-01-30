use
	..Comparable =? >=?
	..math.Num log Nat pow round-down
	..methods - *
	..Str
debug use
	..!
	..@.Range range
	..methods contains?


roman-digits =
	1 -> "I"
	5 -> "V"
	10 -> "X"
	50 -> "L"
	100 -> "C"
	500 -> "D"
	1000 -> "M"

power-of-10-below = |_
	pow 10 (round-down (log 10 _

roman.
	doc. "
		Converts a number to Roman numerals.
		Only works for values 1-3999.
	test. |
		[ 1 ] -> "I"
		[ 4 ] -> "IV"
		[ 5 ] -> "V"
		[ 9 ] -> "IX"
		[ 44 ] -> "XLIV"
		[ 49 ] -> "XLIX"
		[ 2014 ] -> "MMXIV"

	|:Str n:Nat
		in
			! contains? (range 1 4000) n

		dec = power-of-10-below n
		dig = |dec-multiple
			roman-digits[(* dec-multiple dec
		rec = |dec-multiple
			case - n (* dec-multiple dec)
				=? _ 0
					""
				else
					roman_
		gt? = |dec-multiple
			>=? n (* dec-multiple dec
		case
			gt? 9
				"{dig 1}{dig 10}{rec 9}"
			gt? 5
				"{dig 5}{rec 5}"
			gt? 4
				"{dig 1}{dig 5}{rec 4}"
			else
				"{dig 1}{rec 1}"
