use
	..@.@ each!
	..Object! p+!
	..show
	.Impl-Type
	.Kind kind!
	.Method impl!
	.Obj-Type
	.Type contains?
use-debug
	..!
	..compare =?
	.Type type-of

Enum = Obj-Type
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
	props.
		displayName. String
		prototype. Object
		values. Array[String]
	defaults.
		prototype. |
			Object.create Object.prototype
	post-construct. |enum
		each! enum.values |val-name
			enum-val = Object.create enum.prototype
			p+! enum-val "name" val-name
			p+! enum val-name enum-val
		p+! enum.prototype "constructor" enum
		impl! show enum |val
			"{enum.displayName}.{val.name}"

kind! Enum Impl-Type

impl! contains? Enum |_ value
	Object.prototype.isPrototypeOf.call _.prototype value

Enum
