use
	..!
	..@ -> flat-map keep=> map map=>
	..@.?
	..@.Seq -> ?first ?<pop
	..@.Stream
	..Comparable -> =?
	..maps.Map -> each-pair!
	..methods -> => + - contains? empty?
	..Str -> ->upper

make-word-from-blocks.
	doc. "http://rosettacode.org/wiki/ABC_Problem"
	test. |
		\ Backtracking is necessary - can't use the first block first!
		[ "AB" [ "AB" "AC" ] ] -> => ? [ [ "AC" "AB" ] ]

		sample-blocks =
			. "BO"
			. "XK"
			. "DQ"
			. "CP"
			. "NA"
			. "GT"
			. "RE"
			. "TG"
			. "QD"
			. "FS"
			. "JW"
			. "HU"
			. "VI"
			. "AN"
			. "OB"
			. "ER"
			. "FS"
			. "LY"
			. "PC"
			. "ZM"
		\ TODO:SYNTAX for string lists?
		sample-answers =
			"a" -> [ "NA" ]
			"bark" -> [ "BO NA RE XK" ]
			"book" -> [ ]
			"treat" -> [ "GT RE ER NA TG" ]
			"common" -> [ ]
			"squad" -> [ "FS DQ HU NA QD" ]
			"confuse" -> [ "CP BO NA FS HU FS RE" ]
		each-pair! sample-answers |word ans
			real-ans = map=> ? ans |_
				\ TODO: split _ =?[" "]
				_.split " "
			! =? (make-word-from-blocks word sample-blocks) real-ans

	|:?[Seq[Str]] word:Str blocks:@[Str]
		rec = |word blocks
			case ?<pop word
				empty?_
					=> ? [ [ ] ]
				else
					rest-word = _.val
					this-char-blocks = keep=> Stream blocks |_
						contains? _ word[0]
					?first (flat-map this-char-blocks |_
						map (rec rest-word (- blocks [ _ ])) |ans
							+ [ _ ] ans
		rec (->upper word) (map blocks ->upper
