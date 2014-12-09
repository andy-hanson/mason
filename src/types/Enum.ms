use
	..assert -> !
	..bags.Array
	..bags.Bag -> each!
	..Comparable -> =?
	.Impl-Type
	.Interface -> unchecked-implementor!
	.Method -> impl!
	..methods -> type-of
	..Object
	..Object! -> add-property!
	.Record-Type
	..show -> inspect-impl
	..Str
	.Type -> contains?

Enum = Record-Type
	doc. "
		A Concrete-Type with a small number of instances.
		Great for using with `switch`.
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
		! =? (type-of Fruit.apple) Fruit
		! =? "{Fruit.apple}" "Fruit.apple"
	members.
		displayName. Str
		prototype. Object
		values. Array[Str]
	defaults.
		prototype. |
			Object.create Object.prototype
	post-construct. |enum
		each! enum.values |val-name
			enum-val = Object.create enum.prototype
			add-property! enum-val "name" val-name
			add-property! enum val-name enum-val
		impl! type-of enum |
			enum
		impl! inspect-impl enum |val
			"{enum.displayName}.{val.name}"

unchecked-implementor! Enum Impl-Type

impl! contains? Enum |_ value
	Object.prototype.isPrototypeOf.call _.prototype value

Enum
