import
	msl.assert assert-call!
	msl.Type.Pred-Type Any ObjLit Union
	msl.Type.Type contains?
	..tests

tests "Pred-Type"
	Any -> !|
		assert-call! contains?
			[Any 0] -> true
			[Any null] -> true
			[Any undefined] -> false

	ObjLit -> !|
		assert-call! contains?
			[ObjLit (a. 1)] -> true
			[ObjLit ObjLit] -> false

	Union -> !|
		| As these are all Impl-Types, it would be better to use a Kind.
		SBN = Union[String Boolean Number]
		assert! =? SBN.name "Union[String Boolean Number]"
		assert! "true":SBN
		assert! true:SBN
		assert! 1:SBN
		forbid! null:SBN
