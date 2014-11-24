use
	..arithmetic-methods -> +
	..Dict
	..types.Interface -> implementor!
	.Map -> ?get keys
	..Object -> ?get-property add-property! own-properties

implementor! Dict Map
	?get -> ?get-property
	+ -> |_ dict2:Dict
		\ TODO: Clean up
		union = `{}`
		names1 = keys_
		names2 = keys dict2
		names1.forEach |name
			add-property! union name
		names2.forEach |name
			add-property! union name
		Dict union
	keys -> own-properties

