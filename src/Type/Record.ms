import
	..js js-sub
	..private.bootstrap msDef
	.Kind kind!
	.Type extract

Record. kind
	todo static get 'field-names
	todo	abstract

	static
		extract |_
			cond _:this (field-values this _) null

	'toString |
		"(#(.constructor.name) #((field-values .constructor this).join " "))"

field-values = |cls instance
	cls.field-names.map &(js-sub instance _)

msDef 'beRecord |_ field-names
	_.field-names = field-names
	kind! _ Record
