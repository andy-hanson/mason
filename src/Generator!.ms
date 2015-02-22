use
	.@ _ iterator
	.@.@-Type empty
	.@.?
	.Bool _ and
	.Fun
	.Js-Method
	.private.js-impl each-generator
	.Obj
	.Type contains?
	.Type.Impl-Type self-type
	.Type.Method impl!
	.Type.Pred-Type _ Any
debug use~
	.!
	.@.Seq seq=?
	.@.Stream
	.Bool false true
	.compare =?

Generator! = Pred-Type
	doc. "
		A block of code which yields values and receives responses from a context.
		Also known as a coroutine.
	predicate. |_
		and :Obj ~(contains? Fun _.next)

impl! empty (self-type Generator!)
	doc. "Does nothing."
	~|
		()

gen-next!. Js-Method
	doc. "Continues until the next `<~`."
	impl-name. "next"

if~.
	doc. "Runs through the sub-generator only if `condition`. Returns a `?` of the result."
	test. |
		stream = Stream ~|
			a <~~ if~ true ~|
				<~ 1
				2
			! =? a (? 2
			b <~~ if~ false ~|
				<~ 3
			! =? b (empty ?)
		! seq=? stream [ 1 ]
	~|:? condition:Bool result:Fun[Generator!]
		case
			condition
				_ <~~ result ()
				? _
			else
				empty ?

each~.
	doc. "A Generator! that goes through every element of `_`, yielding to `do-each` of it."
	test. |
		x = Stream ~|
			<~~ each~ [ 1 2 3 ] ~|em
				<~ em
		! seq=? x [ 1 2 3 ]
	|_:@ do-each:Fun[Any Generator!]
		each-generator iterator_ do-each

\ TODO: Others...

Generator!
