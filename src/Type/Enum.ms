use
	..@ each!
	..@.Array
	..methods contains?
	..Obj
	..Obj! p+!
	..show
	..Str
	.Impl-Type
	.Kind unchecked-implementor!
	.Method impl!
	.Record-Type
debug use
	..!
	..methods =?
	..Type type-of

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
		prototype. Obj
		values. Array[Str]
	defaults.
		prototype. |
			Obj.create Obj.prototype
	post-construct. |enum
		each! enum.values |val-name
			enum-val = Obj.create enum.prototype
			p+! enum-val "name" val-name
			p+! enum val-name enum-val
		p+! enum.prototype "constructor" enum
		impl! show enum |val
			"{enum.displayName}.{val.name}"

unchecked-implementor! Enum Impl-Type

impl! contains? Enum |_ value
	Obj.prototype.isPrototypeOf.call _.prototype value

Enum
