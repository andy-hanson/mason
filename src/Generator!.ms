use
	.Boolean and
	.Function call
	.Type.Js-Method
	.Type.Pred-Type
	.Type.Type contains?

Generator! = Pred-Type
	doc. "
		A block of code which yields values and receives responses from a context.
		Also known as a coroutine.
	predicate. |_
		and :Object ~(contains? Function _.next)

empty-Generator.
	doc. "Does nothing."
	call ~!|
		pass

gen-next!. Js-Method
	doc. "Continues until the next `<~`."
	impl-symbol. "next"

Generator!
