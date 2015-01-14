use
	..Comparable! -> <!
	..Dict
	.Map -> ?get keys
	..methods -> + empty
	..Object -> ?get-property own-enumerable-properties
	..Object! -> add-property!

<! Dict Map
	?get -> ?get-property
	+ -> |_ dict2:Dict
		union = empty Object!
		names1 = keys_
		names2 = keys dict2
		names1.forEach |name
			add-property! union name
		names2.forEach |name
			add-property! union name
		Dict union
	keys -> own-enumerable-properties

()
