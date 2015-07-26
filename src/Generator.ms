use
	.Function call
	.Type.Method
	.Type.Pred-Type

Generator. new Pred-Type
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
	doc. "Continues until the next `<~`."
	impl-symbol. "next"
