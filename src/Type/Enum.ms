use
	..Object! p+!
	..show
	.Impl-Type
	.Kind kind!
	.Method impl!
	.Obj-Type
	.Type contains?
use-debug
	..compare =?
	.Type type-of

Enum. Obj-Type
	doc. "
		A Concrete-Type with a small number of instances.
		Great for using with `switch`.
	test. !|
		Fruit = Enum
			values.
				. "apple"
				. "orange"
		prices =
			Fruit.apple -> 1
			Fruit.orange -> 2
		assert! =? prices[Fruit.apple] 1
		assert! =? prices[Fruit.orange] 2
		assert! =? (type-of Fruit.apple) Fruit
		assert! =? "{Fruit.apple}" "Fruit.apple"
	props.
		name. String
		prototype. Object
		values. Array[String]
	defaults.
		prototype. |
			Object.create Object.prototype
	post-construct. !|enum
		for! value-name in enum.values
			enum-val = Object.create enum.prototype
			p+! enum-val "name" value-name
			p+! enum value-name enum-val
		p+! enum.prototype "constructor" enum
		impl! show enum |val
			"{enum.name}.{val.name}"

kind! Enum Impl-Type

impl! contains? Enum |_ value
	Object.prototype.isPrototypeOf.call _.prototype value
