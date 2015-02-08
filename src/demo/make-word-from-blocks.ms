use
	..@ _ flat-map keep map
	..@.?
	..@.Seq _ ?first tail
	..methods + - contains? empty?
	..Str _ ->upper
debug use
	..!
	..@.Stream
	..Map each-pair!
	..methods => =?

make-word-from-blocks.
	doc. "http://rosettacode.org/wiki/ABC_Problem"
	test. |
		\ Backtracking is necessary - can't use the first block first!
		[ "AB" [ "AB" "AC" ] ] -> ? (=> Stream [ "AC" "AB" ]

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
			real-ans = => ? (map ans |_
				\ TODO: split _ =?[" "]
				=> Stream (_.split " "
			! =? real-ans (make-word-from-blocks word sample-blocks)

	|:?[Seq[Str]] word:Str blocks:@[Str]
		rec = |word blocks
			case word
				empty?_
					? [ ]
				else
					rest-word = tail_
					this-char-blocks = keep blocks |_
						contains? _ word[0]
					?first (flat-map this-char-blocks |_
						map (rec rest-word (- blocks [ _ ])) |ans
							+ [ _ ] ans
		rec (->upper word) (map blocks ->upper
