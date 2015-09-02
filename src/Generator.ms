use
	.Function call
	.Type.Method
	.Type.Pred-Type

Generator. new Pred-Type
	name.
	doc. "
		A block of code which yields values and receives responses from a context.
		Also known as a coroutine.
	predicate. |_
		and :Object _.next:Function

empty-Generator.
	doc. "Does nothing."
	call ~!|
		pass

gen-next!. new Method
	name.
	doc. "Continues until the next `<~`."
	impl-symbol. "next"
