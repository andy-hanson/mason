use
	..control opr
	..Object p+!
	..to-string
	.Impl-Type
	.Kind kind!
	.Method impl!
	.Type contains?
use~ # TODO: use-debug
	..compare =?
	.Type type-of

Enum. class
	do!
		kind! _ Impl-Type

	# TODO: class attributes
	# doc. "
	#	A Concrete-Type with a small number of instances.
	#	Great for using with `switch`.
	construct! params
		.name = params.name # TODO: :String
		.prototype = opr params.prototype ~(Object.create Object.prototype)
		.values = params.values # TODO: :Array[String]

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

# TODO: class attributes
Enum.test = !|
	Fruit = new Enum
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
