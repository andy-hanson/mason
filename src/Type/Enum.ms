import
	..control opr
	..Object p+!
	..to-string
	.Impl-Type
	.Kind kind!
	.Method impl!
	.Type contains?
import~ todo  use-debug
	..compare =?
	.Type type-of

Enum. class
	|	A Concrete-Type with a small number of instances.
	|	Great for using with `switch`.

	do!
		kind! _ Impl-Type

	construct! params
		.name = params.name todo  :String
		.prototype = opr params.prototype ~(Object.create Object.prototype)
		.values = params.values todo  :Array[String]

		for! value-name in .values
			enum-val = Object.create .prototype
			enum-val.name = value-name
			p+! this value-name enum-val
		.prototype.constructor = this
		enum-name = .name
		impl! to-string this .|
			"{enum-name}.{.name}"

	contains? |_
		Object.prototype.isPrototypeOf.call .prototype _

todo  class attributes
Enum.test = !|
	Fruit = new Enum
		name.
		values.
			. "apple"
			. "orange"
	prices =
		Fruit.apple -> 1
		Fruit.orange -> 2
	assert! =? prices[Fruit.apple] 1
	assert! =? prices[Fruit.orange] 2
	assert! =? (type-of Fruit.apple) Fruit
	assert! =? "Fruit.apple" "{Fruit.apple}"
