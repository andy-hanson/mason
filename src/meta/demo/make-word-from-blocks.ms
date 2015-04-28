use
	...@.@ _ ++ -- empty? flat-map keep map
	...@.?
	...@.Seq.Seq _ ?first tail
	...Str _ ->upper
	...Type.Type contains?
use-debug
	...!
	...@.@ each!
	...@.@-Type empty
	...compare =?

make-word-from-blocks.
	doc. "http://rosettacode.org/wiki/ABC_Problem"
	test. |
		# Backtracking is necessary - can't use the first block first!
		[ "AB" [ "AB" "AC" ] ] -> ? [ "AC" "AB" ]

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

		sample-answers =
			"a" -> ? [ "NA" ]
			"bark" -> ? [ "BO" "NA" "RE" "XK" ]
			"book" -> empty ?
			"treat" -> ? [ "GT" "RE" "ER" "NA" "TG" ]
			"common" -> empty ?
			"squad" -> ? [ "FS" "DQ" "HU" "NA" "QD" ]
			"confuse" -> ? [ "CP" "BO" "NA" "FS" "HU" "FS" "RE" ]
		each! sample-answers |pair
			word = pair.key
			ans = pair.val
			! =? ans (make-word-from-blocks word sample-blocks)

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
						# TODO -, not --
						map (rec rest-word (-- blocks [ _ ])) |ans
							++ [ _ ] ans
		rec (->upper word) (map blocks ->upper
