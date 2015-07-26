use!
	# Defines global._ms.
	.bootstrap
	# Turns on type checks.
	..Type.Type
	..@.Seq.Array-as-Seq
	# kind! Id-Map Map. Necessary for `..Function spread!` to work.
	..@.Map.Id-Map
	# Important to load this now, as it will help error messages
	..show
	..String-as-Seq
	..@.show-@
	..@.Map.show-Map
	..Type.show-Type
