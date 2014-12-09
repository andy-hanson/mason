use
	.methods -> empty
	.Object
	.types.Method -> impl!
	.types.util -> self-type

Object! =
	doc. "TODO"

impl! empty (self-type Object!) |
	Object.create Object.prototype

Object!
