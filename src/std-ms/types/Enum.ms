use
	..assert -> !
	..bags.Array
	..bags.Bag -> each!
	..Comparable -> =?
	..control -> switch
	.Impl-Type
	.Interface -> unchecked-implementor!
	.Method -> impl!
	..Object -> add-property!
	.Record-Type
	..Str -> ->Str
	.Type -> subsumes?

Enum = Record-Type
	doc. "TODO"
	test. |
		Fruit = Enum
			values.
				. "apple"
				. "orange"
		prices =
			Fruit.apple -> 1
			Fruit.orange -> 2
		! =? prices[Fruit.apple] 1
		! =? prices[Fruit.orange] 2

	members.
		displayName. Str
		prototype. Object
		values. Array \ TODO: [Str]
	defaults.
		prototype. |
			Object.create Object.prototype
	post-construct. |enum
		each! enum.values |val-name
			enum-val = Object.create enum.prototype
			add-property! enum-val "name" val-name
			add-property! enum val-name enum-val
		impl! ->Str enum |val
			"{enum.displayName}.{val.name}"

unchecked-implementor! Enum Impl-Type

impl! subsumes? Enum |_ subsumed
	Object.prototype.isPrototypeOf.call _.prototype subsumed


Enum
