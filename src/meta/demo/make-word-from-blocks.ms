use
	...@.@ _ ++ -- empty? flat-map~ keep map map~
	...@.?
	...@.Seq.Seq ?first tail

make-word-from-blocks.
	doc. "http://rosettacode.org/wiki/ABC_Problem"
	# TODO: Make it performant
	# test. |
	#	# Backtracking is necessary - can't use the first block first!
	#	["AB" ["AB" "AC"]] -> ? ["AC" "AB"]

	#	sample-blocks =
	#		. "BO"
	#		. "XK"
	#		. "DQ"
	#		. "CP"
	#		. "NA"
	#		. "GT"
	#		. "RE"
	#		. "TG"
	#		. "QD"
	#		. "FS"
	#		. "JW"
	#		. "HU"
	#		. "VI"
	#		. "AN"
	#		. "OB"
	#		. "ER"
	#		. "FS"
	#		. "LY"
	#		. "PC"
	#		. "ZM"

	#	sample-answers =
	#		"a" -> ? ["NA"]
	#		"bark" -> ? ["BO" "NA" "RE" "XK"]
	#		"book" -> empty ?
	#		"treat" -> ? ["GT" "RE" "ER" "NA" "TG"]
	#		"common" -> empty ?
	#		"squad" -> ? ["FS" "DQ" "HU" "NA" "QD"]
	#		"confuse" -> ? ["CP" "BO" "NA" "FS" "HU" "FS" "RE"]

	#	for! sample-answers
	#		# TODO:SYNTAX Array destructure
	#		! =? _[1] (make-word-from-blocks _[0] sample-blocks)

	|:? word:String blocks:@ # TODO: ?[Seq[String]], @[String]
		rec = |chars-left blocks-left
			case chars-left
				empty?_
					? []
				else
					rest-word = tail_
					this-char-blocks = keep blocks-left |_
						chars-left[0]:_
					# TODO:SYNTAX @for~
					?first (flat-map~ this-char-blocks |_
						# TODO -, not --
						map~ (rec rest-word (-- blocks-left [_])) |ans
							++ [_] ans
		rec word.toUpperCase() (map blocks |_
			_.toUpperCase()
