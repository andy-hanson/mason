import
	.@.Seq.Seq indexes
	.math.methods +

rgx.
	|strings ...values
		raw = strings.raw
		s ::= raw[0]
		for! i in indexes values
			s := "{s}{values[i]}{raw[(+ 1 i)]}"
		new RegExp s
