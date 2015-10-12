import
	..control opr
	..to-string
	.Impl-Type
	.Kind kind!
	.Method impl!
	.Type contains?

Enum. class
	|	A Concrete-Type with a small number of instances.
	|	Great for using with `switch`.
	do!
		kind! _ Impl-Type

	construct! params
		.name = params.name todo  :String
		.prototype = opr params.prototype ~(Object.create Object.prototype)
		.values = params.values todo  :Array[String]

		for! value-name of .values
			enum-val = Object.create .prototype
			enum-val.name = value-name
			this."{value-name}" = enum-val
		.prototype.constructor = this
		enum-name = .name
		impl! to-string this .|
			"{enum-name}.{.name}"

	contains? |_
		Object.prototype.isPrototypeOf.call .prototype _
