import
	msl.@.? ?None ?-or Opt->? ?->Opt ?some Some
	msl.Try fails?
	..tests

tests "?"
	Opt->? ->
		[0] -> ?some 0
		[null] -> ?some null
		[undefined] -> ?None

	?->Opt ->
		[(?some 0)] -> 0
		[?None] -> undefined

	un-? -> |
		[(?some 1)] -> 1
		assert! fails? !|
			un-? ?None

	?-or ->
		[?None 1] -> 1
		[(?some 1) 2] -> 1

	Some -> !|
		case! ?some 1
			:Some val
				assert! =? val 1

