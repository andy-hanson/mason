use
	.Type.Method
	.Type.Pred-Type

Generator. new Pred-Type
	| A block of code which yields values and receives responses from a context.
	| Also known as a coroutine.
	name.
	predicate. |_
		and :Object _.next:Function

empty-Generator.
	| Does nothing.
	g = ~!|
		pass
	g()

gen-next!. new Method
	| Continues until the next `<~`.
	name.
	impl-symbol. "next"
