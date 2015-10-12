import
	.@.Seq.Seq @indexes
	.math.methods +

rgx. |strings ...values
	raw = strings.raw
	s ::= raw[0]
	for! i of @indexes values
		s := "{s}{values[i]}{raw[(+ 1 i)]}"
	new RegExp s
