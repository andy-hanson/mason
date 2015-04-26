use!
	.bootstrap
	..Type.Type # This turns on type checks!
	..Fun
	..@.Seq.Array-as-Seq
	..@.Map.Hash-Map # Provides _ms.map
	..show # Important to load this now, as it will help error messages
	..Str-as-Seq
	..@.show-@
	..@.Map.show-Map
	..Type.show-Type
()
